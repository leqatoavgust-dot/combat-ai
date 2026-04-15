import express from "express";

const app = express();

app.use(express.static("public"));

app.get("/", (req, res) => {
res.sendFile(process.cwd() + "/public/index.html");
});

// SCAN
app.get("/api/scan", (req, res) => {
let name = req.query.name || "unknown";

res.json({
name,
class: "balanced",
stats: {
hp: 3200,
crit: 1400,
dodge: 900
}
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
