import React from "react";
import ApperIcon from "@/components/ApperIcon";
import Badge from "@/components/atoms/Badge";

const CommandCard = ({ command }) => {
  const getCategoryIcon = (category) => {
    switch (category) {
      case "admin": return "Shield";
      case "general": return "Users";
      case "games": return "Gamepad2";
      default: return "Command";
    }
  };

  const getCategoryColor = (category) => {
    switch (category) {
      case "admin": return "danger";
      case "general": return "primary";
      case "games": return "success";
      default: return "default";
    }
  };

  return (
    <div className="card p-6 hover:shadow-discord-lg transition-all duration-300 hover:scale-[1.02]">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-r from-discord-blurple/20 to-purple-500/20 rounded-lg flex items-center justify-center">
            <ApperIcon 
              name={getCategoryIcon(command.category)} 
              size={20} 
              className="text-discord-blurple" 
            />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white font-poppins">
              /{command.name}
            </h3>
            <Badge variant={getCategoryColor(command.category)} size="sm">
              {command.category}
            </Badge>
          </div>
        </div>
      </div>

      <p className="text-gray-600 dark:text-gray-400 mb-4 leading-relaxed">
        {command.description}
      </p>

      <div className="space-y-3">
        <div>
          <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Usage:
          </h4>
          <code className="text-sm bg-gray-100 dark:bg-discord-background px-3 py-1 rounded font-mono text-discord-blurple">
            {command.usage}
          </code>
        </div>

        {command.examples && command.examples.length > 0 && (
          <div>
            <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Examples:
            </h4>
            <div className="space-y-1">
              {command.examples.map((example, index) => (
                <code key={index} className="block text-sm bg-gray-100 dark:bg-discord-background px-3 py-1 rounded font-mono text-gray-600 dark:text-gray-400">
                  {example}
                </code>
              ))}
            </div>
          </div>
        )}

        {command.permissions && command.permissions.length > 0 && (
          <div>
            <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Required Permissions:
            </h4>
            <div className="flex flex-wrap gap-1">
              {command.permissions.map((permission, index) => (
                <Badge key={index} variant="warning" size="sm">
                  {permission}
                </Badge>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CommandCard;