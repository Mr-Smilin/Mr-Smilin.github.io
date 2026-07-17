!(function (z) {
	function y(e) {
		e ? (w = e.a2a_index) : A && (w = A);
	}
	var x,
		a,
		t = function () {
			var e = te.overlays || [],
				o = !!z.evOpts() && { passive: !0 },
				a = Q.innerWidth,
				t = Q.innerHeight,
				n = a && (a < 375 || t < 375) ? 150 : 200,
				i = 200,
				_ = location.href,
				m = ee.title || _,
				h = Math.round,
				g = Math.floor,
				d = Math.ceil,
				l = "undefined" != typeof Map && "function" == typeof new Map().get,
				u = l && "function" == typeof new Map().entries,
				p = "undefined" != typeof Set && "function" == typeof new Set().add,
				v =
					("undefined" != typeof DOMMatrix && new DOMMatrix().scaleSelf,
					"IntersectionObserver" in Q),
				y = "MutationObserver" in Q,
				r = "ResizeObserver" in Q;
			function k(e) {
				return (
					"false" !== e.getAttribute("data-a2a-overlay") &&
					!z.matches(
						e,
						'header img,footer img,[role="presentation"],[role="presentation"] img'
					)
				);
			}
			function b(e, a) {
				function t(e, a) {
					return h(e + a / 2);
				}
				function n(e, a) {
					return ee.elementsFromPoint(e, a);
				}
				var o = a.left,
					i = a.top,
					r = a.right,
					l = a.bottom,
					s = a.width,
					a = a.height,
					s = t(o, s),
					a = t(i, a),
					c = "none" === getComputedStyle(e).pointerEvents,
					l =
						(c && (x(), e.setAttribute("data-a2a-temp", "pointer-events")),
						n(s, a).includes(e) ||
							n(s, g(l)).includes(e) ||
							n(s, d(i)).includes(e) ||
							n(d(o), a).includes(e) ||
							n(g(r), a).includes(e));
				return c && e.removeAttribute("data-a2a-temp"), l;
			}
			function f(n, o) {
				function e(e, a, t) {
					return (
						(a = n["scroll".concat(a)] > n["client".concat(a)]),
						(e = o["overflow".concat(e)]),
						a &&
							-1 === i.indexOf(e) &&
							("hidden" !== e || 0 !== n["scroll".concat(t)])
					);
				}
				var i = ["visible", "clip"];
				return e("Y", "Height", "Top") || e("X", "Width", "Left");
			}
			var w = function (e) {
					var a = e.width >= n && e.height >= n,
						e =
							!("naturalWidth" in e) ||
							(e.naturalWidth >= i && e.naturalHeight >= i);
					return a && e;
				},
				x = function () {
					var e = ee.createElement("style");
					M && e.setAttribute("nonce", M),
						I.appendChild(e),
						e.appendChild(
							ee.createTextNode(
								'[data-a2a-temp="pointer-events"]{pointer-events:auto!important}[data-a2a-position="relative"]{position:relative}'
							)
						),
						(x = c);
				},
				A = function (e, a, t, n, o) {
					var n = n / o,
						o = a / t,
						i = 0,
						r = 0;
					return (
						(e ? o < n : n < o) ? (r = (i = a) / n) : (i = (r = t) * n),
						{ width: i, height: r, x: (a - i) / 2, y: (t - r) / 2 }
					);
				},
				C = /\b(?:position|transform|webkitTransform)\b/;
			function E(e, a, t) {
				e.showOn;
				var n,
					o,
					i,
					r,
					l = 0,
					s = 0,
					c = t.longDesc,
					d = e.position,
					e = (e.target, e.useImage),
					u = { x: 0, y: 0, height: 0, width: 0 },
					p = t.height,
					f = t.width;
				w(t) &&
					((n = (r = L(t)).zIndexMax),
					(o = r.ancestorCreatingContext),
					(i = r.ancestorRelativeToImg),
					"contain" === (r = r.elComputedStyle).objectFit &&
						"50% 50%" === r.objectPosition &&
						((p = (u = A(!0, f, p, t.naturalWidth, t.naturalHeight)).height),
						(f = u.width)),
					(a.style.display = ""),
					(a.style.zIndex = n),
					(r = a.clientHeight || a.offsetHeight),
					(n = a.clientWidth || a.offsetWidth),
					d[0] &&
						("bottom" === d[0]
							? (s = p - r)
							: "center" === d[0] && (s = h((p - r) / 2))),
					d[1] &&
						("right" === d[1]
							? (l = f - n)
							: "center" === d[1] && (l = h((f - n) / 2))),
					(r = p = 0),
					o &&
						i !== ee.body &&
						((p = (d = we(i, "scroll")).left),
						(r = d.top),
						(r -= i.scrollTop),
						(p -= i.scrollLeft)),
					(n = (f = we(t, "scroll")).left + u.x + l - p),
					(o = f.top + u.y + s - r),
					(a.style.left = n + "px"),
					(a.style.top = o + "px"),
					a.setAttribute("data-a2a-media", t.src),
					(a.a2a_mediaNode = t).alt
						? a.setAttribute("data-a2a-title", t.alt)
						: a.setAttribute("data-a2a-title", m),
					!c || ("#" !== c.substr(0, 1) && "http" !== c.substr(0, 4))
						? e
							? a.setAttribute("data-a2a-url", t.src)
							: a.setAttribute("data-a2a-url", _)
						: ((d = "#" === c.substr(0, 1) ? _.split("#")[0] + t.longDesc : c),
						  a.setAttribute("data-a2a-url", d)));
			}
			function S(c, d, u, e) {
				function p(a) {
					void 0 === a && (a = 1),
						m && m.disconnect(),
						m && h.delete(m),
						(m = null);
					var e,
						t,
						n,
						o,
						i,
						r,
						l,
						s = c.getBoundingClientRect();
					s.width &&
						s.height &&
						((o = ee.scrollingElement),
						(n = r = 0),
						f && ((r = o.scrollLeft), (n = o.scrollTop)),
						(o = s.left + r),
						(r = s.top + n),
						(n = _.offsetWidth),
						(i = _.offsetHeight),
						(e = g(+r)),
						(t = g(+o)),
						(n = g(n + 0 - (o + s.width))),
						(o = g(i + 0 - (r + s.height))),
						(i = ""
							.concat(-e, "px ")
							.concat(-n, "px ")
							.concat(-o, "px ")
							.concat(-t, "px")),
						(r = { root: _, rootMargin: i, threshold: a }),
						(l = !0),
						s.width,
						s.height,
						(m = new IntersectionObserver(function (e) {
							e = e[0];
							if (a !== e.intersectionRatio) {
								if (!l) return void d(u);
								e = e.intersectionRatio;
								p((e = 0 === e ? 1e-7 : e));
							}
							l = !1;
						}, r)).observe(c),
						h.add(m));
				}
				var a,
					t,
					f = u === ee.body,
					n = ee.documentElement,
					_ = e || n,
					m = null,
					h = (T = T || new Map()).get(u),
					n =
						(h || ((h = new Set()), T.set(u, h)),
						e || "fixed" === getComputedStyle(c).position || p(),
						null),
					e = null,
					o = (s = s || new Map()).get(u);
				o || ((o = new Map()), s.set(u, o)),
					r
						? ((a = !0),
						  (n = new ResizeObserver(function (e) {
								a || (d(u), (a = !0)), (a = !1);
						  })).observe(c),
						  h.add(n),
						  o.has(_) ||
								((t = !0),
								(e = new ResizeObserver(function (e) {
									t || (d(u), (t = !0)), (t = !1);
								})).observe(_),
								o.set(_, e)))
						: N ||
						  (Q.addEventListener(
								"resize",
								ge(
									function () {
										d(u);
									},
									20,
									{ leading: !0, trailing: !1 }
								)
						  ),
						  (N = !0));
			}
			var T,
				s,
				F,
				B = function (e, a) {
					void 0 === a && (a = ee.body);
					var t,
						n = e.html,
						o = e.style,
						i = e.services,
						e = e.size,
						r = "";
					return (
						n
							? (a.insertAdjacentHTML("beforeend", n), (t = a.lastChild))
							: (i.forEach(function (e) {
									r += '<a class="'.concat(
										"addtoany" === e ? "a2a_dd" : "a2a_button_" + e,
										'"></a>'
									);
							  }),
							  ((t = ee.createElement("div")).className =
									"a2a_kit a2a_kit_size_" +
									e +
									" a2a_overlay_style a2a_" +
									o +
									"_style"),
							  (t.innerHTML = r),
							  a.insertBefore(t, null)),
						(t.style.display = "none"),
						(t.style.position = "absolute"),
						t.setAttribute("data-a2a-title", m),
						t.setAttribute("data-a2a-url", _),
						t
					);
				},
				N = !1,
				L = ke(
					(L = function (a) {
						function e(e) {
							return (
								e === a ||
								e === s ||
								e === ee.documentElement ||
								"a" === e.tagName.toLowerCase()
							);
						}
						for (var t, n, o, i = a, r = 0, l = [], s = ee.body; i; ) {
							var c = getComputedStyle(i);
							if ((i === a && (o = c), "none" === c.display)) return null;
							var d = c["z-index"],
								c =
									("auto" !== d && r < d && (r = parseInt(d, 10)),
									t ||
										e(i) ||
										((t =
											f(i, c) ||
											((d = c).display, "fixed" === d.position) ||
											"sticky" === d.position ||
											("transform" in d && "none" !== d.transform) ||
											("webkitTransform" in d &&
												"none" !== d.webkitTransform) ||
											!!C.test(d.willChange)
												? i
												: null) &&
											(n =
												"function" == typeof l.find
													? l.find(function (e) {
															return t.contains(e);
													  })
													: l.filter(function (e) {
															return t.contains(e);
													  })[0])),
									"a" === i.tagName.toLowerCase() &&
										((t = n = null), (l.length = 0)),
									i.offsetParent);
							!c || e(c) || (l.length && l[0] === c) || l.unshift(c),
								(i = i.parentElement);
						}
						return (
							(r = 0 === r ? "auto" : r),
							t &&
								!n &&
								(x(), t.setAttribute("data-a2a-position", "relative"), (n = t)),
							{
								zIndexMax: r,
								ancestorCreatingContext: t,
								ancestorRelativeToImg: n,
								elComputedStyle: o,
							}
						);
					}),
					null,
					!0
				);
			e.forEach(function (f) {
				(f.showOn = f.showOn || "hover"),
					(f.services = f.services || ["pinterest", "facebook"]),
					(f.size = f.size || 32);
				var s,
					_,
					e,
					m,
					c,
					a,
					r,
					t = f.position,
					n = f.style,
					d = f.target;
				(f.position =
					"string" == typeof t && 2 < t.length
						? t.split(" ")
						: ["top", "left"]),
					(f.style =
						!n || ("horizontal" !== n && "default" !== n)
							? "vertical"
							: "default"),
					(f.target = d = d || "img"),
					W(d)
						? ((_ = function (e) {
								var a,
									t,
									n,
									o,
									e = L(e);
								return e
									? ((a = e.ancestorRelativeToImg),
									  (t = (e = e.ancestorCreatingContext) && a ? a : ee.body),
									  (n = (s = s || new Map()).get(t)) ||
											((o = {
												busy: new Map(),
												free: new Map(),
												all: [],
												hover: ae,
											}),
											s.set(t, o),
											(n = s.get(t))),
									  {
											sameOverlays: n,
											context: t,
											ancestorCreatingContext: e,
											ancestorRelativeToImg: a,
									  })
									: null;
						  }),
						  (e = function () {
								F =
									F ||
									new IntersectionObserver(
										function (e) {
											e.forEach(function (e) {
												var a,
													t,
													n,
													o,
													i,
													r,
													l,
													s,
													c,
													d,
													u = e.target,
													p = e.isIntersecting;
												w(u) &&
													(n = _(u)) &&
													((a = n.sameOverlays),
													(t = n.context),
													(n = n.ancestorCreatingContext),
													(o = a.busy),
													p && !o.has(u) && b(u, e.intersectionRect)
														? ((e = f),
														  (r = t),
														  (l = (l = _)((i = u)).sameOverlays),
														  (c = l.free),
														  (d = c.get(i))
																? ((s = d), c.delete(i))
																: c.size
																? ((s = (d = c.entries().next().value)[1]),
																  c.delete(d[0]))
																: ((s = B(e, r)), l.all.push(s), ie("page")),
														  l.busy.set(i, s),
														  E(f, s, u),
														  S(u, m, t, n))
														: !p &&
														  o.has(u) &&
														  (a.free.set(u, o.get(u)), o.delete(u)));
											});
										},
										{
											root: null,
											rootMargin: "0px",
											threshold: [0.00667, 0.25, 0.5, 0.75, 1],
										}
									);
						  }),
						  (m = function (e) {
								var t = s.get(e);
								T.get(e).forEach(function (e) {
									return e.disconnect();
								}),
									T.get(e).clear(),
									c(!1),
									t.all.forEach(function (e) {
										return (e.style.display = "none");
									}),
									t.busy.forEach(function (e, a) {
										return t.free.set(a, e);
									}),
									t.busy.clear(),
									c(!0);
						  }),
						  (c = function (e, a) {
								e
									? ((e = a || ee.querySelectorAll(d)),
									  [].forEach.call(e, function (e) {
											k(e) &&
												(e.complete
													? F.observe(e)
													: e.addEventListener("load", function () {
															F.observe(e);
													  }));
									  }))
									: F.disconnect();
						  }),
						  (a = function () {
								function i(e, a) {
									void 0 === a && (a = []),
										(e = e instanceof HTMLCollection ? Array.from(e) : e),
										a.push.apply(a, e),
										e.forEach(function (e) {
											1 === e.nodeType &&
												(z.matches(e, d) && r.push(e), i(e.children, a));
										});
								}
								var r,
									l = ge(m, 80, { leading: !1, trailing: !0 });
								new MutationObserver(function (e) {
									r = [];
									for (var a = 0, t = e; a < t.length; a++) {
										var n = t[a],
											o = n.type;
										if ("childList" === o) i(n.addedNodes);
										else if ("attributes" === o) {
											o = (function (e) {
												if (e instanceof HTMLElement) {
													var a = e.querySelector(d);
													if ((a = a || (z.matches(e, d) ? e : null)))
														for (
															var t = 0, n = Array.from(s.keys());
															t < n.length;
															t++
														) {
															var o = n[t];
															if (s.get(o).busy.has(a)) return o;
														}
													return !1;
												}
											})(n.target);
											if (o) return void l(o);
										}
									}
									r.length && c(!0, r);
								}).observe(ee.body, {
									subtree: !0,
									childList: !0,
									attributes: !0,
									attributeFilter: ["class", "src", "alt", "longdesc"],
								});
						  }),
						  (t = function () {
								e(), c(!0), y && a();
						  }),
						  "visible" === f.showOn && u && p && v
								? "complete" === ee.readyState
									? t()
									: Q.addEventListener("load", t)
								: le(
										ee.body,
										"mouseover",
										function (e) {
											var a,
												t,
												n,
												o,
												e = (e = e).target
													? 3 === e.target.nodeType
														? e.target.parentNode
														: e.target
													: e.srcElement;
											if (z.matches(e, f.target) && k(e))
												l
													? ((a = _((a = e))),
													  (n = a.sameOverlays),
													  (a = a.context),
													  (o = n.hover)
															? (t = o)
															: ((t = B(f, a)), (n.hover = t), ie("page")),
													  (r = t))
													: ((r = B(f)), ie("page")),
													E(f, r, e);
											else {
												for (
													var i = e;
													i && "body" !== i.tagName.toLowerCase();

												) {
													if (i === r) return;
													i = i.parentElement;
												}
												l && s
													? s.forEach(function (e, a) {
															e.hover.style.display = "none";
													  })
													: r && (r.style.display = "none");
											}
										},
										o
								  ))
						: console.warn("'".concat(d, "' is not a valid selector."));
			}),
				(te.overlays = []);
		},
		r = function () {
			return (r =
				Object.assign ||
				function (e) {
					for (var a, t = 1, n = arguments.length; t < n; t++)
						for (var o in (a = arguments[t]))
							Object.prototype.hasOwnProperty.call(a, o) && (e[o] = a[o]);
					return e;
				}).apply(this, arguments);
		},
		Q = window,
		ee = document,
		c = function () {},
		ae = void 0,
		e =
			((Q.a2a_config = Q.a2a_config || {}),
			{
				localize: Q.a2a_localize || {},
				static_server:
					Q.a2a_config.static_server || "https://static.addtoany.com/menu",
				templates: {},
				native: ae,
				onclick: 2,
				orientation: ae,
				track_links: ae,
				track_links_key: "",
				callbacks: [],
				tracking_callback: ae,
				add_services: !1,
				thanks: {},
				locale: ae,
				no_3p: ae,
				icon_color: ae,
				color_main: ae,
				color_bg: ae,
				color_border: ae,
				color_link_text: ae,
				color_link_text_hover: ae,
				counts: ae,
				overlays: [],
			}),
		N = {
			num_services: 8,
			prioritize: ae,
			exclude_services: ae,
			custom_services: ae,
			delay: 0,
			show_menu: ae,
			bookmarklet: ae,
		},
		f = {
			linkmedia: ae,
			linkname: ae,
			linkurl: ae,
			linkname_escape: ae,
			menu_type: ae,
			target: ae,
		},
		te = r(r(r({}, e), N), f),
		_ = function () {
			for (var e in Q.a2a_config) te[e] = Q.a2a_config[e];
		},
		L = function (e) {
			for (var a in e)
				(te[a] = e[a]), Q.a2a_config[a] && (Q.a2a_config[a] = e[a]);
		},
		m = (_(), "https://static.addtoany.com/menu"),
		o = ["feed", "mail", "page"],
		w = 0,
		k = 0,
		ne = {},
		n = { feed: [], page: [] },
		i = ["a2a", "share1", "share2"],
		b = {},
		fe = [],
		A = ae,
		C = ae,
		O = ae,
		I = ee.getElementsByTagName("head")[0],
		_e =
			!!ee.querySelector &&
			((e = ee.querySelector('meta[property="og:url"]'))
				? e.getAttribute("content")
				: !!(e = ee.querySelector('link[rel="canonical"]')) && e.href),
		M =
			ee.currentScript && ee.currentScript.nonce
				? ee.currentScript.nonce
				: null,
		E = navigator.userAgent,
		j = E.match(/Mobi|iPhone|iPad|iPod|Android/),
		R = "ontouchend" in Q,
		me = function () {
			var e = "share1",
				a =
					(a =
						(a =
							(a =
								te.native && navigator.share
									? (a = -1 < E.indexOf("Mac") && e) ||
									  (-1 < E.indexOf("CrOS") && "share2")
									: a) ||
							(!!/iPhone|iPad|iPod/.test(E) && e)) ||
						(-1 < E.indexOf("Mac") && R && e)) ||
					(!!/Android/i.test(E) && "share2");
			return (
				(me = function () {
					return a;
				}),
				a
			);
		},
		D = {
			page: {
				most: [
					["Facebook", "facebook", "facebook", "0866FF", { pu: 1 }],
					["Mastodon", "mastodon", "mastodon", "6364FF", { pu: 1 }],
					["LinkedIn", "linkedin", "linkedin", "007BB5", { pu: 1, na: 1 }],
					["WhatsApp", "whatsapp", "whatsapp", "12AF0A", { pu: 1, na: 1 }],
					[
						"Email",
						"email",
						"email",
						"888990",
						{ url: "mailto:?subject=$${title}&body=$${link}" },
					],
					[
						"Pinterest",
						"pinterest",
						"pinterest",
						"e60023",
						{
							type: "js",
							src: "https://assets.pinterest.com/js/pinmarklet.js",
							media: 1,
							pu: 1,
						},
					],
					["Telegram", "telegram", "telegram", "2CA5E0", { na: 1 }],
					[
						"Message",
						"sms",
						"sms",
						"6CBE45",
						{ url: "sms:?&body=$${title}%20$${link}" },
					],
					[
						"Messenger",
						"facebook_messenger",
						"facebook_messenger",
						"0084FF",
						{ pu: 1, na: 1 },
					],
					["Reddit", "reddit", "reddit", "ff4500", { na: 1 }],
					[
						"Gmail",
						"google_gmail",
						"gmail",
						"EA4335",
						{ type: "email", pu: 1 },
					],
					["Pocket", "pocket", "pocket", "EE4056"],
					["Threads", "threads", "threads", "1A1A1A", { pu: 1, na: 1 }],
					["Skype", "skype", "skype", "00AFF0"],
					["Teams", "microsoft_teams", "microsoft_teams", "5059C9", { pu: 1 }],
					["Mix", "mix", "mix", "ff8226"],
					[
						"Google Translate",
						"google_translate",
						"google_translate",
						"528ff5",
					],
					["Amazon Wish List", "amazon_wish_list", "amazon", "F90"],
					["AOL Mail", "aol_mail", "aol", "1A1A1A", { type: "email", pu: 1 }],
					["Balatarin", "balatarin", "balatarin", "079948"],
					["BibSonomy", "bibsonomy", "bibsonomy", "1A1A1A"],
					["Blogger", "blogger", "blogger", "FDA352"],
					["BlogMarks", "blogmarks", "blogmarks", "535353"],
					["Bluesky", "bluesky", "bluesky", "1285fe"],
					["Bookmarks.fr", "bookmarks_fr", "bookmarks_fr", "96C044"],
					["Box.net", "box_net", "box", "1A74B0"],
					["Buffer", "buffer", "buffer", "1A1A1A"],
					[
						"Copy Link",
						"copy_link",
						"link",
						"888990",
						{ type: "js", src: "javascript:a2a.copyLink('$${link}')" },
					],
					["Diary.Ru", "diary_ru", "diary_ru", "912D31"],
					["Diaspora", "diaspora", "diaspora", "2E3436"],
					["Digg", "digg", "digg", "1A1A1A"],
					["Diigo", "diigo", "diigo", "4A8BCA"],
					["Douban", "douban", "douban", "071", { pu: 1 }],
					["Draugiem", "draugiem", "draugiem", "F60", { pu: 1 }],
					["Evernote", "evernote", "evernote", "00A82D"],
					["Fark", "fark", "fark", "555"],
					["Flipboard", "flipboard", "flipboard", "C00", { pu: 1 }],
					["Folkd", "folkd", "folkd", "0F70B2"],
					[
						"Google Classroom",
						"google_classroom",
						"google_classroom",
						"FFC112",
					],
					["Hacker News", "hacker_news", "y18", "F60"],
					["Hatena", "hatena", "hatena", "00A6DB"],
					[
						"Houzz",
						"houzz",
						"houzz",
						"7AC143",
						{
							type: "js",
							src: "https://www.houzz.com/js/clipperBookmarklet.js",
							media: 1,
							pu: 1,
						},
					],
					["Instapaper", "instapaper", "instapaper", "1A1A1A"],
					["Kakao", "kakao", "kakao", "FCB700", { pu: 1 }],
					["Push to Kindle", "kindle_it", "kindle", "1A1A1A"],
					["Known", "known", "known", "1A1A1A"],
					["Line", "line", "line", "00C300", { pu: 1, na: 1 }],
					["LiveJournal", "livejournal", "livejournal", "113140"],
					["Mail.Ru", "mail_ru", "mail_ru", "356FAC"],
					["Mendeley", "mendeley", "mendeley", "A70805"],
					["Meneame", "meneame", "meneame", "FF7D12"],
					["MeWe", "mewe", "mewe", "007DA1"],
					["Micro.blog", "micro_blog", "micro_blog", "FF8800"],
					["Mixi", "mixi", "mixi", "D1AD5A"],
					["MySpace", "myspace", "myspace", "1A1A1A"],
					["Odnoklassniki", "odnoklassniki", "odnoklassniki", "F2720C"],
					[
						"Outlook.com",
						"outlook_com",
						"outlook_com",
						"0072C6",
						{ type: "email" },
					],
					["Papaly", "papaly", "papaly", "3AC0F6", { pu: 1 }],
					["Pinboard", "pinboard", "pinboard", "1341DE", { pu: 1 }],
					["Plurk", "plurk", "plurk", "CF682F"],
					[
						"Print",
						"print",
						"print",
						"888990",
						{ type: "js", src: "javascript:print()" },
					],
					["PrintFriendly", "printfriendly", "printfriendly", "6D9F00"],
					["Pusha", "pusha", "pusha", "0072B8"],
					["Qzone", "qzone", "qzone", "2B82D9"],
					["Raindrop.io", "raindrop_io", "raindrop_io", "0B7ED0"],
					["Rediff MyPage", "rediff", "rediff", "D20000"],
					["Refind", "refind", "refind", "1492ef"],
					["Sina Weibo", "sina_weibo", "sina_weibo", "E6162D"],
					["SiteJot", "sitejot", "sitejot", "FFC808"],
					["Slashdot", "slashdot", "slashdot", "004242"],
					["Snapchat", "snapchat", "snapchat", "1A1A1A", { pu: 1, na: 1 }],
					["StockTwits", "stocktwits", "stocktwits", "40576F", { pu: 1 }],
					["Svejo", "svejo", "svejo", "5BD428"],
					["Symbaloo Bookmarks", "symbaloo_bookmarks", "symbaloo", "6DA8F7"],
					[
						"Threema",
						"threema",
						"threema",
						"1A1A1A",
						{ url: "threema://compose?text=$${title}%20$${link}", na: 1 },
					],
					["Trello", "trello", "trello", "0079BF", { pu: 1 }],
					["Tumblr", "tumblr", "tumblr", "001935", { media: 1, pu: 1 }],
					["Twiddla", "twiddla", "twiddla", "1A1A1A"],
					["Twitter", "twitter", "twitter", "1D9BF0", { pu: 1, na: 1 }],
					["TypePad", "typepad_post", "typepad", "D2DE61"],
					[
						"Viber",
						"viber",
						"viber",
						"7C529E",
						{ url: "viber://forward?text=$${title}%20$${link}", na: 1 },
					],
					["VK", "vk", "vk", "587EA3", { pu: 1 }],
					["WeChat", "wechat", "wechat", "7BB32E"],
					["WordPress", "wordpress", "wordpress", "585C60"],
					["Wykop", "wykop", "wykop", "367DA9"],
					["X", "x", "x", "1A1A1A", { pu: 1, na: 1 }],
					["XING", "xing", "xing", "165B66", { pu: 1 }],
					["Yahoo Mail", "yahoo_mail", "yahoo", "400090", { type: "email" }],
					[
						"Yummly",
						"yummly",
						"yummly",
						"E16120",
						{
							type: "js",
							src: "https://www.yummly.com/js/yumlet.js",
							media: 1,
							pu: 1,
						},
					],
				],
				email: [
					["Email", "email", "email", "888990", { type: "email" }],
					[
						"Gmail",
						"google_gmail",
						"gmail",
						"EA4335",
						{ type: "email", pu: 1 },
					],
					["AOL Mail", "aol_mail", "aol", "1A1A1A", { type: "email", pu: 1 }],
					[
						"Outlook.com",
						"outlook_com",
						"outlook_com",
						"0072C6",
						{ type: "email" },
					],
					["Yahoo Mail", "yahoo_mail", "yahoo", "400090", { type: "email" }],
				],
			},
			feed: {
				most: [
					["Feed", "feed", "feed", "E3702D", { url: "$${link_noenc}" }],
					["Feedly", "feedly", "feedly", "2BB24C"],
					["Feedbin", "feedbin", "feedbin", "1A1A1A"],
					["My Yahoo", "my_yahoo", "yahoo", "400090"],
					["FeedBlitz", "feedblitz", "feedblitz", "FF8B23", { type: "email" }],
					["The Old Reader", "oldreader", "oldreader", "D73F31"],
					["Daily Rotation", "daily_rotation", "dailyrotation", "1A1A1A"],
					[
						"iTunes",
						"itunes",
						"itunes",
						"FB233A",
						{ url: "itpc://$${link_nohttp}" },
					],
					["Netvibes", "netvibes", "netvibes", "7CA900"],
					["NewsAlloy", "newsalloy", "newsalloy", "8E2B3D"],
					[
						"Outlook",
						"outlook",
						"outlook_com",
						"0072C6",
						{ url: "feed://$${link_nohttp}" },
					],
					["PodNova", "podnova", "podnova", "B50419"],
					["Symbaloo Feeds", "symbaloo_feeds", "symbaloo", "6DA8F7"],
					[
						"The Free Dictionary",
						"the_free_dictionary",
						"thefreedictionary",
						"004B85",
					],
				],
				email: [
					["FeedBlitz", "feedblitz", "feedblitz", "FF8B23", { type: "email" }],
				],
			},
		},
		oe =
			((fe = D.page.most.concat(D.feed.most)).forEach(function (e) {
				return i.push(e[2]);
			}),
			{
				apple_music: {
					name: "Apple Music",
					icon: "apple_music",
					color: "fa233b",
				},
				behance: {
					name: "Behance",
					icon: "behance",
					color: "007EFF",
					url: "https://www.behance.net/$${id}",
				},
				bluesky: { name: "Bluesky", icon: "bluesky", color: "1285fe" },
				discord: {
					name: "Discord",
					icon: "discord",
					color: "5865F2",
					url: "https://discord.com/invite/$${id}",
				},
				facebook: {
					name: "Facebook",
					icon: "facebook",
					color: "1877f2",
					url: "https://www.facebook.com/$${id}",
				},
				flickr: {
					name: "Flickr",
					icon: "flickr",
					color: "FF0084",
					url: "https://www.flickr.com/photos/$${id}",
				},
				foursquare: {
					name: "Foursquare",
					icon: "foursquare",
					color: "F94877",
					url: "https://foursquare.com/$${id}",
				},
				github: {
					name: "GitHub",
					icon: "github",
					color: "2A2A2A",
					url: "https://github.com/$${id}",
				},
				google: { name: "Google", icon: "google", color: "4285F4" },
				google_maps: {
					name: "Google Maps",
					icon: "google_maps",
					color: "34A853",
				},
				instagram: {
					name: "Instagram",
					icon: "instagram",
					color: "E4405F",
					url: "https://www.instagram.com/$${id}",
				},
				linkedin: {
					name: "LinkedIn",
					icon: "linkedin",
					color: "007BB5",
					url: "https://www.linkedin.com/in/$${id}",
				},
				linkedin_company: {
					name: "LinkedIn",
					icon: "linkedin",
					color: "007BB5",
					url: "https://www.linkedin.com/company/$${id}",
				},
				medium: {
					name: "Medium",
					icon: "medium",
					color: "2A2A2A",
					url: "https://medium.com/@$${id}",
				},
				pinterest: {
					name: "Pinterest",
					icon: "pinterest",
					color: "BD081C",
					url: "https://www.pinterest.com/$${id}",
				},
				snapchat: {
					name: "Snapchat",
					icon: "snapchat",
					color: "2A2A2A",
					url: "https://www.snapchat.com/add/$${id}",
				},
				soundcloud: { name: "SoundCloud", icon: "soundcloud", color: "ff5500" },
				spotify: { name: "Spotify", icon: "spotify", color: "1ed760" },
				threads: {
					name: "Threads",
					icon: "threads",
					color: "2a2a2a",
					url: "https://www.threads.net/@$${id}",
				},
				tiktok: {
					name: "TikTok",
					icon: "tiktok",
					color: "2a2a2a",
					url: "https://www.tiktok.com/@$${id}",
				},
				tumblr: {
					name: "Tumblr",
					icon: "tumblr",
					color: "35465C",
					url: "https://$${id}.tumblr.com",
				},
				twitter: {
					name: "Twitter",
					icon: "twitter",
					color: "1D9BF0",
					url: "https://twitter.com/$${id}",
				},
				vimeo: {
					name: "Vimeo",
					icon: "vimeo",
					color: "1AB7EA",
					url: "https://vimeo.com/$${id}",
				},
				x: {
					name: "X",
					icon: "x",
					color: "2A2A2A",
					url: "https://x.com/$${id}",
				},
				yelp: { name: "Yelp", icon: "yelp", color: "FF1A1A" },
				youtube: {
					name: "YouTube",
					icon: "youtube",
					color: "FF0000",
					url: "https://www.youtube.com/user/$${id}",
				},
				youtube_channel: {
					name: "YouTube Channel",
					icon: "youtube",
					color: "FF0000",
					url: "https://www.youtube.com/channel/$${id}",
				},
			});
	for (a in oe) i.push(oe[a].icon);
	function g(e) {
		return setTimeout(e, 0);
	}
	function ie(e, a) {
		void 0 === a && (a = {}), _();
		var t,
			n,
			o,
			i,
			r,
			l,
			s = te,
			c = {},
			d = null,
			u = {},
			p = location.href;
		for (t in (la(e), a)) s[t] = a[t];
		for (t in s) c[t] = s[t];
		if ((o = s.target))
			if ("string" == typeof o) {
				if (((n = o.substring(0, 1)), (o = o.substring(1)), "." == n))
					return q(he(T(o, ee)), e, a), void (s.target = ae);
				0 <= (n = (d = S(o)).className).indexOf("a2a_kit") &&
					n.indexOf("a2a_target") < 0 &&
					(d = null);
			} else d = s.target;
		(u.type = x),
			(u.node = d),
			(u.linkmedia = s.linkmedia),
			(u.linkname = s.linkname || ee.title || location.href),
			(u.linkurl = s.linkurl || location.href),
			(u.linkname_escape = s.linkname_escape),
			(u.linkname_implicit =
				!s.linkname_escape && (ee.title || p) == u.linkname),
			(u.linkurl_implicit = p == u.linkurl),
			(u.orientation = s.orientation),
			(u.track_links = s.track_links),
			(u.track_links_key = s.track_links_key || ""),
			L(f),
			"custom" == te.track_links &&
				((te.track_links = Q.a2a_config.track_links = ae),
				(te.track_links_key = Q.a2a_config.track_links_key = "")),
			(Q["a2a" + x + "_init"] = 1),
			(o = c),
			(w = ++k),
			((n = u).n = w),
			(d = (ne["n" + w] = n).node = J(n.node)),
			(p = ne[e]),
			(u = ee.createElement("div")),
			(e = de(d)["a2a-media"]),
			(r = de(d)["a2a-title"]),
			(l = de(d)["a2a-url"]),
			d
				? (n.linkname_escape &&
						(i =
							T("a2a_linkname_escape", d.parentNode)[0] ||
							T("a2a_linkname_escape", d.parentNode.parentNode)[0]) &&
						(n.linkname = i.textContent || i.innerText),
				  (n.linkmedia = o.linkmedia = e || n.linkmedia),
				  (n.linkname = o.linkname = r || n.linkname),
				  (n.linkurl = o.linkurl = l || n.linkurl),
				  r && (n.linkname_implicit = !1),
				  l && (n.linkurl_implicit = !1),
				  "textContent" in ee
						? (u.textContent = n.linkname)
						: (u.innerText = n.linkname),
				  (i = u.childNodes[0]) && (n.linkname = i.nodeValue),
				  d.a2a_kit ? G(n, o) : Y(n))
				: p.show_menu || k--,
			V();
	}
	function H(a) {
		$$(function (e) {
			0 <= e.className.indexOf("a2a_follow")
				? ie("feed", { target: e })
				: ie(a || "page", { target: e });
		}, !0) ||
			!S("a2a_menu_container") ||
			V.a2a_done ||
			ie(a);
	}
	function P(e) {
		var a = te.onclick,
			e = p(S("a2a" + e + "_show_more_less"));
		return (a && 2 !== a) || !e;
	}
	function $$(i, e) {
		var a = (t = T)("a2a_kit", ee),
			t = he(ee.getElementsByName("a2a_dd")).concat(t("a2a_dd", ee));
		function n(e) {
			for (var a, t, n = 0, o = e.length; n < o; n++)
				if (
					(t =
						(void 0 === (a = e[n]).a2a_index || "" === a.a2a_index) &&
						a.className.indexOf("a2a_target") < 0 &&
						a.parentNode.className.indexOf("a2a_kit") < 0
							? i(a)
							: t)
				)
					return t;
			return null;
		}
		if (e) return n(a) || n(t);
		n(a.concat(t));
	}
	function W(e) {
		try {
			ee.createDocumentFragment().querySelector(e);
		} catch (e) {
			return !1;
		}
		return !0;
	}
	var U = {
			isReady: !1,
			ready: function (e) {
				function a() {
					if (!ee.body)
						return setTimeout(function () {
							U.ready(e);
						});
					e(), (U.isReady = !0);
				}
				var t = function (e) {
					(!ee.addEventListener &&
						"load" !== e.type &&
						"complete" !== ee.readyState) ||
						(ee.removeEventListener("DOMContentLoaded", t, !1),
						Q.removeEventListener("load", t, !1),
						a());
				};
				"complete" === ee.readyState
					? a()
					: ee.addEventListener &&
					  (ee.addEventListener("DOMContentLoaded", t, !1),
					  Q.addEventListener("load", t, !1));
			},
		},
		q = function (e, a, t) {
			for (var n = 0, o = e.length; n < o; n++) (t.target = e[n]), ie(a, t);
		},
		Y = function (o) {
			function i() {
				y(r), (x = l);
				var e = S(s + "_dropdown"),
					a = p(e),
					t = p(S(s + "_show_more_less")),
					n = te.onclick,
					o = ee.activeElement;
				a
					? h("none", l)
					: (!P(l) && "mail" != l) || (B(r), (ne[l].last_focus = o), e.focus()),
					t && (a || 2 === n) && "mail" != l && (F(), (ne[l].last_focus = o));
			}
			function t(e) {
				function a(o) {
					return new Promise(function (t, e) {
						var n;
						(n = o),
							new Promise(function (e, a) {
								var t = new XMLHttpRequest();
								t.open("GET", n),
									(t.responseType = "blob"),
									(t.onload = function () {
										return e(t.response);
									}),
									(t.onerror = function () {
										return a(new Error("Network error."));
									}),
									t.send();
							})
								.then(function (e) {
									try {
										a = new URL(o).pathname.split(".").pop();
									} catch (e) {}
									var a = a || e.type.split("/")[1].match(/(?!x-)\w\w{3,4}/)[0],
										a = new File([e], "media.".concat(a), { type: e.type });
									t(a);
								})
								.catch(function (e) {
									console.warn(
										'To be shared natively, images need the "Access-Control-Allow-Origin" header.'
									);
								});
					});
				}
				var t,
					e = e.altKey,
					n = te.native;
				!(
					(n =
						((j || R) && (n === ae || !0 === n)) ||
						(!0 === n && navigator.share)) ||
					e ||
					c
				) ||
				(n && (e || c))
					? i()
					: (Te(o),
					  (t = { url: o.linkurl, text: o.linkname, files: [] }),
					  (n = o.linkmedia)
							? a(n).then(function (e) {
									t.files.push(e), Se(t, i);
							  })
							: Se(t, i)),
					(c = !1);
			}
			function e() {
				var e;
				me() ||
					((e = !!(e = te.exclude_services) && 9 < e.length),
					P(l) || e || (Qe = !1),
					We(l)),
					d.destroy(),
					u.destroy();
			}
			var n,
				r = o.node,
				l = o.type,
				a = r.parentElement,
				s = "a2a" + l,
				c = (a.a2a_kit && (o.kit = a), !1),
				d = le(r, "focus", e),
				u = le(r, "mouseenter", e),
				a =
					((r.getAttribute("onclick") &&
						-1 != (r.getAttribute("onclick") + "").indexOf("a2a_")) ||
						(r.getAttribute("onmouseover") &&
							-1 != (r.getAttribute("onmouseover") + "").indexOf("a2a_")) ||
						(le(r, "click", function (e) {
							X(e), K(e), t(e);
						}),
						le(
							r,
							"touchstart",
							function (e) {
								var a = r.style;
								(a.webkitTouchCallout = a.webkitUserSelect = "none"),
									(n = setTimeout(function () {
										(c = !0),
											t(e),
											(a.webkitTouchCallout = a.webkitUserSelect = "");
									}, 700));
							},
							!!z.evOpts() && { passive: !0 }
						),
						le(
							r,
							"touchend",
							function () {
								clearTimeout(n);
							},
							!!z.evOpts() && { passive: !0 }
						),
						le(r, "click", K),
						le(r, "touchstart", K, !!z.evOpts() && { passive: !0 }),
						te.onclick) ||
						(ne[x].delay
							? (r.onmouseenter = function () {
									ne[x].over_delay = setTimeout(function () {
										B(r);
									}, ne[x].delay);
							  })
							: le(r, "mouseenter", function () {
									return g(function () {
										return B(r);
									});
							  }),
						(r.onmouseleave = function () {
							be(), ne[x].over_delay && clearTimeout(ne[x].over_delay);
						})),
					"a" == r.tagName.toLowerCase() &&
						"page" == x &&
						(r.href =
							"https://www.addtoany.com/share#url=" +
							encodeURIComponent(o.linkurl) +
							"&title=" +
							encodeURIComponent(o.linkname).replace(/'/g, "%27")),
					r.firstChild);
			a &&
				void 0 !== a.srcset &&
				/\/share_save_171_16.(?:gif|png)$$/.test(a.src) &&
				(a.srcset =
					"https://static.addtoany.com/buttons/share_save_342_32.png 2x");
		},
		G = function (s, I) {
			function j(e, a) {
				if (e && !se(e, R))
					for (
						var t = 0,
							n = a ? ne[i].services.most.concat(ne[i].services.email) : fe,
							o = n.length;
						t < o;
						t++
					)
						if (e == n[t][1]) return n[t];
				return !a && [e, e];
			}
			function c(e, a) {
				for (var t, n = 0, o = e.attributes.length, i = a; n < o; n++)
					(t = e.attributes[n]).name &&
						"data-" == t.name.substring(0, 5) &&
						(i[t.name.substring(5)] = t.value);
				return i;
			}
			function d(e, a, t) {
				(t = {
					media: s.linkmedia,
					mediaNode: n.a2a_mediaNode,
					node: t,
					service: e,
					serviceCode: a,
					title: s.linkname,
					url: s.linkurl,
				}),
					Ee(t, s);
			}
			for (
				var u,
					i = s.type,
					R = [
						"facebook_like",
						"twitter_tweet",
						"pinterest_pin",
						"linkedin_share",
					],
					D = re.avail,
					H = te.templates,
					n = s.node,
					e = de(n),
					a = n.className,
					t = n.a2a_follow,
					P = he(n.getElementsByTagName("a")),
					$$ = P.length,
					W = ee.createElement("div"),
					o = e["a2a-icon-color"] || te.icon_color,
					r = o && o.split(",", 2),
					l = r && r[0],
					p = r && r[1],
					U = "a2a_svg a2a_s__default a2a_s_",
					f = {},
					_ = {},
					r = e["a2a-scroll-show"],
					m = 0 <= a.indexOf("a2a_vertical_style"),
					e = a.match(/a2a_kit_size_([\w\.]+)(?:\s|$$)/),
					h = e ? e[1] : "16",
					g = parseInt(h, 10),
					e = h + "px",
					v =
						(h &&
							!isNaN(g) &&
							(o &&
								"unset" != o &&
								(l && "unset" != l && (f.backgroundColor = l), p) &&
								"unset" != p.trim() &&
								(p = p.trim()),
							(n.style.lineHeight = _.height = _.lineHeight = e),
							(_.width = 2 * g + "px"),
							(_.fontSize = "16px"),
							m &&
								((_.height = _.lineHeight = g / 2 + "px"),
								(_.fontSize = "10px"),
								(_.width = h + "px")),
							r && ve(n, r),
							32 != g) &&
							((f.backgroundSize = f.height = f.lineHeight = f.width = e),
							(_.borderRadius = f.borderRadius = (0.14 * g).toFixed() + "px"),
							(_.fontSize = (parseInt(_.height, 10) + (m ? 4 : 0)) / 2 + "px")),
						{
							facebook_like: function (t, n) {
								(L.href = s.linkurl),
									(L.width = "90"),
									(L.layout = "button_count"),
									(L.ref = "addtoany"),
									(L = c(t, L)),
									(t.style.width = L.width + "px");
								var e,
									a,
									o,
									i,
									r = "v17.0",
									l = ia();
								for (e in (2 ==
									(l = l ? l.replace(/-/, "_") : "en_US").length &&
									(l += "_" + l.toUpperCase()),
								L))
									N += " data-" + e + '="' + L[e] + '"';
								Q.fbAsyncInit ||
									((Q.fbAsyncInit = function () {
										Q.FB.init({
											appId: "0",
											status: !1,
											xfbml: !0,
											version: r,
										}),
											Q.FB.Event.subscribe("edge.create", function (e, a) {
												ce.track("Facebook Like", "facebook_like", e),
													d("Facebook Like", n, t);
											});
									}),
									((u = ee.createElement("span")).id = "fb-root"),
									ee.body.insertBefore(u, ee.body.firstChild)),
									v.facebook_like_script ||
										((o = "facebook-jssdk"),
										(i = (a = ee).getElementsByTagName("script")[0]),
										a.getElementById(o)) ||
										(((a = a.createElement("script")).id = o),
										(a.src =
											"https://connect.facebook.net/" +
											l +
											"/sdk.js#xfbml=1&version=" +
											r),
										i.parentNode.insertBefore(a, i)),
									(v.facebook_like_script = 1),
									(t.innerHTML = '<div class="fb-like"' + N + "></div>");
								try {
									Q.FB.XFBML.parse(t);
								} catch (e) {}
							},
							facebook_like_script: ae,
							twitter_tweet: function (a, t) {
								(L.url = s.linkurl),
									(L.lang = ia() || "en"),
									(L.related = "AddToAny,micropat");
								var e,
									n,
									o,
									i = H.twitter,
									r = "string" == typeof i ? i.lastIndexOf("@") : null,
									l =
										(r &&
											-1 !== r &&
											((r = (r = i.substring(++r).split(" ", 1))[0]
												.replace(/:/g, "")
												.replace(/\//g, "")
												.replace(/-/g, "")
												.replace(/\./g, "")
												.replace(/,/g, "")
												.replace(/;/g, "")
												.replace(/!/g, "")),
											(L.related = r + ",AddToAny")),
										(L = c(a, L)),
										ee.createElement("a"));
								for (e in ((l.className = "twitter-share-button"), L))
									l.setAttribute("data-" + e, L[e]);
								a.appendChild(l),
									v.twitter_tweet_script ||
										((i = "twitter-wjs"),
										(o = (r = ee).getElementsByTagName("script")[0]),
										r.getElementById(i)) ||
										(((r = r.createElement("script")).id = i),
										(r.src = "https://platform.twitter.com/widgets.js"),
										o.parentNode.insertBefore(r, o),
										(Q.twttr =
											Q.twttr ||
											(n = {
												_e: [],
												ready: function (e) {
													n._e.push(e);
												},
											}))),
									(v.twitter_tweet_script = 1);
								try {
									Q.twttr.ready(function (e) {
										v.twitter_bind ||
											(e.events.bind("click", function (r) {
												var e;
												r &&
													"tweet" == r.region &&
													(e = (function () {
														var e = r.target.src.split("#")[1] || "";
														if (e && -1 < e.indexOf("url=")) {
															for (
																var a = {},
																	t = e.split("&"),
																	n = t.length,
																	o = 0;
																o < n;
																o++
															) {
																var i = t[o].split("=");
																a[i[0]] = i[1];
															}
															return a;
														}
														return !1;
													})()) &&
													e.url &&
													(ce.track(
														"Twitter Tweet",
														"twitter_tweet",
														decodeURIComponent(e.url)
													),
													d("Twitter Tweet", t, a));
											}),
											(v.twitter_bind = 1)),
											e.widgets && e.widgets.load();
									});
								} catch (e) {}
							},
							twitter_tweet_script: ae,
							twitter_bind: ae,
							pinterest_pin: function (e, a) {
								(L["pin-config"] = "beside"),
									(L["pin-do"] = "buttonPin"),
									(L.media = s.linkmedia),
									(L.url = s.linkurl),
									(L = c(e, L));
								var t,
									n,
									o,
									i = ee.createElement("a");
								for (t in L) i.setAttribute("data-" + t, L[t]);
								"beside" == L["pin-config"] &&
									"buttonPin" == L["pin-do"] &&
									(e.style.width = "76px"),
									(i.href =
										"https://www.pinterest.com/pin/create/button/?url=" +
										L.url +
										(L.media ? "&media=" + L.media : "") +
										(L.description
											? "&description=" +
											  encodeURIComponent(L.description).replace(/'/g, "%27")
											: "")),
									le(e, "click", function () {
										ce.track("Pinterest Pin", "pinterest_pin", s.linkurl),
											d("Pinterest Pin", a, e);
									}),
									e.appendChild(i),
									v.pinterest_pin_script ||
										((o = (n = ee).createElement("script")),
										(n = n.getElementsByTagName("script")[0]),
										(o.async = !0),
										(o.src = "https://assets.pinterest.com/js/pinit.js"),
										n.parentNode.insertBefore(o, n)),
									(v.pinterest_pin_script = 1);
							},
							pinterest_pin_script: ae,
							linkedin_share: function (e, a) {
								for (var t in ((L.onsuccess = "kit.linkedin_share_event"),
								(L.url = s.linkurl),
								(L = c(e, L))))
									N += " data-" + t + '="' + L[t] + '"';
								var n, o;
								(v.linkedin_share_event = function () {
									ce.track("LinkedIn Share", "linkedin_share", s.linkurl),
										d("LinkedIn Share", a, e);
								}),
									v.linkedin_share_script ||
										((o = (n = ee).createElement("script")),
										(n = n.getElementsByTagName("script")[0]),
										(o.type = "text/javascript"),
										(o.async = !0),
										(o.src = "https://platform.linkedin.com/in.js"),
										n.parentNode.insertBefore(o, n)),
									(v.linkedin_share_script = 1),
									(e.innerHTML = '<script type="IN/Share"' + N + "></script>");
							},
							linkedin_share_event: ae,
							linkedin_share_script: ae,
						}),
					q = 0;
				q < $$;
				q++
			) {
				var y,
					k = P[q],
					b = k.className,
					w = b.match(/a2a_button_([\w\.]+)(?:\s|$$)/),
					Y = 0 <= b.indexOf("a2a_dd"),
					b = 0 <= b.indexOf("a2a_counter"),
					w = !!w && w[1],
					x = k.childNodes,
					A = j(w),
					G = t && oe[w] ? oe[w].name : A[0],
					C = "_blank",
					E = t && oe[w] ? oe[w].icon : A[2],
					S = t && oe[w] ? oe[w].color : A[3] || "CAE0FF",
					T = (A[4], !1),
					F = !1,
					B = 0 <= a.indexOf("a2a_color_buttons"),
					V = void 0,
					J = void 0,
					N = "",
					L = {};
				if (
					(Y
						? ((I.target = k),
						  ie(i, I),
						  (w = "a2a"),
						  (S = "0166FF"),
						  (y = me()),
						  (E = "page" === i && y ? y : "a2a"),
						  (F = b),
						  0 <= a.indexOf("a2a_floating_style") && (k.a2a_floating = 1))
						: "feed" == w || "print" == w
						? (C = "")
						: b && w && se(w, D)
						? (F = !0)
						: w && se(w, R) && (v[w](k, w), (T = !0)),
					w && !se(w, ["google_plus", "stumbleupon"]) && !T)
				) {
					if (
						(Y ||
							((n.a2a_codes = n.a2a_codes || []),
							n.a2a_codes.push(w),
							(k.target = C),
							!t || (!oe[w] && j(w, !0))
								? "feed" === w
									? (k.href = k.href || s.linkurl)
									: pe(ue(A), k, s)
								: (k.href =
										((y = w),
										(T = b = void 0),
										(T = c((C = k), {})["a2a-follow"]),
										(y = oe[y]),
										(b = T && y && y.url ? y.url.replace("$${id}", T) : b) ||
											C.href))),
						x.length)
					) {
						for (var z, K, X, M = 0, Z = x.length; M < Z; M++)
							if (
								((X =
									(K = "string" == typeof (z = x[M].className)) &&
									("a2a_label" === z || 0 <= z.indexOf("a2a_ignore"))),
								1 == x[M].nodeType &&
									(X || (J = !0), K) &&
									0 <= z.indexOf("a2a_count"))
							) {
								V = !0;
								break;
							}
						if (!J) {
							for (var O in (((u = ee.createElement("span")).className =
								U + E + " a2a_img_text"),
							S && !B && (u.style.backgroundColor = "#" + S),
							ze(E, u, p),
							f))
								u.style[O] = f[O];
							k.insertBefore(u, x[0]);
						}
					} else {
						for (var O in (((u = ee.createElement("span")).className = U + E),
						S && !B && (u.style.backgroundColor = "#" + S),
						ze(E, u, p),
						f))
							u.style[O] = f[O];
						k.appendChild(u),
							((u = ee.createElement("span")).className = "a2a_label"),
							(u.innerHTML =
								G || ("feed" == i ? te.localize.Subscribe : te.localize.Share)),
							G ||
								((u.className += " a2a_localize"),
								u.setAttribute(
									"data-a2a-localize",
									"inner," + ("feed" == i ? "Subscribe" : "Share")
								)),
							k.appendChild(u);
					}
					if ((F = m && h && g < 20 ? !1 : F) && !V) {
						for (var O in (((u = ee.createElement("span")).className =
							"a2a_count"),
						(u.a2a = {}),
						(u.a2a.kit = n),
						_))
							(B && 0 <= ["width", "height"].indexOf(O)) || (u.style[O] = _[O]);
						k.appendChild(u);
						A = (
							s.linkurl_implicit && _e
								? encodeURIComponent(_e)
								: encodeURIComponent(s.linkurl)
						).replace(/'/g, "%27");
						Y
							? ((u.a2a.is_a2a_dd_counter = 1),
							  (n.a2a_dd_counter = u),
							  re.get("facebook", u, A))
							: re.get(w, u, A);
					}
					S && B && (k.style.backgroundColor = "#" + S);
				}
			}
			0 <= a.indexOf("a2a_default_style") &&
				((W.style.clear = "both"), n.appendChild(W));
		},
		re = {
			get: function (i, r, e, l) {
				te.counts;
				var s,
					a,
					t = decodeURIComponent(e),
					n = re.bonus(i, t, e, r.a2a.kit),
					c = "",
					o = re[i],
					d = o.api,
					u = (o.cb, r.a2a.is_a2a_dd_counter);
				!l && n && ((c = "2"), re.get(i, r, n, !0)),
					"string" != typeof (s = o[t] = o[t] || {}).num || l
						? "number" == typeof s.num
							? u
								? re.sum(r, s.num, i + c)
								: re.set(r, s.num, i + c)
							: ((s.queued = s.queued || []),
							  s.queued.push(r),
							  (o.n = o.n || 0),
							  o.n++,
							  (o["cb" + o.n] = function (e) {
									var a,
										t = re[i].cb(e, r);
									if (void 0 !== t)
										if ("string" == typeof t && "facebook" == i)
											"empty" == t
												? (a =
														"Note: Facebook no longer provides public API access to share counts. AddToAny is soon launching a premium service to manage private API access to Facebook and display share counts.")
												: "limit" == t &&
												  (a =
														"Facebook's public share counts API has reached its request limit from your connection. Try again later."),
												console.log("%c" + a, "color:#1877f2"),
												l || (r.style.display = "none"),
												(s.num = "error");
										else
											for (var n, o = 0; o < s.queued.length; o++)
												(n = s.queued[o]),
													(s.num = t),
													n.a2a.is_a2a_dd_counter
														? re.sum(n, t, i + c)
														: re.set(n, t, i + c);
							  }),
							  1 == s.queued.length &&
									((a =
										d[0] +
										e +
										(d[1] || "&callback") +
										"=a2a.counters." +
										i +
										".cb" +
										o.n),
									U.ready(function () {
										Ve(a);
									})))
						: (r.style.display = "none");
			},
			set: function (e, a, t) {
				var n = a;
				(a = void 0 !== e.a2a.last_count ? e.a2a.last_count + a : a),
					(e.innerHTML = "<span>" + re.format(a) + "</span>"),
					"a2a" != t && ((e.a2a.last_count = n), re.sum(e, n, t));
			},
			sum: function (e, a, t) {
				var e = e.a2a.kit,
					n = e.a2a_counts_sum || 0,
					o = e.a2a_counts_summed || [];
				"a2a" != t &&
					-1 === o.indexOf(t) &&
					((n = e.a2a_counts_sum = n + a),
					(o = e.a2a_counts_summed = o || []).push(t)),
					e.a2a_dd_counter && re.set(e.a2a_dd_counter, n, "a2a");
			},
			format: function (e) {
				var a = re.format,
					t = "localize";
				return (
					a[t] ||
						((a.locale = ia()),
						(a[t] =
							"object" == typeof Intl &&
							Intl &&
							"function" == typeof Intl.NumberFormat
								? function (e) {
										return e.toLocaleString(a.locale, {
											maximumFractionDigits: 1,
										});
								  }
								: function (e, a) {
										return a && "decimal" === a
											? Math.round(10 * e) / 10
											: (e += "").charAt(0) + "," + e.substring(1);
								  })),
					(e =
						999 < e
							? e < 1e6
								? 1e4 < e
									? a[t](e / 1e3, "decimal") + "k"
									: a[t](e)
								: e < 1e9
								? a[t](e / 1e6, "decimal") + "M"
								: "1B+"
							: e)
				);
			},
			bonus: function (e, a, t, n) {
				var o,
					i,
					r = te.counts,
					l = "%3A%2F%2F";
				return (
					r &&
						(r.recover_protocol &&
							"http" === r.recover_protocol &&
							((o = t.replace(/^https%/, "http%")),
							(a = decodeURIComponent(o))),
						r.recover_domain &&
							((o = encodeURIComponent(
								a.replace(
									/^(https?\:\/\/)(?:[^\/?#]+)([\/?#]|$$)/i,
									"$$1" + r.recover_domain + "$$2"
								)
							)),
							(a = decodeURIComponent(o))),
						r.recover) &&
						"function" == typeof r.recover &&
						((a = {
							url: ((i = ee.createElement("a")).href = a),
							pathParts: i.pathname.split("/"),
							domain: i.hostname,
							protocol: i.protocol,
							kit: n,
						}),
						(o = encodeURIComponent(r.recover(a)))),
					!(
						!o ||
						o === t ||
						(-1 !== ["tumblr"].indexOf(e) &&
							o.split(l).pop() === t.split(l).pop())
					) && o
				);
			},
			avail: ["facebook", "pinterest", "reddit", "tumblr"],
			facebook: {
				api: [
					"https://graph.facebook.com/?fields=og_object%7Bengagement%7D&id=",
					"&callback",
				],
				cb: function (e, a) {
					return e &&
						e.og_object &&
						e.og_object.engagement &&
						!isNaN(e.og_object.engagement.count)
						? e.og_object.engagement.count
						: e && e.error && e.error.code && 4 === e.error.code
						? "limit"
						: "empty";
				},
			},
			pinterest: {
				api: ["https://widgets.pinterest.com/v1/urls/count.json?url="],
				cb: function (e, a) {
					if (e && !isNaN(e.count)) return e.count;
				},
			},
			reddit: {
				api: ["https://www.reddit.com/api/info.json?url=", "&jsonp"],
				cb: function (e, a) {
					var t = e.data;
					if (e && t && t.children) {
						for (var n = [], o = t.children, i = 0; i < o.length; i++) {
							var r = o[i].data;
							r && !isNaN(r.ups) && n.push(r.ups);
						}
						return 0 < n.length ? Math.max.apply(null, n) : 0;
					}
				},
			},
			tumblr: {
				api: ["https://api.tumblr.com/v2/share/stats?url="],
				cb: function (e, a) {
					if (e && e.response && !isNaN(e.response.note_count))
						return e.response.note_count;
				},
			},
		},
		V = function () {
			var e = ne[x],
				a = w;
			e.bookmarklet && ((e.no_hide = 1), (A = a), B()),
				e.show_menu &&
					((e.no_hide = 1), (A = a), B(null, e.show_menu), (e.show_menu = ae)),
				(V.a2a_done = 1);
		},
		J = function (e) {
			function a(e) {
				0 <= e.className.indexOf("a2a_kit") &&
					((e.a2a_kit = 1), 0 <= e.className.indexOf("a2a_follow")) &&
					(e.a2a_follow = 1);
			}
			return e
				? ((e.a2a_index = w), a(e), e)
				: $$(function (e) {
						return (e.a2a_index = w), a(e), e;
				  }, !0);
		},
		S = function (e) {
			return ee.getElementById(e);
		},
		T = function (e, a, t) {
			for (
				var n,
					o = (a = a || S("a2a" + x + "_dropdown")).getElementsByClassName(e),
					i = t ? new RegExp("\\b" + t + "\\b", "i") : null,
					r = [],
					l = 0,
					s = o.length;
				l < s;
				l += 1
			)
				(n = o[l]), (i && !i.test(n.nodeName)) || r.push(n);
			return r;
		},
		he = function (e) {
			for (var a = [], t = e.length, n = 0; n < t; n++) a[a.length] = e[n];
			return a;
		},
		le =
			((z.matches = function (e, a) {
				var t,
					n = "MatchesSelector",
					o = "ms" + n,
					n = "webkit" + n;
				if (e.matches) t = "matches";
				else if (e[o]) t = o;
				else {
					if (!e[n])
						return !(z.matches = function (e, a) {
							return !1;
						});
					t = n;
				}
				return (
					(z.matches = function (e, a) {
						try {
							return e[t](a);
						} catch (e) {
							console.error("'".concat(a, "' is not a valid selector."));
						}
					}),
					z.matches(e, a)
				);
			}),
			(z.evOpts = function () {
				var e = !1;
				try {
					var a = Object.defineProperty({}, "passive", {
						get: function () {
							e = !0;
						},
					});
					Q.addEventListener("test", null, a);
				} catch (e) {}
				return (
					(z.evOpts = function () {
						return e;
					}),
					e
				);
			}),
			function (e, a, t, n) {
				var o;
				return (
					"object" == typeof n &&
						((o = !!n.useCapture), (n = z.evOpts() ? n : o)),
					e.addEventListener(a, t, n),
					{
						destroy: function () {
							e.removeEventListener(a, t, n);
						},
					}
				);
			}),
		K = function (e) {
			e.stopPropagation();
		},
		X = function (e) {
			e.preventDefault();
		},
		se = function (e, a, t, n, o) {
			if ("object" == typeof a) {
				e = e.toLowerCase();
				for (var i, r = a.length, l = 0; l < r; l++)
					if (((i = n ? a[l][n] : a[l]), (i = o ? i[o] : i), t)) {
						if (e == i.toLowerCase()) return a[l];
					} else if (-1 != e.indexOf(i.toLowerCase()) && "" !== i) return a[l];
			}
			return !1;
		},
		Z = function (e, a) {
			var t,
				n,
				o,
				i = [];
			for (t in e)
				e.hasOwnProperty(t) &&
					((n = a ? a + "[" + t + "]" : t),
					(o = e[t]),
					i.push(
						"object" == typeof o
							? Z(o, n)
							: encodeURIComponent(n) + "=" + encodeURIComponent(o)
					));
			return i.join("&");
		};
	function ge(n, o, e) {
		var i,
			r,
			t,
			l,
			s,
			c,
			d = 0,
			u = !1,
			p = !1,
			a = !0,
			f = !o && 0 !== o && "function" == typeof Q.requestAnimationFrame;
		if ("function" != typeof n) throw new TypeError("Not a function");
		function _(e) {
			var a = i,
				t = r;
			return (i = r = void 0), (d = e), (l = n.apply(t, a));
		}
		function m(e, a) {
			return f
				? (Q.cancelAnimationFrame(s), Q.requestAnimationFrame(e))
				: setTimeout(e, a);
		}
		function h(e) {
			var a = e - c;
			return void 0 === c || o <= a || a < 0 || (p && t <= e - d);
		}
		function g() {
			var e,
				a = Date.now();
			if (h(a)) return v(a);
			s = m(
				g,
				((e = (a = a) - d), (a = o - (a - c)), p ? Math.min(a, t - e) : a)
			);
		}
		function v(e) {
			return (s = void 0), a && i ? _(e) : ((i = r = void 0), l);
		}
		function y() {
			for (var e = [], a = 0; a < arguments.length; a++) e[a] = arguments[a];
			var t = Date.now(),
				n = h(t);
			if (((i = e), (r = this), (c = t), n)) {
				if (void 0 === s) return (d = t = c), (s = m(g, o)), u ? _(t) : l;
				if (p) return (s = m(g, o)), _(c);
			}
			return void 0 === s && (s = m(g, o)), l;
		}
		return (
			(o = +o || 0),
			e &&
				((u = !!e.leading),
				(p = "maxWait" in e),
				(t = p ? Math.max(+e.maxWait || 0, o) : t),
				(a = "trailing" in e ? !!e.trailing : a)),
			(y.cancel = function () {
				void 0 !== s &&
					!(function (e) {
						if (f) return Q.cancelAnimationFrame(e);
						clearTimeout(e);
					})(s),
					(i = c = r = s = void (d = 0));
			}),
			(y.flush = function () {
				return void 0 === s ? l : v(Date.now());
			}),
			(y.pending = function () {
				return void 0 !== s;
			}),
			y
		);
	}
	var ve = function (e, a) {
			(a = a.split(","))[0] && a[0].trim(), a[1] && a[1].trim();
			var n,
				t = parseInt(a[0], 10) || 0,
				a = parseInt(a[1], 10) || 0,
				e = function (e, a, t) {
					var n = Q.pageYOffset,
						o = ee.documentElement.scrollHeight - Q.innerHeight - n;
					e.style.display = a <= n && t <= o ? "" : "none";
				}.bind(null, e, t, a);
			(t || a) &&
				((ve.handlers = ve.handlers || []),
				(n = ve.handlers).push(e),
				n.length < 2 &&
					((t = (function (e, a, t) {
						var n = !0,
							o = !0;
						if ("function" != typeof e) throw new TypeError("Not a function");
						return (
							t &&
								((n = "leading" in t ? !!t.leading : n),
								(o = "trailing" in t ? !!t.trailing : o)),
							ge(e, a, { leading: n, trailing: o, maxWait: a })
						);
					})(function () {
						for (var e = 0, a = n, t = a.length; e < t; e++) a[e]();
					}, 20)),
					Q.addEventListener("scroll", t)),
				e());
		},
		ye =
			"undefined" != typeof WeakMap && "function" == typeof new WeakMap().get;
	function ke(i, r, l) {
		if (!ye) return i;
		if ("function" != typeof i || (null != r && "function" != typeof r))
			throw new TypeError("Not a function");
		function s() {
			for (var e = [], a = 0; a < arguments.length; a++) e[a] = arguments[a];
			var t,
				n = r ? r.apply(this, e) : e[0],
				o = s.cache;
			return o.has(n)
				? o.get(n)
				: ((t = i.apply(this, e)),
				  (s.cache = ((!l || null != t) && o.set(n, t)) || o),
				  t);
		}
		return (s.cache = new WeakMap()), s;
	}
	function be() {
		var e = x,
			a = "a2a" + e,
			t = ne[e];
		p(S(a + "_dropdown")) &&
			"none" === Ie(S(a + "_full"), "display") &&
			(t.out_delay = setTimeout(function () {
				h("none", e), (t.out_delay = null);
			}, 501));
	}
	function we(e, a) {
		var t = Math.round,
			e = e.getBoundingClientRect(),
			n = "scroll" === a ? je("w") : 0,
			a = "scroll" === a ? je("h") : 0;
		return { left: t(e.left + n), top: t(e.top + a) };
	}
	function xe(e) {
		var a = 0,
			t = 0;
		return (
			"number" == typeof Q.innerWidth
				? ((a = Q.innerWidth), (t = Q.innerHeight))
				: ee.documentElement &&
				  (ee.documentElement.clientWidth || ee.documentElement.clientHeight)
				? ((a = ee.documentElement.clientWidth),
				  (t = ee.documentElement.clientHeight))
				: ee.body &&
				  (ee.body.clientWidth || ee.body.clientHeight) &&
				  ((a = ee.body.clientWidth), (t = ee.body.clientHeight)),
			"w" == e ? a : t
		);
	}
	function Ae() {
		var e = S("a2a" + x + "_find");
		"none" != S("a2a" + x + "_find_container").style.display && e.focus();
	}
	function Ce() {
		var e = ne[x].main_services,
			a = e.length,
			t = S("a2a" + x + "_find").value;
		if ("" !== t)
			for (var n, o = t.split(" "), i = 0; i < a; i++)
				(n = e[i].a2a.serviceNameLowerCase),
					se(n, o, !1)
						? (e[i].style.display = "")
						: (e[i].style.display = "none");
		else Re();
	}
	function Ee(e, a, t) {
		var n = !1,
			o = He("share", e);
		return (
			void 0 !== o &&
				(o.url && ((a.linkurl = o.url), (a.linkurl_implicit = !1)),
				o.title && ((a.linkname = o.title), (a.linkname_implicit = !1)),
				o.media && (a.linkmedia = o.media),
				Pe(e.node),
				o.stop) &&
				t &&
				((n = !0), X(t)),
			n
		);
	}
	function Se(e, a) {
		navigator.canShare && navigator.canShare(e)
			? navigator.share(e).catch(function (e) {
					"AbortError" !== e.name ? a() : He("shareError", e);
			  })
			: a();
	}
	function Te(e) {
		var a = e.kit || e.node,
			t = de(a)["a2a-url"];
		t && ((e.linkurl = t), (e.linkurl_implicit = !1)),
			(t = de(a)["a2a-title"]) &&
				((e.linkname = t), (e.linkname_implicit = !1)),
			(t = de(a)["a2a-media"]) && (e.linkmedia = t);
	}
	function Fe() {
		S("a2a_overlay");
		for (
			var e = S("a2a_modal"), a = T("a2a_modal_body", e), t = 0;
			t < a.length;
			t++
		)
			a[t].style.display = "none";
		v.show(), l("show", e);
	}
	function Be(e) {
		var a = s,
			t = "focus",
			n = "waiting";
		function o() {
			d("post"), s.show(e), Q.removeEventListener(t, o), (a[n] = 0);
		}
		a[n] ||
			((a[n] = 1),
			Q.addEventListener("blur", function e() {
				Q.removeEventListener("blur", e), Q.addEventListener(t, o);
			}));
	}
	function Ne(e, a) {
		var t,
			o,
			i = /^$$|^module$$|\/(?:java|ecma)script/i;
		function n() {
			var e = ee.createEvent("Event");
			e.initEvent("DOMContentLoaded", !0, !0), ee.dispatchEvent(e);
		}
		(a.innerHTML = e),
			(e = (e = a).querySelectorAll("script")),
			(o = []),
			[].forEach.call(e, function (n) {
				((t = n.getAttribute("type")) && !i.test(t)) ||
					o.push(function (e) {
						var a, t;
						(a = n),
							(e = e),
							(t = ee.createElement("script")),
							a.src
								? ((t.onload = e), (t.onerror = e), (t.src = a.src))
								: (t.textContent = a.innerText),
							ee.head.appendChild(t),
							a.src || e();
					});
			}),
			o.length &&
				(function e(a, t, n) {
					a[(n = void 0 === n ? 0 : n)](function () {
						++n === a.length ? t() : e(a, t, n);
					});
				})(o, n);
	}
	function ce() {
		function e() {
			"object" == typeof Q.pageTracker && "object" == typeof Q._gat
				? (ce.track = function (e, a, t) {
						o != i &&
							Q.pageTracker._trackSocial(
								"AddToAny",
								e,
								t || ne["n" + w].linkurl
							);
				  })
				: "object" == typeof Q._gaq
				? (ce.track = function (e, a, t) {
						o != i &&
							Q._gaq.push([
								"_trackSocial",
								"AddToAny",
								e,
								t || ne["n" + w].linkurl,
							]);
				  })
				: "string" == typeof Q.GoogleAnalyticsObject &&
				  "object" != typeof Q.dataLayer
				? (ce.track = function (e, a, t) {
						o != i &&
							((t = t || ne["n" + w].linkurl),
							Q[GoogleAnalyticsObject]("send", "social", {
								socialNetwork: "AddToAny",
								socialAction: e,
								socialTarget: t,
								page: t,
							}));
				  })
				: "object" == typeof Q.dataLayer &&
				  (ce.track = function (e, a, t) {
						var n;
						o != i &&
							((t = t || ne["n" + w].linkurl),
							(n =
								(n = te.callbacks) &&
								n.length &&
								"function" == typeof n.some &&
								n.some(function (e) {
									e = e.share;
									return (
										!!e &&
										/dataLayer[^]+AddToAnyShare[^]+socialAction/.test(
											e.toString()
										)
									);
								})),
							(e = {
								addtoany_service: e,
								addtoany_shared_url: t,
								socialNetwork: "AddToAny",
								socialAction: e,
								socialTarget: t,
								event_category: "AddToAny",
								event_label: t,
							}),
							Q.gtag
								? (function () {
										Q.dataLayer.push(arguments);
								  })("event", "AddToAnyShare", r({}, e))
								: n || Q.dataLayer.push(r({ event: "AddToAnyShare" }, e)));
				  });
		}
		var o = x,
			i = "feed";
		(ce.track = c), e(), ce.track === c && Q.addEventListener("load", e);
	}
	function Le() {
		function e(a) {
			["feed", "page"].forEach(function (e) {
				(n[e] = a[e]), Ue[e] && qe(e);
			});
		}
		var a = Q.a2a.userServices;
		a ? e(a) : (Q.a2a.userServices = e);
	}
	function ze(e, a, t) {
		var n = b[e];
		-1 !== i.indexOf(e) &&
			(n
				? ea(n, a, t)
				: (na.push({ name: e, node: a, color: t }),
				  Qe && !Ze ? aa() : Ze || ta()));
	}
	function Me() {
		var e;
		sa &&
			((e = te.overlays) && e.length && t(),
			(O = Q.a2a.main),
			le(O, "click", K),
			le(O, "touchstart", K, !!z.evOpts() && { passive: !0 })),
			H("page"),
			sa && (Le(), (x = "page"), He("ready")),
			(sa = !1);
	}
	var Oe = function () {
			var e = (x = ne["n" + (A || w)].type);
			ne[e] && ne[e].out_delay && clearTimeout(ne[e].out_delay);
		},
		h = function (e, a) {
			var t, n;
			("none" == e && ne[a].no_hide) ||
				((t = S("a2a" + a + "_dropdown")),
				(n = B.key_listener),
				(t.style.display = e),
				Oe(),
				"none" == e
					? (B["doc_click_listener_" + a].destroy(),
					  delete ne[a].doc_click_close_mini,
					  n && n[a] && n[a].destroy())
					: o.forEach(function (e) {
							e !== a && B["doc_click_listener_" + e] && h("none", e);
					  }));
		},
		de = function (e) {
			if (!e) return {};
			for (var a, t = 0, n = e.attributes.length, o = {}; t < n; t++)
				(a = e.attributes[t]).name &&
					"data-" == a.name.substring(0, 5) &&
					(o[a.name.substring(5)] = a.value);
			return o;
		},
		Ie = function (e, a) {
			return e
				? e.currentStyle
					? e.currentStyle[
							a.replace(/-(\w)/gi, function (e, a) {
								return a.toUpperCase();
							})
					  ]
					: Q.getComputedStyle(e, null).getPropertyValue(a)
				: null;
		},
		p = function (e) {
			e = Ie(e, "display");
			return !(!e || "none" === e);
		},
		je = function (e) {
			var a = 0,
				t = 0;
			return (
				"number" == typeof Q.pageYOffset
					? ((a = Q.pageXOffset), (t = Q.pageYOffset))
					: ee.body && (ee.body.scrollLeft || ee.body.scrollTop)
					? ((a = ee.body.scrollLeft), (t = ee.body.scrollTop))
					: ee.documentElement &&
					  (ee.documentElement.scrollLeft || ee.documentElement.scrollTop) &&
					  ((a = ee.documentElement.scrollLeft),
					  (t = ee.documentElement.scrollTop)),
				"w" == e ? a : t
			);
		},
		Re = function (e) {
			for (
				var a = ne[e || x].main_services_col_1, t = a.length, n = 0;
				n < t;
				n++
			)
				a[n].style.display = "";
		},
		De = function (e) {
			var a,
				t,
				n = ee.getElementsByTagName("meta"),
				o = n.length;
			if ((a = Q.getSelection ? Q.getSelection() + "" : a) && "" !== a)
				return a;
			if (
				ne["n" + w].linkurl === location.href &&
				-1 === ["facebook", "twitter", "linkedin"].indexOf(e)
			)
				for (var i, r, l = 0; l < o; l++)
					if (
						((i = (i = n[l].getAttribute("name")) ? i.toLowerCase() : ""),
						(r = (r = n[l].getAttribute("property")) ? r.toLowerCase() : ""),
						(i && "description" === i) || (r && "og:description" === r))
					) {
						t = n[l].getAttribute("content");
						break;
					}
			return t ? t.substring(0, 1200) : "";
		},
		He = function (e, a) {
			var t = te.callbacks || [],
				n = te.tracking_callback,
				o = {};
			n &&
				(n[e]
					? t.push(n)
					: n[0] == e
					? ((o[e] = n[1]), t.push(o))
					: "function" == typeof n && ((o[e] = n), t.push(o)),
				(te.tracking_callback = null));
			for (var i, r, l = 0, s = t.length; l < s; l++)
				if (
					"function" == typeof (i = t[l][e]) &&
					((r = i(a)), "ready" == e && (i = null), void 0 !== r)
				)
					return r;
		},
		Pe = function (e) {
			var a,
				t = location.href,
				n = ee.title || t,
				o = e.parentElement,
				o = ne["n" + (o.a2a_index || o.parentElement.a2a_index || A || w)],
				i = o.type,
				r = e.a2a.safename,
				t = o.linkurl_implicit && t != o.linkurl ? t : o.linkurl,
				l = encodeURIComponent(t).replace(/'/g, "%27"),
				n = o.linkname_implicit && n != o.linkname ? n : o.linkname,
				n = encodeURIComponent(n).replace(/'/g, "%27"),
				s = o.linkmedia,
				s = s ? encodeURIComponent(s).replace(/'/g, "%27") : "",
				c = encodeURIComponent(De(r)).replace(/'/g, "%27"),
				o =
					!o.track_links || ("page" != i && "mail" != i)
						? ""
						: "&linktrack=" +
						  o.track_links +
						  "&linktrackkey=" +
						  encodeURIComponent(o.track_links_key),
				d = e.a2a.customserviceuri || !1,
				u = e.a2a.stype,
				p = e.a2a.js_src,
				f = e.a2a.url,
				_ = e.a2a.media,
				m = e.a2a.na,
				h = te.templates,
				g = h[r],
				v = "email",
				y = -1 != E.indexOf("Safari") && -1 == E.indexOf("Chrome");
			function k(e) {
				return encodeURIComponent(e)
					.replace(/'/g, "%27")
					.replace(/%24%7Blink%7D/g, "$${link}")
					.replace(/%24%7Blink_noenc%7D/g, "$${link_noenc}")
					.replace(/%24%7Blink_nohttp%7D/g, "$${link_nohttp}")
					.replace(/%24%7Bmedia%7D/g, "$${media}")
					.replace(/%24%7Btitle%7D/g, "$${title}")
					.replace(/%24%7Btitle_noenc%7D/g, "$${title_noenc}")
					.replace(/%24%7Bnotes%7D/g, "$${notes}");
			}
			if (_ && s) (e.a2a.js_skip = 1), (e.target = "_blank");
			else if (u && "js" == u && p)
				(e.target = "_top"),
					"javascript:" == p.substring(0, 11)
						? ((_ = p.replace("$${link}", t.replace(/'/g, "\\'"))),
						  (e.a2a.literalJS = _.substring(11)))
						: (e.a2a.externalJS = p),
					(a = "#" + r);
			else if (f && (r != v || (r == v && (j || y))) && !o) {
				if (((e.target = "_top"), "object" == typeof g))
					for (var b in g) f = Je(f, b, k(g[b]));
				else "string" == typeof g && (f = Je(f, "text", k(g)));
				a = f
					.replace(/\$$\{link\}/g, l)
					.replace(/\$$\{media\}/g, s)
					.replace(/\$$\{link_noenc\}/g, t)
					.replace(/\$$\{link_nohttp\}/g, t.replace(/^https?:\/\//, ""))
					.replace(/\$$\{title\}/g, n);
			} else
				d &&
					"undefined" != d &&
					(a = d
						.replace(/A2A_LINKNAME_ENC/, n)
						.replace(/A2A_LINKURL_ENC/, l)
						.replace(/A2A_LINKNOTE_ENC/, c));
			return (
				j && m && (e.target = "_top"),
				(e.href =
					a ||
					"https://www.addtoany.com/add_to/" +
						r +
						"?linkurl=" +
						l +
						"&linkname=" +
						n +
						(s ? "&linkmedia=" + s : "") +
						o +
						((_ = ""),
						g
							? (_ = "&" + Z({ template: g }))
							: h[v] && u && u == v && (_ = "&" + Z({ template: h[v] })),
						_) +
						("feed" == i ? "&type=feed" : "") +
						"&linknote=" +
						c),
				!0
			);
		},
		l = function (a, t, n) {
			var e, o, i, r, l, s;
			t &&
				((e = p(t)),
				(o = t.classList),
				(i = "a2a_starting"),
				(r = "transitionend"),
				"show" === a
					? e ||
					  ((l = t),
					  (s = o) && Ie(l, "transition-duration") && s.add(i),
					  (t.style.display = "block"),
					  o &&
							setTimeout(function () {
								o.remove(i);
							}, 1))
					: o
					? e
						? (t.addEventListener(
								r,
								function e() {
									(t.style.display = "show" === a ? "block" : "none"),
										n && n(),
										t.removeEventListener(r, e, !1);
								},
								!1
						  ),
						  o.add(i))
						: n && n()
					: n && ((t.style.display = "none"), n()));
		},
		v = {
			show: function () {
				var e = "a2a" + x,
					a = S("a2a_overlay"),
					t = S(e + "_find");
				"none" === Ie(a, "display") &&
					(l("show", a),
					(v.key_listener = le(ee, "keydown", function (e) {
						var e = e.which || e.keyCode,
							a = ee.activeElement;
						27 == e && t != a
							? $$e(x)
							: 40 < e && e < 91 && t != a && t.focus();
					})));
			},
			hide: function (e) {
				var a = S("a2a_overlay"),
					t = v,
					n = t.key_listener;
				l("hide", a, e),
					n &&
						(n.destroy(),
						setTimeout(function () {
							delete t.key_listener;
						}, 1));
			},
			key_listener: ae,
		},
		$$e = function (e) {
			var a = "a2a" + e,
				t = S(a + "_full"),
				n = S("a2a_overlay"),
				o = S("a2a_modal");
			(F.full_shown = !1),
				l("hide", o),
				l("hide", t),
				v.hide(function () {
					(n.style.display = o.style.display = "none"),
						t && (t.style.display = "none"),
						(s.showing = !1),
						p(S(a + "_dropdown")) && S(a + "_show_more_less").focus();
				});
		},
		F = function () {
			var e = "a2a" + x,
				a = T,
				t = S(e + "_full"),
				n = a("a2a_full_header", t)[0],
				e = S(e + "_full_services"),
				a = a("a2a_full_footer", t)[0];
			We(x),
				v.show(),
				l("show", t),
				(e.style.cssText = "height:calc(10px)"),
				e.style.height.length &&
					(e.style.height =
						"calc(100% - " + (n.offsetHeight + a.offsetHeight) + "px)"),
				t.focus(),
				d("full");
		},
		B =
			((F.full_shown = ae),
			function (e, a) {
				y(e);
				var t,
					n,
					o,
					i,
					r,
					l,
					s,
					c,
					d,
					u,
					p = ne["n" + w],
					f = R ? "touchstart" : "click",
					_ = !(!R || !z.evOpts()) && { passive: !0 },
					m = "a2a" + (x = p.type),
					m = S(m + "_dropdown");
				We(x),
					h("block", x),
					(n = [m.clientWidth, m.clientHeight]),
					(o = xe("w")),
					(i = xe("h")),
					e
						? ((t = (l = e.a2a_floating) ? "viewport" : "scroll"),
						  (m.style.position = l ? "fixed" : ""),
						  (r = l ? 0 : je("w")),
						  (l = l ? 0 : je("h")),
						  (d = (d = e.getElementsByTagName("img")[0])
								? ((s = we(d, t)), (c = d.clientWidth), d.clientHeight)
								: ((s = we(e, t)), (c = e.offsetWidth), e.offsetHeight)),
						  s.left - r + n[0] + c > o && (s.left = s.left - n[0] + c - 8),
						  ("up" == p.orientation ||
								("down" != p.orientation &&
									s.top - l + n[1] + d > i &&
									s.top > n[1])) &&
								(s.top = s.top - n[1] - d),
						  (m.style.left = (s.left < 0 ? 0 : s.left) + 2 + "px"),
						  (m.style.top = s.top + d + "px"))
						: ((m.style.position = (a = a || {}).position || "absolute"),
						  (m.style.left = a.left || o / 2 - n[0] / 2 + "px"),
						  (m.style.top = a.top || i / 2 - n[1] / 2 + "px")),
					ne[x].doc_click_close_mini ||
						ne[x].no_hide ||
						((ne[x].doc_click_close_mini =
							((u = x),
							function (e) {
								("number" == typeof e.button && 0 < e.button) ||
									(ne[x].last_focus && ne[x].last_focus.focus(), h("none", u));
							})),
						(B["doc_click_listener_" + x] = le(
							ee,
							f,
							ne[x].doc_click_close_mini,
							_
						))),
					(B.key_listener = B.key_listener || {}),
					(B.key_listener[x] = le(ee, "keydown", function (e) {
						27 != (e.which || e.keyCode) || v.key_listener || h("none", x);
					}));
			}),
		We =
			((B.key_listener = ae),
			function (e) {
				if (!Ue[e]) {
					var a,
						t,
						n = "a2a" + e,
						o = ee.createDocumentFragment(),
						i = ee.createDocumentFragment(),
						r = ne[e].services,
						l = S(n + "_find"),
						s = ee.createElement("i");
					if ("mail" != e) {
						for (
							var c = 0,
								d = r.most,
								u = d.length,
								p = parseInt(ne[e].num_services),
								f = 0,
								_ = ne[e].exclude_services;
							c < u;
							c++
						)
							!(function () {
								var e = d[c],
									a = ue(e);
								(_ && se(e[1], _, !0)) ||
									g(function () {
										return o.appendChild(pe(a));
									}),
									!(f < p) ||
										(_ && se(e[1], _, !0)) ||
										(g(function () {
											return i.appendChild(pe(a));
										}),
										f++);
							})();
						g(function () {
							S(n + "_full_services").appendChild(o),
								S(n + "_mini_services").appendChild(i);
						});
					}
					(t = S(n + "_full_services")),
						(s.className = "a2a_i"),
						(a = s.cloneNode()),
						g(function () {
							t.appendChild(s), t.appendChild(a);
						});
					for (var c = 0, m = r.email, h = m.length; c < h; c++)
						!(function () {
							var e = m[c],
								a = ue(e);
							(_ && se(e[1], _, !0)) ||
								g(function () {
									return S(n + "_2_col1").appendChild(pe(a));
								});
						})();
					g(function () {
						Ke(e), qe(e);
					}),
						"mail" != e &&
							(l.onkeydown = function (e) {
								(e = e || Q.event), (e = e.which || e.keyCode);
								if (13 == e) {
									for (
										var a, t = 0, n = ne[x].main_services, o = n.length;
										t < o;
										t++
									)
										if ("none" != (a = n[t]).style.display)
											return a.focus(), !1;
								} else
									27 == e && ("" == l.value && l.blur(), (l.value = ""), Ce());
							}),
						(Ue[e] = !0);
				}
			}),
		Ue = { feed: !1, page: !1 },
		qe = function (e) {
			var a, t;
			ne[e] &&
				(Xe(n[e], e, "a2a_sss"),
				(t = ne[(a = e)]),
				(a = "a2a" + a),
				(t.main_services_col_1 = T("a2a_i", S(a + "_full_services"), "a")),
				(t.main_services = t.main_services_col_1),
				(t.email_services = T("a2a_i", S(a + "_2_col1"), "a")),
				(t.all_services = t.main_services.concat(t.email_services)),
				Re(e));
		},
		e = c,
		Ye = function (e, a) {
			le(e, "click", a), (Ye = c);
		},
		s = {
			off: function () {
				var e = te.thanks;
				return (
					("boolean" == typeof e && !1 === e) ||
					(e && "boolean" == typeof e.postShare && !1 === e.postShare)
				);
			},
			show: function (e) {
				var a = "a2a" + x,
					t = S("a2a_modal"),
					a = S(a + "_full"),
					n = S("a2a_thanks"),
					o = te.thanks,
					i = s.off();
				function r() {
					t.setAttribute("aria-label", "Thanks for sharing"),
						Fe(),
						(n.style.display = "inline-block"),
						(s.showing = !0);
				}
				u.lit() &&
					o &&
					!i &&
					(u.has(!0) || o.postShare) &&
					!s.showing &&
					"none" === Ie(t, "display") &&
					(Ge(e), p(a) ? l("hide", a, r) : r());
			},
			showing: !1,
		},
		Ge = function (e) {
			var a = e ? e.a2a_index : null,
				t = e ? e.a2a_codes : ["facebook", "twitter", "email"],
				e = ne["n" + (a || w)],
				a = e.type,
				n = S("a2a_thanks"),
				o = "a2a_thanks_kit",
				i = S(o),
				r =
					(i
						? (i.innerHTML = "")
						: (((i = ee.createElement("div")).id = o), n.appendChild(i)),
					""),
				o = ee.createElement("div");
			(o.className = "a2a_kit a2a_kit_size_32 a2a_default_style"),
				o.setAttribute("data-a2a-url", e.linkurl),
				o.setAttribute("data-a2a-title", e.linkname),
				e.linkmedia && o.setAttribute("data-a2a-media", e.linkmedia),
				(o.style.display = "flex"),
				(o.style.justifyContent = "center");
			for (var l = 0; l < t.length && l < 8; l++)
				r += '<a class="a2a_button_' + t[l] + '"></a>';
			(o.innerHTML = r), i.appendChild(o), ie("page", { target: o }), (x = a);
		},
		Ve = function (e, a) {
			var t = ee.createElement("script");
			(t.src = e),
				a &&
					(t.readyState
						? (t.onreadystatechange = function () {
								("loaded" !== t.readyState && "complete" !== t.readyState) ||
									((t.onreadystatechange = null), a());
						  })
						: (t.onload = a)),
				ee.body.appendChild(t);
		},
		u = {
			lit: function () {
				var e = te.thanks;
				return !(
					(S("wpadminbar") || (void 0 !== Q.wp && Q.wp.customize)) &&
					(!e || !e.postShare)
				);
			},
			has: function (e) {
				void 0 === e && (e = !1);
				var a = {},
					t = !1;
				return (
					(("object" == typeof Q.adsbygoogle && Q.adsbygoogle.loaded) ||
						"object" == typeof Q.google_ad_modifications) &&
						(a.as = t = !0),
					"object" == typeof Q.googletag &&
						Q.googletag.slots &&
						"function" == typeof Object.keys &&
						0 < Object.keys(Q.googletag.slots).length &&
						(a.dc = t = !0),
					Q.vglnk && Q.vglnk.key && (a.vl = t = !0),
					Q.__SKIM_JS_GLOBAL__ && (a.sl = t = !0),
					(Q.amazon_ad_tag || Q.amzn_assoc_ad) && (a.az = t = !0),
					!(e && !a.as && !a.dc) && (t ? a : void 0)
				);
			},
			set: function (e) {
				void 0 === e && (e = !1);
				var o = "a2a_thanks_a2a_ad",
					a = "a2a_thanks_pub_ad",
					i = S("a2a_thanks"),
					t = te.thanks,
					n =
						("boolean" == typeof t && !1 === t) ||
						(t && "boolean" == typeof t.postShare && !1 === t.postShare) ||
						(t && "boolean" == typeof t.ad && !1 === t.ad),
					r = t && void 0 !== t.ad && !1 !== t.ad,
					l = S(o),
					s = S(a);
				function c() {
					var e,
						t,
						a = encodeURIComponent(location.href),
						n = "width:300px;height:250px;";
					s && (s.style.display = "none"),
						l
							? Q.postMessage &&
							  S("a2a_thanks_ifr").contentWindow.postMessage(
									"a2a_refresh_slot1",
									"*"
							  )
							: (Q.postMessage
									? (t = le(Q, "message", function (e) {
											var a = e.origin;
											(a && ".a2a.me" !== a.substr(-7)) ||
												((a = e.data) &&
													"a2a_display_slot1" === a &&
													((l.style.display = ""), t.destroy()));
									  }))
									: (l.style.display = ""),
							  ((e = ee.createElement("iframe")).id = "a2a_thanks_ifr"),
							  (e.title = "Post-Share Container"),
							  (e.src = "https://www.a2a.me/html/tag.html#url=" + a),
							  ((l = ee.createElement("div")).id = o),
							  l.insertBefore(e, null),
							  (e.style = n),
							  (l.style =
									n +
									"display:none;border-radius:6px;margin:45px auto 0;overflow:hidden;"),
							  i.appendChild(l),
							  d(),
							  le(Q, "resize", d));
				}
				function d() {
					var e = Q.innerHeight,
						a = e < 460,
						t = Math.max(0.5, parseInt((e / 600).toFixed(1), 10)),
						n = Math.floor((250 * (t - 1)) / 2);
					(l.style.marginTop = e < 360 ? "25px" : "45px"),
						(l.style.transform = a
							? "translateY(" + n + "px) scale(" + t + ")"
							: "none");
				}
				((u.lit() && u.has(!0) && !n) || r) &&
					(t && "string" == typeof t.ad && t.ad && 0.5 <= Math.random()
						? (l && (l.style.display = "none"),
						  s ||
								(((n = ee.createElement("div")).id = a),
								(n.style.margin = "45px auto 0"),
								i.appendChild(n),
								Ne(t.ad, n)))
						: e && c());
			},
		},
		d = function (a) {
			var e, t, n, o, i, r, l;
			(d.a2a = d.a2a || {}),
				d.a2a[a] ||
					((e = "&domain=" + encodeURIComponent(location.href.split("/")[2])),
					(r = (o = u.has()) && o.as ? "&as=1" : ""),
					(l = o && o.dc ? "&dc=1" : ""),
					o && o.vl,
					(t = o && o.sl ? "&sl=1" : ""),
					(n = o && o.az ? "&az=1" : ""),
					(o = o ? "&ad=1" : ""),
					(i = new XMLHttpRequest()).open(
						"POST",
						"https://stats.addtoany.com/menu"
					),
					i.setRequestHeader(
						"Content-Type",
						"application/x-www-form-urlencoded"
					),
					(i.timeout = 3e3),
					(i.ontimeout = function (e) {
						i.abort(), "post" === a && u.set();
					}),
					"post" === a &&
						(i.onload = function (e) {
							var a = this.responseText;
							200 === this.status && a && "1" === a ? u.set(!0) : u.set();
						}),
					i.send("view=" + a + e + o + r + l + t + n),
					(d.a2a[a] = 1));
		},
		Je =
			((ce.track = ae),
			function (e, a, t) {
				var n,
					o = new RegExp(
						"[?&]" +
							a.replace(/[.\\+*?\[\^\]$$(){}=!<>|:\-]/g, "\\$$&") +
							"=([^&#]*)",
						"i"
					),
					i = o.exec(e);
				return null === i
					? e + (n = /\?/.test(e) ? "&" : "?") + a + "=" + t
					: ((n = i[0].charAt(0)), e.replace(o, n + a + "=" + t));
			}),
		Ke = function (e) {
			var a = ne[e].prioritize,
				a = (a && Xe(a, e), e),
				t = parseInt(ne[a].num_services),
				n = S("a2a" + a + "_full_services"),
				o = S("a2a" + a + "_mini_services");
			if (ne[a].custom_services) {
				var i = ne[a].custom_services,
					r = i.length;
				i.reverse();
				for (var l, s = 0; s < r; s++)
					i[s] &&
						((c = [
							i[s][0],
							i[s][0].replace(/ /g, "_"),
							null,
							null,
							{},
							i[s][1],
							i[s][2],
						]),
						(d = ue(c)),
						(l = pe(d)),
						n.insertBefore(l, n.firstChild),
						(l = pe(d)),
						o.insertBefore(l, o.firstChild));
			}
			if ("page" === a && te.add_services)
				for (var c, d, u = te.add_services, p = u.length, s = 0; s < p; s++)
					u[s] &&
						((c = [u[s].name, u[s].safe_name, null, null, {}, null, u[s].icon]),
						(d = ue(c)),
						(l = pe(d)),
						n.insertBefore(l, n.firstChild),
						(l = pe(d)),
						o.insertBefore(l, o.firstChild));
			if ((a = T("a2a_i", o, "a")).length > t)
				for (var s = 0, f = a.length; s < f - t; s++)
					o.removeChild(o.lastChild);
		},
		Xe = function (e, a, t) {
			var n = parseInt(ne[a].num_services),
				o = S("a2a" + a + "_full_services"),
				i = S("a2a" + a + "_mini_services"),
				r = T("a2a_i", o, "a"),
				l = T("a2a_i", i, "a"),
				s = [];
			if (e) {
				for (var c = e.length - 1; -1 < c; c--) {
					var d = e[c],
						d = se(d, r, !0, "a2a", "safename");
					d &&
						(t && (d.className = d.className + " " + t),
						o.insertBefore(d, o.firstChild),
						s.push(d));
				}
				if (0 < s.length) {
					for (var u, c = 0; c < s.length; c++)
						(u =
							se(s[c].a2a.safename, l, !0, "a2a", "safename") ||
							((u = s[c].a2a),
							(u = ue([
								u.servicename,
								u.safename,
								u.serviceIcon,
								u.serviceColor,
								{
									src: u.js_src,
									url: u.url,
									type: u.serviceType,
									pu: u.popup,
									na: u.na,
									media: u.media,
								},
							])),
							pe(u))),
							t && (u.className = u.className + " " + t),
							i.insertBefore(u, i.firstChild);
					if ((l = T("a2a_i", i, "a")).length > n)
						for (var c = 0, p = l.length; c < p - n; c++)
							i.removeChild(i.lastChild);
				}
			}
		},
		Ze = !1,
		Qe = !Q.a2a.h1 && te.static_server == m,
		ea = function (e, a, t) {
			(e = t ? e.replace(/#FFF/gi, t) : e),
				(a.innerHTML =
					'<svg focusable="false" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32">' +
					e +
					"</svg>");
		},
		aa = function (e) {
			Ze || ta();
		},
		ta = function () {
			var e, a, t;
			Ze ||
				((t = te.static_server),
				(e = ee.createElement("script")),
				(a = ee.getElementsByTagName("script")[0]),
				(t = t != m ? t + "/" : t + "/svg/"),
				M && e.setAttribute("nonce", M),
				(e.src = t + "icons.38.svg.js"),
				a.parentNode.insertBefore(e, a),
				(Ze = !0));
		},
		na = [],
		oa = {
			add: function (e) {
				oa.set(e, !0);
			},
			set: function (e, a) {
				if (a) for (var t in e) b[t] = e[t];
				else b = e;
				for (var n = 0, o = na.length; n < o; n++) {
					var i = na[n],
						r = i.name,
						l = i.node,
						s = i.color,
						c = i.done,
						r = b[r];
					r && !c && (ea(r, l, s), (i.done = !0));
				}
			},
		},
		ue = function (e) {
			return {
				s_name: e[0],
				s_safe_name: e[1],
				s_icon: e[2],
				s_color: e[3],
				s_options: e[4],
				s_custom_service_uri: e[5],
				s_custom_service_icon: e[6],
			};
		},
		pe = function (e, a, l) {
			function t() {
				var e = l || ne["n" + w];
				Te(e), Pe(f);
			}
			var n,
				o,
				i,
				s = e.s_name,
				c = e.s_safe_name,
				r = e.s_icon,
				d = e.s_color,
				u = e.s_options,
				u = void 0 === u ? {} : u,
				p = e.s_custom_service_uri,
				e = e.s_custom_service_icon,
				f = a || ee.createElement("a"),
				_ =
					(a || (f.className = "a2a_i"),
					(f.rel = "nofollow noopener"),
					(f.href = "/#" + c),
					(f.target = "_blank"),
					(f.a2a = {}),
					f.a2a);
			(_.safename = c),
				(_.servicename = s),
				(_.serviceNameLowerCase = s.toLowerCase()),
				(_.serviceIcon = r),
				(_.serviceColor = d),
				(_.serviceType = u.type),
				u.type && (_.stype = u.type),
				u.src && (_.js_src = u.src),
				u.url && (_.url = u.url),
				u.pu && (_.popup = 1),
				u.na && (_.na = 1),
				u.media && (_.media = 1),
				a ||
					((f.innerHTML = "<span></span>" + s + " "),
					(u = f.firstChild),
					(a = "a2a_svg a2a_s__default"),
					(o = (i = (n = te.icon_color) ? n.split(",", 2) : ae) ? i[0] : ae),
					(i = i ? (null == (i = i[1]) ? void 0 : i.trim()) : ae),
					p && (_.customserviceuri = p),
					e
						? ((u.style.backgroundImage = "url(" + e + ")"), (u.className = a))
						: n
						? ((u.className = a + " a2a_s_" + r),
						  o && "unset" != o
								? (u.style.backgroundColor = o)
								: d && (u.style.backgroundColor = "#" + d))
						: r
						? ((u.className = a + " a2a_s_" + r),
						  d && (u.style.backgroundColor = "#" + d))
						: (u.className = a),
					e) ||
					ze(r, u, i);
			return (
				"js" === _.stype
					? le(f, "click", t)
					: (le(f, "mousedown", t), le(f, "keydown", t)),
				le(f, "click", function (e) {
					var a,
						t = l || ne["n" + w],
						n = {
							media: t.linkmedia,
							mediaNode: null == (n = t.kit) ? void 0 : n.a2a_mediaNode,
							node: f,
							service: s,
							serviceCode: c,
							title: t.linkname,
							url: t.linkurl,
						},
						o = f.a2a,
						i = "js" === o.stype,
						n = Ee(n, t, e),
						r =
							("feed" == x ||
								o.url ||
								o.js_src ||
								((r = t.node), (r = t.kit || (r.a2a_kit ? r : ae)), Be(r)),
							!o.popup ||
								e.defaultPrevented ||
								"_blank" !== f.target ||
								i ||
								(X(e),
								(r = screen.height),
								Q.open(
									f.href,
									"_blank",
									"toolbar=0,personalbar=0,resizable,scrollbars,status,width="
										.concat(650, ",height=")
										.concat(550, ",top=") +
										(550 < r ? Math.round(r / 2 - 275) : 40) +
										",left=" +
										Math.round(screen.width / 2 - 325)
								)),
							o.js_skip);
					(!o.externalJS && !o.literalJS) ||
						n ||
						r ||
						((n = o).literalJS
							? ((a = ee.createElement("script")),
							  M && a.setAttribute("nonce", M),
							  (a.textContent = n.literalJS),
							  I.appendChild(a))
							: n.externalJS && Ve(n.externalJS)),
						i && !r && X(e),
						r && delete o.js_skip,
						ce.track(s, c, t.linkurl);
				}),
				f
			);
		},
		ia = function () {
			var e, a, t, n, o;
			return (
				te.static_server == m &&
				((a = navigator),
				(e = [
					"ar",
					"id",
					"ms",
					"ms-MY",
					"bn",
					"bn-IN",
					"bs",
					"bs-BA",
					"bg",
					"ca",
					"ca-AD",
					"ca-ES",
					"cs",
					"cs-CZ",
					"cy",
					"cy-GB",
					"da",
					"da-DK",
					"de",
					"dv",
					"el",
					"el-GR",
					"et",
					"et-EE",
					"es",
					"es-AR",
					"es-VE",
					"eo",
					"en-US",
					"eu",
					"eu-ES",
					"fa",
					"fa-IR",
					"fr",
					"fr-CA",
					"gd",
					"he",
					"hi",
					"hi-IN",
					"hr",
					"hy",
					"hy-AM",
					"is",
					"it",
					"ja",
					"ja-JP",
					"ko",
					"ko-KR",
					"ku",
					"ku-TR",
					"lv",
					"lt",
					"li",
					"li-NL",
					"hu",
					"mk",
					"nl",
					"nn-NO",
					"no",
					"pl",
					"pt",
					"pt-BR",
					"pt-PT",
					"ro",
					"ru",
					"sr",
					"sr-RS",
					"fi",
					"sk",
					"sl",
					"sl-SI",
					"sv",
					"sv-SE",
					"sw",
					"sw-CD",
					"sw-KE",
					"sw-TZ",
					"sw-UG",
					"ta",
					"ta-IN",
					"tr",
					"te-IN",
					"uk",
					"uk-UA",
					"vi",
					"vi-VN",
					"zh-CN",
					"zh-TW",
				]),
				(a = te.locale || (a.browserLanguage || a.language).toLowerCase()),
				(t = se(a, e, !0)) ||
					(-1 != (n = a.indexOf("-")) && (t = se(a.substring(0, n), e, !0))),
				(ia = function () {
					return o;
				}),
				(o = !("en-us" == a || !t) && t))
			);
		},
		ra = {
			Share: "Share",
			Save: "Save",
			Subscribe: "Subscribe",
			Email: "Email",
			Bookmark: "Bookmark",
			ShowAll: "Show all",
			ShowLess: "Show less",
			FindAnyServiceToAddTo: "Find any service",
			PoweredBy: "By",
			AnyEmail: "Any email",
			ShareViaEmail: "Share via email",
			SubscribeViaEmail: "Subscribe via email",
			BookmarkInYourBrowser: "Bookmark in your browser",
			BookmarkInstructions: "Press Ctrl+D or &#8984;+D to bookmark this page",
			AddToYourFavorites: "Add to Favorites",
			SendFromWebOrProgram: "Send from any other email service",
			EmailProgram: "Email application",
			More: "More&#8230;",
			ThanksForSharing: "Thanks for sharing!",
			ThanksForFollowing: "Thanks for following!",
		},
		la = function (e) {
			if (((x = te.menu_type || e), !ne[x] && !Q["a2a" + x + "_init"])) {
				(ne[x] = {}),
					(Q.a2a_show_dropdown = B),
					(Q.a2a_miniLeaveDelay = be),
					(Q.a2a_init = ie);
				var a,
					t,
					n,
					o,
					i,
					r,
					l,
					s,
					c,
					d,
					u,
					p,
					f,
					_,
					m,
					h,
					g,
					v,
					y,
					k,
					b = ne[x],
					e = "feed" == x ? "feed" : "page",
					w = te;
				for (a in (location.host.split(".").slice(-1), N)) b[a] = w[a];
				(t = ia()) &&
					"custom" != t &&
					Ve(w.static_server + "/locale/" + t + ".js", function () {
						w.localize = Q.a2a_localize;
						var e = T("a2a_localize", ee),
							a = te.localize,
							t = ra;
						function n(e) {
							var a,
								t = ee.createElement("div");
							return (
								(t.innerHTML = e), (a = (e = t.childNodes[0]) ? e.nodeValue : a)
							);
						}
						for (var o, i, r, l = 0, s = e.length; l < s; l++)
							(r =
								(r = (o = e[l]).getAttribute("data-a2a-localize")) &&
								r.split(",", 2)) &&
								((i = r[0]),
								(r = a[(r = r[1])] || t[r] || ""),
								"inner" === i
									? (o.innerHTML = r)
									: "label" === i
									? o.setAttribute("aria-label", n(r))
									: "title" === i && o.setAttribute("title", n(r)));
					}),
					(t = x),
					(e = D[e]),
					(u = d = ""),
					(p = "a2a" + x),
					(f = te),
					ee.createElement("a"),
					(_ = (_ = f.icon_color) && _.split(",", 2)),
					(m = _ && _[0]),
					(_ = _ && _[1]),
					(h = "a2a_svg a2a_s__default a2a_s_"),
					(m = m && "unset" != m ? m : "#0166ff"),
					(g =
						'<svg focusable="false" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32"><g fill="' +
						(_ = _ || "#FFF") +
						'"><path d="M14 7h4v18h-4z"/><path d="M7 14h18v4H7z"/></g></svg>'),
					(v = ra),
					(y = f.localize),
					(k = S("a2a_overlay")),
					(x = t),
					(t = m),
					C ||
						((C = ee.createElement("style")).setAttribute("type", "text/css"),
						M && C.setAttribute("nonce", M),
						I.appendChild(C),
						(m = te.color_main || "EEE"),
						(n = te.color_bg || "FFF"),
						(o = te.color_border || "CCC"),
						(i = te.color_link_text || "0166FF"),
						(r = te.color_link_text_hover || "2A2A2A"),
						(l = te.color_link_text || "2A2A2A"),
						(s = te.color_link_text || "2A2A2A"),
						(c = te.color_border || o),
						(t = ee.createTextNode(
							".a2a_hide{display:none}.a2a_logo_color{background-color:" +
								(t || "#0166FF") +
								"}.a2a_menu,.a2a_menu *{-moz-box-sizing:content-box;-webkit-box-sizing:content-box;box-sizing:content-box;float:none;margin:0;padding:0;position:static;height:auto;width:auto}.a2a_menu{border-radius:6px;display:none;direction:ltr;background:#" +
								n +
								';font:16px sans-serif-light,HelveticaNeue-Light,"Helvetica Neue Light","Helvetica Neue",Arial,Helvetica,"Liberation Sans",sans-serif;color:#000;line-height:12px;border:1px solid #' +
								o +
								";vertical-align:baseline;overflow:hidden}.a2a_mini{min-width:200px;position:absolute;width:300px;z-index:9999997}.a2a_overlay{display:none;background:#616c7deb;backdrop-filter:blur(4px);-webkit-backdrop-filter:blur(4px);position:fixed;top:0;right:0;left:0;bottom:0;z-index:9999998;-webkit-tap-highlight-color:transparent;transition:opacity .14s,backdrop-filter .14s}.a2a_full{background:#" +
								n +
								";border:1px solid #" +
								n +
								";box-shadow:#2a2a2a1a 0 0 20px 10px;height:auto;height:calc(320px);top:15%;left:50%;margin-left:-320px;position:fixed;text-align:center;width:640px;z-index:9999999;transition:transform .14s,opacity .14s}.a2a_full_footer,.a2a_full_header,.a2a_full_services{border:0;margin:0;padding:12px;box-sizing:border-box}.a2a_full_header{padding-bottom:8px}.a2a_full_services{height:280px;overflow-y:scroll;padding:0 12px;-webkit-overflow-scrolling:touch}.a2a_full_services .a2a_i{display:inline-block;float:none;width:181px;width:calc(33.334% - 18px)}div.a2a_full_footer{font-size:12px;text-align:center;padding:8px 14px}div.a2a_full_footer a,div.a2a_full_footer a:visited{display:inline;font-size:12px;line-height:14px;padding:8px 14px}div.a2a_full_footer a:focus,div.a2a_full_footer a:hover{background:0 0;border:0;color:#" +
								i +
								'}div.a2a_full_footer a span.a2a_s_a2a,div.a2a_full_footer a span.a2a_w_a2a{background-size:14px;border-radius:3px;display:inline-block;height:14px;line-height:14px;margin:0 3px 0 0;vertical-align:top;width:14px}.a2a_modal{height:0;left:50%;margin-left:-320px;position:fixed;text-align:center;top:15%;width:640px;z-index:9999999;transition:transform .14s,opacity .14s;-webkit-tap-highlight-color:transparent}.a2a_modal_body{background:0 0;border:0;font:24px sans-serif-light,HelveticaNeue-Light,"Helvetica Neue Light","Helvetica Neue",Arial,Helvetica,"Liberation Sans",sans-serif;position:relative;height:auto;width:auto}.a2a_thanks{color:#fff;height:auto;margin-top:20px;width:auto}.a2a_thanks>div:first-child{margin:0 0 40px 0}.a2a_thanks div *{height:inherit}#a2a_copy_link{background:#' +
								n +
								";border:1px solid #" +
								n +
								";cursor:pointer;margin-top:15%}span.a2a_s_link#a2a_copy_link_icon,span.a2a_w_link#a2a_copy_link_icon{background-size:48px;border-radius:0;display:inline-block;height:48px;left:0;line-height:48px;margin:0 3px 0 0;position:absolute;vertical-align:top;width:48px}#a2a_modal input#a2a_copy_link_text{background-color:transparent;border:0;color:#" +
								s +
								";cursor:pointer;font:inherit;height:48px;left:62px;max-width:initial;min-height:auto;padding:0;position:relative;width:564px;width:calc(100% - 76px)}#a2a_copy_link_copied{background-color:#0166ff;color:#fff;display:none;font:inherit;font-size:16px;margin-top:1px;padding:3px 8px}@media (forced-colors:active){.a2a_color_buttons a,.a2a_svg{forced-color-adjust:none}}@media (prefers-color-scheme:dark){.a2a_menu a,.a2a_menu a.a2a_i,.a2a_menu a.a2a_i:visited,.a2a_menu a.a2a_more,i.a2a_i{border-color:#2a2a2a!important;color:#fff!important}.a2a_menu a.a2a_i:active,.a2a_menu a.a2a_i:focus,.a2a_menu a.a2a_i:hover,.a2a_menu a.a2a_more:active,.a2a_menu a.a2a_more:focus,.a2a_menu a.a2a_more:hover,.a2a_menu_find_container{border-color:#444!important;background-color:#444!important}.a2a_menu:not(.a2a_thanks){background-color:#2a2a2a;border-color:#2a2a2a}.a2a_menu_find{color:#fff!important}.a2a_menu span.a2a_s_find svg{background-color:transparent!important}.a2a_menu span.a2a_s_find svg path{fill:#fff!important}.a2a_full{box-shadow:#00000066 0 0 20px 10px}.a2a_overlay{background-color:#373737eb}}@media print{.a2a_floating_style,.a2a_menu,.a2a_overlay{visibility:hidden}}@keyframes a2aFadeIn{from{opacity:0}to{opacity:1}}.a2a_starting{opacity:0}.a2a_starting.a2a_full,.a2a_starting.a2a_modal{transform:scale(.8)}@media (max-width:639px){.a2a_full{border-radius:0;top:15%;left:0;margin-left:auto;width:100%}.a2a_modal{left:0;margin-left:10px;width:calc(100% - 20px)}}@media (min-width:318px) and (max-width:437px){.a2a_full .a2a_full_services .a2a_i{width:calc(50% - 18px)}}@media (max-width:317px){.a2a_full .a2a_full_services .a2a_i{width:calc(100% - 18px)}}@media (max-height:436px){.a2a_full{bottom:40px;height:auto;top:40px}}@media (max-height:550px){.a2a_modal{top:30px}}@media (max-height:360px){.a2a_modal{top:20px}.a2a_thanks>div:first-child{margin-bottom:20px}}.a2a_menu a{color:#" +
								i +
								';text-decoration:none;font:16px sans-serif-light,HelveticaNeue-Light,"Helvetica Neue Light","Helvetica Neue",Arial,Helvetica,"Liberation Sans",sans-serif;line-height:14px;height:auto;width:auto;outline:0}.a2a_menu a.a2a_i:visited,.a2a_menu a.a2a_more{color:#' +
								i +
								"}.a2a_menu a.a2a_i:active,.a2a_menu a.a2a_i:focus,.a2a_menu a.a2a_i:hover,.a2a_menu a.a2a_more:active,.a2a_menu a.a2a_more:focus,.a2a_menu a.a2a_more:hover{color:#" +
								r +
								";border-color:#" +
								m +
								";border-style:solid;background-color:#" +
								m +
								";text-decoration:none}.a2a_menu span.a2a_s_find{background-size:24px;height:24px;left:8px;position:absolute;top:7px;width:24px}.a2a_menu span.a2a_s_find svg{background-color:#" +
								n +
								"}.a2a_menu span.a2a_s_find svg path{fill:#" +
								c +
								"}#a2a_menu_container{display:inline-block}.a2a_menu_find_container{border:1px solid #" +
								c +
								";border-radius:6px;padding:2px 24px 2px 0;position:relative;text-align:left}.a2a_cols_container .a2a_col1{overflow-x:hidden;overflow-y:auto;-webkit-overflow-scrolling:touch}#a2a_modal input,#a2a_modal input[type=text],.a2a_menu input,.a2a_menu input[type=text]{display:block;background-image:none;box-shadow:none;line-height:100%;margin:0;outline:0;overflow:hidden;padding:0;-moz-box-shadow:none;-webkit-box-shadow:none;-webkit-appearance:none}#a2afeed_find_container input,#a2afeed_find_container input[type=text],#a2apage_find_container input,#a2apage_find_container input[type=text]{background-color:transparent;border:0;box-sizing:content-box;color:#" +
								s +
								";float:none;font:inherit;font-size:16px;height:28px;line-height:20px;left:38px;outline:0;margin:0;max-width:initial;min-height:initial;padding:2px 0;position:relative;width:99%}.a2a_clear{clear:both}.a2a_svg{background-repeat:no-repeat;display:block;overflow:hidden;height:32px;line-height:32px;padding:0;pointer-events:none;width:32px}.a2a_svg svg{background-repeat:no-repeat;background-position:50% 50%;border:none;display:block;left:0;margin:0 auto;overflow:hidden;padding:0;position:relative;top:0;width:auto;height:auto}a.a2a_i,i.a2a_i{display:block;float:left;border:1px solid #" +
								n +
								";line-height:24px;padding:6px 8px;text-align:left;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;width:132px}a.a2a_i span,a.a2a_more span{display:inline-block;overflow:hidden;vertical-align:top}a.a2a_i .a2a_svg{margin:0 6px 0 0}a.a2a_i .a2a_svg,a.a2a_more .a2a_svg{background-size:24px;height:24px;line-height:24px;width:24px}a.a2a_sss:hover{border-left:1px solid #" +
								o +
								"}a.a2a_more{border-bottom:1px solid #" +
								n +
								';border-left:0;border-right:0;line-height:24px;margin:6px 0 0;padding:6px;-webkit-touch-callout:none}a.a2a_more span{height:24px;margin:0 6px 0 0}.a2a_kit .a2a_svg{background-repeat:repeat}.a2a_default_style a:empty,.a2a_flex_style a:empty,.a2a_floating_style a:empty,.a2a_overlay_style a:empty{display:none}.a2a_color_buttons a,.a2a_floating_style a{text-decoration:none}.a2a_default_style:not(.a2a_flex_style) a{float:left;line-height:16px;padding:0 2px}.a2a_default_style a:hover .a2a_svg,.a2a_floating_style a:hover .a2a_svg,.a2a_overlay_style a:hover .a2a_svg svg{opacity:.7}.a2a_overlay_style.a2a_default_style a:hover .a2a_svg{opacity:1}.a2a_default_style .a2a_count,.a2a_default_style .a2a_svg,.a2a_floating_style .a2a_svg,.a2a_menu .a2a_svg,.a2a_vertical_style .a2a_count,.a2a_vertical_style .a2a_svg{border-radius:4px}.a2a_default_style .a2a_counter img,.a2a_default_style .a2a_dd,.a2a_default_style .a2a_svg{float:left}.a2a_default_style .a2a_img_text{margin-right:4px}.a2a_default_style .a2a_divider{border-left:1px solid #000;display:inline;float:left;height:16px;line-height:16px;margin:0 5px}.a2a_kit a{cursor:pointer;transition:none}.a2a_floating_style{background-color:#fff;border-radius:6px;position:fixed;z-index:9999995}.a2a_overlay_style{z-index:2147483647}.a2a_floating_style,.a2a_overlay_style{animation:a2aFadeIn .2s ease-in;padding:4px}.a2a_vertical_style:not(.a2a_flex_style) a{clear:left;display:block;overflow:hidden;padding:4px}.a2a_floating_style.a2a_default_style{bottom:0}.a2a_floating_style.a2a_default_style a,.a2a_overlay_style.a2a_default_style a{padding:4px}.a2a_count{background-color:#fff;border:1px solid #ccc;box-sizing:border-box;color:#2a2a2a;display:block;float:left;font:12px Arial,Helvetica,sans-serif;height:16px;margin-left:4px;position:relative;text-align:center;width:50px}.a2a_count:after,.a2a_count:before{border:solid transparent;border-width:4px 4px 4px 0;content:"";height:0;left:0;line-height:0;margin:-4px 0 0 -4px;position:absolute;top:50%;width:0}.a2a_count:before{border-right-color:#ccc}.a2a_count:after{border-right-color:#fff;margin-left:-3px}.a2a_count span{animation:a2aFadeIn .14s ease-in}.a2a_vertical_style .a2a_counter img{display:block}.a2a_vertical_style .a2a_count{float:none;margin-left:0;margin-top:6px}.a2a_vertical_style .a2a_count:after,.a2a_vertical_style .a2a_count:before{border:solid transparent;border-width:0 4px 4px 4px;content:"";height:0;left:50%;line-height:0;margin:-4px 0 0 -4px;position:absolute;top:0;width:0}.a2a_vertical_style .a2a_count:before{border-bottom-color:#ccc}.a2a_vertical_style .a2a_count:after{border-bottom-color:#fff;margin-top:-3px}.a2a_color_buttons .a2a_count,.a2a_color_buttons .a2a_count:after,.a2a_color_buttons .a2a_count:before,.a2a_color_buttons.a2a_vertical_style .a2a_count:after,.a2a_color_buttons.a2a_vertical_style .a2a_count:before{background-color:transparent;border:none;color:#fff;float:none;width:auto}.a2a_color_buttons.a2a_vertical_style .a2a_count{margin-top:0}.a2a_flex_style{display:flex;align-items:flex-start;gap:0}.a2a_default_style.a2a_flex_style{left:0;right:0;width:100%}.a2a_vertical_style.a2a_flex_style{flex-direction:column;top:0;bottom:0}.a2a_flex_style a{display:flex;justify-content:center;flex:1;padding:4px}.a2a_flex_style.a2a_vertical_style a{flex-direction:column}.a2a_floating_style.a2a_color_buttons,.a2a_floating_style.a2a_flex_style{border-radius:0;padding:0}.a2a_floating_style.a2a_default_style.a2a_flex_style{bottom:0}.a2a_kit.a2a_flex_style .a2a_counter img,.a2a_kit.a2a_flex_style .a2a_dd,.a2a_kit.a2a_flex_style .a2a_svg{float:none}.a2a_nowrap{white-space:nowrap}.a2a_note{margin:0 auto;padding:9px;font-size:12px;text-align:center}.a2a_note .a2a_note_note{margin:0;color:#' +
								l +
								"}.a2a_wide a{display:block;margin-top:3px;border-top:1px solid #" +
								m +
								";text-align:center}.a2a_label{position:absolute!important;clip-path:polygon(0px 0px,0px 0px,0px 0px);-webkit-clip-path:polygon(0px 0px,0px 0px,0px 0px);overflow:hidden;height:1px;width:1px}.a2a_kit,.a2a_menu,.a2a_modal,.a2a_overlay{-ms-touch-action:manipulation;touch-action:manipulation;outline:0}.a2a_dd{-webkit-user-drag:none}.a2a_dd img{border:0}.a2a_button_facebook_like iframe{max-width:none}"
						)),
						C.appendChild(t)),
					(y = f.localize =
						{
							Share: y.Share || v.Share,
							Save: y.Save || v.Save,
							Subscribe: y.Subscribe || v.Subscribe,
							Email: y.Email || v.Email,
							Bookmark: y.Bookmark || v.Bookmark,
							ShowAll: y.ShowAll || v.ShowAll,
							ShowLess: y.ShowLess || v.ShowLess,
							FindAnyServiceToAddTo:
								y.FindAnyServiceToAddTo || v.FindAnyServiceToAddTo,
							PoweredBy: y.PoweredBy || v.PoweredBy,
							AnyEmail: "Any email",
							ShareViaEmail: y.ShareViaEmail || v.ShareViaEmail,
							SubscribeViaEmail: y.SubscribeViaEmail || v.SubscribeViaEmail,
							BookmarkInYourBrowser:
								y.BookmarkInYourBrowser || v.BookmarkInYourBrowser,
							BookmarkInstructions:
								y.BookmarkInstructions || v.BookmarkInstructions,
							AddToYourFavorites: y.AddToYourFavorites || v.AddToYourFavorites,
							SendFromWebOrProgram:
								y.SendFromWebOrProgram || v.SendFromWebOrProgram,
							EmailProgram: y.EmailProgram || v.EmailProgram,
							More: y.More || v.More,
							ThanksForSharing: y.ThanksForSharing || v.ThanksForSharing,
							ThanksForFollowing: y.ThanksForFollowing || v.ThanksForFollowing,
						}),
					k ||
						(u =
							(u =
								(u += '<div class="a2a_overlay" id="a2a_overlay"></div>') +
								'<div id="a2a_modal" class="a2a_modal a2a_hide" role="dialog" tabindex="-1" aria-label=""><div class="a2a_modal_body a2a_menu a2a_hide" id="a2a_copy_link"><span id="a2a_copy_link_icon" class="a2a_svg a2a_s_link a2a_logo_color"><svg focusable="false" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32"><path fill="' +
								_ +
								'" d="M7.591 21.177c0-.36.126-.665.377-.917l2.804-2.804a1.235 1.235 0 0 1 .913-.378c.377 0 .7.144.97.43-.026.028-.11.11-.255.25-.144.14-.24.236-.29.29a2.82 2.82 0 0 0-.2.256 1.056 1.056 0 0 0-.177.344 1.43 1.43 0 0 0-.046.37c0 .36.126.666.377.918a1.25 1.25 0 0 0 .918.377c.126.001.251-.015.373-.047.125-.037.242-.096.345-.175.09-.06.176-.127.256-.2.1-.094.196-.19.29-.29.14-.142.223-.23.25-.254.297.28.445.607.445.984 0 .36-.126.664-.377.916l-2.778 2.79a1.242 1.242 0 0 1-.917.364c-.36 0-.665-.118-.917-.35l-1.982-1.97a1.223 1.223 0 0 1-.378-.9l-.001-.004Zm9.477-9.504c0-.36.126-.665.377-.917l2.777-2.79a1.235 1.235 0 0 1 .913-.378c.35 0 .656.12.917.364l1.984 1.968c.254.252.38.553.38.903 0 .36-.126.665-.38.917l-2.802 2.804a1.238 1.238 0 0 1-.916.364c-.377 0-.7-.14-.97-.418.026-.027.11-.11.255-.25a7.5 7.5 0 0 0 .29-.29c.072-.08.139-.166.2-.255.08-.103.14-.22.176-.344.032-.12.048-.245.047-.37 0-.36-.126-.662-.377-.914a1.247 1.247 0 0 0-.917-.377c-.136 0-.26.015-.37.046-.114.03-.23.09-.346.175a3.868 3.868 0 0 0-.256.2c-.054.05-.15.148-.29.29-.14.146-.222.23-.25.258-.294-.278-.442-.606-.442-.983v-.003ZM5.003 21.177c0 1.078.382 1.99 1.146 2.736l1.982 1.968c.745.75 1.658 1.12 2.736 1.12 1.087 0 2.004-.38 2.75-1.143l2.777-2.79c.75-.747 1.12-1.66 1.12-2.737 0-1.106-.392-2.046-1.183-2.818l1.186-1.185c.774.79 1.708 1.186 2.805 1.186 1.078 0 1.995-.376 2.75-1.13l2.803-2.81c.751-.754 1.128-1.671 1.128-2.748 0-1.08-.382-1.993-1.146-2.738L23.875 6.12C23.13 5.372 22.218 5 21.139 5c-1.087 0-2.004.382-2.75 1.146l-2.777 2.79c-.75.747-1.12 1.66-1.12 2.737 0 1.105.392 2.045 1.183 2.817l-1.186 1.186c-.774-.79-1.708-1.186-2.805-1.186-1.078 0-1.995.377-2.75 1.132L6.13 18.426c-.754.755-1.13 1.672-1.13 2.75l.003.001Z"/></svg></span><input id="a2a_copy_link_text" type="text" title="Copy link" readonly><div id="a2a_copy_link_copied">&check;</div></div>') +
							'<div class="a2a_modal_body a2a_menu a2a_thanks a2a_hide" id="a2a_thanks"><div class="a2a_localize" data-a2a-localize="inner,ThanksForSharing">' +
							y.ThanksForSharing +
							"</div></div></div>"),
					(d +=
						'<div class="a2a_menu a2a_full a2a_localize" id="a2a' +
						x +
						'_full" role="dialog" tabindex="-1" aria-label="' +
						("feed" == x ? y.Subscribe : y.Share) +
						'" data-a2a-localize="title,' +
						("feed" == x ? "Subscribe" : "Share") +
						'"><div class="a2a_full_header"><div id="a2a' +
						x +
						'_find_container" class="a2a_menu_find_container"><input id="a2a' +
						x +
						'_find" class="a2a_menu_find a2a_localize" type="text" autocomplete="off" title="' +
						y.FindAnyServiceToAddTo +
						'" data-a2a-localize="title,FindAnyServiceToAddTo"><span id="a2a' +
						x +
						'_find_icon" class="a2a_svg a2a_s_find"><svg focusable="false" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path fill="#CCC" d="M19.7 18.2l-4.5-4.5c.7-1.1 1.2-2.3 1.2-3.6 0-3.5-2.8-6.3-6.3-6.3s-6.3 2.8-6.3 6.3 2.8 6.3 6.3 6.3c1.4 0 2.6-.4 3.6-1.2l4.5 4.5c.6.6 1.3.7 1.7.2.5-.4.4-1.1-.2-1.7zm-9.6-3.6c-2.5 0-4.5-2.1-4.5-4.5 0-2.5 2.1-4.5 4.5-4.5 2.5 0 4.5 2.1 4.5 4.5s-2 4.5-4.5 4.5z"/></svg></span></div></div><div class="a2a_full_services" id="a2a' +
						x +
						'_full_services" role="presentation"></div><div class="a2a_full_footer"><a href="https://www.addtoany.com" title="Share Buttons" rel="noopener" target="_blank"><span class="' +
						h +
						'a2a a2a_logo_color">' +
						g +
						'</span>AddToAny</a></div></div><div id="a2a' +
						x +
						'_dropdown" class="a2a_menu a2a_mini a2a_localize a2a_hide" tabindex="-1" aria-label="' +
						("feed" == x ? y.Subscribe : y.Share) +
						'" data-a2a-localize="label,' +
						("feed" == x ? "Subscribe" : "Share") +
						'"><div class="a2a_mini_services" id="a2a' +
						x +
						'_mini_services"></div><div id="a2a' +
						x +
						'_cols_container" class="a2a_cols_container"><div class="a2a_col1' +
						("mail" == x ? " a2a_hide" : "") +
						'" id="a2a' +
						x +
						'_col1"></div><div id="a2a' +
						x +
						'_2_col1"' +
						("mail" != x ? ' class="a2a_hide"' : "") +
						'></div><div class="a2a_clear"></div></div>'),
					"mail" != x &&
						(d +=
							'<div class="a2a' +
							x +
							'_wide a2a_wide"><a href="#addtoany" id="a2a' +
							x +
							'_show_more_less" class="a2a_more a2a_localize" title="' +
							y.ShowAll +
							'" data-a2a-localize="title,ShowAll"><span class="' +
							h +
							'a2a a2a_logo_color">' +
							g +
							'</span><span class="a2a_localize" data-a2a-localize="inner,More">' +
							y.More +
							"</a></span></div>"),
					(d += "</div>"),
					k
						? O.insertAdjacentHTML("beforeend", d)
						: O.insertAdjacentHTML("afterbegin", u + d),
					(i = S(p + "_dropdown")) &&
						(le(i, "mouseenter", Oe), te.onclick || le(i, "mouseleave", be)),
					(r = S(p + "_find")) &&
						(le(S(p + "_find_icon"), "click", Ae),
						le(r, "click", Ae),
						le(r, "keyup", Ce)),
					(ne[x].services = e),
					le(S("a2a_overlay"), "click", function (e) {
						$$e(x);
					}),
					"mail" != x &&
						le(S(p + "_show_more_less"), "click", function (e) {
							X(e), S("a2a" + x + "_show_more_less"), F();
						}),
					ce(),
					L(N);
			}
		},
		sa = !0,
		e =
			((Q.a2a = Q.a2a || {}),
			(Q.a2a.bmBrowser = e),
			(Q.a2a.copyLink = function (e) {
				function a() {
					n.setAttribute("aria-label", "Copy link"),
						(r.value = e),
						Fe(),
						(o.style.display = "block"),
						n.focus(),
						d("copy");
				}
				var t = S("a2apage_full"),
					n = (S("a2a_overlay"), S("a2a_modal")),
					o = S("a2a_copy_link"),
					i = S("a2a_copy_link_copied"),
					r = S("a2a_copy_link_text");
				(F.full_shown = p(t)),
					Ye(o, function (e) {
						r.focus(),
							r.setSelectionRange(0, r.value.length),
							ee.execCommand &&
								ee.execCommand("copy") &&
								(r.setSelectionRange(0, 0),
								r.blur(),
								(i.style.display = "block"),
								setTimeout(function () {
									(n.style.display =
										o.style.display =
										i.style.display =
											"none"),
										F.full_shown ? F() : $$e("page");
								}, 700));
					});
				F.full_shown ? l("hide", t, a) : a();
			}),
			(Q.a2a.counters = re),
			(Q.a2a.GA = ce),
			(Q.a2a.init = ie),
			(Q.a2a.init_all = H),
			(Q.a2a.svg = oa),
			(Q.a2a.svg_css = function () {
				ie("page");
				for (
					var e,
						a,
						t,
						n,
						o = C.sheet || C.styleSheet || {},
						i = ("insertRule" in o),
						r = ("addRule" in o),
						l = fe.concat([[0, 0, "a2a", "0166FF"]]),
						s = 0,
						c = l.length;
					s < c;
					s++
				)
					(e = ".a2a_s_" + l[s][2]),
						(a = "background-color:#" + l[s][3] + ";"),
						i ? o.insertRule(e + "{" + a + "}", 0) : r && o.addRule(e, a, 0);
				(n = te.static_server),
					(t = ee.createElement("link")),
					(n = n != m ? n + "/" : m + "/svg/"),
					(t.rel = "stylesheet"),
					(t.href = n + "icons.38.svg.css"),
					I.appendChild(t),
					0;
			}),
			Q.a2a.core);
	"function" == typeof e ? e(Me) : (Q.a2a.core = Me),
		(z.a2a_config = te),
		(z.addEvent = le),
		(z.debounce = ge),
		(z.doc = ee),
		(z.getPos = we),
		(z.headTag = I),
		(z.init = ie),
		(z.memoize = ke),
		(z.nonce = M),
		(z.noop = c),
		(z.undef = ae),
		(z.validSelector = W),
		(z.win = Q);
})({});
