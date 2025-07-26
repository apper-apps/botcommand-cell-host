import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout } from "@/store/authSlice";
import ApperIcon from "@/components/ApperIcon";
import Button from "@/components/atoms/Button";
import ThemeToggle from "@/components/molecules/ThemeToggle";
import LanguageDropdown from "@/components/molecules/LanguageDropdown";

const Header = ({ onMenuToggle }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user, isAuthenticated } = useSelector((state) => state.auth);

  const handleLogout = () => {
    dispatch(logout());
    navigate("/");
  };

  const handleLogin = () => {
    navigate("/login");
  };

  return (
    <header className="bg-white dark:bg-discord-surface border-b border-gray-200 dark:border-discord-tertiary shadow-sm">
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Mobile menu button */}
          <button
            onClick={onMenuToggle}
            className="lg:hidden p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-discord-tertiary transition-colors duration-200"
          >
            <ApperIcon name="Menu" size={24} className="text-gray-700 dark:text-gray-300" />
          </button>

          {/* Logo and title - hidden on mobile when sidebar is present */}
          <div className="hidden lg:flex items-center gap-3">
            <div className="w-8 h-8 bg-gradient-to-r from-discord-blurple to-discord-dark rounded-lg flex items-center justify-center">
              <ApperIcon name="Bot" size={20} className="text-white" />
            </div>
            <h1 className="text-xl font-bold text-gray-900 dark:text-white font-poppins">
              BotCommand Hub
            </h1>
          </div>

{/* Right side actions */}
          <div className="flex items-center gap-4">
            <LanguageDropdown />
            <ThemeToggle />
            
            {isAuthenticated ? (
              <div className="flex items-center gap-3">
                <div className="hidden sm:flex items-center gap-3">
                  {user?.avatar ? (
                    <img
                      src={user.avatar}
                      alt={user.username}
                      className="w-8 h-8 rounded-full"
                    />
                  ) : (
                    <div className="w-8 h-8 bg-gradient-to-r from-discord-blurple to-discord-dark rounded-full flex items-center justify-center">
                      <ApperIcon name="User" size={16} className="text-white" />
                    </div>
                  )}
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    {user?.username}
                  </span>
                </div>
                
                <Button
                  variant="ghost"
                  size="sm"
                  icon="LogOut"
                  onClick={handleLogout}
                >
                  <span className="hidden sm:inline">Logout</span>
                </Button>
              </div>
            ) : (
              <Button
                variant="primary"
                size="sm"
                icon="LogIn"
                onClick={handleLogin}
              >
                Login
              </Button>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;