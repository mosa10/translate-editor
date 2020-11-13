class EditorSchedule {
    constructor() {
        this.resize = setInterval(() => {
            $(document).trigger('editor.view.resize');
        }, 1000);

        this.caret = setInterval(() => {
            $('.caret').toggleClass('blink');
        }, 500);
    }
}