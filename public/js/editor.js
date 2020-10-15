let editor = {};

(function(){
    const editorView = new EditorView;
    const editorInput = new EditorInput;

    let property = {};

    const initialize = function(){
        getMeta();
        getSentence();

        editorInput.initialize();

        editorView.convertHTML();
    };

    const getMeta = function(){
        $.ajax({
            'url': '/editor/1/meta',
            'success': function( data ){
                property.meta = data;
            }
        });
    }

    const getSentence = function(){
        $.ajax({
            'url': '/editor/1/sentence',
            'success': function( data ){
                //console.log(data);
            }
        });
    };

    initialize();

})();