import React from "react";
import { NavLink, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import ApperIcon from "@/components/ApperIcon";
import { cn } from "@/utils/cn";

const Sidebar = ({ isOpen, onClose }) => {
  const location = useLocation();
  const { isAuthenticated } = useSelector((state) => state.auth);

  const navigationItems = [
    { 
      name: "Home", 
      href: "/", 
      icon: "Home" 
    },
    { 
      name: "Commands", 
      href: "/commands", 
      icon: "Terminal" 
    },
    ...(isAuthenticated ? [
      { 
        name: "My Servers", 
        href: "/servers", 
        icon: "Server" 
      }
    ] : []),
    { 
      name: "About", 
      href: "/about", 
      icon: "Info" 
    },
    { 
      name: "Support Server", 
      href: "https://discord.gg/support", 
      icon: "MessageCircle",
      external: true 
    }
  ];

  const SidebarContent = () => (
    <div className="flex flex-col h-full">
      {/* Logo and title */}
      <div className="flex items-center gap-3 p-6 border-b border-gray-200 dark:border-discord-tertiary">
        <div className="w-10 h-10 bg-gradient-to-r from-discord-blurple to-discord-dark rounded-lg flex items-center justify-center">
          <ApperIcon name="Bot" size={24} className="text-white" />
        </div>
        <div>
          <h1 className="text-xl font-bold text-gray-900 dark:text-white font-poppins">
            BotCommand Hub
          </h1>
          <p className="text-xs text-gray-500 dark:text-gray-400">
            Discord Bot Manager
          </p>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-4 py-6 space-y-2">
        {navigationItems.map((item) => {
          if (item.external) {
            return (
              <a
                key={item.name}
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
                className="sidebar-item"
                onClick={onClose}
              >
                <ApperIcon name={item.icon} size={20} />
                <span>{item.name}</span>
                <ApperIcon name="ExternalLink" size={16} className="ml-auto" />
              </a>
            );
          }

          return (
            <NavLink
              key={item.name}
              to={item.href}
              className={({ isActive }) =>
                cn(
                  "sidebar-item",
                  isActive && "active"
                )
              }
              onClick={onClose}
            >
              <ApperIcon name={item.icon} size={20} />
              <span>{item.name}</span>
            </NavLink>
          );
        })}
      </nav>

      {/* Footer */}
      <div className="p-6 border-t border-gray-200 dark:border-discord-tertiary">
        <div className="text-center">
          <p className="text-xs text-gray-500 dark:text-gray-400 mb-2">
            Version 1.0.0
          </p>
          <div className="flex items-center justify-center gap-2 text-xs text-gray-500 dark:text-gray-400">
            <ApperIcon name="Heart" size={12} className="text-discord-red" />
            <span>Made with Discord.js</span>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop Sidebar */}
      <div className="hidden lg:flex lg:w-80 lg:flex-col lg:fixed lg:inset-y-0 lg:bg-white lg:dark:bg-discord-surface lg:border-r lg:border-gray-200 lg:dark:border-discord-tertiary">
        <SidebarContent />
      </div>

      {/* Mobile Sidebar Overlay */}
      {isOpen && (
        <div className="lg:hidden fixed inset-0 z-50 flex">
          {/* Backdrop */}
          <div 
            className="fixed inset-0 bg-black/50 backdrop-blur-sm"
            onClick={onClose}
          />
          
          {/* Sidebar */}
          <div className="relative w-80 bg-white dark:bg-discord-surface shadow-discord-lg transform transition-transform duration-300 ease-out">
            <SidebarContent />
          </div>
        </div>
      )}
    </>
  );
};

export default Sidebar;