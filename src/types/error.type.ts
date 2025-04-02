import {
  AUTH_ERROR_MESSAGE,
  isAuthErrorMessageType,
  isStorageErrorMessageType,
  STORAGE_ERROR_MESSAGE
} from '@/constants/supabase-error.constant';
import { AuthError } from '@supabase/supabase-js';
import * as Sentry from '@sentry/nextjs';

export type ErrorType = {
  message: string;
  action: string;
  status: number;
};
export type ErrorResponse<T> =
  | {
      data: T;
      error: null;
    }
  | {
      data: null;
      error: ErrorType;
    };

export type StorageError = {
  error: string;
  message: string;
  statusCode: string;
};
export const isStorageError = (error: unknown): error is StorageError => {
  return typeof error === 'object' && error !== null && 'error' in error && 'message' in error && 'statusCode' in error;
};

export const categoriesError = (error: Error): ErrorType => {
  Sentry.captureException(error);
  if (error instanceof AuthError)
    if (error.code && isAuthErrorMessageType(error.code)) {
      const authError = AUTH_ERROR_MESSAGE[error.code];
      return { ...authError, status: error.status || 500 };
    }
  if (isStorageError(error)) {
    if (isStorageErrorMessageType(error.statusCode)) {
      const storageError = STORAGE_ERROR_MESSAGE[error.statusCode];
      return { ...storageError, status: Number(error.statusCode) };
    }
  }
  return { action: '관리자에게 문의해주세요.', message: error.message, status: 500 };
};
