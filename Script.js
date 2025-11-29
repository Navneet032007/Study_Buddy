const statusText = document.getElementById("statusText");
const trailButton = document.getElementById("trailButton");
const trailLog = document.getElementById("trailLog");

const messages = [
  "Trail ping acknowledged.",
  "Mock API returned study tips.",
  "Local cache warmed.",
  "UI hydration confirmed.",
];

function appendLog(message) {
  const entry = document.createElement("li");
  entry.textContent = `${new Date().toLocaleTimeString()} — ${message}`;
  trailLog.prepend(entry);
}

function runTrail() {
  statusText.textContent = "Trail in progress...";
  trailButton.disabled = true;

  let step = 0;
  const intervalId = setInterval(() => {
    appendLog(messages[step]);
    step += 1;

    if (step === messages.length) {
      clearInterval(intervalId);
      statusText.textContent = "Trail completed. All systems look good!";
      trailButton.disabled = false;
    }
  }, 700);
}

trailButton.addEventListener("click", runTrail);

