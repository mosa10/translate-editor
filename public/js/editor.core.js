class EditorCore {
    constructor(){
        //self = this;
    }

    triggerChange( data ){
        $(document).trigger('editor.data.change', data);
    }

    triggerJoin( data ){
        $(document).trigger('editor.data.join', data);
    }

    triggerSplit( data ){
        $(document).trigger('editor.data.split', data);
    }
}
