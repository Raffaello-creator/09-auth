export interface User {
  username: string;
  email: string;
  avatar: string;
}

export interface UserRequest {
  email?: string;
  password?: string;
  username?: string;
}

export interface CheckSessionResponse {
  message: string;
}
