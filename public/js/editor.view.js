class EditorView {
    editorUtil = new EditorUtil;
    
    convertHTML(){
        $('.text').each((index, element) => {
            if ( index == 68 ){
                console.log(index);
            }

            let that = this;
            let text = $(element).text();

            $(element).empty();

            // タグ検索
            let match = text.match(/{(g|x):[0-9]+}|{\/(g|x)}/g);

            if ( match && match.length > 0 ){
                match = Array.from(new Set(match));

                console.log(match);
                let listText = [text];
                
                var tmp = [];

                tmp = this.sss(listText, match, 0);
                tmp = this.ttt(tmp);
                tmp = tmp.filter(v => v);
                
                tmp.forEach( t => {
                    let isTag = false;

                    match.forEach( m => {
                        if ( m == t ){
                            isTag = true;
                            return false;
                        }
                    });

                    if ( isTag ){
                        var tag = this.converTag(t);
                        $(element).append($(tag));
                    } else {
                        t.split('').forEach( t2 => {
                            $(element).append($('<span>', {
                                'class': 'txt'
                            }).text(t2));
                        });
                    }
                });
            } else {
                text.split('').forEach( t2 => {
                    $(element).append($('<span>', {
                        'class': 'txt'
                    }).text(t2));
                });
            }
            $(element).append($('<span>', {
                'class': 'txt txt-end'
            }));
       });
    }

    converTag( str ){
        str = str.replace(/{(g|x):([0-9])+}/g, '<span class="tag tag-open">$1$2</span>');
        str = str.replace(/{\/(g|x)}/g, '<span class="tag tag-close">$1</span>');

        return str;
    }

    sss( listText, keys, index ){
        if ( keys.length - 1 < index ){
            return listText;
        }

        var tmp = [];
        var key = keys[index];

        var indexNext = index + 1;

        /*
         * ABC<1>DEF<2>GHQ
         */
        listText.forEach( text => {
            /*
             * ABC,DEF<2>GHQ
             */
            let split = text.split(key);

            if ( split.length == 1 && $.trim(split[0]).length == 0 ){
                tmp.push(split[0]);
            } else {
                let isHit = (split.length > 1);
                var t = [];

                let a = this.sss(split, keys, indexNext);

                if ( isHit ){
                    a.forEach( b => {
                        t.push(b);
                        t.push(key);
                    });

                    t.pop();
                    tmp.push(t);
                } else {
                    tmp.push(a);
                }
            }
        });

        return tmp;
    }

    ttt( list ){
        var tmp = [];

        list.forEach( i => {
            if ( $.isArray(i) ){
                var tmp2 = this.ttt(i);
                tmp = tmp.concat(tmp2);
            } else {
                tmp.push(i)
            }
        });

        return tmp;
    }
}
