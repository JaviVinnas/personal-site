
import { useEffect, useState } from "preact/hooks";

interface SpotifyData {
  isPlaying: boolean;
  title: string;
  artist: string;
  album: string;
  albumImageUrl: string;
  songUrl: string;
}

export default function SpotifyNowPlaying() {
  const [data, setData] = useState<SpotifyData | null>(null);
  const [loading, setLoading] = useState(true);
  const [isExpanded, setExpanded] = useState(false);

  // Handlers for hover/click interaction to ensure robustness on both Desktop and Mobile
  const handleMouseEnter = () => setExpanded(true);
  const handleMouseLeave = () => setExpanded(false);

  // On mobile/touch: Tap once to expand, Tap again to navigate
  const handleClick = (e: MouseEvent) => {
    if (!isExpanded) {
      e.preventDefault();
      setExpanded(true);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${import.meta.env.BASE_URL}/api/now-playing`);
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
    // Poll every 30 seconds
    const interval = setInterval(fetchData, 30000);

    return () => clearInterval(interval);
  }, []);

  if (loading || !data?.isPlaying) return null;

  return (
    <div 
      className="fixed bottom-4 right-4 z-50 flex items-center justify-end group"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      data-expanded={isExpanded}
    >
      <a
        href={data.songUrl}
        target="_blank"
        rel="noopener noreferrer"
        onClick={handleClick as any}
        className={`
          relative flex items-center flex-row-reverse gap-0
          bg-bg-subtle/80 backdrop-blur-xl
          border border-border/60 shadow-lg
          p-1.5 rounded-full overflow-hidden
          transition-all duration-500 ease-out-expo
          ring-1 ring-white/5
          pl-1.5
          group-hover:pl-5 group-hover:bg-bg-subtle/95
          data-[expanded=true]:pl-5 data-[expanded=true]:bg-bg-subtle/95
        `}
        style={{ maxWidth: '100%' }}
        aria-label={`Now playing: ${data.title} by ${data.artist}`}
      >
        {/* Album Art (Rotates) - Fixed anchor on the right */}
        <div className="relative w-10 h-10 shrink-0 overflow-hidden rounded-full border border-border/80 z-10 bg-bg shadow-sm">
          <img
            src={data.albumImageUrl}
            alt={data.album}
            className="w-full h-full object-cover animate-spin-vinyl"
            style={{ animationDuration: '6s' }}
          />
          {/* Subtle tint to integrate wild colors with the theme */}
          <div className="absolute inset-0 bg-bg-subtle/20 mix-blend-overlay pointer-events-none" />
          {/* Vinyl Glare/Reflection for realism */}
          <div className="absolute inset-0 bg-linear-to-tr from-transparent via-white/20 to-transparent pointer-events-none rounded-full" />
          
          {/* Vinyl center hole */}
          <div className="absolute inset-0 m-auto w-2.5 h-2.5 bg-bg-subtle rounded-full border border-border/80 shadow-[inset_0_1px_2px_rgba(0,0,0,0.2)]" />
        </div>

        {/* Text Content - Expands to the Left */}
        <div
          className={`
            flex flex-col justify-center overflow-hidden
            transition-all duration-500 ease-out-quart
            w-0 opacity-0 mr-0
            group-hover:w-[160px] group-hover:opacity-100 group-hover:mr-3
            data-[expanded=true]:w-[160px] data-[expanded=true]:opacity-100 data-[expanded=true]:mr-3
          `}
        >
          <span className="text-xs font-medium text-text truncate leading-tight tracking-tight">
            {data.title}
          </span>
          <span className="text-[9px] font-mono text-text-muted/80 truncate leading-tight mt-1 uppercase tracking-wider">
            {data.artist}
          </span>
        </div>

        {/* Animated Equalizer Bars - Visible when collapsed */}
        <div
          className={`
            flex items-end gap-[2px] h-3
            transition-all duration-300 ease-out
            w-[20px] opacity-100 m-2
            group-hover:w-0 group-hover:opacity-0 group-hover:hidden group-hover:m-0
            data-[expanded=true]:w-0 data-[expanded=true]:opacity-0 data-[expanded=true]:hidden data-[expanded=true]:m-0
          `}
        >
          <span className="w-[3px] bg-accent rounded-sm animate-music-bar-1" />
          <span className="w-[3px] bg-accent/80 rounded-sm animate-music-bar-2" />
          <span className="w-[3px] bg-accent/60 rounded-sm animate-music-bar-3" />
        </div>
      </a>

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
    </div>
  );
}
