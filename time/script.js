const displayDatetime = (timeEl, dateEl, timeFormatIdx, dateFormatIdx) => {
    const parseDate = (datetime) => {
        const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
        const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
        const day = days[datetime.getDay()];
        const hours = datetime.getHours() % 12;
        const hr = hours === 0 ? 12 : hours;
        const min = datetime.getMinutes().toString().padStart(2, "0");
        const sec = datetime.getSeconds().toString().padStart(2, "0");
        const amPm = datetime.getHours() < 12 ? "am" : "pm";
        const date = datetime.getDate();
        const month = months[datetime.getMonth()];
        const year = datetime.getFullYear();
        return {year, month, date, day, hr, min, sec, amPm}
    }

    const now = new Date();
    const {year, month, date, day, hr, min, sec, amPm} = parseDate(now);

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
const savedWritableContent = localStorage.getItem('writableContent');
if (savedWritableContent !== null) {
    writableEl.innerHTML = savedWritableContent;
}
writableEl.addEventListener("input", () => {
    localStorage.setItem('writableContent', writableEl.innerText);
});