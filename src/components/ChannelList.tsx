import { useState, useMemo } from 'react';
import type { Channel } from '../types';

interface ChannelListProps {
  channels: Channel[];
  onSelectChannel: (channel: Channel) => void;
}

export const ChannelList = ({ channels, onSelectChannel }: ChannelListProps) => {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');

  const channelsByCategory = useMemo(() => {
    const grouped: Record<string, Channel[]> = {};
    
    channels.forEach(channel => {
      const groupTitle = channel.groupTitle || 'Uncategorized';
      
      const categories = groupTitle.split(';')
        .map(cat => cat.trim())
        .filter(cat => cat.length > 0);
      
      const finalCategories = categories.length > 0 ? categories : ['Uncategorized'];
      
      finalCategories.forEach(category => {
        if (!grouped[category]) {
          grouped[category] = [];
        }
        const exists = grouped[category].some(existingChannel => 
          existingChannel.name === channel.name && existingChannel.url === channel.url
        );
        if (!exists) {
          grouped[category].push(channel);
        }
      });
    });
    
    return grouped;
  }, [channels]);

  const categories = useMemo(() => {
    return Object.keys(channelsByCategory)
      .map(category => ({
        name: category,
        count: channelsByCategory[category].length
      }))
      .sort((a, b) => a.name.localeCompare(b.name));
  }, [channelsByCategory]);

  const filteredChannels = useMemo(() => {
    if (!selectedCategory) return [];
    
    const categoryChannels = channelsByCategory[selectedCategory] || [];
    
    if (!searchTerm) return categoryChannels;
    
    return categoryChannels.filter(channel =>
      channel.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [channelsByCategory, selectedCategory, searchTerm]);

  const handleBackToCategories = () => {
    setSelectedCategory(null);
    setSearchTerm('');
  };

  const handleCategorySelect = (categoryName: string) => {
    setSelectedCategory(categoryName);
    setSearchTerm('');
  };

  const getChannelDisplayName = (channel: Channel) => {
    return channel.tvgId?.split('.')[0] || channel.name;
  };

  return (
    <div className="channel-list">
      {!selectedCategory ? (
        <>
          <h2>Categories ({categories.length})</h2>
          <div className="channels-container">
            {categories.map(category => (
              <div
                key={category.name}
                className="category-item"
                onClick={() => handleCategorySelect(category.name)}
              >
                <div className="category-info">
                  <h3>{category.name}</h3>
                  <p className="channel-count">{category.count} channels</p>
                </div>
                <div className="category-arrow">›</div>
              </div>
            ))}
          </div>
        </>
      ) : (
        <>
          <div className="category-header">
            <button className="back-button" onClick={handleBackToCategories}>
              ‹ Back
            </button>
            <h2>{selectedCategory}</h2>
          </div>
          
          <div className="search-container">
            <input
              type="text"
              placeholder="Search channels..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="search-input"
            />
          </div>

          <div className="channels-container">
            {filteredChannels.length > 0 ? (
              filteredChannels.map((channel, index) => (
                <div
                  key={`${channel.name}-${index}`}
                  className="channel-item"
                  onClick={() => onSelectChannel(channel)}
                >
                  {channel.tvgLogo && (
                    <img
                      src={channel.tvgLogo}
                      alt={channel.name}
                      className="channel-logo"
                      onError={(e) => {
                        (e.target as HTMLImageElement).style.display = 'none';
                      }}
                    />
                  )}
                  <div className="channel-info">
                    <h3>{getChannelDisplayName(channel)}</h3>
                  </div>
                </div>
              ))
            ) : (
              <div className="no-results">
                {searchTerm ? 'No channels found matching your search.' : 'No channels in this category.'}
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
};