import { useState } from 'react';
import { useM3uParser } from './hooks/useM3uParser';
import { FileUploader } from './components/FileUploader';
import { ChannelList } from './components/ChannelList';
import { Player } from './components/Player';
import './App.css';
import type { Channel } from './types';

export const App = () => {
  const { parsedData, loading, error, parseM3uFile, clearSavedData } = useM3uParser();
  const [selectedChannel, setSelectedChannel] = useState<Channel | null>(null);

  return (
    <div className="app">
      <header className="app-header">
        <h1>IPTV Player</h1>
        <FileUploader 
          onFileUpload={parseM3uFile} 
          loading={loading} 
          hasData={!!parsedData}
          onClearData={clearSavedData}
        />
        {error && <div className="error-message">{error}</div>}
      </header>

      <main className="app-main">
        {parsedData ? (
          <>
            <div className="content-section">
              <Player channel={selectedChannel} />
            </div>
            <div className="sidebar">
              <ChannelList
                channels={parsedData.channels}
                onSelectChannel={setSelectedChannel}
              />
            </div>
          </>
        ) : (
          <div className="empty-state">
            <p>Upload an M3U file to get started</p>
          </div>
        )}
      </main>
    </div>
  );
};