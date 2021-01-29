class ActivityComponent extends React.Component {
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
					<p>UI for Activity </p>
					<table>
						<tbody>
							<tr>
								<td>
									<p>dist param slider</p>
								</td>
								<td>
									<input type='range' min='1' max='10' value='3'></input>
								</td>
							</tr>
						</tbody>
					</table>
				</div>
			);
		} else {
			return <div></div>;
		}
	}
}
