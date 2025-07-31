import { useState } from 'react';
import type { Channel, ParsedM3U } from '../types';

export const useM3uParser = () => {
  const [parsedData, setParsedData] = useState<ParsedM3U | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

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

  return { parsedData, loading, error, parseM3uFile };
};