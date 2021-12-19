module.exports = (sequelize, DataTypes) => {
    const Users = sequelize.define(
      "Users",
      {
        id:{
          type:DataTypes.INTEGER,
          primaryKey:true,
          autoIncrement:true
        },
        name: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        surname: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        age:{
            type:DataTypes.INTEGER,
            allowNull:false,
        },
        email: {
          type: DataTypes.STRING,
          allowNull: false,
        },

      },
      {
        freezeTableName: true,
        timestamps:false
      }
    );
    return Users;
 };
  