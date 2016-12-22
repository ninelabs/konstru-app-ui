const Handlebars = require('handlebars');

module.exports = function(data) {
  var helpers = require('handlebars-helpers')();

  helpers.block = function(name){
    var blocks = this._blocks;
        content = blocks && blocks[name];
    return content ? content.join('\n') : null;
  };

  helpers.contentFor = function(name, options){
    var blocks = this._blocks || (this._blocks = {});
        block = blocks[name] || (blocks[name] = []);
    block.push(options.fn(this));
  };

  helpers.timeago = require('helper-timeago');

  helpers.userName = function(id) {
    for (var idx in data.users) {
      var user = data.users[idx];
      if (user.id == id) {
        return user.name;
      }
    }

    return 'Johnny Designer';
  };

  helpers.userAvatar = function(id) {
    for (var idx in data.users) {
      var user = data.users[idx];
      if (user.id == id) {
        return `/images/avatars/${user.avatar}`;
      }
    }

    return `/images/avatars/orderedlist.jpg`;
  };

  helpers.icon = function(icon, classname) {
    return new Handlebars.SafeString(`<svg class="icon ${classname || ''}">
       <use xlink:href="/images/icons.svg#icon-${icon}"></use>
    </svg>`);
  };

  helpers.statPercent = function(data, key) {
    var sum = 0;
    for (var item in data) {
      sum += data[item];
    }

    return data[key] * 100 / sum;
  };

  return helpers;
};
