import { Camera, User, BadgeCheck } from "lucide-react";



const BIO_MAX = 150;

const gradientOptions = [
  { value: "instagram", label: "Instagram", colors: "from-yellow-400 via-pink-500 to-purple-600" },
  { value: "sunset", label: "Sunset", colors: "from-orange-400 via-rose-500 to-purple-600" },
  { value: "ocean", label: "Ocean", colors: "from-cyan-400 via-blue-500 to-indigo-500" },
  { value: "neon", label: "Neon", colors: "from-green-400 via-cyan-400 to-purple-500" },
];

const themeOptions= [
  { value: "creator", label: "🎨 Creator" },
  { value: "business", label: "💼 Business" },
  { value: "personal", label: "👤 Personal" },
];

const ProfileForm = ({ profile, onChange }) => {
  const handleImageUpload = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onloadend = () => onChange({ profileImage: reader.result });
    reader.readAsDataURL(file);
  };

  const formatNumber = (val) => {
    const num = parseInt(val.replace(/\D/g, ""), 10);
    return isNaN(num) ? 0 : num;
  };

  return (
    <div className="space-y-6">
      {/* Profile Image Upload */}
      <div className="flex flex-col items-center gap-3">
        <label htmlFor="profile-upload" className="relative cursor-pointer group">
          <div className="h-24 w-24 rounded-full bg-gray-100 flex items-center justify-center overflow-hidden border-2 border-gray-200 transition-all group-hover:border-blue-500">
            {profile.profileImage ? (
              <img src={profile.profileImage} alt="Profile" className="h-full w-full object-cover" />
            ) : (
              <User className="h-10 w-10 text-gray-400" />
            )}
          </div>
          <div className="absolute bottom-0 right-0 h-8 w-8 rounded-full bg-blue-500 flex items-center justify-center shadow-md">
            <Camera className="h-4 w-4 text-white" />
          </div>
        </label>
        <input id="profile-upload" type="file" accept="image/*" className="hidden" onChange={handleImageUpload} />
        <p className="text-xs text-gray-400">Click to upload photo</p>
      </div>

      {/* Username */}
      <div className="space-y-2">
        <label htmlFor="username" className="block text-sm font-medium text-gray-700">
          Username
        </label>
        <div className="relative">
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm">@</span>
          <input
            id="username"
            type="text"
            value={profile.username}
            onChange={(e) => onChange({ username: e.target.value.toLowerCase().replace(/[^a-z0-9._]/g, "") })}
            className="w-full rounded-md border border-gray-300 bg-white pl-8 pr-3 py-2 text-sm text-gray-900 placeholder-gray-400 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
            placeholder="yourhandle"
          />
        </div>
      </div>

      {/* Display Name */}
      <div className="space-y-2">
        <label htmlFor="displayName" className="block text-sm font-medium text-gray-700">
          Display Name
        </label>
        <input
          id="displayName"
          type="text"
          value={profile.displayName}
          onChange={(e) => onChange({ displayName: e.target.value })}
          className="w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 placeholder-gray-400 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
          placeholder="Your Name"
        />
      </div>

      {/* Bio */}
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <label htmlFor="bio" className="block text-sm font-medium text-gray-700">
            Bio
          </label>
          <span className={`text-xs ${profile?.bio?.length > BIO_MAX ? "text-red-500" : "text-gray-400"}`}>
            {profile?.bio?.length}/{BIO_MAX}
          </span>
        </div>
        <textarea
          id="bio"
          value={profile.bio}
          onChange={(e) => {
            if (e.target.value.length <= BIO_MAX) onChange({ bio: e.target.value });
          }}
          placeholder="Tell the world about yourself..."
          rows={3}
          className="w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 placeholder-gray-400 outline-none transition resize-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
        />
      </div>

      {/* Verified Badge */}
      <div className="flex items-center justify-between rounded-lg border border-gray-200 p-3">
        <div className="flex items-center gap-2">
          <BadgeCheck className="h-5 w-5 text-blue-500" />
          <span className="text-sm font-medium text-gray-700">Verified Badge</span>
        </div>
        {/* Switch */}
        <button
          role="switch"
          aria-checked={profile.isVerified}
          onClick={() => onChange({ isVerified: !profile.isVerified })}
          className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500/20 ${
            profile.isVerified ? "bg-blue-500" : "bg-gray-200"
          }`}
        >
          <span
            className={`inline-block h-4 w-4 transform rounded-full bg-white shadow transition-transform duration-200 ${
              profile.isVerified ? "translate-x-6" : "translate-x-1"
            }`}
          />
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-3">
        {(["posts", "followers", "following"] ).map((stat) => (
          <div key={stat} className="space-y-1">
            <label className="block text-xs font-medium text-gray-600 capitalize">{stat}</label>
            <input
              type="text"
              value={(profile[stat] )?.toLocaleString()}
              onChange={(e) => onChange({ [stat]: formatNumber(e.target.value) })}
              className="w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
            />
          </div>
        ))}
      </div>

      {/* Theme Presets */}
      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-700">Theme Preset</label>
        <div className="flex gap-2">
          {themeOptions.map((t) => (
            <button
              key={t.value}
              onClick={() => onChange({ theme: t.value })}
              className={`flex-1 rounded-lg border-2 px-3 py-2 text-sm font-medium transition-all ${
                profile.theme === t.value
                  ? "border-blue-500 bg-blue-50 text-gray-900"
                  : "border-gray-200 text-gray-400 hover:border-blue-300"
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>
      </div>

      {/* Gradient Selector */}
      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-700">Background Gradient</label>
        <div className="flex gap-2">
          {gradientOptions.map((g) => (
            <button
              key={g.value}
              onClick={() => onChange({ gradient: g.value })}
              title={g.label}
              className={`flex-1 h-10 rounded-lg bg-linear-to-r ${g.colors} transition-all ${
                profile.gradient === g.value
                  ? "ring-2 ring-blue-500 ring-offset-2 scale-105"
                  : "opacity-60 hover:opacity-100"
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProfileForm;