class EditorData extends EditorCore {
    constructor() {
        super();

        this.history = [];
        this.saveList = {};

        // notification
        $(document).on('editor.data.change', this.onChange);

        setInterval(this.save, 3000);
    }

    getSentenceObject = ( id ) => {
        let elmLine = $('.line[data-range="' + id + '"]');

        let source = this.elementTotext($(elmLine).find('.text-s'));
        let target = this.elementTotext($(elmLine).find('.text-t'));

        return new EditorModelSentence({
            'range' : id,
            'source': source,
            'target': target
        });
    }

    elementTotext = (element) => {
        let text = '';

        $(element).find('.txt, .tag').each(function () {
            if ($(this).hasClass('tag')) {
                let tag = $(this).attr('data-tag');
                let index = $(this).attr('data-index');

                if ($(this).hasClass('tag-open')) {
                    text += '{' + tag + ':' + index + '}';
                } else {
                    text += '{/' + tag + '}';
                }
            } else {
                text += $(this).text();
            }
        });

        return text;
    }

    onChange = (event, data) => {
        let range = data.elmLine.attr('data-range');

        this.saveList[range] = {
            'event' : 'update',
            'range' : [range],
            'sentence' : this.getSentenceObject(range)
        };
    }

    onJoin = (event, data) => {
        this.saveList[range] = {
            'event' : 'join',
            'range' : [range, range],
            'sentence' : this.getSentenceObject(range)
        };
    }

    onSplit = (event, data) => {
        this.saveList[range] = {
            'event' : 'split',
            'range' : [range, range],
            'sentence' : this.getSentenceObject(range)
        };
    }

    save = () => {
        if ( Object.keys(this.saveList).length === 0 ){
            return;
        }

        console.log('save', this.saveList);

        $.ajax({
            'type': 'PUT',
            'url': '/document/1/sentence',
            'data': {
                'sentence': Object.keys(this.saveList).map((key) => {return this.saveList[key]})
            },
            'success': function (data) {
            }
        });

    }

    add() {
        console.log(history);
    }
}
