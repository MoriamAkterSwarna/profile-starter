import { useState, forwardRef } from "react";
import ProfilePreview from "./ProfilePreview";

import { RotateCcw } from "lucide-react";
import QrSection from "./QrSection";

const FlipCard = forwardRef(function FlipCard(props, ref) {
  const { profile } = props;
  const [isFlipped, setIsFlipped] = useState(false);

  return (
    <div className="flex flex-col items-center gap-4">
      {/* Card container with perspective */}
      <div className="relative w-fit" style={{ perspective: 1200 }}>
        <div
          ref={ref}
          className="relative w-full transition-transform duration-500"
          style={{
            transformStyle: "preserve-3d",
            transform: isFlipped ? "rotateY(180deg)" : "rotateY(0deg)",
            minHeight: 480,
          }}
        >
          {/* Front */}
          <div
            className="w-100 h-full"
            style={{ backfaceVisibility: "hidden" }}
          >
            <ProfilePreview profile={profile} />
          </div>

          {/* Back */}
          <div
            className="absolute inset-0 w-100 h-full"
            style={{
              backfaceVisibility: "hidden",
              transform: "rotateY(180deg)",
            }}
          >
            <QrSection profile={profile} />
          </div>
        </div>
      </div>

      {/* Flip button */}
      <button
        onClick={() => setIsFlipped((flip) => !flip)}
        className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-card border border-border text-foreground text-sm font-medium shadow-md hover:shadow-lg transition-all hover-scale"
      >
        <RotateCcw className="h-4 w-4" />
        {isFlipped ? "Show Profile" : "Show QR Code"}
      </button>
    </div>
  );
});

export default FlipCard;
