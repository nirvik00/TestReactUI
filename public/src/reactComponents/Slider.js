class Slider extends React.Component {
	constructor(props) {
		super(props);
		this.handleChange = this.handleChange.bind(this);
	}
	handleChange(e) {
		this.props.onValChanged(e.target.value);
	}
	render() {
		if (this.props.show === true)
			return (
				<div>
					<h1>Site Partitioning</h1>
					<table>
						<tbody>
							<tr>
								<td>
									<p>{this.props.compName}</p>
								</td>
								<td>
									<input
										type='range'
										min={this.props.minVal}
										max={this.props.maxVal}
										value={this.props.val}
										onChange={this.handleChange}
									/>
								</td>
							</tr>
						</tbody>
					</table>
				</div>
			);
		else {
			return <div></div>;
		}
	}
}
