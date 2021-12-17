<template>
  <div style="text-align: center">
    <img
      src="https://www.clipartmax.com/png/full/19-191690_for-download-free-image-broken-house-clipart.png"
    />
    <h1>{{ error.statusCode }} {{ error.message }}</h1>
  </div>
</template>

<script>
export default {
  props: {
    error: {
      type: Object,
      required: true,
    },
  },
  head() {
    return {
      title: this.error.message,
    }
  },
}
</script>
