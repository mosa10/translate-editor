<tr class="line" data-range="{{ $sentence->range ?? '' }}">
    <td class="td-position">{{ $position ?? '' }}</td>
    <td class="td-preprocess">{{ $sentence->preprocess ?? '' }}</td>
    <td class="td-bookmark">
        @if ( isset($sentence) && $sentence->bookmark )
            <i class="far fa-bookmark"></i>
        @else
            <i class="fas fa-bookmark"></i>
        @endif
    </td>
    <td class="td-sentence">
        <div class="row">
            <div class="sentence sentence-s col-6">
                <div class="text text-s">{{ $sentence->source_tag ?? '' }}</div>
            </div>
            <div class="sentence sentence-t col-6">
                <div class="text text-t">{{ $sentence->target_tag ?? '' }}</div>
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
    <td class="td-comment"><i class="far fa-comment"></i></td>
</tr>