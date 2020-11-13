class EditorData extends EditorCore {
    constructor() {
        super();

        this.history = [];
        this.saveList = [];

        // notification
        $(document).on('editor.data.change', this.onChange);
        $(document).on('editor.data.join', this.onJoin);
        $(document).on('editor.data.split', this.onSplit);

        setInterval(this.save, 3000);
    }

    getSentenceObject = ( id ) => {
        let elmLine = $('.line[data-range="' + id + '"]');

        let source = this.elementTotext($(elmLine).find('.text-s'));
        let target = this.elementTotext($(elmLine).find('.text-t'));

        return new EditorModelSentence({
            'document_id' : 1,
            'range' : id,
            'source': source,
            'source_tag': source,
            'target': target,
            'target_tag': target
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

        this.saveList.push({
            'event' : 'update',
            'range' : [range],
            'sentence' : this.getSentenceObject(range)
        });
    }

    onJoin = (event, data) => {
        let range = data.range;
        let range1 = data.range1;
        let range2 = data.range2;

        this.saveList.push({
            'event' : 'join',
            'range' : [range1, range2],
            'sentence' : this.getSentenceObject(range)
        });
    }

    onSplit = (event, data) => {
        let range = data.range;
        let range1 = data.range1;
        let range2 = data.range2;

        this.saveList.push({
            'event' : 'split',
            'range' : [range, range1, range2],
            'sentence' : this.getSentenceObject(range)
        });
    }

    save = () => {
        if ( this.saveList.length === 0 ){
            return;
        }

        console.log('save', this.saveList);

        $.ajax({
            'type': 'PUT',
            'url': '/document/1/sentence',
            'data': {
                'sentence': this.saveList
            },
            'success': function (data) {
            }
        });

    }

    add() {
        console.log(history);
    }
}
