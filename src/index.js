// <1> DONE on page load fetch ducks and display in #duck-nav
const ducksUrl = "http://localhost:3000/ducks"
let globalDucksArray = []
let selectedDuck
document.getElementById("duck-nav").addEventListener("click", (e) => showDetail(e))
document.getElementById("duck-display-likes").addEventListener("click", (e) => likeDuck(e))
document.getElementById("new-duck-form").addEventListener("submit", (e) => addDuck(e))

function getDucks() {
    fetch(ducksUrl)
    .then(resp => resp.json())
    .then(resp => initializeMenu(resp))
    .catch(err => alert(err))
}

function initializeMenu(ducks) {
    ducks.forEach((duck) => showDuckInNav(duck))
    globalDucksArray = ducks
}

function showDuckInNav(duck) {
    const duckNavImg = document.createElement("img")
    duckNavImg.src = duck.img_url
    duckNavImg.id = duck.id
    document.getElementById("duck-nav").appendChild(duckNavImg)
}

// <2> on duck click show name imag and likes button
// with number of likes in the #duck-display
// [see Readme for HTML organization of this data], 
// and if another duck is clicked it replaces the 
// info in the detail
function showDetail(e) {
    if (e.target.localName = "img") {
    selectedDuck = e.target.id
    const duck = globalDucksArray[e.target.id-1]
    document.getElementById("duck-display-name").textContent = duck.name
    document.getElementById("duck-display-image").src = duck.img_url
    document.getElementById("duck-display-likes").textContent = `${duck.likes} likes`
    }
}

// <3> DONE when likes button is clicked, it increments
// the number of likes and updates button text
// HOPE ITS OK THAT I MADE IT PERSISTENT BETWEEN
// DUCK NAV CLICKS
function likeDuck(e) {
    let duckLikes = ++globalDucksArray[selectedDuck-1].likes
    document.getElementById("duck-display-likes").textContent = `${duckLikes} likes`
}

// <4> DONE when new-duck-form is sumbit, generate a new
// duck image in the #duck-nav. When clicked, it
// displays in the #duck-display (starts with 0 likes)
// NO PERSISTENCE IS NEEDED
function addDuck(e) {
    e.preventDefault()
    const newDuckName = document.getElementsByTagName("input")[0].value
    const newDuckImg = document.getElementsByTagName("input")[1].value
    const newDuckId = globalDucksArray.length+1
    globalDucksArray.push({
        id: newDuckId,
        name: newDuckName,
        img_url: newDuckImg,
        likes: 0
    })
    console.log(globalDucksArray)
    e.target.reset()
    showDuckInNav(globalDucksArray[newDuckId-1])
}

getDucks()


// CHALLENGE COMPLETED IN EXACTLY ONE HOUR