class EditorInput {
    self = null;

    constructor(){
        self = this;
    }

    initialize(){
        // document
        $(document).on('mouseup', self.onMouseupDocument);

        // .sentence
        $(document).on('mousedown', '.sentence', self.onMousedownSentence);
        $(document).on('click', '.sentence, .txt', self.onClickSentenceOrTxt);

        // #input-key
        $('#input-key').on('copy', self.onCopyInputKey);
        $('#input-key').on('paste', self.onPasteInputKey);
        $('#input-key').on('contextmenu', self.onContextmenuInputKey);
        $('#input-key').on('focus', self.onFocusInputKey);
        $('#input-key').on('keydown', self.onKeydownInputKey);
        $('#input-key').on('keyup', self.onKeyupInputKey);
        $('#input-key').on('compositionstart', self.onCompositionstartInputKey);
        $('#input-key').on('compositionend', self.onCompositionendInputKey);
        $('#input-key').on('blur', self.onBlurInputKey);

        // .txt
        $(document).on('mousedown', '.txt', self.onMousedownTxt);
        $(document).on('mouseleave', '.txt', self.onMouseleaveTxt);
    }

    current = null;
    composition = false;
    mousedown = false;

    onMousedownSentence( event ){
        event.preventDefault();
        event.stopPropagation();

        // テキスト最後の要素のmousedownイベント発火
        $(this).find('.txt').last().trigger('mousedown');
    }

    onCopyInputKey( event ){
        return false;
    }

    onPasteInputKey( event ){
        return false;
    }

    onContextmenuInputKey( event ){
        return false;
    }

    onFocusInputKey( event ){
        return false;
    }

    onKeydownInputKey( event ){
        //console.log('keydown', event.keyCode, composition);

        switch ( event.keyCode ){
            // End
            case 35:
                if ( ! self.composition ){
                    let elm = $('td.focus .txt').last();

                    if ( event.shiftKey ){
                        self.select($('.txt').index($('.txt.selection-start')), $('.txt').index(elm));
                    }
                    self.moveCursor(elm, true);
                }
                return false;
            // Home
            case 36:
                if ( ! self.composition ){
                    let elm = $('td.focus .txt').first();

                    if ( event.shiftKey ){
                        self.select($('.txt').index($('.txt.selection-start')), $('.txt').index(elm));
                    }
                    self.moveCursor(elm, true);
                }
                return false;
            // 左矢印
            case 37:
                if ( ! self.composition ){
                    if ( event.shiftKey ){
                        self.current.prev().toggleClass('selection');

                        self.moveCursor(self.current.prev(), true);
                    } else {
                        if ( $('.txt.selection').length > 0 ){
                            self.moveCursor($('.txt.selection').first(), true);
                            self.clearSelect();
                        } else {
                            self.moveCursor(self.current.prev(), true);
                        }
                    }
                }
                return false;
            // 上矢印
            case 38:
                self.clearSelect();

                var moveElm = self.guessMoveElm(self.current, true);
                if ( event.shiftKey ){
                    self.select($('.txt').index($('.txt.selection-start')), $('.txt').index(moveElm));
                }
                self.moveCursor(moveElm, true);
                return false;
            // 右矢印
            case 39:
                if ( ! self.composition ){
                    if ( event.shiftKey ){
                        self.current.toggleClass('selection');

                        self.moveCursor(self.current.next(), true);
                    } else {
                        if ( $('.txt.selection').length > 0 ){
                            self.clearSelect();
                        } else {
                            self.moveCursor(self.current.next(), true);
                        }
                    }
                }
                return false;
            // 下矢印
            case 40:
                self.clearSelect();

                var moveElm = self.guessMoveElm(self.current, false);
                if ( event.shiftKey ){
                    self.select($('.txt').index($('.txt.selection-start')), $('.txt').index(moveElm));
                }
                self.moveCursor(moveElm, true);
                return false;
        }
    }

    onKeyupInputKey( event ){
        console.log('keyup', event.keyCode, self.composition);

        event.preventDefault();
        event.stopPropagation();
        
        let isComposing = false;

        switch ( event.keyCode ){
            // back space
            case 8:
                if ( $('.txt.selection').length > 0 ){
                    $('.txt.selection').remove();
                } else {
                    self.removeTxt(self.current.prev());
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
                    self.removeTxt(self.current);
                }
                return false;
            // a
            case 65:
                if ( event.ctrlKey ){
                    self.selectAll();
                    return false;
                }
                break;
            // c
            case 67:
                if ( event.ctrlKey ){
                    self.copyText();
                    return false;
                }
                break;
            // v
            case 86:
                if ( event.ctrlKey ){
                    self.pasteText();
                    return false;
                }
                break;
            // x
            case 88:
                if ( event.ctrlKey ){
                    self.cutText();
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
        
        if ( self.composition ){
            $('.pre').remove();

            val.split('').forEach( s => {
                self.current.before($('<span>', {
                    'class': 'pre'
                }).text(s));
            });

            self.moveCursor(self.current, true);

            let pos = $(this).get(0).selectionStart;
            let elm = $('.pre').eq(pos);
            if ( elm.length > 0 ){
                self.moveCursor(elm, false);
            } else {
                self.moveCursor(self.current, false);
            }

            self.moveInput();
        } else {
            self.current.before($('<span>', {
                'class': 'txt'
            }).text(val));

            $(this).val('');

            self.moveCursor(self.current, true);
        }

        return false;
    }

    onCompositionstartInputKey( event ){
        //console.log('self.compositionstart');
        self.composition = true;

        $(this).css('width', '1000px');

        self.moveInput();
    }

    onCompositionendInputKey( event ){
        //console.log('self.compositionend');
        self.composition = false;

        $(this).css('width', '0');

        $('.pre').removeClass('pre').addClass('txt');

        $(this).val('');
    }

    onBlurInputKey( event ){
        console.log('blur');
        $('.pre').removeClass('pre').addClass('txt');

        $(this).val('');
    }

    onClickSentenceOrTxt( event ){
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
    }

    onMousedownTxt( event ){
        //console.log('mousedown');

        event.preventDefault();
        event.stopPropagation();

        self.mousedown = true;

        $('*').removeClass('selection-start');
        $('*').removeClass('selection');
        $(this).addClass('selection-start');

        self.moveCursor(this, true);

        return false;
    }

    onMouseupDocument(){
        //console.log('mouseup');

        self.mousedown = false;
    }

    onMouseleaveTxt(){
        //console.log('mouseleave', mousedown, $(this).text());

        if ( self.mousedown ){
            let indexStart = $('.txt').index($('.txt.selection-start'));
            let indexEnd = $('.txt').index(this);

            self.select(indexStart, indexEnd);

            self.moveCursor(indexStart < indexEnd ? $(this).next() : this, true);
        }
    };

    select( indexStart, indexEnd ){
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
    }

    selectAll(){
        $('.txt').removeClass('selection');
        $('.txt').addClass('selection');
    }

    clearSelect(){
        $('.txt').removeClass('selection');
    }

    copyText(){
        //console.log('copyText');

        let text = '';

        $('.txt.selection').each(function(){
            text += $(this).text();
        });

        console.log(text);

        $('.copy').val(text);

        $('.copy').self.select();
        document.execCommand('copy');

        $('#input-key').focus();
    }

    cutText(){
        //console.log('cutText');

        let text = '';

        $('.txt.selection').each(function(){
            text += $(this).text();
        });

        $('.txt.selection').remove();

        console.log(text);

        $('.copy').val(text);
    }

    pasteText(){
        //console.log('pasteText');

        let text = $('.copy').val();
        console.log(text);

        text.split('').forEach( txt => {
            self.current.before($('<span>', {
                'class': 'txt'
            }).text(txt));
        });

        $('.txt.selection').remove();
    };

    guessMoveElm( elm, isUp ){
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

    moveCursor( elm, is ){
        //console.log('moveCursor', elm, is);

        if ( $(elm).length === 0 ){
            return false;
        }

        if ( is ){
            self.current = $(elm);
        }

        $('.line').removeClass('focus');
        $('.line td').removeClass('focus');
        $(elm).closest('.line').addClass('focus');
        $(elm).closest('td').addClass('focus');

        let targetClass = is ? '.txt' : '.pre';

        $(targetClass).removeClass('caret');
        $(elm).addClass('caret');

        $('#input-key').focus();
    }

    moveInput(){
        let top = 0;
        let left = 0;

        if ( $('.pre').length == 0 ){
            top = $(self.current).offset().top + $(self.current).outerHeight();
            left = $(self.current).offset().left;
        } else {
            $('.pre').each(function(){
                top = Math.max(top, $(this).offset().top + $(this).outerHeight());
            });

            left = $('.pre').first().offset().left;
        }

        console.log(top, left);
        //console.log(self.current.text());

        if ( top == 0 ){
            //console.log(self.current.text());
        }

        $('.cursor').css({
            'top': top,
            'left': left
        });
    }

    removeTxt( elm ){
        if ( $(elm).length === 0 ){
            return false;
        }

        if ( elm === self.current ){
            self.current = self.current.next();
        }

        $(elm).remove();

        self.moveCursor(self.current, true);
    }

}
