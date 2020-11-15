<tr class="line" data-range="{{ $sentence->range ?? '' }}">
    <td class="td-position">{{ $position ?? '' }}</td>
    <td class="td-preprocess">{{ $sentence->preprocess ?? '' }}</td>
    <td class="td-bookmark">
        @if ( isset($sentence) && $sentence->bookmark )
            <a class="btn-operation-bookmark-activate active">
                <i class="fas fa-bookmark"></i>
            </a>
        @else
            <a class="btn-operation-bookmark-activate">
                <i class="far fa-bookmark"></i>
            </a>
        @endif
    </td>
    <td class="td-sentence">
        <div class="container-fluid">
            <div class="row">
                <div class="sentence sentence-s col-6">
                    <div class="text text-s">{{ $sentence->source_tag ?? '' }}</div>
                </div>
                <div class="sentence sentence-t col-6">
                    <div class="text text-t">{{ $sentence->target_tag ?? '' }}</div>
                </div>
            </div>
        </div>
    </td>
    <td class="td-confirm">
        @if ( isset($sentence) && $sentence->confirm )
            <i class="fas fa-check-square"></i>
        @else
            <i class="far fa-check-square"></i>
        @endif
    </td>
    <td class="td-comment">
        <a class="btn-operation-comment-activate">
            <i class="far fa-comment"></i>
        </a>
    </td>
</tr>