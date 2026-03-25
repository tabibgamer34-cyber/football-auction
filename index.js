const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const path = require("path");

const app = express();
const server = http.createServer(app);
const io = new Server(server);

app.use(express.static(path.join(__dirname, "public")));

// ── 100+ Players from Top 5 Leagues ─────────────────────────────────────────
const PLAYERS = [
  // 🏴󠁧󠁢󠁥󠁮󠁧󠁿 PREMIER LEAGUE
  { name: "Erling Haaland",           club: "Man City",          league: "Premier League", flag: "🏴󠁧󠁢󠁥󠁮󠁧󠁿", position: "ST" },
  { name: "Mohamed Salah",            club: "Liverpool",         league: "Premier League", flag: "🏴󠁧󠁢󠁥󠁮󠁧󠁿", position: "RW" },
  { name: "Bukayo Saka",              club: "Arsenal",           league: "Premier League", flag: "🏴󠁧󠁢󠁥󠁮󠁧󠁿", position: "RW" },
  { name: "Declan Rice",              club: "Arsenal",           league: "Premier League", flag: "🏴󠁧󠁢󠁥󠁮󠁧󠁿", position: "CM" },
  { name: "Phil Foden",               club: "Man City",          league: "Premier League", flag: "🏴󠁧󠁢󠁥󠁮󠁧󠁿", position: "AM" },
  { name: "Virgil van Dijk",          club: "Liverpool",         league: "Premier League", flag: "🏴󠁧󠁢󠁥󠁮󠁧󠁿", position: "CB" },
  { name: "Cole Palmer",              club: "Chelsea",           league: "Premier League", flag: "🏴󠁧󠁢󠁥󠁮󠁧󠁿", position: "AM" },
  { name: "Alexander Isak",           club: "Newcastle",         league: "Premier League", flag: "🏴󠁧󠁢󠁥󠁮󠁧󠁿", position: "ST" },
  { name: "Martin Ødegaard",          club: "Arsenal",           league: "Premier League", flag: "🏴󠁧󠁢󠁥󠁮󠁧󠁿", position: "AM" },
  { name: "Bruno Fernandes",          club: "Man United",        league: "Premier League", flag: "🏴󠁧󠁢󠁥󠁮󠁧󠁿", position: "AM" },
  { name: "Kevin De Bruyne",          club: "Man City",          league: "Premier League", flag: "🏴󠁧󠁢󠁥󠁮󠁧󠁿", position: "CM" },
  { name: "Bernardo Silva",           club: "Man City",          league: "Premier League", flag: "🏴󠁧󠁢󠁥󠁮󠁧󠁿", position: "CM" },
  { name: "Trent Alexander-Arnold",   club: "Liverpool",         league: "Premier League", flag: "🏴󠁧󠁢󠁥󠁮󠁧󠁿", position: "RB" },
  { name: "Rodri",                    club: "Man City",          league: "Premier League", flag: "🏴󠁧󠁢󠁥󠁮󠁧󠁿", position: "DM" },
  { name: "James Maddison",           club: "Tottenham",         league: "Premier League", flag: "🏴󠁧󠁢󠁥󠁮󠁧󠁿", position: "AM" },
  { name: "Moises Caicedo",           club: "Chelsea",           league: "Premier League", flag: "🏴󠁧󠁢󠁥󠁮󠁧󠁿", position: "DM" },
  { name: "Gabriel Magalhães",        club: "Arsenal",           league: "Premier League", flag: "🏴󠁧󠁢󠁥󠁮󠁧󠁿", position: "CB" },
  { name: "Hugo Ekitike",             club: "Liverpool",         league: "Premier League", flag: "🏴󠁧󠁢󠁥󠁮󠁧󠁿", position: "ST" },
  { name: "Marcus Rashford",          club: "Man United",        league: "Premier League", flag: "🏴󠁧󠁢󠁥󠁮󠁧󠁿", position: "LW" },
  { name: "Son Heung-min",            club: "Tottenham",         league: "Premier League", flag: "🏴󠁧󠁢󠁥󠁮󠁧󠁿", position: "LW" },
  { name: "Reece James",              club: "Chelsea",           league: "Premier League", flag: "🏴󠁧󠁢󠁥󠁮󠁧󠁿", position: "RB" },
  { name: "Dominic Solanke",          club: "Tottenham",         league: "Premier League", flag: "🏴󠁧󠁢󠁥󠁮󠁧󠁿", position: "ST" },

  // 🇪🇸 LA LIGA
  { name: "Kylian Mbappé",            club: "Real Madrid",       league: "La Liga",        flag: "🇪🇸", position: "ST" },
  { name: "Vinícius Jr.",             club: "Real Madrid",       league: "La Liga",        flag: "🇪🇸", position: "LW" },
  { name: "Jude Bellingham",          club: "Real Madrid",       league: "La Liga",        flag: "🇪🇸", position: "AM" },
  { name: "Rodrygo Goes",             club: "Real Madrid",       league: "La Liga",        flag: "🇪🇸", position: "RW" },
  { name: "Federico Valverde",        club: "Real Madrid",       league: "La Liga",        flag: "🇪🇸", position: "CM" },
  { name: "Toni Kroos",               club: "Real Madrid",       league: "La Liga",        flag: "🇪🇸", position: "CM" },
  { name: "Lamine Yamal",             club: "Barcelona",         league: "La Liga",        flag: "🇪🇸", position: "RW" },
  { name: "Raphinha",                 club: "Barcelona",         league: "La Liga",        flag: "🇪🇸", position: "LW" },
  { name: "Pedri",                    club: "Barcelona",         league: "La Liga",        flag: "🇪🇸", position: "CM" },
  { name: "Gavi",                     club: "Barcelona",         league: "La Liga",        flag: "🇪🇸", position: "CM" },
  { name: "Robert Lewandowski",       club: "Barcelona",         league: "La Liga",        flag: "🇪🇸", position: "ST" },
  { name: "Frenkie de Jong",          club: "Barcelona",         league: "La Liga",        flag: "🇪🇸", position: "CM" },
  { name: "Antoine Griezmann",        club: "Atletico Madrid",   league: "La Liga",        flag: "🇪🇸", position: "AM" },
  { name: "Álvaro Morata",            club: "Atletico Madrid",   league: "La Liga",        flag: "🇪🇸", position: "ST" },
  { name: "Dani Carvajal",            club: "Real Madrid",       league: "La Liga",        flag: "🇪🇸", position: "RB" },
  { name: "Aurélien Tchouaméni",      club: "Real Madrid",       league: "La Liga",        flag: "🇪🇸", position: "DM" },
  { name: "Jan Oblak",                club: "Atletico Madrid",   league: "La Liga",        flag: "🇪🇸", position: "GK" },
  { name: "Alejandro Garnacho",       club: "Atletico Madrid",   league: "La Liga",        flag: "🇪🇸", position: "LW" },
  { name: "Dani Olmo",                club: "Barcelona",         league: "La Liga",        flag: "🇪🇸", position: "AM" },
  { name: "Fermin Lopez",             club: "Barcelona",         league: "La Liga",        flag: "🇪🇸", position: "CM" },
  { name: "Isco",                     club: "Real Betis",        league: "La Liga",        flag: "🇪🇸", position: "AM" },
  { name: "Marc-André ter Stegen",    club: "Barcelona",         league: "La Liga",        flag: "🇪🇸", position: "GK" },

  // 🇩🇪 BUNDESLIGA
  { name: "Harry Kane",               club: "Bayern Munich",     league: "Bundesliga",     flag: "🇩🇪", position: "ST" },
  { name: "Jamal Musiala",            club: "Bayern Munich",     league: "Bundesliga",     flag: "🇩🇪", position: "AM" },
  { name: "Leroy Sané",               club: "Bayern Munich",     league: "Bundesliga",     flag: "🇩🇪", position: "LW" },
  { name: "Thomas Müller",            club: "Bayern Munich",     league: "Bundesliga",     flag: "🇩🇪", position: "SS" },
  { name: "Joshua Kimmich",           club: "Bayern Munich",     league: "Bundesliga",     flag: "🇩🇪", position: "DM" },
  { name: "Serge Gnabry",             club: "Bayern Munich",     league: "Bundesliga",     flag: "🇩🇪", position: "RW" },
  { name: "Florian Wirtz",            club: "Bayer Leverkusen",  league: "Bundesliga",     flag: "🇩🇪", position: "AM" },
  { name: "Granit Xhaka",             club: "Bayer Leverkusen",  league: "Bundesliga",     flag: "🇩🇪", position: "CM" },
  { name: "Victor Boniface",          club: "Bayer Leverkusen",  league: "Bundesliga",     flag: "🇩🇪", position: "ST" },
  { name: "Karim Adeyemi",            club: "Borussia Dortmund", league: "Bundesliga",     flag: "🇩🇪", position: "LW" },
  { name: "Christopher Nkunku",       club: "RB Leipzig",        league: "Bundesliga",     flag: "🇩🇪", position: "SS" },
  { name: "Lois Openda",              club: "RB Leipzig",        league: "Bundesliga",     flag: "🇩🇪", position: "ST" },
  { name: "Manuel Neuer",             club: "Bayern Munich",     league: "Bundesliga",     flag: "🇩🇪", position: "GK" },
  { name: "Alphonso Davies",          club: "Bayern Munich",     league: "Bundesliga",     flag: "🇩🇪", position: "LB" },
  { name: "Dayot Upamecano",          club: "Bayern Munich",     league: "Bundesliga",     flag: "🇩🇪", position: "CB" },
  { name: "Nico Schlotterbeck",       club: "Borussia Dortmund", league: "Bundesliga",     flag: "🇩🇪", position: "CB" },
  { name: "Marco Reus",               club: "Borussia Dortmund", league: "Bundesliga",     flag: "🇩🇪", position: "AM" },
  { name: "Gregor Kobel",             club: "Borussia Dortmund", league: "Bundesliga",     flag: "🇩🇪", position: "GK" },
  { name: "Xabi Alonso",              club: "Bayer Leverkusen",  league: "Bundesliga",     flag: "🇩🇪", position: "COACH" },
  { name: "Benjamin Sesko",           club: "RB Leipzig",        league: "Bundesliga",     flag: "🇩🇪", position: "ST" },

  // 🇮🇹 SERIE A
  { name: "Lautaro Martínez",         club: "Inter Milan",       league: "Serie A",        flag: "🇮🇹", position: "ST" },
  { name: "Marcus Thuram",            club: "Inter Milan",       league: "Serie A",        flag: "🇮🇹", position: "ST" },
  { name: "Nicolò Barella",           club: "Inter Milan",       league: "Serie A",        flag: "🇮🇹", position: "CM" },
  { name: "Hakan Çalhanoğlu",         club: "Inter Milan",       league: "Serie A",        flag: "🇮🇹", position: "DM" },
  { name: "Dusan Vlahovic",           club: "Juventus",          league: "Serie A",        flag: "🇮🇹", position: "ST" },
  { name: "Teun Koopmeiners",         club: "Juventus",          league: "Serie A",        flag: "🇮🇹", position: "CM" },
  { name: "Federico Gatti",           club: "Juventus",          league: "Serie A",        flag: "🇮🇹", position: "CB" },
  { name: "Rafael Leão",              club: "AC Milan",          league: "Serie A",        flag: "🇮🇹", position: "LW" },
  { name: "Theo Hernández",           club: "AC Milan",          league: "Serie A",        flag: "🇮🇹", position: "LB" },
  { name: "Mike Maignan",             club: "AC Milan",          league: "Serie A",        flag: "🇮🇹", position: "GK" },
  { name: "Tijjani Reijnders",        club: "AC Milan",          league: "Serie A",        flag: "🇮🇹", position: "CM" },
  { name: "Khvicha Kvaratskhelia",    club: "PSG",               league: "Serie A",        flag: "🇮🇹", position: "LW" },
  { name: "Victor Osimhen",           club: "Napoli",            league: "Serie A",        flag: "🇮🇹", position: "ST" },
  { name: "Ademola Lookman",          club: "Atalanta",          league: "Serie A",        flag: "🇮🇹", position: "LW" },
  { name: "Gianluca Scamacca",        club: "Atalanta",          league: "Serie A",        flag: "🇮🇹", position: "ST" },
  { name: "Paulo Dybala",             club: "Roma",              league: "Serie A",        flag: "🇮🇹", position: "SS" },
  { name: "Alessandro Bastoni",       club: "Inter Milan",       league: "Serie A",        flag: "🇮🇹", position: "CB" },
  { name: "Romelu Lukaku",            club: "Napoli",            league: "Serie A",        flag: "🇮🇹", position: "ST" },
  { name: "Federico Chiesa",          club: "Liverpool",         league: "Serie A",        flag: "🇮🇹", position: "RW" },
  { name: "Gianluigi Donnarumma",     club: "PSG",               league: "Serie A",        flag: "🇮🇹", position: "GK" },

  // 🇫🇷 LIGUE 1
  { name: "Bradley Barcola",          club: "PSG",               league: "Ligue 1",        flag: "🇫🇷", position: "LW" },
  { name: "Ousmane Dembélé",          club: "PSG",               league: "Ligue 1",        flag: "🇫🇷", position: "RW" },
  { name: "Vitinha",                  club: "PSG",               league: "Ligue 1",        flag: "🇫🇷", position: "CM" },
  { name: "Marquinhos",               club: "PSG",               league: "Ligue 1",        flag: "🇫🇷", position: "CB" },
  { name: "Gonçalo Ramos",            club: "PSG",               league: "Ligue 1",        flag: "🇫🇷", position: "ST" },
  { name: "Warren Zaïre-Emery",       club: "PSG",               league: "Ligue 1",        flag: "🇫🇷", position: "CM" },
  { name: "Desire Doué",              club: "PSG",               league: "Ligue 1",        flag: "🇫🇷", position: "AM" },
  { name: "Jonathan David",           club: "Lille",             league: "Ligue 1",        flag: "🇫🇷", position: "ST" },
  { name: "Mason Greenwood",          club: "Marseille",         league: "Ligue 1",        flag: "🇫🇷", position: "RW" },
  { name: "Elye Wahi",                club: "Marseille",         league: "Ligue 1",        flag: "🇫🇷", position: "ST" },
  { name: "Amine Gouiri",             club: "Stade Rennais",     league: "Ligue 1",        flag: "🇫🇷", position: "AM" },
  { name: "Alexandre Lacazette",      club: "Lyon",              league: "Ligue 1",        flag: "🇫🇷", position: "ST" },
  { name: "Khephren Thuram",          club: "Juventus",          league: "Ligue 1",        flag: "🇫🇷", position: "CM" },
  { name: "Terem Moffi",              club: "Nice",              league: "Ligue 1",        flag: "🇫🇷", position: "ST" },
  { name: "Fabian Ruiz",              club: "PSG",               league: "Ligue 1",        flag: "🇫🇷", position: "CM" },
  { name: "Randal Kolo Muani",        club: "Juventus",          league: "Ligue 1",        flag: "🇫🇷", position: "ST" },
  { name: "Nuno Mendes",              club: "PSG",               league: "Ligue 1",        flag: "🇫🇷", position: "LB" },
  { name: "Achraf Hakimi",            club: "PSG",               league: "Ligue 1",        flag: "🇫🇷", position: "RB" },
  { name: "Wissam Ben Yedder",        club: "Monaco",            league: "Ligue 1",        flag: "🇫🇷", position: "ST" },
  { name: "Takumi Minamino",          club: "Monaco",            league: "Ligue 1",        flag: "🇫🇷", position: "AM" },
];

// ── Auction State ─────────────────────────────────────────────────────────────
let playerQueue   = [];
let currentPlayer = null;
let currentBid    = 0;
let currentBidder = null;
let timeLeft      = 0;
let auctionTimer  = null;
let soldList      = [];
let users         = {};

function shufflePlayers() {
  playerQueue = [...PLAYERS].sort(() => Math.random() - 0.5);
  console.log(`[Auction] Queue ready: ${playerQueue.length} players from 5 leagues.`);
}

function broadcastState() {
  io.emit("auction_state", {
    player: currentPlayer, bid: currentBid,
    bidder: currentBidder, timeLeft, soldList,
    userCount: Object.keys(users).length,
  });
}

function clearTimer() {
  if (auctionTimer) { clearInterval(auctionTimer); auctionTimer = null; }
}

function startTimer(seconds) {
  clearTimer();
  timeLeft = seconds;
  broadcastState();
  auctionTimer = setInterval(() => {
    timeLeft--;
    console.log(`[Timer] ${currentPlayer?.name} — ${timeLeft}s | $${currentBid}M (${currentBidder || "no bids"})`);
    if (timeLeft <= 0) { clearTimer(); endCurrentAuction(); }
    else broadcastState();
  }, 1000);
}

function endCurrentAuction() {
  if (!currentPlayer) return;
  const result = {
    player:   currentPlayer.name,
    club:     currentPlayer.club,
    league:   currentPlayer.league,
    position: currentPlayer.position,
    flag:     currentPlayer.flag,
    winner:   currentBidder || "Nobody",
    amount:   currentBid,
  };
  soldList.unshift(result);
  console.log(`[SOLD] ${result.player} (${result.league}) → ${result.winner} for $${result.amount}M`);
  io.emit("player_sold", result);
  setTimeout(() => nextPlayer(), 3000);
}

function nextPlayer() {
  if (playerQueue.length === 0) {
    io.emit("auction_message", "🏆 All players sold! New round in 5 seconds...");
    setTimeout(() => { shufflePlayers(); soldList = []; nextPlayer(); }, 5000);
    return;
  }
  currentPlayer = playerQueue.pop();
  currentBid    = 0;
  currentBidder = null;
  console.log(`[Next] ${currentPlayer.name} | ${currentPlayer.club} | ${currentPlayer.league}`);
  io.emit("new_player", currentPlayer);
  startTimer(15);
}

io.on("connection", (socket) => {
  console.log(`[Connect] ${socket.id}`);
  socket.emit("auction_state", {
    player: currentPlayer, bid: currentBid, bidder: currentBidder,
    timeLeft, soldList, userCount: Object.keys(users).length,
  });

  socket.on("join", (name) => {
    const clean = String(name).trim().slice(0, 20) || "Anonymous";
    users[socket.id] = clean;
    console.log(`[Join] "${clean}" | Online: ${Object.keys(users).length}`);
    socket.emit("joined", { name: clean });
    io.emit("user_joined", { name: clean, count: Object.keys(users).length });
    if (Object.keys(users).length === 1 && !currentPlayer) {
      shufflePlayers();
      setTimeout(() => nextPlayer(), 1500);
    }
  });

  socket.on("place_bid", (amount) => {
    const bidder = users[socket.id];
    if (!bidder)        return socket.emit("bid_error", "You haven't joined yet.");
    if (!currentPlayer) return socket.emit("bid_error", "No active auction.");
    const val = parseInt(amount, 10);
    if (isNaN(val) || val <= 0) return socket.emit("bid_error", "Enter a valid amount.");
    if (val <= currentBid)      return socket.emit("bid_error", `Must beat $${currentBid}M.`);
    currentBid = val; currentBidder = bidder;
    console.log(`[Bid] ${bidder} → $${val}M on ${currentPlayer.name}`);
    io.emit("bid_placed", { bidder, amount: val, player: currentPlayer.name });
    startTimer(5);
  });

  socket.on("disconnect", () => {
    const name = users[socket.id] || "Unknown";
    delete users[socket.id];
    console.log(`[Left] "${name}" | Online: ${Object.keys(users).length}`);
    io.emit("user_left", { name, count: Object.keys(users).length });
  });
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => console.log(`\n⚽  Football Auction → http://localhost:${PORT}\n`));
