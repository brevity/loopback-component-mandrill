var mandrill = require('mandrill-api/mandrill');

module.exports = MandrillService;

function MandrillService(options) {
  if (!(this instanceof MandrillService)) {
    return new MandrillService(options);
  }
  this.options = options;
  this.client = new mandrill.Mandrill(options.apiKey);
}
