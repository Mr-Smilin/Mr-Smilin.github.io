const { Component, Fragment } = require("inferno");
const Paginator = require("hexo-component-inferno/lib/view/misc/paginator");
const Article = require("./common/article");
const Inspiration = require("./common/inspiration");

module.exports = class extends Component {
	render() {
		const { config, page, helper, site } = this.props;
		const { __, url_for } = helper;

		// 獲取所有靈感筆記
		let inspirations = site?.pages?.data.filter(
			(page) => page.layout === "inspiration"
		);

		if (inspirations === undefined) inspirations = [];

		inspirations.sort((a, b) => {
			return b.date.unix() - a.date.unix();
		});

		return (
			<Fragment>
				{page.posts.map((post, index, arr) => {
					if (post?.date?.unix() <= inspirations[0]?.date?.unix()) {
						const inspiration = inspirations.shift();
						return (
							<>
								<Inspiration
									config={config}
									page={inspiration}
									helper={helper}
									index={true}
									indexAt={index}
								/>
								<Article
									config={config}
									page={post}
									helper={helper}
									index={true}
									indexAt={index}
								/>
							</>
						);
					} else {
						return (
							<Article
								config={config}
								page={post}
								helper={helper}
								index={true}
								indexAt={index}
							/>
						);
					}
				})}
				{page.total > 1 ? (
					<Paginator
						current={page.current}
						total={page.total}
						baseUrl={page.base}
						path={config.pagination_dir}
						urlFor={url_for}
						prevTitle={__("common.prev")}
						nextTitle={__("common.next")}
					/>
				) : null}
				{/* {page.posts.map((item, index, arr) => {
					if (item?.layout === "inspiration") {
						return (
							<Inspiration
								config={config}
								page={item}
								helper={helper}
								index={true}
								indexAt={index}
							/>
						);
					} else {
						return (
							<Article
								config={config}
								page={item}
								helper={helper}
								index={true}
								indexAt={index}
							/>
						);
					}
				})} */}
				{/* {totalPages > 1 ? (
					<Paginator
						current={currentPage}
						total={totalPages}
						baseUrl={page.base}
						path={config.pagination_dir}
						urlFor={url_for}
						prevTitle={__("common.prev")}
						nextTitle={__("common.next")}
					/>
				) : null} */}
			</Fragment>
		);
	}
};
