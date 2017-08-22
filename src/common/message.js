const config = {}
export const message = {
  init ({app}) {
    config.app = app
  },
  error () {
    config.app.$refs.toastr.e('errr', 'errro')
  },
  loading (shown) {
    this._globalMask()
  },
  _globalMask (shown) {
    document.getElementById('global-mask').style.display = shown ? 'block' : 'none'
  }
}
