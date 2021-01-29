class NumInp extends React.Component {
	constructor(props) {
		super(props);
		this.handleChange = this.handleChange.bind(this);
	}
	handleChange(e) {
		this.props.onValChange(e.target.value);
	}
	render() {
		const val = this.props.val;
		return (
			<fieldset>
				<legend>Update {this.props.name}</legend>
				<input
					type='range'
					min='4'
					max='10'
					value={val}
					onChange={this.handleChange}
				/>
			</fieldset>
		);
	}
}

class ThreeApp extends React.Component {
	constructor(props) {
		super(props);
		this.handleLengthChange = this.handleLengthChange.bind(this);
		this.handleWidthChange = this.handleWidthChange.bind(this);
		this.handleHeightChange = this.handleHeightChange.bind(this);
		this.state = {
			L: 1,
			W: 1,
			H: 1,
			show: true,
		};
	}
	componentDidMount() {
		console.log(this.props.show);
		if (this.state.show === false) return;
		const WIDTH = 500,
			HEIGHT = 500;
		var scene3d = new THREE.Scene();
		scene3d.background = new THREE.Color('rgb(0,0,0)');
		var camera3d = new THREE.PerspectiveCamera(45, WIDTH / HEIGHT, 0.01, 1000);
		camera3d.up = new THREE.Vector3(0, 0, 1);
		camera3d.position.set(10, 10, 10);

		var renderer3d = new THREE.WebGLRenderer();
		renderer3d.setSize(WIDTH, HEIGHT);
		this.mount.appendChild(renderer3d.domElement);

		let g = new THREE.BoxGeometry(this.state.L, this.state.W, this.state.H);
		let m = new THREE.MeshBasicMaterial({
			color: new THREE.Color('rgb(200,0,0)'),
			wireframe: true,
		});
		let me = new THREE.Mesh(g, m);
		scene3d.add(me);

		let axes = new THREE.AxesHelper(10);
		scene3d.add(axes);

		var controls3d = new THREE.OrbitControls(camera3d, renderer3d.domElement);
		controls3d.addEventListener('change', onWindowResize);

		var onWindowResize = () => {
			camera3d.aspect = WIDTH / HEIGHT;
			camera3d.updateProjectionMatrix();
			renderer3d.setSize(WIDTH, HEIGHT);
		};

		var animate = () => {
			requestAnimationFrame(animate);
			renderer3d.setSize(WIDTH, HEIGHT);
			me.rotation.x += 0.01;
			me.scale.x = this.state.L;
			me.scale.y = this.state.W;
			me.scale.z = this.state.H;
			renderer3d.render(scene3d, camera3d);
		};
		animate();
	}

	handleLengthChange(length) {
		this.setState({ L: length });
	}
	handleWidthChange(width) {
		this.setState({ W: width });
	}
	handleHeightChange(height) {
		this.setState({ H: height });
	}
	render() {
		console.log(this.props.show);

		if (this.props.show === true) {
			return (
				<div>
					<p>generate</p>
					<NumInp
						val={this.state.L}
						name='Length'
						onValChange={this.handleLengthChange}
					/>
					<NumInp
						val={this.state.W}
						name='Width'
						onValChange={this.handleWidthChange}
					/>
					<NumInp
						val={this.state.H}
						name='Height'
						onValChange={this.handleHeightChange}
					/>
					<div ref={(ref) => (this.mount = ref)} />
				</div>
			);
		} else {
			return <div></div>;
		}
	}
}
// ReactDOM.render(<ThreeApp />, document.getElementById('reactapp'));
