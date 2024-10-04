export type LoginResponse = {
  accessToken: string
  refreshToken: string
  id: number
  user_name: string
  value: string
}

export type ApiResponse<T> = {
  success: boolean
  error: string
  data: T
  refreshToken: string
}
export type LoginData = {
  user_name: string
  password: string
}