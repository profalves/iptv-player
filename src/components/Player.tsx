import { useState, useEffect } from 'react';
import ReactPlayer from 'react-player';
import type { Channel } from '../types';

interface PlayerProps {
  channel: Channel | null;
}

export const Player = ({ channel }: PlayerProps) => {
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    setHasError(false);
  }, [channel]);

  if (!channel) {
    return (
      <div className="player-container placeholder">
        <p>Select a channel to start playing</p>
      </div>
    );
  }

  return (
    <div className="player-container">
      <h2 className="player-title">{channel.tvgId}</h2>
      <div className="player-wrapper">
        <ReactPlayer
          src={channel.url}
          controls
          width="100%"
          height="100%"
          autoPlay
          onError={() => setHasError(true)}
        />
      </div>
      {hasError && (
        <div className="player-error">
          <p>Failed to play this channel. The stream might be unavailable.</p>
        </div>
      )}
    </div>
  );
};