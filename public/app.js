
console.log("APP LOADED");

// ======================
// 🔍 SCAN (ULTIMATE)
// ======================
document.getElementById("scanBtn").addEventListener("click", async () => {

let name = document.getElementById("scanName").value.trim();

if(!name){
alert("Enter name");
return;
}

// 1. open external profile (safe try)
let url = "https://combats.life/inf.php?" + encodeURIComponent(name);
window.open(url, "_blank");

// 2. internal scan (our system)
let res = await fetch("/api/scan?name=" + name);
let data = await res.json();

let out = document.getElementById("out");

if(data.type === "local"){
out.innerHTML = `
<h3>🔍 SCAN RESULT</h3>
<p>Name: ${data.name}</p>
<p>HP: ${data.stats.hp}</p>
<p>Crit: ${data.stats.crit}</p>
<p>Dodge: ${data.stats.dodge}</p>
`;
}else{
out.innerHTML = `
<h3>🔍 SCAN RESULT</h3>
<p>Name: ${data.name}</p>
<p>⚠ No local data found</p>
<p>External profile opened</p>
`;
}

});

// ======================
// ⚔️ COMPARE
// ======================
document.getElementById("compareBtn").addEventListener("click", async () => {

let a = document.getElementById("aName").value.trim();
let b = document.getElementById("bName").value.trim();

if(!a || !b){
alert("Enter both players");
return;
}

let res = await fetch(`/api/compare?a=${a}&b=${b}`);
let data = await res.json();

let out = document.getElementById("out");

if(data.error){
out.innerHTML = `<p>❌ ${data.error}</p>`;
return;
}

out.innerHTML = `
<h3>⚔️ BATTLE RESULT</h3>
<p>${data.playerA} vs ${data.playerB}</p>
<p>Score: ${data.scoreA} - ${data.scoreB}</p>
<h2>🏆 Winner: ${data.winner}</h2>
`;

});
