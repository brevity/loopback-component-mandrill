var promisify = require('nemento-promisify');

module.exports = MandrillServiceSubaccounts;

function MandrillServiceSubaccounts(client, options) {
  this.options = options;
  this.client = client;
}

MandrillServiceSubaccounts.prototype.list = promisify(list);
MandrillServiceSubaccounts.prototype.add = promisify(add);
MandrillServiceSubaccounts.prototype.info = promisify(info);
MandrillServiceSubaccounts.prototype.update = promisify(update);
MandrillServiceSubaccounts.prototype.delete = promisify(del);
MandrillServiceSubaccounts.prototype.pause = promisify(pause);
MandrillServiceSubaccounts.prototype.resume = promisify(resume);

//////

function list(query, callback) {
  query = query || '';
  this.client.subaccounts.list({ q: query }, function(result) {
    callback(null, result);
  }, callback);
}

function add(options, callback) {
  this.client.subaccounts.add(options, function(result) {
    callback(null, result);
  }, callback);
}

function info(id, callback) {
  this.client.subaccounts.info({id: id}, function(result) {
    callback(null, result);
  }, callback);
}

function update(options, callback) {
  this.client.subaccounts.update(options, function(result) {
    callback(null, result);
  }, callback);
}

function del(id, callback) {
  this.client.subaccounts.delete({id: id}, function(result) {
    callback(null, result);
  }, callback);
}

function pause(id, callback) {
  this.client.subaccounts.pause({id: id}, function(result) {
    callback(null, result);
  }, callback);
}

function resume (id, callback) {
  this.client.subaccounts.resume({id: id}, function(result) {
    callback(null, result);
  }, callback);
}