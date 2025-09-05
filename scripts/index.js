const loadLessons = () => {
  fetch("https://openapi.programming-hero.com/api/levels/all")
    .then((res) => res.json())
    .then((json) => displayLessons(json.data));
};
const loadLevelWord = (id) => {
  const url = `https://openapi.programming-hero.com/api/level/${id}`;
  fetch(url)
    .then((res) => res.json())
    .then((data) => {
      document.querySelectorAll(".lesson-btn").forEach((btn) => {
        btn.classList.remove("active");
      });
      const clickBtn = document.getElementById(`lesson-btn-${id}`);
      clickBtn.classList.add("active");
      displayLevelWord(data.data);
    });
};
const loadWordDetail = async (id) => {
  const url = `https://openapi.programming-hero.com/api/word/${id}`;
  const res = await fetch(url);
  const details = await res.json();
  displayWordDetails(details.data);
};
const displayWordDetails = (word) => {
  console.log(word);
  const detailBox = document.getElementById("details-container");
  detailBox.innerHTML = `
  <div>
      <h2 class="text-2xl font-bold">
          ${word.word} (<i class="fa-solid fa-microphone-lines"></i> :${word.pronunciation})
      </h2>
  </div>
  <div>
      <h2 class="font-bold">Meaning</h2>
      <p>${word.meaning}</p>
  </div>
  <div>
      <h2 class="font-bold">Example</h2>
      <p>${word.sentence}</p>
  </div>
  <div>
    <h2 class="font-bold">Synonyms</h2>
    <span class="btn">Syn1</span>
    <span class="btn">Syn2</span>
    <span class="btn">Syn3</span>
  </div>
  `;
  document.getElementById("word_modal").showModal();
};
const displayLevelWord = (words) => {
  const wordContainer = document.getElementById("word-container");
  wordContainer.innerHTML = "";
  if (words.length == 0) {
    wordContainer.innerHTML = `
    <div class="col-span-full text-center">
        <img src="./assets/alert-error.png" alt="" class="mx-auto"/>
        <p
          class="text-xl font-medium text-gray-400 rounded-xl py-10 space-y-6 hind-siliguri"
        >
          এই Lesson এ এখনো কোন Vocabulary যুক্ত করা হয়নি।
        </p>
        <h2 class="font-bold text-4xl hind-siliguri">
          নেক্সট Lesson এ যান
        </h2>
      </div>
      `;
    return;
  }
  words.forEach((word) => {
    const card = document.createElement("div");
    card.innerHTML = `
    <div
        class="bg-white rounded-xl shadow-sm text-center py-10 px-5 space-y-4"
      >
        <h2 class="font-bold">${
          word.word ? word.word : "meaning not found"
        }</h2>
        <p class="font-semibold">Meaning/Pronunciaton</p>
        <div class="font-medium text-2xl hind-siliguri pb-4">"${
          word.meaning ? word.meaning : "meaning not found"
        } / ${
      word.pronunciation ? word.pronunciation : "pronunciation not found"
    }"</div>
        <div class="flex justify-between items-center">
          <button onclick="loadWordDetail(${
            word.id
          })" class="btn bg-[#1A91FF10] hover:bg-[#1A91FF70]"> 
            <i class="fa-solid fa-circle-info"></i>
          </button>
          <button class="btn bg-[#1A91FF10] hover:bg-[#1A91FF70]">
            <i class="fa-solid fa-volume-high"></i>
          </button>
        </div>
      </div>
    `;
    wordContainer.append(card);
  });
};
const displayLessons = (lessons) => {
  const levelContainer = document.getElementById("level-container");
  levelContainer.innerHTML = "";
  for (let lesson of lessons) {
    const btnDiv = document.createElement("div");
    btnDiv.innerHTML = `
    <button id="lesson-btn-${lesson["level_no"]}" onclick="loadLevelWord(${lesson["level_no"]})" class="btn btn-outline btn-primary lesson-btn">
    <i class="fa-solid fa-book-open"></i>Lesson -${lesson["level_no"]}
    </button>
    `;
    levelContainer.append(btnDiv);
  }
};

loadLessons();
