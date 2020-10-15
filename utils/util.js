const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  return [year, month, day].map(formatNumber).join('-') + ' ' + [hour, minute].map(formatNumber).join(':')
}

const formatDate = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  //return [year, month, day].map(formatNumber).join('/')
  return month + '月' + day + '日'
}

const formatSDate = dateString => {
  const year = (new Date()).getFullYear();
  const month = dateString.indexOf('月');
  const day = dateString.indexOf('日');
  return [year, dateString.slice(0, month), dateString.slice(month + 1, day)].map(formatNumber).join('-')
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}

module.exports = {
  formatTime: formatTime,
  formatDate: formatDate,
  formatSDate: formatSDate
}
