
console.log("JS LOADED");

// ======================
// 🔍 SCAN
// ======================
document.getElementById("scanBtn").addEventListener("click", async () => {

try{

let name = document.getElementById("scanName").value;
if(!name) return alert("name yaz");

let res = await fetch(`/api/scan?name=${name}`);
let data = await res.json();

let s = data.stats || {};

document.getElementById("out").innerHTML = `
<h3>🔍 SCAN RESULT</h3>
<p>Name: ${data.name}</p>
<p>Class: ${data.class}</p>
<p>HP: ${s.hp}</p>
<p>Crit: ${s.crit}</p>
<p>Dodge: ${s.dodge}</p>
`;

}catch(e){
console.error(e);
alert("scan error");
}

});

// ======================
// ⚔️ COMPARE
// ======================
document.getElementById("compareBtn").addEventListener("click", async () => {

try{

let a = document.getElementById("aName").value;
let b = document.getElementById("bName").value;

if(!a || !b) return alert("2 name yaz");

let res = await fetch(`/api/compare?a=${a}&b=${b}`);
let data = await res.json();

document.getElementById("out").innerHTML = `
<h3>⚔️ RESULT</h3>
<p>${data.playerA} vs ${data.playerB}</p>
<p>Score: ${data.scoreA} - ${data.scoreB}</p>
<h2>🏆 Winner: ${data.winner}</h2>
`;

}catch(e){
console.error(e);
alert("compare error");
}

});