const $app = document.getElementById('app');
const $observe = document.getElementById('observe');
const API = 'https://us-central1-escuelajs-api.cloudfunctions.net/characters';

//Tercer Problema 1 y 2
localStorage.clear();

//Segundo Problema 3: linea 8-36
const getData = async api => {
	try {
		const response = await fetch(api);
		const data = await response.json();
		//Primer Problema 1
		const nextPage = data.info.next;
		//Primer Problema 2
		localStorage.setItem('next_fetch', nextPage);
		//Primer Problema 3
		console.log(`This is what is stored in 'next_fetch: ' ${localStorage.getItem('next_fetch')}`);
		const people = data.results;
		let output = people
			.map(character => {
				return `
            <article class="Card">
            <img src="${character.image}" />
            <h2>${character.name}<span>${character.species}</span></h2>
            </article>
            `;
			})
			.join('');
		let newItem = document.createElement('section');
		newItem.classList.add('Items');
		newItem.innerHTML = output;
		$app.appendChild(newItem);
	} catch (error) {
		console.log(error);
	}
};

const renderEnd = () => {
	let newItem = document.createElement('h1');
	newItem.classList.add('Msg');
	newItem.innerText = 'No hay más personajes';
	$app.appendChild(newItem);
	intersectionObserver.unobserve($observe);
};

const loadData = () => {
	//Segundo Problema 1
	let checkFetch = localStorage.getItem('next_fetch');
	if (checkFetch === '') {
		//Cuarto Problema
		return renderEnd();
	} else {
		//Segundo Problema 2
		if (checkFetch == null) {
			return getData(API);
		} else {
			getData(checkFetch);
		}
	}
};

const intersectionObserver = new IntersectionObserver(
	entries => {
		if (entries[0].isIntersecting) {
			loadData();
		}
	},
	{
		rootMargin: '0px 0px 100% 0px'
	}
);

intersectionObserver.observe($observe);
