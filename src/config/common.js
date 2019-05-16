const develop = 3
// export const UPLOAD_PATH = 'https://v2test.mputao.com'
export const UPLOAD_PATH = develop === 1 ? 'http://74cb3f3f.ittun.com' : (develop === 2 ? 'http://5e4dcd10.ittun.com' : (develop === 3 ? 'http://127.0.0.1:8000' : 'https://v2test.mputao.com'))

export const PHOTO_PATH = 'http://www.mputao.com'

export const LOGO_PATH = UPLOAD_PATH + '/static/logo/'

export const DEFAULT_PHOTO = UPLOAD_PATH + '/static/default.png'

export const DEFAULT_MAN = UPLOAD_PATH + '/static/default_man.jpg'

export const REQUEST_HOST = develop === 1 ? 'http://74cb3f3f.ittun.com' : (develop === 2 ? 'http://5e4dcd10.ittun.com' : (develop === 3 ? 'http://127.0.0.1:8000' : 'https://v2test.mputao.com'))
// export const REQUEST_HOST = 'http://127.0.0.1:8000'

// 行为反应,只针对小程序这么无品的行为分析
export const ACTION_RESPONSE = '/purchase/action/form'

// 权限
export const auth = {
  10: 'common',
  11: 'trader',
  12: 'supplier',
  13: 'putao'
}
