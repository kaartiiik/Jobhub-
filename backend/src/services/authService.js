const bcrypt = require("bcrypt");
const generateToken = require("../utils/generateToken");
const { User } = require("../../database/models");

const signup = async (userData) => {
  const {
    name,
    email,
    password,
    role,
  } = userData;

  const existingUser =
    await User.findOne({
      where: {
        email,
      },
    });
  
  if (existingUser) {
    throw new Error(
      "User already exists"
    );
  }

  const hashedPassword =
    await bcrypt.hash(
      password,
      10
    );

  const user =
    await User.create({
      name,
      email,
      password:
        hashedPassword,
      role,
    });

  return user;
};
const login = async (userData) => {
  const { email, password } = userData;

  const user = await User.findOne({
    where: {
      email,
    },
  });

  if (!user) {
    throw new Error("User not found");
  }

  const isMatch = await bcrypt.compare(
    password,
    user.password
  );

  if (!isMatch) {
    throw new Error("Invalid credentials");
  }

  const token = generateToken(user);

  return {
    token,
    user,
  };
};

module.exports = {
  signup,login
};
