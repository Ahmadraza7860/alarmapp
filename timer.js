
let timers = [];

// Function to create a new timer
function createTimer(hours, minutes, seconds) {
  const totalSeconds = hours * 3600 + minutes * 60 + seconds;

  if (totalSeconds <= 0) {
    alert('Please enter a valid time.');
    return;
  }

  const timerObject = {
    totalSeconds,
    timeRemaining: totalSeconds,
    intervalId: null
  };

  timers.push(timerObject);
  displayActiveTimers();
}

// Function to start all timers and update the display
function startTimers() {
  timers.forEach((timer, index) => {
    if (!timer.intervalId) {
      timer.intervalId = setInterval(() => {
        timer.timeRemaining--;
        if (timer.timeRemaining <= 0) {
          clearInterval(timer.intervalId);
          timer.intervalId = null;
          handleTimerEnd(index);
        }
        displayActiveTimers();
      }, 1000);
    }
  });
}

// Function to handle timer end
function handleTimerEnd(index) {
  // Change the display of the timer that has ended
  const timerElement = document.getElementById(`timer-${index}`);
  timerElement.classList.add('timer-ended');

  // Play the audio alert
  playAudioAlert();
}

// Function to display active timers
function displayActiveTimers() {
  const activeTimersContainer = document.getElementById('active-timers');
  activeTimersContainer.innerHTML = '';

  timers.forEach((timer, index) => {
    const timerElement = document.createElement('div');
    timerElement.classList.add('timer');
    timerElement.id = `timer-${index}`;

    const hours = Math.floor(timer.timeRemaining / 3600);
    const minutes = Math.floor((timer.timeRemaining % 3600) / 60);
    const seconds = timer.timeRemaining % 60;

    const timerDisplay = document.createElement('span');
    timerDisplay.textContent = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;

    const stopButton = document.createElement('button');
    stopButton.textContent = 'Stop Timer';
    stopButton.addEventListener('click', () => {
      clearInterval(timer.intervalId);
      timer.intervalId = null;
      timers.splice(index, 1);
      displayActiveTimers();
    });

    timerElement.appendChild(timerDisplay);
    timerElement.appendChild(stopButton);
    activeTimersContainer.appendChild(timerElement);
  });
}

// Function to play audio alert
function playAudioAlert() {
  // Replace 'path/to/audio/file.mp3' with the path to your audio file
  const audio = new Audio('path/to/audio/file.mp3');
  audio.play();
}


// Event listener for the "Set" button
const startTimerButton = document.getElementById('start-timer');
startTimerButton.addEventListener('click', () => {
  const hoursInput = document.getElementById('hours').value;
  const minutesInput = document.getElementById('minutes').value;
  const secondsInput = document.getElementById('seconds').value;

  const hours = parseInt(hoursInput, 10) || 0;
  const minutes = parseInt(minutesInput, 10) || 0;
  const seconds = parseInt(secondsInput, 10) || 0;

  if (isNaN(hours) || isNaN(minutes) || isNaN(seconds)) {
    alert('Please enter valid numeric values for hours, minutes, and seconds.');
    return;
  }

  createTimer(hours, minutes, seconds);
  startTimers();
});