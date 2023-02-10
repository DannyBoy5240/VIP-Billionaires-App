import moment from 'moment'
import I18n from '../i18n'

export const DATE_STRING_FORMAT = 'MM/DD/YYYY'
export const DATE_STRING_DISPLAY_FORMAT = I18n.t('Birthday_format')
export const TIME_STRING_FORMAT = 'hh:mm a'
export const DATE_TIME_STRING_FORMAT = 'MM/DD/YYYY HH:mm'

export const dateToString = (date, format) => {
  return moment(date.seconds * 1000).format(format)
}
export const dateStringFromNow = date => {
  let seconds = Math.floor((new Date() - new Date(date.seconds * 1000)) / 1000)

  let interval = seconds / 31536000

  if (interval > 1) {
    const value = Math.floor(interval)
    return (
      Math.floor(interval) +
      ' ' +
      (value > 1 ? I18n.t('years') : I18n.t('year')) +
      I18n.t('ago')
    )
  }
  interval = seconds / 2592000
  if (interval > 1) {
    const value = Math.floor(interval)
    return (
      Math.floor(interval) +
      ' ' +
      (value > 1 ? I18n.t('months') : I18n.t('month')) +
      I18n.t('ago')
    )
  }
  interval = seconds / 86400
  if (interval > 1) {
    const value = Math.floor(interval)
    return (
      Math.floor(interval) +
      ' ' +
      (value > 1 ? I18n.t('days') : I18n.t('day')) +
      I18n.t('ago')
    )
  }
  interval = seconds / 3600
  if (interval > 1) {
    const value = Math.floor(interval)
    return (
      Math.floor(interval) +
      ' ' +
      (value > 1 ? I18n.t('hours') : I18n.t('hour')) +
      I18n.t('ago')
    )
  }
  interval = seconds / 60
  if (interval > 1) {
    const value = Math.floor(interval)
    return (
      Math.floor(interval) +
      ' ' +
      (value > 1 ? I18n.t('minutes') : I18n.t('minute')) +
      I18n.t('ago')
    )
  }
  return (
    Math.floor(seconds) +
    ' ' +
    (seconds > 1 ? I18n.t('seconds') : I18n.t('second')) +
    I18n.t('ago')
  )
}

export const dateStringFromNowShort = date => {
  let seconds = Math.floor((new Date() - new Date(date.seconds * 1000)) / 1000)

  let interval = seconds / 31536000

  if (interval > 1) {
    return Math.floor(interval) + ' years ago'
  }

  interval = seconds / 2592000
  if (interval > 1) {
    return Math.floor(interval) + ' months ago'
  }

  interval = seconds / 86400
  if (interval > 1) {
    return Math.floor(interval) + ' days ago'
  }

  interval = seconds / 3600
  if (interval > 1) {
    return Math.floor(interval) + ' hours ago'
  }

  interval = seconds / 60
  if (interval > 1) {
    return Math.floor(interval) + ' mins ago'
  }

  return 'just now'

  // return (
  //   Math.floor(seconds) +
  //   'just now'
  // )
}

export const date_str_format = function (datetime, format) {
  if (!datetime) return ''
  let date = new Date(String(datetime))
  let yy = date.getFullYear()
  let mm = date.getMonth() + 1
  let dd = date.getDate()
  let hh = date.getHours()
  let MM = date.getMinutes()
  let SS = date.getSeconds()
  let format_str = format
  if (/yy/.test(format)) {
    format_str = format_str.replace('yy', `${yy}`)
  }
  if (/y/.test(format)) {
    format_str = format_str.replace('y', `${yy}`)
  }
  if (/mm/.test(format)) {
    format_str = format_str.replace('mm', mm < 10 ? `0${mm}` : `${mm}`)
  }
  if (/m/.test(format)) {
    format_str = format_str.replace('m', `${mm}`)
  }
  if (/dd/.test(format)) {
    format_str = format_str.replace('dd', dd < 10 ? `0${dd}` : `${dd}`)
  }
  if (/d/.test(format)) {
    format_str = format_str.replace('d', `${dd}`)
  }
  if (/hh/.test(format)) {
    format_str = format_str.replace('hh', hh < 10 ? `0${hh}` : `${hh}`)
  }
  if (/h/.test(format)) {
    format_str = format_str.replace('h', `${hh}`)
  }
  if (/MM/.test(format)) {
    format_str = format_str.replace('MM', MM < 10 ? `0${MM}` : `${MM}`)
  }
  if (/M/.test(format)) {
    format_str = format_str.replace('M', `${MM}`)
  }
  if (/SS/.test(format)) {
    format_str = format_str.replace('SS', SS < 10 ? `0${SS}` : `${SS}`)
  }
  if (/S/.test(format)) {
    format_str = format_str.replace('S', `${SS}`)
  }
  console.log(format_str)
  return format_str
}
