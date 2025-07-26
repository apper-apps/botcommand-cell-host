import React from "react";
import ApperIcon from "@/components/ApperIcon";
import Badge from "@/components/atoms/Badge";
import Button from "@/components/atoms/Button";

const ServerCard = ({ guild, onSelect, onAddBot }) => {
  const getServerIcon = () => {
    if (guild.icon) {
      return (
        <img 
          src={`https://cdn.discordapp.com/icons/${guild.id}/${guild.icon}.png`} 
          alt={guild.name}
          className="w-full h-full object-cover rounded-lg"
        />
      );
    }
    
    return (
      <div className="w-full h-full bg-gradient-to-br from-discord-blurple to-discord-dark rounded-lg flex items-center justify-center">
        <span className="text-white font-bold text-xl">
          {guild.name.charAt(0).toUpperCase()}
        </span>
      </div>
    );
  };

  return (
    <div className="card p-6 hover:shadow-discord-lg transition-all duration-300 hover:scale-[1.02]">
      <div className="flex items-start gap-4 mb-4">
        <div className="w-16 h-16 flex-shrink-0">
          {getServerIcon()}
        </div>
        
        <div className="flex-grow min-w-0">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white font-poppins truncate">
            {guild.name}
          </h3>
          
          <div className="flex items-center gap-2 mt-2">
            {guild.owner && (
              <Badge variant="warning" size="sm">
                <ApperIcon name="Crown" size={12} className="mr-1" />
                Owner
              </Badge>
            )}
            
            <Badge variant={guild.botPresent ? "online" : "offline"} size="sm">
              <ApperIcon 
                name={guild.botPresent ? "CheckCircle" : "XCircle"} 
                size={12} 
                className="mr-1" 
              />
              {guild.botPresent ? "Bot Added" : "Bot Missing"}
            </Badge>
          </div>
        </div>
      </div>

      <div className="flex gap-2">
        {guild.botPresent ? (
          <Button
            variant="primary"
            size="sm"
            icon="Settings"
            onClick={() => onSelect(guild)}
            className="flex-1"
          >
            Manage Server
          </Button>
        ) : (
          <>
            <Button
              variant="outline"
              size="sm"
              icon="Plus"
              onClick={() => onAddBot(guild)}
              className="flex-1"
            >
              Add Bot
            </Button>
            <Button
              variant="ghost"
              size="sm"
              icon="ExternalLink"
              onClick={() => window.open(`https://discord.com/channels/${guild.id}`, "_blank")}
            >
              Open Discord
            </Button>
          </>
        )}
      </div>
    </div>
  );
};

export default ServerCard;