class EditorCore {
    constructor(){
        //self = this;
    }

    triggerChange( data ){
        $(document).trigger('editor.data.change', data);
    }
}
