import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { motion } from "framer-motion";
import { toast } from "react-toastify";
import ApperIcon from "@/components/ApperIcon";
import Button from "@/components/atoms/Button";
import Input from "@/components/atoms/Input";
import Badge from "@/components/atoms/Badge";
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
  createEmbedMessage
} from "@/services/api/guildService";

const ServerDashboardPage = () => {
  const { serverId } = useParams();
  const navigate = useNavigate();
  const { isAuthenticated, user } = useSelector((state) => state.auth);
  
  const [guild, setGuild] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState("overview");
  
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
    { id: "overview", name: "Overview", icon: "BarChart3" },
    { id: "responders", name: "Auto Responders", icon: "MessageSquare" },
    { id: "embeds", name: "Embed Builder", icon: "Layout" },
    { id: "settings", name: "Settings", icon: "Settings" }
  ];

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