module.exports = (sequelize, DataTypes) => {
    const Friends = sequelize.define(
      "Friends",
      {
        Friendid:{
          type:DataTypes.INTEGER,
          primaryKey:true,
          autoIncrement:true
        },
        nickname:{
            type:DataTypes.STRING,
        }
      },
      {
        freezeTableName: true,
        timestamps:false
      }
    );
    return Friends;
 };
  