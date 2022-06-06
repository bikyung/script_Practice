const body = document.querySelector('body');
const main = document.querySelector('main');
const key = 'AIzaSyA6CRhzTrkjR8yXxDvdqyzW5MP0OZprnCc';
const playList = 'PL92HST3Zi7rblAe17Mq9pHT54ZwOBQRMk';
const num = 5;
const url = `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&key=${key}&playlistId=${playList}&maxResults=${num}`;

fetch(url)
	.then((data) => {
		return data.json();
	})
	.then((json) => {
		let items = json.items;
		console.log(items);
		let result = '';

		items.forEach((item) => {
			let tit = item.snippet.title;
			let desc = item.snippet.description;

			if (tit.length > 20) {
				tit = tit.substr(0, 20) + '...';
			}
			if (desc.length > 150) {
				desc = desc.substr(0, 150) + '...';
			}

			let date = item.snippet.publishedAt.split('T')[0];
			console.log(date);
			result += `
                     <article>
                        <a class="pic" href="#" data-vid="${item.snippet.resourceId.videoId}">
                           <img src="${item.snippet.thumbnails.medium.url}">
                        </a>
                        <div class="con">
                           <h2  data-vid="${item.snippet.resourceId.videoId}">${tit}</h2>
                           <p>${desc}</p>
                           <span>${date}</span>
                        </div>
                     </article>
         `;
		});
		main.innerHTML = result;
	});

main.addEventListener('click', (e) => {
	createPop(e);
});

body.addEventListener('click', (e) => {
	removePop(e);
});

function createPop(e) {
	e.preventDefault();
	if (!e.target.closest('a')) return;

	const vidId = e.target.closest('a').getAttribute('data-vid');

	let pop = document.createElement('aside');
	pop.innerHTML = `
                     <iframe src="https://youtube.com/embed/${vidId}" frameborder="0" width="100%" height="100%" allowfullscreen>
                     </iframe>
                     <span class="btnClose">Close</span>
   `;
	body.append(pop);
}

function removePop(e) {
	const pop = document.querySelector('aside');
	if (!pop) return;
	const close = document.querySelector('.btnClose');

	if (e.target === close) e.target.closest('aside').remove();
}
