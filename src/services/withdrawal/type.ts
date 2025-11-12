export interface Root {
  status: boolean;
  message: string;
  data: Daum[];
}

export interface Daum {
  user_id: string;
  bank_pay: string;
  pay_date: string;
  status: string;
  remark: string;
  cr: string;
}

export interface withdrawal_req {
  req_bal: number;
  remarks: String;
}
