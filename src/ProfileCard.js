import { useRef, useCallback } from "react";
import "./ProfileCard.css";

/**
 * ProfileCard — holographic tilt card with animated gradient sheen.
 * CSS custom properties (--pointer-x, --pointer-y, --rotate-x, --rotate-y,
 * --card-opacity) drive the holographic and 3-D tilt effects.
 *
 * Props:
 *   avatarUrl      — main avatar image URL
 *   miniAvatarUrl  — small avatar shown in status badge
 *   name           — display name
 *   title          — subtitle / role
 *   handle         — username (shown as @handle)
 *   status         — "Online" | "Away" | "Offline"
 *   contactText    — label for the contact button
 *   showUserInfo   — whether to render the info section
 *   onContactClick — callback when contact button is pressed
 *   enableTilt     — enable 3-D mouse-tilt (default true)
 */
function ProfileCard({
  avatarUrl = "",
  miniAvatarUrl = "",
  name = "Your Name",
  title = "Developer",
  handle = "username",
  status = "Online",
  contactText = "Contact",
  showUserInfo = true,
  onContactClick,
  enableTilt = true,
}) {
  const cardRef = useRef(null);

  const handleMouseMove = useCallback(
    (e) => {
      if (!enableTilt || !cardRef.current) return;
      const rect = cardRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const cx = rect.width / 2;
      const cy = rect.height / 2;
      const rotateX = ((y - cy) / cy) * -12;
      const rotateY = ((x - cx) / cx) * 12;
      cardRef.current.style.setProperty("--rotate-x", `${rotateX}deg`);
      cardRef.current.style.setProperty("--rotate-y", `${rotateY}deg`);
      cardRef.current.style.setProperty("--pointer-x", `${(x / rect.width) * 100}%`);
      cardRef.current.style.setProperty("--pointer-y", `${(y / rect.height) * 100}%`);
      cardRef.current.style.setProperty("--card-opacity", "1");
    },
    [enableTilt]
  );

  const handleMouseLeave = useCallback(() => {
    if (!cardRef.current) return;
    cardRef.current.style.setProperty("--rotate-x", "0deg");
    cardRef.current.style.setProperty("--rotate-y", "0deg");
    cardRef.current.style.setProperty("--card-opacity", "0");
  }, []);

  const statusClass = status.toLowerCase().replace(/\s+/g, "-");

  return (
    <div
      ref={cardRef}
      className="profile-card"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {/* Holographic sheen layer */}
      <div className="profile-card__shine" aria-hidden="true" />
      {/* Subtle border glow */}
      <div className="profile-card__glow" aria-hidden="true" />

      {/* Avatar */}
      <div className="profile-card__avatar-wrapper">
        {avatarUrl ? (
          <img
            src={avatarUrl}
            alt={name}
            className="profile-card__avatar"
            onError={(e) => {
              e.currentTarget.style.display = "none";
            }}
          />
        ) : (
          <div className="profile-card__avatar-placeholder" aria-hidden="true" />
        )}
      </div>

      {/* User info */}
      {showUserInfo && (
        <div className="profile-card__info">
          <h2 className="profile-card__name">{name}</h2>
          <p className="profile-card__title">{title}</p>

          <div className="profile-card__meta">
            <span className="profile-card__handle">@{handle}</span>
            <span className={`profile-card__status profile-card__status--${statusClass}`}>
              <span className="profile-card__status-dot" />
              {status}
            </span>
          </div>

          {onContactClick && (
            <button
              className="profile-card__contact-btn cursor-target"
              onClick={onContactClick}
              type="button"
            >
              {contactText}
            </button>
          )}
        </div>
      )}
    </div>
  );
}

export default ProfileCard;
