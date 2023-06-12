// categories is the main data structure for the app; it looks like this:

//  [
//    { title: "Math",
//      clues: [
//        {question: "2+2", answer: 4, showing: null},
//        {question: "1+1", answer: 2, showing: null}
//        ...
//      ],
//    },
//    { title: "Literature",
//      clues: [
//        {question: "Hamlet Author", answer: "Shakespeare", showing: null},
//        {question: "Bell Jar Author", answer: "Plath", showing: null},
//        ...
//      ],
//    },
//    ...
//  ]
const NUM_MAX_CATEGORIES = 100;
const NUM_CATEGORIES = 6;
let categoriesArr = [];
// let clues = {};
let currentClue = {};
let chosenIds = [];
let isDone = false;
const startBtn = document.getElementById("start");
const spinElement = document.querySelector("#spin-container");
const jeopardySec = document.getElementById("jeopardy");
const cardElement = document.querySelector(".question-card");
const innerCardElement = document.querySelector(".question-card-inner");
const categoryText = document.querySelector(".category-text");
const clueText = document.querySelector(".clue-text");
const ansText = document.querySelector(".answer-text");
// cardElement.addEventListener("click", (event) => {
//   handleClick(event);
// });
innerCardElement.addEventListener("click", (event) => {
  handleClick(event);
});

//Utils -----------------------------------
/**https://stackoverflow.com/questions/6274339/how-can-i-shuffle-an-array
 * Shuffles array in place.
 * @param {Array} a items An array containing the items.
 */
function shuffle(a) {
  var j, x, i;
  for (i = a.length - 1; i > 0; i--) {
    j = Math.floor(Math.random() * (i + 1));
    x = a[i];
    a[i] = a[j];
    a[j] = x;
  }
  return a;
} //https://stackoverflow.com/questions/6274339/how-can-i-shuffle-an-array

//-------------------------------------------

/** Get NUM_CATEGORIES random category from API.
 *
 * Returns array of category ids
 */

async function getCategoryIds() {
  let categoryIds = [];
  await axios
    .get(`https://jservice.io/api/categories?count=${NUM_MAX_CATEGORIES}`)
    .then((response) => {
      const categories = response.data;
      categories.forEach((eCat) => categoryIds.push(eCat.id));
      shuffle(categoryIds);
      chosenIds = categoryIds.slice(0, 6);
      // console.log(chosenIds);
      // return categories;
    });
  // console.log(chosenIds);
  // console.log("I am done!");
}

async function fetchDataCategories(arrId) {
    // const categories = arrId.map(category_id =>{
  //         return new Promise((resolve, reject) => {
  //            fetch(`https://jservice.io/api/category?id=${category_id}`)
  //               .then(response => response.json()).then(data => {
  //                  resolve(data);
  //                 });
  //               });

  // });
  const categories = await arrId.map((category_id) => {
    return axios
      .get(`https://jservice.io/api/category?id=${category_id}`)
      .then((response) => response.data);
  });
  await Promise.all(categories).then((results) => {
    results.forEach((result) => {
      let category = {
        title: result.title,
        clues: [],
      };
      shuffle(result.clues)
        .slice(0, 2)
        .forEach((clue) => {
          // console.log('clue',clue);
          category.clues.push({
            question: clue.question,
            answer: clue.answer,
            shown: false,
          });
        });
      // console.log(clues);
      categoriesArr.push(category);
      // console.log(result);
      // console.log('catArr',categoriesArr);
    });
  });
  // console.log(categoriesArr);
  // console.log("I am done");
}

function renderClue() {
  cardElement.classList.remove("showing-answer");
  cardElement.classList.add("showing-question");
  // currentClue = {title:categoriesArr[0].title, clue:categoriesArr[0].clues[0]}
  // console.log("currentclue",currentClue);
  // currentClue.clue.showing = "question";
  categoryText.textContent = currentClue.title.toUpperCase();
  clueText.textContent = currentClue.clue.question.toUpperCase();
}
function revealAnswer() {
  ansText.textContent = currentClue.clue.answer.toUpperCase();
  cardElement.classList.add("showing-answer");
  cardElement.classList.remove("showing-question");
}
// function getFirstClue(){
//   console.log("catArr",categoriesArr);
//   categoriesArr.forEach(c => console.log(c));
//   console.log(categoriesArr[0]);
//   currentClue.title = categoriesArr[0].title;
//   currentClue.clue = categoriesArr[0].clues[0];
//   categoriesArr[0].clues[0].shown = true;
// }
function pullNextClue() {
  let returnedClue = {};
  // while( categoriesArr.find(c=>c.clues.forEach(clue=>clue.showing!=="shown")))
  let foundClue = categoriesArr.find((c) =>
    c.clues.find((clue) => {
      if (!clue.shown) {
        // console.log(clue.shown);
        // console.log(clue);
        clue.shown = true;
        returnedClue.clue = clue;
        return clue;
      }
    })
  );
  // let foundClue = categoriesArr.find((c) =>
  // c.clues.find((clue) => !clue.shown)
    
  // console.log("pull clue ran");
  // console.log("foundclue",foundClue);
  if (foundClue){
    returnedClue.title = foundClue.title;
  // console.log('foundclue',foundClue);
  // console.log('returnClue',returnedClue);
    return returnedClue;
  }
  else return null;  
}

/** Handle clicking on a clue: show the question or answer.
 *
 * Uses .showing property on clue to determine what to show:
 * - if currently null, show question & set .showing to "question"
 * - if currently "question", show answer & set .showing to "answer"
 * - if currently "answer", ignore click
 * */

function handleClick(evt) {
  if (evt.target.parentNode.classList.contains("showing-question")) 
  {
    console.log(evt.target);
    revealAnswer();
  } 
  else if (evt.target.parentNode.classList.contains("showing-answer")) 
  {
    let nextClue = pullNextClue();
    if (nextClue) {
      currentClue = nextClue;
      renderClue();
      ansText.textContent = "";
    } else {
      console.log("No More Question");
      alert("No More Question");
      isDone = true;
    }
  }
}

/** Wipe the current Jeopardy board, show the loading spinner,
 * and update the button used to fetch data.
 */

function showLoadingView() {
    // spinElement.classList.remnove("invisible");
    cardElement.classList.remove("visible");
}

/** Remove the loading spinner and update the button used to fetch data. */

function hideLoadingView() {
    // spinElement.classList.add("invisible");
    cardElement.classList.add("visible");
}

/** Start game:
 *
 * - get random category Ids
 * - get data for each category
 * - create HTML table
 * */

async function setupAndStart() {
  // console.log("I ran");
  await getCategoryIds();
  // console.log("step 1 done.");
  await fetchDataCategories(chosenIds);
  // console.log("step 2 done.");
  hideLoadingView();    
  // getFirstClue();
  currentClue = pullNextClue();
  // console.log("currentclue",currentClue);
  // console.log("foundCluerun");
  renderClue();

}
function restart(){
  categoriesArr = [];
  chosenIds = [];
  ansText.textContent = "";
}

/** On click of start / restart button, set up game. */
startBtn.addEventListener("click", async function(event) {
  restart();
  setupAndStart();
  // console.log(categoriesArr);
  // console.log("I was clicked");
  // console.log("currentclue",currentClue);
  startBtn.textContent ="Restart";
  hideLoadingView();
});
// TODO


//JUNK

function randomIdx() {
  let arrId = [];
  for (let i = 0; i < NUM_CATEGORIES; i++) {
    arrId.push([Math.floor(Math.random() * NUM_MAX_CATEGORIES)]);
  }
  return arrId;
}
function initGame() {
  let arrId = [];
  arrId = getCategoryIds();
  console.log(arrId);
  console.log(typeof arrId);
}
//Print all question
function renderQuestion(cat) {
  let questDiv = document.createElement("div");
  questDiv.classList.add("questBoard");
  let titleSec = document.createElement("div");
  console.log("cattitle", cat.title);
  titleSec.innerHTML = `<header>CATEGORY ${cat.title}</header>`;
  questDiv.appendChild(titleSec);
  let questSec = document.createElement("body");
  let ansSec = document.createElement("p");
  // questDiv.innerHTML = (`<header>${cat.title}</header>`);
  let count = 0;
  cat.clues.forEach((clue) => {
    if (clue.showing === null) {
      count++;
      let quest = document.createElement("p");
      console.log(count);
      clue.showing = "question";
      quest.classList.add("question");
      quest.innerHTML = `Question ${clue.question}`;
      console.log(quest);
      questSec.appendChild(quest);
      questDiv.appendChild(questSec);
    } else if (clue.showing === "question") {
      clue.showing = "answer";
      quest.classList.remove("question");
      ansSec.innerHTML = `${clue.answer}`;
      console.log(ansSec);
      questDiv.appendChild(ansSec);
    }
  });
  questDiv.addEventListener("click", (event) => {
    handleClick(event);
  });
  jeopardySec.appendChild(questDiv);
}
/** Fill the HTML table#jeopardy with the categories & cells for questions.
 *
 * - The <thead> should be filled w/a <tr>, and a <td> for each category
 * - The <tbody> should be filled w/NUM_QUESTIONS_PER_CAT <tr>s,
 *   each with a question for each category in a <td>
 *   (initally, just show a "?" where the question/answer would go.)
 */
function printAll() {
  fetchDataCategories(chosenIds);
  categoriesArr.forEach((c) => {
    console.log(c);
    console.log("ctitle", c.title);
    console.log("cclues", c.clues);
    renderQuestion(c);
  });
}

async function fillTable(arrId) {
  const NUM_QUESTIONS_PER_CAT = 6;
  const table = document.getElementById("jeopardy");
  const tblHead = document.createElement("thead");
  const tblBody = document.createElement("tbody");
  const tblHeadRow = document.createElement("tr");

  arrId.then((arr) => {
    arr.map((cat) => {
      console.log("çat", cat);
      const catTitle = getCategory(cat).title;
      console.log(catTitle);
      const catCell = document.createTextNode(catTitle);
      console.log(catCell);
      tblHeadRow.appendChild(catCell);
    });
    tblHead.appendChild(tblHeadRow);
    table.appendChild(tblHead);
  });
}

/** Return object with data about a category:
 *
 *  Returns { title: "Math", clues: clue-array }
 *
 * Where clue-array is:
 *   [
 *      {question: "Hamlet Author", answer: "Shakespeare", showing: null},
 *      {question: "Bell Jar Author", answer: "Plath", showing: null},
 *      ...
 *   ]
 */

async function getCategory(catId) {
  console.log("çatid", catId);
  const res = await axios.get(`http://jservice.io/api/category?id=${catId}`);
  console.log(res);
  const clueArray = res.data.clues.map((eachClue) => {
    return {
      question: eachClue.question,
      answer: eachClue.answer,
      showing: null,
      value: eachClue.value,
    };
  });
  return { title: res.data.title, clues: clueArray };
}
// const catObj = getCategory(150);
// console.log(catObj);
// const res = new Promise((resolve, reject)=>{fetch(`https://jservice.io/api/categories?count=${NUM_MAX_CATEGORIES}`).then(response => response.json()).then(data=>{resolve(data);});});
// const res = new Promise((resolve, reject)=>{fetch(`https://jservice.io/api/categories?count=${NUM_MAX_CATEGORIES}`).then(response => response.json())});
// console.log(res);
// Promise.all(res).then(results => {results.forEach(result=>{ let id = result.id; categoryIds.push(id)})});
// console.log("I was printed after the fetch");
// console.log(res[0]);
// for (let i=0; i<NUM_CATEGORIES;i++){
//     console.log(categoryIds[i]);
//     chosenIds[i]=categoryIds[categoryIdx[i]];
// }

// return chosenIds;
