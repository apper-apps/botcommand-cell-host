import React from "react";
import { motion } from "framer-motion";
import ApperIcon from "@/components/ApperIcon";
import Button from "@/components/atoms/Button";

const AboutPage = () => {
  const features = [
    {
      icon: "Shield",
      title: "Comprehensive Administration",
      description: "40 powerful administrative commands covering moderation, server management, role assignment, channel configuration, and advanced server controls."
    },
    {
      icon: "Users",
      title: "Community Engagement",
      description: "10 general-purpose commands designed to enhance community interaction, provide information, and improve user experience."
    },
    {
      icon: "Gamepad2",
      title: "Interactive Entertainment",
      description: "7 engaging games and activities to keep your community active and entertained with fun interactive experiences."
    },
    {
      icon: "Settings",
      title: "Smart Auto-Responses",
      description: "Create intelligent automatic responses with custom triggers, channel-specific rules, and detailed logging for community management."
    },
    {
      icon: "MessageSquare",
      title: "Rich Embed Builder",
      description: "Design beautiful, professional embed messages with custom colors, fields, images, and thumbnails through our intuitive visual editor."
    },
    {
      icon: "Activity",
      title: "Advanced Logging",
      description: "Comprehensive audit trails with real-time logging of all administrative actions, user activities, and bot interactions."
    }
  ];

  const advantages = [
    {
      icon: "Zap",
      title: "Easy Setup",
      description: "Get started in minutes with our streamlined Discord OAuth2 integration and intuitive dashboard interface."
    },
    {
      icon: "Lock",
      title: "Secure & Reliable",
      description: "Built with security-first principles, proper permission handling, and reliable Discord API integration."
    },
    {
      icon: "Smartphone",
      title: "Fully Responsive",
      description: "Manage your Discord servers from any device with our mobile-optimized dashboard interface."
    },
    {
      icon: "Headphones",
      title: "Dedicated Support",
      description: "Join our support server for community help, feature requests, and direct assistance from our team."
    }
  ];

  return (
    <div className="max-w-6xl mx-auto">
      {/* Header */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center py-16"
      >
        <div className="w-20 h-20 mx-auto mb-6 bg-gradient-to-r from-discord-blurple to-discord-dark rounded-2xl flex items-center justify-center">
          <ApperIcon name="Info" size={40} className="text-white" />
        </div>
        
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white font-poppins mb-6">
          About BotCommand Hub
        </h1>
        
        <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto leading-relaxed">
          The most comprehensive Discord bot management platform, designed to simplify server administration 
          and enhance community engagement through powerful automation and intuitive controls.
        </p>
      </motion.div>

      {/* Mission */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.1 }}
        className="card p-8 mb-16 bg-gradient-to-r from-discord-blurple/10 to-purple-500/10"
      >
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white font-poppins mb-6">
            Our Mission
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-4xl mx-auto leading-relaxed">
            We believe Discord server management should be accessible, powerful, and enjoyable. 
            BotCommand Hub bridges the gap between complex bot configuration and user-friendly interfaces, 
            empowering server owners and administrators to create thriving communities without technical barriers.
          </p>
        </div>
      </motion.div>

      {/* Features */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="mb-16"
      >
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white font-poppins mb-4">
            Platform Features
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Everything you need to manage and grow your Discord community
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.1 * index }}
              className="card p-6 hover:shadow-discord-lg transition-all duration-300 hover:scale-[1.02]"
            >
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-gradient-to-r from-discord-blurple/20 to-purple-500/20 rounded-lg flex items-center justify-center flex-shrink-0">
                  <ApperIcon name={feature.icon} size={24} className="text-discord-blurple" />
                </div>
                
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white font-poppins mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* How It Works */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.3 }}
        className="mb-16"
      >
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white font-poppins mb-4">
            How It Works
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Get started with BotCommand Hub in three simple steps
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              step: "1",
              title: "Connect Discord",
              description: "Sign in with your Discord account using secure OAuth2 authentication",
              icon: "LogIn"
            },
            {
              step: "2",
              title: "Add Bot to Server",
              description: "Add our bot to your Discord servers with the required permissions",
              icon: "Plus"
            },
            {
              step: "3",
              title: "Configure & Manage",
              description: "Use our dashboard to configure commands, create auto-responders, and build embeds",
              icon: "Settings"
            }
          ].map((step, index) => (
            <motion.div
              key={step.step}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.1 * index }}
              className="text-center"
            >
              <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-r from-discord-blurple to-discord-dark rounded-full flex items-center justify-center">
                <ApperIcon name={step.icon} size={24} className="text-white" />
              </div>
              
              <div className="text-2xl font-bold text-discord-blurple mb-2 font-poppins">
                Step {step.step}
              </div>
              
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white font-poppins mb-2">
                {step.title}
              </h3>
              
              <p className="text-gray-600 dark:text-gray-400">
                {step.description}
              </p>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Advantages */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.4 }}
        className="mb-16"
      >
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white font-poppins mb-4">
            Why Choose BotCommand Hub?
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Built by Discord community veterans for Discord communities
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {advantages.map((advantage, index) => (
            <motion.div
              key={advantage.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.1 * index }}
              className="flex items-start gap-4 p-6 rounded-lg bg-gray-50 dark:bg-discord-surface/50"
            >
              <div className="w-10 h-10 bg-gradient-to-r from-discord-green/20 to-emerald-500/20 rounded-lg flex items-center justify-center flex-shrink-0">
                <ApperIcon name={advantage.icon} size={20} className="text-discord-green" />
              </div>
              
              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white font-poppins mb-1">
                  {advantage.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  {advantage.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Technical Specs */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.5 }}
        className="card p-8 mb-16"
      >
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white font-poppins mb-4">
            Technical Specifications
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400">
            Built with modern technologies for reliability and performance
          </p>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          {[
            { label: "Commands", value: "57", icon: "Terminal" },
            { label: "Admin Tools", value: "40", icon: "Shield" },
            { label: "Games", value: "7", icon: "Gamepad2" },
            { label: "Uptime", value: "99.9%", icon: "Activity" }
          ].map((stat, index) => (
            <div key={stat.label} className="p-4">
              <div className="w-12 h-12 mx-auto mb-3 bg-gradient-to-r from-discord-blurple/20 to-purple-500/20 rounded-lg flex items-center justify-center">
                <ApperIcon name={stat.icon} size={20} className="text-discord-blurple" />
              </div>
              <div className="text-2xl font-bold text-gray-900 dark:text-white font-poppins mb-1">
                {stat.value}
              </div>
              <div className="text-gray-600 dark:text-gray-400 text-sm">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </motion.div>

      {/* CTA */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.6 }}
        className="text-center py-16 bg-gradient-to-r from-discord-blurple/5 to-purple-500/5 rounded-2xl"
      >
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white font-poppins mb-6">
          Ready to Transform Your Discord Server?
        </h2>
        
        <p className="text-lg text-gray-600 dark:text-gray-400 mb-10 max-w-2xl mx-auto">
          Join thousands of Discord communities already using BotCommand Hub to create 
          better, more engaging server experiences.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button
            variant="primary"
            size="lg"
            icon="ArrowRight"
            onClick={() => window.open("/", "_self")}
          >
            Get Started Now
          </Button>
          
          <Button
            variant="outline"
            size="lg"
            icon="MessageCircle"
            onClick={() => window.open("https://discord.gg/support", "_blank")}
          >
            Join Support Server
          </Button>
        </div>
      </motion.div>
    </div>
  );
};

export default AboutPage;