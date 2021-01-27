const configToken = token => {
  const config = {
    headers: {
      'content-type': 'application/json'
    }
  }
  config.headers['auth-token'] = token
  return config
}

export default configToken