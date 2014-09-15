// Description
//   A Hubot script that display the mahouka message images
//
// Configuration:
//   HUBOT_MAHOUKA_BASE_URL
//
// Commands:
//   hubot mahouka - display the mahouka message images
//
// Author:
//   bouzuya <m@bouzuya.net>
//
module.exports = function(robot) {
  var DEFAULT_BASE_URL, baseUrl, url, _ref;
  DEFAULT_BASE_URL = 'http://mahouka.jp/special/s07.html';
  baseUrl = (_ref = process.env.HUBOT_MAHOUKA_BASE_URL) != null ? _ref : DEFAULT_BASE_URL;
  url = require('url');
  require('hubot-arm')(robot);
  return robot.respond(/mahouka$/i, function(res) {
    return res.robot.arm('request')({
      method: 'GET',
      url: baseUrl,
      format: 'html'
    }).then(function(r) {
      var images;
      images = r.$('li > img').map(function() {
        var img, src;
        img = r.$(this);
        src = img.attr('src');
        return url.resolve(baseUrl, src);
      });
      return res.send(res.random(images));
    });
  });
};
