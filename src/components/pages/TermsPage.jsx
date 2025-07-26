import React from "react";
import { motion } from "framer-motion";
import ApperIcon from "@/components/ApperIcon";

const TermsPage = () => {
  const sections = [
    {
      title: "Acceptance of Terms",
      icon: "FileCheck",
      content: [
        {
          subtitle: "Agreement to Terms",
          text: "By accessing or using BotCommand Hub, you agree to be bound by these Terms of Service and all applicable laws and regulations. If you do not agree with any of these terms, you are prohibited from using our services."
        },
        {
          subtitle: "Age Requirements",
          text: "You must be at least 13 years old to use our services, in compliance with Discord's Terms of Service and applicable privacy laws. Users under 18 should have parental consent."
        },
        {
          subtitle: "Account Responsibility",
          text: "You are responsible for maintaining the security of your account and for all activities that occur under your account. You must immediately notify us of any unauthorized use."
        }
      ]
    },
    {
      title: "Service Description",
      icon: "Bot",
      content: [
        {
          subtitle: "Platform Purpose",
          text: "BotCommand Hub provides a web-based dashboard for managing Discord bot configurations, including command settings, auto-responders, and embed message creation."
        },
        {
          subtitle: "Bot Functionality",
          text: "Our Discord bot provides 57 commands across administrative, general, and gaming categories. Administrative commands require proper Discord permissions and server roles."
        },
        {
          subtitle: "Service Availability",
          text: "We strive to maintain high service availability but cannot guarantee uninterrupted access. Scheduled maintenance will be announced in advance when possible."
        }
      ]
    },
    {
      title: "User Responsibilities",
      icon: "UserCheck",
      content: [
        {
          subtitle: "Lawful Use",
          text: "You agree to use our services only for lawful purposes and in accordance with Discord's Terms of Service, Community Guidelines, and all applicable local, state, and federal laws."
        },
        {
          subtitle: "Content Standards",
          text: "You are responsible for all content you create through our platform, including auto-responders and embed messages. Content must not violate Discord's policies or contain illegal, harmful, or inappropriate material."
        },
        {
          subtitle: "Server Management",
          text: "You must have appropriate permissions to manage Discord servers where you use our bot. Unauthorized use of our services on servers without proper permissions is prohibited."
        },
        {
          subtitle: "Prohibited Activities",
          text: "You may not use our services to spam, harass, abuse, or engage in any activities that could harm our platform, Discord, or other users. This includes attempting to exploit or reverse engineer our systems."
        }
      ]
    },
    {
      title: "Discord Integration",
      icon: "MessageCircle",
      content: [
        {
          subtitle: "Third-Party Service",
          text: "Our platform integrates with Discord through their API. Your use of Discord-related features is subject to Discord's Terms of Service and Community Guidelines."
        },
        {
          subtitle: "Permissions & Access",
          text: "Our bot requires specific Discord permissions to function properly. You grant us permission to access your Discord account information and server data as necessary to provide our services."
        },
        {
          subtitle: "Discord Policy Compliance",
          text: "You must ensure that your use of our bot complies with Discord's policies. We reserve the right to disable features or terminate access if Discord policy violations are detected."
        }
      ]
    },
    {
      title: "Intellectual Property",
      icon: "Copyright",
      content: [
        {
          subtitle: "Platform Ownership",
          text: "BotCommand Hub, including its code, design, features, and documentation, is owned by us and protected by intellectual property laws. You may not copy, modify, or distribute our platform."
        },
        {
          subtitle: "User Content",
          text: "You retain ownership of content you create through our platform. However, you grant us a license to store, process, and display your content as necessary to provide our services."
        },
        {
          subtitle: "Trademark Usage",
          text: "Our trademarks, logos, and brand names may not be used without explicit written permission. Discord and related trademarks are property of Discord Inc."
        }
      ]
    },
    {
      title: "Privacy & Data",
      icon: "Shield",
      content: [
        {
          subtitle: "Data Collection",
          text: "We collect and process your data as described in our Privacy Policy. By using our services, you consent to such collection and processing in accordance with our privacy practices."
        },
        {
          subtitle: "Data Security",
          text: "We implement reasonable security measures to protect your data, but cannot guarantee absolute security. You acknowledge the inherent risks of data transmission over the internet."
        },
        {
          subtitle: "Data Retention",
          text: "We retain your data only as long as necessary to provide services or as required by law. You may request data deletion through your account settings."
        }
      ]
    },
    {
      title: "Service Modifications",
      icon: "Settings",
      content: [
        {
          subtitle: "Right to Modify",
          text: "We reserve the right to modify, suspend, or discontinue any aspect of our services at any time, with or without notice, though we will attempt to provide reasonable advance notice for significant changes."
        },
        {
          subtitle: "Feature Updates",
          text: "We may add, remove, or modify features to improve our services. Some changes may require updates to these terms, which will be communicated to users."
        },
        {
          subtitle: "Pricing Changes",
          text: "If we introduce paid features in the future, pricing and billing terms will be clearly communicated. Current free features will remain free for existing users."
        }
      ]
    },
    {
      title: "Limitation of Liability",
      icon: "AlertTriangle",
      content: [
        {
          subtitle: "Service Disclaimer",
          text: "Our services are provided 'as is' without warranties of any kind. We disclaim all warranties, express or implied, including merchantability and fitness for a particular purpose."
        },
        {
          subtitle: "Damage Limitations",
          text: "In no event shall we be liable for any indirect, incidental, special, or consequential damages arising from your use of our services, even if we have been advised of the possibility of such damages."
        },
        {
          subtitle: "Maximum Liability",
          text: "Our total liability to you for all claims arising from your use of our services shall not exceed the amount you have paid us in the 12 months preceding the claim."
        }
      ]
    },
    {
      title: "Termination",
      icon: "XCircle",
      content: [
        {
          subtitle: "Termination Rights",
          text: "Either party may terminate this agreement at any time. We may suspend or terminate your access immediately for violations of these terms or Discord's policies."
        },
        {
          subtitle: "Effect of Termination",
          text: "Upon termination, your access to our services will cease, and we may delete your account data in accordance with our data retention policies."
        },
        {
          subtitle: "Survival",
          text: "Provisions regarding intellectual property, limitation of liability, and dispute resolution shall survive termination of this agreement."
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
        <div className="w-20 h-20 mx-auto mb-6 bg-gradient-to-r from-discord-yellow to-orange-500 rounded-2xl flex items-center justify-center">
          <ApperIcon name="FileText" size={40} className="text-white" />
        </div>
        
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white font-poppins mb-6">
          Terms of Service
        </h1>
        
        <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto leading-relaxed">
          Please read these Terms of Service carefully before using BotCommand Hub. 
          These terms govern your use of our platform and services.
        </p>
        
        <div className="mt-8 p-4 bg-discord-yellow/10 rounded-lg border border-discord-yellow/20">
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

      {/* Important Notice */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.8 }}
        className="card p-8 mt-12 bg-gradient-to-r from-discord-red/10 to-red-500/10 border border-discord-red/20"
      >
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 bg-gradient-to-r from-discord-red/20 to-red-500/20 rounded-lg flex items-center justify-center flex-shrink-0">
            <ApperIcon name="AlertTriangle" size={24} className="text-discord-red" />
          </div>
          
          <div>
            <h2 className="text-xl font-bold text-gray-900 dark:text-white font-poppins mb-3">
              Important Legal Notice
            </h2>
            
            <div className="space-y-3 text-gray-600 dark:text-gray-400">
              <p>
                <strong>Governing Law:</strong> These terms are governed by and construed in accordance with applicable laws. 
                Any disputes will be resolved through binding arbitration or in courts of competent jurisdiction.
              </p>
              
              <p>
                <strong>Severability:</strong> If any provision of these terms is found to be unenforceable, 
                the remaining provisions will continue in full force and effect.
              </p>
              
              <p>
                <strong>Changes to Terms:</strong> We may update these terms periodically. 
                Continued use of our services after changes constitutes acceptance of the updated terms.
              </p>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Contact Information */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.9 }}
        className="card p-8 mt-8 bg-gradient-to-r from-discord-blurple/10 to-purple-500/10"
      >
        <div className="text-center">
          <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-r from-discord-blurple to-discord-dark rounded-xl flex items-center justify-center">
            <ApperIcon name="MessageCircle" size={24} className="text-white" />
          </div>
          
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white font-poppins mb-4">
            Questions About These Terms?
          </h2>
          
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            If you have questions about these Terms of Service or need legal clarification, 
            please contact us before using our services.
          </p>
          
          <div className="space-y-2">
            <p className="text-gray-600 dark:text-gray-400">
              <strong>Email:</strong> legal@botcommandhub.com
            </p>
            <p className="text-gray-600 dark:text-gray-400">
              <strong>Discord:</strong> Join our support server for assistance
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default TermsPage;