import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  X,
  Home,
  Upload,
  Smartphone,
  Rocket,
  Info,
  ShieldCheck,
  Wrench,
  BookText,
  UserCircle,
  Clock,
  Bug,
  Settings,
  Palette,
  UserRound,
  LifeBuoy,
  Package,
  ExternalLink,
  Heart,
  Newspaper,
  Calendar,
  Download,
  Star,
} from "lucide-react";
import { useApp } from "@/context/AppContext";
import { MenuItem } from "./MenuItem";
import { AuthButton } from "./AuthButton";
import ThemeToggle from "./ThemeToggle";
import PlanBadge from "../ui/PlanBadge/PlanBadge";
import { SonnerError, SonnerSuccess } from "../ui/SonnerToast";
import { CONFIG } from "@/config";
import { useAuthStore } from "@/stores";

const Sidebar = () => {
  const user = useAuthStore((state) => state.user);
  const clearAndlogout = useAuthStore((state) => state.clearAndlogout);

  const navigate = useNavigate();
  const { navigation } = useApp();
  const { isSidebarOpen, setIsSidebarOpen } = navigation;

  useEffect(() => {
    document.body.classList.toggle("overflow-hidden", isSidebarOpen);
    return () => document.body.classList.remove("overflow-hidden");
  }, [isSidebarOpen]);

  const currentYear = new Date().getFullYear();
  const { startYear } = CONFIG.app;

  const handleLogout = async () => {
    try {
      clearAndlogout();
      SonnerSuccess(
        "Signed out successfully",
        `Goodbye, ${user?.displayName || "User"}!`
      );
      navigate("/login");
    } catch (error) {
      SonnerError("Failed to sign out");
      console.error("Logout error:", error);
    }
  };

  const userMenuSections = [
    {
      title: "Main",
      items: [
        { to: "/home", icon: Home, text: "Home" },
        { to: "/about", icon: Info, text: "About" },
        { to: "/newsfeed", icon: Newspaper, text: "News Feed", badge: "New" },
        { to: "/download", icon: ExternalLink, text: "Install App" },
        { to: "/sponsors", icon: Heart, text: "Support Us" },
      ],
    },
    {
      title: "Features",
      badge: <PlanBadge />,
      items: [
        { to: "/postmoments", icon: Upload, text: "Post Moments" },
        { to: "/locket-beta", icon: Smartphone, text: "Locket Camera", badge: "Beta" },
        { to: "/tools", icon: Wrench, text: "Locket Tools" },
        { to: "/diary", icon: Calendar, text: "Locket Diary", badge: "New" },
        { to: "/pricing", icon: Rocket, text: "Membership", badge: "Hot" },
        { to: "/profile", icon: UserRound, text: "Your Profile" },
      ],
    },
    {
      title: "Partners",
      items: [
        { to: "/collab/caption-kanade", icon: Palette, text: "Caption Kanade" },
        { to: "/collab/locket-upload", icon: Download, text: "Locket Upload" },
      ],
    },
    {
      title: "Support",
      items: [
        { to: "/incidents", icon: Bug, text: "Incident Center" },
        { to: "/contact", icon: LifeBuoy, text: "Help & Contact" },
        { to: "/privacy", icon: ShieldCheck, text: "Privacy Policy" },
        { to: "/settings", icon: Settings, text: "Settings" },
      ],
    },
  ];

  const guestMenuSections = [
    {
      title: "Main",
      items: [
        { to: "/", icon: Home, text: "Home" },
        { to: "/about", icon: Info, text: "About" },
        { to: "/about-dio", icon: UserCircle, text: "About Dio" },
        { to: "/newsfeed", icon: Newspaper, text: "News Feed", badge: "New" },
        { to: "/download", icon: ExternalLink, text: "Install App" },
      ],
    },
    {
      title: "Resources",
      items: [
        { to: "/pricing", icon: Rocket, text: "Membership", badge: "New" },
        { to: "/collection", icon: Package, text: "Version Library" },
        { to: "/sponsors", icon: Heart, text: "Support Us" },
        { to: "/timeline", icon: Clock, text: "History" },
        { to: "/docs", icon: BookText, text: "Documentation" },
      ],
    },
    {
      title: "Partners",
      items: [
        { to: "/collab/caption-kanade", icon: Palette, text: "Caption Kanade" },
        { to: "/collab/locket-upload", icon: Download, text: "Locket Upload" },
      ],
    },
    {
      title: "Support",
      items: [
        { to: "/incidents", icon: Bug, text: "Incident Center" },
        { to: "/contact", icon: LifeBuoy, text: "Help & Contact" },
        { to: "/privacy", icon: ShieldCheck, text: "Privacy Policy" },
        { to: "/settings", icon: Settings, text: "Settings" },
      ],
    },
  ];

  const menuSections = user ? userMenuSections : guestMenuSections;

  return (
    <>
      {/* Overlay */}
      <div
        className={`fixed h-screen z-60 inset-0 bg-base-content/10 backdrop-blur-sm transition-opacity duration-300 ${
          isSidebarOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
        onClick={() => setIsSidebarOpen(false)}
      />

      {/* Sidebar */}
      <div
        className={`fixed z-60 top-0 right-0 h-full w-72 bg-base-100 border-l border-base-300 shadow-2xl transition-transform duration-300 flex flex-col ${
          isSidebarOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Header */}
        <div className="flex justify-between items-center py-4 px-4 border-b border-base-300">
          <span className="text-lg font-semibold text-base-content">Menu</span>
          <div className="flex items-center gap-2">
            <ThemeToggle />
            <button
              onClick={() => setIsSidebarOpen(false)}
              className="p-2 rounded-lg hover:bg-base-200 transition-colors"
            >
              <X size={20} className="text-base-content" />
            </button>
          </div>
        </div>

        {/* Navigation */}
        <div className="flex-1 overflow-y-auto py-4">
          <nav className="px-3 space-y-6">
            {menuSections.map((section) => (
              <div key={section.title}>
                <div className="flex items-center justify-between px-3 mb-2">
                  <span className="text-xs font-semibold uppercase tracking-wider text-base-content/50">
                    {section.title}
                  </span>
                  {section.badge && <div>{section.badge}</div>}
                </div>
                <ul className="space-y-1">
                  {section.items.map((item) => (
                    <MenuItem
                      key={item.to}
                      to={item.to}
                      icon={item.icon}
                      badge={item.badge}
                      onClick={() => setIsSidebarOpen(false)}
                    >
                      {item.text}
                    </MenuItem>
                  ))}
                </ul>
              </div>
            ))}
          </nav>
        </div>

        {/* Auth Button */}
        <AuthButton
          user={user}
          onLogout={handleLogout}
          onClose={() => setIsSidebarOpen(false)}
        />

        {/* Footer */}
        <div className="py-3 border-t border-base-300">
          <p className="text-center text-xs text-base-content/50">
            {startYear}
            {currentYear > startYear && `-${currentYear}`}{" "}
            <span className="font-medium">Dio</span>. All rights reserved.
          </p>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
