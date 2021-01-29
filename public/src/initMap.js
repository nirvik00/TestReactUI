/* function initMap() {
	mapboxgl.accessToken =
		'pk.eyJ1IjoibmlydmlrIiwiYSI6ImNrZnl3dGZrdjA2eHYyeW8xZnc3eDYyNG0ifQ.Rkte6h3OBvW9KaFJi2rAeA';
	var map = new mapboxgl.Map({
		container: 'mapView',
		style: 'mapbox://styles/mapbox/streets-v11', // stylesheet location
		center: [-74.5, 40], // starting position [lng, lat]
		zoom: 9, // starting zoom
	});
} */

let mapCoords = [-71.10971, 42.37365];

mapboxgl.accessToken =
	'pk.eyJ1IjoibmlydmlrIiwiYSI6ImNrZnl3dGZrdjA2eHYyeW8xZnc3eDYyNG0ifQ.Rkte6h3OBvW9KaFJi2rAeA';

var map = new mapboxgl.Map({
	container: 'mapView',
	style: 'mapbox://styles/mapbox/streets-v11',
	zoom: 15,
	center: mapCoords,
});
var draw = new MapboxDraw({
	displayControlsDefault: false,
	controls: {
		polygon: true,
		trash: true,
	},
});
map.addControl(draw);

map.on('draw.create', updateArea);
map.on('draw.delete', updateArea);
map.on('draw.update', updateArea);

function updateArea(e) {
	var data = draw.getAll();
	var answer = document.getElementById('calculated-area');
	if (data.features.length > 0) {
		var area = turf.area(data);
		// restrict to area to 2 decimal points
		var rounded_area = Math.round(area * 100) / 100;
		answer.innerHTML =
			'<p><strong>' + rounded_area + '</strong></p><p>square meters</p>';
	} else {
		answer.innerHTML = '';
		if (e.type !== 'draw.delete')
			alert('Use the draw tools to draw a polygon!');
	}
}

// parameters to ensure the model is georeferenced correctly on the map
var modelOrigin = mapCoords;
var modelAltitude = 0;
var modelRotate = [Math.PI / 2, 0, 0];

var modelAsMercatorCoordinate = mapboxgl.MercatorCoordinate.fromLngLat(
	modelOrigin,
	modelAltitude
);

// transformation parameters to position, rotate and scale the 3D model onto the map
var modelTransform = {
	translateX: modelAsMercatorCoordinate.x,
	translateY: modelAsMercatorCoordinate.y,
	translateZ: modelAsMercatorCoordinate.z,
	rotateX: modelRotate[0],
	rotateY: modelRotate[1],
	rotateZ: modelRotate[2],
	/* Since our 3D model is in real world meters, a scale transform needs to be
	 * applied since the CustomLayerInterface expects units in MercatorCoordinates.
	 */
	scale: modelAsMercatorCoordinate.meterInMercatorCoordinateUnits(),
};

var THREE = window.THREE;

// configuration of the custom layer for a 3D model per the CustomLayerInterface
var customLayer = {
	id: '3d-model',
	type: 'custom',
	renderingMode: '3d',
	onAdd: function (map, gl) {
		this.camera = new THREE.Camera();
		this.scene = new THREE.Scene();

		// create two three.js lights to illuminate the model
		var directionalLight = new THREE.DirectionalLight(0xffffff);
		directionalLight.position.set(0, -70, 100).normalize();
		this.scene.add(directionalLight);

		var directionalLight2 = new THREE.DirectionalLight(0xffffff);
		directionalLight2.position.set(0, 70, 100).normalize();
		this.scene.add(directionalLight2);

		// use the three.js GLTF loader to add the 3D model to the three.js scene
		var loader = new THREE.GLTFLoader();
		loader.load(
			'scene.gltf',
			function (gltf) {
				this.scene.add(gltf.scene);
			}.bind(this)
		);
		this.map = map;

		// use the Mapbox GL JS map canvas for three.js
		this.renderer = new THREE.WebGLRenderer({
			canvas: map.getCanvas(),
			context: gl,
			antialias: true,
		});

		this.renderer.autoClear = false;
	},
	render: function (gl, matrix) {
		var rotationX = new THREE.Matrix4().makeRotationAxis(
			new THREE.Vector3(1, 0, 0),
			modelTransform.rotateX
		);
		var rotationY = new THREE.Matrix4().makeRotationAxis(
			new THREE.Vector3(0, 0, 1),
			modelTransform.rotateY
		);
		var rotationZ = new THREE.Matrix4().makeRotationAxis(
			new THREE.Vector3(0, 1, 0),
			modelTransform.rotateZ
		);

		var m = new THREE.Matrix4().fromArray(matrix);
		var l = new THREE.Matrix4()
			.makeTranslation(
				modelTransform.translateX,
				modelTransform.translateY,
				modelTransform.translateZ
			)
			.scale(
				new THREE.Vector3(
					modelTransform.scale,
					-modelTransform.scale,
					modelTransform.scale
				)
			)
			.multiply(rotationX)
			.multiply(rotationY)
			.multiply(rotationZ);

		this.camera.projectionMatrix = m.multiply(l);
		this.renderer.state.reset();
		this.renderer.render(this.scene, this.camera);
		this.map.triggerRepaint();
	},
};

map.on('style.load', function () {
	map.addLayer(customLayer, 'waterway-label');
});
