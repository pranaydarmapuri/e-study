/**
 *  ========= Login
 */
import User from '../../_models/User'
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt'
require('dotenv').config()

module.exports = async (req, res) => {
  try {
    let { id, password } = req.body;
    if (!id || !password)
      return res.status(400).json({ error: "Please fill missing fields" })

    const existingUser = await User.findOne({ id })
    if (!existingUser)
      return res.status(400).json({ error: "User does not exixts with this Mail Id" })

    // password Compare 
    const isMatch = await bcrypt.compare(password, existingUser.password);
    if (!isMatch) return res.status(400).json({ error: "Invalid Password" });

    const payload = {
      _id: existingUser._id,
      role: existingUser.role,
      id: existingUser.id
    }

    // ->> Create Access Token 
    const accessToken = jwt.sign(payload, process.env.SECRET_KEY, {
      expiresIn: process.env.ACCESS_TOKEN_LIFE
    })

    /*
    * Setting up cookies
    *
    * setting cookie expiry time */
    // let d = new Date();
    // d.setDate(d.getSeconds() + process.env.ACCESS_TOKEN_LIFE);
    //first-party cookie settings
    // res.cookie('authToken', accessToken, {
    //   expires: d,
    //   httpOnly: true,
    //   sameSite: 'none'
    // }).send('ok')
    // res.cookie("authToken", accessToken, { secure: true, expires: d, httpOnly: true })

    res.send(accessToken)

  } catch (err) {
    res.status(500).json(err);
  }
}