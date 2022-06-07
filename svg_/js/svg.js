const sections = document.querySelectorAll('section');
const lis = document.querySelectorAll('ul li');
const base = -300;
let posArr = [];

//section의 세로위치값을 배열에 저장
for (const section of sections) {
	posArr.push(section.offsetTop);
}

//브라우저에서 스크롤 할 때
window.addEventListener('scroll', (e) => {
	//현재 스크롤한 값을 변수에 담아서
	let scroll = window.scrollY || window.pageYOffset;

	sections.forEach((el, idx) => {
		//scroll값이 해당섹션의 값보다 크거나 같을 경우 해당 순번의 li만 활성화
		if (scroll >= posArr[idx] + base) {
			for (const li of lis) {
				li.classList.remove('on');
				lis[idx].classList.add('on');
			}
			for (const section of sections) {
				section.classList.remove('on');
				sections[idx].classList.add('on');
			}
		}
	});
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
