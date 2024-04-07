const express = require('express');
const { exec } = require('child_process');
const { join } = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.static('public'));

app.use(express.json());

app.get("/", (req, res) => {
    res.sendFile(join(__dirname, 'ml.html'));
});

app.post('/predict', (req, res) => {
    const { x_test } = req.body;

    const scriptPath = join(__dirname, 'example.py');
    exec(`python ${scriptPath} ${x_test.join(' ')}`, (error, stdout, stderr) => {
        if (error) {
            console.error(`Error executing Python script: ${error.message}`);
            return res.status(500).json({ error: 'Internal server error' });
        }
        if (stderr) {
            console.error(`Python script error: ${stderr}`);
            return res.status(500).json({ error: 'Internal server error' });
        }
        
        const result = stdout.trim(); // Trim any whitespace
        console.log(`Python output: ${result}`);
        res.json({ result });
    });
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
