const slider = document.querySelector('#slider');
const ul = slider.querySelector('ul');
const lis = ul.querySelectorAll('li');
const len = lis.length;
const prevBtn = slider.querySelector('.prev');
const nextBtn = slider.querySelector('.next');
const speed = 500;
let enableClick = true;

init();

function init() {
	ul.style.left = '-100%';
	ul.prepend(ul.lastElementChild);
	ul.style.width = `${100 * len}%`;

	lis.forEach((li) => {
		li.style.width = `${100 / len}`;
	});
}

nextBtn.addEventListener('click', (e) => {
	e.preventDefault();
	if (enableClick) {
		enableClick = false;
		nextSlide();
	}
});

prevBtn.addEventListener('click', (e) => {
	e.preventDefault();
	if (enableClick) {
		enableClick = false;
		prevSlide();
	}
});

function nextSlide() {
	new Anim(ul, {
		prop: 'left',
		value: '-200%',
		duration: speed,
		callback: () => {
			ul.style.left = '-100%';
			ul.append(ul.firstElementChild);
			enableClick = true;
		},
	});
}

function prevSlide() {
	new Anim(ul, {
		prop: 'left',
		value: '0%',
		duration: speed,
		callback: () => {
			ul.style.left = '-100%';
			ul.prepend(ul.lastElementChild);
			enableClick = true;
		},
	});
}
