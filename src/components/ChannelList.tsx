import type { Channel } from '../types';

interface ChannelListProps {
  channels: Channel[];
  onSelectChannel: (channel: Channel) => void;
}

export const ChannelList = ({ channels, onSelectChannel }: ChannelListProps) => {
    console.log('channels:', channels);
  return (
    <div className="channel-list">
      <h2>Channels ({channels.length})</h2>
      <div className="channels-container">
        {channels.map((channel, index) => (
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
              <h3>{channel.name}</h3>
              {channel.groupTitle && <p className="group-title">{channel.tvgId?.split('.')[0]}</p>}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};