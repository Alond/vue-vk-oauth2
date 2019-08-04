![npm](https://img.shields.io/npm/v/@dyadikov/vue-vk-oauth2)

# vue-vk-oauth2

Это обёртка VK Oauth для Vue2 https://vk.com/dev/openapi

github https://github.com/DenisYadikov/vue-vk-oauth2

#### Возможности

1. Авторизация пользователя
2. Вызов методов API ВКонтакте, список: https://vk.com/dev/methods
3. Виджеты

#### Установка

```
npm i @dyadikov/vue-vk-oauth2
```

#### Подключение

Подключить пакет в проект, виджеты описываются опционально:
```
import VKAuth from '@dyadikov/vue-vk-oauth2'

new Vue(VKAuth, {apiId: YOUR_VK_APP_ID,
  widgets: [{
    widget: 'ContactUs',
    selector: 'vk_contact_us',
    props: {text: 'Задайте свой вопрос'}
  }]
})
```

После подключения вы можете обращаться к инстансу через глобальную переменную $vkAuth

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
    <!-- VK Widget Example -->
    <div id="vk_contact_us"></div>
  </div>
</template>

...

<script>
import Vue from 'vue'
import VKAuth from '@dyadikov/vue-vk-oauth2'

new Vue(VKAuth, {apiId: YOUR_VK_APP_ID,
  widgets: [{
    widget: 'ContactUs',
    selector: 'vk_contact_us',
    props: {text: 'Задайте свой вопрос'}
  }]
})

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
