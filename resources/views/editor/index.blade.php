<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
    <head>
        <link href="{{ asset('css/editor.css') }}" rel="stylesheet">
        <script src="https://code.jquery.com/jquery-3.3.1.min.js"></script>
        <script src="{{ asset('js/editor.view.js') }}" defer></script>
        <script src="{{ asset('js/editor.js') }}" defer></script>
    </head>
    <body>
        <table>
            <tbody>
                <tr class="twe_segment twe_active twe_active_background" data-position="0" display-position="1" paragraph="m:paragraph-a35ZISxCihfi1oML0_dc5:0">
                    <td class="twe_source twe_uneditable" lang="ja">
                      <div class="te_textarea_container">
                        <div class="te_selection_container">
                          <div class="te_cursor" style="top: 1px; left: 251px;">
                            <div class="cursor-bidi-mark"></div><input class="twe-main-input"><input class="twe-tab-thrash"><input class="twe-selection-text"><input class="twe-tab-thrash-selection"></div>
                        </div>
                        <div class="te_text_container non-printables-color-black">
                          <span class="te_txt">私は</span><span class="te_tag te_tag_open" dir="auto" data-tag-content="{1>" data-tag-id="1" data-tag-type="null" title="Type: null Content: <w:r><w:rPr><w:color w:val=&quot;4472C4&quot;></w:color></w:rPr><w:t></w:t></w:r>"><span class="tag_content"><span class="tag_id">1</span><span class="tag_metadata"><span class="tag_metadata_content">&lt;w:r&gt;&lt;w:rPr&gt;&lt;w:color w:val="4472C4"&gt;&lt;/w:color&gt;&lt;/w:rPr&gt;&lt;w:t&gt;&lt;/w:t&gt;&lt;/w:r&gt;</span></span>
                          </span>
                          </span><span class="te_txt">明日</span><span class="te_tag te_tag_close" dir="auto" data-tag-content="<1}" data-tag-id="1" data-tag-type="null" title="Type: null Content: <w:r><w:rPr><w:color w:val=&quot;4472C4&quot;></w:color></w:rPr><w:t></w:t></w:r>"><span class="tag_content"><span class="tag_id">1</span></span>
                          </span><span class="te_tag te_tag_open" dir="auto" data-tag-content="{2>" data-tag-id="2" data-tag-type="null" title="Type: null Content: <w:r><w:rPr><w:color w:val=&quot;FF0000&quot;></w:color></w:rPr><w:t></w:t></w:r>"><span class="tag_content"><span class="tag_id">2</span><span class="tag_metadata"><span class="tag_metadata_content">&lt;w:r&gt;&lt;w:rPr&gt;&lt;w:color w:val="FF0000"&gt;&lt;/w:color&gt;&lt;/w:rPr&gt;&lt;w:t&gt;&lt;/w:t&gt;&lt;/w:r&gt;</span></span>
                          </span>
                          </span><span class="te_txt">学校</span><span class="te_tag te_tag_close" dir="auto" data-tag-content="<2}" data-tag-id="2" data-tag-type="null" title="Type: null Content: <w:r><w:rPr><w:color w:val=&quot;FF0000&quot;></w:color></w:rPr><w:t></w:t></w:r>"><span class="tag_content"><span class="tag_id">2</span></span>
                          </span><span class="te_txt">へ行きます。</span></div>
                      </div>
                    </td>
                    <td class="twe_target" lang="en">
                      <div class="te_textarea_container">
                        <div class="te_selection_container"></div>
                        <div class="te_text_container non-printables-color-black"><span class="te_txt">I will go to </span><span class="te_tag te_tag_open" dir="auto" data-tag-content="{2>" data-tag-id="2" data-tag-type="null" title="Type: null Content: <w:r><w:rPr><w:color w:val=&quot;FF0000&quot;></w:color></w:rPr><w:t></w:t></w:r>"><span class="tag_content"><span class="tag_id">2</span><span class="tag_metadata"><span class="tag_metadata_content">&lt;w:r&gt;&lt;w:rPr&gt;&lt;w:color w:val="FF0000"&gt;&lt;/w:color&gt;&lt;/w:rPr&gt;&lt;w:t&gt;&lt;/w:t&gt;&lt;/w:r&gt;</span></span>
                          </span>
                          </span><span class="te_txt">school</span><span class="te_tag te_tag_close" dir="auto" data-tag-content="<2}" data-tag-id="2" data-tag-type="null" title="Type: null Content: <w:r><w:rPr><w:color w:val=&quot;FF0000&quot;></w:color></w:rPr><w:t></w:t></w:r>"><span class="tag_content"><span class="tag_id">2</span></span>
                          </span><span class="te_txt"> </span><span class="te_tag te_tag_open" dir="auto" data-tag-content="{1>" data-tag-id="1" data-tag-type="null" title="Type: null Content: <w:r><w:rPr><w:color w:val=&quot;4472C4&quot;></w:color></w:rPr><w:t></w:t></w:r>"><span class="tag_content"><span class="tag_id">1</span><span class="tag_metadata"><span class="tag_metadata_content">&lt;w:r&gt;&lt;w:rPr&gt;&lt;w:color w:val="4472C4"&gt;&lt;/w:color&gt;&lt;/w:rPr&gt;&lt;w:t&gt;&lt;/w:t&gt;&lt;/w:r&gt;</span></span>
                          </span>
                          </span><span class="te_txt">tomorrow</span><span class="te_tag te_tag_close" dir="auto" data-tag-content="<1}" data-tag-id="1" data-tag-type="null" title="Type: null Content: <w:r><w:rPr><w:color w:val=&quot;4472C4&quot;></w:color></w:rPr><w:t></w:t></w:r>"><span class="tag_content"><span class="tag_id">1</span></span>
                          </span><span class="te_txt">.</span></div>
                      </div>
                    </td>
                  </tr>
                @foreach ( $listSentence as $sentence )
                    @component('editor.sentence', [
                        'source' => $sentence->source,
                        'target' => $sentence->target,
                    ])
                    @endcomponent
                @endforeach
            </tbody>
        </table>

        <div id="test">
            <div class="cursor">
                <input class="input">
            </div>
            <div class="cursor-red">
            </div>
            <div>
                <span class="txt">私</span>
                <span class="tag">1</span>
                <span class="txt">明</span>
                <span class="txt">学</span>
                <span class="tag">2</span>
                <span class="txt">行</span>
                <span class="txt">A</span>
                <span class="txt">B</span>
                <span class="txt">C</span>
                <span class="txt">D</span>
                <span class="txt">E</span>
                <span class="txt">F</span>
                <span class="txt">G</span>
                <span class="txt txt-end"></span>
            </div>
        </div>

        <template id="template-sentence">
            @component('editor.sentence')
            @endcomponent
        </template>
    </body>
</html>