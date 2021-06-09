const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('actividad', {
    // id: {
    //   type: DataTypes.STRING,
    //   allowNull: false,
    //   primaryKey: true
    // },
    nombre: {
      type: DataTypes.STRING
    },
    dificultad: {
      type: DataTypes.NUMERIC
    },
    duracion: {
      type: DataTypes.STRING
    },
    temporada: {
      type: DataTypes.STRING
    }
  });
};