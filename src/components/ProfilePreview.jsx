import { BadgeCheck, Grid3X3, Heart, MessageCircle } from "lucide-react";


const ProfilePreview = ({ profile }) => {
  const gradient =
    "linear-gradient(135deg, #f9ce34 0%, #ee2a7b 50%, #6228d7 100%)";

  return (
    <div
      className="max-w-lg w-full mx-auto rounded-2xl overflow-hidden shadow-2xl border border-white/10"
      style={{ background: gradient, minHeight: 250 }}
    >
      {/* Profile Top Section */}
      <div className="flex flex-col items-center pt-2 pb-1 px-2">
        {/* Avatar */}
        <div className="relative">
          <div className="h-12 w-12 rounded-full bg-white/30 p-0.5">
            <div className="h-full w-full rounded-full bg-white/40 flex items-center justify-center overflow-hidden">
              {profile?.profileImage ? (
                <img
                  src={profile?.profileImage}
                  alt=""
                  className="h-full w-full object-cover rounded-full"
                />
              ) : (
                <span className="text-xl text-gray-400">👤</span>
              )}
            </div>
          </div>
          {profile?.isVerified && (
            <span className="absolute -bottom-1.5 -right-1.5 bg-white rounded-full p-0.5 shadow">
              <BadgeCheck className="h-4 w-4 text-blue-500 fill-blue-500" />
            </span>
          )}
        </div>

        {/* Username & Stats */}
        <div className="flex flex-col items-center mt-2 w-full">
          <div className="flex items-center gap-2">
            <span className="text-white font-bold text-lg tracking-tight">
              {profile?.username || "yourhandle"}
            </span>
          </div>
          <div className="flex gap-6 mt-2 w-full justify-center">
            {[
              { label: "Posts", value: profile?.posts },
              { label: "Followers", value: profile?.followers },
              { label: "Following", value: profile?.following },
            ].map((stat) => (
              <div key={stat?.label} className="text-center">
                <p className="text-white font-bold text-xl leading-tight">
                  {stat?.value}
                </p>
                <p className="text-white/80 text-xs uppercase tracking-wider">
                  {stat?.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Name & Bio */}
      <div className="px-4 mt-1 text-left">
        <p className="text-white font-semibold text-base">
          {profile?.displayName || "Your Name"}
        </p>
        <p className="text-white/70 text-xs font-semibold uppercase tracking-wider mt-0.5">
          {profile?.theme || "Creator"}
        </p>
        <div className="mt-1 space-y-1 text-white/90 text-sm">
          
          <div className="flex items-center gap-1">
            <span className="text-blue-200">🔗</span>
            <a
              href="https://linktr.ee/yourhandle"
              className="underline hover:text-white transition"
            >
              linktr.ee/yourhandle
            </a>
          </div>
        </div>
        <p className="text-white/90 text-sm mt-1 whitespace-pre-line leading-relaxed">
          {profile?.bio}
        </p>
      </div>

      {/* Action Buttons */}
      <div className="px-4 mt-2 flex gap-2 justify-center">
        <button className="flex-1 bg-white/30 text-white text-base font-semibold py-2 rounded-full hover:bg-white/40 transition">
          Follow
        </button>
        <button className="flex-1 bg-white/20 text-white text-base font-semibold py-2 rounded-full hover:bg-white/30 transition">
          Message
        </button>
        <button className="w-10 bg-white/20 text-white text-lg font-bold py-2 rounded-full flex items-center justify-center hover:bg-white/30 transition">
          ▾
        </button>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-white/30 mt-2">
        <div className="flex-1 flex items-center justify-center py-2 border-b-2 border-white">
          <Grid3X3 className="h-4 w-4 text-white" />
        </div>
        <div className="flex-1 flex items-center justify-center py-2">
          <Heart className="h-4 w-4 text-white/60" />
        </div>
        <div className="flex-1 flex items-center justify-center py-2">
          <MessageCircle className="h-4 w-4 text-white/60" />
        </div>
      </div>

      {/* Grid Preview */}
      <div className="grid grid-cols-3 gap-px bg-white/10">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="h-16 bg-white/10" />
        ))}
      </div>
    </div>
  );
};

export default ProfilePreview;
