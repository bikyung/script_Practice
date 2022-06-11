const sections = document.querySelectorAll('section');
const lis = document.querySelectorAll('ul li');
const base = -300;
let posArr = [];

const basket = document.querySelector('.basket path');

//section의 세로위치값을 배열에 저장
for (const section of sections) {
	posArr.push(section.offsetTop);
}

//브라우저에서 스크롤 할 때
window.addEventListener('scroll', (e) => {
	let scroll = window.scrollY || window.pageYOffset;

	sections.forEach((section, idx) => {
		if (scroll >= posArr[idx] + base) {
			for (let i = 0; i < sections.length; i++) {
				lis[i].classList.remove('on');
				sections[i].classList.remove('on');
			}
			lis[idx].classList.add('on');
			sections[idx].classList.add('on');
		}
	});
	const path = sections[1].querySelector('path');
	console.log(scroll);
	console.log(posArr[1]);
	if (scroll >= posArr[1] + base) {
		let cScroll = scroll - (posArr[1] + base * 2);
		cScroll = cScroll * 4;

		if (cScroll >= 1600) cScroll = 1600;
		path.style.strokeDashoffset = 1600 - cScroll;
	} else {
		path.style.strokeDashoffset = 1600;
	}
});

//ul li 버튼 클릭시 해당 section으로 이동
lis.forEach((li, idx) => {
	li.addEventListener('click', (e) => {
		e.preventDefault;
		new Anim(window, {
			prop: 'scroll',
			value: posArr[idx],
			duration: 500,
		});
	});
});
