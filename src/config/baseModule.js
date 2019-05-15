import axios from 'axios'

const headers = {
  'Content-Type': 'application/json;charset=UTF-8',
}

class BaseModule {
  constructor (baseURL) {
    this.$http = axios.create({
      baseURL,
      headers,
      defaults: {
        withCredentials: true
      }
    })

    this.$http.interceptors.response.use(
      response => {
        switch (response.data.code) {
          
          default:
            // fixme need add response data here !
            // instance.showMsg(response.data.msg);
            // Toast(response.data.msg);
            return response.data
        }
      },
      error => {
        return Promise.reject(error)
      }
    )
  }

  get (url, config = {}) {
    return this.$http.get(url, config)
  }

  post (url, data = undefined, config = {}) {
    return this.$http.post(url, data, config)
  }
}
export default BaseModule
