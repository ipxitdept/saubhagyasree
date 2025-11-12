export interface Root {
  status: boolean
  message: string
  data: Daum[]
}

export interface Daum {
  id: string
  user_id: string
  name: string
  amount: string
  req_img: string
  req_type?: string
  remarks: string
  add_date: string
  status: string
}
