import React from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import ApperIcon from "@/components/ApperIcon";
import Button from "@/components/atoms/Button";
import { motion } from "framer-motion";

const HomePage = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useSelector((state) => state.auth);

  const features = [
    {
      icon: "Shield",
      title: "40 Admin Commands",
      description: "Comprehensive administration tools for server management, moderation, and configuration.",
      color: "from-red-500 to-pink-500"
    },
    {
      icon: "Users",
      title: "10 General Commands",
      description: "Essential commands for community interaction and basic bot functionality.",
      color: "from-discord-blurple to-purple-500"
    },
    {
      icon: "Gamepad2",
      title: "7 Fun Games",
      description: "Interactive games to keep your community engaged and entertained.",
      color: "from-discord-green to-emerald-500"
    },
    {
      icon: "Settings",
      title: "Auto Responders",
      description: "Create custom automatic responses for specific triggers in your channels.",
      color: "from-discord-yellow to-orange-500"
    },
    {
      icon: "MessageSquare",
      title: "Embed Builder",
      description: "Design beautiful embed messages with images, fields, and custom styling.",
      color: "from-cyan-500 to-blue-500"
    },
    {
      icon: "Activity",
      title: "Real-time Logs",
      description: "Track all administrative actions with detailed logging and audit trails.",
      color: "from-purple-500 to-indigo-500"
    }
  ];

  const handleAddBot = () => {
    window.open("https://discord.com/api/oauth2/authorize?client_id=YOUR_BOT_ID&permissions=8&scope=bot", "_blank");
  };

  const handleGetStarted = () => {
    if (isAuthenticated) {
      navigate("/servers");
    } else {
      navigate("/login");
    }
  };

  return (
    <div className="max-w-7xl mx-auto">
      {/* Hero Section */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center py-20"
      >
        <div className="w-24 h-24 mx-auto mb-8 bg-gradient-to-r from-discord-blurple to-discord-dark rounded-2xl flex items-center justify-center">
          <ApperIcon name="Bot" size={48} className="text-white" />
        </div>
        
        <h1 className="text-5xl md:text-6xl font-bold text-gray-900 dark:text-white font-poppins mb-6">
          <span className="bg-gradient-to-r from-discord-blurple to-purple-600 bg-clip-text text-transparent">
            BotCommand Hub
          </span>
        </h1>
        
        <p className="text-xl text-gray-600 dark:text-gray-400 mb-12 max-w-3xl mx-auto leading-relaxed">
          The ultimate Discord bot management platform. Configure commands, create auto-responders, 
          and build stunning embed messages through our intuitive web dashboard.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button
            variant="primary"
            size="lg"
            icon="Plus"
            onClick={handleAddBot}
          >
            Add Bot to Server
          </Button>
          
          <Button
            variant="outline"
            size="lg"
            icon="ArrowRight"
            onClick={handleGetStarted}
          >
            Get Started
          </Button>
        </div>
      </motion.div>

      {/* Features Grid */}
      <motion.div 
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20"
      >
        {features.map((feature, index) => (
          <motion.div
            key={feature.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.1 * index }}
            className="card p-8 hover:shadow-discord-lg transition-all duration-300 hover:scale-[1.02] group"
          >
            <div className={`w-16 h-16 bg-gradient-to-r ${feature.color} rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
              <ApperIcon name={feature.icon} size={32} className="text-white" />
            </div>
            
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white font-poppins mb-3">
              {feature.title}
            </h3>
            
            <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
              {feature.description}
            </p>
          </motion.div>
        ))}
      </motion.div>

      {/* Command Categories */}
      <motion.div 
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.4 }}
        className="bg-gradient-to-r from-discord-blurple/10 to-purple-500/10 rounded-2xl p-12 mb-20"
      >
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white font-poppins mb-4">
            Complete Command Suite
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Our bot comes with 57 carefully crafted commands across three categories
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { 
              category: "Administrative", 
              count: 40, 
              icon: "Shield", 
              color: "text-red-500",
              bgColor: "from-red-500/20 to-pink-500/20",
              description: "Moderation, server management, and configuration tools"
            },
            { 
              category: "General", 
              count: 10, 
              icon: "Users", 
              color: "text-discord-blurple",
              bgColor: "from-discord-blurple/20 to-purple-500/20",
              description: "Essential commands for community interaction"
            },
            { 
              category: "Games", 
              count: 7, 
              icon: "Gamepad2", 
              color: "text-discord-green",
              bgColor: "from-discord-green/20 to-emerald-500/20",
              description: "Fun interactive games for server entertainment"
            }
          ].map((category, index) => (
            <div key={category.category} className="text-center">
              <div className={`w-20 h-20 mx-auto mb-4 bg-gradient-to-r ${category.bgColor} rounded-xl flex items-center justify-center`}>
                <ApperIcon name={category.icon} size={36} className={category.color} />
              </div>
              
              <div className="text-4xl font-bold text-gray-900 dark:text-white font-poppins mb-2">
                {category.count}
              </div>
              
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white font-poppins mb-2">
                {category.category}
              </h3>
              
              <p className="text-gray-600 dark:text-gray-400 text-sm">
                {category.description}
              </p>
            </div>
          ))}
        </div>
        
        <div className="text-center mt-10">
          <Button
            variant="primary"
            size="lg"
            icon="Book"
            onClick={() => navigate("/commands")}
          >
            View All Commands
          </Button>
        </div>
      </motion.div>

      {/* CTA Section */}
      <motion.div 
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.6 }}
        className="text-center py-20 bg-gradient-to-r from-discord-blurple/5 to-purple-500/5 rounded-2xl"
      >
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white font-poppins mb-6">
          Ready to enhance your Discord server?
        </h2>
        
        <p className="text-lg text-gray-600 dark:text-gray-400 mb-10 max-w-2xl mx-auto">
          Join thousands of servers already using BotCommand Hub to create better Discord communities.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button
            variant="primary"
            size="lg"
            icon="Plus"
            onClick={handleAddBot}
          >
            Add Bot Now
          </Button>
          
          <Button
            variant="ghost"
            size="lg"
            icon="HelpCircle"
            onClick={() => navigate("/about")}
          >
            Learn More
          </Button>
        </div>
      </motion.div>

      {/* Footer */}
      <footer className="py-12 mt-20 border-t border-gray-200 dark:border-discord-tertiary">
        <div className="text-center">
          <div className="flex items-center justify-center gap-8 mb-6">
            <button
              onClick={() => navigate("/privacy")}
              className="text-gray-600 dark:text-gray-400 hover:text-discord-blurple transition-colors duration-200"
            >
              Privacy Policy
            </button>
            
            <button
              onClick={() => navigate("/terms")}
              className="text-gray-600 dark:text-gray-400 hover:text-discord-blurple transition-colors duration-200"
            >
              Terms of Service
            </button>
          </div>
          
          <p className="text-gray-500 dark:text-gray-400 text-sm">
            © 2024 BotCommand Hub. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;