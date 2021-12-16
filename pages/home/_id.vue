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
import homes from '~/data/homes'

export default {
  data() {
    return {
      home: {},
    }
  },

  head() {
    return {
      title: this.home.title,
    }
  },

  created() {
    const home = homes.find((home) => home.objectID === this.$route.params.id)
    this.home = home
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
