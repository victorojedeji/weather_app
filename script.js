let url = "https://api.openweathermap.org/data/2.5/weather?lat={7.376736}&lon={3.939786}&appid={a67a9ac089f9743696b7e7fdeaddd2e9}"

fetch(url).then(res => res.json()).then(result => console.log(result));