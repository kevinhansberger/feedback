(function (d) {
  var c = d.createElement('div');
  c.id = 'feedback-widget';
  d.body.appendChild(c);

  var s = d.createElement('script');
  s.src = 'https://feedback-widget.ompmega.workers.dev/static/js/main.js';
  // s.src = 'http://127.0.0.1:3001/static/js/main.js';
  s.async = 1;
  d.getElementsByTagName('head')[0].appendChild(s);
})(document);
