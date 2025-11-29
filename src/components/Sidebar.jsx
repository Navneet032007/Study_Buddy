const Sidebar = ({ items, activeSection, open, onClose, onSelect }) => (
  <>
    <aside className={`sidebar ${open ? "open" : ""}`} id="sidebar">
      <div className="sidebar__brand">
        <div className="sidebar__logo">SB</div>
        <div className="sidebar__meta">
          <p>Study Buddy</p>
          <small>Learning HQ</small>
        </div>
        <button className="sidebar__collapse" type="button" onClick={onClose}>
          Hide
        </button>
      </div>

      <nav className="sidebar__nav">
        {items.map((item) => (
          <button
            key={item.id}
            type="button"
            className={`nav-link ${activeSection === item.id ? "active" : ""}`}
            onClick={() => onSelect(item.id)}
          >
            <span className="nav-link__icon">{item.icon}</span>
            <span className="nav-link__text">
              {item.label}
              <small>{item.tagline}</small>
            </span>
          </button>
        ))}
      </nav>

      <div className="sidebar__footer">
        <p className="sidebar__footer-title">Need a reset?</p>
        <p className="sidebar__footer-text">
          Schedule a 5 minute stretch or reflection break to keep clarity high.
        </p>
        <button className="sidebar__footer-btn" type="button">
          Start Quick Break
        </button>
      </div>
    </aside>

    <button
      type="button"
      className={`sidebar__backdrop ${open ? "visible" : ""}`}
      aria-label="Close navigation"
      onClick={onClose}
    >
      <span className="sr-only">Close navigation</span>
    </button>
  </>
);

export default Sidebar;

