class EditorView {
    editorUtil = new EditorUtil;
    
    convertHTML(){
        $('.text').each((index, element) => {
            let that = this;
            let text = $(element).text();

            $(element).empty();

            // タグ検索
            let match = text.match(/{g:[0-9]+}|{\/g}/g);

            if ( match && match.length > 0 ){
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
        str = str.replace(/{g:([0-9])+}/g, '<span class="tag tag-start">$1</span>');
        str = str.replace(/{\/g}/g, '<span class="tag tag-end"></span>');

        return str;
    }

    sss( listText, keys, index ){
        if ( keys.length - 1 < index ){
            return listText;
        }

        var tmp = [];
        var key = keys[index];

        console.log("1", listText);

        /*
         * ABC<1>DEF<2>GHQ
         */
        listText.forEach( text => {
            console.log("2", text);
            /*
             * ABC,DEF<2>GHQ
             */
            let split = text.split(key);
            console.log("3", split);

            if ( split.length > 1 ){
                var t = [];

                let a = this.sss(split, keys, ++index);

                a.forEach( b => {
                    t.push(b);
                    t.push(key);
                });

                t.pop();
                tmp.push(t);
            } else {
                tmp.push(split[0]);
            }

            console.log("4", tmp);
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
