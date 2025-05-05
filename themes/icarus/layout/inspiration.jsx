const { Component } = require("inferno");
const Inspiration = require("./common/inspiration");

module.exports = class extends Component {
	render() {
		const { config, page, helper } = this.props;

		return <Inspiration config={config} page={page} helper={helper} />;
	}
};
