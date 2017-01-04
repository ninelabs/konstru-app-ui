/* eslint no-underscore-dangle: ["error", { "allow": ["_blocks"] }] */

const Handlebars = require('handlebars');
const helpers = require('handlebars-helpers')();

helpers.timeago = require('helper-timeago');

module.exports = (data) => {
  helpers.block = (name) => {
    const blocks = this._blocks;
    const content = blocks && blocks[name];
    return content ? content.join('\n') : null;
  };

  helpers.contentFor = (name, options) => {
    const blocks = this._blocks || (this._blocks = {});
    const block = blocks[name] || (blocks[name] = []);
    block.push(options.fn(this));
  };

  helpers.last = array => array[array.length - 1];

  helpers.readableDate = date => new Date(date).toString();

  helpers.userName = (id) => {
    let name;
    data.users.forEach((user) => {
      if (user.id === id) {
        name = user.name;
      }
    });

    return name || 'Johnny Designer';
  };

  helpers.userInitials = (id) => {
    const userName = helpers.userName(id).split(' ');
    return userName[0][0] + userName[1][0];
  };

  helpers.changeGraphXPercent = (change) => {
    const start = new Date();
    const end = new Date();
    const current = new Date(change.updated_at);

    start.setDate(start.getDate() - 14); // two weeks ago,

    const percent = (current.getTime() - start.getTime()) / (end.getTime() - start.getTime());

    return 100 * percent;
  };

  helpers.userAvatar = (id) => {
    let avatar;
    data.users.forEach((user) => {
      if (user.id === id && user.avatar) {
        avatar = `/images/avatars/${user.avatar}`;
      }
    });

    return avatar;
  };

  helpers.icon = (icon, classname) => new Handlebars.SafeString(`<svg class="icon ${classname || ''}">
       <use xlink:href="/images/icons.svg#icon-${icon}"></use>
    </svg>`);

  helpers.statPercent = (arr, key) => {
    const sum = Object.values(arr).reduce((acc, cur) => acc + cur, 0);

    return (arr[key] * 100) / sum;
  };

  return helpers;
};
