export interface Channel {
  name: string;
  url: string;
  tvgId?: string;
  tvgName?: string;
  tvgLogo?: string;
  groupTitle?: string;
}

export interface ParsedM3U {
  channels: Channel[];
}