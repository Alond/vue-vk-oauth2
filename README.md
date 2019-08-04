![npm](https://img.shields.io/npm/v/@dyadikov/vue-vk-oauth2)

# vue-vk-oauth2

Это обёртка VK Oauth для Vue2 https://vk.com/dev/openapi

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

После подключения вы можете обращаться к инстансу через глобальную переменную

#### Использование
```
<template>
  <div>
    <button @click="vkLogin">vkLogin</button>
    <button @click="vkLogout">vkLogout</button>
    <button @click="vkGetLoginStatus">vkGetLoginStatus</button>
    <button @click="vkRevokeGrants">vkRevokeGrants</button>
    <button @click="vkGetSession">vkGetSession</button>
    <button @click="vkApiMethodExample">vkApiMethodExample</button>
  </div>
</template>

...

<script>
import Vue from 'vue'
import VKAuth from '@dyadikov/vue-vk-oauth2'

new Vue(VKAuth, {apiId: ВАШ_VK_APP_ID})

export default {
  methods: {
    vkLogin () {
      this.$vkAuth.login()
        .then(response => {
          console.log('vklogin', response)
        })
        .catch(error => {
          console.error(error)
        })
    },
    vkLogout () {
      this.$vkAuth.logout()
        .then(response => {
          console.log('vklogout', response)
        })
        .catch(error => {
          console.error(error)
        })
    },
    vkGetLoginStatus () {
      this.$vkAuth.getLoginStatus()
        .then(response => {
          console.log(response)
        })
        .catch(error => {
          console.error(error)
        })
    },
    vkRevokeGrants () {
      this.$vkAuth.revokeGrants()
        .then(response => {
          console.log(response)
        })
        .catch(error => {
          console.error(error)
        })
    },
    vkGetSession () {
      this.$vkAuth.getSession()
        .then(response => {
          console.log(response)
        })
        .catch(error => {
          console.error(error)
        })
    },
    vkApiMethodExample () {
      this.$vkAuth.Api('users.get', {user_ids: VK_USER_ID, v: '5.73'})
        .then(response => {
          console.log(response)
        })
        .catch(error => {
          console.error(error)
        })
  }
}
<script>
```
