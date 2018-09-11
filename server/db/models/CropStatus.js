const bookshelf = require('./bookshelf');

class CropStatus extends bookshelf.Model {
  get tableName() {
    return 'crop_statuses';
  }

  get hasTimestamps() {
    return true;
  }

  crops() {
    return this.hasMany('Crop', 'crop_statuses');
  }
}

module.exports = bookshelf.model('CropStatus', CropStatus);
