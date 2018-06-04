const Sequelize = require('sequelize')

module.exports = {
    local: {
        password: Sequelize.DataTypes.STRING
    },

    facebook: {
        id: {type: Sequelize.DataTypes.BIGINT, primaryKey: true},
        accessToken: Sequelize.DataTypes.STRING,
        refreshToken: {type: Sequelize.DataTypes.STRING, allowNull: true},
        photo: {type: Sequelize.DataTypes.STRING, allowNull: true},
    },

    twitter: {
        id: {type: Sequelize.DataTypes.BIGINT, primaryKey: true},
        token: Sequelize.DataTypes.STRING,
        tokenSecret: {type: Sequelize.DataTypes.STRING, allowNull: true},
        username: {type: Sequelize.DataTypes.STRING, allowNull: true}
    },

    google: {
        id: {type: Sequelize.DataTypes.BIGINT, primaryKey: true},
        token: Sequelize.DataTypes.STRING,
        tokenSecret: {type: Sequelize.DataTypes.STRING, allowNull: true},
        username: {type: Sequelize.DataTypes.STRING, allowNull: true}
    },

    lms: {
        id: {type: Sequelize.DataTypes.BIGINT, primaryKey: true},
        roll_number: Sequelize.DataTypes.STRING,
        accessToken: Sequelize.DataTypes.STRING,
        course_identifier: Sequelize.DataTypes.STRING,
        // courses: Sequelize.DataTypes.JSONB
    }

}