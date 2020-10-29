class EditorOperation {
    initialize = () => {
        $('#btn-operation-join').on('click', this.onClickBtnOperationJoin);
        $('#btn-operation-tag').on('click', this.onClickBtnOperationTag);
    }

    onClickBtnOperationJoin = () => {
        $(document).trigger('editor.input.join');
    }
    
    onClickBtnOperationTag = () => {
        $(document).trigger('editor.input.insertTag');
    }
}