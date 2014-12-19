module.exports = MandrillServiceMessages;

function MandrillServiceMessages(client, options) {
  this.options = options;
  this.client = client;
}

MandrillServiceMessages.prototype.useDefaults = function(options) {
  options.message.inline_css = options.message.inline_css || this.options.inlineCss || null;
  options.message.track_opens = options.message.track_opens || this.options.trackOpens || null;
  options.message.track_clicks = options.message.track_clicks || this.options.trackClicks || null;
  options.message.auto_text = options.message.auto_text || this.options.autoText || null;
  options.message.auto_html = options.message.auto_html|| this.options.autoHtml || null;
  options.message.async = options.async|| this.options.async || true;

  return options;
};

MandrillServiceMessages.prototype.send = function(options, callback) {
  options = this.useDefaults(options);
  this.client.messages.send(options, function(result) {
    callback(null, result);
  }, callback);
};

MandrillServiceMessages.prototype.sendTemplate = function(options, callback) {
  options = this.useDefaults(options);
  this.client.messages.sendTemplate(options, function(result) {
    callback(null, result);
  }, callback);
};


