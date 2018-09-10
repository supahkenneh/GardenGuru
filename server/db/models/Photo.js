const bookshelf = require('./bookshelf');

class Photo extends bookshelf.Model {
  get tableName() {
    return 'photos';
  }
  get hasTimestamps() {
    return true;
  }

  crops() {
    return this.belongsTo('Crop', 'crop_id');
  }

  users() {
    return this.belongsTo('User', 'user_id');
  }
}

module.exports = bookshelf.model('Photo', Photo);
