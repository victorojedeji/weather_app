let apiId = "a67a9ac089f9743696b7e7fdeaddd2e9",
city = "ibadan";

let api = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiId}`;

fetch(api).then(res => res.json()).then(result => console.log(result));


fetch('https://test.api.amadeus.com/GLIHsZmZGFD9yrCRqjPWajJJ6NGBUEQ1')
	.then(response => response.json())
	.then(response => console.log(response))
	.catch(err => console.error(err));