<template>
  <div v-if="user.name" class="app-background-grey">
    <div class="app-wrapper app-padded-vertical">
      <div class="app-host-header">
        <div><img :src="user.image" alt="Host Avatar" /></div>
        <div>
          <div class="app-host-name">{{ user.name }}</div>
          <div class="app-host-date">
            Joined in {{ shortDate(user.joined) }}
          </div>
          <div class="app-flex">
            <div class="app-host-reviews">{{ user.reviewCount }} reviews</div>
          </div>
        </div>
      </div>
      <div class="app-host-description">{{ user.description }}</div>
    </div>
  </div>
  <h2 v-else class="app-subtitle">User not found</h2>
</template>

<script>
import shortDate from '~/utils/shortDate'
export default {
  props: {
    user: {
      type: Object,
      required: true,
    },
  },
  methods: {
    shortDate,
  },
}
</script>

<style scoped></style>
