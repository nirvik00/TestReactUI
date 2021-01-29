class RHSComponent extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			showMap: false,
			counterMap: 0,
			show3d: false,
			counter3d: 0,
		};
	}
	toggleMap() {
		this.state.counterMap++;
		if (this.state.counterMap % 2 > 0) {
			document.getElementById('mapView').style.display = 'block';
			this.setState({ showMap: true });
		} else {
			document.getElementById('mapView').style.display = 'none';
			this.setState({ showMap: false });
		}
	}

	toggle3d() {
		this.state.counter3d++;
		if (this.state.counter3d % 2 !== 0) {
			document.getElementById('div3d').style.display = 'block';
			this.setState({ show3d: true });
		} else {
			document.getElementById('div3d').style.display = 'none';
			this.setState({ show3d: false });
		}
	}
	render() {
		return (
			<div>
				<button
					onClick={() => {
						this.toggleMap();
					}}>
					VIEW Map
				</button>
				<br />
				<button
					onClick={() => {
						this.toggle3d();
					}}>
					VIEW 3d
				</button>
				<br />
			</div>
		);
	}
}
ReactDOM.render(<RHSComponent />, document.querySelector('#reactapp'));
