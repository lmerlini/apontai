const { Model, DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    class Project extends Model {
        static associate(models) {
            this.belongsTo(models.Accountable, {
                foreignKey: 'accountable_id',
                as: 'accountable',
            });
            this.hasMany(models.Work, {
                foreignKey: 'project_id',
                as: 'works',
            });
        }
    }

    Project.init({
        accountable_id: {
            type: DataTypes.INTEGER,
            references: {
                model: 'accountables',
                key: 'id',
            },
            allowNull: false,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        description: DataTypes.TEXT,
        value: DataTypes.INTEGER,
        start_date: DataTypes.DATEONLY,
        end_date: DataTypes.DATEONLY,
        status: DataTypes.STRING
    }, {
        sequelize,
        modelName: 'Project',
        tableName: 'projects',
        freezeTableName: true,
        paranoid: true
    });

    return Project;
};
