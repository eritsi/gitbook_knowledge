## jsfiddle を使った gitbook の開発・作成

### jsfiddleの基礎
- [参考サイト](https://digitalidentity.co.jp/blog/creative/how-to-jsfiddle.html)  

### function-plotの基礎
- [本家サイト](https://mauriciopoppe.github.io/function-plot/)  

`function-plot` uses interval-arithmetic math by default, unfortunately some functions are not implemented yet because of the underlying complexity, for this reason you can always evaluate a function with , to do so make sure that you include `math.js` before `function-plot`  
```
<script src="//cdnjs.cloudflare.com/ajax/libs/mathjs/1.5.2/math.min.js"></script>
```
And then set the following:  
`sampler: 'builtIn'` the parser bundled with function-plot will be replaced with the one in math.js
`graphType: 'polyline'` or `graphType: 'scatter'`  

```
functionPlot({
  target: '#sampler-mathjs',
  disableZoom: true,
  data: [{
    fn: 'gamma(x)',
    sampler: 'builtIn',
    graphType: 'polyline'
  }]
})
functionPlot({
  target: '#sampler-tan-mathjs',
  data: [{
    fn: 'tan(x)',
    nSamples: 4000,
    sampler: 'builtIn',
    graphType: 'polyline'
  }]
})
```
### jsfiddleでガンマ関数の表示方法を開発する
上記を踏まえ、jsfiddleに移植する。  
この時、jsfiddleの左カラムのRessourcesに `math.min.js` と`function-plot` がこの順番に読み込まれていることが必須となる。  
https://cdnjs.cloudflare.com/ajax/libs/mathjs/1.5.2/math.min.js  
https://cdnjs.cloudflare.com/ajax/libs/function-plot/1.22.7/function-plot.js  

<script async src="//jsfiddle.net/kfj5rxLb/1/embed/js,html,css,result/dark/"></script>

### 比較： Ressources無しでのグラフ描画  
javascriptだけでもある程度のグラフ描画は可能。例として以下の二次関数などは普通に描画できる。  
<script async src="//jsfiddle.net/oukzwr56/embed/js,html,css,result/dark/"></script>

### gitbookへ移植する
1. 方針  
[NPM上の公式](https://www.npmjs.com/package/gitbook-plugin-graph)によるとそもそも `gitbook-plugin-graph` は `function-plot` のwarpperであるそうで、そこに`math.min.js`の読み込みを追加し、例題ノートブックのように `gamma(x)` を呼び出せばよいはず。  
1. 観察  
[gitbook-plugin-graphのGithub](https://github.com/cjam/gitbook-plugin-graph)を見ると、`_layouts/website/page.html` にて`function-plot.js`を読み込んでいるので、その直前に `math.min.js`も読み込めば良いとわかる。
1. インストールプロセスに手を加える  
`.gitpod.yml`にて`math.min.js`をwgetし、`gitbook-plugin-graph`内の適切なフォルダに設定された`math.min.js`をpage.htmlにて呼び出すよう改変した。  
1. バージョン合わせ  
なお、gitbookで使用しているjavascriptのバージョンはv8.8であり、そこと噛み合う`math.min.js`のバージョンはv6.6.5だった。jsfiddle上ではそれぞれのバージョンを変更しやすく、噛み合わせ動作確認も実施しやすかった。  

※ [function-plotのgithub](https://github.com/mauriciopoppe/function-plot#instance--functionplotoptions)にて[例題としてのノートブック](https://github.com/mauriciopoppe/function-plot#instance--functionplotoptions)が提供されている。  


### 補足:ガンマ関数の数値的実装
こちらのjsfiddleを参考に、しみじみする。jsfiddle上で将棋アプリが各種実装されている。。
<script async src="//jsfiddle.net/mizarjp/j9k6143v/119/embed/"></script>