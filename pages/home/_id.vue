<template>
  <div class="app-container">
    <property-gallery :images="home.images" />
    <property-details :home="home" />
    <property-description :home="home" />
    <property-map :home="home" />
    <property-reviews :reviews="reviews" />
    <property-host :user="user" />
  </div>
</template>

<script>
export default {
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
      reviews: reviewResponse.json.hits || [],
      user: userResponse.json.hits[0] || {},
    }
  },

  head() {
    return {
      title: this.home.title,
    }
  },
}
</script>
