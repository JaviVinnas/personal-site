<script lang="ts">
  import { onMount } from "svelte";

  let isOpen = false;
  let activeSection = "";
  let toggleBtn: HTMLButtonElement;
  let menuNav: HTMLElement;

  function toggleMenu() {
    isOpen = !isOpen;
  }

  function closeMenu() {
    isOpen = false;
  }

  function handleOutsideClick(event: MouseEvent) {
    if (
      isOpen &&
      toggleBtn &&
      !toggleBtn.contains(event.target as Node) &&
      menuNav &&
      !menuNav.contains(event.target as Node)
    ) {
      closeMenu();
    }
  }

  onMount(() => {
    // Intersection Observer for Active State
    const observerOptions = {
      root: null,
      rootMargin: "-20% 0px -60% 0px", // Trigger when section is near top
      threshold: 0,
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          activeSection = entry.target.getAttribute("id") || "";
        }
      });
    }, observerOptions);

    document.querySelectorAll("section[id]").forEach((section) => {
      observer.observe(section);
    });

    // Close on click outside listener
    document.addEventListener("click", handleOutsideClick);

    return () => {
      observer.disconnect();
      document.removeEventListener("click", handleOutsideClick);
    };
  });
</script>

<button
  id="nav-toggle"
  class="nav-toggle btn-round-icon"
  aria-label="Open menu"
  aria-expanded={isOpen}
  aria-controls="nav-menu"
  type="button"
  bind:this={toggleBtn}
  onclick={toggleMenu}
>
  <svg
    class="icon-menu"
    class:opacity-0={isOpen}
    class:scale-0={isOpen}
    class:rotate-90={isOpen}
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
  >
    <path
      stroke-linecap="round"
      stroke-linejoin="round"
      stroke-width="1.5"
      d="M4 6h16M4 12h16M4 18h16"
    ></path>
  </svg>
  <svg
    class="icon-close"
    class:opacity-100={isOpen}
    class:scale-100={isOpen}
    class:rotate-0={isOpen}
    class:opacity-0={!isOpen}
    class:scale-0={!isOpen}
    class:-rotate-90={!isOpen}
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
  >
    <path
      stroke-linecap="round"
      stroke-linejoin="round"
      stroke-width="1.5"
      d="M6 18L18 6M6 6l12 12"
    ></path>
  </svg>
</button>

<nav id="nav-menu" class="nav-menu" hidden={!isOpen} bind:this={menuNav}>
  <ul class="nav-list">
    <!-- Links -->
    <li>
      <a
        href="#hero"
        class="nav-link"
        class:active={activeSection === "hero"}
        onclick={closeMenu}><span>01</span> . /start</a
      >
    </li>
    <li>
      <a
        href="#about"
        class="nav-link"
        class:active={activeSection === "about"}
        onclick={closeMenu}><span>02</span> . /about</a
      >
    </li>
    <li>
      <a
        href="#experience"
        class="nav-link"
        class:active={activeSection === "experience"}
        onclick={closeMenu}><span>03</span> . /exp</a
      >
    </li>
    <li>
      <a
        href="#skills"
        class="nav-link"
        class:active={activeSection === "skills"}
        onclick={closeMenu}><span>04</span> . /skills</a
      >
    </li>
    <li>
      <a
        href="#projects"
        class="nav-link"
        class:active={activeSection === "projects"}
        onclick={closeMenu}><span>05</span> . /work</a
      >
    </li>
    <li>
      <a
        href="#contact"
        class="nav-link"
        class:active={activeSection === "contact"}
        onclick={closeMenu}><span>06</span> . /contact</a
      >
    </li>
  </ul>
</nav>

<style>
  /* Button Styles (Matched to Theme Toggle) */
  .nav-toggle {
    position: fixed;
    top: 1.5rem;
    left: 1.5rem;
    anchor-name: --nav-toggle;
    /* .btn-round-icon is global */
  }

  .nav-toggle svg {
    position: absolute;
    transition: all var(--duration-normal) var(--ease-out-expo);
  }

  /* Utility classes mainly for the icons state management in Svelte since we are checking specific class toggles */
  .opacity-0 { opacity: 0; }
  .opacity-100 { opacity: 1; }
  .scale-0 { transform: scale(0); }
  .scale-100 { transform: scale(1); }
  .rotate-90 { transform: rotate(90deg); }
  .rotate-0 { transform: rotate(0deg); }
  .-rotate-90 { transform: rotate(-90deg); }


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
    /* pointer-events: none; handled by hidden attribute/display:none roughly, relying on :not([hidden]) */
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
</style>
