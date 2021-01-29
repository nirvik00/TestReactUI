const express = require('express');
const cors = require('cors');
const path = require('path');
const app = express();

app.use(cors());
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.get('/', (req, res) => {
	res.sendFile('index.html');
});

const DataPolyPts = [
	{ x: -103.98, y: -161.43, z: 0 },
	{ x: -137.58, y: 142.37, z: 0 },
	{ x: -77.6, y: 174.87, z: 0 },
	{ x: -29.18, y: 126.67, z: 0 },
	{ x: 125.18, y: 52.6, z: 0 },
	{ x: 203.75, y: -50.98, z: 0 },
	{ x: 111.09, y: -100.32, z: 0 },
	{ x: 48.51, y: -110.79, z: 0 },
	{ x: -10.36, y: -111.88, z: 0 },
];

app.get('/dataPts', (req, res) => {
	res.json(DataPolyPts);
});

app.post('/data', (req, res) => {
	console.log(req.body);
	res.redirect('/');
});

const port = process.env.PORT || 5500;
app.listen(port, () => {
	console.log(`server started on port ${port}`);
});
