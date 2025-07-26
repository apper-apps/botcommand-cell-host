import React from "react";

const Loading = ({ className = "" }) => {
  return (
    <div className={`animate-pulse space-y-6 ${className}`}>
      {/* Header skeleton */}
      <div className="space-y-3">
        <div className="h-8 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 dark:from-discord-tertiary dark:via-discord-surface dark:to-discord-tertiary rounded-lg"></div>
        <div className="h-4 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 dark:from-discord-tertiary dark:via-discord-surface dark:to-discord-tertiary rounded w-3/4"></div>
      </div>
      
      {/* Cards skeleton */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[...Array(6)].map((_, i) => (
          <div key={i} className="card p-6 space-y-4">
            <div className="h-6 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 dark:from-discord-tertiary dark:via-discord-surface dark:to-discord-tertiary rounded"></div>
            <div className="space-y-2">
              <div className="h-4 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 dark:from-discord-tertiary dark:via-discord-surface dark:to-discord-tertiary rounded"></div>
              <div className="h-4 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 dark:from-discord-tertiary dark:via-discord-surface dark:to-discord-tertiary rounded w-5/6"></div>
            </div>
            <div className="h-10 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 dark:from-discord-tertiary dark:via-discord-surface dark:to-discord-tertiary rounded-full"></div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Loading;