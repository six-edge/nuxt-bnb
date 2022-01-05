<template>
  <div class="app-search-results-page">
    <div class="app-search-results">
      <div class="app-search-results-listing">
        <h2 v-if="homes.length > 0" class="app-subtitle">
          {{ homes.length }} results in {{ label }}
        </h2>
        <h2 v-else class="app-subtitle">No properties found in {{ label }}</h2>
        <nuxt-link
          v-for="home in homes"
          :key="home.objectID"
          :to="`/home/${home.objectID}`"
        >
          <home-row
            class="app-house"
            :home="home"
            @mouseover.native="highlightMarker(home.objectID, true)"
            @mouseout.native="highlightMarker(home.objectID, false)"
          />
        </nuxt-link>
      </div>
      <div class="app-search-results-map">
        <div ref="map" class="app-map"></div>
      </div>
    </div>
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
