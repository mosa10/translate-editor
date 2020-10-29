<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
    <head>
        <meta name="csrf-token" content="{{ csrf_token() }}">
        <link href="{{ asset('css/editor.css') }}" rel="stylesheet">
        <script src="https://code.jquery.com/jquery-3.3.1.min.js"></script>
        <script src="{{ asset('js/editor.core.js') }}" defer></script>
        <script src="{{ asset('js/editor.util.js') }}" defer></script>
        <script src="{{ asset('js/editor.model.js') }}" defer></script>
        <script src="{{ asset('js/editor.data.js') }}" defer></script>
        <script src="{{ asset('js/editor.input.js') }}" defer></script>
        <script src="{{ asset('js/editor.operation.js') }}" defer></script>
        <script src="{{ asset('js/editor.view.js') }}" defer></script>
        <script src="{{ asset('js/editor.js') }}" defer></script>
    </head>
    <body>
        <button id="debug">debug</button>

        <div id="menu"></div>
        <div id="operation">
            <ul>
                <li><a id="btn-operation-join" href="#">join</a></li>
                <li><a id="btn-operation-tag" href="#">tag</a></li>
            </ul>
        </div>

        <table>
            <tbody>
                @foreach ( $listSentence as $sentence )
                    @component('document.sentence', [
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
            @component('document.sentence')
            @endcomponent
        </template>
    </body>
</html>