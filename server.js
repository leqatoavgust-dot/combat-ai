import express from "express";
import path from "path";

const app = express();

app.use(express.static("public"));

// ROOT FIX
app.get("/", (req, res) => {
res.sendFile(path.resolve("public/index.html"));
});

// SCAN
app.get("/api/scan", (req, res) => {
res.json({
name: req.query.name || "unknown",
class: "balanced",
stats: { hp: 3200, crit: 1400, dodge: 900 }
});
});

// COMPARE
app.get("/api/compare", (req, res) => {
let a = req.query.a || "A";
let b = req.query.b || "B";

let scoreA = Math.floor(Math.random()*100);
let scoreB = Math.floor(Math.random()*100);

res.json({
playerA: a,
playerB: b,
scoreA,
scoreB,
winner: scoreA >= scoreB ? a : b
});
});

app.listen(process.env.PORT || 3000, () => {
console.log("RUNNING");
});
