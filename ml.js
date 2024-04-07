const express = require('express');
const { exec } = require('child_process');
const { join } = require('path');
const mime = require('mime-types');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.static('public'));

app.use(express.json());

app.get("/", (req, res) => {
    res.sendFile(join(__dirname, 'ml.html'));
});

app.get('/index.js', (req, res) => {
    const filePath = join(__dirname, 'index.js');
    const contentType = mime.lookup(filePath);
    res.setHeader('Content-Type', contentType);
    res.sendFile(filePath);
});

// app.post('/predict', (req, res) => {
//     const { x_test } = req.body;
//     console.log(x_test);
//     const scriptPath = join(__dirname, 'ml.py');
//     const optionsString = options.join(' ');
//     exec(`python ${scriptPath} ${optionsString}`, (error, stdout, stderr) => {
//         if (error) {
//             console.error(`Error executing Python script: ${error.message}`);
//             return res.status(500).json({ error: 'Internal server error' });
//         }
//         if (stderr) {
//             console.error(`Python script error: ${stderr}`);
//             return res.status(500).json({ error: 'Internal server error' });
//         }
        
//         const result = stdout.trim(); // Trim any whitespace
//         console.log(`Python output: ${result}`);
//         res.json({ result });
//     });
// });

app.post('/predict', (req, res) => {
    const options = req.body.options;
    if (!options || !Array.isArray(options)) {
        return res.status(400).json({ error: 'Invalid options provided' });
    }
    const scriptPath = join(__dirname, 'ml.py');
    const optionsString = options.join(' ');
    exec(`python ${scriptPath} ${optionsString}`, (error, stdout, stderr) => {
        if (error) {
            console.error(`Error executing Python script: ${error.message}`);
            return res.status(500).json({ error: 'Internal server error' });
        }
        if (stderr) {
            console.error(`Python script error: ${stderr}`);
            return res.status(500).json({ error: 'Internal server error' });
        }
        
        const result = stdout.trim();
        console.log(`Python output: ${result}`);
        res.json({ result });
    });
});



app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});