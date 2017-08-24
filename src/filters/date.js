import moment from 'moment'

const date = (value) => {
  return value == null || value === undefined ? '' : moment(value).format('YYYY-MM-DD')
}

export default date
