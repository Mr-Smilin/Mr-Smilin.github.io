const { Component } = require("inferno");
const { cacheComponent } = require("hexo-component-inferno/lib/util/cache");
const moment = require("moment");

/**
 * Inspiration component for displaying inspiration notes
 */
class Inspiration extends Component {
	render() {
		const { config, helper, inspirations } = this.props;
		const { url_for, date, __ } = helper;

		if (!inspirations || inspirations.length === 0) {
			return null;
		}

		const randomIndex = Math.floor(Math.random() * inspirations.length);
		const inspiration = inspirations[randomIndex];

		const formatDate = (date) => {
			return moment(date).format(config.date_format || "YYYY-MM-DD");
		};

		const allInspirations = inspirations.map((insp) => ({
			date: date(insp.date),
			formattedDate: formatDate(insp.date),
			content: insp.content,
		}));

		const inspirationsJson = JSON.stringify(allInspirations);

		return (
			<div class="inspiration-container">
				<a href={url_for("/inspiration/")} class="inspiration-link">
					<div class="inspiration-list">
						<div class="inspiration-card">
							<div class="inspiration-card-inner" id="inspiration-card-inner">
								<div class="inspiration-title-wrap">
									<span class="inspiration-title">靈感小語</span>
									<time
										class="inspiration-date"
										datetime={date(inspiration.date)}
										id="inspiration-date"
									>
										{formatDate(inspiration.date)}
									</time>
								</div>
								<div
									class="inspiration-content"
									id="inspiration-text"
									dangerouslySetInnerHTML={{ __html: inspiration.content }}
								></div>
							</div>
						</div>
					</div>
				</a>

				{/* Client-side script for handling rotation */}
				{inspirations.length > 1 && (
					<script
						dangerouslySetInnerHTML={{
							__html: `
						document.addEventListener('DOMContentLoaded', function() {
							// Store all inspirations
							const inspirations = ${inspirationsJson};
							// Current index (random start)
							let currentIndex = ${randomIndex};
							
							// Function to rotate inspirations
							function rotateInspiration() {
								// Add transition class to create fade effect
								const contentEl = document.getElementById('inspiration-card-inner');
								
								// Update to next inspiration after a short delay
								setTimeout(function() {
									// Calculate next index
									currentIndex = (currentIndex + 1) % inspirations.length;
									const insp = inspirations[currentIndex];
									
									// Update date and content
									document.getElementById('inspiration-date').textContent = insp.formattedDate;
									document.getElementById('inspiration-date').setAttribute('datetime', insp.date);
									document.getElementById('inspiration-text').innerHTML = insp.content;
									
									contentEl.classList.add('rotating');
									// Remove transition class
									setTimeout(function() {
										contentEl.classList.remove('rotating');
									}, 800);
								}, 400);
							}
							
							// Set up rotation interval
							setInterval(rotateInspiration, 5000);
						});
					`,
						}}
					></script>
				)}
			</div>
		);
	}
}

/**
 * Cacheable Inspiration component
 * @see https://github.com/hexojs/hexo-component-inferno#cachecomponent
 */
module.exports = cacheComponent(Inspiration, "common.inspiration", (props) => {
	const { config, inspirations, helper } = props;
	const { url_for, date } = helper;

	// 用於快取的唯一識別符
	return {
		config: config,
		helper: {
			url_for: url_for,
			date: date,
		},
		inspirations: inspirations
			? inspirations.map((insp) => ({
					date: insp.date,
					content: insp.content,
			  }))
			: [],
	};
});
