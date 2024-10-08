try {
	$("<link>")
		.attr({
			href: "/live2d/waifu.css?v=1.4.2",
			rel: "stylesheet",
			type: "text/css",
		})
		.appendTo("head");
	$("body").append(
		'<div class="waifu"><div class="waifu-tips"></div><canvas id="live2d" class="live2d"></canvas><div class="waifu-tool"><span class="fui-home"></span> <span class="fui-chat"></span> <span class="fui-eye"></span> <span class="fui-user"></span> <span class="fui-photo"></span> <span class="fui-info-circle"></span> <span class="fui-cross"></span></div></div>'
	);
	$.ajax({
		url: "/live2d/waifu-tips.js?v=1.4.2",
		dataType: "script",
		cache: true,
		success: function () {
			$.ajax({
				url: "/live2d/live2d.js?v=1.0.5",
				dataType: "script",
				cache: true,
				success: function () {
					/* 可直接修改部分参数 */
					live2d_settings["hitokotoAPI"] = "fghrsh.net"; // 一言 API
					live2d_settings["modelId"] = 0; // 默认模型 ID 1,6
					live2d_settings["modelTexturesId"] = 0; // 默认材质 ID 6-3,7,2,1-87,1-42,1-2兔子，1-81，1-30羊
					live2d_settings["modelStorage"] = false; // 不储存模型 ID
					live2d_settings["waifuFontSize"] = "16px"; // 提示框字体，例如 '12px', '30px'
					live2d_settings["waifuToolTop"] = "-70px"; // 工具栏顶部边距，例如 '0px', '-60px'
					live2d_settings["waifuDraggable"] = "unlimited"; // 拖拽样式，例如 'disable'(禁用), 'axis-x'(只能水平拖拽), 'unlimited'(自由拖拽)
					live2d_settings["waifuEdgeSide"] = "left:72"; // 看板娘贴边方向，例如 'left:0'(靠左 0px),
					/* 在 initModel 前添加 */
					initModel("/live2d/waifu-tips.json");
				},
			});
		},
	});
} catch (err) {
	console.log("[Error] JQuery is not defined.");
}
