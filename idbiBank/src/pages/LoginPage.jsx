import { useMemo, useState } from 'react'
import { Button } from '../components/ui/Button'
import { authConfig } from '../config/authConfig'
import { Checkbox } from '../components/ui/Checkbox'
import { PasswordInput } from '../components/ui/PasswordInput'
import { Snackbar } from '../components/ui/Snackbar'
import { TextInput } from '../components/ui/TextInput'

const IDBI_LOGO_URL = 'https://www.idbi.bank.in/assets/images/IDBI_Logo.jpg'

export function LoginPage({ onLogin }) {
  const [showPassword, setShowPassword] = useState(false)
  const [snackbarState, setSnackbarState] = useState({
    open: false,
    message: '',
    autoClose: false,
    colorType: 'danger',
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formValues, setFormValues] = useState({
    username: '',
    password: '',
    rememberDevice: false,
  })
  const [touched, setTouched] = useState({})
  const isAuthorizationCodeFlow = authConfig.grantType === 'authorization_code'

  const errors = useMemo(
    () => ({
      username:
        isAuthorizationCodeFlow || formValues.username.trim() ? '' : 'Username is required.',
      password:
        isAuthorizationCodeFlow || formValues.password.trim() ? '' : 'Password is required.',
    }),
    [formValues.password, formValues.username, isAuthorizationCodeFlow],
  )

  const isFormValid = Object.values(errors).every((value) => !value)

  const handleChange = (field) => (event) => {
    const value =
      event.target.type === 'checkbox' ? event.target.checked : event.target.value

    setFormValues((current) => ({ ...current, [field]: value }))
  }

  const handleBlur = (field) => () => {
    setTouched((current) => ({ ...current, [field]: true }))
  }

  const handleSubmit = (event) => {
    event.preventDefault()

    if (!isFormValid) {
      setTouched({ username: true, password: true })
      return
    }

    setSnackbarState((current) => ({
      ...current,
      open: false,
      message: '',
    }))
    setIsSubmitting(true)

    Promise.resolve(onLogin?.(formValues))
      .catch((error) => {
        setSnackbarState({
          open: true,
          message: error?.message ?? 'Unable to login. Please try again.',
          autoClose: false,
          colorType: 'danger',
        })
      })
      .finally(() => {
        setIsSubmitting(false)
      })
  }

  return (
    <main className="login-page">
      <Snackbar
        open={snackbarState.open}
        message={snackbarState.message}
        autoClose={snackbarState.autoClose}
        colorType={snackbarState.colorType}
        onClose={() =>
          setSnackbarState((current) => ({
            ...current,
            open: false,
          }))
        }
      />

      <div className="login-page__glow" aria-hidden="true" />

      <section className="login-card" aria-label="Login form">
        <div className="login-card__body">
          <img className="login-card__logo" src={IDBI_LOGO_URL} alt="IDBI Bank" />

          <h1 className="login-card__title">Login to your Account</h1>

          {isAuthorizationCodeFlow ? (
            <p className="login-form__hint">
              Login will exchange the configured authorization code for an access token.
            </p>
          ) : null}

          <form className="login-form" onSubmit={handleSubmit} noValidate>
            <div className="ui-field">
              <TextInput
                id="username"
                label="Username"
                required
                placeholder="Username"
                value={formValues.username}
                onChange={handleChange('username')}
                onBlur={handleBlur('username')}
                className={touched.username && errors.username ? 'ui-input--error' : ''}
              />
              {touched.username && errors.username ? (
                <small className="ui-field__error">{errors.username}</small>
              ) : null}
            </div>

            <div className="ui-field">
              <PasswordInput
                id="password"
                label="Password"
                required
                placeholder="Please enter your password"
                value={formValues.password}
                onChange={handleChange('password')}
                onBlur={handleBlur('password')}
                visible={showPassword}
                onToggleVisibility={() => setShowPassword((current) => !current)}
                className={touched.password && errors.password ? 'ui-input--error' : ''}
              />
              {touched.password && errors.password ? (
                <small className="ui-field__error">{errors.password}</small>
              ) : null}
            </div>

            <Button type="submit" disabled={!isFormValid || isSubmitting}>
              {isSubmitting ? 'Logging in...' : 'Log in'}
            </Button>

            <div className="login-form__meta">
              <Checkbox
                id="remember-device"
                checked={formValues.rememberDevice}
                onChange={handleChange('rememberDevice')}
                label="Remember me on this device"
              />

              <a href="/" onClick={(event) => event.preventDefault()}>
                Forgot username or password?
              </a>
            </div>
          </form>
        </div>
      </section>

      <footer className="page-footer">
        <a href="/" onClick={(event) => event.preventDefault()}>
          Terms and Conditions
        </a>
        <a href="/" onClick={(event) => event.preventDefault()}>
          Privacy Policy
        </a>
        <a href="/" onClick={(event) => event.preventDefault()}>
          CA Privacy Notice
        </a>
      </footer>
    </main>
  )
}
