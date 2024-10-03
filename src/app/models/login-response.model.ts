export interface LoginResponse {
  data: string; // JWT token as a string
  message: string;
  statusCode: number;
  success: boolean;
}
