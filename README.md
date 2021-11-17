# gitbook_test
GitBookを試すためのリポジトリ


## 基本はHeading 2で記述

基礎ですが強調の仕方、改行の仕方です。  
**Flutter**とはGoogleが開発している**クロスプラットフォーム**のアプリケーションフレームワークです。

## 画像と動画の貼り方
画像はこちら  
[TOYOTAがFlutterを導入](https://techplay.jp/column/1516)して少し話題になっていました。

動画はこちら  
{% urlembed %}
https://flutter.github.io/assets-for-api-docs/assets/videos/butterfly.mp4
{% endurlembed %}

YouTubeの場合はこちら
{% youtube embed="KR8ESjGYsXI" %}{% endyoutube %}

## ヒント、ワーニングボックスの出し方
github上では反映されません。  
`hint ~ endhint`で囲みます。working, danger, tip, infoで種類を切り替えます。

{% hint style="working" %}
#### work
hogehoge - working
{% endhint %}

{% hint style="danger" %}  
hogehoge - danger  
{% endhint %}

{% hint style="tip" %}  
hogehoge - tip  
{% endhint %}

{% hint style="info" %}  
この中は普通にMarkdownで記載  
{% endhint %}

## コードの埋め込み
codeブロックで囲みます。  

```
  // Todo
  Widget build(BuildContext context) {
    return Scaffold(
+     appBar: AppBar(
+       actions: [_userIcon(), _authButton()],
+     ),
      body: _timeLine(context),
    );
  }
```

## コードをタブ形式で埋め込み
tabsブロックでtabブロックを囲み、その中にcodeブロックを置きます。
{% tabs %}
{% tab title="viewmodel" %}
```dart
final postsProvider = StateProvider(
  (ref) => [
    Post(
      user: 'anonymous',
      body: 'body1',
      uid: 'anonymous',
      photoURL: '',
      timeStamp: DateTime(2021),
    ),
  ],
);
```
{% endtab %}

{% tab title="view" %}
```dart
  // bodyの要素
  Widget _timeLine(BuildContext context) {
    final posts = useProvider(postsProvider); // ここでposts呼び出し
    return _timeLineCards(context, posts.state); // 変数.state で値にアクセスできる
  }
```
{% endtab %}
{% endtabs %}

## グラフ描画 
{% graph %}
    {
        "title":"cos(2*PI*x/2)*(1+0.5cos(2*PI*x/100))",     
        "grid":true,
        "xAxis": {
            "label":"Sample",
            "domain": [0,300]
        },
        "yAxis": {
            "label":"Amplitude",
            "domain": [-1.5,1.5]
        },
        "data": [
            { "fn": "cos(2*PI*x/2)*(1+0.5cos(2*PI*x/100))"},         
            { "fn": "(1+0.5cos(2*PI*x/100))"}
        ]
    }
{% endgraph %}

## 数式記述
Inline math: $$\int_{-\infty}^\infty g(x) dx$$


Block math:

$$
\int_{-\infty}^\infty g(x) dx
$$

Or using the templating syntax:

{% math %}\int_{-\infty}^\infty g(x) dx{% endmath %}

## Amazon Linkの埋め込み
Generate Link tag:
{% AmazonJpLink "B01N59VNQY", "johndue-22" %}macOS Sierra{% endAmazonJpLink %}

Generate Image tag:
{% AmazonJpImage "B01N59VNQY", "johndue-22", "150" %}macOS Sierra{% endAmazonJpImage %}