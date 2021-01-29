let WIDTH = 500;
let HEIGHT = 500;
let g = new THREE.BoxGeometry(5, 5, 5);
let m = new THREE.MeshBasicMaterial({
	color: 0xff0000,
	wireframe: true,
});
let me = new THREE.Mesh(g, m);
function init3d() {
	scene3d = new THREE.Scene();
	scene3d.background = new THREE.Color('rgb(0,0,0)');
	camera3d = new THREE.PerspectiveCamera(45, WIDTH / HEIGHT, 0.01, 1000);
	camera3d.up = new THREE.Vector3(0, 0, 1);
	camera3d.position.set(10, 10, 10);
	renderer3d = new THREE.WebGLRenderer();
	renderer3d.setSize(WIDTH, HEIGHT);
	controls3d = new THREE.OrbitControls(camera3d, renderer3d.domElement);
	controls3d.addEventListener('change', onWindowResize);
	div3d = document.getElementById('div3d');
	div3d.appendChild(renderer3d.domElement);
	let axes = new THREE.AxesHelper(10);
	scene3d.add(axes);
	let grid = new THREE.GridHelper(10, 10);
	grid.geometry.rotateX(Math.PI / 2);
	scene3d.add(grid);
	scene3d.add(me);
	render();
}

function onWindowResize() {
	camera3d.aspect = WIDTH / HEIGHT;
	camera3d.updateProjectionMatrix();
	renderer3d.setSize(WIDTH, HEIGHT);
	render();
}

function render() {
	me.rotation.x += 0.01;
	me.rotation.y += 0.005;
	me.rotation.z += 0.0025;
	renderer3d.render(scene3d, camera3d);
	requestAnimationFrame(render);
}
