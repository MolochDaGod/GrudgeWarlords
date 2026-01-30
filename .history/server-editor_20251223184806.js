const express = require('express');
const path = require('path');
const cors = require('cors');
const compression = require('compression');

const app = express();
const PORT = process.env.PORT || 5050;

// Middleware
app.use(cors());
app.use(compression());
app.use(express.json());

// Serve static files from the Skill-Tree-Maker-main directory
app.use(express.static(path.join(__dirname, 'Skill-Tree-Maker-main')));

// Serve assets
app.use('/img', express.static(path.join(__dirname, 'Skill-Tree-Maker-main/img')));
app.use('/src', express.static(path.join(__dirname, 'Skill-Tree-Maker-main/src')));
app.use('/lib', express.static(path.join(__dirname, 'Skill-Tree-Maker-main/lib')));

// Main route - serve the skill tree editor
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'Skill-Tree-Maker-main', 'index.html'));
});

// Health check
app.get('/health', (req, res) => {
    res.json({ status: 'ok', service: 'editor', port: PORT });
});

app.listen(PORT, () => {
    console.log(`✏️  Skill Tree Editor running at http://localhost:${PORT}`);
    console.log(`📂 Serving from: Skill-Tree-Maker-main`);
    console.log(`\n🎨 Features:`);
    console.log(`   - Skill tree creation and editing`);
    console.log(`   - Visual node connections`);
    console.log(`   - Export/Import functionality`);
});

