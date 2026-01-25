<script lang="ts">
  import { onMount } from 'svelte';

  const durationNormal = '300ms';
  const easeOutExpo = 'cubic-bezier(0.16, 1, 0.3, 1)';

  onMount(() => {
    // Sync with initial state
    const isDark = document.documentElement.classList.contains('dark');
    if (localStorage.theme === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
        if (!isDark) document.documentElement.classList.add('dark');
    } else {
        if (isDark) document.documentElement.classList.remove('dark');
    }
  });

  function toggleTheme() {
    const isDark = document.documentElement.classList.toggle('dark');
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
  }
</script>

<button
  class="theme-toggle btn-round-icon"
  id="theme-toggle"
  aria-label="Toggle dark mode"
  type="button"
  onclick={toggleTheme}
>
  <!-- Sun icon (shown in dark mode) -->
  <svg class="icon-sun" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path
      stroke-linecap="round"
      stroke-linejoin="round"
      stroke-width="1.5"
      d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
    ></path>
  </svg>
  <!-- Moon icon (shown in light mode) -->
  <svg class="icon-moon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path
      stroke-linecap="round"
      stroke-linejoin="round"
      stroke-width="1.5"
      d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
    ></path>
  </svg>
</button>

<style>
  .theme-toggle {
    position: fixed;
    top: 1.5rem;
    right: 1.5rem;
    z-index: 50;
  }

  /* Note: .btn-round-icon is global in global.css, but we can't easily rely on global classes in Svelte scoped styles for everything unless we use :global() or duplicate styles. 
     Since the user wants to keep styles immutable, and .btn-round-icon is define in global.css, we should rely on it being present globally.
     However, Svelte's style scoping might fight us if we don't treat this right.
     Using unmodified classes is fine.
  */

  .theme-toggle svg {
    position: absolute;
    transition: all var(--duration-normal) var(--ease-out-expo);
  }

  /* Dark Mode: Show Sun, Hide Moon */
  :global(html.dark) .icon-sun {
    opacity: 1;
    transform: rotate(0) scale(1);
  }
  :global(html.dark) .icon-moon {
    opacity: 0;
    transform: rotate(90deg) scale(0);
  }

  /* Light Mode: Show Moon, Hide Sun */
  :global(html:not(.dark)) .icon-sun {
    opacity: 0;
    transform: rotate(-90deg) scale(0);
  }
  :global(html:not(.dark)) .icon-moon {
    opacity: 1;
    transform: rotate(0) scale(1);
  }
</style>
