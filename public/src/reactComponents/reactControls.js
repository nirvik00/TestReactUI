class ReactControllerComp extends React.Component {
	constructor(props) {
		super(props);
		this.handleNumPartitionChange = this.handleNumPartitionChange.bind(this);
		this.state = {
			countPartitions: 0,
			showPartitions: false,
			numPartitions: 1,
			countMap: 1,
			count3d: 1,
			countDistrictComp: 0,
			showDistrictComp: false,
			countActivityComp: 0,
			showActivityComp: false,
			countMassingComp: 0,
			showMassingComp: false,
		};
	}
	toggleDistrictComp() {
		this.state.countDistrictComp++;
		if (this.state.countDistrictComp % 2 > 0) {
			this.setState({ showDistrictComp: true });
		} else {
			this.setState({ showDistrictComp: false });
		}
	}
	togglePartitions() {
		this.state.countPartitions++;
		if (this.state.countPartitions % 2 > 0) {
			this.setState({ showPartitions: true });
		} else {
			this.setState({ showPartitions: false });
		}
	}
	toggleActivity() {
		this.state.countActivityComp++;
		if (this.state.countActivityComp % 2 > 0) {
			this.setState({ showActivityComp: true });
		} else {
			this.setState({ showActivityComp: false });
		}
	}
	toggleMassing() {
		this.state.countMassingComp++;
		if (this.state.countMassingComp % 2 > 0) {
			this.setState({ showMassingComp: true });
		} else {
			this.setState({ showMassingComp: false });
		}
	}

	toggleMap() {
		this.state.countMap++;
		if (this.state.countMap % 2 > 0) {
			document.getElementById('mapView').style.display = 'block';
		} else {
			document.getElementById('mapView').style.display = 'none';
		}
	}

	toggle3d() {
		this.state.count3d++;
		if (this.state.count3d % 2 !== 0) {
			document.getElementById('div3d').style.display = 'block';
		} else {
			document.getElementById('div3d').style.display = 'none';
		}
	}
	handleNumPartitionChange(num) {
		this.setState({ numPartitions: num });
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
				<button
					onClick={() => {
						this.toggleDistrictComp();
					}}>
					{' '}
					District Mapping{' '}
				</button>
				<DistrictComponent
					show={this.state.showDistrictComp}
					onValChanged={this.handleNumPartitionChange}
				/>
				<br />
				<button
					onClick={() => {
						this.togglePartitions();
					}}>
					{' '}
					Partitions{' '}
				</button>
				<PartitionComponent
					compName='num_partitions'
					minVal={1}
					maxVal={10}
					val={this.state.numPartitions}
					show={this.state.showPartitions}
					onValChanged={this.handleNumPartitionChange}
				/>
				<br />
				<button
					onClick={() => {
						this.toggleActivity();
					}}>
					{' '}
					Activity Mapping{' '}
				</button>
				<ActivityComponent
					compName='num_partitions'
					minVal={1}
					maxVal={10}
					val={this.state.numPartitions}
					show={this.state.showActivityComp}
					onValChanged={this.handleNumPartitionChange}
				/>
				<br />
				<button
					onClick={() => {
						this.toggleMassing();
					}}>
					{' '}
					Massing{' '}
				</button>
				<MassingComponent
					compName='num_partitions'
					minVal={1}
					maxVal={10}
					val={this.state.numPartitions}
					show={this.state.showMassingComp}
					onValChanged={this.handleNumPartitionChange}
				/>
			</div>
		);
	}
}
ReactDOM.render(
	<ReactControllerComp />,
	document.querySelector('#reactControls')
);
