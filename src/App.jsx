import { useState, useRef } from "react";
import DarkModeToggle from "./components/DarkModeToggle";
import ProfileForm from "./components/ProfileForm";
import FlipCard from "./components/FlipCard";
import ExportButton from "./components/ExportButton";
import Header from "./components/Header";
import ProfilePreview from "./components/ProfilePreview";


const App = () => {
  const [profile, setProfile] = useState({ 
    profileImage: "",
    username: "yourhandle",
    posts: 256,
    followers: 1234,
    following: 567,
    isVerified: false,
    gradient: "instagram",
  });
  const cardRef = useRef(null);

  const handleChange = (updates) => {
    setProfile((prev) => ({ ...prev, ...updates }));
  };

  return (
    <div className="min-h-screen bg-background">
      <DarkModeToggle />

      {/* Header */}
      <Header />

      {/* Main Content */}
      <main className="container max-w-5xl mx-auto px-4 pb-16">
        <div className="flex flex-col lg:flex-row gap-10 items-start">
          {/* Form Side */}
          <div className="w-full lg:w-1/2 bg-card rounded-2xl border border-border p-6 shadow-sm animate-fade-in">
            <h2 className="text-lg font-semibold text-foreground mb-5">Profile Details</h2>
            <ProfileForm profile={profile} onChange={handleChange} />
            <div className="mt-6">
              <ExportButton cardRef={cardRef} username={profile.username} />
            </div>
          </div>

          {/* Preview Side */}
          <div className="w-full lg:w-1/2 flex justify-center lg:sticky lg:top-8 animate-fade-in" style={{ animationDelay: "0.1s" }}>
            <FlipCard ref={cardRef} profile={profile} /> 
            {/* <ProfilePreview profile={profile} /> */}
          </div>
        </div>
      </main>


      {/* footer */}
      <footer className="text-center py-6 px-4 border-t border-slate-200 text-slate-500 text-[0.8rem] dark:border-slate-700 dark:text-slate-400">
        Built with ❤️ using React + Framer Motion + TailwindCSS
      </footer>
    </div>
  );
};

export default App;
