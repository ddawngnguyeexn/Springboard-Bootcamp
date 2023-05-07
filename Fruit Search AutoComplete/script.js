const container = document.querySelector('.search-container');
const input = document.querySelector('#fruit');
const suggestions = document.querySelector('.suggestions ul');

const fruit = ['Apple', 'Apricot', 'Avocado 🥑', 'Banana', 'Bilberry', 'Blackberry', 'Blackcurrant', 'Blueberry', 'Boysenberry', 'Currant', 'Cherry', 'Coconut', 'Cranberry', 'Cucumber', 'Custard apple', 'Damson', 'Date', 'Dragonfruit', 'Durian', 'Elderberry', 'Feijoa', 'Fig', 'Gooseberry', 'Grape', 'Raisin', 'Grapefruit', 'Guava', 'Honeyberry', 'Huckleberry', 'Jabuticaba', 'Jackfruit', 'Jambul', 'Juniper berry', 'Kiwifruit', 'Kumquat', 'Lemon', 'Lime', 'Loquat', 'Longan', 'Lychee', 'Mango', 'Mangosteen', 'Marionberry', 'Melon', 'Cantaloupe', 'Honeydew', 'Watermelon', 'Miracle fruit', 'Mulberry', 'Nectarine', 'Nance', 'Olive', 'Orange', 'Clementine', 'Mandarine', 'Tangerine', 'Papaya', 'Passionfruit', 'Peach', 'Pear', 'Persimmon', 'Plantain', 'Plum', 'Pineapple', 'Pomegranate', 'Pomelo', 'Quince', 'Raspberry', 'Salmonberry', 'Rambutan', 'Redcurrant', 'Salak', 'Satsuma', 'Soursop', 'Star fruit', 'Strawberry', 'Tamarillo', 'Tamarind', 'Yuzu'];

function search(str) {
		// TODO
	let results = [];
	
	for (let fru of fruit){
		let strLow = str.toLowerCase();
		if (fru.toLowerCase().indexOf(strLow)!=-1){
			results.push(fru);
		}
	}
	if (results.length!==0){
	container.classList.add("active");}
	else{container.classList.remove("active");}
	return results;
}

function searchHandler(e) {
	// TODO
	const listFru = search(e.target.value);
	clearSuggestion();
	if(e.target.value){
	showSuggestions(listFru,input.value);}
	else{
	container.classList.remove("active");
	}
}

function showSuggestions(results, inputVal) {
		
		// TODO
		results.forEach(element=>{
			let i = element.toLowerCase().indexOf(inputVal.toLowerCase());
				
			let fruLi = document.createElement('li');
			// let boldFru = element.replaceAll(inputVal,`<b>${inputVal}</b>`);
			let boldFru = element.substr(0,i) + '<span class="bold">' + element.substr(i,inputVal.length) + '</span>' + element.substr(i+inputVal.length);
			fruLi.innerHTML = boldFru;
			suggestions.appendChild(fruLi);
		})
	}
function useSuggestion(event) {
	// TODO 	
	if(event.target.className == 'bold'){
		input.value = event.target.parentElement.innerText;
		}else{
		input.value = event.target.innerText;
		}
	clearSuggestion();
	container.classList.remove("active");
	}
function clearSuggestion() {
	while(suggestions.firstChild){
		suggestions.removeChild(suggestions.firstChild);
	}
}

input.addEventListener('keyup', searchHandler);
suggestions.addEventListener('click', useSuggestion);

// function showSuggestions(results, inputVal) {
		
// 	// TODO
// 	results.forEach(element=>{
// 		let i = element.toLowerCase().indexOf(inputVal.toLowerCase());
			
// 		let fruLi = document.createElement('li');
// 		// let boldFru = element.replaceAll(inputVal,`<b>${inputVal}</b>`);
// 		let boldFru = element.substr(0,i) + '<span class="bold">' + element.substr(i,inputVal.length) + '</span>' + element.substr(i+inputVal.length);
// 		fruLi.innerHTML = boldFru;
// 		fruLi.onclick = (event)=>{
// 			console.log(event.target.className);
// 			if(event.target.className == 'bold'){
// 				input.value = event.target.parentElement.innerText;
// 			}else{
// 				input.value = event.target.innerText;
// 			}
						
// 			console.log(event.target.innerHTML);
// 		}
// 		suggestions.appendChild(fruLi);
// 	})
// 	}