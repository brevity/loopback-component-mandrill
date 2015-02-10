module.exports = function (MandrillSubaccount) {


  /**
   * Get the list of subaccounts defined for the account,
   * optionally filtered by a query
   *
   * @param {String} query optional prefix to filter the subaccounts' ids and names
   * @param {Function} callback
   * @return {Promise}
   */
  MandrillSubaccount.list = function (query, callback) {
    query = query || '';
    this.dataSource.connector.client.subaccounts
      .list({q: query}, function (result) {
        callback && callback(null, result);
      }, callback);
  };
  MandrillSubaccount.list.promisify = true;


  /**
   * Add a new subaccount
   *
   * @param {Object} data
   * @param {String} data.id unique identifier for the subaccount to be used in sending calls
   * @param {String} data.name optional display name to further identify the subaccount
   * @param {String} data.notes optional extra text to associate with the subaccount
   * @param {Number} data.custom_quots optional manual hourly quota for the subaccount
   * @param {Function} callback
   * @return {Promise}
   */
  MandrillSubaccount.add = function (data, callback) {
    this.dataSource.connector.client.subaccounts
      .add(data, function (result) {
        callback(null, result);
      }, callback);
  };
  MandrillSubaccount.add.promisify = true;


  /**
   * Update a subaccount
   *
   * @param {String} id unique identifier for the subaccount
   * @param {Object} data
   * @param {String} data.name optional display name to further identify the subaccount
   * @param {String} data.notes optional extra text to associate with the subaccount
   * @param {Number} data.custom_quots optional manual hourly quota for the subaccount
   * @param {Function} callback
   * @return {Promise}
   */
  MandrillSubaccount.update = function (id, data, callback) {
    data = data || {};
    data.id = id;
    this.dataSource.connector.client.subaccounts
      .update(data, function (result) {
        callback(null, result);
      }, callback);
  };
  MandrillSubaccount.update.promisify = true;


  /**
   * Return the data about subaccount with provided ID
   * @param {String} id the unique identifier of the subaccount
   * @param {Function} callback
   * @return {Promise}
   */
  MandrillSubaccount.info = function (id, callback) {
    this.client.subaccounts.info({id: id}, function(result) {
      callback(null, result);
    }, callback);
  };
  MandrillSubaccount.info.promisify = true;

  /**
   * Delete subaccount with provided ID
   * @param {String} id the unique identifier of the subaccount
   * @param {Function} callback
   * @return {Promise}
   */
  MandrillSubaccount.delete = function (id, callback) {
    this.client.subaccounts.delete({id: id}, function(result) {
      callback(null, result);
    }, callback);
  };
  MandrillSubaccount.delete.promisify = true;

  /**
   * Pause a subaccount's sending
   * @param {String} id the unique identifier of the subaccount
   * @param {Function} callback
   * @return {Promise}
   */
  MandrillSubaccount.pause = function (id, callback) {
    this.client.subaccounts.pause({id: id}, function(result) {
      callback(null, result);
    }, callback);
  };
  MandrillSubaccount.pause.promisify = true;

  /**
   * Resume a subaccount's sending
   * @param {String} id the unique identifier of the subaccount
   * @param {Function} callback
   * @return {Promise}
   */
  MandrillSubaccount.resume = function (id, callback) {
    this.client.subaccounts.resume({id: id}, function(result) {
      callback(null, result);
    }, callback);
  };
  MandrillSubaccount.resume.promisify = true;


  MandrillSubaccount.prototype.add = function(callback) {
    return MandrillSubaccount.add(this, callback);
  };

  MandrillSubaccount.prototype.update = function(callback) {
    return MandrillSubaccount.add(this, callback);
  };

  MandrillSubaccount.prototype.pause = function(callback) {
    return MandrillSubaccount.pause(this.id, callback);
  };

  MandrillSubaccount.prototype.resume = function(callback) {
    return MandrillSubaccount.pause(this.id, callback);
  };

  MandrillSubaccount.prototype.delete = function(callback) {
    return MandrillSubaccount.delete(this.id, callback);
  };


  /**
   * Setup
   */
  MandrillSubaccount.setup = function() {
    MandrillSubaccount.base.setup.call(this);

    var MandrillSubaccountModel = this;

    MandrillSubaccountModel.remoteMethod(
      'list',
      {
        description: 'Get the list of subaccounts defined for the account, optionally filtered by a query',
        accepts: [
          { arg: 'query', type: 'string', http: {source: 'query'}}
        ],
        returns: {arg: 'result', type: 'array', root: true},
        http: {verb: 'get', path: '/'}
      }
    );

    MandrillSubaccountModel.remoteMethod(
      'add',
      {
        description: 'Add a new subaccount',
        accepts: [
          {arg: 'data', type: 'object', 'http': {source: 'body'}}
        ],
        returns: {arg: 'result', type: 'object', root: true},
        http: {verb: 'post', path: '/'}
      }
    );

    MandrillSubaccountModel.remoteMethod(
      'update',
      {
        description: 'Update a subaccount',
        accepts: [
          {arg: 'id', type: 'string', 'http': {source: 'path'}},
          {arg: 'data', type: 'object', 'http': {source: 'body'}}
        ],
        returns: {arg: 'result', type: 'object', root: true},
        http: {verb: 'put', path: '/:id'}
      }
    );

    MandrillSubaccountModel.remoteMethod(
      'info',
      {
        description: 'Return information about subaccount',
        accepts: [
          {arg: 'id', type: 'string', 'http': {source: 'path'}}
        ],
        returns: {arg: 'result', type: 'object', root: true},
        http: {verb: 'get', path: '/:id'}
      }
    );

    MandrillSubaccountModel.remoteMethod(
      'delete',
      {
        description: 'Delete a subaccount',
        accepts: [
          {arg: 'id', type: 'string', 'http': {source: 'path'}}
        ],
        returns: {arg: 'result', type: 'object', root: true},
        http: {verb: 'delete', path: '/:id'}
      }
    );

    MandrillSubaccountModel.remoteMethod(
      'pause',
      {
        description: 'Pause a subaccount sending',
        accepts: [
          {arg: 'id', type: 'string', 'http': {source: 'path'}}
        ],
        returns: {arg: 'result', type: 'object', root: true},
        http: {verb: 'post', path: '/:id/pause'}
      }
    );

    MandrillSubaccountModel.remoteMethod(
      'resume',
      {
        description: 'Resume a subaccount sending',
        accepts: [
          {arg: 'id', type: 'string', 'http': {source: 'path'}}
        ],
        returns: {arg: 'result', type: 'object', root: true},
        http: {verb: 'post', path: '/:id/resume'}
      }
    );
  };

  MandrillSubaccount.setup();
};