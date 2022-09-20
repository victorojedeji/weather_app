const searchInput = document.querySelector('#search'),
suggestWrap = document.querySelector(".search-suggestion"), 
search = document.querySelector(".search-icon-wrapper");

search.addEventListener("click", getWeatherInfoByCity);

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
    suggestWrap.innerHTML =
                            `
                            <p class="suggestion">Birmingham</p>
                            <p class="suggestion">New york</p>
                            <p class="suggestion">California</p>
                            <p class="suggestion">Lagos</p>
                            <p class="suggestion">Manchester</p>
                            `
}

let shortMonthsArr = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
let date = new Date(),
day = date.getDay();
console.log(day)

function getWeatherInfoByCity() {
    let city,
    cityString = searchInput.value,
    apiId = "a67a9ac089f9743696b7e7fdeaddd2e9";
    
    if(cityString.includes(',')) {
        city = cityString.substring(0, cityString.indexOf(',')) + cityString.substring(cityString.lastIndexOf(','))
    } else {
        city = cityString;
    }
    cityName = city.toLowerCase();
    let api = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=metric&appid=${apiId}`;
    fetch(api).then(res => res.json()).then(result => {
        if(result.cod !== 200) {
           alert('City not found!')
           return;
        }
        console.log(result)
        const city = result.name;
        const country = result.sys.country;
        const {humidity, feels_like} = result.main;
        const visibility = result.visibility;
        const {id, description} = result.weather[0];
        const speed = result.wind.speed;

        document.querySelector(".visibilty-value").innerText = visibility;
        document.querySelector(".humidity-value").innerText = `${humidity}%`;
        document.querySelector(".wind-value").innerText = `${speed}km/h`;
        document.querySelector(".deg").innerText = feels_like.toFixed(0);
        document.querySelector(".city").innerText = `${city}, ${country}`;
        document.querySelector(".weather-type").innerText = description;
   });
}
