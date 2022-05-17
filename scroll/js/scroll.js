const sections = document.querySelectorAll('section');
const ul = document.querySelector('ul');
const lis = ul.querySelectorAll('li');
const lis_arr = Array.from(lis);
let posArr = null;
console.log(lis_arr);
//페이지 로딩시 세로위치값 구하기
setPos();

//resize 되었을때 setPos 함수 호출
window.addEventListener('resize', () => {
	setPos();

	//resize 시 버튼과 섹션의 매칭되지 않는 문제 해결
	//현재 활성화 버튼의 순번을 구해서 브라우저의 스크롤값을 해당 섹션위치로 이동
	const active = ul.querySelector('li.on');
	const activeIndex = lis_arr.indexOf(active);
	window.scroll(0, posArr[activeIndex]);
	console.log(activeIndex);
});

//li의 갯수만큼 반복을 돌면서 클릭이벤트 바인딩
lis.forEach((li, idx) => {
	//li를 클릭했을때
	li.addEventListener('click', () => {
		//브라우저를 각 섹션의 세로위치값으로 이동
		moveScroll(idx);
		//모든 버튼을 비활성화하고
		for (const el of lis) {
			el.classList.remove('on');
		}
		// 해당 순번의 li만 활성화
		lis[idx].classList.add('on');
	});
});

//브라우저에 스크롤했을 때 버튼 활성화
window.addEventListener('scroll', () => {
	activation();
});

function activation() {
	let scroll = window.scrollY || window.pageYOffset;

	//섹션의 갯수만큼 반복을 돌면서
	sections.forEach((sec, idx) => {
		//스크롤값이 각 섹션의 세로 위치값보다 크거나 같다면
		if (scroll >= posArr[idx]) {
			//모든 li의 on을 제거하고
			for (const el of lis) {
				el.classList.remove('on');
			}
			// 해당 순번의 li만 활성화
			lis[idx].classList.add('on');
			// 모든 섹션의 on을 제거하고
			for (const section of sections) {
				section.classList.remove('on');
			}
			//해당 순번의 섹션을 on 추가하여 활성화
			sections[idx].classList.add('on');
		}
	});
}
//li버튼 클릭시 브라우저를 각 섹션의 세로 위치값으로 이동 함수 정의
function moveScroll(idx) {
	new Anim(window, {
		prop: 'scroll',
		value: posArr[idx],
		duration: 500,
	});
}

//각 섹션의 세로 위치값을 구해서 배열에 넣는 함수 정의
function setPos() {
	posArr = [];
	// section의 세로값을 빈배열 posArr로 넣기
	for (const section of sections) {
		posArr.push(section.offsetTop);
	}
	console.log(posArr);
}
