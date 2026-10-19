class data_model {
  constructor(excercise, weight, reps, date, isPinned = false, id = null) {
    this.id = id || Date.now();
    this.excercise = excercise;
    this.weight = weight;
    this.reps = reps;
    this.date = date || new Date().toLocaleDateString();
    this.isPinned = isPinned;
    this.estimated1RM = this.calculate1RM(weight, reps);
  }
  calculate1RM(w, r) {
    if (r === 1) return w;
    return Math.round(w * (1 + r / 30));
  }
}
const modalOverlay = document.querySelector("#modal-overlay");
const modalTitle = document.querySelector("#modal-title");
const modalDate = document.querySelector("#modal-date");
const modalStats = document.querySelector("#modal-stats");
const modal1RM = document.querySelector("#modal-1rm");
const modalCloseBtn = document.querySelector("#modal-close-btn");

const prListContainer = document.querySelector("#pr-list");

let prs = JSON.parse(localStorage.getItem("savedPRs")) || [];

prs = prs.map(
  (pr) =>
    new data_model(
      pr.excercise,
      pr.weight,
      pr.reps,
      pr.date,
      pr.isPinned,
      pr.id,
    ),
);
renderPRs(prs);

document.querySelector("#add-pr-btn").addEventListener("click", (e) => {
  const exercise_input = document.querySelector("#exercise-input");
  const weight_input = document.querySelector("#weight-input");
  const reps_input = document.querySelector("#reps-input");
  if (
    exercise_input.value.trim() === "" ||
    weight_input.value === "" ||
    reps_input.value === ""
  )
    return;
  const newEntry = new data_model(
    exercise_input.value,
    Number(weight_input.value),
    Number(reps_input.value),
  );
  prs.push(newEntry);
  exercise_input.value = "";
  weight_input.value = "";
  reps_input.value = "";
  renderPRs(prs);
  savePRs();
  //   console.log(prs);
});

function renderPRs(t) {
  prListContainer.innerHTML = "";
  //   prs = prs.sort((temp) => temp.isPinned === true);
  const sortedPRs = [...t].sort((a, b) => b.isPinned - a.isPinned);
  const searchInput = document.querySelector("#search-input");
  const isSearching = searchInput && searchInput.value.trim() !== "";
  sortedPRs.forEach((ee) => {
    let prItem = document.createElement("li");
    prItem.textContent = `${ee.excercise}: ${ee.weight} kg x ${ee.reps} reps (Estimated 1RM: ${ee.estimated1RM} Kg)`;
    prItem.addEventListener("click", (e) => {
      modalTitle.textContent = ee.excercise;
      modalDate.textContent = ee.date;
      modalStats.textContent = ee.reps;
      modal1RM.textContent = ee.estimated1RM;
      modalOverlay.classList.remove("modal-hidden");
    });
    if (!isSearching) {
      let prDelete = document.createElement("button");
      prDelete.textContent = "Delete";
      prDelete.classList.add("del-btn");

      let prPingBtn = document.createElement("button");
      prPingBtn.textContent = ee.isPinned ? "📌 Unpin" : "📍 Pin";
      prPingBtn.classList.add("pin");

      prPingBtn.addEventListener("click", (e) => {
        e.stopPropagation();
        togglePin(ee.id);
      });

      prDelete.addEventListener("click", (e) => {
        deletepr(ee.id);
        e.stopPropagation();
      });
      prItem.appendChild(prDelete);
      prItem.appendChild(prPingBtn);
    }
    prListContainer.appendChild(prItem);
  });
}
document.querySelector("#search-input").addEventListener("input", (e) => {
  const currentValue = e.target.value.toLowerCase().trim();

  console.log(currentValue);
  const filteredprs = prs.filter((pr) => {
    return pr.excercise.toLowerCase().includes(currentValue);
  });

  renderPRs(filteredprs);
});

function deletepr(tt) {
  prs = prs.filter((pr) => pr.id != tt);
  renderPRs(prs);
  savePRs();
}

function savePRs() {
  localStorage.setItem("savedPRs", JSON.stringify(prs));
}

function togglePin(id) {
  prs = prs.map((pr) =>
    pr.id === id ? { ...pr, isPinned: !pr.isPinned } : pr,
  );
  savePRs();
  renderPRs(prs);
}

modalCloseBtn.addEventListener("click", (e) => {
  modalOverlay.classList.add("modal-hidden");
});

modalOverlay.addEventListener("click", (e) => {
  if (e.target === modalOverlay) {
    modalOverlay.classList.add("modal-hidden");
  }
});
