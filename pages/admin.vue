<template>
  <div class="p-4">
    <h1 class="text-2xl font-bold">Admin</h1>
    <div class="bg-green-300 p-2">
      <nuxt-link to="/admin/homes">Homes</nuxt-link>
    </div>
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
