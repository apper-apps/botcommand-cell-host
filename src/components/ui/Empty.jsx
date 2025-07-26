import React from "react";
import ApperIcon from "@/components/ApperIcon";

const Empty = ({ 
  title = "No data found", 
  description = "There's nothing to show here yet.", 
  icon = "Database",
  action,
  actionText = "Get Started",
  className = "" 
}) => {
  return (
    <div className={`flex flex-col items-center justify-center py-16 px-8 text-center ${className}`}>
      <div className="w-24 h-24 bg-gradient-to-br from-discord-blurple/20 to-purple-500/20 rounded-full flex items-center justify-center mb-6">
        <ApperIcon 
          name={icon} 
          size={48} 
          className="text-discord-blurple"
        />
      </div>
      
      <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-3 font-poppins">
        {title}
      </h3>
      
      <p className="text-gray-600 dark:text-gray-400 mb-8 max-w-md leading-relaxed">
        {description}
      </p>
      
      {action && (
        <button
          onClick={action}
          className="btn-primary inline-flex items-center gap-2"
        >
          <ApperIcon name="Plus" size={18} />
          {actionText}
        </button>
      )}
    </div>
  );
};

export default Empty;