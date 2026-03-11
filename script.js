let files = {};
let lines = [];

async function loadFiles(){

const response = await fetch("files.json");
files = await response.json();

for(let category in files){

for(let file of files[category]){

const r = await fetch(file);
const text = await r.text();

const splitLines = text.split("\n");

for(let line of splitLines){

lines.push({
category:category,
file:file,
text:line
});

}

}

}

}

function getSelectedCategories(){

let checkboxes = document.querySelectorAll(".filters input:checked");

let selected=[];

checkboxes.forEach(cb=>{
selected.push(cb.value);
});

return selected;

}

function searchText(){

let query = document.getElementById("searchBox").value.toLowerCase();

let results = document.getElementById("results");

results.innerHTML="";

if(query.length===0){
return;
}

let selected = getSelectedCategories();

for(let item of lines){

if(!selected.includes(item.category)){
continue;
}

if(item.text.toLowerCase().includes(query)){

let div=document.createElement("div");

div.className="result";

div.innerHTML=
'<div class="filename">'+item.file+'</div>'+
'<div class="line">'+item.text+'</div>';

results.appendChild(div);

}

}

}

loadFiles();