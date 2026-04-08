export class ApiError extends Error {
  public status: number;
  public data: any;

  constructor(message: string, status: number, data?: any) {
    super(message);
    this.name = 'ApiError';
    this.status = status;
    this.data = data;
  }

  static fromAxiosError(error: any): ApiError {
    const status = error.response?.status || 500;
    const data = error.response?.data;
    const message = data?.detail || data?.message || error.message || 'An error occurred';
    return new ApiError(message, status, data);
  }

  isUnauthorized(): boolean {
    return this.status === 401;
  }

  isNotFound(): boolean {
    return this.status === 404;
  }

  isBadRequest(): boolean {
    return this.status === 400;
  }
}