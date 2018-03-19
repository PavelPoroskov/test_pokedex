
import 'whatwg-fetch'

function apiFetchJson (url) {
  return window.fetch(url)
    .then(response => response.json())
}

export default apiFetchJson
