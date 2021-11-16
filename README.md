# gitbook_test
GitBookを試すためのリポジトリ


## 基本はHeading 2で書きます

基礎ですが強調の仕方、改行の仕方です。  
**Flutter**とはGoogleが開発している**クロスプラットフォーム**のアプリケーションフレームワークです。

## 画像と動画の貼り方です
画像はこちら  
[TOYOTAがFlutterを導入](https://techplay.jp/column/1516)して少し話題になっていました。

動画はこちら  
{% urlembed %}
https://flutter.dev/assets/videos/FastDev.mp4
{% endurlembed %}

YouTubeの場合はこちら
{% youtube embed="KR8ESjGYsXI" %}{% endyoutube %}

## ヒント、ワーニングボックスの出し方です
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

## コードの埋め込み方です
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

## コードをタブ形式で埋め込みます
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
