import { useCallback, useEffect, useRef, useState } from "preact/hooks";

const SPOTIFY_WIDGET_TIMING = {
  enterDurationMs: 500,
  exitDurationMs: 300,
  expandDebounceMs: 60,
  collapseDebounceMs: 120,
} as const;

type VisibilityState = "hidden" | "entering" | "visible" | "exiting";

interface SpotifyData {
  isPlaying: boolean;
  title: string;
  artist: string;
  album: string;
  albumImageUrl: string;
  songUrl: string;
}

function getVisibilityAnimationClass(visibilityState: VisibilityState): string {
  if (visibilityState === "entering") {
    return "origin-fade-in-right animate-fade-in-right delay-500";
  }
  if (visibilityState === "exiting") {
    return "animate-fade-out-right";
  }
  return "";
}

function useNowPlaying() {
  const [data, setData] = useState<Readonly<SpotifyData> | null>(null);
  const [loading, setLoading] = useState(true);
  const isIntegrationEnabled = import.meta.env.PUBLIC_ENABLE_SPOTIFY === "true";

  useEffect(() => {
    if (!isIntegrationEnabled) {
      setLoading(false);
      return;
    }

    const fetchData = async () => {
      try {
        const baseUrl = import.meta.env.BASE_URL.replace(/\/$/, "");
        const response = await fetch(`${baseUrl}/api/now-playing`);
        if (response.ok) {
          const result = await response.json();
          setData(result);
        } else {
          setData(null);
        }
        setLoading(false);
      } catch (error) {
        console.error("Error fetching Now Playing data:", error);
        setLoading(false);
      }
    };

    fetchData();
    const interval = setInterval(fetchData, 30_000);
    return () => clearInterval(interval);
  }, []);

  const shouldShow = isIntegrationEnabled && !loading && !!data?.isPlaying;
  return { data, loading, isIntegrationEnabled, shouldShow };
}

function useVisibilityTransition(
  shouldShow: boolean,
  enterMs = SPOTIFY_WIDGET_TIMING.enterDurationMs,
  exitMs = SPOTIFY_WIDGET_TIMING.exitDurationMs
) {
  const [visibilityState, setVisibilityState] = useState<VisibilityState>("hidden");
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (shouldShow && (visibilityState === "hidden" || visibilityState === "exiting")) {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
        timeoutRef.current = null;
      }
      setVisibilityState("entering");
      timeoutRef.current = setTimeout(() => {
        timeoutRef.current = null;
        setVisibilityState("visible");
      }, enterMs);
    } else if (!shouldShow && (visibilityState === "visible" || visibilityState === "entering")) {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
        timeoutRef.current = null;
      }
      setVisibilityState("exiting");
      timeoutRef.current = setTimeout(() => {
        timeoutRef.current = null;
        setVisibilityState("hidden");
      }, exitMs);
    }

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
        timeoutRef.current = null;
      }
    };
  }, [shouldShow, visibilityState, enterMs, exitMs]);

  return visibilityState;
}

function useDebouncedExpandCollapse(
  expandMs = SPOTIFY_WIDGET_TIMING.expandDebounceMs,
  collapseMs = SPOTIFY_WIDGET_TIMING.collapseDebounceMs
) {
  const [isExpanded, setExpanded] = useState(false);
  const expandTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const collapseTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const handleMouseEnter = useCallback(() => {
    if (collapseTimeoutRef.current) {
      clearTimeout(collapseTimeoutRef.current);
      collapseTimeoutRef.current = null;
    }
    if (expandTimeoutRef.current) return;
    expandTimeoutRef.current = setTimeout(() => {
      expandTimeoutRef.current = null;
      setExpanded(true);
    }, expandMs);
  }, [expandMs]);

  const handleMouseLeave = useCallback(() => {
    if (expandTimeoutRef.current) {
      clearTimeout(expandTimeoutRef.current);
      expandTimeoutRef.current = null;
    }
    if (collapseTimeoutRef.current) return;
    collapseTimeoutRef.current = setTimeout(() => {
      collapseTimeoutRef.current = null;
      setExpanded(false);
    }, collapseMs);
  }, [collapseMs]);

  const expandOnce = useCallback(() => {
    if (collapseTimeoutRef.current) {
      clearTimeout(collapseTimeoutRef.current);
      collapseTimeoutRef.current = null;
    }
    setExpanded(true);
  }, []);

  const toggle = useCallback(() => {
    if (expandTimeoutRef.current) {
      clearTimeout(expandTimeoutRef.current);
      expandTimeoutRef.current = null;
    }
    if (collapseTimeoutRef.current) {
      clearTimeout(collapseTimeoutRef.current);
      collapseTimeoutRef.current = null;
    }
    setExpanded((prev) => !prev);
  }, []);

  useEffect(() => {
    return () => {
      if (expandTimeoutRef.current) {
        clearTimeout(expandTimeoutRef.current);
        expandTimeoutRef.current = null;
      }
      if (collapseTimeoutRef.current) {
        clearTimeout(collapseTimeoutRef.current);
        collapseTimeoutRef.current = null;
      }
    };
  }, []);

  return { isExpanded, handleMouseEnter, handleMouseLeave, expandOnce, toggle };
}

function AlbumArt({
  albumImageUrl,
  album,
}: {
  albumImageUrl: string;
  album: string;
}) {
  return (
    <div className="relative w-10 h-10 shrink-0 overflow-hidden rounded-full border border-border/80 z-10 bg-bg shadow-sm">
      <img
        src={albumImageUrl}
        alt={album}
        className="w-full h-full object-cover animate-spin-vinyl"
        style={{ animationDuration: "6s" }}
      />
      <div className="absolute inset-0 bg-bg-subtle/20 mix-blend-overlay pointer-events-none" />
      <div className="absolute inset-0 bg-linear-to-tr from-transparent via-white/20 to-transparent pointer-events-none rounded-full" />
      <div className="absolute inset-0 m-auto w-2.5 h-2.5 bg-bg-subtle rounded-full border border-border/80 shadow-[inset_0_1px_2px_rgba(0,0,0,0.2)]" />
    </div>
  );
}

function TrackInfo({
  title,
  artist,
}: {
  title: string;
  artist: string;
}) {
  return (
    <div
      className={`
        flex flex-col justify-center overflow-hidden
        transition-all duration-500 ease-out-quart
        w-0 opacity-0 mr-0
        group-hover:w-[160px] group-hover:opacity-100 group-hover:mr-3
        group-data-[expanded=true]:w-[160px] group-data-[expanded=true]:opacity-100 group-data-[expanded=true]:mr-3
      `}
    >
      <span className="text-xs font-medium text-text truncate leading-tight tracking-tight">
        {title}
      </span>
      <span className="text-[9px] font-mono text-text-muted/80 truncate leading-tight mt-1 uppercase tracking-wider">
        {artist}
      </span>
    </div>
  );
}

function EqualizerBars() {
  return (
    <div
      className={`
        flex items-end gap-[2px] h-3 min-w-0 overflow-hidden
        transition-[width,opacity,margin] duration-300 ease-out
        w-[20px] opacity-100 m-2
        group-hover:w-0 group-hover:opacity-0 group-hover:m-0
        group-data-[expanded=true]:w-0 group-data-[expanded=true]:opacity-0 group-data-[expanded=true]:m-0
      `}
    >
      <span className="w-[3px] bg-accent rounded-sm animate-music-bar-1" />
      <span className="w-[3px] bg-accent/80 rounded-sm animate-music-bar-2" />
      <span className="w-[3px] bg-accent/60 rounded-sm animate-music-bar-3" />
    </div>
  );
}

function SpotifyWidgetStyles() {
  return (
    <style>{`
      @keyframes music-bar {
        0%, 100% { height: 20%; opacity: 1; }
        50% { height: 100%; opacity: 0.8; }
      }
      .animate-music-bar-1 { animation: music-bar 0.8s ease-in-out infinite; }
      .animate-music-bar-2 { animation: music-bar 0.7s ease-in-out 0.1s infinite; }
      .animate-music-bar-3 { animation: music-bar 0.9s ease-in-out 0.2s infinite; }
      
      .animate-spin-vinyl {
        animation: spin-vinyl 6s linear infinite;
      }
      @keyframes spin-vinyl {
        from { transform: rotate(0deg); }
        to { transform: rotate(360deg); }
      }
    `}</style>
  );
}

export default function SpotifyNowPlaying() {
  const { data, shouldShow } = useNowPlaying();
  const visibilityState = useVisibilityTransition(shouldShow);
  const { isExpanded, handleMouseEnter, handleMouseLeave, toggle } =
    useDebouncedExpandCollapse();

  if (visibilityState === "hidden") return null;

  const animationClass = getVisibilityAnimationClass(visibilityState);
  const containerClass = `fixed bottom-4 right-4 z-50 flex items-center justify-end group ${animationClass}`.trim();

  const discAriaLabel = isExpanded
    ? "Ocultar detalles de la canción"
    : "Mostrar detalles de la canción";

  return (
    <div
      className={containerClass}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      data-expanded={isExpanded}
    >
      <div
        className={`
          relative flex items-center flex-row-reverse gap-0
          bg-bg-subtle/95 backdrop-blur-xl
          border border-border/60 shadow-xs
          p-1.5 rounded-full overflow-hidden
          transition-all duration-500 ease-out-expo
          ring-1 ring-white/5
          pl-1.5
          group-hover:pl-5 group-hover:bg-bg-subtle
          group-data-[expanded=true]:pl-5 group-data-[expanded=true]:bg-bg-subtle
        `}
        style={{ maxWidth: "100%" }}
      >
        <button
          type="button"
          onClick={toggle}
          aria-label={discAriaLabel}
          className="shrink-0 p-0 border-0 bg-transparent cursor-pointer rounded-full focus:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2"
        >
          <AlbumArt albumImageUrl={data!.albumImageUrl} album={data!.album} />
        </button>
        <a
          href={data!.songUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="min-w-0 hover:text-accent focus:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-inset focus-visible:rounded"
          aria-label={`Abrir ${data!.title} por ${data!.artist} en Spotify`}
        >
          <TrackInfo title={data!.title} artist={data!.artist} />
        </a>
        <EqualizerBars />
      </div>
      <SpotifyWidgetStyles />
    </div>
  );
}
