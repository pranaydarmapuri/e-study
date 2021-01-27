import User from '../_models/User'
import jwt from 'jsonwebtoken'

export default async (req, res, next) => {

  // getting token from client
  // let accessToken = req.cookies['auth-token']
  let accessToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYwMDJlNmEyOGRlZTIxNWY0Y2Y2ODcxOCIsInJvbGUiOiJzdHVkZW50IiwiaWF0IjoxNjEwODA2ODIxLCJleHAiOjE2MTA4MDY4MjF9.mbcjxeTd0gbjqGjKkZxRE3rYvbq5lut-H1App3Hm88Q"

  if (!accessToken)
    return res.status(403).send()

  let payload
  try {
    jwt.verify(accessToken, process.env.ACCESS_TOKEN, (e, d) => {
      if (e)
        console.log(e)
      payload = d
    })
    console.log(payload, 'hjib')
  }
  catch (e) {
    return res.status(401).send()
  }

  //retrieve the refresh token from the users array
  const currentUser = await User.findById(payload.id)

  //verify the refresh token
  try {
    jwt.verify(currentUser.refreshToken, process.env.REFRESH_TOKEN)
  }
  catch (e) {
    return res.status(401).send()
  }

  // ------------>>>>>.. Creating new acess key
  let newToken = jwt.sign({ id: payload.id, role: payload.role }, process.env.ACCESS_TOKEN, {
    algorithm: process.env.ALGORITHM,
    expiresIn: process.env.ACCESS_TOKEN_LIFE
  })

  /*
    * Setting up cookies
    *
    * setting cookie expiry time */
  let d = new Date();
  d.setDate(d.getSeconds() + process.env.ACCESS_TOKEN_LIFE);
  //first-party cookie settings
  res.cookie('auth-token', newToken, {
    expires: d,
    httpOnly: true,
    secure: req.secure || req.headers['x-forwarded-proto'] === 'https',
    sameSite: 'none'
  });
  next()
}