class EditorEvent {
    constructor() {
        this.processed = [];

        $(document).on('editor.event.process', this.process);

        $('#workspace').on('scroll', this.onScroll);
    }

    onScroll = () => {
        // console.log('scroll');
        this.process();
    }

    process = () => {
        let workspaceHeight = $('#workspace').innerHeight();

        $('.line').each((index, element) => {
            let elementTop = $(element).offset().top;
            let scrollTop = $('#workspace').scrollTop();
            let top = elementTop - scrollTop;

            // console.log(workspaceHeight, elementTop, scrollTop, top);

            if (workspaceHeight <= top) {
                return false;
            } else if (top < 0) {
                return true;
            }

            let range = $(element).attr('data-range');

            if ($.inArray(range, this.processed) != -1) {
                return true;
            }

            this.processed.push(range);

            // Todo:
            $(document).trigger('editor.lookup.set', {
                'range': range
            });

            // console.log('process', range);
        });
    }
}