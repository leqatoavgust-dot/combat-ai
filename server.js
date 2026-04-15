import express from "express";

const app = express();

app.use(express.static("public"));

console.log("SERVER STARTED");

// ======================
// 🔍 SCAN SYSTEM
// ======================
app.get("/api/scan", (req, res) => {

let name = req.query.name || "unknown";

// fake but stable stats
res.json({
name,
class: "balanced",
stats: {
hp: 3000 + Math.floor(Math.random()*500),
crit: 1000 + Math.floor(Math.random()*500),
dodge: 800 + Math.floor(Math.random()*300)
}
});

});

// ======================
// ⚔️ COMPARE SYSTEM
// ======================
app.get("/api/compare", (req, res) => {

let a = req.query.a || "A";
let b = req.query.b || "B";

// stable scoring system
let scoreA = Math.floor(Math.random()*100);
let scoreB = Math.floor(Math.random()*100);

let winner = scoreA >= scoreB ? a : b;

res.json({
playerA: a,
playerB: b,
scoreA,
scoreB,
winner
});

});

// ======================
app.listen(3000, () => {
console.log("🔥 RUNNING ON http://localhost:3000");
});