import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { motion } from "framer-motion";
import { toast } from "react-toastify";
import Chart from "react-apexcharts";
import ApperIcon from "@/components/ApperIcon";
import Button from "@/components/atoms/Button";
import Input from "@/components/atoms/Input";
import Badge from "@/components/atoms/Badge";
import SearchBar from "@/components/molecules/SearchBar";
import Loading from "@/components/ui/Loading";
import Error from "@/components/ui/Error";
import Empty from "@/components/ui/Empty";
import { 
  getGuildById, 
  getAutoResponders, 
  createAutoResponder, 
  updateAutoResponder,
  deleteAutoResponder,
  getEmbedMessages,
  createEmbedMessage,
  getCommandAnalytics,
  getUsageFrequency,
  getPeakUsageTimes,
  getPopularCommands
} from "@/services/api/guildService";

const ServerDashboardPage = () => {
  const { serverId } = useParams();
  const navigate = useNavigate();
  const { isAuthenticated, user } = useSelector((state) => state.auth);
  
const [guild, setGuild] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState("dashboard");
  
  // Dashboard analytics states
  const [analyticsData, setAnalyticsData] = useState(null);
  const [analyticsLoading, setAnalyticsLoading] = useState(false);
  const [timePeriod, setTimePeriod] = useState("7d");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [sortBy, setSortBy] = useState("usage");
  const [sortOrder, setSortOrder] = useState("desc");
  
  // Auto-responder states
  const [autoResponders, setAutoResponders] = useState([]);
  const [newResponder, setNewResponder] = useState({
    channelId: "",
    trigger: "",
    response: "",
    enabled: true
  });
  
  // Embed builder states
  const [embedMessages, setEmbedMessages] = useState([]);
  const [newEmbed, setNewEmbed] = useState({
    title: "",
    description: "",
    color: "#5865F2",
    thumbnail: "",
    image: "",
    fields: []
  });

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login");
      return;
    }
    
    loadServerData();
  }, [serverId, isAuthenticated, navigate]);

  useEffect(() => {
    if (activeTab === "dashboard") {
      loadAnalyticsData();
    }
  }, [activeTab, timePeriod]);

  const loadServerData = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const [guildData, respondersData, embedsData] = await Promise.all([
        getGuildById(serverId),
        getAutoResponders(serverId),
        getEmbedMessages(serverId)
      ]);
      
      setGuild(guildData);
      setAutoResponders(respondersData);
      setEmbedMessages(embedsData);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const loadAnalyticsData = async () => {
    try {
      setAnalyticsLoading(true);
      
      const [analytics, frequency, peakTimes, popular] = await Promise.all([
        getCommandAnalytics(serverId, timePeriod),
        getUsageFrequency(serverId, timePeriod),
        getPeakUsageTimes(serverId, timePeriod),
        getPopularCommands(serverId, timePeriod)
      ]);
      
      setAnalyticsData({
        overview: analytics,
        frequency,
        peakTimes,
        popular
      });
    } catch (err) {
      toast.error("Failed to load analytics data");
    } finally {
      setAnalyticsLoading(false);
    }
  };

  const handleCreateResponder = async (e) => {
    e.preventDefault();
    
    if (!newResponder.trigger || !newResponder.response) {
      toast.error("Please fill in all required fields");
      return;
    }
    
    try {
      const created = await createAutoResponder(serverId, newResponder);
      setAutoResponders([...autoResponders, created]);
      setNewResponder({ channelId: "", trigger: "", response: "", enabled: true });
      toast.success("Auto-responder created successfully!");
    } catch (err) {
      toast.error("Failed to create auto-responder");
    }
  };

  const handleDeleteResponder = async (responderId) => {
    try {
      await deleteAutoResponder(serverId, responderId);
      setAutoResponders(autoResponders.filter(r => r.id !== responderId));
      toast.success("Auto-responder deleted successfully!");
    } catch (err) {
      toast.error("Failed to delete auto-responder");
    }
  };

  const handleCreateEmbed = async (e) => {
    e.preventDefault();
    
    if (!newEmbed.title && !newEmbed.description) {
      toast.error("Please provide at least a title or description");
      return;
    }
    
    try {
      const created = await createEmbedMessage(serverId, newEmbed);
      setEmbedMessages([...embedMessages, created]);
      setNewEmbed({
        title: "",
        description: "",
        color: "#5865F2",
        thumbnail: "",
        image: "",
        fields: []
      });
      toast.success("Embed message created successfully!");
    } catch (err) {
      toast.error("Failed to create embed message");
    }
  };

  const addEmbedField = () => {
    setNewEmbed({
      ...newEmbed,
      fields: [...newEmbed.fields, { name: "", value: "", inline: false }]
    });
  };

  const updateEmbedField = (index, field, value) => {
    const updatedFields = [...newEmbed.fields];
    updatedFields[index][field] = value;
    setNewEmbed({ ...newEmbed, fields: updatedFields });
  };

  const removeEmbedField = (index) => {
    const updatedFields = newEmbed.fields.filter((_, i) => i !== index);
    setNewEmbed({ ...newEmbed, fields: updatedFields });
  };

  if (loading) return <Loading />;
  if (error) return <Error message={error} onRetry={loadServerData} />;
  if (!guild) return <Error message="Server not found" />;

const tabs = [
    { id: "dashboard", name: "Analytics Dashboard", icon: "BarChart3" },
    { id: "responders", name: "Auto Responders", icon: "MessageSquare" },
    { id: "embeds", name: "Embed Builder", icon: "Layout" },
    { id: "settings", name: "Settings", icon: "Settings" }
  ];

  // Dashboard filter functions
  const filteredCommands = analyticsData?.popular?.filter(command => {
    const matchesSearch = command.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === "all" || command.category === selectedCategory;
    return matchesSearch && matchesCategory;
  }).sort((a, b) => {
    const multiplier = sortOrder === "desc" ? -1 : 1;
    switch (sortBy) {
      case "usage":
        return (a.usageCount - b.usageCount) * multiplier;
      case "name":
        return a.name.localeCompare(b.name) * multiplier;
      case "category":
        return a.category.localeCompare(b.category) * multiplier;
      default:
        return 0;
    }
  }) || [];

  const categories = [
    { id: "all", name: "All Categories" },
    { id: "admin", name: "Administrative" },
    { id: "general", name: "General" },
    { id: "games", name: "Games" }
  ];

  const timePeriods = [
    { id: "24h", name: "Last 24 Hours" },
    { id: "7d", name: "Last 7 Days" },
    { id: "30d", name: "Last 30 Days" },
    { id: "90d", name: "Last 90 Days" }
  ];

  // Chart configurations
  const usageFrequencyChart = {
    options: {
      chart: {
        type: "line",
        toolbar: { show: false },
        background: "transparent"
      },
      theme: { mode: "dark" },
      colors: ["#5865F2", "#57F287", "#FEE75C"],
      stroke: { curve: "smooth", width: 3 },
      xaxis: {
        categories: analyticsData?.frequency?.labels || [],
        labels: { style: { colors: "#9CA3AF" } }
      },
      yaxis: {
        labels: { style: { colors: "#9CA3AF" } }
      },
      grid: {
        borderColor: "#374151",
        strokeDashArray: 3
      },
      tooltip: {
        theme: "dark",
        style: { fontSize: "12px" }
      },
      legend: {
        labels: { colors: "#9CA3AF" }
      }
    },
    series: analyticsData?.frequency?.series || []
  };

  const peakUsageChart = {
    options: {
      chart: {
        type: "heatmap",
        toolbar: { show: false },
        background: "transparent"
      },
      theme: { mode: "dark" },
      colors: ["#5865F2"],
      xaxis: {
        categories: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
        labels: { style: { colors: "#9CA3AF" } }
      },
      yaxis: {
        categories: Array.from({length: 24}, (_, i) => `${i}:00`),
        labels: { style: { colors: "#9CA3AF" } }
      },
      tooltip: {
        theme: "dark",
        custom: function({series, seriesIndex, dataPointIndex, w}) {
          const day = w.globals.labels[dataPointIndex];
          const hour = w.config.yaxis[0].categories[seriesIndex];
          const value = series[seriesIndex][dataPointIndex];
          return `<div class="p-2"><strong>${day} at ${hour}</strong><br/>Commands: ${value}</div>`;
        }
      }
    },
    series: analyticsData?.peakTimes?.series || []
  };

  const categoryDistributionChart = {
    options: {
      chart: {
        type: "donut",
        background: "transparent"
      },
      theme: { mode: "dark" },
      colors: ["#5865F2", "#57F287", "#FEE75C", "#ED4245"],
      labels: analyticsData?.overview?.categoryDistribution?.map(c => c.name) || [],
      legend: {
        position: "bottom",
        labels: { colors: "#9CA3AF" }
      },
      tooltip: {
        theme: "dark",
        y: {
          formatter: function (val) {
            return val + " commands";
          }
        }
      },
      responsive: [{
        breakpoint: 480,
        options: {
          chart: { width: 200 },
          legend: { position: "bottom" }
        }
      }]
    },
    series: analyticsData?.overview?.categoryDistribution?.map(c => c.count) || []
  };

  return (
    <div className="max-w-7xl mx-auto">
      {/* Server Header */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="card p-6 mb-8"
      >
        <div className="flex items-center gap-6">
          <div className="w-20 h-20">
            {guild.icon ? (
              <img 
                src={`https://cdn.discordapp.com/icons/${guild.id}/${guild.icon}.png`} 
                alt={guild.name}
                className="w-full h-full object-cover rounded-xl"
              />
            ) : (
              <div className="w-full h-full bg-gradient-to-br from-discord-blurple to-discord-dark rounded-xl flex items-center justify-center">
                <span className="text-white font-bold text-2xl">
                  {guild.name.charAt(0).toUpperCase()}
                </span>
              </div>
            )}
          </div>
          
          <div className="flex-grow">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white font-poppins mb-2">
              {guild.name}
            </h1>
            
            <div className="flex items-center gap-3">
              <Badge variant="online" size="sm">
                <ApperIcon name="CheckCircle" size={12} className="mr-1" />
                Bot Connected
              </Badge>
              
              {guild.owner && (
                <Badge variant="warning" size="sm">
                  <ApperIcon name="Crown" size={12} className="mr-1" />
                  Owner
                </Badge>
              )}
            </div>
          </div>
          
          <Button
            variant="ghost"
            icon="ExternalLink"
            onClick={() => window.open(`https://discord.com/channels/${guild.id}`, "_blank")}
          >
            Open in Discord
          </Button>
        </div>
      </motion.div>

      {/* Tabs */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.1 }}
        className="card p-2 mb-8"
      >
        <div className="flex flex-wrap gap-2">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all duration-200 hover:scale-105 ${
                activeTab === tab.id
                  ? "bg-discord-blurple text-white shadow-lg"
                  : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-discord-tertiary"
              }`}
            >
              <ApperIcon name={tab.icon} size={18} />
              {tab.name}
            </button>
          ))}
        </div>
      </motion.div>

      {/* Tab Content */}
      <motion.div
        key={activeTab}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        {/* Overview Tab */}
        {activeTab === "overview" && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="card p-6 text-center">
              <div className="text-3xl font-bold text-discord-blurple mb-2 font-poppins">
                {autoResponders.length}
              </div>
              <div className="text-gray-600 dark:text-gray-400">
                Auto Responders
              </div>
            </div>
            
            <div className="card p-6 text-center">
              <div className="text-3xl font-bold text-discord-green mb-2 font-poppins">
                {embedMessages.length}
              </div>
              <div className="text-gray-600 dark:text-gray-400">
                Embed Messages
              </div>
            </div>
            
            <div className="card p-6 text-center">
              <div className="text-3xl font-bold text-discord-yellow mb-2 font-poppins">
                57
              </div>
              <div className="text-gray-600 dark:text-gray-400">
                Available Commands
              </div>
            </div>
          </div>
        )}

        {/* Auto Responders Tab */}
        {activeTab === "responders" && (
          <div className="space-y-8">
            {/* Create Form */}
            <div className="card p-6">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white font-poppins mb-6">
                Create Auto Responder
              </h2>
              
              <form onSubmit={handleCreateResponder} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Input
                    label="Channel ID (Optional)"
                    value={newResponder.channelId}
                    onChange={(e) => setNewResponder({ ...newResponder, channelId: e.target.value })}
                    placeholder="Leave empty for all channels"
                    hint="Specific channel ID where this responder will work"
                  />
                  
                  <Input
                    label="Trigger Word/Phrase *"
                    value={newResponder.trigger}
                    onChange={(e) => setNewResponder({ ...newResponder, trigger: e.target.value })}
                    placeholder="hello"
                    required
                  />
                </div>
                
                <div>
                  <label className="form-label">Response Message *</label>
                  <textarea
                    value={newResponder.response}
                    onChange={(e) => setNewResponder({ ...newResponder, response: e.target.value })}
                    placeholder="Hello there! How can I help you?"
                    className="form-input h-24 resize-vertical"
                    required
                  />
                </div>
                
                <Button type="submit" variant="primary" icon="Plus">
                  Create Auto Responder
                </Button>
              </form>
            </div>

            {/* Existing Responders */}
            <div className="card p-6">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white font-poppins mb-6">
                Existing Auto Responders
              </h2>
              
              {autoResponders.length === 0 ? (
                <Empty
                  title="No auto responders"
                  description="Create your first auto responder to automatically reply to specific messages."
                  icon="MessageSquare"
                />
              ) : (
                <div className="space-y-4">
                  {autoResponders.map((responder) => (
                    <div key={responder.id} className="border border-gray-200 dark:border-discord-tertiary rounded-lg p-4">
                      <div className="flex items-start justify-between">
                        <div className="flex-grow">
                          <div className="flex items-center gap-3 mb-2">
                            <code className="text-sm bg-gray-100 dark:bg-discord-background px-2 py-1 rounded text-discord-blurple">
                              {responder.trigger}
                            </code>
                            <Badge variant={responder.enabled ? "success" : "default"} size="sm">
                              {responder.enabled ? "Enabled" : "Disabled"}
                            </Badge>
                          </div>
                          
                          <p className="text-gray-600 dark:text-gray-400 mb-2">
                            {responder.response}
                          </p>
                          
                          {responder.channelId && (
                            <p className="text-xs text-gray-500 dark:text-gray-400">
                              Channel: {responder.channelId}
                            </p>
                          )}
                        </div>
                        
                        <Button
                          variant="danger"
                          size="sm"
                          icon="Trash2"
                          onClick={() => handleDeleteResponder(responder.id)}
                        >
                          Delete
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}

        {/* Embed Builder Tab */}
        {activeTab === "embeds" && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Builder Form */}
            <div className="card p-6">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white font-poppins mb-6">
                Create Embed Message
              </h2>
              
              <form onSubmit={handleCreateEmbed} className="space-y-4">
                <Input
                  label="Title"
                  value={newEmbed.title}
                  onChange={(e) => setNewEmbed({ ...newEmbed, title: e.target.value })}
                  placeholder="Embed title"
                />
                
                <div>
                  <label className="form-label">Description</label>
                  <textarea
                    value={newEmbed.description}
                    onChange={(e) => setNewEmbed({ ...newEmbed, description: e.target.value })}
                    placeholder="Embed description"
                    className="form-input h-24 resize-vertical"
                  />
                </div>
                
                <Input
                  label="Color"
                  type="color"
                  value={newEmbed.color}
                  onChange={(e) => setNewEmbed({ ...newEmbed, color: e.target.value })}
                />
                
                <Input
                  label="Thumbnail URL"
                  value={newEmbed.thumbnail}
                  onChange={(e) => setNewEmbed({ ...newEmbed, thumbnail: e.target.value })}
                  placeholder="https://example.com/thumbnail.png"
                />
                
                <Input
                  label="Image URL"
                  value={newEmbed.image}
                  onChange={(e) => setNewEmbed({ ...newEmbed, image: e.target.value })}
                  placeholder="https://example.com/image.png"
                />
                
                {/* Fields */}
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <label className="form-label mb-0">Fields</label>
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      icon="Plus"
                      onClick={addEmbedField}
                    >
                      Add Field
                    </Button>
                  </div>
                  
                  <div className="space-y-3">
                    {newEmbed.fields.map((field, index) => (
                      <div key={index} className="border border-gray-200 dark:border-discord-tertiary rounded-lg p-3">
                        <div className="flex items-center justify-between mb-3">
                          <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                            Field {index + 1}
                          </span>
                          <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            icon="X"
                            onClick={() => removeEmbedField(index)}
                          />
                        </div>
                        
                        <div className="grid grid-cols-2 gap-3 mb-3">
                          <Input
                            placeholder="Field name"
                            value={field.name}
                            onChange={(e) => updateEmbedField(index, "name", e.target.value)}
                          />
                          <Input
                            placeholder="Field value"
                            value={field.value}
                            onChange={(e) => updateEmbedField(index, "value", e.target.value)}
                          />
                        </div>
                        
                        <label className="flex items-center gap-2 text-sm">
                          <input
                            type="checkbox"
                            checked={field.inline}
                            onChange={(e) => updateEmbedField(index, "inline", e.target.checked)}
                            className="rounded"
                          />
                          Inline field
                        </label>
                      </div>
                    ))}
                  </div>
                </div>
                
                <Button type="submit" variant="primary" icon="Plus">
                  Create Embed
                </Button>
              </form>
            </div>

            {/* Preview */}
            <div className="card p-6">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white font-poppins mb-6">
                Preview
              </h2>
              
              <div className="border-l-4 rounded p-4 bg-gray-50 dark:bg-discord-background" style={{ borderColor: newEmbed.color }}>
                {newEmbed.title && (
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                    {newEmbed.title}
                  </h3>
                )}
                
                {newEmbed.description && (
                  <p className="text-gray-600 dark:text-gray-400 mb-4">
                    {newEmbed.description}
                  </p>
                )}
                
                {newEmbed.fields.length > 0 && (
                  <div className="space-y-2 mb-4">
                    {newEmbed.fields.map((field, index) => (
                      <div key={index} className={field.inline ? "inline-block w-1/2 pr-2" : "block"}>
                        {field.name && (
                          <div className="font-medium text-gray-900 dark:text-white text-sm">
                            {field.name}
                          </div>
                        )}
                        {field.value && (
                          <div className="text-gray-600 dark:text-gray-400 text-sm">
                            {field.value}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                )}
                
                {newEmbed.thumbnail && (
                  <img src={newEmbed.thumbnail} alt="Thumbnail" className="w-16 h-16 object-cover rounded float-right" />
                )}
                
                {newEmbed.image && (
                  <img src={newEmbed.image} alt="Embed image" className="w-full max-w-md object-cover rounded mt-2" />
                )}
              </div>
            </div>
          </div>
        )}
{/* Analytics Dashboard Tab */}
        {activeTab === "dashboard" && (
          <div className="space-y-6">
            {analyticsLoading ? (
              <Loading />
            ) : analyticsData ? (
              <>
                {/* Dashboard Header */}
                <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                      Command Analytics Dashboard
                    </h2>
                    <p className="text-gray-600 dark:text-gray-400">
                      Analyze command usage patterns and server activity
                    </p>
                  </div>
                  
                  {/* Time Period Selector */}
                  <div className="flex gap-2">
                    {timePeriods.map((period) => (
                      <button
                        key={period.id}
                        onClick={() => setTimePeriod(period.id)}
                        className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                          timePeriod === period.id
                            ? "bg-discord-blurple text-white"
                            : "bg-gray-100 dark:bg-discord-tertiary text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-discord-secondary"
                        }`}
                      >
                        {period.name}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Overview Stats */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="card p-6"
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-gray-600 dark:text-gray-400">Total Commands</p>
                        <p className="text-3xl font-bold text-gray-900 dark:text-white">
                          {analyticsData.overview?.totalCommands || 0}
                        </p>
                      </div>
                      <div className="p-3 bg-discord-blurple/10 rounded-lg">
                        <ApperIcon name="Hash" size={24} className="text-discord-blurple" />
                      </div>
                    </div>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="card p-6"
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-gray-600 dark:text-gray-400">Usage Today</p>
                        <p className="text-3xl font-bold text-gray-900 dark:text-white">
                          {analyticsData.overview?.usageToday || 0}
                        </p>
                      </div>
                      <div className="p-3 bg-discord-green/10 rounded-lg">
                        <ApperIcon name="TrendingUp" size={24} className="text-discord-green" />
                      </div>
                    </div>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="card p-6"
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-gray-600 dark:text-gray-400">Peak Hour</p>
                        <p className="text-3xl font-bold text-gray-900 dark:text-white">
                          {analyticsData.overview?.peakHour || "N/A"}
                        </p>
                      </div>
                      <div className="p-3 bg-discord-yellow/10 rounded-lg">
                        <ApperIcon name="Clock" size={24} className="text-discord-yellow" />
                      </div>
                    </div>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="card p-6"
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-gray-600 dark:text-gray-400">Active Users</p>
                        <p className="text-3xl font-bold text-gray-900 dark:text-white">
                          {analyticsData.overview?.activeUsers || 0}
                        </p>
                      </div>
                      <div className="p-3 bg-purple-500/10 rounded-lg">
                        <ApperIcon name="Users" size={24} className="text-purple-500" />
                      </div>
                    </div>
                  </motion.div>
                </div>

                {/* Charts Row */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {/* Usage Frequency Chart */}
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.4 }}
                    className="card p-6"
                  >
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                        Command Usage Frequency
                      </h3>
                      <ApperIcon name="LineChart" size={20} className="text-gray-500" />
                    </div>
                    <Chart
                      options={usageFrequencyChart.options}
                      series={usageFrequencyChart.series}
                      type="line"
                      height={300}
                    />
                  </motion.div>

                  {/* Category Distribution */}
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.5 }}
                    className="card p-6"
                  >
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                        Category Distribution
                      </h3>
                      <ApperIcon name="PieChart" size={20} className="text-gray-500" />
                    </div>
                    <Chart
                      options={categoryDistributionChart.options}
                      series={categoryDistributionChart.series}
                      type="donut"
                      height={300}
                    />
                  </motion.div>
                </div>

                {/* Peak Usage Heatmap */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 }}
                  className="card p-6"
                >
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                      Peak Usage Times
                    </h3>
                    <ApperIcon name="Calendar" size={20} className="text-gray-500" />
                  </div>
                  <Chart
                    options={peakUsageChart.options}
                    series={peakUsageChart.series}
                    type="heatmap"
                    height={400}
                  />
                </motion.div>

                {/* Popular Commands Section */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.7 }}
                  className="card p-6"
                >
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                      Popular Commands Analysis
                    </h3>
                    <ApperIcon name="Star" size={20} className="text-gray-500" />
                  </div>

                  {/* Filters */}
                  <div className="flex flex-col lg:flex-row gap-4 mb-6">
                    <div className="flex-1">
                      <SearchBar
                        value={searchTerm}
                        onChange={setSearchTerm}
                        placeholder="Search commands..."
                        onClear={() => setSearchTerm("")}
                      />
                    </div>
                    
                    <div className="flex gap-2">
                      <select
                        value={selectedCategory}
                        onChange={(e) => setSelectedCategory(e.target.value)}
                        className="form-input w-auto"
                      >
                        {categories.map((cat) => (
                          <option key={cat.id} value={cat.id}>
                            {cat.name}
                          </option>
                        ))}
                      </select>
                      
                      <select
                        value={sortBy}
                        onChange={(e) => setSortBy(e.target.value)}
                        className="form-input w-auto"
                      >
                        <option value="usage">Sort by Usage</option>
                        <option value="name">Sort by Name</option>
                        <option value="category">Sort by Category</option>
                      </select>
                      
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setSortOrder(sortOrder === "desc" ? "asc" : "desc")}
                        icon={sortOrder === "desc" ? "ArrowDown" : "ArrowUp"}
                      >
                        {sortOrder.toUpperCase()}
                      </Button>
                    </div>
                  </div>

                  {/* Commands List */}
                  <div className="space-y-3">
                    {filteredCommands.length === 0 ? (
                      <Empty
                        title="No commands found"
                        description="Try adjusting your search or filter criteria."
                        icon="Search"
                      />
                    ) : (
                      filteredCommands.slice(0, 10).map((command, index) => (
                        <div
                          key={command.name}
                          className="flex items-center justify-between p-4 bg-gray-50 dark:bg-discord-tertiary rounded-lg hover:bg-gray-100 dark:hover:bg-discord-secondary transition-colors duration-200"
                        >
                          <div className="flex items-center gap-4">
                            <div className="flex items-center justify-center w-8 h-8 bg-discord-blurple text-white rounded-full text-sm font-bold">
                              {index + 1}
                            </div>
                            <div>
                              <h4 className="font-medium text-gray-900 dark:text-white">
                                /{command.name}
                              </h4>
                              <p className="text-sm text-gray-600 dark:text-gray-400">
                                {command.description}
                              </p>
                            </div>
                          </div>
                          
                          <div className="flex items-center gap-3">
                            <Badge
                              variant={command.category === "admin" ? "destructive" : 
                                     command.category === "general" ? "default" : "secondary"}
                              size="sm"
                            >
                              {command.category}
                            </Badge>
                            <div className="text-right">
                              <p className="font-semibold text-gray-900 dark:text-white">
                                {command.usageCount}
                              </p>
                              <p className="text-xs text-gray-500">uses</p>
                            </div>
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                </motion.div>
              </>
            ) : (
              <Empty
                title="No analytics data available"
                description="Analytics data will appear here once commands are used."
                icon="BarChart3"
                action={loadAnalyticsData}
                actionText="Refresh Data"
              />
            )}
          </div>
        )}

        {/* Settings Tab */}
        {activeTab === "settings" && (
          <div className="card p-6">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white font-poppins mb-6">
              Server Settings
            </h2>
            
            <div className="space-y-6">
              <div className="flex items-center justify-between p-4 border border-gray-200 dark:border-discord-tertiary rounded-lg">
                <div>
                  <h3 className="font-semibold text-gray-900 dark:text-white">
                    Logging Channel
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 text-sm">
                    Channel where bot actions will be logged
                  </p>
                </div>
                <Button variant="outline" size="sm">
                  Configure
                </Button>
              </div>
              
              <div className="flex items-center justify-between p-4 border border-gray-200 dark:border-discord-tertiary rounded-lg">
                <div>
                  <h3 className="font-semibold text-gray-900 dark:text-white">
                    Admin Roles
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 text-sm">
                    Roles that can use administrative commands
                  </p>
                </div>
                <Button variant="outline" size="sm">
                  Manage
                </Button>
              </div>
              
              <div className="flex items-center justify-between p-4 border border-gray-200 dark:border-discord-tertiary rounded-lg">
                <div>
                  <h3 className="font-semibold text-gray-900 dark:text-white">
                    Command Prefix
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 text-sm">
                    Default prefix for bot commands
                  </p>
                </div>
                <Button variant="outline" size="sm">
                  Change
                </Button>
              </div>
            </div>
          </div>
        )}
      </motion.div>
    </div>
  );
};

export default ServerDashboardPage;