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
    suggestWrap.innerHTML = `
                    <li class="suggestion static">London, England, United Kingdom</li>
                    <li class="suggestion static">New York City, New York, United States</li>
                    <li class="suggestion static">Sydney, New South Wales, Australia</li>
                    <li class="suggestion static">Tokyo, Tokyo, Japan</li>
                    <li class="suggestion static">Lagos, Lagos, Nigeria</li>
                            `
}

//let shortMonthsArr = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
//daysArr = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
//let date = new Date(),
//day = daysArr[date.getDay()],
//month = shortMonthsArr[date.getMonth()],
//year = date.getFullYear(),
//time = date.getTime();
//console.log(day,month,year,time)

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
        
        const timeRec = result.coord;
        
        //let time = new Date(timeRec).toLocaleString("en-US");
        console.log(timeRec)

        document.querySelector(".visibilty-value").innerText = visibility;
        document.querySelector(".humidity-value").innerText = `${humidity}%`;
        document.querySelector(".wind-value").innerText = `${speed}km/h`;
        document.querySelector(".deg").innerText = feels_like.toFixed(0);
        document.querySelector(".city").innerText = `${city}, ${country}`.toUpperCase();
        document.querySelector(".weather-type").innerText = description;
        searchInput.value = "";
   });
   
    var loc = '35.731252, 139.730291' // Tokyo expressed as lat,lng tuple
    var targetDate = new Date() // Current date/time of user computer
    var timestamp = targetDate.getTime()/1000 + targetDate.getTimezoneOffset() * 60 // Current UTC date/time expressed as seconds since midnight, January 1, 1970 UTC
    var apikey = 'proven-verve-363219'
    var apicall = 'https://maps.googleapis.com/maps/api/timezone/json?location=' + loc + '&timestamp=' + timestamp + '&key=' + apikey
    fetch(apicall).then(res => res.json()).then(call => console.log(call))
}


let staticList = document.getElementsByTagName("li")

for(let i = 0; i < staticList.length; i++){
    staticList[i].addEventListener("click", postLoc)
}

function postLoc(e) {
    let el = e.target.innerText;
    searchInput.value = el;
}