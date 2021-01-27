// import User from '../_models/User'
import jwt from 'jsonwebtoken'

export default async (req, res, next) => {

  // if (!req.cookies['auth-token'])
  //   return res.sendStatus(401)

  // const token = req.cookies['auth-token']

  const token = req.header('auth-token')
  if (!token)
    return res.sendStatus(401)
  // const token = req.body.token
  // if (!token)
  //   return res.sendStatus(401)


  try {
    const verified = jwt.verify(token, process.env.SECRET_KEY)
    req.user = verified
    next()
  }
  catch (e) {
    res.status(403).send('No acess')
  }
}