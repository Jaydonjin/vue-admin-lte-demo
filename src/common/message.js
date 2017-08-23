import router from '../router'

/*
* position values:
* toast-top-right
* toast-bottom-right
* toast-bottom-left
* toast-top-left
* toast-top-full-width
* toast-bottom-full-width
* toast-top-center
* toast-bottom-center
*
* type values:
* info,warning,error,success
 */
const defaults = {
  title: 'Toast Title',
  msg: 'Toast Msg',
  position: 'toast-top-center',
  type: 'success',
  timeout: 2000,
  progressbar: true,
  closeOnHover: false,
  clickClose: true,
  onCreated: () => {},
  onClicked: () => {},
  onClosed: () => {},
  onMouseOver: () => {},
  onMouseOut: () => {}
}

export const message = {
  _toastr (type, title, msg, options = {}) {
    let toastr = router.app.$children[0].$refs.toastr
    options = Object.assign({}, defaults, options, {title, msg, type})
    toastr.Add(options)
  },
  error (message, options) {
    this._toastr('error', 'Error', message, options)
  },
  success (message, options) {
    this._toastr('success', 'Success', message, options)
  },
  warning (message, options) {
    this._toastr('warning', 'Warning', message, options)
  },
  info (message, options) {
    this._toastr('info', 'Information', message, options)
  },
  loading (shown = true) {
    this._globalMask(shown)
  },
  _globalMask (shown) {
    document.getElementById('global-mask').style.display = shown ? 'block' : 'none'
  }
}
