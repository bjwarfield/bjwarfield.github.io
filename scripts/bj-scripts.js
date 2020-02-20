"use strict";
(window.onload = function () {
	//query selectory helper function
	function DOM(query) {
		return document.querySelector(query);
	}

	//Document vars
	const parallaxContainer = DOM("#Parallax-Container");
	const mainHeader = DOM("#Main-Header");
	const headNav = DOM("#Head-nav");
	const footNav = DOM("#Foot-Nav")
	const bBox = DOM('#Home');
	const lgMenu = DOM('#Lg-Menu');
	const smMenuBtn = DOM('#Sm-Menu-Btn');

	//utility Vars
	let lastScroll = 0;
	let clickEvent = false;
	let menuOpen = false;
	let viewHeight = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);
	let viewWidth = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);

	//add click event that hides the navbar after click
	const navLinks = document.querySelectorAll("#Lg-Menu > li > a");
	navLinks.forEach(function (element) {
		element.addEventListener('click', function (e) {
			setTimeout(function () {
				if (parallaxContainer.scrollTop > 0) {

					headNav.style.transitionDelay = 'initial';
					headNav.style.transitionDuration = '0.5s';
					headNav.style.transform = 'translateY(-110%)';
					footNav.style.transitionDuration = '0.5s';
					footNav.style.transform = 'translateY(110%)';

				}
			}, 750);
			if (menuOpen && viewWidth <= 700) {
				smMenuBtn.classList.remove('menu-open');
				menuOpen = false;
				lgMenu.style.transform = "scaleY(0)";
			}
		})
	});

	const revealOnScrollElements = document.querySelectorAll('.reveal-on-scroll');


	//header navbar manipulation
	function setNav() {




		if (parallaxContainer.scrollTop > 0) {
			headNav.style.transitionDelay = 'initial';
			headNav.style.transitionDuration = 'initial';
			headNav.classList.add("fixed-nav");

			//set top margin
			// headNav.style.marginTop = parallaxContainer.scrollTop + 'px';
			headNav.style.transitionDuration = 'initial';
			bBox.style.transitionDelay = 'initial';
			bBox.classList.remove('top-box');


		} else {
			headNav.style.transitionDelay = '0.25s';
			headNav.style.transitionDuration = '0.5s';
			headNav.classList.remove("fixed-nav");
			//remove top padding
			// headNav.style.marginTop = 0;
			bBox.style.transitionDelay = '0.25s';
			bBox.classList.add('top-box');
			setTimeout(function () {
				bBox.style.transitionDelay = "initial";
			}, 500);

		}


		//translate nav based on scroll direction
		if (lastScroll - parallaxContainer.scrollTop < 0) {
			if (!menuOpen) {
				headNav.style.transitionDelay = 'initial';
				headNav.style.transitionDuration = '0.5s';
				headNav.style.transform = 'translateY(-110%)';
			}

			footNav.style.transitionDelay = 'initial';
			footNav.style.transitionDuration = '0.5s';
			footNav.style.transform = 'translateY(110%)';
		} else {
			headNav.style.transitionDelay = 'initial';
			headNav.style.transitionDuration = '0.5s';
			headNav.style.transform = 'translateY(0)';

			footNav.style.transitionDelay = 'initial';
			footNav.style.transitionDuration = '0.5s';
			footNav.style.transform = 'translateY(0)';
		}

		if (parallaxContainer.scrollTop == 0) {
			footNav.style.transitionDelay = '0.5s';
			footNav.style.transitionDuration = '0.5s';
			footNav.style.transform = 'translateY(110%)';
		}

		//bottom of scroll behavior
		if (DOM("#Main").getBoundingClientRect().height - viewHeight - parallaxContainer.scrollTop == 0) {
			headNav.style.transitionDelay = '0.5s';
			headNav.style.transitionDuration = '0.5s';
			headNav.style.transform = 'translateY(0)';

			footNav.style.transitionDelay = '0.5s';
			footNav.style.transitionDuration = '0.5s';
			footNav.style.transform = 'translateY(0)';

		}


		lastScroll = parallaxContainer.scrollTop;

		//reveal on scroll


		revealOnScrollElements.forEach(function (element) {
			let elemTop = element.getBoundingClientRect().top;
			let elemBottom = element.getBoundingClientRect().bottom;

			if (elemBottom > 0 && elemTop < viewHeight) {
				element.style.transform = "scale(1) translateY(0)";
				element.style.opacity = "1";
			} else {
				element.style.transform = "scale(0.75) translateY(3em)";
				element.style.opacity = "0";
			}
		})
	}

	parallaxContainer.addEventListener('scroll', setNav);
	setNav();

	smMenuBtn.addEventListener('click', function (e) {
		e.preventDefault();
		if (menuOpen) {
			smMenuBtn.classList.remove('menu-open');
			menuOpen = false;
			lgMenu.style.transitionDuration = "0.5s";
			lgMenu.style.transform = "scaleY(0)";
		} else {
			smMenuBtn.classList.add('menu-open');
			menuOpen = true;
			lgMenu.style.transitionDuration = "0.5s";
			lgMenu.style.transform = "scaleY(1)";
		}
	});
	window.addEventListener("resize", function (e) {
		viewHeight = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);
		viewWidth = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);

		menuOpen = false;
		if (viewWidth > 700) {
			headNav.style.transitionDuration = "initial";
			lgMenu.style.transform = "scaleY(1)";
		} else {
			headNav.style.transitionDuration = "initial";
			lgMenu.style.transitionDuration = "initial";
			lgMenu.style.transform = "scaleY(0)";
			lgMenu.style.transitionDuration = "initial";
		}
		setTimeout(function(){
			mainHeader.style.width = bBox.offsetWidth + "px";
		},100);
		
	});

	//fix header width
	setTimeout(function(){
			mainHeader.style.width = bBox.offsetWidth + "px";
		},100);
});