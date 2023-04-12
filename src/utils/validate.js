/**
 */

/**
 * @param {string} path
 * @returns {Boolean}
 */
export function isExternal(path) {
  return /^(https?:|mailto:|tel:)/.test(path)
}

/**
 * @param {string} str
 * @returns {Boolean}
 */
export function validUsername(str) {
  const valid_map = ['admin', 'editor']
  return valid_map.indexOf(str.trim()) >= 0
}

export const moneyFix = (rule, value, callback) => {
  const reg = /(^[1-9]\d*(\.\d{1,2})?$)|(^0(\.\d{1,2})?$)/
  // const reg1 = /0[1-9]$|^[1-9][0-9]?$|^00?\.(?:0[1-9]|[1-9][0-9]?)$|^(?:0[1-9]|[1-9][0-9]?)\.[0-9]/
  if (!value) {
    return callback(
      new Error(
        '请输入'
      )
    )
  } else {
    if (reg.test(value)) {
      if (isNaN(Number(value))) {
        return callback(
          new Error(
            '请输入正确字符'
          )
        )
      }
      callback()
    } else {
      return callback(
        new Error(
          '价格输入不正确，请只保留两位小数或检查是否有特殊字符'
        )
      )
    }
  }
}

// 数字
export const checkNumber = (rule, value, callback) => {
  if (!value) {
    callback()
  } else {
    const reg = /^[0-9]+$/g
    if (reg.test(value)) {
      callback()
    } else {
      return callback(new Error('只能包含整数'))
    }
  }
}

/* 获取字典库对应的值
*/
export function correspondingVal(name, object, val, dict) {
  let result = ''
  if (dict && dict[name]) {
    dict[name].forEach((element) => {
      if (element.code == String(object[val])) result = element.value
    })
  }
  return result
}

/**
 * 两个数相乘的结果
 */
export function accMul(arg1, arg2) {
  arg1 = arg1 || 0
  arg2 = arg2 || 0
  var m = 0
  var s1 = arg1.toString()
  var s2 = arg2.toString()
  try {
    m += s1.split('.')[1].length
  } catch (e) { }
  try {
    m += s2.split('.')[1].length
  } catch (e) { }
  return (Number(s1.replace('.', '')) * Number(s2.replace('.', ''))) /
    Math.pow(10, m)
}

/**
 * 三个数相加的结果
 */
export function accAdd(arg1, arg2, arg3) {
  var m = 0
  var s1 = arg1 && arg1.toString()
  var s2 = arg2 && arg2.toString()
  var s3 = arg3 && arg3.toString()
  try {
    m += s1.split('.')[1].length
  } catch (e) { }
  try {
    m += s2.split('.')[1].length
  } catch (e) { }
  try {
    m += s3.split('.')[1].length
  } catch (e) { }
  return (Number(s1) + Number(s2) + Number(s3))
}

/**
 * 转换字符为两个小数点
 */
export function returnFloat(value) {
  value = value || 0
  // eslint-disable-next-line no-redeclare
  var value = Math.round(parseFloat(value) * 100) / 100
  var xsd = value.toString().split('.')
  if (xsd.length == 1) {
    value = value.toString() + '.00'
    return value
  }
  if (xsd.length > 1) {
    if (xsd[1].length < 2) {
      value = value.toString() + '0'
    }
    return value
  }
}

/**
 * 判断是否为空
 */
export function validatenull(val) {
  if (typeof val === 'boolean') {
    return false
  }
  if (typeof val === 'number') {
    return false
  }
  if (val instanceof Array) {
    if (val.length == 0) return true
  } else if (val instanceof Object) {
    if (JSON.stringify(val) === '{}') return true
  } else {
    if (val == 'null' || val == null || val == 'undefined' || val == undefined || val == '') return true
    return false
  }
  return false
}

/**
 * 判断手机号码是否正确
 */
export function isvalidatemobile(phone) {
  let list = []
  let result = true
  let msg = ''
  var isPhone = /^0\d{2,3}-?\d{7,8}$/
  // 增加134 减少|1349[0-9]{7}，增加181,增加145，增加17[678]
  if (!validatenull(phone)) {
    // console.log()
    if (phone.length == 11) {
      if (isPhone.test(phone)) {
        msg = '手机号码格式不正确'
      } else {
        msg = '手机号码错误'
        result = false
      }
    } else {
      msg = '手机号码长度不为11位'
    }
  } else {
    msg = '手机号码不能为空'
  }
  list.push(result)
  list.push(msg)
  return list
}

/**
 * 判断税号
 */
export function checkTax(num) {
  if (/^[A-Z0-9]{15}$|^[A-Z0-9]{17}$|^[A-Z0-9]{18}$|^[A-Z0-9]{20}$/.test(num)) {
    return true
  } else {
    return false
  }
}

/**
 * URL地址
 * @param {*} s
 */
export function isURL(s) {
  return /^http[s]?:\/\/.*/.test(s)
}
