const bookshelf = require('./bookshelf');

class Message extends bookshelf.Model {
  get tableName() {
    return 'messages';
  }

  get hasTimestamps() {
    return true;
  }

  to() {
    return this.belongsTo('User', 'to');
  }

  from() {
    return this.belongsTo('User', 'from');
  }

  seller() {
    return this.belongsTo('User', 'seller_id');
  }

  crops() {
    return this.belongsTo('Crop', 'crop_id');
  }
}

module.exports = bookshelf.model('Message', Message);
