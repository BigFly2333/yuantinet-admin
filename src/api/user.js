import request from 'utils/request'

export function loginByUsername (data) {
  return request.post('/login/submit', data)
}

export function tokencheck () {
  return request.get('/tokencheck')
}
