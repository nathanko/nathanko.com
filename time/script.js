/**********************
 * NAVIGATION
 **********************/

let currTab; // "clock" or "pomo"

const pomoLink = document.getElementById("pomo-link");
const pomoTab = document.getElementById("pomo-tab");
const clockLink = document.getElementById("clock-link");
const clockTab = document.getElementById("clock-tab");

switchTabToPomodoro = () => {
  currTab = "pomo";
  clockTab.style.display = "none";
  pomoTab.style.display = "initial";
};

switchTabToClock = () => {
  currTab = "clock";
  pomoTab.style.display = "none";
  clockTab.style.display = "initial";
  document.title = "Time";
  // document.body.style.backgroundColor = "#fafafa";
};

pomoLink.addEventListener("click", () => {
  switchTabToPomodoro();
});
clockLink.addEventListener("click", () => {
  switchTabToClock();
});

if (window.location.hash === "#pomodoro") {
  switchTabToPomodoro();
} else {
  switchTabToClock();
}

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
      timeEl.innerHTML =
        hr + ":" + min + thinsp + "<small>" + amPm + "</small>";
      break;
    default:
      timeEl.innerHTML =
        hr + ":" + min + ":" + sec + thinsp + "<small>" + amPm + "</small>";
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

const pomoSettings = {
  steps: [
    {
      name: "focus",
      length: 25 * 60,
      color: "#cc6666",
    },
    {
      name: "short break",
      length: 5 * 60,
      color: "#66cccc",
    },
    {
      name: "long break",
      length: 15 * 60,
      color: "#66cc99",
    },
  ],
};
let currStep = 0;
let pomoSecsLeft = pomoSettings.steps[currStep].length;
let pomoStartPlayTime;
let pomoIsPlaying = false;
const resetBtn = document.getElementById("reset-btn");
const pausePlayBtn = document.getElementById("pause-play-btn");
const finishBtn = document.getElementById("finish-btn");
const pomoCountdownDiv = document.getElementById("pomo-countdown");
const pomoDescDiv = document.getElementById("pomo-desc");
const pomoProgressDiv = document.getElementById("pomo-progress");
const pauseIcon = document.querySelector("#pause-play-btn #pause");
const playIcon = document.querySelector("#pause-play-btn #play");

const updatePlayPauseIcons = () => {
  pauseIcon.style.display = pomoIsPlaying ? "initial" : "none";
  playIcon.style.display = pomoIsPlaying ? "none" : "initial";
};

const pomoSwitchToStep = (step) => {
  currStep = step;
  const { name, length, color } = pomoSettings.steps[step];
  console.log("Start step ", name, length, color);
  // document.body.style.backgroundColor = color;
  pomoDescDiv.innerHTML = "<b>" + name + "</b>";
  pomoSecsLeft = length;
};

const pomoPlayStep = () => {
  if (pomoSecsLeft <= 0) {
    return;
  }
  pomoIsPlaying = true;
  updatePlayPauseIcons();
  pomoStartPlayTime = Date.now() / 1000;
};

const pomoPauseStep = () => {
  pomoIsPlaying = false;
  pomoSecsLeft -= Date.now() / 1000 - pomoStartPlayTime;
  updatePlayPauseIcons();
};

const pomoFinishStep = () => {
  pomoStartPlayTime = Date.now() / 1000;
  displayPomoTime(pomoSecsLeft);
  pomoSwitchToStep((currStep + 1) % pomoSettings.steps.length);
  console.log(
    currStep,
    pomoSettings.steps.length,
    (currStep + 1) % pomoSettings.steps.length
  );
};

const displayPomoTime = (pomoSecsLeft) => {
  pomoSecsLeft = Math.ceil(pomoSecsLeft);
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
  const progressPercent =
    1 - pomoSecsLeft / pomoSettings.steps[currStep].length;
  pomoProgressDiv.style.width = progressPercent * 100 + "%";
};

// update time
pomoSwitchToStep(currStep);
displayPomoTime(pomoSecsLeft);
setInterval(() => {
  if (pomoIsPlaying) {
    const count = pomoSecsLeft + pomoStartPlayTime - Date.now() / 1000;
    displayPomoTime(count);
    if (count < 0) {
      pomoFinishStep();
    }
  }
}, 100);

// button listeners

resetBtn.addEventListener("click", () => {
  pomoStartPlayTime = Date.now() / 1000;
  pomoSecsLeft = pomoWorkLength;
  displayPomoTime(pomoSecsLeft);
});

pausePlayBtn.addEventListener("click", () => {
  pomoIsPlaying ? pomoPauseStep() : pomoPlayStep();
});

finishBtn.addEventListener("click", () => {
  pomoFinishStep();
});
