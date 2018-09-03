import { getToken, setToken } from 'utils/auth'
import { loginByUsername, tokencheck } from 'api/user'

const user = {
  state: {
    name: '',
    head: '',
    loginDate: '',
    token: getToken(),
    loginState: false
  },
  mutations: {
    SET_TOKEN: (state, token) => {
      state.token = token
    },
    SET_NAME: (state, username) => {
      state.name = username
    },
    SET_HEAD: (state, head) => {
      state.head = head
    },
    SET_LOGINSTATE: (state, loginState) => {
      state.loginState = loginState
    }
  },
  actions: {
    LoginByUsername ({ commit }, userInfo) {
      const { username, password } = userInfo
      return new Promise((resolve, reject) => {
        loginByUsername({
          username: username.trim(),
          password
        }).then(res => {
          const status = res.data.status
          const data = res.data.data

          if (status === 200) {
            setToken(data.token, {
              expires: 7
            })
            commit('SET_NAME', data.user.username)
            commit('SET_HEAD', data.user.head)
            commit('SET_TOKEN', data.token)
            commit('SET_LOGINSTATE', true)
            resolve()
          } else {
            resolve(res.data.msg)
          }
        }).catch(error => {
          reject(error)
        })
      })
    },
    Tokencheck ({ commit }) {
      return new Promise((resolve, reject) => {
        tokencheck().then(res => {
          const status = res.data.status
          const data = res.data.data
          const msg = res.data.msg

          if (status === 200) {
            commit('SET_NAME', data.name)
            commit('SET_HEAD', data.head)
            commit('SET_LOGINSTATE', true)
            resolve()
          }
          resolve(msg)
        }).catch(error => {
          reject(error)
        })
      })
    }
  }
}

export default user
