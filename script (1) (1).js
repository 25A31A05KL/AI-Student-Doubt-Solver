const doubt = document.getElementById("doubt");
const counter = document.getElementById("counter");
const solveBtn = document.getElementById("solveBtn");
const btnText = document.getElementById("btnText");
const spinner = document.getElementById("spinner");
const resultSection = document.getElementById("resultSection");
const answer = document.getElementById("answer");
const copyBtn = document.getElementById("copyBtn");
const themeBtn = document.getElementById("themeBtn");

doubt.addEventListener("input", () => {
  counter.textContent = `${doubt.value.length} / 4000`;
});

document.querySelectorAll(".chip").forEach(chip => {
  chip.addEventListener("click", () => {
    doubt.value = chip.textContent;
    doubt.dispatchEvent(new Event("input"));
    doubt.focus();
  });
});

solveBtn.addEventListener("click", solveDoubt);

doubt.addEventListener("keydown", event => {
  if ((event.ctrlKey || event.metaKey) && event.key === "Enter") {
    solveDoubt();
  }
});

async function solveDoubt() {
  const text = doubt.value.trim();

  if (!text) {
    alert("Please enter your doubt first.");
    doubt.focus();
    return;
  }

  setLoading(true);
  resultSection.classList.remove("hidden");
  answer.textContent = "Thinking...";

  try {
    const response = await fetch("/api/solve", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        doubt: text,
        subject: document.getElementById("subject").value,
        language: document.getElementById("language").value
      })
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error || "Unable to solve the doubt.");
    }

    answer.textContent = data.answer;
    resultSection.scrollIntoView({ behavior: "smooth", block: "start" });
  } catch (error) {
    answer.textContent = `Error: ${error.message}`;
  } finally {
    setLoading(false);
  }
}

function setLoading(loading) {
  solveBtn.disabled = loading;
  btnText.textContent = loading ? "Solving..." : "Solve Doubt";
  spinner.classList.toggle("hidden", !loading);
}

copyBtn.addEventListener("click", async () => {
  if (!answer.textContent.trim()) return;
  await navigator.clipboard.writeText(answer.textContent);
  const old = copyBtn.textContent;
  copyBtn.textContent = "Copied!";
  setTimeout(() => copyBtn.textContent = old, 1200);
});

themeBtn.addEventListener("click", () => {
  document.body.classList.toggle("dark");
  const dark = document.body.classList.contains("dark");
  themeBtn.textContent = dark ? "☀️" : "🌙";
  localStorage.setItem("theme", dark ? "dark" : "light");
});

if (localStorage.getItem("theme") === "dark") {
  document.body.classList.add("dark");
  themeBtn.textContent = "☀️";
}