import Sequelize from "sequelize";
import { sqlize } from "../config/conn";
const Category = sqlize.define('Categories', {
    id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      Category: {
        type: Sequelize.STRING
      },
      Subcategory: {
        type: Sequelize.STRING
      },
      createdAt: {
        allowNull: true,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: true,
        type: Sequelize.DATE,
      }
});

(async function () {
    await Category.sync();
})();

export {Category}