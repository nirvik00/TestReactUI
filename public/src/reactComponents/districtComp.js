class DistrictComponent extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			show: false,
		};
	}
	render() {
		if (this.props.show === true) {
			return (
				<div>
					<br />
					<h1>Drawn on Map</h1>
					<ul>
						<li>streets</li>
						<li>site polygon</li>
					</ul>
				</div>
			);
		} else {
			return <div></div>;
		}
	}
}
