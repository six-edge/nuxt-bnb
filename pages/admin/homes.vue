<template>
  <div>
    <div><!-- List of homes--></div>
    <h2 class="text-xl font-bold">Add a home</h2>
    <form class="form" @submit.prevent="submit">
      <h3>Images</h3>
      <input v-model="home.images[0]" type="text" class="w-11/12" />
      <input v-model="home.images[1]" type="text" class="w-11/12" />
      <input v-model="home.images[2]" type="text" class="w-11/12" />
      <input v-model="home.images[3]" type="text" class="w-11/12" />
      <input v-model="home.images[4]" type="text" class="w-11/12" />
      <h3>Title</h3>
      <input v-model="home.title" type="text" class="w-60" />
      <h3>Description</h3>
      <textarea v-model="home.description" class="w-104"></textarea>
      <h3>Note</h3>
      <textarea v-model="home.note" class="w-104"></textarea>
      <h3>Features</h3>
      <input v-model="home.features[0]" type="text" class="w-26" />
      <input v-model="home.features[1]" type="text" class="w-26" />
      <input v-model="home.features[2]" type="text" class="w-26" />
      <input v-model="home.features[3]" type="text" class="w-26" />
      <input v-model="home.features[4]" type="text" class="w-26" />
      <h3>Details</h3>
      <label>Price per night</label>
      <input v-model="home.pricePerNight" type="number" class="w-14" />
      <label>Guests</label>
      <input v-model="home.guests" type="number" class="w-14" />
      <label>Bedrooms</label>
      <input v-model="home.bedrooms" type="number" class="w-14" />
      <label>Beds</label>
      <input v-model="home.beds" type="number" class="w-14" />
      <label>Bathrooms</label>
      <input v-model="home.bathrooms" type="number" class="w-14" />
      <h3>Location</h3>
      <p>
        <label>Search</label>
        <input ref="locationSelector" type="text" autocomplete="off" placeholder="address" @changed="changed">
      </p>
      <p>
        <label>Address</label>
        <input v-model="home.location.address" type="text" class="w-60" />
      </p>
      <p>
        <label>City</label>
        <input v-model="home.location.city" type="text" class="w-60" />
      </p>
      <p>
        <label>State</label>
        <input v-model="home.location.state" type="text" class="w-60" />
      </p>
      <p>
        <label>Postal Code</label>
        <input v-model="home.location.postalCode" type="text" class="w-60" />
      </p>
      <p>
        <label>Country</label>
        <input v-model="home.location.country" type="text" class="w-60" />
      </p>
      <div>
        <button class="border px-4 py-2 border-gray-400 bg-green-300">
          Add
        </button>
      </div>
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      home: {
        title: '',
        description: '',
        note: '',
        pricePerNight: '',
        guests: '',
        bedrooms: '',
        beds: '',
        bathrooms: '',
        features: ['', '', '', '', ''],
        location: {
          address: '',
          city: '',
          state: '',
          postalCode: '',
          country: '',
        },
        _geoloc: {
          lat: '',
          lng: '',
        },
        images: [
          'https://images.unsplash.com/photo-1518780664697-55e3ad937233?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=765&q=80',
          'https://images.unsplash.com/photo-1570129477492-45c003edd2be?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80',
          'https://images.unsplash.com/photo-1568605114967-8130f3a36994?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80',
          'https://images.unsplash.com/photo-1549517045-bc93de075e53?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1471&q=80',
          'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1475&q=80',
        ],
      },
    }
  },
  mounted() { 
    this.$maps.makeAutocomplete(this.$refs.locationSelector, ['address'])
  },
  methods: {
    changed(event) {
      const parts = event.detail.address_components
      const street = this.getAddressPart(parts, 'street_number')
      const route = this.getAddressPart(parts, 'route')

      this.home.location.address = `${street} ${route}`
      this.home.location.city = this.getAddressPart(parts, 'locality') || this.getAddressPart(parts, 'postal_town')
      this.home.location.state = this.getAddressPart(parts, 'administrative_area_level_2')
      this.home.location.country = this.getAddressPart(parts, 'country')
      this.home.location.postalCode = this.getAddressPart(parts, 'postal_code')
      this.home._geoloc.lat = event.detail.geometry.location.lat()
      this.home._geoloc.lng = event.detail.geometry.location.lng()

      console.log(parts)
    },
    getAddressPart(parts = [], type = '') {
      return parts.find(part => part.types.includes(type))?.long_name || ''
    },
    async submit() {
      await fetch('/api/homes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(this.home),
      })
      console.log('Submit form')
    },
  },
}
</script>

<style scoped>
form input,
form textarea {
  @apply p-1 m-1 bg-gray-200;
}
h2 {
  @apply pt-3 pb-3;
}
h3 {
  @apply font-bold;
}
</style>
