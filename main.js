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

// Good 

function getName(){
   let currentTime = timeToday.getHours();
   if( currentTime >= 6 && currentTime < 12) return 'Good morning';
   if( currentTime >= 12 && currentTime < 18) return 'Good afternoon';
   else {
    return 'Good night'
   }
  }

  function changeGood(){
    let currentTime = timeToday.getHours();
    const good = document.querySelector(".goods")
    let pool;
   if( currentTime >= 6 && currentTime < 12) {
     pool ='Good morning';
     good.textContent = pool;
     return
   }
   if( currentTime >= 12 && currentTime < 18) {
    pool = 'Good afternoon';
    good.textContent = pool;
    return
  } 
   else {
    pool ='Good night'
    good.textContent = pool;
    return
  }
}
changeGood();