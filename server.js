import express from "express";

const app = express();

app.use(express.static("public"));

// ======================
// 🔍 FAKE LOCAL DB (optional future use)
// ======================
const players = {
  asas: { hp: 2800, crit: 1200, dodge: 700 },
  aladin: { hp: 3500, crit: 1500, dodge: 900 },
  void: { hp: 2000, crit: 900, dodge: 400 }
};

// ======================
// 🔍 SCAN API (ULTIMATE)
// ======================
app.get("/api/scan", (req, res) => {
let name = (req.query.name || "").trim();

if(!name){
return res.json({ error: "No name provided" });
}

// local data varsa göstər
if(players[name]){
return res.json({
name,
stats: players[name],
type: "local"
});
});

// fallback (unknown player)
res.json({
name,
stats: null,
type: "unknown",
message: "No local data found"
});
});

// ======================
// ⚔️ COMPARE (REAL LOGIC)
// ======================
app.get("/api/compare", (req, res) => {

let aName = req.query.a;
let bName = req.query.b;

let a = players[aName];
let b = players[bName];

if(!a || !b){
return res.json({
error: "One or both players not found"
});
}

let scoreA = a.hp + a.crit + a.dodge;
let scoreB = b.hp + b.crit + b.dodge;

res.json({
playerA: aName,
playerB: bName,
scoreA,
scoreB,
winner: scoreA > scoreB ? aName : bName
});
});

// ======================
app.listen(process.env.PORT || 3000, () => {
console.log("SERVER RUNNING");
});
