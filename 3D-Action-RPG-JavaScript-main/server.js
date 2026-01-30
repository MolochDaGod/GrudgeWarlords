const express = require('express');
const path = require('path');
const cors = require('cors');

const app = express();

// Get port from command line arguments or default to 3001
const args = process.argv.slice(2);
const portArg = args.find(arg => arg.startsWith('--port='));
const PORT = portArg ? parseInt(portArg.split('=')[1]) : 3001;

// Enable CORS
app.use(cors());

// Serve static files from the current directory
app.use(express.static(path.join(__dirname)));

// Serve index.html for root
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// Start server
app.listen(PORT, () => {
    console.log(`
╔═══════════════════════════════════════════════╗
║   🎮 Grudge Warlords RPG Server Running 🎮   ║
╚═══════════════════════════════════════════════╝

🌐 Server URL: http://localhost:${PORT}
📁 Serving from: ${__dirname}

🎯 Test URLs:
   - Outdoor Scene: http://localhost:${PORT}/?scene=outdoor
   - Inn Scene:     http://localhost:${PORT}/?scene=inn
   - Builder:       http://localhost:${PORT}/?scene=builder
   - Debug Mode:    http://localhost:${PORT}/?scene=outdoor&debug=true

✨ New Features:
   - Racalvin character model loaded
   - 70+ animations converted and ready
   - Weapon-based animation system
   - Equipment manager integrated

Press Ctrl+C to stop the server
`);
});

// Handle errors
app.on('error', (error) => {
    if (error.code === 'EADDRINUSE') {
        console.error(`❌ Port ${PORT} is already in use. Try a different port with --port=3002`);
    } else {
        console.error('❌ Server error:', error);
    }
});
