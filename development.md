# 原文修正
## 元文書
```xml
<trans-unit id="NFDBB2FA9-tu1" xml:space="preserve">
    <source xml:lang="ja">私は<g id="1">明日</g><g id="2">学校</g>へ行きます。</source>
    <target xml:lang="en"></target>
</trans-unit>
<trans-unit id="NFDBB2FA9-tu2" xml:space="preserve">
    <source xml:lang="ja">今日の<g id="1">天気</g>は<g id="2">晴れ</g>です。</source>
    <target xml:lang="en"></target>
</trans-unit>
```

## 結合
### ノーマル
tu1:0-11+tu2:0-10

### 分割→結合
tu1:0-4
tu1:5-11
tu2:0-10

tu1:0-4
tu1:5-11+tu2:0-10

## 分割
### ノーマル
tu1:0-4
tu1:5-11


# コマンド
## xxx -> xlf 変換
```
sh /var/www/tool/okapi/tikal.sh -x /var/www/data/test.docx -sl ja -tl en -nocopy
```

## リクエストクラス 作成
```
php artisan make:request XXXRequest
```

## コマンドクラス 作成
```
php artisan make:command editor/Xlf2DBCommand
```

## マイグレーション 生成
```
php artisan make:migration create_document_table
```

## xlf -> work.xml 変換
```
php artisan command:xliff2xml
```

# 開発
##
```
php artisan make:seeder DocumentTableSeeder
```


## 保存処理
保存するタイミング

(1) キーボード入力
(2) テキスト置換や挿入処理
(3) サーバ処理

(1)の確定タイミングを決定する。

キューにスタックし、定期的に保存
保存スタック＝履歴スタックの考えがシンプル
  → NG. 履歴スタックはポインターが移動するため


# 資料
## Laravel
* [8\.x Laravel](https://readouble.com/laravel/8.x/ja/)

### コマンド
* [Laravelでコマンドラインアプリケーションを作成する \- Qiita](https://qiita.com/nenokido2000/items/abbf70c87c9ad86a2b89)

## XLIFF
* [XLIFF 1\.1 Specification](http://www.oasis-open.org/committees/xliff/documents/xliff-specification.htm)
* [Okapi Framework](https://okapiframework.org/)

## JavaScript
[\[ES2015\] classとメソッドによるイベントハンドラの書き方 \- さかなソフトブログ](https://sakanasoft.net/class_method_event_handler/)

##
[GitHub \- proengsoft/laravel\-xmlmodel: Package for Laravel based on Eloquent to manage XML files](https://github.com/proengsoft/laravel-xmlmodel)

## Database
[\[Laravel5\.1\]Fakerチートシート \- Qiita](https://qiita.com/tosite0345/items/1d47961947a6770053af)
[PHPカンファレンス関西の感想と100万件バッチで死なないLaravel \- localdisk](https://localdisk.hatenablog.com/entry/2016/07/20/173208)
[Laravel \+ MySQL5\.7 で日本語全文検索をする方法とちょっとした注意点 \- Qiita](https://qiita.com/niisan-tokyo/items/33c254bf8c4da3379ad1)

## パフォーマンス
[Laravelで負荷対策としてやっとくこと \- honeplusのメモ帳](http://honeplus.blog50.fc2.com/blog-entry-218.html)
[Laravelを活用したゲームサーバーチューニング　通信時間100ms以内を実現するための工夫 \- ログミーTech](https://logmi.jp/tech/articles/321496)