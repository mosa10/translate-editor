let editor = {};

(function(){
    const editorView = new EditorView;
    const editorInput = new EditorInput;
    const editorOperation = new EditorOperation;
    const editorData = new EditorData;

    let property = {};

    const initialize = function(){
        $.ajaxSetup({
            headers: {
                'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
            }
        });

        //getMeta();
        getSentence();

        editorInput.initialize();
        editorOperation.initialize();
        
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