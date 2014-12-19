module.exports = MandrillUsersService;

function MandrillUsersService(client, options) {
  this.options = options;
  this.client = client;
}

MandrillUsersService.prototype.usersInfo = function(callback) {
  this.client.users.info({}, function(result) {
    callback(null, result);
  }, callback);
};

MandrillUsersService.prototype.usersSenders = function(callback) {
  this.client.users.senders({}, function(result) {
    callback(null, result);
  }, callback);
};
