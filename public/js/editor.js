(function(){
    const initialize = function(){
        loadSentence();
    };

    const loadSentence = function(){
        $.ajax({
            'url': '/editor/1/sentence',
            'success': function( data ){
                console.log(data);
            }
        });
    };

    initialize();
})();