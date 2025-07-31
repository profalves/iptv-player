import { useState, useEffect } from 'react';
import type { Channel, ParsedM3U } from '../types';

const STORAGE_KEY = 'iptv_m3u_data';

export const useM3uParser = () => {
  const [parsedData, setParsedData] = useState<ParsedM3U | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Load data from localStorage on mount
  useEffect(() => {
    try {
      const savedData = localStorage.getItem(STORAGE_KEY);
      if (savedData) {
        const data = JSON.parse(savedData);
        setParsedData(data);
      }
    } catch (err) {
      console.error('Failed to load saved M3U data:', err);
    }
  }, []);

  // Save data to localStorage whenever parsedData changes
  useEffect(() => {
    if (parsedData) {
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(parsedData));
      } catch (err) {
        console.error('Failed to save M3U data:', err);
      }
    }
  }, [parsedData]);

  const parseM3uFile = async (file: File) => {
    setLoading(true);
    setError(null);

    try {
      const text = await file.text();
      const channels: Channel[] = [];
      const lines = text.split('\n');

      for (let i = 0; i < lines.length; i++) {
        if (lines[i].startsWith('#EXTINF:')) {
          const extinf = lines[i];
          const url = lines[i + 1]?.trim();

          if (url && !url.startsWith('#') && (url.startsWith('http') || url.startsWith('rtmp') || url.startsWith('rtsp'))) {
            const channel: Channel = { name: '', url };

            // Parse EXTINF line
            const tvgIdMatch = extinf.match(/tvg-id="([^"]*)"/);
            const tvgNameMatch = extinf.match(/tvg-name="([^"]*)"/);
            const tvgLogoMatch = extinf.match(/tvg-logo="([^"]*)"/);
            const groupTitleMatch = extinf.match(/group-title="([^"]*)"/);
            const nameMatch = extinf.match(/,(.*)$/);

            if (tvgIdMatch) channel.tvgId = tvgIdMatch[1];
            if (tvgNameMatch) channel.tvgName = tvgNameMatch[1];
            if (tvgLogoMatch) channel.tvgLogo = tvgLogoMatch[1];
            if (groupTitleMatch) channel.groupTitle = groupTitleMatch[1];
            if (nameMatch) channel.name = nameMatch[1].trim();

            channels.push(channel);
          }
        }
      }

      setParsedData({ channels });
    } catch (err) {
      setError('Failed to parse M3U file. Please make sure it is a valid file.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const clearSavedData = () => {
    try {
      localStorage.removeItem(STORAGE_KEY);
      setParsedData(null);
    } catch (err) {
      console.error('Failed to clear saved data:', err);
    }
  };

  return { parsedData, loading, error, parseM3uFile, clearSavedData };
};