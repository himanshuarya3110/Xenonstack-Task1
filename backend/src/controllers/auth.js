

// import sendResponse from "../../Shared/sendResponse.js";
import { User } from "../models/User.js";
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
export const
  login = async (req, res) => {
    const { userId, password } = req.body

    try {
      const user = await User.findOne({ email: userId });
      console.log(user)
      if (!user) return res.status(404).json({ message: "User not found!" });

      // const isMatch = await bcrypt.compare(password, user.password);
      if (!bcrypt.compare(password, user.password)) return res.status(400).json({ message: "Invalid credentials!" });

      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
      const response = {
        name: user.name,
        email: user.email,
        contact: user.contact,
        city: user.city
      }
      res.status(200).json({ token, detail: response });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }



  }

const register = async (req, res) => {

  const { name, email, contact, city, password } = req.body;

  try {

    let user = await User.findOne({ email });

    if (user) {
      return res.status(400).json({ message: 'User already exists' });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create a new user
    user = new User({
      name,
      email,
      contact,
      city,
      password: hashedPassword
    });

    await user.save();
    res.status(201).json({ message: 'User registered successfully!', data: user });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }

}


export const AuthController = {
  register,
  login
}