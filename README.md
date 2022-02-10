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
{% youtube embed="g-0B_Vfc9qM" %}{% endyoutube %}

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

## グラフ描画2 
{% graph %}
    {
        "title":"ガンマ関数の描画テスト",     
        "grid":true,
        "xAxis": {
            "label":"X軸",
            "domain": [-10,10]
        },
        "yAxis": {
            "label":"Y軸",
            "domain": [-6,6]
        },
        "data": [
              { "fn": "sin(x)"},
              { "fn": "x"},
              { "fn": "x - x^3/3!",
                "sampler": "builtIn",
                "graphType": "polyline"},
              { "fn": "x - x^3/3! + x^5/5!", 
                "sampler": "builtIn",
                "graphType": "polyline"},
              { "fn": "gamma(x)", 
                "sampler": "builtIn",
                "graphType": "polyline"}
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

## MindMapの埋め込み
```mind:height=300,title=a mind map of something,color
# 1 aあ
## 1.1 aaああ
### 1.1.1 aaaあああ
## 1.2 abあい
# 2 bい
# 3 cう
```
  
## Noembedお試し
{{ 'https://www.slideshare.net/kanbara/abc2018springflutter-101476556' | noembed }}
  

## 自作のプラグインを使用  
上のslideshareのリンク先は80スライドありますが、スライド5だけ埋め込みたい・・・という場合に使用します。  
スライド5と合致していることを確かめてみてください。  
{{ 'https://www.slideshare.net/kanbara/abc2018springflutter-101476556' | slideshare(page='5') }}
