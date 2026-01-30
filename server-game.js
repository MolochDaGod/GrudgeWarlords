const express = require('express');
const path = require('path');
const cors = require('cors');
const compression = require('compression');

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(compression());

// Serve static files from the 3D-Action-RPG-JavaScript-main directory
app.use(express.static(path.join(__dirname, '3D-Action-RPG-JavaScript-main')));

// Serve assets
app.use('/assets', express.static(path.join(__dirname, '3D-Action-RPG-JavaScript-main/assets')));
app.use('/lib', express.static(path.join(__dirname, '3D-Action-RPG-JavaScript-main/lib')));
app.use('/src', express.static(path.join(__dirname, '3D-Action-RPG-JavaScript-main/src')));

// Main route - serve the game
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '3D-Action-RPG-JavaScript-main', 'index.html'));
});

// Health check
app.get('/health', (req, res) => {
    res.json({ status: 'ok', service: 'game', port: PORT });
});

app.listen(PORT, () => {
    console.log(`🎮 Game Server running at http://localhost:${PORT}`);
    console.log(`📂 Serving from: 3D-Action-RPG-JavaScript-main`);
    console.log(`\n🎯 Available scenes:`);
    console.log(`   - Outdoor: http://localhost:${PORT}/?scene=outdoor`);
    console.log(`   - Indoor: http://localhost:${PORT}/?scene=indoor`);
    console.log(`   - Inn: http://localhost:${PORT}/?scene=inn`);
    console.log(`   - Builder: http://localhost:${PORT}/?scene=builder`);
    console.log(`   - Town: http://localhost:${PORT}/?scene=town`);
    console.log(`\n🔧 Debug mode: Add &debug=true to any URL`);
});

