<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
    <head>
        <meta name="csrf-token" content="{{ csrf_token() }}">
        <link href="{{ asset('css/editor.css') }}" rel="stylesheet">
        <script src="https://code.jquery.com/jquery-3.3.1.min.js"></script>
        <script src="{{ asset('js/jquery-ui.min.js') }}" defer></script>
        <script src="{{ asset('js/editor.core.js') }}" defer></script>
        <script src="{{ asset('js/editor.util.js') }}" defer></script>
        <script src="{{ asset('js/editor.event.js') }}" defer></script>
        <script src="{{ asset('js/editor.schedule.js') }}" defer></script>
        <script src="{{ asset('js/editor.model.js') }}" defer></script>
        <script src="{{ asset('js/editor.data.js') }}" defer></script>
        <script src="{{ asset('js/editor.input.js') }}" defer></script>
        <script src="{{ asset('js/editor.operation.js') }}" defer></script>
        <script src="{{ asset('js/editor.view.js') }}" defer></script>
        <script src="{{ asset('js/editor.filter.js') }}" defer></script>
        <script src="{{ asset('js/editor.lookup.js') }}" defer></script>
        <script src="{{ asset('js/editor.js') }}" defer></script>

        <script src="https://cdn.jsdelivr.net/npm/popper.js@1.16.0/dist/umd/popper.min.js" integrity="sha384-Q6E9RHvbIyZFJoft+2mJbHaEWldlvI9IOYy5n3zV9zzTtmI3UksdQRVvoxMfooAo" crossorigin="anonymous"></script>
        <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.0/css/bootstrap.min.css" integrity="sha384-9aIt2nRpC12Uk9gS9baDl411NQApFmC26EwAOH8WgZl5MYYxFfc+NcPb1dKGj7Sk" crossorigin="anonymous">
        <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.5.0/js/bootstrap.min.js" integrity="sha384-OgVRvuATP1z7JjHLkuOU7Xw704+h835Lr+6QL9UvYjZE3Ipu6Tp75j7Bh/kR0JKI" crossorigin="anonymous"></script>

        <link rel="stylesheet" href="https://pro.fontawesome.com/releases/v5.10.0/css/all.css" integrity="sha384-AYmEC3Yw5cVb3ZcuHtOA93w35dYTsvhLPVnYs9eStHfGJvOvKxVfELGroGkvsg+p" crossorigin="anonymous"/>
    </head>
    <body>
        {{-- メニュー --}}
        <div id="menu">
            {{-- --}}
            <a id="btn-operation-filter" class="btn btn-link" href="#">検索</a>
            {{-- --}}
            <div class="btn-group" role="group">
                <a id="btn-operation-display" class="btn btn-link dropdown-toggle" href="#" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">表示</a>
                <div class="dropdown-menu" aria-labelledby="btn-operation-display">
                    <a id="btn-operation-display-st-v" class="dropdown-item" href="#">原文 / 訳文</a>
                    <a id="btn-operation-display-st-h" class="dropdown-item" href="#">原文 | 訳文</a>
                    <a id="btn-operation-display-s" class="dropdown-item" href="#">原文</a>
                    <a id="btn-operation-display-t" class="dropdown-item" href="#">訳文</a>
                </div>
            </div>
        </div>

        <div id="operation">
            <div class="btn-group" role="group">
                {{-- 自動翻訳 --}}
                <a id="btn-operation-mt" class="btn btn-primary" href="#">MT</a>
                {{-- 類似文検索 --}}
                <a id="btn-operation-sim" class="btn btn-primary" href="#">TM</a>
            </div>

            <div class="btn-group" role="group">
                {{-- --}}
                <a id="btn-operation-join" class="btn btn-primary" href="#">結合</a>
                {{-- --}}
                <a id="btn-operation-split" class="btn btn-primary" href="#">分割</a>
            </div>

            <div class="btn-group" role="group">
                {{-- --}}
                <a id="btn-operation-replace-source" class="btn btn-primary" href="#">原文置換</a>
                {{-- --}}
                <a id="btn-operation-insert-source" class="btn btn-primary" href="#">原文挿入</a>
                {{-- --}}
                <a id="btn-operation-tag" class="btn btn-primary" href="#">タグ挿入</a>
                {{-- --}}
                <a id="btn-operation-reset" class="btn btn-primary" href="#">リセット</a>
            </div>
        </div>

        <div id="filter">
            <div class="row">
                <div class="col-6">
                    <input id="input-filter-s" class="form-control input-filter">
                </div>
                <div class="col-6">
                    <input id="input-filter-t" class="form-control input-filter">
                    <input id="input-replace" class="form-control">
                    <a id="btn-replace-prev" href="#">prev</a>
                    <a id="btn-replace-next" href="#">next</a>
                    <a id="btn-replace-replace" href="#">replace</a>
                    <a id="btn-replace-replace-all" href="#">replace all</a>
                </div>
            </div>
        </div>

        <div id="main">
            <div id="workspace">
                <table>
                    <tbody>
                        @foreach ( $listSentence as $sentence )
                            @component('document.sentence', [
                                'position' => $loop->iteration,
                                'sentence' => $sentence,
                            ])
                            @endcomponent
                        @endforeach
                    </tbody>
                </table>
            </div>
            <div id="map">
                aaa
            </div>
        </div>

        <div id="test">
            <div class="cursor">
                <input id="input-key">
                <input class="copy">
            </div>
        </div>

        <div id="footer">
            <div id="count-sentence-char">
                <span>文章文字数</span>
                <span class="value"></span>
            </div>
            <div id="count-document-char">
                <span>文書文字数</span>
                <span class="value"></span>
            </div>
            <div id="count-sentence">
                <span>文章数</span>
                <span class="value"></span>
            </div>
        </div>

        {{-- 辞書引き --}}
        <ul id="lookup-popup-source" class="lookup-popup"></ul>
        <ul id="lookup-popup-target" class="lookup-popup"></ul>
        <ul id="lookup-popup-menu" class="lookup-popup"></ul>
        <ul id="lookup-popup-process" class="lookup-popup">
            <li data-target="source target"><a href="#"><i class="fas fa-check-square"></i> Web検索</a></li>
            <li data-target="source"><a href="#"><i class="fas fa-check-square"></i> MT</a></li>
            <li data-target="source"><a href="#"><i class="fas fa-check-square"></i> TM</a></li>
            <li data-target="source target"><a href="#"><i class="fas fa-check-square"></i> 用語登録</a></li>
        </ul>

        <template id="template-sentence">
            @component('document.sentence')
            @endcomponent
        </template>
    </body>
</html>