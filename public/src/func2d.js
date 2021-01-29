console.log('2d functions ');
function gen2d(dataPts) {
	console.log(dataPts);
	var canvas = document.getElementById('div2dNineSq');
	paper.setup(canvas);
	let tx = 150,
		ty = 200;
	let ptx = [];
	dataPts.forEach((p) => {
		console.log(p);
		let a_ = { x: p.x + tx, y: p.y + ty };
		ptx.push(a_);
	});
	let path = new paper.Path();
	ptx.forEach((p) => {
		path.add(p);
	});
	path.fillColor = 'rgba(255,0,0,0.1)';
	path.strokeColor = 'rgba(0,0,0,0.25)';
	path.strokeWidth = 1;
}
