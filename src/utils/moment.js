export const compareNow = (date, last="前",day=false)=>{
    if(typeof date == 'number') {
      date = new Date(date*1000)
    }else {
      date = new Date(date)
    }
    let dt =  new Date() - date
    let dyear = dt/(1000 * 60 * 60 * 24 * 30 * 12);
    let dmonth = dt/(1000 * 60 * 60 * 24 * 30);
    let dday = dt/(1000 * 60 * 60 * 24);
    let dhour = dt/(1000 * 60 * 60);
    let dmin = dt/(1000 * 60);
    let dsecond = dt/(1000);
    if (dsecond < 0) {
        return ''
    }
    if (!day) {
        if (dsecond < 60) {
          return parseInt(dsecond) + '秒' + last
        }
        if (dmin < 60) {
          return parseInt(dmin) + '分钟' + last
        }
        if (dhour < 24) {
          return parseInt(dhour) + '小时' + last
        }
    }
    if (dday < 30) {
      return parseInt(dday+1) + '天' + last
    }
    if (dmonth < 30) {
      return parseInt(dmonth) + '个月' + last
    }
    // if (dyear < 365) {
      return parseInt(dyear) + '年' + last
    // }
  }

  export const format = (date,fmt='yyyy-MM-dd hh:mm:ss') => {
    if (!(date instanceof Date)) {
      date = new Date(date)
    }
    var o = {
        "M+": date.getMonth() + 1, //月份 
        "d+": date.getDate(), //日 
        "h+": date.getHours(), //小时 
        "m+": date.getMinutes(), //分 
        "s+": date.getSeconds(), //秒 
        "q+": Math.floor((date.getMonth() + 3) / 3), //季度 
        "S": date.getMilliseconds() //毫秒 
    };
    if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (date.getFullYear() + "").substr(4 - RegExp.$1.length));
    for (var k in o)
        if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
    return fmt; 
}

export const wxtime = (date) => {
  date = new Date(date)
  let now = new Date()
  // console.log(format(date,'yyyy-MM-dd'),format(now,'yyyy-MM-dd'))
  // console.log(format(date,'yyyy'),format(now,'yyyy'))
  // console.log(format(date,'MM-dd'))
  // 同一天
  if(format(date,'yyyy-MM-dd') == format(now,'yyyy-MM-dd')){
    return format(date, 'hh:mm')
  }
  //不同年
  else if(format(date,'yyyy') < format(now,'yyyy')){
    return format(date,'yyyy-MM-dd')
  }
  //同年的日期
  else{
    return format(date,'MM-dd')
  }
}