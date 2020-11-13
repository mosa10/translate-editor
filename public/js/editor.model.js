class EditorModelSentence {
    constructor( data ) {
        this.document_id = data.document_id;
        this.range  = data.range;
        this.source = data.source;
        this.source_tag = data.source_tag;
        this.target = data.target;
        this.target_tag = data.target_tag;
    }
}