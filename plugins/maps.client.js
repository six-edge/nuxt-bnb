export default function (ctx, inject) {
  let isLoaded = false
  let waiting = []

  addScript()

  inject('maps', {
    showMap,
    makeAutocomplete
  })

  function addScript() {
    const script = document.createElement('script')
    script.src =
      'https://maps.googleapis.com/maps/api/js?key=AIzaSyC-7byupAxt_1QncRygt471jMIPEjYBqIw&libraries=places&callback=initMap'
    script.async = true
    window.initMap = initMap
    document.head.appendChild(script)
  }

  function initMap() {
    isLoaded = true
    waiting.forEach((item) => {
      if (typeof item.fn === 'function') {
        item.fn(...item.arguments)
      }
    })
    waiting = []
  }

  function makeAutocomplete(input) {
    if (!isLoaded) {
      waiting.push({ fn: makeAutocomplete, arguments })
      return
    }
    const autocomplete = new window.google.maps.places.Autocomplete(input, { types: ['(cities)'] })
    autocomplete.addListener('place_changed', () => {
      const place = autocomplete.getPlace()
      input.dispatchEvent(new CustomEvent('changed', { detail: place }))
    })
  }

  function showMap(canvas, lat, lng) {
    if (!isLoaded) {
      waiting.push({
        fn: showMap,
        arguments
      })
      return
    }
    const { maps } = window.google
    const position = new maps.LatLng(lat, lng)
    const mapOptions = {
      zoom: 18,
      center: position,
      disableDefaultUI: true,
      zoomControl: true,
    }
    const map = new maps.Map(canvas, mapOptions)
    const marker = new maps.Marker({ position })
    marker.setMap(map)
  }
}
