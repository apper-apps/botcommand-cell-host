import guildsData from "@/services/mockData/guilds.json";
import autoRespondersData from "@/services/mockData/autoResponders.json";
import embedMessagesData from "@/services/mockData/embedMessages.json";
import commandsData from "@/services/mockData/commands.json";

// Guild operations
export const getUserGuilds = async () => {
  await new Promise(resolve => setTimeout(resolve, 400));
  return [...guildsData];
};

export const getGuildById = async (guildId) => {
  await new Promise(resolve => setTimeout(resolve, 300));
  
  const guild = guildsData.find(g => g.id === guildId);
  if (!guild) {
    throw new Error("Server not found");
  }
  
  return { ...guild };
};

// Auto-responder operations
export const getAutoResponders = async (guildId) => {
  await new Promise(resolve => setTimeout(resolve, 350));
  
  return autoRespondersData
    .filter(responder => responder.guildId === guildId)
    .map(responder => ({ ...responder }));
};

export const createAutoResponder = async (guildId, responderData) => {
  await new Promise(resolve => setTimeout(resolve, 400));
  
  const maxId = Math.max(...autoRespondersData.map(r => r.Id), 0);
  const newResponder = {
    Id: maxId + 1,
    guildId,
    ...responderData,
    createdAt: new Date().toISOString()
  };
  
  autoRespondersData.push(newResponder);
  return { ...newResponder };
};

export const updateAutoResponder = async (guildId, responderId, updates) => {
  await new Promise(resolve => setTimeout(resolve, 350));
  
  const responderIndex = autoRespondersData.findIndex(
    r => r.Id === parseInt(responderId) && r.guildId === guildId
  );
  
  if (responderIndex === -1) {
    throw new Error("Auto-responder not found");
  }
  
  autoRespondersData[responderIndex] = {
    ...autoRespondersData[responderIndex],
    ...updates,
    updatedAt: new Date().toISOString()
  };
  
  return { ...autoRespondersData[responderIndex] };
};

export const deleteAutoResponder = async (guildId, responderId) => {
  await new Promise(resolve => setTimeout(resolve, 300));
  
  const responderIndex = autoRespondersData.findIndex(
    r => r.Id === parseInt(responderId) && r.guildId === guildId
  );
  
  if (responderIndex === -1) {
    throw new Error("Auto-responder not found");
  }
  
  autoRespondersData.splice(responderIndex, 1);
  return true;
};

// Embed message operations
export const getEmbedMessages = async (guildId) => {
  await new Promise(resolve => setTimeout(resolve, 350));
  
  return embedMessagesData
    .filter(embed => embed.guildId === guildId)
    .map(embed => ({ ...embed }));
};

export const createEmbedMessage = async (guildId, embedData) => {
  await new Promise(resolve => setTimeout(resolve, 400));
  
  const maxId = Math.max(...embedMessagesData.map(e => e.Id), 0);
  const newEmbed = {
    Id: maxId + 1,
    guildId,
    ...embedData,
    createdAt: new Date().toISOString()
  };
  
  embedMessagesData.push(newEmbed);
  return { ...newEmbed };
};

export const updateEmbedMessage = async (guildId, embedId, updates) => {
  await new Promise(resolve => setTimeout(resolve, 350));
  
  const embedIndex = embedMessagesData.findIndex(
    e => e.Id === parseInt(embedId) && e.guildId === guildId
  );
  
  if (embedIndex === -1) {
    throw new Error("Embed message not found");
  }
  
  embedMessagesData[embedIndex] = {
    ...embedMessagesData[embedIndex],
    ...updates,
    updatedAt: new Date().toISOString()
  };
  
  return { ...embedMessagesData[embedIndex] };
};

export const deleteEmbedMessage = async (guildId, embedId) => {
  await new Promise(resolve => setTimeout(resolve, 300));
  
  const embedIndex = embedMessagesData.findIndex(
    e => e.Id === parseInt(embedId) && e.guildId === guildId
  );
  
  if (embedIndex === -1) {
    throw new Error("Embed message not found");
  }
  
  embedMessagesData.splice(embedIndex, 1);
  return true;
};

// Analytics functions for dashboard
export const getCommandAnalytics = async (guildId, timePeriod = "7d") => {
  await new Promise(resolve => setTimeout(resolve, 400));
  
  // Generate mock analytics data based on commands
  const totalCommands = commandsData.length;
  const usageToday = Math.floor(Math.random() * 200) + 50;
  const peakHour = `${Math.floor(Math.random() * 12) + 9}:00`;
  const activeUsers = Math.floor(Math.random() * 50) + 10;
  
  const categoryDistribution = [
    { name: "Administrative", count: commandsData.filter(c => c.category === "admin").length },
    { name: "General", count: commandsData.filter(c => c.category === "general").length },
    { name: "Games", count: commandsData.filter(c => c.category === "games").length }
  ];

  return {
    totalCommands,
    usageToday,
    peakHour,
    activeUsers,
    categoryDistribution
  };
};

export const getUsageFrequency = async (guildId, timePeriod = "7d") => {
  await new Promise(resolve => setTimeout(resolve, 350));
  
  const days = timePeriod === "24h" ? 24 : timePeriod === "7d" ? 7 : timePeriod === "30d" ? 30 : 90;
  const labels = [];
  const adminData = [];
  const generalData = [];
  const gamesData = [];
  
  for (let i = days - 1; i >= 0; i--) {
    if (timePeriod === "24h") {
      labels.push(`${23 - i}:00`);
    } else {
      const date = new Date();
      date.setDate(date.getDate() - i);
      labels.push(date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }));
    }
    
    adminData.push(Math.floor(Math.random() * 50) + 10);
    generalData.push(Math.floor(Math.random() * 30) + 5);
    gamesData.push(Math.floor(Math.random() * 20) + 2);
  }
  
  return {
    labels,
    series: [
      { name: "Administrative", data: adminData },
      { name: "General", data: generalData },
      { name: "Games", data: gamesData }
    ]
  };
};

export const getPeakUsageTimes = async (guildId, timePeriod = "7d") => {
  await new Promise(resolve => setTimeout(resolve, 300));
  
  // Generate heatmap data for 7 days x 24 hours
  const series = [];
  for (let hour = 0; hour < 24; hour++) {
    const data = [];
    for (let day = 0; day < 7; day++) {
      // Simulate peak hours (9-17) and weekend patterns
      let baseUsage = Math.floor(Math.random() * 10) + 1;
      if (hour >= 9 && hour <= 17) baseUsage *= 2; // Work hours
      if (day === 0 || day === 6) baseUsage = Math.floor(baseUsage * 0.7); // Weekends
      data.push(baseUsage);
    }
    series.push({ name: `${hour}:00`, data });
  }
  
  return { series };
};

export const getPopularCommands = async (guildId, timePeriod = "7d") => {
  await new Promise(resolve => setTimeout(resolve, 250));
  
  // Add usage data to commands
  return commandsData.map(command => ({
    ...command,
    usageCount: Math.floor(Math.random() * 100) + 1
  })).sort((a, b) => b.usageCount - a.usageCount);
};