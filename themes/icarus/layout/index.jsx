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
					/**
					 * 如果文章日期小於最新的靈感筆記日期加上一天(避免時間差)
					 * 判斷靈感筆記是否與當前文章日期相差超過一週(避免不同分頁的靈感筆記重複)
					 * 超過一週則吐出靈感筆記，判斷下一筆，直到靈感筆記清零，回傳文章
					 * 否則回傳靈感筆記與文章
					 */
					if (
						post?.date?.unix() <=
						inspirations[0]?.date?.unix() + 24 * 60 * 60
					) {
						let i = 0;
						while (true) {
							if (inspirations.length === 0) {
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

							if (
								Math.abs(inspirations[i]?.date?.unix() - post?.date?.unix()) >
								30 * 24 * 60 * 60
							) {
								inspirations.shift();
								continue;
							} else {
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
							}
						}
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
