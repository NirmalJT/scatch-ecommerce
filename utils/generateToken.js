const jwt = require("jsonwebtoken");

const generateToken = (createdUser) => {
  console.log("Nirmal your database is connected");
  return jwt.sign(
    { email: createdUser.email, id: createdUser._id },
    process.env.JWT_KEY
  );
};

module.exports.generateToken = generateToken;
