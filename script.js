const searchInput = document.querySelector('#search');
let url = 'https://api.teleport.org/api/cities/?search=';

searchInput.addEventListener("input", async (e) => {
        let inputVal = e.target.value;
        let endPoint = url + inputVal;
        let result = await(await fetch(endPoint)).json();
        let cities = result._embedded["city:search-results"];
        let length = cities.length > 10 ? 10 : cities.length;
        console.log(cities)
        for(let j = 0; j < cities.length; j++) {
           console.log(cities)
        }
        console.log(result);
});

































// let apiId = "a67a9ac089f9743696b7e7fdeaddd2e9",
// city = "ibadan";

// let api = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiId}`;

// fetch(api).then(res => res.json()).then(result => console.log(result));