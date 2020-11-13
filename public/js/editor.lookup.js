class EditorLookup extends EditorCore {
    constructor() {
        super();

        // Todo:
        // 私は明日学校へ行きます。
        this.data = {
            'NFDBB2FA9-tu1:0-12': {
                '0-1': {
                    'text': '私',
                    'term': {
                        '辞書A': {
                            '私': ['I', 'my', 'me']
                        }
                    }
                },
                '2-2': {
                    'text': '明日',
                    'term': {
                        '辞書A': {
                            '明日': ['tommorow']
                        },
                        '辞書B': {
                            '明日': ['Ashita']
                        }
                    }
                },
                '4-2': {
                    'text': '学校',
                    'term': {
                        '辞書A': {
                            '学校': ['shcool']
                        }
                    }
                },
                '4-5': {
                    'text': '学校へ行き',
                    'term': {
                        '辞書B': {
                            '学校へ行き': ['go to shcool'],
                            '学校へ行く': ['go the school']
                        }
                    }
                }
            }
        };

        $(document).on('editor.lookup.set', this.set);

        $(document).on('mouseover', '.txt.lookup', this.onMouseover);
        $(document).on('mouseout', '.txt.lookup', this.onMouseout);
        $(document).on('click', '.txt.lookup', this.onClick);

        $(document).on('mouseup', this.onMouseupDocument);
    }

    reset = () => {
        $('.lookup-popup').hide();
        $('.lookup.focus').removeClass('focus');
    }

    set = (event, data) => {
        let range = data.range;

        // Todo:
        data = this.data;

        if (!data[range]) {
            return false;
        }

        Object.keys(data[range]).forEach(key => {
            let arr = [];

            let tmp = key.split('-');
            let pos = parseInt(tmp[0]);
            let len = parseInt(tmp[1]);

            for (let index = pos; index < pos + len; index++) {
                let $target = $('.line[data-range="' + range + '"] .text-s .txt').eq(index);
                let lookup = $target.attr('data-lookup') || '';

                let tmp = lookup.split(',');
                tmp.push(key);
                $.merge(arr, tmp);
                arr = arr.filter((v, p) => arr.indexOf(v) == p);
                arr = arr.filter(v => v);

                $target.attr('data-lookup', arr.join(','));
                $target.addClass('lookup');
            }
        });
    }

    onMouseover = (event) => {
        let lookup = $(event.currentTarget).attr('data-lookup').split(',');

        lookup.forEach(key => {
            $(event.currentTarget).closest('.text').find('.txt').removeClass('hover').each((index, element) => {
                let tmp = ($(element).attr('data-lookup') || '').split(',');
                if ($.inArray(key, tmp) != -1) {
                    $(element).addClass('hover');
                }
            });
        });
    }

    onMouseout = (event) => {
        $('.lookup.hover').removeClass('hover');
    }

    onClick = (event) => {
        this.reset();

        let range = $(event.currentTarget).closest('.line').attr('data-range');

        let lookup = $(event.currentTarget).attr('data-lookup').split(',');

        console.log(lookup);

        let $ul = $('#lookup-popup-source').empty();

        // Todo:
        let data = this.data[range];

        lookup.forEach(key => {
            let dat = data[key];

            let $li = $('<li>').appendTo($ul);

            $('<a>')
                .on('click', this.onClickPopoverItem)
                .on('mouseover', this.onMouseoverPopoverSource)
                .data('data-lookup', [range, key])
                .attr('href', '#')
                .text(dat.text)
                .appendTo($li);
        });

        $ul.show().position({
            'of': $('.lookup.hover').first(),
            'at': 'left bottom',
            'my': 'left top'
        });

        $ul.find('li a').first().trigger('mouseover');
    }

    onMouseoverPopoverSource = (event) => {
        $('#lookup-popup-process').hide();

        $('#lookup-popup-source a').removeClass('hover');
        $(event.currentTarget).addClass('hover')

        let lookup = $(event.currentTarget).data('data-lookup');

        let range = lookup[0];
        let key = lookup[1];

        let tmp = key.split('-');
        let pos = parseInt(tmp[0]);
        let len = parseInt(tmp[1]);

        $('.line[data-range="' + range + '"] .text-s .lookup').removeClass('focus');

        for (let index = pos; index < pos + len; index++) {
            $('.line[data-range="' + range + '"] .text-s .txt').eq(index).addClass('focus');
        }

        // Todo:
        let term = this.data[lookup[0]][lookup[1]].term;

        let $ul = $('#lookup-popup-target').empty();

        Object.keys(term).forEach(dictKey => {
            let $li = $('<li>').addClass('dict').appendTo($ul);

            $('<span>')
                .text(dictKey)
                .appendTo($li);

            let terms = term[dictKey];

            Object.keys(terms).forEach(termS => {
                let termT = terms[termS];

                let $li = $('<li>').addClass('source').appendTo($ul);
                $('<a>')
                    .on('click', this.onClickPopoverItem)
                    .on('mouseover', this.onMouseoverTermSource)
                    .attr('href', '#')
                    .text(termS)
                    .appendTo($li);

                termT.forEach(tT => {
                    let $li = $('<li>').addClass('target').appendTo($ul);

                    $('<a>')
                        .on('click', this.onClickPopoverItem)
                        .on('mouseover', this.onMouseoverTermTarget)
                        .attr('href', '#')
                        .text(tT)
                        .appendTo($li);
                });
            });

        });

        $ul.show().position({
            'of': event.currentTarget,
            'at': 'right top',
            'my': 'left top'
        });
    }

    onMouseoverTermSource = (event) => {
        $('#lookup-popup-target a').removeClass('hover');
        $(event.currentTarget).addClass('hover')

        $('#lookup-popup-process li').show();

        $('#lookup-popup-process').show().position({
            'of': event.currentTarget,
            'at': 'right top',
            'my': 'left top'
        });
    }

    onMouseoverTermTarget = (event) => {
        $('#lookup-popup-target a').removeClass('hover');
        $(event.currentTarget).addClass('hover')

        $('#lookup-popup-process li').hide();
        $('#lookup-popup-process li[data-target*="target"]').show();

        $('#lookup-popup-process').show().position({
            'of': event.currentTarget,
            'at': 'right top',
            'my': 'left top'
        });
    }

    onClickPopoverItem = (event) => {
        let text = $(event.currentTarget).text();

        $(document).trigger('editor.input.insertText', { 'text': text });

        this.reset();
    }

    onMouseupDocument = (event) => {
        event.stopPropagation();

        this.reset();
    }
}