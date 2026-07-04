'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Application extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
   static associate(models) {
  Application.belongsTo(models.User, {
    foreignKey: "candidateId",
    as: "candidate",
  });

  Application.belongsTo(models.Job, {
    foreignKey: "jobId",
    as: "job",
  });
}
  }
  Application.init({
    candidateId: DataTypes.INTEGER,
    jobId: DataTypes.INTEGER,
    resumeUrl: DataTypes.STRING,
    resumeOriginalName: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Application',
  });
  return Application;
};
