const searchInput = document.querySelector('#search'),
suggestWrap = document.querySelector(".search-suggestion"),
datalist = document.querySelector('.datalist');



let url = 'https://api.teleport.org/api/cities/?search=';

searchInput.addEventListener("input", async (e) => {
        let inputVal = e.target.value;
        let endPoint = url + inputVal;
        let result = await(await fetch(endPoint)).json();
        datalist.innerHTML = '';
        let cities = result._embedded["city:search-results"];
        let length = cities.length > 5 ? 5 : cities.length;
        
        for(let j = 0; j < length; j++) {
           let suggestionTag = document.createElement('option');
           suggestionTag.value = cities[j].matching_full_name;
           console.log(suggestionTag)
           datalist.appendChild(suggestionTag);
        }
});

































// let apiId = "a67a9ac089f9743696b7e7fdeaddd2e9",
// city = "ibadan";

// let api = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiId}`;

// fetch(api).then(res => res.json()).then(result => console.log(result));