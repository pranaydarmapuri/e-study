import jwt from 'jsonwebtoken'
export default async (req, res) => {


  const token = req.header('auth-token')
  if (!token)
    return res.sendStatus(401)
  // const token = req.body.token
  // if (!token)
  //   return res.sendStatus(401)

  try {
    const verified = jwt.verify(token, process.env.SECRET_KEY)
    res.send(verified)
  }
  catch (e) {
    res.status(403).send('4')
  }
}