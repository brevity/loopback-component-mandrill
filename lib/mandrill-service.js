var mandrill = require('mandrill-api/mandrill');
var ServiceMessages = require('./mandrill-service-messages');
var ServiceUsers = require('./mandrill-service-users');
var ServiceSubaccounts = require('./mandrill-service-subaccounts');

var promisify = require('nemento-promisify');

module.exports = MandrillService;


function MandrillService(options) {
  if (!(this instanceof MandrillService)) {
    return new MandrillService(options);
  }
  this.options = options;
  this.client = new mandrill.Mandrill(options.apiKey);

  this.messages = new ServiceMessages(this.client, options);
  this.users = new ServiceUsers(this.client, options);

}

MandrillService.prototype.subaccounts = function() {
  return new ServiceSubaccounts(this.client, this.options);
};

MandrillService.prototype.send = promisify(send);
MandrillService.prototype.sendTemplate = promisify(sendTemplate);

//////

function send(options, callback) {
  this.messages.send(options, callback);
}

function sendTemplate(options, callback) {
  this.messages.sendTemplate(options, callback);
}