import moment from 'moment'
import { isNil } from 'lodash'

export const FORMAT_DATE = 'DD/MM/YYYY'

export const FORMAT_DATE_TIME = 'HH:mm DD/MM/YYYY'

const formatDate = (date) => {
  if (isNil(date)) {
    return ''
  }
  if (!moment(date).isValid()) {
    return ''
  }
  return moment(date).format(FORMAT_DATE)
}

export const formatTime = (date) => {
  if (isNil(date)) {
    return ''
  }
  return moment(date).format(FORMAT_DATE_TIME)
}

export default formatDate