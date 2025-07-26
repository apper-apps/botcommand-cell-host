// Mock authentication service for Discord OAuth2 integration
export const authenticateWithDiscord = async () => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 500));
  
  // In a real implementation, this would handle Discord OAuth2 flow
  // For demo purposes, return mock authenticated user data
  return {
    user: {
      id: "123456789012345678",
      username: "TestUser",
      discriminator: "1234",
      avatar: "https://cdn.discordapp.com/embed/avatars/0.png",
      email: "user@example.com"
    },
    guilds: [
      {
        id: "987654321098765432",
        name: "Test Server 1",
        icon: null,
        owner: true,
        botPresent: true
      },
      {
        id: "876543210987654321",
        name: "Gaming Community",
        icon: "a1b2c3d4e5f6",
        owner: false,
        botPresent: false
      },
      {
        id: "765432109876543210",
        name: "Study Group",
        icon: null,
        owner: true,
        botPresent: true
      }
    ]
  };
};

export const refreshToken = async () => {
  await new Promise(resolve => setTimeout(resolve, 300));
  return {
    accessToken: "new_access_token",
    refreshToken: "new_refresh_token",
    expiresIn: 3600
  };
};

export const revokeToken = async () => {
  await new Promise(resolve => setTimeout(resolve, 200));
  return true;
};