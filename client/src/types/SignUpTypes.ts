export interface User {
  email: string;
  name: string;
}

export interface SignupResponse {
  status: string;
  token: string;
  data: {
    user: User;
  };
}
