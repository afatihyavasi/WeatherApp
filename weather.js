const API_KEY = '0a00ef68d40db60f81f989f45d2d2c2c';
const $inputArea = document.querySelector('#search-input');
const $searchIcon = document.querySelector('#search-icon');
const $icon = document.querySelector('#icon');
const $iconDesctipticon = document.querySelector('#icon-description');
const $temp = document.querySelector('#temp');
const $cityName = document.querySelector('#city-name');
const $body = document.body;


const eventListeners = () => {
    $searchIcon.addEventListener('click', (event) => {
        if (checkInput($inputArea.value)) {
            getWeatherInfo($inputArea.value);
            $inputArea.value = '';
        }
    });

    $body.addEventListener('keydown', (event) => {
        if (event.key == 'Enter') {
            event.preventDefault();
            $searchIcon.click();
        }
    })
}

const checkInput = (input) => {
    if (input === '') alert('Please fill the city input');
    else return true;
};

const getWeatherInfo = async (city) => {
    let response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_KEY}`)
    let weatherInfo = await response.json();
    writeWeatherInfo(weatherInfo);
}


const writeWeatherInfo = (weatherInfo) => {
    let { icon, description } = weatherInfo.weather[0];
    let { temp } = weatherInfo.main;
    let { name } = weatherInfo;
    if (name.toLowerCase().includes('province')) name = name.split(' ')[0];
    $icon.src = `https://openweathermap.org/img/wn/${icon}.png`
    $iconDesctipticon.textContent = description;
    $temp.textContent = temp.toFixed() + '°C';
    $cityName.textContent = name;
    document.title = `${name} ${temp.toFixed()} °C `;
    changeBackgroundColor(temp);
};

const changeBackgroundColor = (temp) => {
    if (temp <= 0) $body.style.background = 'linear-gradient(to right, #0008ee, #0034ef, #004aec, #005ce7, #2a6be0, #007fe7, #0090ea, #00a1eb, #00b9f5, #00d1f8, #0fe6f6, #5ffbf1)';
    else $body.style.background = 'linear-gradient(to right, #e81f1f, #e73d18, #e45111, #e2610b, #df700a, #e07f08, #e08e0b, #df9c14, #e0af1e, #e0c32c, #ded63d, #dae950)';
};

const init = () => {
    eventListeners();
}
init();




