<template>
  <div class="main">
    <header>
      <nuxt-link to="/">
        <nuxt-logo></nuxt-logo>
        <h1>Nuxt BnB</h1>
      </nuxt-link>
      <input ref="citySearch" type="text" @changed="changed"/>
    </header>
    <section>
      <nuxt />
    </section>
  </div>
</template>

<script>
export default {
  mounted () {
    this.$maps.makeAutocomplete(this.$refs.citySearch)
  },

  methods: {
    changed(event) {
      const place = event.detail
      if (!place.geometry || !place.formatted_address) return
      this.$router.push({
        name: 'search',
        query: {
          lat: place.geometry.location.lat(),
          lng: place.geometry.location.lng(),
          label: place.formatted_address
        }
      })
    }
  }
};
</script>

<style scoped>
.main {
  font-family: Arial, Helvetica, sans-serif;
}
</style>
