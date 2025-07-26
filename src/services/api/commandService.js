import commandsData from "@/services/mockData/commands.json";

export const getCommands = async () => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 300));
  
  return [...commandsData];
};

export const getCommandById = async (commandId) => {
  await new Promise(resolve => setTimeout(resolve, 200));
  
  const command = commandsData.find(cmd => cmd.id === commandId);
  if (!command) {
    throw new Error("Command not found");
  }
  
  return { ...command };
};

export const searchCommands = async (query, category = null) => {
  await new Promise(resolve => setTimeout(resolve, 250));
  
  let results = [...commandsData];
  
  if (query) {
    const searchTerm = query.toLowerCase();
    results = results.filter(command =>
      command.name.toLowerCase().includes(searchTerm) ||
      command.description.toLowerCase().includes(searchTerm) ||
      command.category.toLowerCase().includes(searchTerm)
    );
  }
  
  if (category && category !== "all") {
    results = results.filter(command => command.category === category);
  }
  
  return results;
};

export const getCommandsByCategory = async (category) => {
  await new Promise(resolve => setTimeout(resolve, 200));
  
  if (category === "all") {
    return [...commandsData];
  }
  
  return commandsData.filter(command => command.category === category);
};