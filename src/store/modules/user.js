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
      setToken(token, {
        expires: 7
      })
    },
    // SET_NAME: (state, username) => {
    //   state.name = username
    // },
    // SET_HEAD: (state, head) => {
    //   state.head = head
    // },
    SET_LOGINSTATE: (state, loginState) => {
      state.loginState = loginState
    },
    SET_USER_INFO: (state, userInfo) => {
      state.head = userInfo.head
      state.name = userInfo.name
      state.loginState = userInfo.loginState
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
          const { token, head, name } = res.data.data

          if (status === 200) {
            commit('SET_TOKEN', token)
            commit('SET_USER_INFO', {
              head,
              name,
              loginState: true
            })
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
          const { head, name } = res.data.data
          const msg = res.data.msg

          if (status === 200) {
            commit('SET_USER_INFO', {
              head,
              name,
              loginState: true
            })
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
