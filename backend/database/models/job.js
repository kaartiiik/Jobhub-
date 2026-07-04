'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Job extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
   static associate(models) {
  Job.belongsTo(models.User, {
    foreignKey: "recruiterId",
    as: "recruiter",
  });
  Job.hasMany(models.SavedJob, {
  foreignKey: "jobId",
  as: "savedJobs",
});
}
  }
  Job.init({
    title: DataTypes.STRING,
    company: DataTypes.STRING,
    location: DataTypes.STRING,
    salary: DataTypes.STRING,
    type: DataTypes.STRING,
    experience: DataTypes.STRING,
    description: DataTypes.TEXT,
    recruiterId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Job',
  });
  return Job;
};