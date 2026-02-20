import { forwardRef } from "react";
import { QRCodeSVG } from "qrcode.react";

const QRSection = forwardRef(({ profile }, ref) => {
  const profileUrl = `https://instagram.com/${profile.username || "instagram"}`;
 const gradient =
    "linear-gradient(135deg, #f9ce34 0%, #ee2a7b 50%, #6228d7 100%)";

  return (
    <div
      ref={ref}
      className="w-90 h-115 rounded-2xl overflow-hidden shadow-2xl flex flex-col items-center justify-center gap-6"
        style={{ background: gradient }}
    >
      {/* Small avatar */}
      <div className="h-16 w-16 rounded-full border-[3px] border-white/80 overflow-hidden bg-white/20 flex items-center justify-center">
        {profile.profileImage ? (
          <img src={profile.profileImage} alt="" className="h-full w-full object-cover" />
        ) : (
          <span className="text-2xl text-white/60">👤</span>
        )}
      </div>

      {/* QR Code */}
      <div className="bg-white p-4 rounded-2xl shadow-lg">
        <QRCodeSVG
          value={profileUrl}
          size={180}
          bgColor="white"
          fgColor="#262626"
          level="H"
          includeMargin={false}
        />
      </div>

      {/* Handle */}
      <div className="text-center">
        <p className="text-white font-bold text-lg">@{profile.username || "username"}</p>
        <p className="text-white/60 text-xs mt-1 uppercase tracking-widest">Scan to view profile</p>
      </div>
    </div>
  );
});

QRSection.displayName = "QRSection";
export default QRSection;