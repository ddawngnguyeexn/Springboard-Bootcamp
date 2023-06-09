"use strict";

/******************************************************************************
 * Handling navbar clicks and updating navbar
 */

/** Show main list of all stories when click site name */

function navAllStories(evt) {
  console.debug("navAllStories", evt);
  hidePageComponents();
  putStoriesOnPage();
}

$body.on("click", "#nav-all", navAllStories);

/** Show login/signup on click on "login" */

function navLoginClick(evt) {
  console.debug("navLoginClick", evt);
  hidePageComponents();
  $loginForm.show();
  $signupForm.show();
}

$navLogin.on("click", navLoginClick);

/** When a user first logins in, update the navbar to reflect that. */

function updateNavOnLogin() {
  console.debug("updateNavOnLogin");
  $(".main-nav-links").css('display','flex');
  $navLogin.hide();
  $navLogOut.show();
  $navUserProfile.text(`${currentUser.username}`).show();
}
// Story Submit CLick 
function navSubmitClick(evt){
  console.debug("navSubmitClick", evt);
  hidePageComponents();
  $storyForm.show();
  $allStoriesList.show();
  
}
$navSubmit.on("click",navSubmitClick);

//Favorite Nav Click
function navFavoriteClick(evt){
  
  console.debug("navFavoriteClick", evt);
  hidePageComponents();
  populateFavoriteList();
}

$body.on("click","#nav-favorite-story",navFavoriteClick);

//My Story Nav Click 
function navMyStoryClick(evt){
  console.debug("navMyStoryClick",evt);
  hidePageComponents();
  putUserStoriesOnPage();
}
$body.on("click","#nav-my-story",navMyStoryClick);

function navUserProfileClick(evt){
  console.debug("navUserProfile",evt);
  hidePageComponents();
  $userProfile.show();
}
$navUserProfile.on("click",navUserProfileClick);