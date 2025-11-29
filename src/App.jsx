import { useEffect, useMemo, useState } from "react";
import Sidebar from "./components/Sidebar.jsx";

const navItems = [
  { id: "dashboard", label: "Dashboard", tagline: "Today at a glance", icon: "DB" },
  { id: "subjects", label: "Subjects", tagline: "Deep dives & plans", icon: "SB" },
  { id: "analytics", label: "Analytics & Report", tagline: "Progress pulse", icon: "AR" },
  { id: "profile", label: "Profile", tagline: "Personal preferences", icon: "PR" },
];

const sectionCopy = {
  dashboard: {
    eyebrow: "Today",
    heading: "Momentum Dashboard",
    description: "A quick snapshot of how your study routine is trending right now.",
  },
  subjects: {
    eyebrow: "Focus areas",
    heading: "Subjects Workspace",
    description: "Organize topics, track mastery, and line up the next review block.",
  },
  analytics: {
    eyebrow: "Insights",
    heading: "Analytics & Report",
    description: "Compare effort vs. output and highlight where to intervene early.",
  },
  profile: {
    eyebrow: "You",
    heading: "Profile & Preferences",
    description: "Fine-tune Study Buddy so it mirrors your goals and study rituals.",
  },
};

const dashboardCards = [
  {
    title: "Focus Score",
    value: "87%",
    helper: "Up 5% vs last week",
  },
  {
    title: "Deep Work Sessions",
    value: "3 / 4",
    helper: "Keep one more to hit streak",
  },
  {
    title: "Study Streak",
    value: "9 days",
    helper: "New record in sight",
  },
  {
    title: "Upcoming Tasks",
    value: "6 items",
    helper: "2 due in the next 24h",
  },
];

const subjectsData = [
  { name: "Calculus II", mentor: "Dr. Nolan", progress: 72, nextFocus: "Integration techniques" },
  { name: "Organic Chemistry", mentor: "Lab Mentor", progress: 55, nextFocus: "Spectroscopy drills" },
  { name: "Modern History", mentor: "Prof. Mehta", progress: 80, nextFocus: "Cold War essay" },
  { name: "Product Design", mentor: "Studio Coach", progress: 41, nextFocus: "Prototype critique" },
];

const analyticsStats = [
  { label: "Avg. Session Length", value: "52 min", trendLabel: "+7 min" },
  { label: "Assignments Cleared", value: "14", trendLabel: "3 pending" },
  { label: "Energy Check-ins", value: "8/10", trendLabel: "Consistent" },
];

const profilePreferences = [
  { label: "Preferred block", value: "07:00 — 09:30" },
  { label: "Reminder cadence", value: "Every 45 min" },
  { label: "Break style", value: "Walk & hydrate" },
  { label: "Weekly target", value: "18 focused hours" },
];

const App = () => {
  const [activeSection, setActiveSection] = useState(navItems[0].id);
  const [sidebarOpen, setSidebarOpen] = useState(true);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const media = window.matchMedia("(min-width: 1024px)");
    const syncSidebar = () => setSidebarOpen(media.matches);
    syncSidebar();
    media.addEventListener("change", syncSidebar);
    return () => media.removeEventListener("change", syncSidebar);
  }, []);

  const copy = useMemo(() => sectionCopy[activeSection], [activeSection]);

  const handleNavSelect = (sectionId) => {
    setActiveSection(sectionId);
    if (typeof window !== "undefined") {
      const isDesktop = window.matchMedia("(min-width: 1024px)").matches;
      if (!isDesktop) setSidebarOpen(false);
    }
  };

  const renderDashboard = () => (
    <>
      <section className="panel">
        <div className="panel__header">
          <div>
            <p className="eyebrow">Momentum snapshot</p>
            <h2>Main indicators</h2>
          </div>
          <button className="ghost-btn" type="button">
            Export summary
          </button>
        </div>
        <div className="card-grid">
          {dashboardCards.map((card) => (
            <article key={card.title} className="stat-card">
              <p className="stat-card__label">{card.title}</p>
              <p className="stat-card__value">{card.value}</p>
              <p className="stat-card__helper">{card.helper}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="panel two-column">
        <div>
          <h3>Focus runway</h3>
          <p className="panel__description">
            Block at least one more deep-work sprint to lock in your streak.
          </p>
          <ul className="timeline">
            <li>
              <span>07:00</span>
              <div>
                Morning review
                <p>Light spaced repetition (completed)</p>
              </div>
            </li>
            <li>
              <span>11:30</span>
              <div>
                Calculus lab
                <p>Practice set 5 pending feedback</p>
              </div>
            </li>
            <li>
              <span>15:00</span>
              <div>
                Writing block
                <p>Draft history essay intro</p>
              </div>
            </li>
          </ul>
        </div>
        <div>
          <h3>Energy & mood</h3>
          <p className="panel__description">Keep hydration reminders on and stretch at 14:00.</p>
          <div className="energy-widget">
            <div className="energy-widget__score">
              <span>Current</span>
              <strong>8 / 10</strong>
            </div>
            <div className="energy-widget__bars">
              {[7, 8, 9, 6, 7].map((score, idx) => (
                <span key={idx} style={{ height: `${score * 8}px` }} />
              ))}
            </div>
            <div className="energy-widget__summary">
              <p>Most steady on Tue/Thu</p>
              <p>Plan lighter load on Friday</p>
            </div>
          </div>
        </div>
      </section>
    </>
  );

  const renderSubjects = () => (
    <section className="panel">
      <div className="panel__header">
        <div>
          <p className="eyebrow">Active tracks</p>
          <h2>Subjects & rituals</h2>
        </div>
        <button className="ghost-btn" type="button">
          Add subject
        </button>
      </div>
      <div className="subject-grid">
        {subjectsData.map((subject) => (
          <article key={subject.name} className="subject-card">
            <header>
              <h3>{subject.name}</h3>
              <p>Mentor: {subject.mentor}</p>
            </header>
            <div className="progress-track">
              <div style={{ width: `${subject.progress}%` }} />
            </div>
            <div className="subject-card__footer">
              <span>{subject.progress}% mastered</span>
              <button type="button">Go to board</button>
            </div>
            <p className="subject-card__next">
              Next up: <strong>{subject.nextFocus}</strong>
            </p>
          </article>
        ))}
      </div>
    </section>
  );

  const renderAnalytics = () => (
    <>
      <section className="panel">
        <div className="panel__header">
          <div>
            <p className="eyebrow">Signals</p>
            <h2>Analytics pulse</h2>
          </div>
          <button className="ghost-btn" type="button">
            Generate PDF
          </button>
        </div>
        <div className="card-grid">
          {analyticsStats.map((stat) => (
            <article key={stat.label} className="stat-card">
              <p className="stat-card__label">{stat.label}</p>
              <p className="stat-card__value">{stat.value}</p>
              <p className="stat-card__helper">{stat.trendLabel}</p>
            </article>
          ))}
        </div>
      </section>
      <section className="panel two-column">
        <div>
          <h3>Study intensity</h3>
          <p className="panel__description">
            Track where most of your focused minutes land each weekday.
          </p>
          <div className="heat-chart">
            {["Mon", "Tue", "Wed", "Thu", "Fri"].map((day, dayIndex) => (
              <div key={day} className="heat-chart__row">
                <span>{day}</span>
                {[60, 45, 50, 70, 30].map((block, blockIndex) => (
                  <i key={`${day}-${blockIndex}`} style={{ opacity: (dayIndex + blockIndex + 1) / 6 }} />
                ))}
              </div>
            ))}
          </div>
        </div>
        <div>
          <h3>Reports</h3>
          <p className="panel__description">Weekly export scheduled for Friday 17:00.</p>
          <ul className="report-list">
            <li>
              <div>
                <p>Advisor handoff</p>
                <small>Sent 2 days ago</small>
              </div>
              <button type="button">View</button>
            </li>
            <li>
              <div>
                <p>Parent summary</p>
                <small>Draft ready</small>
              </div>
              <button type="button">Share</button>
            </li>
            <li>
              <div>
                <p>Personal retro</p>
                <small>Schedule before Sunday</small>
              </div>
              <button type="button">Plan</button>
            </li>
          </ul>
        </div>
      </section>
    </>
  );

  const renderProfile = () => (
    <section className="panel">
      <div className="panel__header">
        <div>
          <p className="eyebrow">Your blueprint</p>
          <h2>Profile preferences</h2>
        </div>
        <button className="ghost-btn" type="button">
          Edit profile
        </button>
      </div>
      <div className="profile-card">
        <div className="profile-card__hero">
          <div className="avatar">SJ</div>
          <div>
            <h3>Sidhant Joshi</h3>
            <p>Senior year · Science & Design track</p>
          </div>
          <span className="chip chip--pulse">Streak: 9 days</span>
        </div>
        <div className="profile-card__grid">
          {profilePreferences.map((pref) => (
            <article key={pref.label}>
              <p className="stat-card__label">{pref.label}</p>
              <p className="stat-card__value">{pref.value}</p>
            </article>
          ))}
        </div>
        <div className="profile-card__footer">
          <div>
            <p className="stat-card__label">Accountability partners</p>
            <p className="stat-card__helper">Evelyn (mentor) · Noel (study buddy)</p>
          </div>
          <button type="button">Manage</button>
        </div>
      </div>
    </section>
  );

  const renderActiveSection = () => {
    if (activeSection === "dashboard") return renderDashboard();
    if (activeSection === "subjects") return renderSubjects();
    if (activeSection === "analytics") return renderAnalytics();
    return renderProfile();
  };

  return (
    <div className="app-layout">
      <Sidebar
        items={navItems}
        activeSection={activeSection}
        open={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
        onSelect={handleNavSelect}
      />
      <main className="content-region">
        <header className="top-bar">
          <button
            type="button"
            className="hamburger"
            aria-label="Toggle navigation"
            aria-expanded={sidebarOpen}
            onClick={() => setSidebarOpen((prev) => !prev)}
          >
            <span />
            <span />
            <span />
          </button>
          <div className="top-bar__titles">
            <p className="eyebrow">{copy.eyebrow}</p>
            <h1>{copy.heading}</h1>
            <p className="panel__description">{copy.description}</p>
          </div>
          <div className="user-pill">
            <div className="avatar avatar--mini">SJ</div>
            <div>
              <p>Sidhant</p>
              <small>Focus mode · On</small>
            </div>
          </div>
        </header>
        <div className="section-wrapper">{renderActiveSection()}</div>
      </main>
    </div>
  );
};

export default App;

