/**
 * Share.js share buttons JSX component.
 * @module view/share/sharejs
 */
const { Component, Fragment } = require('inferno');
const { cacheComponent } = require('hexo-component-inferno/lib/util/cache');

/**
 * Share.js share buttons JSX component.
 *
 * @see https://github.com/overtrue/share.js
 * @example
 * <ShareJs cssUrl="/path/to/share.css" jsUrl="/path/to/social-share.js" />
 */
class ShareJs extends Component {
    render() {
        const { cssUrl, jsUrl } = this.props;
        return <Fragment>
            <link rel="stylesheet" href={cssUrl} />
            <div class="social-share"></div>
            <script src={jsUrl}></script>
        </Fragment>;
    }
}

/**
 * Cacheable Share.js share buttons JSX component.
 * <p>
 * This class is supposed to be used in combination with the <code>locals</code> hexo filter
 * ({@link module:hexo/filter/locals}).
 *
 * @see module:util/cache.cacheComponent
 * @example
 * <ShareJs.Cacheable helper={{ cdn: function() {...} }} />
 */
ShareJs.Cacheable = cacheComponent(ShareJs, 'share.sharejs', props => {
    const { helper } = props;

    return {
        cssUrl: helper.cdn('social-share.js', '1.0.16', 'dist/css/share.min.css'),
        jsUrl: helper.cdn('social-share.js', '1.0.16', 'dist/js/social-share.min.js')
    };
});

module.exports = ShareJs;