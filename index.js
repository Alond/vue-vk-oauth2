let vkAuth = (function () {
  function installClient () {
    let apiUrl = 'https://vk.com/js/api/openapi.js?162'
    return new Promise(resolve => {
      let script = document.createElement('script')
      script.src = apiUrl
      script.onreadystatechange = script.onload = function () {
        if (!script.readyState || /loaded|complete/.test(script.readyState)) {
          setTimeout(function () {
            resolve()
          }, 500)
        }
      }
      document.getElementsByTagName('head')[0].appendChild(script)
    })
  }

  function initClient (config) {
    return new Promise(resolve => {
      window.VK.init(config)
      resolve(window.VK)
    })
  }

  function Auth () {
    if (!(this instanceof Auth)) {
      return new Auth()
    }

    this.load = config => {
      installClient()
        .then(() => {
          return initClient(config)
        })
        .then(() => {
          if (config.widgets) {
            config.widgets.forEach((widget) => {
              this.Widget(widget)
            })
          }
        })
    }

    this.login = (successCallback, errorCallback) => {
      return new Promise((resolve, reject) => {
        window.VK.Auth.login(function (response) {
          if (response.session) {
            /* Пользователь успешно авторизовался */
            resolve(response)
            if (response.settings) {
              /* Выбранные настройки доступа пользователя, если они были запрошены */
            }
          } else {
            /* Пользователь нажал кнопку Отмена в окне авторизации */
            reject(window.VK)
          }
        })
      })
    }

    this.logout = (successCallback, errorCallback) => {
      return new Promise((resolve, reject) => {
        window.VK.Auth.logout(function (response) {
          resolve(response)
        })
      })
    }

    this.revokeGrants = (successCallback, errorCallback) => {
      return new Promise((resolve, reject) => {
        window.VK.Auth.revokeGrants(function (response) {
          resolve(response)
        })
      })
    }

    this.getLoginStatus = (successCallback, errorCallback) => {
      return new Promise((resolve, reject) => {
        window.VK.Auth.getLoginStatus(response => {
          resolve(response)
        })
      })
    }

    this.getSession = () => {
      return new Promise((resolve, reject) => {
        let result = window.VK.Auth.getSession()
        if (result) {
          resolve(result)
        } else {
          this.getLoginStatus().then(response => resolve(response.session))
        }
      })
    }

    this.Api = (method, prompt) => {
      return new Promise((resolve, reject) => {
        window.VK.Api.call(method, prompt, function (r) {
          if (r.response) {
            resolve(r.response);
          } else {
            reject('VK Api: not allowed')
          }
        });
      })
    }

    this.Widget = (options) => {
      console.log(options)
      window.VK.Widgets[options.widget](options.selector, options.props, -20003922)
    }
  }

  return Auth()
})()

function installVkAuthPlugin (Vue, options) {
  /* eslint-disable */
  //set config
  let VkAuthConfig = null
  let GoogleAuthDefaultConfig = {  }
  if (typeof options === 'object') {
    VkAuthConfig = Object.assign(GoogleAuthDefaultConfig, options)
    if (!options.apiId) {
      console.warn('apiId is required')
    }
  } else {
    console.warn('invalid option type. Object type accepted only')
  }

  // Install Vue plugin
  Vue.vkAuth = vkAuth
  Object.defineProperties(Vue.prototype, {
    $vkAuth: {
      get: function () {
        return Vue.vkAuth
      }
    }
  })
  Vue.vkAuth.load(options)
}

export default installVkAuthPlugin
