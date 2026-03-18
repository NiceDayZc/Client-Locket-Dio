import { Menu } from "lucide-react";
import { Link } from "react-router-dom";
import { useApp } from "@/context/AppContext";

const Header = () => {
  const { navigation } = useApp();
  const { setIsSidebarOpen } = navigation;

  return (
    <header className="sticky top-0 z-50 bg-base-100/80 backdrop-blur-lg border-b border-base-300">
      <div className="max-w-screen-xl mx-auto px-6 py-4 flex items-center justify-between">
        <Link
          to="/"
          className="flex items-center gap-2"
          aria-label="Home"
        >
          <img
            src="/images/locket-dio.png"
            alt="Locket"
            className="w-8 h-8 object-contain"
            draggable="false"
          />
          <span className="font-bold text-xl text-base-content tracking-tight">
            Locket
          </span>
        </Link>

        <button
          onClick={() => setIsSidebarOpen(true)}
          className="p-2.5 rounded-xl hover:bg-base-200 transition-colors"
          aria-label="Open menu"
        >
          <Menu size={24} className="text-base-content" />
        </button>
      </div>
    </header>
  );
};

export default Header;
