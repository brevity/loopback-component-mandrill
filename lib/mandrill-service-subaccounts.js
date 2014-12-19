module.exports = MandrillServiceSubaccounts;

function MandrillServiceSubaccounts(client, options) {
  this.options = options;
  this.client = client;
}

MandrillServiceSubaccounts.prototype.list = function(query, callback) {
  query = query || '';
  this.client.subaccounts.list({ q: query }, function(result) {
    callback(null, result);
  }, callback);
};

MandrillServiceSubaccounts.prototype.add = function(options, callback) {
  this.client.subaccounts.add(options, function(result) {
    callback(null, result);
  }, callback);
};

MandrillServiceSubaccounts.prototype.info = function(id, callback) {
  this.client.subaccounts.info({id: id}, function(result) {
    callback(null, result);
  }, callback);
};

MandrillServiceSubaccounts.prototype.update = function(options, callback) {
  this.client.subaccounts.update(options, function(result) {
    callback(null, result);
  }, callback);
};

MandrillServiceSubaccounts.prototype.delete = function(id, callback) {
  this.client.subaccounts.delete({id: id}, function(result) {
    callback(null, result);
  }, callback);
};

MandrillServiceSubaccounts.prototype.pause = function(id, callback) {
  this.client.subaccounts.pause({id: id}, function(result) {
    callback(null, result);
  }, callback);
};

MandrillServiceSubaccounts.prototype.resume = function(id, callback) {
  this.client.subaccounts.resume({id: id}, function(result) {
    callback(null, result);
  }, callback);
};
