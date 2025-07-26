import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import SearchBar from "@/components/molecules/SearchBar";
import CommandCard from "@/components/molecules/CommandCard";
import Badge from "@/components/atoms/Badge";
import Loading from "@/components/ui/Loading";
import Error from "@/components/ui/Error";
import Empty from "@/components/ui/Empty";
import { getCommands } from "@/services/api/commandService";

const CommandsPage = () => {
  const [commands, setCommands] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");

  const categories = [
    { id: "all", name: "All Commands", count: 57 },
    { id: "admin", name: "Administrative", count: 40 },
    { id: "general", name: "General", count: 10 },
    { id: "games", name: "Games", count: 7 }
  ];

  useEffect(() => {
    loadCommands();
  }, []);

  const loadCommands = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await getCommands();
      setCommands(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const filteredCommands = commands.filter(command => {
    const matchesSearch = command.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         command.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === "all" || command.category === selectedCategory;
    
    return matchesSearch && matchesCategory;
  });

  if (loading) return <Loading />;
  if (error) return <Error message={error} onRetry={loadCommands} />;

  return (
    <div className="max-w-7xl mx-auto">
      {/* Header */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="mb-8"
      >
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white font-poppins mb-4">
          Bot Commands
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-400 max-w-3xl">
          Explore all 57 available commands across administrative, general, and gaming categories. 
          Each command includes usage examples and permission requirements.
        </p>
      </motion.div>

      {/* Filters */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.1 }}
        className="card p-6 mb-8"
      >
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Search */}
          <div className="flex-1">
            <SearchBar
              value={searchTerm}
              onChange={setSearchTerm}
              placeholder="Search commands..."
              onClear={() => setSearchTerm("")}
            />
          </div>
          
          {/* Category Filter */}
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 hover:scale-105 ${
                  selectedCategory === category.id
                    ? "bg-discord-blurple text-white shadow-lg"
                    : "bg-gray-100 dark:bg-discord-tertiary text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-discord-secondary"
                }`}
              >
                {category.name}
                <Badge variant="default" size="sm" className="ml-2">
                  {category.count}
                </Badge>
              </button>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Results */}
      {filteredCommands.length === 0 ? (
        <Empty
          title="No commands found"
          description="Try adjusting your search terms or category filter."
          icon="Search"
          action={() => {
            setSearchTerm("");
            setSelectedCategory("all");
          }}
          actionText="Clear Filters"
        />
      ) : (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6"
        >
          {filteredCommands.map((command, index) => (
            <motion.div
              key={command.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.05 * index }}
            >
              <CommandCard command={command} />
            </motion.div>
          ))}
        </motion.div>
      )}

      {/* Stats Footer */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.3 }}
        className="mt-12 p-6 bg-gradient-to-r from-discord-blurple/10 to-purple-500/10 rounded-xl text-center"
      >
        <p className="text-gray-600 dark:text-gray-400">
          Showing <span className="font-semibold text-discord-blurple">{filteredCommands.length}</span> of{" "}
          <span className="font-semibold text-discord-blurple">{commands.length}</span> total commands
        </p>
      </motion.div>
    </div>
  );
};

export default CommandsPage;