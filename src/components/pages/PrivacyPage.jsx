import React from "react";
import { motion } from "framer-motion";
import ApperIcon from "@/components/ApperIcon";

const PrivacyPage = () => {
  const sections = [
    {
      title: "Information We Collect",
      icon: "Database",
      content: [
        {
          subtitle: "Discord Account Information",
          text: "When you authenticate with Discord, we collect your Discord user ID, username, avatar, and email address. This information is necessary to provide our services and identify you within our platform."
        },
        {
          subtitle: "Server Information",
          text: "We collect information about Discord servers where you have administrative permissions, including server names, IDs, icons, and your role within each server. This allows us to display your servers and determine your management capabilities."
        },
        {
          subtitle: "Bot Configuration Data",
          text: "We store the bot configurations you create, including auto-responders, embed messages, command settings, and logging preferences. This data is tied to specific Discord servers and is only accessible to authorized server administrators."
        },
        {
          subtitle: "Usage Analytics",
          text: "We collect anonymized usage data to improve our platform, including feature usage statistics, error logs, and performance metrics. This data cannot be used to identify individual users."
        }
      ]
    },
    {
      title: "How We Use Your Information",
      icon: "Settings",
      content: [
        {
          subtitle: "Service Provision",
          text: "Your information is used to provide core platform functionality, including Discord authentication, server management, bot configuration, and command execution."
        },
        {
          subtitle: "Platform Improvement",
          text: "We analyze usage patterns and feedback to enhance our features, fix bugs, and develop new functionality that better serves our users' needs."
        },
        {
          subtitle: "Communication",
          text: "We may use your contact information to send important service updates, security notifications, and respond to support requests. Marketing communications are opt-in only."
        },
        {
          subtitle: "Security & Compliance",
          text: "Your data helps us maintain platform security, prevent abuse, ensure compliance with Discord's Terms of Service, and protect both our users and Discord's ecosystem."
        }
      ]
    },
    {
      title: "Data Sharing & Disclosure",
      icon: "Share",
      content: [
        {
          subtitle: "Discord API Integration",
          text: "We interact with Discord's API to provide our services. Your data is transmitted to Discord according to their privacy policies and terms of service."
        },
        {
          subtitle: "Service Providers",
          text: "We may share data with trusted third-party service providers who assist in platform operation, including hosting services, analytics providers, and customer support tools. These providers are bound by strict confidentiality agreements."
        },
        {
          subtitle: "Legal Requirements",
          text: "We may disclose information when required by law, court order, or government regulation, or when necessary to protect our rights, users' safety, or the security of our platform."
        },
        {
          subtitle: "No Sale of Data",
          text: "We never sell, rent, or trade your personal information to third parties for marketing purposes or monetary gain."
        }
      ]
    },
    {
      title: "Data Security & Protection",
      icon: "Shield",
      content: [
        {
          subtitle: "Encryption",
          text: "All data transmission uses industry-standard TLS encryption. Sensitive data is encrypted at rest using advanced encryption algorithms."
        },
        {
          subtitle: "Access Controls",
          text: "We implement strict access controls ensuring only authorized personnel can access user data, and only when necessary for service provision or support."
        },
        {
          subtitle: "Regular Security Audits",
          text: "Our systems undergo regular security assessments, vulnerability scanning, and penetration testing to identify and address potential security risks."
        },
        {
          subtitle: "Data Retention",
          text: "We retain your data only as long as necessary to provide services or as required by law. You can request data deletion at any time through your account settings."
        }
      ]
    },
    {
      title: "Your Privacy Rights",
      icon: "UserCheck",
      content: [
        {
          subtitle: "Access & Portability",
          text: "You have the right to access all personal data we store about you and request a copy in a portable format."
        },
        {
          subtitle: "Correction & Updates",
          text: "You can update or correct inaccurate personal information through your account settings or by contacting our support team."
        },
        {
          subtitle: "Data Deletion",
          text: "You may request complete deletion of your account and associated data. Note that some information may be retained as required by law or for legitimate business purposes."
        },
        {
          subtitle: "Withdrawal of Consent",
          text: "You can withdraw consent for data processing at any time, though this may limit or prevent access to certain platform features."
        }
      ]
    },
    {
      title: "Cookies & Tracking",
      icon: "Eye",
      content: [
        {
          subtitle: "Essential Cookies",
          text: "We use necessary cookies to maintain your login session, remember your preferences, and ensure platform functionality. These cookies are required for service operation."
        },
        {
          subtitle: "Analytics Cookies",
          text: "With your consent, we use analytics cookies to understand how users interact with our platform, helping us improve user experience and identify popular features."
        },
        {
          subtitle: "Cookie Management",
          text: "You can control cookie settings through your browser preferences. Disabling certain cookies may impact platform functionality."
        }
      ]
    }
  ];

  return (
    <div className="max-w-4xl mx-auto">
      {/* Header */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center py-16"
      >
        <div className="w-20 h-20 mx-auto mb-6 bg-gradient-to-r from-discord-green to-emerald-500 rounded-2xl flex items-center justify-center">
          <ApperIcon name="Lock" size={40} className="text-white" />
        </div>
        
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white font-poppins mb-6">
          Privacy Policy
        </h1>
        
        <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto leading-relaxed">
          Your privacy is important to us. This policy explains how BotCommand Hub collects, 
          uses, and protects your personal information.
        </p>
        
        <div className="mt-8 p-4 bg-discord-green/10 rounded-lg border border-discord-green/20">
          <p className="text-sm text-gray-600 dark:text-gray-400">
            <strong>Last Updated:</strong> November 2024 • <strong>Effective Date:</strong> November 2024
          </p>
        </div>
      </motion.div>

      {/* Content Sections */}
      <div className="space-y-12">
        {sections.map((section, sectionIndex) => (
          <motion.div
            key={section.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 * sectionIndex }}
            className="card p-8"
          >
            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-12 bg-gradient-to-r from-discord-blurple/20 to-purple-500/20 rounded-lg flex items-center justify-center">
                <ApperIcon name={section.icon} size={24} className="text-discord-blurple" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white font-poppins">
                {section.title}
              </h2>
            </div>
            
            <div className="space-y-6">
              {section.content.map((item, itemIndex) => (
                <div key={itemIndex}>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white font-poppins mb-2">
                    {item.subtitle}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                    {item.text}
                  </p>
                </div>
              ))}
            </div>
          </motion.div>
        ))}
      </div>

      {/* Contact Information */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.8 }}
        className="card p-8 mt-12 bg-gradient-to-r from-discord-blurple/10 to-purple-500/10"
      >
        <div className="text-center">
          <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-r from-discord-blurple to-discord-dark rounded-xl flex items-center justify-center">
            <ApperIcon name="MessageCircle" size={24} className="text-white" />
          </div>
          
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white font-poppins mb-4">
            Questions About Privacy?
          </h2>
          
          <p className="text-gray-600 dark:text-gray-400 mb-6 max-w-2xl mx-auto">
            If you have questions about this Privacy Policy, need to exercise your privacy rights, 
            or want to report a privacy concern, please contact us.
          </p>
          
          <div className="space-y-3">
            <p className="text-gray-600 dark:text-gray-400">
              <strong>Email:</strong> privacy@botcommandhub.com
            </p>
            <p className="text-gray-600 dark:text-gray-400">
              <strong>Discord:</strong> Join our support server for immediate assistance
            </p>
            <p className="text-gray-600 dark:text-gray-400">
              <strong>Response Time:</strong> We typically respond within 48 hours
            </p>
          </div>
        </div>
      </motion.div>

      {/* Footer Note */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.9 }}
        className="text-center py-8"
      >
        <div className="p-6 bg-gray-50 dark:bg-discord-surface/50 rounded-lg">
          <p className="text-sm text-gray-500 dark:text-gray-400">
            This Privacy Policy may be updated periodically to reflect changes in our practices or applicable law. 
            We will notify users of significant changes through our platform or via email. 
            Continued use of our services after changes constitutes acceptance of the updated policy.
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default PrivacyPage;