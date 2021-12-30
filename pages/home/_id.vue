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

    <div v-for="review in reviews" :key="review.objectID" class="reviews">
      <p><img :src="review.reviewer.image" /></p>
      <p>{{ review.reviewer.name }}</p>
      <p>{{ formatDate(review.date) }}</p>
      <p><short-text :text="review.comment" :target="150" /></p>
    </div>

    <div class="user">
      <img :src="user.image" />
      <p>{{ user.name }}</p>
      <p>Joined {{ formatDate(user.joined) }}</p>
      <p>{{ user.reviewCount }} reviews</p>
      <p>{{ user.description }}</p>
    </div>
  </div>
</template>

<script>
import ShortText from '~/components/ShortText.vue'
export default {
  components: { ShortText },
  async asyncData({ params, $api, error }) {
    const responses = await Promise.all([
      $api.getHome(params.id),
      $api.getReviewsByHomeId(params.id),
      $api.getUserByHomeId(params.id),
    ])

    const badResponse = responses.find((response) => !response.ok)
    if (badResponse) {
      return error({
        statusCode: badResponse.status,
        message: badResponse.statusText,
      })
    }

    const [homeResponse, reviewResponse, userResponse] = responses

    return {
      home: homeResponse.json,
      reviews: reviewResponse.json.hits,
      user: userResponse.json.hits[0],
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

  methods: {
    formatDate(dateStr) {
      const date = new Date(dateStr)
      return date.toLocaleDateString('en-GB', {
        month: 'long',
        year: 'numeric',
      })
    },
  },
}
</script>

<style scoped>
.gmap {
  height: 800px;
  width: 800px;
}
</style>
