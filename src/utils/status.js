export function checkStatus(type, statu) {
  // <!-- 1.待付款, 2.已付款, 3.已发货, 4.交易成功,5.交易取消,6. 订单未提交 7退款成功  8已完成  9支付失败 -->
  // <!--1.待付款,2.待发货, 3.已发货,4.待收货，5.交易取消, 6申请退款 7.已退款  8.已完成  -->
  if (type == 1) {
    if (statu == 1) {
      return require('@/icons/img/icon_status_wait_pay.png')
    } else if (statu == 2) {
      return require('@/icons/img/icon_status_shipments.png')
    } else if (statu == 3) {
      return require('@/icons/img/icon_status_way.png')
    } else if (statu == 4) {
      return require('@/icons/img/icon_status_take.png')
    } else if (statu == 5) {
      return require('@/icons/img/icon_status_refund.png')
    } else if (statu == 6) {
      return require('@/icons/img/icon_status_refund.png')
    } else if (statu == 7) {
      return require('@/icons/img/icon_status_refund.png')
    } else if (statu == 8) {
      return require('@/icons/img/icon_status_finish.png')
    }
  }
  if (type == 2) {
    if (statu == 1) {
      return '等待付款'
    } else if (statu == 2) {
      return '待发货'
    } else if (statu == 3) {
      return '已发货'
    } else if (statu == 4) {
      return '待收货'
    } else if (statu == 5) {
      return '交易取消'
    } else if (statu == 6) {
      return '申请退款'
    } else if (statu == 7) {
      return '已退款'
    } else if (statu == 8) {
      return '已完成'
    }
  }
  if (type == 3) {
    if (statu == 1) {
      return 'yellow'
    } else if (statu == 2) {
      return 'yellow'
    } else if (statu == 3) {
      return 'green'
    } else {
      return 'gray'
    }
  }
}
export function checkImages(type, statu) {
  if (type == 1) {
    if (statu == 1) {
      return require('@/icons/img/icon_detail_await.png')
    } else if (statu == 2) {
      return require('@/icons/img/icon_detail_sendOut.png')
    } else if (statu == 3) {
      return require('@/icons/img/icon_detail_deliver_goods.png')
    } else if (statu == 4) {
      return require('@/icons/img/icon_detail_deliver_goods.png')
    } else if (statu == 5) {
      return require('@/icons/img/icon_detail_refund.png')
    } else if (statu == 6) {
      return require('@/icons/img/icon_detail_refund.png')
    } else if (statu == 7) {
      return require('@/icons/img/icon_detail_refund.png')
    } else if (statu == 8) {
      return require('@/icons/img/icon_detail_refund.png')
    }
  }
  // 1.待付款,2.待发货, 3.已发货,4.待收货，5.交易取消, 6申请退款 7.已退款  8.已完成
  if (type == 2) {
    if (statu == 1) {
      return '待付款'
    } else if (statu == 2) {
      return '待发货'
    } else if (statu == 3) {
      return '已发货'
    } else if (statu == 4) {
      return '待收货'
    } else if (statu == 5) {
      return '交易取消'
    } else if (statu == 6) {
      return '申请退款'
    } else if (statu == 7) {
      return '已退款'
    } else if (statu == 8) {
      return '已完成'
    }
  }
  if (type == 3) {
    if (statu == 1 || statu == 2 || statu == 4) {
      return 'yellow'
    } else if (statu == 3) {
      return 'green'
    }
  }
}
