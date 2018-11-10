
require('dotenv').load();

var middleware = require('botkit-middleware-watson')({
  username: process.env.ASSISTANT_USERNAME,
  password: process.env.ASSISTANT_PASSWORD,
  workspace_id: process.env.WORKSPACE_ID,
  version_date: '2018-07-10'
  // version_date: '2016-09-20'
});

module.exports = function(app) {

  if (process.env.USE_FACEBOOK) {
    var Facebook = require('./bot-facebook');
    Facebook.controller.middleware.receive.use(middleware.receive);
    Facebook.controller.createWebhookEndpoints(app, Facebook.bot);
    console.log('Facebook bot is running ...');
  }

  // Customize your Watson Middleware object's before and after callbacks.
  middleware.before = function(message, assistantPayload, callback) {
    callback(null, assistantPayload);
  }

  middleware.after = function(message, assistantResponse, callback) {
    callback(null, assistantResponse);
  }
};
