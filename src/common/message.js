export const message = {
  loading (shown) {
    this._globalMask()
  },
  _globalMask (shown) {
    document.getElementById('global-mask').style.display = shown ? 'block' : 'none'
  }
}
