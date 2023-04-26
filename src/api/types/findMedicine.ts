enum SeekDrugApplyState {
  // 派单中
  Dispatching = 1,
  // 定金待支付
  DepositToBePaid = 2,
  // 寻药中
  SearchingForMedicine = 3,
  // 尾款待支付
  FinalPaymentToBeMade = 4,
  // 寻药完成
  MedicineSearchCompleted = 5,
  // 关闭
  close = 6,
}

export interface SeekDrugParams {
  current: number;
  size: string;
  mySeekDrugApply: {
    state: SeekDrugApplyState;
    buyerId: number;
  };
}
