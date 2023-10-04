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