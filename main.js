// Выбор случайных обоев
const timeToday = new Date;
const timeOfDay = getTimeDay();
let min = 1;
let max = 6;


let start = Math.floor(Math.random() * (max - min)) + min;
const sil = `url('/src/image/${timeOfDay}/${start}.jpg')`
document.querySelector(".body").style.backgroundImage=sil;



function getTimeDay(){
   let currentTime = timeToday.getHours();
   if( currentTime >= 6 && currentTime < 12) return 'morning';
   if( currentTime >= 12 && currentTime < 18) return 'day';
   else {
    return 'night'
   }
  }

function setBg(){
    function getRandomInt(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        let current =  Math.floor(Math.random() * (max - min)) + min;
          return current;
      }
      let count = getRandomInt(min, max);
      if (start == count){
        setBg();
      }
      else {
        // Максимум не включается
        
        const sil = `url('../src/image/${timeOfDay}/${count}.jpg')`
        document.querySelector(".body").style.backgroundImage=sil;
        start = count
      }
      
}

//Выбор обоев по клике на кнопку
  document.querySelectorAll("#slider").forEach((e) => {
  e.addEventListener('click', (e) => {
    setBg()
  })
});


// TIME
function showTime(element){
  const time = document.querySelector(element);
  const date = new Date;
  const currentTime = date.toLocaleTimeString()

  time.textContent = currentTime;

  setInterval(() => showTime(element), 1000);
}

showTime('.time');

//DATE
function showDate(element){
  const dateInfo = document.querySelector(element);
  const date = new Date;
  const currentDate = date.toLocaleDateString()

  dateInfo.textContent = currentDate;
}

showDate('.date');

// Greeting

function getName(){
   let currentTime = timeToday.getHours();
   if( currentTime >= 6 && currentTime < 12) return 'Good morning';
   if( currentTime >= 12 && currentTime < 18) return 'Good afternoon';
   else {
    return 'Good night'
   }
  }

  
  function changeGreeting(){
    let currentTime = timeToday.getHours();
    const greeting = document.querySelector(".greeting")
    let pool;
   if( currentTime >= 6 && currentTime < 12) {
     pool ='Good morning';
     greeting.textContent = pool;
     return
   }
   if( currentTime >= 12 && currentTime < 18) {
    pool = 'Good afternoon';
    greeting.textContent = pool;
    return
  } 
   else {
    pool ='Good night'
    greeting.textContent = pool;
    return
  }
}
changeGreeting();

// Input change

let formData;
const form = document.querySelector('#user-name');
const LS = localStorage;

form.addEventListener('input', function(e){
  formData= e.target.value;
  LS.setItem('savedName', formData)
});

if(LS.getItem('savedName')) {
  formData = LS.getItem('savedName');
  form.value = formData;
}
// Получаем ссылку на инпут и кнопку сохранения
// const input = document.querySelector("userName");

// // Проверяем, есть ли сохраненное значение в кэше
// if (localStorage.getItem(input)) {
//   input.value = localStorage.getItem(input);
// }

// // Обработчик события для сохранения значения в кэше
// saveBtn.addEventListener("click", function() {
//   localStorage.setItem("savedInput", input.value);
// });

// QUOTE
const quote = document.querySelector('.quote');
const author = document.querySelector('.author');
const quoteBtn = document.querySelector('.changeQuote');

async function getQuote() {
    const quotes = 'https://neversuptou.github.io/data.json';
    const res = await fetch(quotes);
    const data = await res.json();

    const numberOfQuote = Math.floor(Math.random() * data.length);

    quote.textContent = data[numberOfQuote].text;
    author.textContent = data[numberOfQuote].author;
}
getQuote();
 function changeQuote() {
     quoteBtn.addEventListener('click', () => {
         getQuote();
     })
 }
changeQuote();

// WEATHER

const temperature = document.querySelector('.temperature');
const weatherDiscription = document.querySelector('.weather-discription');
const weatherIcon = document.querySelector('.weather-icon');
const inputCity = document.querySelector('.city');
const weatherError = document.querySelector('.weather-error');

async function getWeather(city) {
const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&lang=ru&appid=481675063c4d401c0d9fb14af851f41e&units=metric`;
    const res = await fetch(url);
    const data = await res.json();
try{
  weatherError.textContent = ''
  temperature.textContent = `${data.main.temp}°C`;
  weatherDiscription.textContent = data.weather[0].description;
  weatherIcon.classList.add('weather-icon');
  weatherIcon.classList.add('owf');
  weatherIcon.classList.add(`owf-${data.weather[0].id}`);
}catch{
  temperature.textContent = ' ';
  weatherDiscription.textContent = ' ';
  weatherError.textContent = 'There is no such city. Try another one.';
  weatherIcon.removeAttribute('class');
}
}

function showWeather(defaultCity) {
  inputCity.addEventListener('change', () => {
      if (inputCity.value) {
          localStorage.setItem('city', inputCity.value)
          getWeather(inputCity.value)
      }
  })
  if (localStorage.getItem('city')) {
      inputCity.value = localStorage.getItem('city')
      getWeather(inputCity.value)
  } else {
      inputCity.value = defaultCity
      getWeather(defaultCity)
  }

}
showWeather('Tula');

// PLAYER

const play = document.querySelector('.play');
const pause = document.querySelector('.pause');
const audio = document.querySelector('audio')
const playPrevBtn = document.querySelector('.prev-play');
const playNextBtn = document.querySelector('.next-play');
const list = document.querySelector('.music-list')

const playList = [
  {
      title: 'Aqua Caelestis',
      src: '/src/sounds/AquaCaelestis.mp3',
      duration: '00:58'
  },
  {
      title: 'River Flows In You',
      src: '/src/sounds/RiverFlowsInYou.mp3',
      duration: '03:50'
  },
  {
      title: 'Ennio Morricone',
      src: '/src/sounds/EnnioMorricone.mp3',
      duration: '01:37'
  },
  {
    title: 'Summer Wind',
      src: '/src/sounds/SummerWind.mp3',
      duration: '01:50'
  }
]

  let isPlay = false;
  let playNum = 0;

function createPlayList() {
  for (let i = 0; i < playList.length; i++) {
      let li = document.createElement('ul');
      li.textContent = playList[i].title
      li.classList.add('play-item') 
      list.appendChild(li);
  }
}

createPlayList();

function selectActiveElement(number) {
  for (let element of list.children) {
      element.classList.remove('item-active');
  }
  list.children[number].classList.add('item-active');
}

function playAudio() {
  play.classList.add('hide-btn');
  pause.classList.remove('hide-btn');
  isPlay = true;
  audio.currentTime = 0;
  audio.src = playList[playNum].src;
  audio.play();
  selectActiveElement(playNum + 1);
}

function pauseAudio() {
  audio.pause();
  isPlay = false;
  play.classList.remove('hide-btn');
  pause.classList.add('hide-btn');
}

function renderAudio() {
  if (!isPlay) {
      playAudio()
  } else {
      pauseAudio()
  }
}

function playPrev() {
  if(playNum >= 1){
  playNum -= 1;
  playAudio();
  }
}

function playNext() {
  if(playNum <= 2){
  playNum += 1;
  playAudio();
  }
}

play.addEventListener('click', renderAudio);
pause.addEventListener('click', pauseAudio);
playPrevBtn.addEventListener('click', playPrev);
playNextBtn.addEventListener('click', playNext);

console.log(playList[playNum].src)