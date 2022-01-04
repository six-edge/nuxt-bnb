<template>
  <div style="clear: left; padding: 10px">
    <img
      :alt="home.title"
      :src="home.images[0]"
      style="width: 250px; float: left; padding: 10px"
    />
    <p>{{ home.title }}</p>
    <p>
      {{ home.location.address }} {{ home.location.city }}
      {{ home.location.state }}
    </p>
    <p>
      {{ pluralize(home.guests, 'guest') }},
      {{ pluralize(home.bedrooms, 'room') }}, {{ pluralize(home.beds, 'bed') }},
      {{ pluralize(home.bathrooms, 'bathroom') }}
    </p>
    <p>{{ home.pricePerNight }} / night</p>
    <img alt="Rating" src="/images/star.svg" width="20" height="20" />
    {{ home.reviewValue }} ({{ home.reviewCount }})
  </div>
</template>

<script>
export default {
  props: {
    home: {
      type: Object,
      required: true,
    },
  },
  methods: {
    pluralize(number, singularWord) {
      const text = `${number} ${singularWord}`
      return number === 1 ? text : text + 's'
    },
  },
}
</script>
