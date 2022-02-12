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
