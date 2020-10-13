let editor = {};

(function(){
    const editorView = new EditorView;

    let property = {};

    const initialize = function(){
        getMeta();
        getSentence();

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
                console.log(data);
            }
        });
    };

    initialize();

    let current = null;
    let composition = false;
    let mousedown = false;

    $(document).on('keyup', function( event ){
        console.log('document keyup');

        switch ( event.keyCode ){

        }
    });

    $('.input').on('keydown', function( event ){
        console.log('keydown', event.keyCode, composition);

        switch ( event.keyCode ){
            // 左矢印
            case 37:
                if ( ! composition ){
                    if ( event.shiftKey ){
                        current.prev().toggleClass('selection');
                    }

                    moveCursor(current.prev(), true);
                }
                return false;
            // 右矢印
            case 39:
                if ( ! composition ){
                    if ( event.shiftKey ){
                        current.toggleClass('selection');
                    }
                    
                    moveCursor(current.next(), true);
                }
                return false;
        }
    });

    $('.input').on('keyup', function( event ){
        console.log('keyup', event.keyCode, composition);
        let isComposing = false;

        switch ( event.keyCode ){
            // back space
            case 8:
                removeTxt(current.prev());
                return false;
            // Enter
            case 13:
                return false;
            // 左矢印
            case 37:
                return false;
            // 右矢印
            case 39:
                return false;
            // delete
            case 46:
                removeTxt(current);
                return false;
            case 229:
                //isComposing = true;
                break;
        }

        let val = $(this).val();

        console.log(val);
        
        if ( composition ){
            $('.pre').remove();

            val.split('').forEach( s => {
                current.before($('<span>', {
                    'class': 'pre'
                }).text(s));
            });

            moveCursor(current, true);

            let pos = $(this).get(0).selectionStart;
            let elm = $('.pre').eq(pos);
            if ( elm.length > 0 ){
                moveCursor(elm, false);
            } else {
                //moveCursor(current, false);
            }
        } else {
            current.before($('<span>', {
                'class': 'txt'
            }).text(val));

            $(this).val('');

            moveCursor(current, true);
        }
    });

    $('.input').on('compositionstart', function(){
        console.log('compositionstart');
        composition = true;
    });

    $('.input').on('compositionend', function(){
        console.log('compositionend');
        composition = false;

        $('.pre').removeClass('pre').addClass('txt');

        $(this).val('');
    });

    $('.input').on('blur', function(){
        console.log('blur');
        $('.pre').removeClass('pre').addClass('txt');

        $(this).val('');
    });

    $(document).on('mousedown', '.txt', function( event ){
        event.preventDefault();

        mousedown = true;

        $('*').removeClass('selection-start');
        $('*').removeClass('selection');
        $(this).addClass('selection-start');

        moveCursor(this, true);

        return false;
    });

    $(document).on('mouseup', function(){
        mousedown = false;
    });

    $(document).on('mouseover', '.txt', function(){
        if ( mousedown ){
            if ( $(this).hasClass('selection-start') ){
                return false;
            }

            $('*').removeClass('selection');

            let that = this;
            let isStart = false;

            $('.txt').each(function(){
                if ( $(this).hasClass('selection-start') || this == that ){
                    isStart = ! isStart;
                }

                if ( isStart ){
                    $(this).addClass('selection');
                }
            });
        }
    });

    const moveCursor = function( elm, is ){
        console.log('moveCursor', elm, is);

        if ( $(elm).length === 0 ){
            return false;
        }

        if ( is ){
            current = $(elm);
        }

        let top = $(elm).offset().top;
        let left = $(elm).offset().left;

        console.log(top, left);
        console.log(current.text());

        if ( top == 0 ){
            console.log(current.text());
        }

        $(is ? '.cursor' : '.cursor-red').css({
            'top': top,
            'left': left
        });

        $('.input').focus();
    };

    const removeTxt = function( elm ){
        if ( $(elm).length === 0 ){
            return false;
        }

        if ( $(elm).hasClass('txt-end') ){
            return false;
        }

        if ( elm === current ){
            current = current.next();
        }

        $(elm).remove();

        moveCursor(current, true);
    }
})();