import guildsData from "@/services/mockData/guilds.json";
import autoRespondersData from "@/services/mockData/autoResponders.json";
import embedMessagesData from "@/services/mockData/embedMessages.json";

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