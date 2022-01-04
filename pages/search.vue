<template>
  <div>
    <p>Results for {{ label }}</p>
    <div id="map" ref="map" class="map-results"></div>
    <div v-if="homes.length > 0">
      <nuxt-link
        v-for="home in homes"
        :key="home.objectID"
        :to="`/home/${home.objectID}`"
      >
        <home-row
          :home="home"
          @mouseover.native="highlightMarker(home.objectID, true)"
          @mouseout.native="highlightMarker(home.objectID, false)"
        />
      </nuxt-link>
    </div>
    <div v-else>No results found</div>
  </div>
</template>

<script>
export default {
  async beforeRouteUpdate(to, from, next) {
    const { lat, lng, label } = to.query
    const data = await this.$api.getHomeByLocation(lat, lng)
    this.homes = data.json.hits
    this.label = label
    this.lat = lat
    this.lng = lng
    this.updateMap()
    next()
  },
  async asyncData({ query, $api }) {
    const { lat, lng, label } = query
    const data = await $api.getHomeByLocation(lat, lng)
    if (!data.ok) {
      throw new Error(data.statusText)
    }
    return {
      homes: data.json.hits,
      label,
      lat,
      lng,
    }
  },
  head() {
    return {
      title: `Homes around ${this.label}`,
    }
  },
  mounted() {
    this.updateMap()
  },
  methods: {
    highlightMarker(homeId, isHighlighted) {
      document
        .getElementsByClassName(`home-${homeId}`)[0]
        ?.classList?.toggle('marker-highlight', isHighlighted)
    },
    updateMap() {
      this.$maps.showMap(
        this.$refs.map,
        this.lat,
        this.lng,
        this.getHomeMarkers()
      )
    },
    getHomeMarkers() {
      return this.homes.map((home) => ({
        ...home._geoloc,
        pricePerNight: home.pricePerNight,
        id: home.objectID,
      }))
    },
  },
}
</script>

<style>
.map-results {
  float: right;
  height: 600px;
  width: 600px;
}
.marker {
  background-color: white;
  border: 1px solid lightgrey;
  border-radius: 20px;
  padding: 5px 8px;
  font-weight: bold;
  box-shadow: 2px 2px 3px grey;
}
.marker-highlight {
  color: white !important;
  background-color: black;
  border-color: black;
}
</style>
