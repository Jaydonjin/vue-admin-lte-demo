class WebStorage {
  constructor (storage) {
    this.storage = storage
  }

  set (key, value) {
    this.storage.setItem(key, JSON.stringify(value))
  }

  get (key) {
    let v = this.storage.getItem(key)
    try {
      return JSON.parse(v)
    } catch (e) {
      return v
    }
  }

  delete (key) {
    this.storage.removeItem(key)
  }
}

var session = new WebStorage(sessionStorage)
export {
  session
}
