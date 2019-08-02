![npm](https://img.shields.io/npm/v/@dyadikov/vue-vk-oauth2)

# vue-vk-oauth2

Это обёртка VK Oauth для Vue2

github https://github.com/DenisYadikov/vue-vk-oauth2

#### Установка

```
npm i @dyadikov/vue-vk-oauth2
```

#### Подключение

Подключать пакет желательно но необязательно непосредственно в компоненте, где он будет использоваться, т.е. в компоненте регистрации/аутентификации.

Подключть пакет в проект:
```
import VKAuth from '@dyadikov/vue-vk-oauth2'
...
new Vue(VKAuth, {apiId: ВАШ_VK_APP_ID})
```

После подключения вы можете обращаться к инстансу через глобальную переменнуб

#### Использование
```
<template>
  ...
  <button @click="vkLogin">vkLogin</button>
  <button @click="vkLogout">vkLogout</button>
  <button @click="vkGetLoginStatus">vkGetLoginStatus</button>
  ...
</template>

...

<script>
...
methods: {
  vkLogin() {
    this.$vkAuth.login(function(response) => {
      // вернутся данные указанные в https://vk.com/dev/openapi?f=3.1.%20VK.Auth.login
    })
  },
  vkLogout() {
    this.$vkAuth.logout(function(response) => {
      // вернутся данные https://vk.com/dev/openapi?f=3.1.%20VK.Auth.logout
    })
  }
  vkGetLoginStatus() {
    this.$vkAuth.getLoginStatus(function(response) => {
      // вернется true/false
    })
  }
}
...

<script>
```
