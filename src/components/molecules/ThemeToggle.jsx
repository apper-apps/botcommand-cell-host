import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { toggleTheme } from "@/store/themeSlice";
import ApperIcon from "@/components/ApperIcon";

const ThemeToggle = ({ className = "" }) => {
  const dispatch = useDispatch();
  const theme = useSelector((state) => state.theme.mode);

  const handleToggle = () => {
    dispatch(toggleTheme());
  };

  return (
    <button
      onClick={handleToggle}
      className={`p-2 rounded-lg bg-gray-100 dark:bg-discord-tertiary hover:bg-gray-200 dark:hover:bg-discord-secondary transition-all duration-200 hover:scale-110 ${className}`}
      title={`Switch to ${theme === "light" ? "dark" : "light"} mode`}
    >
      <ApperIcon 
        name={theme === "light" ? "Moon" : "Sun"} 
        size={20} 
        className="text-gray-700 dark:text-gray-300" 
      />
    </button>
  );
};

export default ThemeToggle;