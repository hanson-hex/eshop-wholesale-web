import request from '@/utils/request'
// 分页查询商户
export function merchantInfo(data) {
  return request({
    url: `/shop/merchantInfo/page`,
    method: 'get',
    params: data
  })
}

// 分页查询分账规则
export function ledgerRules(data) {
  return request({
    url: `/product/ledgerRules/page`,
    method: 'get',
    params: data
  })
}

// 启停分账规则
export function changeLedgerRuleStatus(id, status) {
  return request({
    url: `/product/ledgerRules/changeLedgerRuleStatus/${id}/${status}`,
    method: 'put'
  })
}
// 分账规则关联商品SKU信息查询
export function skuinfo(data) {
  return request({
    url: `/product/stock/info`,
    method: 'get',
    params: data
  })
}

// 分账规则关联商品SKU信息查询
export function updateskuinfo(data) {
  return request({
    url: `/product/stock/ledger/update`,
    method: 'put',
    data
  })
}

// 分账规则保存
export function ledgerRulessave(data) {
  return request({
    url: `/product/ledgerRules/save`,
    method: 'post',
    data
  })
}

// 分账类型枚举列表
export function geCostType() {
  return request({
    url: `/product/ledgerRules/geCostType`,
    method: 'get'
  })
}

// 获取分账规则详细
export function getLedgerRulesItems(id) {
  return request({
    url: `/product/ledgerRules/getLedgerRulesItems/${id}`,
    method: 'get'
  })
}

// 分账规则更新
export function ledgerRulesupdate(data) {
  return request({
    url: `/product/ledgerRules/update`,
    method: 'post',
    data
  })
}
