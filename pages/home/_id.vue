<template>
  <div>
    <div style="display: flex">
      <img
        v-for="image in home.images"
        :key="image"
        :src="image"
        width="200"
        height="150"
      />
    </div>
    <h1>{{ home.title }}</h1>
    <p>{{ home.description }}</p>
    <p>${{ home.pricePerNight }} / night</p>
    <p>
      <img src="/images/marker.svg" width="20" height="20" />{{
        home.location.address
      }}, {{ home.location.city }}, {{ home.location.state }},
      {{ home.location.country }}
    </p>
    <p>
      <img src="/images/star.svg" width="20" height="20" />{{
        home.reviewValue
      }}
      rating
    </p>
    <p>{{ home.guests }} guests</p>
    <p>{{ home.bedrooms }} rooms</p>
    <p>{{ home.beds }} beds</p>
    <p>{{ home.bathrooms }} bathrooms</p>

    <div id="map" ref="map" class="gmap"></div>
  </div>
</template>

<script>
export default {
  async asyncData({ params, $api, error }) {
    const response = await $api.getHome(params.id)
    if (!response.ok)
      return error({
        statusCode: response.status,
        message: response.statusText,
      })
    return {
      home: response.json,
    }
  },

  head() {
    return {
      title: this.home.title,
    }
  },

  mounted() {
    this.$maps.showMap(
      this.$refs.map,
      this.home._geoloc.lat,
      this.home._geoloc.lng
    )
  },
}
</script>

<style scoped>
.gmap {
  height: 800px;
  width: 800px;
}
</style>
