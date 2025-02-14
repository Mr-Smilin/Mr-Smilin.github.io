!(function (o, i) {
	function r() {}
	var n,
		d,
		s,
		l,
		c,
		u,
		f,
		m,
		e,
		a,
		t,
		p,
		y,
		v,
		h = "",
		_ = o.head;
	"function" == typeof [].indexOf &&
		_ &&
		((i.a2a = i.a2a || {}),
		(n = i.a2a_config = i.a2a_config || {}),
		(e = (d = o.currentScript) && d.src ? d.src : ""),
		NodeList &&
			NodeList.prototype.forEach &&
			((i.a2a.init = function (e, a) {
				void 0 === a && (a = n);
				var t = ":not([data-a2a-url]):not(.a2a_target)";
				o
					.querySelectorAll(".a2a_dd" + t + ",.a2a_kit" + t)
					.forEach(function (e) {
						e.matches(".a2a_kit .a2a_dd");
						e.a2a_index ||
							null !== e.getAttribute("data-a2a-url") ||
							e.matches(".a2a_kit .a2a_dd") ||
							((e.dataset.a2aUrl = a.linkurl || ""),
							a.linkname && (e.dataset.a2aTitle = a.linkname));
					}),
					delete n.linkurl,
					delete n.linkname;
			}),
			(i.a2a_init = i.a2a.init),
			!d ||
				d.async ||
				d.defer ||
				i.a2a.init("page", { linkurl: n.linkurl, linkname: n.linkname })),
		i.a2a.page ||
			((i.a2a.page = !0),
			(s = []),
			["init_all", "svg_css"].forEach(function (t) {
				i.a2a[t] = function () {
					for (var e = [], a = 0; a < arguments.length; a++)
						e[a] = arguments[a];
					s.push([t, e]);
				};
			}),
			(t = (v = n.static_server) ? v + "/" : "/addtoany/"),
			(a = e && -1 !== e.split("/")[2].indexOf("addtoany")),
			(l = (a = (l = !v && a ? e : t).match(/^[^?#]+\//)) ? a[0] : l),
			(c = function (e, a, t) {
				void 0 === e && (e = l + "eso" + h + ".js"), void 0 === a && (a = !1);
				var n = o.createElement(
						(t = void 0 === t ? !1 : t) ? "link" : "script"
					),
					i = "module",
					t =
						(t
							? ((t = "preload"),
							  (n.href = e),
							  (n.rel = a ? i + t : t),
							  a || (n.as = "script"))
							: ((n.src = e),
							  a &&
									((n.type = i),
									(n.onerror = function () {
										return c();
									}))),
						d && d.nonce ? d.nonce : null);
				t && (n.nonce = t), _.appendChild(n);
			}),
			(f = "a2a_sm_ifr"),
			(m = function () {
				var e, a, t, n;
				(a = "a2a_menu_container"),
					(e = o.getElementById(a)),
					(i.a2a.main = u = e || o.createElement("div")),
					u.id != a &&
						((u.style.position = "static"), o.body.insertBefore(u, null)),
					i.addEventListener("message", function (e) {
						var a = e.origin;
						(a && ".addtoany.com" !== a.substr(-13)) ||
							("object" == typeof (a = e.data) &&
								a.a2a &&
								(a.h1 && (i.a2a.h1 = !0),
								"function" == typeof (e = i.a2a.userServices)
									? e(a.user_services)
									: (i.a2a.userServices = a.user_services),
								(o.getElementById(f).style.display = "none")));
					}),
					(e = o.createElement("iframe")),
					(a = o.createElement("div")),
					(t = e.style),
					(n = a.style),
					(e.id = f),
					(t.width = t.height = n.width = n.height = "1px"),
					(t.top = t.left = t.border = "0"),
					(t.position = n.position = "absolute"),
					(t.zIndex = n.zIndex = "100000"),
					(e.title = "AddToAny Utility Frame"),
					e.setAttribute("aria-hidden", "true"),
					(e.src = "/addtoany/sm.25.html#type=core&event=load"),
					(n.top = "0"),
					(n.visibility = "hidden"),
					u.insertBefore(a, null),
					a.insertBefore(e, null),
					(m = r);
			}),
			o.body && m(),
			"function" == typeof (e = "".matchAll) &&
			e.toString().includes("[native code]")
				? ((a = t + (v ? "" : "svg/")),
				  c((e = l + (v ? "" : "modules/")) + "core" + h + ".js", !0),
				  (t = document
						.createElement("link")
						.relList.supports("modulepreload")),
				  n.overlays &&
						n.overlays.length &&
						t &&
						c(e + "overlays" + h + ".js", !0, !0),
				  o.querySelector(
						'.a2a_dd:empty,.a2a_kit [class*="a2a_button_"]:empty'
				  ) &&
						i.a2a.h1 &&
						c(a + "icons.38.svg.js", !1, !0))
				: c(),
			(p = function (e) {
				var a = i.a2a.core;
				"function" != typeof a || e
					? e
						? e()
						: (i.a2a.core = function (e) {
								return p(e);
						  })
					: a();
			}),
			(v = function () {
				y ||
					((y = !0),
					m(),
					p(),
					s.forEach(function (e) {
						var a;
						(a = i.a2a)[e[0]].apply(a, e[1]);
					}));
			}),
			"loading" !== o.readyState
				? v()
				: (o.addEventListener("readystatechange", v),
				  o.addEventListener("DOMContentLoaded", v))));
})(document, window);

// 重置並初始化全局 a2a 對象
function initializeA2A(force = false) {
	console.log("test reset a2a");
	if (window.a2a_initialized && !force) {
		return; // 如果已经初始化过，且不是强制初始化，则直接返回
	}
	window.a2a = window.a2a || {};
	window.a2a_config = window.a2a_config || {};
	window.a2a_initialized = true;

	// 清理可能已存在的 a2a 元素
	const existingButtons = document.querySelectorAll(".a2a_kit");
	existingButtons.forEach((button) => button.remove());

	// 此处调用 AddToAny 的初始化代码
	window.a2a.init("page", {
		linkurl: window.a2a_config.linkurl,
		linkname: window.a2a_config.linkname,
	});
}
