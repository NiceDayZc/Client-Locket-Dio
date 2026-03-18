import React from "react";
import { Link } from "react-router-dom";
import { LogOut, LogIn } from "lucide-react";

export const AuthButton = ({ user, onLogout, onClose }) => (
  <div className="flex-shrink-0 p-4 border-t border-base-300">
    {user ? (
      <button
        className="flex items-center justify-center w-full px-4 py-3 text-sm font-medium rounded-xl border border-base-300 text-base-content hover:bg-base-200 transition-colors gap-2"
        onClick={() => {
          onLogout();
          onClose();
        }}
      >
        <LogOut size={18} /> Sign Out
      </button>
    ) : (
      <Link
        to="/login"
        className="flex items-center justify-center w-full px-4 py-3 text-sm font-medium rounded-xl bg-base-content text-base-100 hover:opacity-90 transition-colors gap-2"
        onClick={onClose}
      >
        <LogIn size={18} /> Sign In
      </Link>
    )}
  </div>
);
