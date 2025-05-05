const { Component } = require("inferno");
const { cacheComponent } = require("hexo-component-inferno/lib/util/cache");
const moment = require("moment");

/**
 * Inspiration component for displaying inspiration notes
 */
class Inspiration extends Component {
	render() {
		const { config, helper, page, index } = this.props;
		const { url_for, date, __ } = helper;

		const formatDate = (date) => {
			return moment(date).format(config.date_format || "YYYY-MM-DD");
		};

		return (
			<a href={url_for("/inspiration/")}>
				<div class="inspiration-list">
					<div class="inspiration-card">
						<div class="inspiration-card-inner">
							<div class="inspiration-title-wrap">
								<span class="inspiration-title">靈感小語</span>
								<time class="inspiration-date" datetime={date(page.date)}>
									{formatDate(page.date)}
								</time>
							</div>
							<div
								class="inspiration-content"
								dangerouslySetInnerHTML={{ __html: page.content }}
							></div>
						</div>
					</div>
				</div>
			</a>
		);
	}
}

/**
 * Cacheable Inspiration component
 * @see https://github.com/hexojs/hexo-component-inferno#cachecomponent
 */
module.exports = cacheComponent(Inspiration, "common.inspiration", (props) => {
	const { config, page, helper, index } = props;
	const { url_for, date } = helper;

	// 用於快取的唯一識別符
	return {
		config: config,
		helper: {
			url_for: url_for,
			date: date,
		},
		page: {
			date: page.date,
			content: page.content,
		},
		index,
	};
});
