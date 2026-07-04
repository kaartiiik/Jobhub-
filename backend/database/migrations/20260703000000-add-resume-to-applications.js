'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn(
      'Applications',
      'resumeUrl',
      {
        type: Sequelize.STRING,
        allowNull: true,
      }
    );

    await queryInterface.addColumn(
      'Applications',
      'resumeOriginalName',
      {
        type: Sequelize.STRING,
        allowNull: true,
      }
    );
  },

  async down(queryInterface) {
    await queryInterface.removeColumn(
      'Applications',
      'resumeOriginalName'
    );

    await queryInterface.removeColumn(
      'Applications',
      'resumeUrl'
    );
  },
};
