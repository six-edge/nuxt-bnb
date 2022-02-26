<template>
  <div class="app">
    <header class="app-header">
      <div class="app-logo">
        <nuxt-link to="/">
          <img alt="Nuxt BnB Logo" src="/images/logo.svg" />
        </nuxt-link>
      </div>

      <div class="app-search">
        <input
          ref="citySearch"
          type="text"
          placeholder="Where do you want to go?"
          @changed="changed"
        />
        <input type="text" class="datepicker" placeholder="Check in" />
        <input type="text" class="datepicker" placeholder="Check out" />
        <button>
          <img alt="Search icon" src="/images/icons/search.svg" />
        </button>
      </div>

      <div class="app-user-menu">
        <template v-if="isLoggedIn">
          <img alt="House Icon" src="/images/icons/house.svg" />
          <div class="name">Host</div>
          <img alt="User Avatar" :src="user.imageUrl" class="avatar" />
        </template>
        <div v-show="!isLoggedIn" id="googleButton" class="ml-8"></div>
      </div>
    </header>
    <section>
      <nuxt />
    </section>
  </div>
</template>

<script>
export default {
  computed: {
    user() {
      return this.$store.state.auth.user
    },
    isLoggedIn() {
      return this.$store.state.auth.isLoggedIn
    },
  },

  mounted() {
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
          label: place.formatted_address,
        },
      })
    },
  },
}
</script>

<style scoped></style>
