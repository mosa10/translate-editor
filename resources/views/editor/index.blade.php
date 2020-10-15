<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
    <head>
        <link href="{{ asset('css/editor.css') }}" rel="stylesheet">
        <script src="https://code.jquery.com/jquery-3.3.1.min.js"></script>
        <script src="{{ asset('js/editor.util.js') }}" defer></script>
        <script src="{{ asset('js/editor.input.js') }}" defer></script>
        <script src="{{ asset('js/editor.view.js') }}" defer></script>
        <script src="{{ asset('js/editor.js') }}" defer></script>
    </head>
    <body>
        <table>
            <tbody>
                @foreach ( $listSentence as $sentence )
                    @component('editor.sentence', [
                        'range'  => $sentence->range,
                        'source' => $sentence->source,
                        'target' => $sentence->target,
                    ])
                    @endcomponent
                @endforeach
            </tbody>
        </table>

        <div id="test">
            <div class="cursor">
                <input id="input-key">
                <input class="copy">
            </div>
        </div>

        <template id="template-sentence">
            @component('editor.sentence')
            @endcomponent
        </template>
    </body>
</html>