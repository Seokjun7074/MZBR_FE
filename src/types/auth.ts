export interface LoginResponse {
  social_id: string;
  ownJwtAccessToken: string;
  ownJwtRefreshToken: string | null;
  user: boolean;
}

export interface SignedUserResponse extends LoginResponse {
  nickName: string;
}
