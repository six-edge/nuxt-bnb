<template>
  <div>
   <nuxt-logo></nuxt-logo>
   <h1>Nuxt BnB</h1>
   <div v-for="home in homes" :key="home.objectID">
    <home-card :home="home" class="home"></home-card>
   </div>
  </div>
</template>

<script>
import homes from '../data/homes.json'

export default {
  data() {
    return {
      homes: homes.slice(0, 3)
    }
  },
  
  head() {
    return {
      title: 'Homepage',
      meta: [
        {
          name: 'description',
          content: 'This is a homepage',
          hid: 'description'
        }
      ]
    }
  }
}
</script>

<style>
.home {
  float: left;
  margin: 12px;
}
</style>