export default (sequelize, DataTypes) => {
  const Attendee = sequelize.define('Attendee', {
    numberOfSeats: {
      type: DataTypes.INTEGER,
      allowNull: false
    },

    going: {
      type: DataTypes.STRING,
      allowNull: false
    },

    userId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    occasionId: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  });
  // Attendee.associate = (models) => {
  //   // // associations can be defined here
  // };
  return Attendee;
};
