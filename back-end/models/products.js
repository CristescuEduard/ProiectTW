module.exports = (sequelize, DataTypes) => {
    const Products = sequelize.define(
      "Products",
      {
        Productid:{
          type:DataTypes.INTEGER,
          primaryKey:true,
          autoIncrement:true
        },
        name: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        category: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        quantity: {
          type: DataTypes.INTEGER,
          allowNull: false,
        },
        expirationDate:{
            type:DataTypes.DATEONLY,
            allowNull:false,
        },
        isAvailable: {
          type: DataTypes.BOOLEAN,
          defaultValue: false,
        },
        wasClaimedBy:{
          type: DataTypes.INTEGER,
          defaultValue: 0,
        }
      },
      {
        freezeTableName: true,
        timestamps:false
      }
    );
    return Products;
 };
  