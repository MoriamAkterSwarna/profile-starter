import { useState } from "react";
import { toPng } from "html-to-image";
import { Download, Loader2, Check, Link } from "lucide-react";

/* ── Collect ancestors that have 3D transforms and neutralize them ── */
const neutralize3D = (node) => {
  const patched = []; // { el, origTransform, origTransformStyle }
  let el = node;

  while (el && el !== document.body) {
    const cs = window.getComputedStyle(el);
    const hasTransform = cs.transform && cs.transform !== "none";
    const hasTransformStyle = cs.transformStyle && cs.transformStyle !== "flat";

    if (hasTransform || hasTransformStyle) {
      patched.push({
        el,
        origTransform: el.style.transform,
        origTransformStyle: el.style.transformStyle,
      });
      el.style.transform = "none";
      el.style.transformStyle = "flat";
    }
    el = el.parentElement;
  }
  return patched;
};

/* ── Restore previously patched ancestors ── */
const restore3D = (patched) => {
  patched.forEach(({ el, origTransform, origTransformStyle }) => {
    el.style.transform = origTransform;
    el.style.transformStyle = origTransformStyle;
  });
};

const ExportButton = ({ cardRef, username }) => {
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);

  
  /* ── PNG Export ── */
  const handleExport = async () => {
    if (!cardRef.current || !username) return;
    setLoading(true);

    // Patch 3D ancestors so html-to-image sees a flat node
    const patched = neutralize3D(cardRef.current);

    // Also force the node itself to have no backface-visibility quirks
    const node = cardRef.current;
    const origBFV = node.style.backfaceVisibility;
    const origWBFV = node.style.WebkitBackfaceVisibility;
    node.style.backfaceVisibility = "visible";
    node.style.WebkitBackfaceVisibility = "visible";

    try {
      const dataUrl = await toPng(node, {
        width: 360,
        height: 460,
        pixelRatio: 3, // → 1080×1380 effective resolution
        cacheBust: true,
        skipFonts: false,
      });

      const link = document.createElement("a");
      link.download = `${username}-instagram-card.png`;
      link.href = dataUrl;
      link.click();
    } catch (err) {
      console.error("Export failed:", err);
    } finally {
      // Always restore original styles
      node.style.backfaceVisibility = origBFV;
      node.style.WebkitBackfaceVisibility = origWBFV;
      restore3D(patched);
      setLoading(false);
    }
  };

  /* ── Copy Link ── */
  const handleCopyLink = async () => {
    if (!username) return;
    try {
      await navigator.clipboard.writeText(`https://instagram.com/${username}`);
      setCopied(true);

      setTimeout(() => setCopied(false), 2000);
    } catch {
      console.error("Failed to copy link");
    }
  };

  return (
    <>
      {/* ── Buttons ── */}
      <div style={{ display: "flex", gap: "0.625rem", width: "100%" }}>
        {/* Download PNG */}
        <button
          id="download-png-btn"
          onClick={handleExport}
          disabled={!username || loading}
          className="flex items-center justify-center gap-2 px-5 py-3 rounded-xl text-white font-semibold text-sm shadow-lg hover:shadow-xl transition-all disabled:opacity-40 disabled:cursor-not-allowed hover-scale border-0"
          style={{
            flex: 1,
            background:
              "linear-gradient(90deg, #f9ce34 0%, #ee2a7b 50%, #6228d7 100%)",
          }}
          title={!username ? "Enter a username first" : "Download card as PNG"}
        >
          {loading ? (
            <>
              <Loader2
                size={16}
                style={{ animation: "spin 1s linear infinite" }}
              />
              Generating…
            </>
          ) : (
            <>
              <Download size={16} />
              Download {}
            </>
          )}
        </button>

        {/* Copy Link */}
        <button
          id="copy-link-btn"
          onClick={handleCopyLink}
          disabled={!username}
          className="flex items-center justify-center gap-2 px-4 py-3 rounded-xl font-medium text-sm border-0 shadow hover:shadow-md transition-all disabled:opacity-40 disabled:cursor-not-allowed bg-white/10 text-white relative"
          title={
            !username
              ? "Enter a username first"
              : `Copy instagram.com/${username}`
          }
          style={{
            flexShrink: 0,
            border: "2px solid transparent",
            backgroundImage:
              "linear-gradient(#222, #222), linear-gradient(90deg, #f9ce34 0%, #ee2a7b 50%, #6228d7 100%)",
            backgroundOrigin: "border-box",
            backgroundClip: "padding-box, border-box",
          }}
        >
          {copied ? (
            <Check size={16} style={{ color: "var(--success)" }} />
          ) : (
            <>
              <Link size={15} />
              Copy Link
            </>
          )}
        </button>
      </div>

      {/* Spin keyframe for loader icon */}
      <style>{`
        @keyframes spin {
          from { transform: rotate(0deg); }
          to   { transform: rotate(360deg); }
        }
      `}</style>
    </>
  );
};

export default ExportButton;