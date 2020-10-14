<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
    <head>
        <link href="{{ asset('css/editor.css') }}" rel="stylesheet">
        <script src="https://code.jquery.com/jquery-3.3.1.min.js"></script>
        <script src="{{ asset('js/editor.util.js') }}" defer></script>
        <script src="{{ asset('js/editor.view.js') }}" defer></script>
        <script src="{{ asset('js/editor.js') }}" defer></script>
    </head>
    <body>
        <table>
            <tbody>
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
                <input class="copy">
            </div>
            <div style="width: 200px;">
                <span class="txt">私</span>
                <span class="tag">1</span>
                <span class="txt">明</span>
                <span class="txt">学</span>
                <span class="tag">2</span>
                <span class="txt">行</span>
                <span class="txt"> </span>
                <span class="txt">A</span>
                <span class="txt">B</span>
                <span class="txt">C</span>
                <span class="txt">D</span>
                <span class="txt">E</span>
                <span class="txt">F</span>
                <span class="txt"> </span>
                <span class="txt">1</span>
                <span class="txt">2</span>
                <span class="txt">3</span>
                <span class="txt">4</span>
                <span class="txt">5</span>
                <span class="txt">6</span>
                <span class="txt">7</span>
                <span class="txt">8</span>
                <span class="txt">9</span>
                <span class="txt">0</span>
                <span class="txt"> </span>
                <span class="txt">a</span>
                <span class="txt">b</span>
                <span class="txt txt-end"></span>
            </div>
        </div>

        <template id="template-sentence">
            @component('editor.sentence')
            @endcomponent
        </template>
    </body>
</html>