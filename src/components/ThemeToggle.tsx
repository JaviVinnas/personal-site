
import { useEffect, useState } from 'preact/hooks';

export default function ThemeToggle() {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    // Sync with initial state
    const isDarkState = document.documentElement.classList.contains('dark');
    setIsDark(isDarkState);
    
    // Also check local storage/system pref in case it wasn't set on server/static html
    const theme = localStorage.getItem('theme');
    const systemDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    if (theme === 'dark' || (!theme && systemDark)) {
      if (!isDarkState) {
        document.documentElement.classList.add('dark');
        setIsDark(true);
      }
    } else {
      if (isDarkState) {
        document.documentElement.classList.remove('dark');
        setIsDark(false);
      }
    }
  }, []);

  const toggleTheme = async (event: MouseEvent) => {
    const newIsDark = !isDark;
    
    // Check if browser supports View Transitions API
    if (!document.startViewTransition) {
      // Fallback for browsers without View Transitions
      setIsDark(newIsDark);
      if (newIsDark) {
        document.documentElement.classList.add('dark');
        localStorage.setItem('theme', 'dark');
      } else {
        document.documentElement.classList.remove('dark');
        localStorage.setItem('theme', 'light');
      }
      return;
    }

    // Get the click position from the button
    const button = event.currentTarget as HTMLElement;
    const rect = button.getBoundingClientRect();
    const x = rect.left + rect.width / 2;
    const y = rect.top + rect.height / 2;

    // Calculate the maximum distance to cover entire viewport
    const maxRadius = Math.hypot(
      Math.max(x, window.innerWidth - x),
      Math.max(y, window.innerHeight - y)
    );

    // Start the view transition with circular reveal
    const transition = document.startViewTransition(() => {
      setIsDark(newIsDark);
      if (newIsDark) {
        document.documentElement.classList.add('dark');
        localStorage.setItem('theme', 'dark');
      } else {
        document.documentElement.classList.remove('dark');
        localStorage.setItem('theme', 'light');
      }
    });

    // Apply circular wipe animation
    await transition.ready;
    
    document.documentElement.animate(
      {
        clipPath: [
          `circle(0px at ${x}px ${y}px)`,
          `circle(${maxRadius}px at ${x}px ${y}px)`
        ]
      },
      {
        duration: 600,
        easing: 'cubic-bezier(0.16, 1, 0.3, 1)', // ease-out-expo from design system
        pseudoElement: '::view-transition-new(root)'
      }
    );
  };

  return (
    <button
      className="theme-toggle btn-round-icon"
      id="theme-toggle"
      aria-label="Toggle dark mode"
      type="button"
      onClick={toggleTheme}
    >
      {/* Sun icon (shown in dark mode) */}
      <svg 
        className={`icon-sun absolute transition-all duration-300 ease-out-expo ${isDark ? 'opacity-100 rotate-0 scale-100' : 'opacity-0 -rotate-90 scale-0'}`}
        fill="none" 
        stroke="currentColor" 
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1.5"
          d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
        ></path>
      </svg>
      {/* Moon icon (shown in light mode) */}
      <svg 
        className={`icon-moon absolute transition-all duration-300 ease-out-expo ${!isDark ? 'opacity-100 rotate-0 scale-100' : 'opacity-0 rotate-90 scale-0'}`}
        fill="none" 
        stroke="currentColor" 
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1.5"
          d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
        ></path>
      </svg>
      
      <style>{`
        .theme-toggle {
            position: fixed;
            top: 1.5rem;
            right: 1.5rem;
            z-index: 50;
        }
        .theme-toggle svg {
            transition: all var(--duration-normal) var(--ease-out-expo);
        }
      `}</style>
    </button>
  );
}
