"use strict";

// This is the global list of the stories, an instance of StoryList
let storyList;

/** Get and show stories when site first loads. */

async function getAndShowStoriesOnStart() {
  storyList = await StoryList.getStories();
  $storiesLoadingMsg.remove();

  putStoriesOnPage();
}

/**
 * A render method to render HTML for an individual Story instance
 * - story: an instance of Story
 *
 * Returns the markup for the story.
 */

function generateStoryMarkup(story, deleteBtn = false) {
  // console.debug("generateStoryMarkup", story);

  const hostName = story.getHostName();
  const showStar = Boolean(currentUser);
  return $(`
      <li id="${story.storyId}">
        <div>
        ${deleteBtn ? makeDeleteBtnHtml():""}
        ${showStar ? makeStarHtml(story,currentUser):""}
        <a href="${story.url}" target="a_blank" class="story-link">
          ${story.title}
        </a>
        <small class="story-hostname">(${hostName})</small>
        <small class="story-author">by ${story.author}</small>
        <small class="story-user">posted by ${story.username}</small>
        </div>
      </li>
    `);
}

function makeDeleteBtnHtml(){
  return `
    <span class="trash-can">
      <i class="fas fa-trash-alt"></i>
    </span>`;
}

async function deleteStory(evt){
  console.debug("deleteStory");
  const $closetLi = $(evt.target).closest("li");
  const storyId = $closetLi.attr("id");

  await storyList.removeStory(currentUser, storyId);

  await putUserStoriesOnPage();

}
$myStories.on("click",".trash-can",deleteStory);

function makeStarHtml(story, user){
  const isFavorite = user.isFavorite(story);
  const starBool = isFavorite ? "fas": "far";
  return ` 
  <span class="star">
  <i class ="${starBool} fa-star"></i>
  </span>`;
}

/** Gets list of stories from server, generates their HTML, and puts on page. */

function putStoriesOnPage() {
  console.debug("putStoriesOnPage");

  $allStoriesList.empty();

  // loop through all of our stories and generate HTML for them
  for (let story of storyList.stories) {
    const $story = generateStoryMarkup(story);
    $allStoriesList.append($story);
  }

  $allStoriesList.show();
}

async function putUserStoriesOnPage(){
  console.debug("putUserStoriesOnPage");

  $myStories.empty();

  // loop through all of our stories and generate HTML for them
  if (currentUser.ownStories.length === 0) {
    $myStories.append("<h5>No user story added!</h5>");
  } else {
    // loop through all of users favorites and generate HTML for them
    for (let story of currentUser.ownStories) {
      const $story = generateStoryMarkup(story,true);
      $myStories.append($story);
    }
  }

  $myStories.show();
}
/** Submit a new story */

async function newStorySubmit(evt){
  console.debug("newStorySubmit",evt);
  evt.preventDefault();
  const author = $("#create-author").val();
  const title = $("#create-title").val();
  const url = $("#create-url").val();

  const newStory = await storyList.addStory(currentUser, {title,author,url});

  const $story = generateStoryMarkup(newStory);
  $allStoriesList.prepend($story);

  $storyForm.slideUp("slow");
  $storyForm.trigger("reset");

  }
$storyForm.on("submit", newStorySubmit); 

async function toggleFavorite(evt){

  console.debug("toggleFavorite"); 
  const $target = $(evt.target);
  const $closetLi =  $target.closest("li");
  const storyId =$closetLi.attr("id");

  const story = storyList.stories.find(s=>s.storyId === storyId);

  if ($target.hasClass("fas")){
    await currentUser.removeFavorite(story);
    $target.closest("i").toggleClass("fas far");
  }
  else {
    await currentUser.addFavorite(story);
    $target.closest("i").toggleClass("fas far");
  }

}

$storiesLists.on("click",".star",toggleFavorite);
function populateFavoriteList(){
  console.debug("populateFavoriteList");
  $favoritedStories.empty();
  if (currentUser.favorites.length === 0) {
    $favoritedStories.append("<h5>No favorites added!</h5>");
  } else {
    // loop through all of users favorites and generate HTML for them
    console.log(currentUser.favorites);
    for (let story of currentUser.favorites) {
      const $story = generateStoryMarkup(story);
      $favoritedStories.append($story);
    }
  }

  $favoritedStories.show();
}