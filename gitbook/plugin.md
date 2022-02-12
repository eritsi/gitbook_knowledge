## gitbook pluginの開発

### (元)公式ドキュメント  
https://tinydew4.gitbooks.io/gitbook/content/docs/plugins/

### pluginインストールについて
  
npm登録前のテスト方法については[こちら](https://tinydew4.gitbooks.io/gitbook/content/docs/plugins/testing.html)
  
npm登録は
```
npm publish
```  
- npmに登録している場合の使い方  
{% tabs %}
{% tab title="book.json" %}
```json
    "plugins": [
        "my-plugin"]
```
{% endtab %}
{% tab title=".gitpod.yml" %}
```yaml
gitbook install -g <my-plugin>
```
{% endtab %}
{% endtabs %}

- npmに登録していない場合の使い方
{% tabs %}
{% tab title="book.json" %}
```json
    "plugins": [
        "my-plugin@git+https://github.com/<git_account>/<plugin_repository>.git#master"]
```
{% endtab %}
{% endtabs %}

### pluginの種類について  
#### Hooks
#### Blocks  
`{%...%}` で呼び出すブロックの挙動を定義できる。引数とBodyを使ってHTMLを返す   

[YouTube-Placeholder](https://github.com/marcopeg/gitbook-plugin-youtube-placeholder/blob/master/index.js)

{% tabs %}
{% tab title="index.js" %}
```js
module.exports = {
    blocks: {
        youtube: (block) =>
            `<div style="position: relative;width: 100%;height: 0;padding-bottom: 56.25%;">
                <iframe
                    src="//www.youtube.com/embed/${block.kwargs.embed}"
                    style="position: absolute;top: 0;left: 0;width: 100%;height: 100%;"
                    frameborder="0"
                    allowfullscreen
                ></iframe>
            </div>`,
    },
}
```
{% endtab %}
{% tab title="summary.md" %}
```markdown
{% youtube embed="G9J-KcqcQYY" %}{% endyoutube %}
```
{% endtab %}
{% endtabs %}

[Amazon-jp-link](https://github.com/morizyun/gitbook-plugin-amazon-jp-link/blob/master/index.js)  
{% tabs %}
{% tab title="index.js" %}
```js
function renderAmazonJpLink(asin, tag, body) {
  return `<a href="http://www.amazon.co.jp/gp/product/${asin
            }/ref=as_li_qf_sp_asin_il?ie=UTF8&amp;camp=247&amp;creative=1211&amp;creativeASIN=${
            asin}&amp;linkCode=as2&amp;tag=${tag}" target="_blank">${
            body}</a><img src="http://www.assoc-amazon.jp/e/ir?t=${tag
            }&amp;l=as2&amp;o=9&amp;a=${asin}" width="1" height="1" border="0"` +
        ' alt="" style="border:none !important; margin:0px !important;">';
}

module.exports = {
  blocks: {
    AmazonJpLink: {
      process(block) {
        return renderAmazonJpLink(block.args[0], block.args[1], block.body);
      },
    },
    AmazonJpImage: {
      process(block) {
        const asin = block.args[0];
        const tag = block.args[1];
        let size = block.args[2];
        if (!size) { size = 150; }
        const imageSize = parseInt(size, 10) * 2;

        const body = `<img border="0" src="http://ws.assoc-amazon.jp/widgets/q?_encoding=UTF8&amp;ASIN=${
                    asin}&amp;Format=_SL${imageSize}_&amp;ID=AsinImage&amp;MarketPlace=JP&amp;ServiceVersion=20070822` +
                    `&amp;WS=1&amp;tag=${tag}" width="${size}" style="float: left; margin: 0 20px 20px 0;" />`;

        return renderAmazonJpLink(asin, tag, body);
      },
    },
  },
};
```
{% endtab %}
{% tab title="summary.md" %}
```markdown
{% AmazonJpLink "B01N59VNQY", "johndue-22" %}macOS Sierra{% endAmazonJpLink %}
```
{% endtab %}
{% tab title="result.html" %}
```markdown
<a href="http://www.amazon.co.jp/gp/product/B01N59VNQY/ref=as_li_qf_sp_asin_il?ie=UTF8&amp;camp=247&amp;creative=1211&amp;creativeASIN=B01N59VNQY&amp;linkCode=as2&amp;tag=johndue-22" target="_blank">
  <img border="0" src="http://ws.assoc-amazon.jp/widgets/q?_encoding=UTF8&amp;ASIN=B01N59VNQY&amp;Format=_SL300_&amp;ID=AsinImage&amp;MarketPlace=JP&amp;ServiceVersion=20070822&amp;WS=1&amp;tag=johndue-22" width="150" style="float: left; margin: 0 20px 20px 0;" />
</a>
<img src="http://www.assoc-amazon.jp/e/ir?t=johndue-22&amp;l=as2&amp;o=9&amp;a=B01N59VNQY" width="1" height="1" border="0" alt="" style="border:none !important; margin:0px !important;">
```
{% endtab %}
{% endtabs %}
#### Filters  
pipeオペレーターを繋いで変数を関数に流していき、完成したHTMLを返す  
[Noembeded](https://github.com/1cgonza/gitbook-plugin-noembed/blob/master/index.js)
{% tabs %}
{% tab title="index.js" %}
```js
function noembed(url) {
  var endpoint = '//noembed.com/embed?';

  if (!!url.length) {
    endpoint += 'url=' + encodeURIComponent(url);
    return '<div class="noembed-wrapper" data-url="' + endpoint + '">' + url + '</div>';
  }

  return url;
}

module.exports = {
  website: {
    assets: './assets',
    js: ['scripts.js'],
    css: ['style.css']
  },
  filters: {
    noembed: noembed,
    video: noembed,
  }
};
```
{% endtab %}
{% tab title="assets/scripts.js" %}
```js
function renderNoembed(event) {
  var iframes         = document.querySelectorAll('.noembed-wrapper');
  var loaded          = 0;
  var total           = iframes.length;
  var externalScripts = [];

  function calculateAspectRatioFit(srcWidth, srcHeight, maxWidth, maxHeight) {
    var ratio = Math.min(maxWidth / srcWidth, maxHeight / srcHeight);

    return {width: (srcWidth * ratio) | 0, height: (srcHeight * ratio) | 0};
  }

  function ajaxReq(url, callback) {
    var req = new XMLHttpRequest();
    req.onreadystatechange = function() {
      if (req.readyState === XMLHttpRequest.DONE) {
        if (req.status === 200) {
          callback(JSON.parse(req.responseText));
        }
      }
    };

    req.open('GET', url, true);
    req.send();
    return req;
  }

  function checkForScripts(html) {
    var tempElement = document.createElement('div');
    tempElement.innerHTML = html;

    var scripts = tempElement.querySelectorAll('script');

    if (scripts.length) {
      for (var i = 0; i < scripts.length; i++) {
        if (externalScripts.indexOf(scripts[i].src) < 0) {
          externalScripts.push(scripts[i].src);
          scripts[i].parentElement.removeChild(scripts[i]);
        }
      }
    }

    return tempElement;
  }

  function getVideoData(url, wrapper) {
    if (!!url.length) {
      ajaxReq(url, function(res) {
        var safeHtml = '';

        if (res.html) {
          safeHtml = checkForScripts(res.html);

          if (res.type === 'video' && res.hasOwnProperty('width') && res.hasOwnProperty('height')) {
            var dims = calculateAspectRatioFit(res.width, res.height, wrapper.clientWidth, 9999);
            wrapper.classList.add('noembed-type-video');
            wrapper.style.width = dims.width + 'px';
            wrapper.style.height = dims.height + 'px';
          }

        } else {
          safeHtml = document.createElement('a');
          safeHtml.href = res.url;
          safeHtml.innerText = res.url;
        }

        wrapper.innerHTML = '';
        wrapper.appendChild(safeHtml);

        loaded++;

        if (loaded === total) {
          externalScripts.forEach(function(script) {
            var newScript = document.createElement('script');
            newScript.src = script;
            document.body.appendChild(newScript);
          });
        }
      });
    }
  }

  for (var i = 0; i < iframes.length; i++) {
    var wrapper = iframes[i];
    var url     = wrapper.dataset.url;

    getVideoData(url, wrapper);
  }
}

require(['gitbook'], function(gitbook) {
  gitbook.events.on('page.change', renderNoembed);
});
```
{% endtab %}
{% tab title="summary.md" %}
```markdown
{{ 'https://www.slideshare.net/kanbara/abc2018springflutter-101476556' | noembed }}
```
{% endtab %}
{% endtabs %}  
[自作slideshareページ指定](https://github.com/eritsi/gitbook-plugin-slideshare/blob/master/index.js)  
- 開発の流れ  
  1. ブラウザ上で、Noembedに目的のurlを入れたアドレスのレスポンスを見る [例:slideshareのレスポンス](https://noembed.com/embed?url=https%3A%2F%2Fwww.slideshare.net%2Fkanbara%2Fabc2018springflutter-101476556)  
  1. 取り出したいタグをメモする  
  1. レスポンスのタグ返り値を使って、目的のHTMLを完成させる  
    1. 先ほどの例で言うと、`slide_image_baseurl` や `slide_image_baseurl_suffix` に当たりをつけ、slideshareのEmbed iframeタグを真似た出力を目指す

{% tabs %}
{% tab title="index.js" %}
```js
function slideshare(url, kwargs) {
  var endpoint = '//noembed.com/embed?';
  var page = kwargs.page

  if (!!url.length) {
    endpoint += 'url=' + encodeURIComponent(url);
    return '<div class="slideshare-wrapper" data-url="' + endpoint + '" data-page=' + page + '>' + url + '</div>';
  }

  return url;
}

module.exports = {
  website: {
    assets: './assets',
    js: ['scripts.js'],
    css: ['style.css']
  },
  filters: {
    slideshare: slideshare,
  }
};
```
{% endtab %}
{% tab title="assets/scripts.js" %}
```js
function renderSlideshare(event) {
  var iframes         = document.querySelectorAll('.slideshare-wrapper');
  var loaded          = 0;
  var total           = iframes.length;
  var externalScripts = [];

  function ajaxReq(url, callback) {
    var req = new XMLHttpRequest();
    req.onreadystatechange = function() {
      if (req.readyState === XMLHttpRequest.DONE) {
        if (req.status === 200) {
          callback(JSON.parse(req.responseText));
        }
      }
    };

    req.open('GET', url, true);
    req.send();
    return req;
  }

  function getVideoData(url, wrapper) {
    if (!!url.length) {
      ajaxReq(url, function(res) {
        var safeHtml = '';

        if (res.html) {
          safeHtml = document.createElement('img');
          safeHtml.src = res.slide_image_baseurl + page + res.slide_image_baseurl_suffix;
          safeHtml.innerText = res.title;
          // safeHtml = checkForScripts(res.html);

        } else {
          safeHtml = document.createElement('a');
          safeHtml.href = res.url;
          safeHtml.innerText = res.url;
        }

        wrapper.innerHTML = '';
        wrapper.appendChild(safeHtml);

        loaded++;

        if (loaded === total) {
          externalScripts.forEach(function(script) {
            var newScript = document.createElement('script');
            newScript.src = script;
            document.body.appendChild(newScript);
          });
        }
      });
    }
  }

  for (var i = 0; i < iframes.length; i++) {
    var wrapper = iframes[i];
    var url     = wrapper.dataset.url;
    var page    = wrapper.dataset.page;

    getVideoData(url, wrapper);
  }
}

require(['gitbook'], function(gitbook) {
  gitbook.events.on('page.change', renderSlideshare);
});
```
{% endtab %}
{% tab title="summary.md" %}
```markdown
{{ 'https://www.slideshare.net/kanbara/abc2018springflutter-101476556' | slideshare(page='5') }}
```
{% endtab %}
{% endtabs %}  

### github.ioでの公開まで  
[参考サイト](https://r-ngtm.hatenablog.com/entry/2020/06/18/193235)