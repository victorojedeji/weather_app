const searchInput = document.querySelector('#search'),
suggestWrap = document.querySelector(".search-suggestion");



let url = 'https://api.teleport.org/api/cities/?search=';

searchInput.addEventListener("input", async (e) => {
        let inputVal = e.target.value;
        let endPoint = url + inputVal;
        let result = await(await fetch(endPoint)).json();
        suggestWrap.innerHTML = '';
        let cities = result._embedded["city:search-results"];
        let length = cities.length > 5 ? 5 : cities.length;
        
        for(let j = 0; j < length; j++) {
           let suggestionTag = document.createElement('p');
           suggestionTag.classList.add('suggestion')
           suggestionTag.addEventListener("click", clicked)
            suggestionTag.setAttribute('title', `${cities[j].matching_full_name}`);
           suggestionTag.textContent = cities[j].matching_full_name;
           
           suggestWrap.appendChild(suggestionTag);
        }
});


function clicked(e) {
    let tagVal = e.target.getAttribute('title');
    searchInput.value = tagVal;
}































// let apiId = "a67a9ac089f9743696b7e7fdeaddd2e9",
// city = "ibadan";

// let api = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiId}`;

// fetch(api).then(res => res.json()).then(result => console.log(result));