export const apiConfig = {
  baseUrl: import.meta.env.VITE_API_BASE_URL ?? '',
  fetchUserDetailsEndpoint:
    import.meta.env.VITE_FETCH_USER_DETAILS_ENDPOINT ?? '/idbi/fetch/fetchById',
  userDetailsSerialNumber:
    import.meta.env.VITE_USER_DETAILS_SERIAL_NUMBER ?? '38241108350403',
  staticAuthorizationToken: import.meta.env.VITE_STATIC_AUTH_TOKEN ?? '',
  authorizationScheme: import.meta.env.VITE_STATIC_AUTH_SCHEME ?? 'Bearer',
  staticPassKey: import.meta.env.VITE_STATIC_PASS_KEY ?? '',
  passKeyHeader: import.meta.env.VITE_PASS_KEY_HEADER ?? 'x-pass-key',
}

export function getStaticAuthorizationHeader() {
  if (!apiConfig.staticAuthorizationToken) {
    return {}
  }

  const headerValue = apiConfig.authorizationScheme
    ? `${apiConfig.authorizationScheme} ${apiConfig.staticAuthorizationToken}`
    : apiConfig.staticAuthorizationToken

  return {
    Authorization: headerValue,
  }
}

export function getStaticPassKeyHeader() {
  if (!apiConfig.staticPassKey || !apiConfig.passKeyHeader) {
    return {}
  }

  return {
    [apiConfig.passKeyHeader]: apiConfig.staticPassKey,
  }
}
