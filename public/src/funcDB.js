function postdata(user) {
	axios
		.post('/data', user)
		.then((res) => {
			console.log(user);
		})
		.catch((err) => console.log(err));
}

function getData() {
	var DataPts = [];
	axios
		.get('/dataPts')
		.then((res) => {
			let data = res.data;
			data.forEach((e) => {
				DataPts.push(e);
			});
			console.log(DataPts);
			gen2d(DataPts); // go to 2d functions in func2d.js
		})
		.catch((err) => console.log(err));
}
