(function () {
	function $(selector) {
		if (arguments.length > 1) {
			throw new Error("Only one argument is allowed");
		}

		const elements = document.querySelectorAll.apply(document, arguments);
		return Array.prototype.slice.call(elements);
	}

	const navbar = $("body > .navbar");
	const sections = $("body > .section");
	const footer = $("body > .footer");

	const columnMain = $(
		".column-main > .card, .column-main > .pagination, .column-main > .post-navigation"
	);
	const columnLeft = $(".column-left > .card");
	const columnRightShadow = $(".column-right-shadow > .card");
	const columnRight = $(".column-right > .card");

	const transitionNav = [...navbar, ...sections, ...footer];

	const transitionElements = [
		...columnMain,
		...columnLeft,
		...columnRightShadow,
		...columnRight,
	];

	navbar.forEach((element) => {
		element.style.transform = "translateY(-100px)";
	});

	transitionNav.forEach((element) => {
		element.style.transition = "0s";
		element.style.opacity = "0";
	});

	transitionElements.forEach((element) => {
		element.style.transition = "0s";
		element.style.opacity = "0";
		element.style.transform = "scale(0.8)";
		element.style.transformOrigin = "center top";
	});

	setTimeout(() => {
		navbar.forEach((element) => {
			element.style.transform = "translateY(0)";
		});

		transitionNav.forEach((element) => {
			element.style.opacity = "1";
			element.style.transition =
				"opacity 0.3s ease-out, transform 0.3s ease-out";
		});

		transitionElements.forEach((element, index) => {
			setTimeout(() => {
				element.style.opacity = "1";
				element.style.transform = "";
				element.style.transition =
					"opacity 0.3s ease-out, transform 0.3s ease-out";
			}, index * 100);
		});
	}, 100);

	setTimeout(() => {
		navbar.forEach((element) => {
			element.style.transform = "translateY(0)";
		});

		transitionNav.forEach((element) => {
			element.style = "";
		});

		transitionElements.forEach((element, index) => {
			setTimeout(() => {
				element.style = "";
			}, index * 100);
		});
	}, 1100);
})();
