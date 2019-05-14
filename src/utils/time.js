// 获取当前时间戳
// 距离时间... 传时间戳
// 传的是unix时间
export const wxtime = function (timestamps) {
  timestamps = timestamps * 1000
  let daySec, dayMin, dayHour, dayS
  let timeNow = new Date().getTime()
  let ts = (timeNow - timestamps) / 1000
  dayS = Math.round(ts / (24 * 60 * 60))
  dayHour = Math.round(ts / (60 * 60))
  dayMin = Math.round(ts / 60)
  daySec = Math.round(ts)
  if (dayS > 0 && dayS < 2) {
    return `${dayS}天前`
  } else if (dayS <= 0 && dayHour > 0) {
    return `${dayHour}小时前`
  } else if (dayHour <= 0 && dayMin > 0) {
    return `${dayMin}分钟前`
  } else if (dayMin <= 0 && daySec >= 0) {
    return '现在'
  } else {
    let timestamp = new Date()
    timestamp.setTime(timestamps)
    return [timestamp.getFullYear(), timestamp.getMonth() + 1, timestamp.getDate()].join('/')
  }
}
