//86007043f7007d67ce5b5f460ff91ac7
//flickr.interestingness.getList
//https://live.staticflickr.com/{server-id}/{id}_{secret}_{size-suffix}.jpg
//http://farm{icon-farm}.staticflickr.com/{icon-server}/buddyicons/{nsid}.jpg
//https://www.flickr.com/images/buddyicon.gif

//https://www.flickr.com/services/rest/?method=flickr.test.echo&name=value

const frame = document.querySelector('section');
const loading = document.querySelector('.loading');
const base = 'https://www.flickr.com/services/rest/?';
const method_interest = 'flickr.interestingness.getList';
const key = '86007043f7007d67ce5b5f460ff91ac7';
const per_page = 100;
const url = `${base}method=${method_interest}&api_key=${key}&per_page=${per_page}&format=json&nojsoncallback=1`;

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

function createList(items) {
	let htmls = '';

	items.forEach((data) => {
		htmls += `
                  <article class="item">
                      <div>
                        <a class="pic" href"https://live.staticflickr.com/${data.server}/${data.id}_${data.secret}_b.jpg">
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
	//썸네일 이미지 엑박시 대체 이미지로 변경
	thumbs.forEach((thumb) => {
		thumb.onerror = () => {
			thumb.setAttribute('src', 'img/member05.jpg');
		};

		//이미지 모두 로딩완료후 isotope 적용
		thumb.onload = () => {
			count++;
			if (count === len) {
				new Isotope(frame, {
					itemSelector: '.item',
					columnWidth: '.item',
					transitionDuration: '0.8s',
				});
				frame.classList.add('on');
				loading.classList.add('off');
			}
		};
	});

	//버디아이콘 엑박시 대체 이미지 변경
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
