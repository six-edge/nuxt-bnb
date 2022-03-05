<template>
  <div class="p-4">
    <h1 class="app-title">Admin</h1>
    <nuxt-child></nuxt-child>
  </div>
</template>

<script>
import Cookie from 'js-cookie'

export default {
  name: 'Admin',
  asyncData({ $config, redirect }) {
    if (!Cookie.get($config.auth.cookieName)) {
      redirect('/prohibited')
    }
  },
}
</script>

<style scoped></style>
