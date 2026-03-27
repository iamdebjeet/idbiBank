import { useMemo, useState } from 'react'
import { Button } from '../../components/ui/Button'

const languageOptions = [
  'English',
  'Hindi',
  'Bengali',
  'Odia',
  'Marathi',
  'Telegu',
  'Tamil',
]

const initialValues = {
  vpaId: '',
  deviceSerialNumber: '',
  currentLanguage: '',
  languageUpdate: '',
}

export function LanguageUpdatePage() {
  const [formValues, setFormValues] = useState(initialValues)
  const [touched, setTouched] = useState({})
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false)

  const errors = useMemo(
    () => ({
      vpaId: formValues.vpaId.trim() ? '' : 'VPA ID is required.',
      deviceSerialNumber: formValues.deviceSerialNumber.trim()
        ? ''
        : 'Device serial number is required.',
      currentLanguage: formValues.currentLanguage ? '' : 'Current language is required.',
      languageUpdate: formValues.languageUpdate ? '' : 'Language update is required.',
    }),
    [formValues],
  )

  const isFormValid = Object.values(errors).every((value) => !value)

  const handleChange = (field) => (event) => {
    const value = event.target.value
    setFormValues((current) => ({ ...current, [field]: value }))
  }

  const handleBlur = (field) => () => {
    setTouched((current) => ({ ...current, [field]: true }))
  }

  const handleCancel = () => {
    setFormValues(initialValues)
    setTouched({})
  }

  const handleCloseModal = () => {
    handleCancel()
    setIsSuccessModalOpen(false)
  }

  const handleSubmit = (event) => {
    event.preventDefault()

    if (!isFormValid) {
      setTouched({
        vpaId: true,
        deviceSerialNumber: true,
        currentLanguage: true,
        languageUpdate: true,
      })
      return
    }

    console.log('Language update form values:', formValues)
    setIsSuccessModalOpen(true)
  }

  return (
    <section className="portal-section language-update-page">
      <h1 className="portal-section__title">Language Update</h1>

      <form className="language-update-card" onSubmit={handleSubmit}>
        <div className="language-update-grid">
          <label className="language-update-field">
            <span>VPA ID</span>
            <input
              type="text"
              value={formValues.vpaId}
              onChange={handleChange('vpaId')}
              onBlur={handleBlur('vpaId')}
              placeholder="Enter VPA ID"
            />
            {touched.vpaId && errors.vpaId ? (
              <small className="language-update-field__error">{errors.vpaId}</small>
            ) : null}
          </label>

          <label className="language-update-field">
            <span>Device Serial Number</span>
            <input
              type="text"
              value={formValues.deviceSerialNumber}
              onChange={handleChange('deviceSerialNumber')}
              onBlur={handleBlur('deviceSerialNumber')}
              placeholder="Enter device serial number"
            />
            {touched.deviceSerialNumber && errors.deviceSerialNumber ? (
              <small className="language-update-field__error">
                {errors.deviceSerialNumber}
              </small>
            ) : null}
          </label>

          <label className="language-update-field">
            <span>Current Language</span>
            <select
              value={formValues.currentLanguage}
              onChange={handleChange('currentLanguage')}
              onBlur={handleBlur('currentLanguage')}
            >
              <option value="">Select Current Language</option>
              {languageOptions.map((language) => (
                <option key={language} value={language}>
                  {language}
                </option>
              ))}
            </select>
            {touched.currentLanguage && errors.currentLanguage ? (
              <small className="language-update-field__error">{errors.currentLanguage}</small>
            ) : null}
          </label>

          <label className="language-update-field">
            <span>Language Update</span>
            <select
              value={formValues.languageUpdate}
              onChange={handleChange('languageUpdate')}
              onBlur={handleBlur('languageUpdate')}
            >
              <option value="">Select Language Update</option>
              {languageOptions.map((language) => (
                <option key={language} value={language}>
                  {language}
                </option>
              ))}
            </select>
            {touched.languageUpdate && errors.languageUpdate ? (
              <small className="language-update-field__error">{errors.languageUpdate}</small>
            ) : null}
          </label>
        </div>

        <div className="language-update-actions">
          <button
            className="ui-button ui-button--secondary"
            type="button"
            onClick={handleCancel}
          >
            Cancel
          </button>
          <Button type="submit" disabled={!isFormValid}>
            Update
          </Button>
        </div>
      </form>

      {isSuccessModalOpen ? (
        <div className="language-update-modal-overlay" role="presentation">
          <div
            className="language-update-modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="language-update-success-title"
          >
            <div className="language-update-modal__body">
              <h2 id="language-update-success-title" className="language-update-modal__title">
                Language update request
                <br />
                Initiated Successfully
              </h2>

              <div className="language-update-modal__icon" aria-hidden="true">
                <span className="language-update-modal__check">&#10003;</span>
              </div>
            </div>

            <div className="language-update-modal__footer">
              <Button
                className="language-update-modal__button"
                type="button"
                onClick={handleCloseModal}
              >
                Close
              </Button>
            </div>
          </div>
        </div>
      ) : null}
    </section>
  )
}
