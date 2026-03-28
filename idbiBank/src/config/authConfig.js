const defaultScopes = [
  'adminName',
  'user_name',
  'goauthentik.io/api',
  'authorities',
  'bankCode',
  'email',
  'profile',
  'openid',
  'offline_access',
  'created',
  'privileges',
]

export const authConfig = {
  issuer:
    import.meta.env.VITE_AUTH_ISSUER ??
    'https://idbi-auth-stage.isupay.in/application/o/idbi/',
  discoveryUrl:
    import.meta.env.VITE_AUTH_DISCOVERY_URL ??
    'https://idbi-auth-stage.isupay.in/application/o/idbi/.well-known/openid-configuration',
  clientId: import.meta.env.VITE_AUTH_CLIENT_ID ?? 'h0xLFWq1FS6uHKVwk',
  tokenUrl:
    import.meta.env.VITE_AUTH_TOKEN_URL ??
    'https://idbi-auth-stage.isupay.in/application/o/token/',
  redirectUrl:
    import.meta.env.VITE_AUTH_REDIRECT_URL ?? 'https://portal-idbi.isupay.in/redirected',
  grantType: import.meta.env.VITE_AUTH_GRANT_TYPE ?? 'authorization_code',
  authorizationCode:
    import.meta.env.VITE_AUTHORIZATION_CODE ?? 'ecebf8571ef5415b925804a6242a0e99',
  codeVerifier:
    import.meta.env.VITE_AUTH_CODE_VERIFIER ??
    '10b29de25e864910be0c547dfe2530f259ec09474cb94b97ad2c5e23586ab98e8398b3424977425b8b8eb838e217f3e9',
  useMockAuth: import.meta.env.VITE_USE_MOCK_AUTH === 'true',
  scopes: import.meta.env.VITE_AUTH_SCOPES?.split(',').map((value) => value.trim()).filter(Boolean) ??
    defaultScopes,
}

export const authStorageKeys = {
  local: 'idbi-auth-session',
  session: 'idbi-auth-session-temporary',
}
