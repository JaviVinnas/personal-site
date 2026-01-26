
import { useEffect, useState, useRef } from 'preact/hooks';

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("");
  const toggleBtnRef = useRef<HTMLButtonElement>(null);
  const menuNavRef = useRef<HTMLElement>(null);

  const toggleMenu = () => setIsOpen(!isOpen);
  const closeMenu = () => setIsOpen(false);

  useEffect(() => {
    function handleOutsideClick(event: MouseEvent) {
      if (
        isOpen &&
        toggleBtnRef.current &&
        !toggleBtnRef.current.contains(event.target as Node) &&
        menuNavRef.current &&
        !menuNavRef.current.contains(event.target as Node)
      ) {
        closeMenu();
      }
    }

    document.addEventListener("click", handleOutsideClick);
    return () => document.removeEventListener("click", handleOutsideClick);
  }, [isOpen]);

  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: "-20% 0px -60% 0px", // Trigger when section is near top
      threshold: 0,
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.getAttribute("id") || "");
        }
      });
    }, observerOptions);

    document.querySelectorAll("section[id]").forEach((section) => {
      observer.observe(section);
    });

    return () => observer.disconnect();
  }, []);

  const links = [
    { href: "#hero", label: "01", text: ". /start", id: "hero" },
    { href: "#about", label: "02", text: ". /about", id: "about" },
    { href: "#experience", label: "03", text: ". /exp", id: "experience" },
    { href: "#skills", label: "04", text: ". /skills", id: "skills" },
    { href: "#projects", label: "05", text: ". /work", id: "projects" },
    { href: "#contact", label: "06", text: ". /contact", id: "contact" },
  ];

  return (
    <>
      <button
        id="nav-toggle"
        className="nav-toggle btn-round-icon"
        aria-label="Open menu"
        aria-expanded={isOpen}
        aria-controls="nav-menu"
        type="button"
        ref={toggleBtnRef}
        onClick={toggleMenu}
      >
        <svg
          className={`icon-menu absolute transition-all duration-300 ease-out-expo ${isOpen ? 'opacity-0 scale-0 rotate-90' : 'opacity-100 scale-100 rotate-0'}`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.5"
            d="M4 6h16M4 12h16M4 18h16"
          ></path>
        </svg>
        <svg
          className={`icon-close absolute transition-all duration-300 ease-out-expo ${isOpen ? 'opacity-100 scale-100 rotate-0' : 'opacity-0 scale-0 -rotate-90'}`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.5"
            d="M6 18L18 6M6 6l12 12"
          ></path>
        </svg>
      </button>

      <nav 
        id="nav-menu" 
        className={`nav-menu ${!isOpen ? 'hidden' : ''}`} 
        hidden={!isOpen} 
        ref={menuNavRef}
      >
        <ul className="nav-list">
          {links.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className={`nav-link ${activeSection === link.id ? "active" : ""}`}
                onClick={closeMenu}
              >
                <span>{link.label}</span> {link.text}
              </a>
            </li>
          ))}
        </ul>
      </nav>

      <style>{`
        .nav-toggle {
          position: fixed;
          top: 1.5rem;
          left: 1.5rem;
          anchor-name: --nav-toggle;
        }

        .nav-toggle svg {
            transition: all var(--duration-normal) var(--ease-out-expo);
        }

        /* Menu Popover */
        .nav-menu {
          position: fixed;
          z-index: 49;
          padding: 1rem;
          margin: 0;
          min-width: 200px;
          background-color: var(--color-bg-subtle);
          border: 1px solid var(--color-border);
          border-radius: 1rem;
          box-shadow: 0 10px 40px -10px rgba(0, 0, 0, 0.1);

          /* Fallback positioning */
          top: 1.5rem;
          left: 6rem;

          /* Anchor Positioning */
          position-anchor: --nav-toggle;
          top: anchor(top);
          left: anchor(right, 1.5rem);

          /* Animation */
          opacity: 0;
          transform: translateX(-10px) scale(0.95);
          transition:
            opacity 200ms var(--ease-out-expo),
            transform 200ms var(--ease-out-expo),
            display 200ms allow-discrete,
            overlay 200ms allow-discrete;
          margin-left: 1rem;
        }

        .nav-menu:not([hidden]) {
          opacity: 1;
          transform: translateX(0) scale(1);
          
          @starting-style {
            opacity: 0;
            transform: translateX(-10px) scale(0.95);
          }
        }

        .nav-list {
          list-style: none;
          padding: 0;
          margin: 0;
          display: flex;
          flex-direction: column;
          gap: 0.25rem;
          position: relative;
        }

        .nav-link {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          padding: 0.5rem 0.75rem;
          font-family: var(--font-mono);
          font-size: var(--text-sm);
          color: var(--color-text-muted);
          text-decoration: none;
          border-radius: 0.5rem;
          transition: all var(--duration-fast);
        }

        .nav-link span {
          color: var(--color-text-muted);
          opacity: 0.5;
          font-size: 0.75em;
        }

        .nav-link:hover {
          color: var(--color-text);
          background-color: var(--color-bg-muted);
        }

        /* Active State */
        .nav-link.active {
          color: var(--color-accent);
          background-color: color-mix(in srgb, var(--color-accent) 8%, transparent);
          font-weight: 500;
        }

        .nav-link.active span {
          color: var(--color-accent);
          opacity: 0.7;
        }

        .nav-link.active:hover {
          background-color: color-mix(in srgb, var(--color-accent) 12%, transparent);
        }
      `}</style>
    </>
  );
}
