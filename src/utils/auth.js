import Cookies from 'js-cookie'

const tokenKey = 'authorization'
const expires = 7

export function getToken () {
  return Cookies.get(tokenKey)
}

export function setToken (token, options) {
  Cookies.set(tokenKey, token, {
    expires: options.expires || expires
  })
}

export function removeToken () {
  Cookies.remove(tokenKey)
}
