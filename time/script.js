const displayDatetime = (timeEl, dateEl, timeFormatIdx, dateFormatIdx) => {

    const now = new Date();
    const parseTime =  (time) => {
        const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
        const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
        const day = days[time.getDay()];
        const hr = time.getHours() % 12;
        const min = time.getMinutes().toString().padStart(2, "0");
        const sec = time.getSeconds().toString().padStart(2, "0");
        const amPm = time.getHours() < 12 ? "am" : "pm";
        const date = time.getDate();
        const month = months[time.getMonth()];
        const year = time.getFullYear();

        return {year, month, date, day, hr, min, sec, amPm}

    }
    const  {year, month, date, day, hr, min, sec, amPm} = parseTime(now);

    // format
    const thinsp = String.fromCharCode(8239);    
    switch(timeFormatIdx) {
        case 1:
            timeEl.innerText = hr + ":" + min + thinsp + amPm;
            break;
        default:
            timeEl.innerText = hr + ":" + min + ":" + sec + thinsp + amPm;
            break;
    }
    switch(dateFormatIdx) {
        case 1:
            dateEl.innerText = month + " " + date + ", " + year;
            break;
        default:
            dateEl.innerText = day + ", " + date + " " + month + " " + year;
            break;
    }
}


const timeEl = document.getElementById("time");
const dateEl = document.getElementById("date");

// listeners for toggling time/date formats

let timeFormatIdx = localStorage.getItem('timeFormat') !== null ? parseInt(localStorage.getItem('timeFormat')) : 0;
let dateFormatIdx = localStorage.getItem('dateFormat') !== null ? parseInt(localStorage.getItem('dateFormat')) : 0;
const numTimeFormats = 2;
const numDateFormats = 2;

timeEl.addEventListener("click", () => {
    timeFormatIdx = (timeFormatIdx + 1) % numTimeFormats;
    localStorage.setItem('timeFormat', timeFormatIdx);
});

dateEl.addEventListener("click", () => {
    dateFormatIdx = (dateFormatIdx + 1) % numDateFormats;
    localStorage.setItem('dateFormat', dateFormatIdx);
});

// update time/date every 100ms

setInterval(() => displayDatetime(timeEl, dateEl, timeFormatIdx, dateFormatIdx), 100);


// listener for changing the writable text

const writableEl = document.getElementById("writable");
writableEl.innerHTML = localStorage.getItem('writableContent') || null;
writableEl.addEventListener("input", () => {
    localStorage.setItem('writableContent', writableEl.innerText);
});