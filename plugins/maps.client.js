export default function (ctx, inject) {
  let isLoaded = false
  let waiting = []

  addScript()

  inject('maps', {
    showMap,
  })

  function addScript() {
    const script = document.createElement('script')
    script.src =
      'https://maps.googleapis.com/maps/api/js?key=AIzaSyC-7byupAxt_1QncRygt471jMIPEjYBqIw&callback=initMap'
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
