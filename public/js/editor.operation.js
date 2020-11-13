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
}