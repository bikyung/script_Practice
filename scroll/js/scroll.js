const sections = document.querySelectorAll('section');
const lis = document.querySelectorAll('ul li');
let posArr = [];

// section의 세로값을 빈배열 posArr로 넣기
for (const section of sections) {
	posArr.push(section.offsetTop);
}

lis.forEach((li, idx) => {
	//li를 클릭했을때
	li.addEventListener('click', (e) => {
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
window.addEventListener('scroll', (e) => {
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
