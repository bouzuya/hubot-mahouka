# Description
#   A Hubot script that display the mahouka message images
#
# Configuration:
#   HUBOT_MAHOUKA_BASE_URL
#
# Commands:
#   hubot mahouka - display the mahouka message images
#
# Author:
#   bouzuya <m@bouzuya.net>
#
module.exports = (robot) ->

  DEFAULT_BASE_URL = 'http://mahouka.jp/special/s07.html'
  baseUrl = process.env.HUBOT_MAHOUKA_BASE_URL ? DEFAULT_BASE_URL

  url = require 'url'
  require('hubot-arm') robot

  robot.respond /mahouka$/i, (res) ->
    res.robot.arm('request')
      method: 'GET'
      url: baseUrl
      format: 'html'
    .then (r) ->
      images = r.$('li > img').map ->
        img = r.$ @
        src = img.attr 'src'
        url.resolve baseUrl, src
      res.send res.random(images)
