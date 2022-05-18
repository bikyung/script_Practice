const sections = document.querySelectorAll('section');
const len = sections.length;
const ul = document.querySelector('ul');
const lis = ul.querySelectorAll('li');
const lis_arr = Array.from(lis);
let posArr = null;
let enableClick = true;

//페이지 로딩시 세로위치값 구하기
setPos();

// 마우스를 살짝만 올렸을 때 section 페이지 이동
window.addEventListener(
	'mousewheel',
	(e) => {
		e.preventDefault();
		//현재 활성화되어있는 버튼 li를 변수로 저장해서
		let activeItem = document.querySelector('ul li.on');
		//몇번째 li인지 순번을 찾아서 저장
		let activeIndex = lis_arr.indexOf(activeItem);
		let targetIndex;
		console.log(e);
		if (e.deltaY < 0) {
			//3-2-1-0 return
			if (activeIndex === 0) {
				return;
			}
			targetIndex = activeIndex - 1;
		} else {
			//0-1-2-3 return
			if (activeIndex === len - 1) {
				return;
			}
			targetIndex = activeIndex + 1;
		}
		new Anim(window, {
			prop: 'scroll',
			value: posArr[targetIndex],
			duration: 500,
		});
	},
	{ passive: false }
);
//resize 되었을때 setPos 함수 호출
window.addEventListener('resize', () => {
	setPos();

	//resize 시 버튼과 섹션의 매칭되지 않는 문제 해결
	//현재 활성화 버튼의 순번을 구해서 브라우저를 활성화섹션위치 고정이동
	const active = ul.querySelector('li.on');
	const activeIndex = lis_arr.indexOf(active);
	window.scroll(0, posArr[activeIndex]);
	console.log(activeIndex);
});

//li의 갯수만큼 반복을 돌면서 클릭이벤트 바인딩
lis.forEach((li, idx) => {
	//li를 클릭했을때
	li.addEventListener('click', (e) => {
		let isOn = e.currentTarget.classList.contains('on');
		if (isOn) return;
		if (enableClick) {
			enableClick = false;
			moveScroll(idx);
		}
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
		callback: () => {
			enableClick = true;
		},
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
