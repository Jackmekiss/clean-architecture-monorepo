import {
  createSerializableStateInvariantMiddleware,
  Middleware,
  SerializableStateInvariantMiddlewareOptions,
} from '@reduxjs/toolkit';

export function createCustomSerializableMiddleware(
  options?: SerializableStateInvariantMiddlewareOptions,
): Middleware {
  const customIsSerializable = (value: any) => {
    if (value instanceof Date) {
      return true;
    }
    return options?.isSerializable?.(value) || true;
  };

  const customOptions: SerializableStateInvariantMiddlewareOptions = {
    ...options,
    isSerializable: customIsSerializable,
  };

  return createSerializableStateInvariantMiddleware(customOptions);
}
