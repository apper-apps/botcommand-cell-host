import React from "react";
import ApperIcon from "@/components/ApperIcon";

const Error = ({ message = "Something went wrong", onRetry, className = "" }) => {
  return (
    <div className={`flex flex-col items-center justify-center py-16 px-8 text-center ${className}`}>
      <div className="w-24 h-24 bg-gradient-to-br from-discord-red/20 to-red-500/20 rounded-full flex items-center justify-center mb-6">
        <ApperIcon 
          name="AlertCircle" 
          size={48} 
          className="text-discord-red"
        />
      </div>
      
      <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-3 font-poppins">
        Oops! Something went wrong
      </h3>
      
      <p className="text-gray-600 dark:text-gray-400 mb-8 max-w-md leading-relaxed">
        {message}
      </p>
      
      {onRetry && (
        <button
          onClick={onRetry}
          className="btn-primary inline-flex items-center gap-2"
        >
          <ApperIcon name="RefreshCw" size={18} />
          Try Again
        </button>
      )}
    </div>
  );
};

export default Error;