'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class SavedJob extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
   static associate(models) {
  SavedJob.belongsTo(models.User, {
    foreignKey: "candidateId",
    as: "candidate",
  });

  SavedJob.belongsTo(models.Job, {
    foreignKey: "jobId",
    as: "job",
  });
}
  }
  SavedJob.init({
    candidateId: DataTypes.INTEGER,
    jobId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'SavedJob',
  });
  return SavedJob;
};