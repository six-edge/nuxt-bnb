<template>
  <div>
    <div v-for="home in homes" :key="home.objectID">
      <nuxt-link :to="`/home/${home.objectID}`">
        <home-card :home="home" class="home"></home-card>
      </nuxt-link>
    </div>
  </div>
</template>

<script>
import homes from '../data/homes.json'

export default {
  data() {
    return {
      homes: homes.slice(0, 3),
    }
  },

  head() {
    return {
      title: 'Homepage',
      meta: [
        {
          name: 'description',
          content: 'This is a homepage',
          hid: 'description',
        },
      ],
    }
  },
}
</script>

<style>
.home {
  float: left;
  margin: 12px;
}
</style>
