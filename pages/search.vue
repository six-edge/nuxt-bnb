<template>
  <div>
    <p>{{ label }} / {{ lat }} / {{ lng }}</p>
    <div v-for="home in homes" :key="home.objectID">
      <p>{{ home.title }}</p>
    </div>
  </div>

</template>

<script>
export default {
  async asyncData({ query, $api }) {
    const { lat, lng, label } = query
    const data = await $api.getHomeByLocation(lat, lng)
    return {
      homes: data.json.hits,
      label,
      lat,
      lng
    }
  },
  watchQuery: ['lat'],
};
</script>

<style scoped>

</style>
