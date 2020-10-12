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

# 資料
## Laravel
* [8\.x Laravel](https://readouble.com/laravel/8.x/ja/)

### コマンド
* [Laravelでコマンドラインアプリケーションを作成する \- Qiita](https://qiita.com/nenokido2000/items/abbf70c87c9ad86a2b89)

## XLIFF
* [XLIFF 1\.1 Specification](http://www.oasis-open.org/committees/xliff/documents/xliff-specification.htm)
* [Okapi Framework](https://okapiframework.org/)