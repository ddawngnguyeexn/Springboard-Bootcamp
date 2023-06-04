async function getGif(searchTerm){
    try{
    const res = await axios.get('http://api.giphy.com/v1/gifs/search',{
    params :{
        q:searchTerm,
        api_key:"MhAodEJIJxQMxW9XqxKjyXfNYdLoOIym"
    }
    });
    let numResults = res.data.data.length;
    if(numResults){
        let randomIdx = Math.floor(Math.random()*numResults);
        addGif(res.data.data[randomIdx].images.original.url);
    }
    
}
    catch(e){
        alert("Gif Not Found!");
    }
}
function addGif(gifUrl){
    // let $newCol = $("<div>", { class: "col-md-4 col-12 mb-4" });
    let newCol = document.createElement("div");
    newCol.classList.add("col-md-4");
    newCol.classList.add("col-12");
    newCol.classList.add("mb-4");
    let img = document.createElement("img");
    img.src=gifUrl;
    img.classList.add("w-100");
    newCol.append(img);
    gifSpace.append(newCol);

}
const form = document.querySelector('#searchform');
const input = document.querySelector('#search');
const gifSpace = document.querySelector('#gif-space');
const button = document.querySelector('#remove');
form.addEventListener("submit",function(e)
{
 e.preventDefault();  
 getGif(input.value);
 input.value="";

})
button.addEventListener("click",function(){
    gifSpace.innerHTML='';
})
