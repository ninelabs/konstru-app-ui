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

  helpers.last = function(array) {
    return array[array.length-1];
  };

  helpers.timeago = require('helper-timeago');

  helpers.readableDate = function(date){
    return new Date(date).toString();
  };

  helpers.userName = function(id) {
    for (var idx in data.users) {
      var user = data.users[idx];
      if (user.id == id) {
        return user.name;
      }
    }

    return 'Johnny Designer';
  };

  helpers.userInitials = function(id) {
    var userName = helpers.userName(id).split(' ');
    return userName[0][0] + userName[1][0];
  };

  helpers.changeGraphXPercent = function(change,changelog){
    var start = new Date(),
        end = new Date(),
        current = new Date(change.updated_at);

        start.setDate(start.getDate()-14); //two weeks ago,

    var percent = (current.getTime() - start.getTime())/(end.getTime()-start.getTime()) * 100;

    return percent;
  };

  helpers.userAvatar = function(id) {
    for (var idx in data.users) {
      var user = data.users[idx];
      if (user.id == id && user.avatar) {
        return `/images/avatars/${user.avatar}`;
      }
    }

    return null;
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
