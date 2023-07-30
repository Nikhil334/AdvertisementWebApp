import Sequelize from "sequelize";
import { sqlize } from "../config/conn";
const Address = sqlize.define('address', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    houseNo: {
        type: Sequelize.STRING,
        allowNull: false
    },
    streetNo: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    area: {
        type: Sequelize.STRING,
        allowNull: false
    },
    landmark: {
        type: Sequelize.STRING,
        allowNull: true
    },
    city: {
        type: Sequelize.STRING,
        allowNull: false
    },
    country: {
        type: Sequelize.STRING,
        allowNull: false
    },
    zipCode: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    state: {
        type: Sequelize.STRING,
        allowNull: false
    },
    status: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: true
    },
    userId: {
        type: Sequelize.INTEGER,
        references: {
            model: 'users',
            key: 'id'
        }
    },
    addressType: {
        type: Sequelize.STRING,
        allowNull: false
    },
    createdAt: {
        type: Sequelize.DATE,
        default: Date.now()
    },
    updatedAt: {
        type: Sequelize.DATE,
        default: Date.now()
    }
});

(async function () {
    await Address.sync();
})();

export {Address}