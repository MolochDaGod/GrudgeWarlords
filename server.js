const express = require('express');
const path = require('path');
const cors = require('cors');
const compression = require('compression');

const app = express();
const PORT = process.env.PORT || 8080;

// Middleware
app.use(cors());
app.use(compression());
app.use(express.json());

// Serve static files from root
app.use(express.static(__dirname));

// Main landing page
app.get('/', (req, res) => {
    res.send(`
<!DOCTYPE html>
<html>
<head>
    <title>Grudge Warlords - Development Hub</title>
    <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body {
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
            min-height: 100vh;
            display: flex;
            align-items: center;
            justify-content: center;
            padding: 20px;
        }
        .container {
            max-width: 1200px;
            width: 100%;
        }
        h1 {
            text-align: center;
            font-size: 3em;
            margin-bottom: 20px;
            text-shadow: 2px 2px 4px rgba(0,0,0,0.3);
        }
        .subtitle {
            text-align: center;
            font-size: 1.2em;
            margin-bottom: 50px;
            opacity: 0.9;
        }
        .grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
            gap: 30px;
            margin-bottom: 40px;
        }
        .card {
            background: rgba(255,255,255,0.1);
            backdrop-filter: blur(10px);
            border-radius: 15px;
            padding: 30px;
            border: 1px solid rgba(255,255,255,0.2);
            transition: transform 0.3s, box-shadow 0.3s;
        }
        .card:hover {
            transform: translateY(-5px);
            box-shadow: 0 10px 30px rgba(0,0,0,0.3);
        }
        .card h2 {
            font-size: 1.8em;
            margin-bottom: 15px;
        }
        .card p {
            margin-bottom: 20px;
            opacity: 0.9;
            line-height: 1.6;
        }
        .btn {
            display: inline-block;
            padding: 12px 30px;
            background: white;
            color: #667eea;
            text-decoration: none;
            border-radius: 25px;
            font-weight: bold;
            transition: all 0.3s;
            margin-right: 10px;
            margin-bottom: 10px;
        }
        .btn:hover {
            background: #667eea;
            color: white;
            transform: scale(1.05);
        }
        .reference {
            background: rgba(255,255,255,0.05);
            border-radius: 10px;
            padding: 20px;
            margin-top: 30px;
        }
        .reference h3 {
            margin-bottom: 10px;
        }
        .reference ul {
            list-style: none;
            padding-left: 20px;
        }
        .reference li {
            margin: 8px 0;
            opacity: 0.9;
        }
        .reference li:before {
            content: "→ ";
            margin-right: 10px;
        }
    </style>
</head>
<body>
    <div class="container">
        <h1>🎮 Grudge Warlords</h1>
        <p class="subtitle">3D Action RPG with Generative Island Technology</p>
        
        <div class="grid">
            <div class="card">
                <h2>🎯 Game</h2>
                <p>Play the 3D Action RPG with Babylon.js. Explore multiple scenes, combat enemies, and experience procedural generation.</p>
                <a href="http://localhost:3001" class="btn" target="_blank">Launch Game</a>
                <a href="http://localhost:3001/?scene=builder" class="btn" target="_blank">Builder Mode</a>
            </div>
            
            <div class="card">
                <h2>✏️ Skill Tree Editor</h2>
                <p>Create and edit skill trees for your RPG characters. Visual node-based editor with export/import capabilities.</p>
                <a href="http://localhost:5050" class="btn" target="_blank">Open Editor</a>
            </div>
            
            <div class="card">
                <h2>📚 Reference</h2>
                <p>Original repository cloned for learning and reference. Compare implementations and best practices.</p>
                <a href="./reference-3D-Action-RPG/index.html" class="btn" target="_blank">View Reference</a>
            </div>
        </div>
        
        <div class="reference">
            <h3>📖 Quick Links</h3>
            <ul>
                <li><strong>Game Scenes:</strong> outdoor, indoor, inn, town, builder, underground</li>
                <li><strong>Debug Mode:</strong> Add &debug=true to any game URL</li>
                <li><strong>Project Structure:</strong> /3D-Action-RPG-JavaScript-main (game), /Skill-Tree-Maker-main (editor)</li>
                <li><strong>Reference Repo:</strong> /reference-3D-Action-RPG (original source)</li>
            </ul>
        </div>
    </div>
</body>
</html>
    `);
});

// Health check
app.get('/health', (req, res) => {
    res.json({ 
        status: 'ok', 
        service: 'hub', 
        port: PORT,
        services: {
            game: 'http://localhost:3001',
            editor: 'http://localhost:5050'
        }
    });
});

app.listen(PORT, () => {
    console.log(`\n🌟 Grudge Warlords Development Hub`);
    console.log(`═══════════════════════════════════════════════════════`);
    console.log(`🏠 Hub:    http://localhost:${PORT}`);
    console.log(`🎮 Game:   http://localhost:3001`);
    console.log(`✏️  Editor: http://localhost:5050`);
    console.log(`═══════════════════════════════════════════════════════\n`);
});

