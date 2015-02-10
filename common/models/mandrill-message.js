module.exports = function (MandrillMessage) {

  MandrillMessage.useDefaults = function(params) {
    var defaults = this.dataSource.connector.client.options || {};

    params.message.inline_css = params.message.inline_css || defaults.inlineCss || null;
    params.message.track_opens = params.message.track_opens || defaults.trackOpens || null;
    params.message.track_clicks = params.message.track_clicks || defaults.trackClicks || null;
    params.message.auto_text = params.message.auto_text || defaults.autoText || null;
    params.message.auto_html = params.message.auto_html|| defaults.autoHtml || null;
    params.async = params.async|| defaults.async || true;

    return params;
  };

  /**
   * Send a new transactional message through Mandrill
   * https://mandrillapp.com/api/docs/messages.nodejs.html
   *
   * @param {Object} message
   * @param {Object} options (async, ip_pool, send_at)
   * @param {Function} callback
   * @return {Promise}
   */
  MandrillMessage.send = function (message, options, callback) {
    var params = {
      message: message
    };
    options = options || {};
    if(options.async !== undefined) {
      params.async = options.async;
    }
    if(options.ip_pool !== undefined) {
      params.ip_pool = options.ip_pool;
    }
    if(options.send_at !== undefined) {
      params.send_at = options.send_at;
    }

    params = MandrillMessage.useDefaults(params);

    this.dataSource.connector.client.messages
      .send(params, function (result) {
        callback && callback(null, result);
      }, callback);
  };
  MandrillMessage.send.promisify = true;


  /**
   * Send a new transactional message through Mandrill using a template
   * https://mandrillapp.com/api/docs/messages.nodejs.html#method=send-template
   *
   * @param {String} template_name
   * @param {Object} template_content
   * @param {Object} message
   * @param {Object} options (async, ip_pool, send_at)
   * @param {Function} callback
   * @return {Promise}
   */
  MandrillMessage.sendTemplate = function (templateName, templateContent, message, options, callback) {
    var params = {
      template_name: templateName,
      template_content: templateContent,
      message: message
    };
    options = options || {};
    if(options.async !== undefined) {
      params.async = options.async;
    }
    if(options.ip_pool !== undefined) {
      params.ip_pool = options.ip_pool;
    }
    if(options.send_at !== undefined) {
      params.send_at = options.send_at;
    }

    params = MandrillMessage.useDefaults(params);

    this.dataSource.connector.client.messages
      .sendTemplate(params, function (result) {
        callback && callback(null, result);
      }, callback);
  };
  MandrillMessage.sendTemplate.promisify = true;


  /**
   * Setup
   */
  MandrillMessage.setup = function() {
    MandrillMessage.base.setup.call(this);

    var MandrillMessageModel = this;

    MandrillMessageModel.remoteMethod(
      'send',
      {
        description: 'Send a new transactional message through Mandrill',
        accepts: [
          { arg: 'message', type: 'object', required: true, http: {source: 'body'}},
          { arg: 'options', type: 'object', http: {source: 'body'}}
        ],
        returns: {arg: 'result', type: 'array', root: true},
        http: {verb: 'post', path: '/'}
      }
    );

    MandrillMessageModel.remoteMethod(
      'sendTemplate',
      {
        description: 'Send a new transactional message through Mandrill using a template',
        accepts: [
          { arg: 'templateName', type: 'string', required: true, http: {source: 'body'}},
          { arg: 'templateContent', type: 'object', required: true, http: {source: 'body'}},
          { arg: 'message', type: 'object', required: true, http: {source: 'body'}},
          { arg: 'options', type: 'object', http: {source: 'body'}}
        ],
        returns: {arg: 'result', type: 'array', root: true},
        http: {verb: 'post', path: '/tpl'}
      }
    );

  };

  MandrillMessage.setup();
};