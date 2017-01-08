const Handlebars = require('handlebars');
const helpers = require('handlebars-helpers')();

let blocks = {};

helpers.timeago = require('helper-timeago');

module.exports = (data) => {
  helpers.block = (name) => {
    const content = blocks && blocks[name];
    return content ? content.join('\n') : null;
  };

  helpers.contentFor = (name, options) => {
    const block = blocks[name] || (blocks[name] = []);
    block.push(options.fn(this));
  };

  helpers.clearBlocks = () => {
    blocks = {};
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
    const end = new Date('2016-12-24T10:10:52.376Z'); // Just to make the graphs ok
    const start = new Date(end - 12096e5); // two weeks
    const current = new Date(change.updated_at);

    const percent = (current.getTime() - start.getTime()) / (end.getTime() - start.getTime());
    return 100.0 * percent;
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
