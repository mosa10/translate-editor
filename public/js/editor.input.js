class EditorInput extends EditorCore {
    constructor() {
        super();

        this.current = null;
        this.currentS = null;
        this.currentT = null;
        this.composition = false;
        this.mousedown = false;
    }

    initialize() {
        // notification
        $(document).on('editor.input.join', this.onJoin);
        $(document).on('editor.input.split', this.onSplit);
        $(document).on('editor.input.reset', this.onReset);
        $(document).on('editor.input.insertText', this.onInsertText);
        $(document).on('editor.input.replaceSource', this.onReplaceSource);
        $(document).on('editor.input.insertSource', this.onInsertSource);
        $(document).on('editor.input.insertTag', this.onInsertTag);

        // document
        $(document).on('mouseup', this.onMouseupDocument);

        // .sentence
        $(document).on('mousedown', '.sentence', this.onMousedownSentence);
        $(document).on('click', '.sentence, .txt', this.onClickSentenceOrTxt);

        // .txt
        $(document).on('mousedown', '.txt', this.onMousedownTxt);
        $(document).on('mouseleave', '.txt', this.onMouseleaveTxt);

        // #input-key
        $('#input-key').on('copy', this.onCopyInputKey);
        $('#input-key').on('paste', this.onPasteInputKey);
        $('#input-key').on('contextmenu', this.onContextmenuInputKey);
        $('#input-key').on('focus', this.onFocusInputKey);
        $('#input-key').on('keydown', this.onKeydownInputKey);
        $('#input-key').on('keyup', this.onKeyupInputKey);
        $('#input-key').on('compositionstart', this.onCompositionstartInputKey);
        $('#input-key').on('compositionend', this.onCompositionendInputKey);
        $('#input-key').on('blur', this.onBlurInputKey);

    }

    onJoin = () => {
        let line1 = this.current.closest('.line');
        let line2 = line1.next();

        let range1 = line1.attr('data-range');
        let range2 = line2.attr('data-range');

        ['.text-s', '.text-t'].map(function(target) {
            let target1 = line1.find(target);
            let target2 = line2.find(target);

            target1.find('.txt-end').remove();

            if (range1.search(/e$/) >= 0) {
                target1.append($('<span>', {
                    'class': 'join'
                }));
            }

            target1.append(target2.children());
        });

        line2.remove();

        let range = [range1, range2].join(',');

        line1.attr('data-range', range);

        this.triggerJoin({
            range: range,
            range1: range1,
            range2: range2
        });
    }

    onSplit = () => {
        let $line = this.currentS.closest('.line');
        let $textS = $line.find('.text-s');

        let range = $line.attr('data-range');
        let index = $textS.find('.txt').index(this.currentS);

        let ranges = range.split(',');
        let idxOffset = 0;
        let rangeHit;
        let idHit;
        let idxC = 0;
        let r1;
        let r2;

        ranges.some(r => {
            let id = r.split(':')[0];
            let idx = r.split(':')[1].split('-');
            let idxS = parseInt(idx[0]);
            let idxE = parseInt(idx[1]);

            for (let idx = idxS; idx <= idxE; idx++) {
                if (idxC === index) {
                    rangeHit = r;
                    r1 = id + ':' + idxS + '-' + idx;
                    r2 = id + ':' + (idx + 1) + '-' + idxE;
                    return true;
                }

                idxC++;
            }
        });

        console.log(range, index);
        console.log(rangeHit, r1, r2);

        let tmp = range.split(rangeHit);
        let range1 = [tmp[0], r1].filter(v => v).join(',');
        let range2 = [r2, tmp[1]].filter(v => v).join(',');

        console.log(range1, range2);

        let $lineNew = $($('#template-sentence').html());
        $line.after($lineNew);

        let nextAll = this.currentS.nextAll();
        $lineNew.find('.text-s').append(this.currentS).append(nextAll);

        this.triggerSplit({
            range: range,
            range1: range1,
            range2: range2
        });
    }

    onReset = () => {
        this.currentT.closest('.line').find('.text-t').empty();
    }

    onInsertText = (event, data) => {
        let range = this.current.closest('.line').attr('data-range');

        let $span = $('<span>', {
            'class': 'txt'
        }).text(data.text);

        this.insertText(range, $span.html());
    }

    onReplaceSource = () => {
        let range = this.current.closest('.line').attr('data-range');
        let source = this.current.closest('.line').find('.text-s');

        this.replaceText(range, source.html());
    }

    onInsertSource = () => {
        let range = this.current.closest('.line').attr('data-range');
        let source = this.current.closest('.line').find('.text-s');

        this.insertText(range, source.html());
    }

    onInsertTag = () => {
        let source = this.currentT.closest('.line').find('.text-s');
        let target = this.currentT.closest('.line').find('.text-t');

        let that;
        let hit;

        source.find('.tag').each(function() {
            that = this;
            let index = $(this).attr('data-index');

            let isHit = false;

            target.find('.tag').each(function() {
                if (index === $(this).attr('data-index')) {
                    isHit = true;

                    return false;
                }
            });

            if (!isHit) {
                hit = that;

                return false;
            }
        });

        if (that) {
            this.currentT.before($(that).clone());

            this.triggerChange({ elmLine: this.currentT.closest('.line') });
        }
    }


    onMousedownSentence = (event) => {
        event.preventDefault();
        event.stopPropagation();

        // テキスト最後の要素のmousedownイベント発火
        $(event.currentTarget).find('.txt').last().trigger('mousedown');
    }

    onCopyInputKey = (event) => {
        return false;
    }

    onPasteInputKey = (event) => {
        return false;
    }

    onContextmenuInputKey = (event) => {
        return false;
    }

    onFocusInputKey = (event) => {
        return false;
    }

    onKeydownInputKey = (event) => {
        //console.log('keydown', event.keyCode, composition);

        switch (event.keyCode) {
            // End
            case 35:
                if (!this.composition) {
                    let elm = $('td.focus .txt').last();

                    if (event.shiftKey) {
                        this.select($('.txt').index($('.txt.selection-start')), $('.txt').index(elm));
                    }
                    this.moveCursor(elm, true);
                }
                return false;
                // Home
            case 36:
                if (!this.composition) {
                    let elm = $('td.focus .txt').first();

                    if (event.shiftKey) {
                        this.select($('.txt').index($('.txt.selection-start')), $('.txt').index(elm));
                    }
                    this.moveCursor(elm, true);
                }
                return false;
                // 左矢印
            case 37:
                if (!this.composition) {
                    if (event.shiftKey) {
                        this.current.prev().toggleClass('selection');

                        this.moveCursor(this.current.prev(), true);
                    } else {
                        if ($('.txt.selection').length > 0) {
                            this.moveCursor($('.txt.selection').first(), true);
                            this.clearSelect();
                        } else {
                            this.moveCursor(this.current.prev(), true);
                        }
                    }
                }
                return false;
                // 上矢印
            case 38:
                this.clearSelect();

                var moveElm = this.guessMoveElm(this.current, true);
                if (event.shiftKey) {
                    this.select($('.txt').index($('.txt.selection-start')), $('.txt').index(moveElm));
                }
                this.moveCursor(moveElm, true);
                return false;
                // 右矢印
            case 39:
                if (!this.composition) {
                    if (event.shiftKey) {
                        this.current.toggleClass('selection');

                        this.moveCursor(this.current.next(), true);
                    } else {
                        if ($('.txt.selection').length > 0) {
                            this.clearSelect();
                        } else {
                            this.moveCursor(this.current.next(), true);
                        }
                    }
                }
                return false;
                // 下矢印
            case 40:
                this.clearSelect();

                var moveElm = this.guessMoveElm(this.current, false);
                if (event.shiftKey) {
                    this.select($('.txt').index($('.txt.selection-start')), $('.txt').index(moveElm));
                }
                this.moveCursor(moveElm, true);
                return false;
        }
    }

    onKeyupInputKey = (event) => {
        console.log('keyup', event.keyCode, this.composition);

        event.preventDefault();
        event.stopPropagation();

        switch (event.keyCode) {
            // back space
            case 8:
                if ($('.txt.selection').length > 0) {
                    $('.txt.selection').remove();
                } else {
                    this.removeTxt(this.currentT.prev());
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
                if ($('.txt.selection').length > 0) {
                    $('.txt.selection').remove();
                } else {
                    this.removeTxt(this.currentT);
                }
                return false;
                // a
            case 65:
                if (event.ctrlKey) {
                    this.selectAll();
                    return false;
                }
                break;
                // c
            case 67:
                if (event.ctrlKey) {
                    this.copyText();
                    return false;
                }
                break;
                // v
            case 86:
                if (event.ctrlKey) {
                    this.pasteText();
                    return false;
                }
                break;
                // x
            case 88:
                if (event.ctrlKey) {
                    this.cutText();
                    return false;
                }
                break;
            default:
                break;
        }

        let val = $(event.currentTarget).val();

        if (val.length == 0) {
            return false;
        }

        //console.log(val);

        $('.txt.selection').remove();

        if (this.composition) {
            $('.pre').remove();

            val.split('').forEach(s => {
                this.currentT.before($('<span>', {
                    'class': 'pre'
                }).text(s));
            });

            this.moveCursor(this.currentT, true);

            let pos = $(this).get(0).selectionStart;
            let elm = $('.pre').eq(pos);
            if (elm.length > 0) {
                this.moveCursor(elm, false);
            } else {
                this.moveCursor(this.currentT, false);
            }

            this.moveInput();
        } else {
            this.currentT.before($('<span>', {
                'class': 'txt'
            }).text(val));

            $(event.currentTarget).val('');

            this.moveCursor(this.currentT, true);
        }

        this.triggerChange({ elmLine: this.currentT.closest('.line') });

        return false;
    }

    onCompositionstartInputKey = (event) => {
        this.composition = true;

        $(event.currentTarget).css('width', '1000px');

        this.moveInput();
    }

    onCompositionendInputKey = (event) => {
        this.composition = false;

        $(event.currentTarget).css('width', '0');

        $('.pre').removeClass('pre').addClass('txt');

        $(event.currentTarget).val('');
    }

    onBlurInputKey = (event) => {
        console.log('blur');

        $('.pre').removeClass('pre').addClass('txt');

        $(event.currentTarget).val('');
    }

    onClickSentenceOrTxt = (event) => {
        // ダブルクリック
        if (event.detail === 2) {
            let indexStart = 0;
            let indexEnd = $('.txt').length - 1;

            let indexTarget = $('.txt').index(this);

            $('.txt').each(function(index) {
                if ($.trim($(this).text()).length === 0) {
                    if (index < indexTarget) {
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
        else if (event.detail === 3) {
            $('.txt').removeClass('selection');
            $('.txt').addClass('selection');
        }
    }

    onMousedownTxt = (event) => {
        //console.log('mousedown');

        event.preventDefault();
        event.stopPropagation();

        this.mousedown = true;

        $('*').removeClass('selection-start');
        $('*').removeClass('selection');
        $(event.currentTarget).addClass('selection-start');

        this.moveCursor(event.currentTarget, true);

        return false;
    }

    onMouseupDocument = () => {
        //console.log('mouseup');

        this.mousedown = false;
    }

    onMouseleaveTxt = (event) => {
        //console.log('mouseleave', mousedown, $(this).text());

        if (this.mousedown) {
            let indexStart = $('.txt').index($('.txt.selection-start'));
            let indexEnd = $('.txt').index(event.currentTarget);

            this.select(indexStart, indexEnd);

            this.moveCursor(indexStart < indexEnd ? $(event.currentTarget).next() : event.currentTarget, true);
        }
    };

    select(indexStart, indexEnd) {
        console.log('start', indexStart, indexEnd);

        $('.txt').removeClass('selection');

        let isStart = false;
        let isLast = false;

        let isBack = indexStart < indexEnd;

        // 前から走査
        $('.txt').each(function(index) {
            if (index == indexStart) {
                if (isBack) {
                    isStart = true;
                } else {
                    isLast = true;
                }
            }
            if (index == indexEnd) {
                if (isBack) {
                    isLast = true;
                } else {
                    isStart = true;
                }
            }

            if (isStart) {
                $(this).addClass('selection');
            }

            if (isLast) {
                return false;
            }
        });
    }

    selectAll() {
        $('.txt').removeClass('selection');
        $('.txt').addClass('selection');
    }

    clearSelect() {
        $('.txt').removeClass('selection');
    }

    replaceText = (range, html) => {
        $('.line[data-range="' + range + '"] .text-t').empty().append(html);
    }

    insertText = (range, html) => {
        let $target = $('.line[data-range="' + range + '"] .text-t .caret').first();

        if ($target.length === 0) {
            $target = $('.line[data-range="' + range + '"] .text-t .txt').first();
        }

        $target.before(html);
    }

    copyText() {
        //console.log('copyText');

        let text = '';

        $('.txt.selection').each(function() {
            text += $(this).text();
        });

        console.log(text);

        $('.copy').val(text);

        $('.copy').select();
        document.execCommand('copy');

        $('#input-key').focus();
    }

    cutText() {
        //console.log('cutText');

        let text = '';

        $('.txt.selection').each(function() {
            text += $(this).text();
        });

        $('.txt.selection').remove();

        console.log(text);

        $('.copy').val(text);
    }

    pasteText() {
        //console.log('pasteText');

        let text = $('.copy').val();
        console.log(text);

        text.split('').forEach(txt => {
            this.currentT.before($('<span>', {
                'class': 'txt'
            }).text(txt));
        });

        $('.txt.selection').remove();
    };

    guessMoveElm(elm, isUp) {
        let target = elm;
        let diffTop = Number.MAX_SAFE_INTEGER;
        let diffLeft = Number.MAX_SAFE_INTEGER;

        let top = $(elm).offset().top;
        let left = $(elm).offset().left;


        $('.txt').each(function() {
            let targetTop = $(this).offset().top;
            let targetLeft = $(this).offset().left;

            if ((isUp && targetTop < top) || (!isUp && targetTop > top)) {
                let tmpTop = Math.abs(top - targetTop);
                let tmpLeft = Math.abs(left - targetLeft);

                if (tmpTop <= diffTop) {
                    if (tmpTop != diffTop) {
                        diffLeft = Number.MAX_SAFE_INTEGER;
                    }

                    diffTop = tmpTop;

                    if (tmpLeft <= diffLeft) {
                        target = this;
                        diffLeft = tmpLeft;
                    }
                }
            }
        });

        console.log(top, left, $(target).offset().top, $(target).offset().left, diffTop, diffLeft);

        return target;
    };

    moveCursor(elm, is) {
        //console.log('moveCursor', elm, is);

        if ($(elm).length === 0) {
            return false;
        }

        let isSource = $(elm).closest('.text').hasClass('text-s');

        if (is) {
            this.current = $(elm);

            if (isSource) {
                this.currentS = $(elm);
            } else {
                this.currentT = $(elm);
            }
        }

        $('.line').removeClass('focus');
        $('.line td').removeClass('focus');
        $(elm).closest('.line').addClass('focus');
        $(elm).closest('td').addClass('focus');

        let targetClass = is ? '.txt' : '.pre';

        $(isSource ? '.text-s' : '.text-t').find(targetClass).removeClass('caret');
        $(elm).addClass('caret');

        if (isSource) {
            // 対訳にカーソルが無い場合
            if ($(elm).closest('.line').find('.text-t .caret').length === 0) {
                this.moveCursor($(elm).closest('.line').find('.text-t .txt').first(), true);
            }
        } else {
            $('#input-key').focus();
        }
    }

    moveInput() {
        let top = 0;
        let left = 0;

        if ($('.pre').length == 0) {
            top = $(this.currentT).offset().top + $(this.currentT).outerHeight();
            left = $(this.currentT).offset().left;
        } else {
            $('.pre').each(function() {
                top = Math.max(top, $(this).offset().top + $(this).outerHeight());
            });

            left = $('.pre').first().offset().left;
        }

        console.log(top, left);

        if (top == 0) {}

        $('.cursor').css({
            'top': top,
            'left': left
        });
    }

    removeTxt(elm) {
        if ($(elm).length === 0) {
            return false;
        }

        if (elm === this.currentT) {
            this.currentT = this.currentT.next();
        }

        $(elm).remove();

        this.moveCursor(this.currentT, true);
    }

}