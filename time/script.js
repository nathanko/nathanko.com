/**********************
 * NAVIGATION
 **********************/

let currTab; // "clock" or "pomo"

const pomoLink = document.getElementById("pomo-link");
const pomoTab = document.getElementById("pomo-tab");
const clockLink = document.getElementById("clock-link");
const clockTab = document.getElementById("clock-tab");

pomoLink.addEventListener("click", () => {
  currTab = "pomo";
  clockTab.style.display = "none";
  pomoTab.style.display = "initial";
  displayPomoTime(pomoSecsLeft);
});

clockLink.addEventListener("click", () => {
  currTab = "clock";
  pomoTab.style.display = "none";
  clockTab.style.display = "initial";
  document.title = "Time";
});

/**********************
 * CLOCK TAB
 **********************/

const displayDatetime = (timeEl, dateEl, timeFormatIdx, dateFormatIdx) => {
  const parseDate = (datetime) => {
    const months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    const days = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];
    const day = days[datetime.getDay()];
    const hours = datetime.getHours() % 12;
    const hr = hours === 0 ? 12 : hours;
    const min = datetime.getMinutes().toString().padStart(2, "0");
    const sec = datetime.getSeconds().toString().padStart(2, "0");
    const amPm = datetime.getHours() < 12 ? "am" : "pm";
    const date = datetime.getDate();
    const month = months[datetime.getMonth()];
    const year = datetime.getFullYear();
    return { year, month, date, day, hr, min, sec, amPm };
  };

  const now = new Date();
  const { year, month, date, day, hr, min, sec, amPm } = parseDate(now);

  // format
  const thinsp = String.fromCharCode(8239);
  switch (timeFormatIdx) {
    case 1:
      timeEl.innerText = hr + ":" + min + thinsp + amPm;
      break;
    default:
      timeEl.innerText = hr + ":" + min + ":" + sec + thinsp + amPm;
      break;
  }
  switch (dateFormatIdx) {
    case 1:
      dateEl.innerText = month + " " + date + ", " + year;
      break;
    default:
      dateEl.innerText = day + ", " + date + " " + month + " " + year;
      break;
  }
};

const timeEl = document.getElementById("time");
const dateEl = document.getElementById("date");

// listeners for toggling time/date formats

let timeFormatIdx =
  localStorage.getItem("timeFormat") !== null
    ? parseInt(localStorage.getItem("timeFormat"))
    : 0;
let dateFormatIdx =
  localStorage.getItem("dateFormat") !== null
    ? parseInt(localStorage.getItem("dateFormat"))
    : 0;
const numTimeFormats = 2;
const numDateFormats = 2;

timeEl.addEventListener("click", () => {
  timeFormatIdx = (timeFormatIdx + 1) % numTimeFormats;
  localStorage.setItem("timeFormat", timeFormatIdx);
});

dateEl.addEventListener("click", () => {
  dateFormatIdx = (dateFormatIdx + 1) % numDateFormats;
  localStorage.setItem("dateFormat", dateFormatIdx);
});

// update time/date every 100ms

setInterval(
  () => displayDatetime(timeEl, dateEl, timeFormatIdx, dateFormatIdx),
  100
);

// listener for changing the writable text

const writableEl = document.getElementById("writable");
const savedWritableContent = localStorage.getItem("writableContent");
if (savedWritableContent !== null) {
  writableEl.innerHTML = savedWritableContent;
}
writableEl.addEventListener("input", () => {
  localStorage.setItem("writableContent", writableEl.innerText);
});

/**********************
 * POMODORO TAB
 **********************/

const pomoWorkLength = 25 * 60;
let pomoSecsLeft = pomoWorkLength;
let pomoIsPlaying = false;
const resetBtn = document.getElementById("reset-btn");
const pausePlayBtn = document.getElementById("pause-play-btn");
const pomoCountdownDiv = document.getElementById("pomo-countdown");
const pauseIcon = document.querySelector("#pause-play-btn #pause");
const playIcon = document.querySelector("#pause-play-btn #play");

const updatePlayPauseIcons = () => {
  pauseIcon.style.display = pomoIsPlaying ? "initial" : "none";
  playIcon.style.display = pomoIsPlaying ? "none" : "initial";
};

let playInterval;
const playPomo = () => {
  if (pomoSecsLeft <= 0) {
    return;
  }

  pomoIsPlaying = true;
  updatePlayPauseIcons();

  displayPomoTime(pomoSecsLeft--);
  playInterval = setInterval(() => {
    displayPomoTime(pomoSecsLeft--);
    if (pomoSecsLeft < 0) {
      pausePomo();
    }
  }, 1000);
};

const pausePomo = () => {
  pomoIsPlaying = false;
  updatePlayPauseIcons();
  clearInterval(playInterval);
};

const displayPomoTime = (pomoSecsLeft) => {
  if (pomoSecsLeft > 60) {
    const min = Math.floor(pomoSecsLeft / 60);
    const sec = pomoSecsLeft % 60;
    const displayStr = min + ":" + String(sec).padStart(2, "0");
    pomoCountdownDiv.innerText = displayStr;
    if (currTab === "pomo") {
      document.title = displayStr + " - Time";
    }
  } else {
    pomoCountdownDiv.innerHTML = pomoSecsLeft + "<small>s</small>";
    if (currTab === "pomo") {
      document.title = pomoSecsLeft + "s" + " - Time";
    }
  }
};

resetBtn.addEventListener("click", () => {
  pausePomo();
  pomoSecsLeft = pomoWorkLength;
  displayPomoTime(pomoSecsLeft);
});

pausePlayBtn.addEventListener("click", () => {
  if (!pomoIsPlaying) {
    playPomo();
  } else {
    pausePomo();
  }
});
displayPomoTime(pomoSecsLeft);
