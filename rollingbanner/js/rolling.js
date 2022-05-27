const list = document.querySelector('.list');
const prev = document.querySelector('.prev');
const next = document.querySelector('.next');
let num = 0;
let wid = null;
let timer = null;
let enableClick = true;

//동적으로 리스트 생성
createList('data.json');
timer = setInterval(move, 50);
list.addEventListener('mouseenter', () => {
	clearInterval(timer);
});

list.addEventListener('mouseleave', () => {
	timer = setInterval(move, 50);
});

prev.addEventListener('click', (e) => {
	e.preventDefault();
	if (enableClick) {
		prevBtn();
		enableClick = false;
	}
});

next.addEventListener('click', (e) => {
	e.preventDefault();
	if (enableClick) {
		nextBtn();
		enableClick = false;
	}
});

//팝업 생성함수 정의
function createPop(imgSrc) {
	const pop = document.createElement('aside');
	pop.classList.add('pop');
	//pop안에 태그 생성해서 imgSrc값 넣기
	pop.innerHTML = `
                  <div class="pic">
                     <img src="${imgSrc}">
                  </div>
                  <span class="closeBtn">Close</span>
   `;

	//body에 pop 넣어서 화면에 출력
	document.body.append(pop);
	//opacity fadeIn효과 추가
	new Anim(pop, {
		prop: 'opacity',
		value: 1,
		duration: 500,
	});
}

//팝업 제거함수 정의
function removePop(e) {
	const pop = document.querySelector('.pop');
	if (pop) {
		const close = pop.querySelector('span');
		if (e.target == close) {
			//fadeOut 효과 추가
			new Anim(pop, {
				prop: 'opacity',
				value: 0,
				duration: 500,
				callback: () => {
					document.querySelector('.pop').remove();
				},
			});
		}
	}
}

//동적으로 팝업 호출
list.addEventListener('click', (e) => {
	e.preventDefault();
	//클릭한 이미지의 부모인 a의 href속성값 구하기
	const imgSrc = e.target.parentElement.getAttribute('href');
	//aside 태그 생성해서 클래스 pop 붙여주고
	createPop(imgSrc);
});

//팝업창 닫기 버튼 클릭 이벤트
document.body.addEventListener('click', (e) => {
	removePop(e);
});

//prev 버튼 함수
function prevBtn() {
	new Anim(list, {
		prop: 'margin-left',
		value: 0,
		duration: 500,
		callback: () => {
			list.prepend(list.lastElementChild);
			list.style.marginLeft = -wid + 'px'; // -240px
			num = -wid; // move함수의 num값에 연동
			enableClick = true;
		},
	});
}

//next 버튼 함수
function nextBtn() {
	new Anim(list, {
		prop: 'margin-left',
		value: -wid * 2, // -480px
		duration: 500,
		callback: () => {
			list.append(list.firstElementChild);
			list.style.marginLeft = -wid + 'px'; //-240px
			num = -wid; // move함수의 num값에 연동
			enableClick = true;
		},
	});
}
function move() {
	//list 상태 - marginLeft = -240px(-wid)
	//li의 너비값만큼 이동이 되면
	if (num < -wid * 2) {
		//list의 첫번째 li가 화면에서 사라지는 순간 list의 맨 마지막으로 다시 배치
		list.append(list.firstElementChild);
		//num값은 다시 0으로 초기화
		num = 0;
	} else {
		//-2씩 감소시켜서 margin-left값에 적용
		num -= 2;
	}
	list.style.marginLeft = num + 'px';
}
//데이터 호출, 리스트 생성
function createList(url) {
	fetch(url)
		.then((data) => {
			return data.json();
		})
		.catch((err) => {
			console.log('데이터호출에 실패했습니다.');
		})
		.then((item) => {
			let imgSrc = item.imgSrc;
			let tags = '';

			imgSrc.forEach((item) => {
				tags += `
                  <li>
                     <a href="${item.pic}">
                        <img src="${item.thumb}">
                     </a>
                  </li>
            `;
			});
			list.innerHTML = tags;
			initList();
		});
}

//초기 list 너비값 설정
function initList() {
	const list_li = list.querySelectorAll('li');
	const len = list_li.length;
	wid = parseInt(getComputedStyle(list_li[0]).width);
	list.style.width = len * wid + 'px';
	list.style.marginLeft = -wid + 'px';
	list.append(list.lastElementChild);
}
