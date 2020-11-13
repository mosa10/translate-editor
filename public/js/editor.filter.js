class EditorFilter {
    constructor() {
        this.filterGroup = 0;

        $('.input-filter').on('input', this.onInputInputFilter);

        $('#btn-replace-prev').on('click', this.onClickBtnReplacePrev);
        $('#btn-replace-next').on('click', this.onClickBtnReplaceNext);
        $('#btn-replace-replace').on('click', this.onClickBtnReplaceReplace);
        $('#btn-replace-replace-all').on('click', this.onClickBtnReplaceReplaceAll);
    }

    onInputInputFilter = () => {
        this.filter();
    }

    filter = () => {
        console.log('input input filter');

        this.filterGroup = 0;

        $('.line').hide();

        let textS = $('#input-filter-s').val();
        let textT = $('#input-filter-t').val();

        $('.line').each((index, element) => {
            if (this.filterLine(true, element, textS) && this.filterLine(false, element, textT)) {
                $(element).show();
            }
        });
    }

    filterLine = (isSource, line, searchText) => {
        let target = isSource ? '.text-s' : '.text-t';

        $(line).find(target + ' .txt').removeClass('filter-hit');

        if ($.trim(searchText).length === 0) {
            return true;
        }

        let text = $(line).find(target + ' .txt').text();
        // console.log(text);

        const regexp = new RegExp(searchText, 'g');

        let isHit = false;
        let result;

        while (result = regexp.exec(text)) {
            isHit = true;

            for ( let index=result.index; index<result.index+searchText.length; index++ ){
                let $txt = $(line).find(target + ' .txt').eq(index).addClass('filter-hit');
                
                if ( ! isSource ){
                    $txt.attr('data-group', this.filterGroup);
                }
            }

            this.filterGroup++;
        }

        return isHit;
    }

    onClickBtnReplacePrev = () => {
        this.moveFilterHit(true);
    }

    onClickBtnReplaceNext = () => {
        this.moveFilterHit(false);
    }

    moveFilterHit = ( isPrev ) => {
        let $target;

        if ( $('.line .text-t .filter-hit.filter-focus').length == 0 ){
            $target = $('.line .text-t .filter-hit').first();
        } else {
            let $focus = $('.line .text-t .filter-hit.filter-focus').first();

            let group = parseInt($focus.attr('data-group'));
            let focusGroup = 0;
            if ( isPrev ){
                focusGroup = group - 1;
                focusGroup = focusGroup < 0 ? this.filterGroup - 1 : focusGroup;
            } else {
                focusGroup = group + 1;
                focusGroup = focusGroup >= this.filterGroup ? 0 : focusGroup;
            }

            $target = $('.filter-hit[data-group="' + focusGroup + '"]').first();
        }

        $('.filter-hit').removeClass('filter-focus');

        let group = $target.attr('data-group');

        $('.filter-hit[data-group="' + group + '"]').addClass('filter-focus');
    }

    onClickBtnReplaceReplace = () => {
        let $target;

        if ( $('.line .text-t .filter-hit.filter-focus').length > 0 ){
            $target = $('.line .text-t .filter-hit.filter-focus').first();
        }

        this.moveFilterHit(false);

        if ( $target ){
            let replace = $('#input-replace').val();

            let group = $target.attr('data-group');

            replace.split('').forEach( t2 => {
                $target.before($('<span>', {
                    'class': 'txt'
                }).text(t2));
            });

            $('.filter-hit[data-group="' + group + '"]').remove();
        }

        this.filter();
    }
}