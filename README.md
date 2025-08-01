# IPTV Player

A modern, responsive IPTV player built with React, TypeScript, and Vite. This application allows users to upload M3U/M3U8 playlist files and stream IPTV channels with an intuitive interface.

## Features

- 📺 **M3U/M3U8 Support**: Upload and parse M3U/M3U8 playlist files
- 🎯 **Category Navigation**: Browse channels organized by categories
- 🔍 **Search Functionality**: Search for channels within categories
- 💾 **Persistent Storage**: Automatically saves playlist data locally
- 📱 **Responsive Design**: Works on desktop, tablet, and mobile devices
- 🎮 **Video Controls**: Full-featured video player with controls
- 🖼️ **Channel Logos**: Displays channel logos when available
- ⚡ **Fast Performance**: Built with Vite for optimal development and build speed

## Technologies Used

- **React 18** with TypeScript
- **Vite** for build tooling and development server
- **React Player** for video streaming
- **CSS3** with CSS Custom Properties (variables)
- **ESLint** for code quality

## Getting Started

### Prerequisites

- Node.js 16.x or higher
- npm or yarn package manager

### Installation

1. Clone the repository:
```bash
git clone https://github.com/profalves/iptv-player.git
cd iptv-player
```

2. Install dependencies:
```bash
npm install
# or
yarn install
```

3. Start the development server:
```bash
npm run dev
# or
yarn dev
```

4. Open your browser and navigate to `http://localhost:5173`

## Usage

### Uploading a Playlist

1. Click the **"Upload M3U File"** button in the header
2. Select your M3U or M3U8 playlist file
3. The application will automatically parse and display categories

### Navigation

1. **Categories View**: Browse available channel categories
2. **Channel View**: Click on a category to view its channels
3. **Search**: Use the search bar to find specific channels within a category
4. **Back Navigation**: Use the back button to return to categories

### Playing Channels

1. Select a channel from the list
2. The video player will load and start streaming
3. Use the built-in controls for playback management

### Data Persistence

- Your playlist data is automatically saved to browser storage
- On page refresh, your data will be restored
- Use **"Clear Saved Data"** button to remove stored data

## Sample Playlists

The project includes sample M3U files in the `IPTV-lists-files/` directory:
- `por.m3u` - Portuguese and Brazilian channels
- `playlist_brazil.m3u8` - Brazilian channels
- `combined_playlist.m3u8` - Merged playlist file

## Project Structure

```
src/
├── components/           # React components
│   ├── ChannelList.tsx  # Channel/category listing
│   ├── FileUploader.tsx # File upload component
│   └── Player.tsx       # Video player component
├── hooks/               # Custom React hooks
│   └── useM3uParser.ts # M3U parsing logic
├── types/               # TypeScript type definitions
│   └── index.ts        # Interface definitions
├── App.tsx             # Main application component
├── App.css             # Application styles
└── main.tsx            # Application entry point
```

## Building for Production

```bash
npm run build
# or
yarn build
```

The build files will be generated in the `dist/` directory.

## Customization

### Styling

The application uses CSS custom properties for theming. Modify the `:root` variables in `src/App.css`:

```css
:root {
  --primary-color: #008080;
  --secondary-color: #1a6ca8;
  --background-color: #666;
  --text-color: #333;
  --error-color: #e74c3c;
}
```

### Adding New Features

1. Create new components in the `src/components/` directory
2. Add custom hooks in `src/hooks/` for reusable logic
3. Update type definitions in `src/types/` as needed

## Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/new-feature`
3. Commit your changes: `git commit -am 'Add new feature'`
4. Push to the branch: `git push origin feature/new-feature`
5. Submit a pull request

## License

This project is open source and available under the [MIT License](LICENSE).

## Support

If you encounter any issues or have questions, please [open an issue](https://github.com/profalves/iptv-player/issues) on GitHub.
