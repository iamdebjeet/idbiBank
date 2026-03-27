import { useEffect, useRef, useState } from 'react'
import { Button } from '../ui/Button'

function LogoutIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
      <path d="M16 17l5-5-5-5" />
      <path d="M21 12H9" />
    </svg>
  )
}

function KeyIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <circle cx="8.5" cy="15.5" r="3.5" />
      <path d="M11 13l8-8" />
      <path d="M16 5h3v3" />
      <path d="M14 7l3 3" />
    </svg>
  )
}

function ChevronDownIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="m6 9 6 6 6-6" />
    </svg>
  )
}

function MenuIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M4 7h16M4 12h16M4 17h16" />
    </svg>
  )
}

export function PortalTopNav({ isSidebarCollapsed, onToggleSidebar, onLogout }) {
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false)
  const [isProfileDetailsOpen, setIsProfileDetailsOpen] = useState(false)
  const profileMenuRef = useRef(null)

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!profileMenuRef.current?.contains(event.target)) {
        setIsProfileMenuOpen(false)
      }
    }

    const handleEscape = (event) => {
      if (event.key === 'Escape') {
        setIsProfileMenuOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    document.addEventListener('keydown', handleEscape)

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
      document.removeEventListener('keydown', handleEscape)
    }
  }, [])

  const handleViewDetails = () => {
    setIsProfileMenuOpen(false)
    setIsProfileDetailsOpen(true)
  }

  const handleLogout = () => {
    setIsProfileMenuOpen(false)
    onLogout?.()
  }

  return (
    <header className="portal-topnav">
      <button
        className="portal-icon-button"
        type="button"
        aria-label={isSidebarCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
        onClick={onToggleSidebar}
      >
        <MenuIcon />
      </button>

      <div className="portal-topnav__actions">
        <div className="portal-profile-menu" ref={profileMenuRef}>
          <button
            className={`portal-profile${isProfileMenuOpen ? ' is-open' : ''}`}
            type="button"
            onClick={() => setIsProfileMenuOpen((current) => !current)}
            aria-haspopup="menu"
            aria-expanded={isProfileMenuOpen}
          >
            <div className="portal-profile__avatar" aria-hidden="true">
              I
            </div>
            <span>IDBI INTERNAL</span>
            <span className="portal-profile__chevron" aria-hidden="true">
              <ChevronDownIcon />
            </span>
          </button>

          <div
            className={`portal-profile-dropdown${isProfileMenuOpen ? ' is-open' : ''}`}
            role="menu"
            aria-label="Profile actions"
          >
            <button
              className="portal-profile-dropdown__item"
              type="button"
              role="menuitem"
              onClick={handleViewDetails}
            >
              <span>View Details</span>
              <KeyIcon />
            </button>

            <button
              className="portal-profile-dropdown__item portal-profile-dropdown__color"
              type="button"
              role="menuitem"
              onClick={handleLogout}
            >
              <span>Logout</span>
              <LogoutIcon />
            </button>
          </div>
        </div>
      </div>

      {isProfileDetailsOpen ? (
        <div className="profile-details-modal-overlay" role="presentation">
          <div
            className="profile-details-modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="profile-details-title"
          >
            <div className="profile-details-modal__header">
              <h2 id="profile-details-title">View Profile Details</h2>
            </div>

            <div className="profile-details-modal__body">
              <section className="profile-details-section">
                <h3>Basic Information</h3>

                <div className="profile-details-grid">
                  <span>Name</span>
                  <strong>Stebin Ben</strong>
                  <span>Phone</span>
                  <strong>+91 9388239231</strong>
                </div>
              </section>

              <section className="profile-details-section">
                <h3>Device Information</h3>

                <div className="profile-details-grid">
                  <span>Device Serial Number</span>
                  <strong>456894659876857</strong>
                  <span>Linked Account Number</span>
                  <strong>XXXXXX6857</strong>
                  <span>UPI ID</span>
                  <strong>rudranhi.panigrahi@cbin</strong>
                  <span>IFSC Code</span>
                  <strong>CBI0283896</strong>
                  <span>Device Model Name</span>
                  <strong>MoreFun ET389</strong>
                  <span>Device Mobile Number</span>
                  <strong>+91 8988239231</strong>
                  <span>Network Type</span>
                  <strong>BSNL</strong>
                  <span>Device Status</span>
                  <strong>Active</strong>
                  <span>Battery Percentage</span>
                  <strong>60%</strong>
                  <span>Network Strength</span>
                  <strong>Strong</strong>
                </div>
              </section>
            </div>

            <div className="profile-details-modal__footer">
              <Button
                className="profile-details-modal__button"
                type="button"
                onClick={() => setIsProfileDetailsOpen(false)}
              >
                Close
              </Button>
            </div>
          </div>
        </div>
      ) : null}
    </header>
  )
}
