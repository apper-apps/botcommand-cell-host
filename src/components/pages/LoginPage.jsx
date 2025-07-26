import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { loginStart, loginSuccess, loginFailure } from "@/store/authSlice";
import { toast } from "react-toastify";
import ApperIcon from "@/components/ApperIcon";
import Button from "@/components/atoms/Button";
import Loading from "@/components/ui/Loading";
import { authenticateWithDiscord } from "@/services/api/authService";

const LoginPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isLoading } = useSelector((state) => state.auth);

  const handleDiscordLogin = async () => {
    try {
      dispatch(loginStart());
      
      // In a real implementation, this would redirect to Discord OAuth2
      // For demo purposes, we'll simulate successful authentication
      setTimeout(async () => {
        try {
          const authData = await authenticateWithDiscord();
          dispatch(loginSuccess(authData));
          toast.success("Successfully logged in with Discord!");
          navigate("/servers");
        } catch (error) {
          dispatch(loginFailure(error.message));
          toast.error("Failed to authenticate with Discord");
        }
      }, 2000);
      
      // Real implementation would do:
      // window.location.href = "https://discord.com/api/oauth2/authorize?client_id=YOUR_CLIENT_ID&redirect_uri=YOUR_REDIRECT_URI&response_type=code&scope=identify%20guilds";
      
    } catch (error) {
      dispatch(loginFailure(error.message));
      toast.error("Authentication failed");
    }
  };

  if (isLoading) {
    return (
      <div className="max-w-2xl mx-auto text-center py-20">
        <Loading />
        <p className="text-lg text-gray-600 dark:text-gray-400 mt-8">
          Authenticating with Discord...
        </p>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto text-center py-20">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        {/* Discord Icon */}
        <div className="w-24 h-24 mx-auto mb-8 bg-gradient-to-r from-discord-blurple to-discord-dark rounded-2xl flex items-center justify-center">
          <ApperIcon name="MessageCircle" size={48} className="text-white" />
        </div>

        {/* Title */}
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white font-poppins mb-6">
          Connect with Discord
        </h1>

        <p className="text-lg text-gray-600 dark:text-gray-400 mb-12 max-w-lg mx-auto leading-relaxed">
          Sign in with your Discord account to access your servers and configure bot settings.
        </p>

        {/* Login Card */}
        <div className="card p-8 max-w-md mx-auto">
          <div className="space-y-6">
            <div className="text-center">
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white font-poppins mb-2">
                Sign in to continue
              </h2>
              <p className="text-gray-600 dark:text-gray-400">
                We'll redirect you to Discord to authenticate
              </p>
            </div>

            <Button
              variant="primary"
              size="lg"
              icon="LogIn"
              onClick={handleDiscordLogin}
              loading={isLoading}
              className="w-full bg-discord-blurple hover:bg-discord-dark"
            >
              {isLoading ? "Connecting..." : "Login with Discord"}
            </Button>

            <div className="text-center">
              <p className="text-sm text-gray-500 dark:text-gray-400">
                By signing in, you agree to our{" "}
                <button
                  onClick={() => navigate("/terms")}
                  className="text-discord-blurple hover:underline"
                >
                  Terms of Service
                </button>{" "}
                and{" "}
                <button
                  onClick={() => navigate("/privacy")}
                  className="text-discord-blurple hover:underline"
                >
                  Privacy Policy
                </button>
              </p>
            </div>
          </div>
        </div>

        {/* Features */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              icon: "Shield",
              title: "Secure Authentication",
              description: "OAuth2 integration with Discord's secure authentication system"
            },
            {
              icon: "Server",
              title: "Server Management",
              description: "Access and configure settings for all your Discord servers"
            },
            {
              icon: "Zap",
              title: "Instant Setup",
              description: "Get started immediately after connecting your Discord account"
            }
          ].map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.2 + 0.1 * index }}
              className="text-center"
            >
              <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-r from-discord-blurple/20 to-purple-500/20 rounded-xl flex items-center justify-center">
                <ApperIcon name={feature.icon} size={24} className="text-discord-blurple" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white font-poppins mb-2">
                {feature.title}
              </h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default LoginPage;