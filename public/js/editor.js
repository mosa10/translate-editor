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
                //console.log(data);
            }
        });
    };

    initialize();

    let current = null;
    let composition = false;
    let mousedown = false;

    $(document).on('keyup', function( event ){
        //console.log('document keyup');

        switch ( event.keyCode ){

        }
    });

    $('.input').on('copy', function( event ){
        return false;
    });

    $('.input').on('paste', function( event ){
        return false;
    });

    $('.input').on('contextmenu', function( event ){
        return false;
    });

    $('.input').on('keydown', function( event ){
        //console.log('keydown', event.keyCode, composition);

        switch ( event.keyCode ){
            // 左矢印
            case 37:
                if ( ! composition ){
                    if ( event.shiftKey ){
                        current.prev().toggleClass('selection');
                    } else {
                        clearSelect();
                    }

                    moveCursor(current.prev(), true);
                }
                return false;
            // 上矢印
            case 38:
                clearSelect();

                var moveElm = guessMoveElm(current, true);
                if ( event.shiftKey ){
                    select($('.txt').index($('.txt.selection-start')), $('.txt').index(moveElm));
                }
                moveCursor(moveElm, true);
                return false;
            // 右矢印
            case 39:
                if ( ! composition ){
                    if ( event.shiftKey ){
                        current.toggleClass('selection');
                    } else {
                        clearSelect();
                    }
                    
                    moveCursor(current.next(), true);
                }
                return false;
            // 下矢印
            case 40:
                clearSelect();
                var moveElm = guessMoveElm(current, false);
                if ( event.shiftKey ){
                    select($('.txt').index($('.txt.selection-start')), $('.txt').index(moveElm));
                }
                moveCursor(moveElm, true);
                return false;
        }
    });

    $('.input').on('keyup', function( event ){
        console.log('keyup', event.keyCode, composition);

        event.preventDefault();
        event.stopPropagation();
        
        let isComposing = false;

        switch ( event.keyCode ){
            // back space
            case 8:
                if ( $('.txt.selection').length > 0 ){
                    $('.txt.selection').remove();
                } else {
                    removeTxt(current.prev());
                }
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
                if ( $('.txt.selection').length > 0 ){
                    $('.txt.selection').remove();
                } else {
                    removeTxt(current);
                }
                return false;
            // a
            case 65:
                if ( event.ctrlKey ){
                    selectAll();
                    return false;
                }
                break;
            // c
            case 67:
                if ( event.ctrlKey ){
                    copyText();
                    return false;
                }
                break;
            // v
            case 86:
                if ( event.ctrlKey ){
                    pasteText();
                    return false;
                }
                break;
            // x
            case 88:
                if ( event.ctrlKey ){
                    cutText();
                    return false;
                }
                break;
            case 229:
                //isComposing = true;
                break;
        }

        let val = $(this).val();

        if ( val.length == 0 ){
            return false;
        }

        //console.log(val);

        $('.txt.selection').remove();
        
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
                moveCursor(current, false);
            }

            moveInput();
        } else {
            current.before($('<span>', {
                'class': 'txt'
            }).text(val));

            $(this).val('');

            moveCursor(current, true);
        }

        return false;
    });

    $('.input').on('compositionstart', function(){
        //console.log('compositionstart');
        composition = true;

        $(this).css('width', '1000px');

        moveInput();
    });

    $('.input').on('compositionend', function(){
        //console.log('compositionend');
        composition = false;

        $(this).css('width', '0');

        $('.pre').removeClass('pre').addClass('txt');

        $(this).val('');
    });

    $('.input').on('blur', function(){
        //console.log('blur');
        $('.pre').removeClass('pre').addClass('txt');

        $(this).val('');
    });

    $(document).on('click', '.txt', function( event ){
        // ダブルクリック
        if ( event.detail === 2 ){
            let indexStart = 0;
            let indexEnd = $('.txt').length - 1;
    
            let indexTarget = $('.txt').index(this);
    
            $('.txt').each(function( index ){
                if ( $.trim($(this).text()).length === 0 ){
                    if ( index < indexTarget ) {
                        indexStart = index;
                    } else {
                        indexEnd = index;
    
                        return false;
                    }
                }
            });
    
            $('.txt').removeClass('selection');
            $('.txt').slice(indexStart, indexEnd).addClass('selection');
        }
        // トリプルクリック
        else if ( event.detail === 3 ){
            $('.txt').removeClass('selection');
            $('.txt').addClass('selection');
        }
    });

    $(document).on('mousedown', '.txt', function( event ){
        //console.log('mousedown');

        event.preventDefault();
        event.stopPropagation();

        mousedown = true;

        $('*').removeClass('selection-start');
        $('*').removeClass('selection');
        $(this).addClass('selection-start');

        moveCursor(this, true);

        return false;
    });

    $(document).on('mouseup', function(){
        //console.log('mouseup');

        mousedown = false;
    });

    $(document).on('mouseleave', '.txt', function(){
        //console.log('mouseleave', mousedown, $(this).text());

        if ( mousedown ){
            let indexStart = $('.txt').index($('.txt.selection-start'));
            let indexEnd = $('.txt').index(this);

            select(indexStart, indexEnd);

            moveCursor(indexStart < indexEnd ? $(this).next() : this, true);
        }
    });

    const select = function( indexStart, indexEnd ){
        console.log('start', indexStart, indexEnd);

        $('.txt').removeClass('selection');

        let isStart = false;
        let isLast = false;

        let isBack = indexStart < indexEnd;

        // 前から走査
        $('.txt').each(function( index ){
            if ( index == indexStart ){
                if ( isBack ){
                    isStart = true;
                } else {
                    isLast = true;
                }
            }
            if ( index == indexEnd ){
                if ( isBack ){
                    isLast = true;
                } else {
                    isStart = true;
                }
            }

            if ( isStart ){
                $(this).addClass('selection');
            }

            if ( isLast ){
                return false;
            }
        });
    };

    const selectAll = function(){
        $('.txt').removeClass('selection');
        $('.txt').addClass('selection');
    };

    const clearSelect = function(){
        $('.txt').removeClass('selection');
    };

    const copyText = function(){
        //console.log('copyText');

        let text = '';

        $('.txt.selection').each(function(){
            text += $(this).text();
        });

        console.log(text);

        $('.copy').val(text);

        $('.copy').select();
        document.execCommand('copy');
    };

    const cutText = function(){
        //console.log('cutText');

        let text = '';

        $('.txt.selection').each(function(){
            text += $(this).text();
        });

        $('.txt.selection').remove();

        console.log(text);

        $('.copy').val(text);
    };

    const pasteText = function(){
        //console.log('pasteText');

        let text = $('.copy').val();
        console.log(text);

        text.split('').forEach( txt => {
            current.before($('<span>', {
                'class': 'txt'
            }).text(txt));
        });

        $('.txt.selection').remove();
    };

    const guessMoveElm = function( elm, isUp ){
        let target = elm;
        let diffTop = Number.MAX_SAFE_INTEGER;
        let diffLeft = Number.MAX_SAFE_INTEGER;

        let top = $(elm).offset().top;
        let left = $(elm).offset().left;

        
        $('.txt').each(function(){
            let targetTop = $(this).offset().top;
            let targetLeft = $(this).offset().left;
            
            if ( (isUp && targetTop < top) || (! isUp && targetTop > top) ){
                let tmpTop = Math.abs(top - targetTop);
                let tmpLeft = Math.abs(left - targetLeft);
                
                if ( tmpTop <= diffTop ){
                    if ( tmpTop != diffTop ){
                        diffLeft = Number.MAX_SAFE_INTEGER;
                    }

                    diffTop = tmpTop;

                    if ( tmpLeft <= diffLeft ){
                        target = this;
                        diffLeft = tmpLeft;
                    }
                }
            }
        });
        
        console.log(top, left, $(target).offset().top, $(target).offset().left, diffTop, diffLeft);

        return target;
    };

    const moveCursor = function( elm, is ){
        //console.log('moveCursor', elm, is);

        if ( $(elm).length === 0 ){
            return false;
        }

        if ( is ){
            current = $(elm);
        }


        let targetClass = is ? '.txt' : '.pre';

        $(targetClass).removeClass('caret');
        $(elm).addClass('caret');

        $('.input').focus();
    };

    const moveInput = function(){
        let top = 0;
        let left = 0;

        if ( $('.pre').length == 0 ){
            top = $(current).offset().top + $(current).outerHeight();
            left = $(current).offset().left;
        } else {
            $('.pre').each(function(){
                top = Math.max(top, $(this).offset().top + $(this).outerHeight());
            });

            left = $('.pre').first().offset().left;
        }

        console.log(top, left);
        //console.log(current.text());

        if ( top == 0 ){
            //console.log(current.text());
        }

        $('.cursor').css({
            'top': top,
            'left': left
        });
    };

    const removeTxt = function( elm ){
        if ( $(elm).length === 0 ){
            return false;
        }

        if ( elm === current ){
            current = current.next();
        }

        $(elm).remove();

        moveCursor(current, true);
    }
})();