const authService = require("../services/authService");

const signup = async (req, res) => {
  try {
    const user = await authService.signup(req.body);
    const { password, ...userWithoutPassword } =user.toJSON();
    res.status(201).json({
      message: "Signup successful",
      user: userWithoutPassword,
    });
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
};

const login = async (req, res) => {
  try {
    const result = await authService.login(req.body);
    const {password, ...userWithoutPassword} = result.user.toJSON();

    res.status(200).json({
      message: "Login successful",
      token: result.token,
      user: userWithoutPassword,
    });
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
};

module.exports = {
  signup,
  login,
};