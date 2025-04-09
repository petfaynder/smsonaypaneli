export interface GrizzlyApiError {
  status: 'error';
  error: string;
}

export interface GrizzlyApiSuccess<T> {
  status: 'success';
  data: T;
}

export type GrizzlyApiResponse<T> = GrizzlyApiError | GrizzlyApiSuccess<T>;

export interface GrizzlyPhoneResponse {
  id: string;
  number: string;
}

export interface GrizzlyStatusResponse {
  status: string;
  code?: string;
}

export interface GrizzlyPriceResponse {
  [country: string]: {
    [service: string]: {
      cost: number;
      count: number;
    };
  };
} 