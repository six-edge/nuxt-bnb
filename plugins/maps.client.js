export default function ({ $config }, inject) {
  let isLoaded = false
  let waiting = []

  addScript()

  inject('maps', {
    showMap,
    makeAutocomplete,
  })

  function addScript() {
    const script = document.createElement('script')
    script.src = `https://maps.googleapis.com/maps/api/js?key=${$config.maps.apiKey}&libraries=places&callback=initMap`
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

  function makeAutocomplete(input, types = ['(cities)']) {
    if (!isLoaded) {
      waiting.push({ fn: makeAutocomplete, arguments })
      return
    }
    const autocomplete = new window.google.maps.places.Autocomplete(input, {
      types,
    })
    autocomplete.addListener('place_changed', () => {
      const place = autocomplete.getPlace()
      input.dispatchEvent(new CustomEvent('changed', { detail: place }))
    })
  }

  function showMap(canvas, lat, lng, markers = []) {
    if (!isLoaded) {
      waiting.push({
        fn: showMap,
        arguments,
      })
      return
    }
    const { maps } = window.google
    const mapOptions = {
      zoom: 18,
      center: new maps.LatLng(lat, lng),
      disableDefaultUI: true,
      zoomControl: true,
      styles: [
        {
          featureType: 'poi.business',
          elementType: 'labels.icon',
          stylers: [{ visibility: 'off' }],
        },
      ],
    }
    const map = new maps.Map(canvas, mapOptions)
    if (markers.length === 0) {
      const position = new maps.LatLng(lat, lng)
      const marker = new maps.Marker({ position, clickable: false })
      marker.setMap(map)
      return
    }
    const bounds = new maps.LatLngBounds()
    markers.forEach((home) => {
      const position = new maps.LatLng(home.lat, home.lng)
      const marker = new maps.Marker({
        position,
        label: {
          text: `$${home.pricePerNight}`,
          className: `marker home-${home.id}`,
        },
        icon: 'https://maps.gstatic.com/mapfiles/transparent.png',
        clickable: false,
      })
      marker.setMap(map)
      bounds.extend(position)
    })
    map.fitBounds(bounds)
  }
}
