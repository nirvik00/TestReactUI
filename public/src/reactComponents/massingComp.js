class MassingComponent extends React.Component {
	constructor(props) {
		super(props);
		this.handleChange = this.handleChange.bind(this);
		this.state = {
			show: false,
			block: false,
			courtyard: false,
			range: 1,
		};
	}
	handleChange(e) {
		//this.props.onValChange(e.target.value);
	}
	handleChange1(e) {
		//this.props.onValChange(e.target.value);
	}
	handleChange2(e) {
		//this.props.onValChange(e.target.value);
	}

	render() {
		if (this.props.show === true) {
			return (
				<div>
					<br />
					<fieldset>
						<legend>UI FOR MASSING</legend>

						<table>
							<tbody>
								<tr>
									<td>
										<p>block</p>
									</td>
									<td>
										<input type='checkbox' name='block' checked />
									</td>
								</tr>
								<tr>
									<td>
										<p>Courtyard</p>
									</td>
									<td>
										<input type='checkbox' name='courtyard' checked='false' />
									</td>
								</tr>
								<tr>
									<td>
										<p>Range</p>
									</td>
									<td>
										<input
											type='range'
											min='1'
											max='10'
											value='3'
											name='range'
											onChange={this.handleChange}
										/>
									</td>
								</tr>
							</tbody>
						</table>
					</fieldset>
				</div>
			);
		} else {
			return <div></div>;
		}
	}
}
