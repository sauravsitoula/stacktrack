const { Model, DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  class Items extends Model {
    static associate() {
      //define associations here
    }

    toJSON() {
      return { ...this.get(), id: undefined };
    }
  }

  Items.init(
    {
      uuid: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: true,
        },
      },
      price: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notEmpty: true,
        },
      },
      description: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: true,
        },
      },
      quantity: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notEmpty: true,
        },
      },
      category_uuid: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: true,
        },
      },
      image_url: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: true,
        },
      },
      sku: {
        type: DataTypes.STRING,
      },
    },
    {
      sequelize,
      modelName: "Items",
      tableName: "items",
    }
  );
  return Items;
};
