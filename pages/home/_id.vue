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

if (process.client) {
  window.initMap = () => {
    console.log('test')
  }
}

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
    const { maps } = window.google
    const position = new maps.LatLng(
      this.home._geoloc.lat,
      this.home._geoloc.lng
    )
    const mapOptions = {
      zoom: 18,
      center: position,
      disableDefaultUI: true,
      zoomControl: true,
    }
    const map = new maps.Map(document.getElementById('map'), mapOptions)
    const marker = new maps.Marker({ position })
    marker.setMap(map)
  },
}
</script>

<style scoped>
.gmap {
  height: 800px;
  width: 800px;
}
</style>
