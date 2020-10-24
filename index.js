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

var __spreadArrays = (this && this.__spreadArrays) || function () {
  for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
  for (var r = Array(s), k = 0, i = 0; i < il; i++)
    for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
      r[k] = a[j];
  return r;
};

function installVkAuthPlugin(vue, options) {
  var _a;
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
  vkAuth.load(options)

  //var vkAuth = options ? Swal.mixin(options) : Swal;
  var vkAuthFunction = function () {
    var _a;
    var args = [];
    for (var _i = 0; _i < arguments.length; _i++) {
      args[_i] = arguments[_i];
    }
    return (_a = vkAuth.fire).call.apply(_a, __spreadArrays([vkAuth], args));
  };
  var methodName;
  for (methodName in vkAuth) {
    if (Object.prototype.hasOwnProperty.call(vkAuth, methodName) &&
        typeof vkAuth[methodName] === 'function') {
      vkAuthFunction[methodName] = (function (method) {
        return function () {
          var _a;
          var args = [];
          for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
          }
          return (_a = vkAuth[method]).call.apply(_a, __spreadArrays([vkAuth], args));
        };
      })(methodName);
    }
  }
  if (((_a = vue.config) === null || _a === void 0 ? void 0 : _a.globalProperties) && !vue.config.globalProperties.$vkAuth) {
    vue.config.globalProperties.$vkAuth = vkAuthFunction;
    vue.provide('$vkAuth', vkAuthFunction);
  }
  else if (!Object.prototype.hasOwnProperty.call(vue, 'vkAuth')) {
    vue.prototype.$vkAuth = vkAuthFunction;
    vue['vkAuth'] = vkAuthFunction;
  }
};

export default installVkAuthPlugin
