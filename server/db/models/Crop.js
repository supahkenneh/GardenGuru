const bookshelf = require('./bookshelf');

class Crop extends bookshelf.Model {
  get tableName() {
    return 'crops';
  }

  get hasTimestamps() {
    return true;
  }

  owner() {
    return this.belongsTo('User', 'owner_id');
  }

  cropStatus() {
    return this.belongsTo('cropStatus', 'crop_status_id');
  }

  plant() {
    return this.belongsTo('Plant', 'plant_id');
  }

  photo() {
    return this.hasMany('Photo', 'crop_id');
  }

  messages() {
    return this.hasMany('Message', 'crop_id');
  }
}

module.exports = bookshelf.model('Crop', Crop);
