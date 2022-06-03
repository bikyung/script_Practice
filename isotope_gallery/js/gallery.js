//86007043f7007d67ce5b5f460ff91ac7
//flickr.interestingness.getList
//https://live.staticflickr.com/{server-id}/{id}_{secret}_{size-suffix}.jpg
//http://farm{icon-farm}.staticflickr.com/{icon-server}/buddyicons/{nsid}.jpg
//https://www.flickr.com/images/buddyicon.gif

//https://www.flickr.com/services/rest/?method=flickr.test.echo&name=value

const body = document.querySelector('body');
const frame = document.querySelector('section');
const input = document.querySelector('#search');
const btnSearch = document.querySelector('.btnSearch');
const loading = document.querySelector('.loading');
const base = 'https://www.flickr.com/services/rest/?';
const method_interest = 'flickr.interestingness.getList';
const method_search = 'flickr.photos.search';
const key = '86007043f7007d67ce5b5f460ff91ac7';
const per_page = 10;
const url = `${base}method=${method_interest}&api_key=${key}&per_page=${per_page}&format=json&nojsoncallback=1`;

callData(url);

//검색버튼 클릭시 태그로 검색한 이미지 호출 메소드
btnSearch.addEventListener('click', (e) => {
	let tag = input.value;

	const url = `${base}method=${method_search}&api_key=${key}&per_page=${per_page}&format=json&nojsoncallback=1&privacy_filter=1&tags=${tag}`;

	callData(url);
});

//input에 검색어를 입력하고 엔터키를 눌렀을 때
input.addEventListener('keyup', (e) => {
	if (e.key === 'Enter') {
		let tag = input.value;

		const url = `${base}method=${method_search}&api_key=${key}&per_page=${per_page}&format=json&nojsoncallback=1&privacy_filter=1&tags=${tag}`;

		callData(url);
	}
});

//썸네일 클릭시 팝업생성 이벤트 연결
frame.addEventListener('click', (e) => {
	e.preventDefault();

	let target = e.target.closest('.item').querySelector('.pic img');

	//썸네일을 클릭했을 때만 코드실행
	if (e.target === target) {
		//클릭한 썸네일의 부모 a에서 href속성 구하기
		let imgSrc = e.target.parentElement.getAttribute('href');

		let pop = document.createElement('aside');
		pop.classList.add('pop');
		let pops = `
                    <div class="con">
                        <img src="${imgSrc}">
                    </div>
                    <span class="close">close</span>
        `;
		pop.innerHTML = pops;
		body.append(pop);
		//팝업생성시 스크롤 없애기
		body.style.overflow = 'hidden';
	}
});

body.addEventListener('click', (e) => {
	let pop = body.querySelector('.pop');

	//팝업이 있을 경우에만 코드 실행
	if (pop) {
		let close = pop.querySelector('.close');
		//close버튼을 클릭했을 때만 코드 실행
		if (e.target == close) {
			pop.remove();
			body.style.overflow = 'auto';
		}
	}
});

function callData(url) {
	frame.classList.remove('on');
	loading.classList.remove('off');

	fetch(url)
		.then((data) => {
			return data.json();
		})
		.then((json) => {
			const items = json.photos.photo;
			console.log(items);
			createList(items);
			imgLoaded();
		});
}

function createList(items) {
	let htmls = '';
	// console.log(items);
	items.forEach((data) => {
		htmls += `
                <article class="item">
                    <div>
                        <a class="pic" href="https://live.staticflickr.com/${data.server}/${data.id}_${data.secret}_b.jpg">
                            <img src="https://live.staticflickr.com/${data.server}/${data.id}_${data.secret}_m.jpg">
                        </a>
                        <p>${data.title}</p>
                        <div class="profile">
                            <img src="http://farm${data.farm}.staticflickr.com/${data.server}/buddyicons/${data.owner}.jpg">
                            <span>${data.owner}</span>
                        </div>
                    </div>
                </article>
        `;
	});

	frame.innerHTML = htmls;
}

function imgLoaded() {
	const thumbs = document.querySelectorAll('.pic img');
	const len = thumbs.length;
	let count = 0;

	thumbs.forEach((thumb) => {
		//썸네일 엑박일 경우 대체이미지 처리
		thumb.onerror = () => {
			thumb.setAttribute('src', 'img/k1.jpg');
		};
		//이미지 모두 로딩완료후 isotope적용
		thumb.onload = () => {
			count++;
			if (count === len) {
				new Isotope(frame, {
					itemSelector: '.item',
					columnWidth: '.item',
					transitionDuration: '0.8s',
				});

				//모든 이미지 로딩 끝나고 isotope적용시
				//frame과 loading에 모션 처리
				frame.classList.add('on');
				loading.classList.add('off');
			}
		};
	});

	//버디아이콘 엑박시 대체이미지 변경
	const buddies = document.querySelectorAll('.profile img');
	buddies.forEach((buddy) => {
		buddy.onerror = () => {
			buddy.setAttribute(
				'src',
				'https://www.flickr.com/images/buddyicon.gif'
			);
		};
	});
}
