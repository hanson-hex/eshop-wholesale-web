export function drugenumeration(item) {
  switch (item) {
    case 'DRUG':
      item = '药品'
      break
    case 'MADI':
      item = '医疗器械'
      break
    case 'TCMDP':
      item = '中药饮片'
      break
    case 'FOOD':
      item = '食品'
      break
    case 'OTHER':
      item = '其他'
      break
    default: break
  }
  return item
}

export function auditTypes(item) {
  switch (item) {
    // AWAIT:待审核，ALREADY:已审核，FAIL:审核失败
    case 'AWAIT': // 0
      item = '待审核'
      break
    case 'FAIL': // 1
      item = '未通过'
      break
    case 'ALREADY': // 2
      item = '通过'
      break
    case '0': // 0
      item = '待审核'
      break
    case '1': // 1
      item = '未通过'
      break
    case '2': // 2
      item = '通过'
      break
    default: break
  }
  return item
}
