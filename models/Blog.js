const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Blog extends Model {

}
 
Blog.init(
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        body: {
            type: DataTypes.STRING,
        },
        user_id: {
            type: DataTypes.INTEGER,
            references: {
                model: 'user',
                key: 'id'
            }
        }
    },
    {
        sequelize,
        timestamps: false,
        freezeTableName: true,
        underscored: true,
        modelName: 'blog',
    }
);

module.exports = Blog;