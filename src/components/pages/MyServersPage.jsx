import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { toast } from "react-toastify";
import { selectGuild } from "@/store/authSlice";
import SearchBar from "@/components/molecules/SearchBar";
import ServerCard from "@/components/molecules/ServerCard";
import Loading from "@/components/ui/Loading";
import Error from "@/components/ui/Error";
import Empty from "@/components/ui/Empty";
import ApperIcon from "@/components/ApperIcon";
import { getUserGuilds } from "@/services/api/guildService";

const MyServersPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isAuthenticated, user } = useSelector((state) => state.auth);
  
  const [guilds, setGuilds] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login");
      return;
    }
    
    loadGuilds();
  }, [isAuthenticated, navigate]);

  const loadGuilds = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await getUserGuilds();
      setGuilds(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleServerSelect = (guild) => {
    dispatch(selectGuild(guild));
    navigate(`/servers/${guild.id}`);
  };

  const handleAddBot = (guild) => {
    const botInviteUrl = `https://discord.com/api/oauth2/authorize?client_id=YOUR_BOT_ID&permissions=8&scope=bot&guild_id=${guild.id}`;
    window.open(botInviteUrl, "_blank");
    toast.info("Redirecting to Discord to add the bot...");
  };

  const filteredGuilds = guilds.filter(guild =>
    guild.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const serversWithBot = guilds.filter(guild => guild.botPresent).length;
  const ownedServers = guilds.filter(guild => guild.owner).length;

  if (loading) return <Loading />;
  if (error) return <Error message={error} onRetry={loadGuilds} />;

  return (
    <div className="max-w-7xl mx-auto">
      {/* Header */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="mb-8"
      >
        <div className="flex items-center gap-4 mb-4">
          {user?.avatar ? (
            <img
              src={user.avatar}
              alt={user.username}
              className="w-16 h-16 rounded-full"
            />
          ) : (
            <div className="w-16 h-16 bg-gradient-to-r from-discord-blurple to-discord-dark rounded-full flex items-center justify-center">
              <ApperIcon name="User" size={32} className="text-white" />
            </div>
          )}
          <div>
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white font-poppins">
              My Servers
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-400">
              Welcome back, {user?.username}!
            </p>
          </div>
        </div>
      </motion.div>

      {/* Stats */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.1 }}
        className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8"
      >
        <div className="card p-6 text-center">
          <div className="text-3xl font-bold text-discord-blurple mb-2 font-poppins">
            {guilds.length}
          </div>
          <div className="text-gray-600 dark:text-gray-400">
            Total Servers
          </div>
        </div>
        
        <div className="card p-6 text-center">
          <div className="text-3xl font-bold text-discord-green mb-2 font-poppins">
            {serversWithBot}
          </div>
          <div className="text-gray-600 dark:text-gray-400">
            Bot Installed
          </div>
        </div>
        
        <div className="card p-6 text-center">
          <div className="text-3xl font-bold text-discord-yellow mb-2 font-poppins">
            {ownedServers}
          </div>
          <div className="text-gray-600 dark:text-gray-400">
            Owned by You
          </div>
        </div>
      </motion.div>

      {/* Search */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="card p-6 mb-8"
      >
        <SearchBar
          value={searchTerm}
          onChange={setSearchTerm}
          placeholder="Search your servers..."
          onClear={() => setSearchTerm("")}
        />
      </motion.div>

      {/* Servers Grid */}
      {filteredGuilds.length === 0 ? (
        <Empty
          title="No servers found"
          description={searchTerm ? "Try adjusting your search terms." : "You don't have access to any Discord servers yet."}
          icon="Server"
          action={searchTerm ? () => setSearchTerm("") : undefined}
          actionText={searchTerm ? "Clear Search" : undefined}
        />
      ) : (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {filteredGuilds.map((guild, index) => (
            <motion.div
              key={guild.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.05 * index }}
            >
              <ServerCard
                guild={guild}
                onSelect={handleServerSelect}
                onAddBot={handleAddBot}
              />
            </motion.div>
          ))}
        </motion.div>
      )}
    </div>
  );
};

export default MyServersPage;