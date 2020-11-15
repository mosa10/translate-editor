class EditorOperation {
    initialize = () => {
        $('#btn-operation-filter').on('click', this.onClickBtnOperationFilter);
        $('#btn-operation-display-st-v').on('click', this.onClickBtnOperationDisplaySTV);
        $('#btn-operation-display-st-h').on('click', this.onClickBtnOperationDisplaySTH);
        $('#btn-operation-display-s').on('click', this.onClickBtnOperationDisplayS);
        $('#btn-operation-display-t').on('click', this.onClickBtnOperationDisplayT);
        $('#btn-operation-mt').on('click', this.onClickBtnOperationMt);
        $('#btn-operation-sim').on('click', this.onClickBtnOperationSim);
        $('#btn-operation-join').on('click', this.onClickBtnOperationJoin);
        $('#btn-operation-split').on('click', this.onClickBtnOperationSplit);
        $('#btn-operation-reset').on('click', this.onClickBtnOperationReset);
        $('#btn-operation-replace-source').on('click', this.onClickBtnOperationReplaceSource);
        $('#btn-operation-insert-source').on('click', this.onClickBtnOperationInsertSource);
        $('#btn-operation-tag').on('click', this.onClickBtnOperationTag);
        $('#btn-operation-bookmark').on('click', this.onClickBtnOperationBookmark);
        $('#btn-operation-bookmark-prev').on('click', this.onClickBtnOperationBookmarkPrev);
        $('#btn-operation-bookmark-next').on('click', this.onClickBtnOperationBookmarkNext);
        $('.btn-operation-bookmark-activate').on('click', this.onClickBtnOperationBookmarkActivate);
        $('.btn-operation-comment-activate').on('click', this.onClickBtnOperationCommentActivate);
    }

    onClickBtnOperationFilter = () => {
        $('#filter').toggle();
    }

    onClickBtnOperationDisplaySTV = () => {
        $('.sentence-s').show().removeClass('col-6').addClass('col-12');
        $('.sentence-t').show().removeClass('col-6').addClass('col-12');
    }

    onClickBtnOperationDisplaySTH = () => {
        $('.sentence-s').show().removeClass('col-12').addClass('col-6');
        $('.sentence-t').show().removeClass('col-12').addClass('col-6');
    }

    onClickBtnOperationDisplayS = () => {
        $('.sentence-s').show().removeClass('col-6').addClass('col-12');
        $('.sentence-t').hide();
    }

    onClickBtnOperationDisplayT = () => {
        $('.sentence-s').hide();
        $('.sentence-t').show().removeClass('col-6').addClass('col-12');
    }

    onClickBtnOperationMt = () => {

    }

    onClickBtnOperationSim = () => {

    }

    onClickBtnOperationJoin = () => {
        $(document).trigger('editor.input.join');
    }

    onClickBtnOperationSplit = () => {
        $(document).trigger('editor.input.split');
    }

    onClickBtnOperationReset = () => {
        $(document).trigger('editor.input.reset');
    }

    onClickBtnOperationReplaceSource = () => {
        $(document).trigger('editor.input.replaceSource');
    }

    onClickBtnOperationInsertSource = () => {
        $(document).trigger('editor.input.insertSource');
    }

    onClickBtnOperationTag = () => {
        $(document).trigger('editor.input.insertTag');
    }

    onClickBtnOperationBookmark = (event) => {
        if ($('.line.focus').length === 0) {
            return false;
        }

        $('.line.focus .btn-operation-bookmark-activate').trigger('click');
    }

    onClickBtnOperationBookmarkPrev = (event) => {
        let range = null;

        $($('.line.focus').prevAll().get().reverse()).each((index, element) => {
            if ($(element).find('.btn-operation-bookmark-activate.active').length > 0) {
                range = $(element).attr('data-range');
            }
        });

        if (range === null) {
            let $tmp = $('.btn-operation-bookmark-activate.active').last();

            if ($tmp.length > 0) {
                range = $tmp.closest('.line').attr('data-range');
            }
        }

        if (range !== null) {
            this.focusLine(range);
        }
    }

    onClickBtnOperationBookmarkNext = (event) => {
        let range = null;

        $('.line.focus').nextAll().each((index, element) => {
            if ($(element).find('.btn-operation-bookmark-activate.active').length > 0) {
                range = $(element).attr('data-range');
                return false;
            }
        });

        if (range === null) {
            let $tmp = $('.btn-operation-bookmark-activate.active').first();

            if ($tmp.length > 0) {
                range = $tmp.closest('.line').attr('data-range');
            }
        }

        if (range !== null) {
            this.focusLine(range);
        }

    }


    onClickBtnOperationBookmarkActivate = (event) => {
        if ($(event.currentTarget).hasClass('active')) {
            $(event.currentTarget).removeClass('active');
            $(event.currentTarget).find('i').removeClass('fas').addClass('far');
        } else {
            $(event.currentTarget).addClass('active');
            $(event.currentTarget).find('i').removeClass('far').addClass('fas');
        }
    }

    // Todo:
    focusLine = (range) => {
        console.log(range);

        $('.line.focus').removeClass('focus');

        $('#workspace').animate({
            scrollTop: $("#workspace").scrollTop() - $("#workspace").offset().top + $('.line[data-range="' + range + '"]').offset().top
        }, 300, 'swing', () => {
            $('.line[data-range="' + range + '"]').addClass('focus');
        });
    }

    onClickBtnOperationCommentActivate = (event) => {
        let $target = $(event.currentTarget).closest('.line').find('.sentence-t');

        $('#comment-popup').show().position({
            'of': $target,
            'at': 'right bottom',
            'my': 'right top'
        });

    }
}