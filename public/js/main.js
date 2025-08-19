const canvas = document.getElementById('bug');
const ctx = canvas.getContext("2d");
const bold = new FontFace('bold', 'url("/fonts/ARIBLK.TTF")');
const italic = new FontFace('italic', 'url("/fonts/ARIALI.TTF")');
const logoCache = {};
let isBusy = false;

let phase = 'normal';

window.onload = start;

const awayInfo = {
    x: 575,
    y: 1000,
    logo: "/logos/away/ravens.png",
    logoImg: null,
    draw() {
        if (this.logoImg) ctx.drawImage(this.logoImg, this.x, this.y, 400, 400);
    }
};

const homeInfo = {
    x: 1725,
    y: 1000,
    logo: "/logos/home/broncos.png",
    logoImg: null,
    draw() {
        if (this.logoImg) ctx.drawImage(this.logoImg, this.x, this.y, 400, 400);
    }
};

const awayScore = {
    x: 1075,
    y: 1245,
    score: 0,
    draw() {
        ctx.font = "150px bold";
        ctx.textAlign = "center";
        ctx.fillStyle = "#fff";
        ctx.fillText(this.score, this.x, this.y);
    }
};

const homeScore = {
    x: 1625,
    y: 1245,
    score: 0,
    draw() {
        ctx.font = "150px bold";
        ctx.textAlign = "center";
        ctx.fillStyle = "#fff";
        ctx.fillText(this.score, this.x, this.y);
    }
};

const awayTimeouts = {
    x: 1000,
    y: 1275,
    tos: 3,
    fullCol: "#fff",
    usedCol: "#888",
    back: "#241773",
    pos: true,
    draw() {
        if (this.pos) {
            ctx.fillStyle = this.back;
            ctx.fillRect(this.x - 420, this.y - 7, 585, 30);
        }
        ctx.fillStyle = this.tos === 0 ? this.usedCol : this.fullCol;
        ctx.fillRect(this.x, this.y, 45, 15);
        ctx.fillStyle = this.tos < 2 ? this.usedCol : this.fullCol;
        ctx.fillRect(this.x + 55, this.y, 45, 15)
        ctx.fillStyle = this.tos < 3 ? this.usedCol : this.fullCol;
        ctx.fillRect(this.x + 110, this.y, 45, 15);
    }
};

const homeTimeouts = {
    x: 1550,
    y: 1275,
    tos: 3,
    fullCol: "#fff",
    usedCol: "#888",
    back: "#fb4f14",
    pos: true,
    draw() {
        if (this.pos) {
            ctx.fillStyle = this.back;
            ctx.fillRect(this.x - 5, this.y - 7, 585, 30);
        }
        ctx.fillStyle = this.tos === 0 ? this.usedCol : this.fullCol;
        ctx.fillRect(this.x, this.y, 45, 15);
        ctx.fillStyle = this.tos < 2 ? this.usedCol : this.fullCol;
        ctx.fillRect(this.x + 55, this.y, 45, 15)
        ctx.fillStyle = this.tos < 3 ? this.usedCol : this.fullCol;
        ctx.fillRect(this.x + 110, this.y, 45, 15);
    }
};

const awayDown = {
    x: 580,
    y: 1055,
    pos: true,
    back: "#241773",
    fore: "#9e7c0c",
    pc: ":40",
    down: "1st & 10",
    draw() {
        if (!this.pos) return;
        ctx.fillStyle = this.back;
        ctx.fillRect(this.x, this.y, 585, 40);
        ctx.font = "40px italic";
        ctx.fillStyle = this.fore;
        ctx.textAlign = "left";
        ctx.fillText(this.down, this.x + 10, this.y + 35);
        ctx.textAlign = "right";
        ctx.fillText(this.pc, this.x + 580, this.y + 35);
    }
};

const homeDown = {
    x: 1550,
    y: 1055,
    pos: true,
    back: "#fb4f14",
    fore: "#002244",
    pc: ":40",
    down: "1st & 10",
    draw() {
        if (!this.pos) return;
        ctx.fillStyle = this.back;
        ctx.fillRect(this.x, this.y, 585, 40);
        ctx.font = "40px italic";
        ctx.fillStyle = this.fore;
        ctx.textAlign = "left";
        ctx.fillText(this.down, this.x + 10, this.y + 35);
        ctx.textAlign = "right";
        ctx.fillText(this.pc, this.x + 580, this.y + 35);
    }
};

const specialDown = {
    x: 1175,
    y: 1055,
    show: true,
    back: "#222",
    fore: "#fff",
    text: "KICKOFF",
    draw() {
        if (!this.show) return;
        ctx.fillStyle = this.text === "FLAG" ? "#fcdf03" : this.back;
        ctx.fillRect(this.x, this.y, 365, 40);
        ctx.fillStyle = this.text === "FLAG" ? "#222" : this.fore;
        ctx.font = "40px italic";
        ctx.textAlign = "center";
        ctx.fillText(this.text, this.x + 182, this.y + 35);
    }
}

const quarter = {
    x: 1200,
    y: 1100,
    w: 300,
    h: 200,
    qtr: "1ST",
    time: "15:00",
    back: "#222",
    fore: "#fff",
    show: true,
    draw() {
        if (!this.show) return;
        ctx.save();
        ctx.globalAlpha = 0.75;
        ctx.fillStyle = this.back;
        ctx.fillRect(this.x, this.y, this.w, this.h);
        ctx.restore();

        ctx.font = "60px bold";
        ctx.textAlign = "center";
        ctx.fillStyle = this.fore;
        ctx.fillText(this.qtr, this.x + this.w / 2, this.y + this.h - 40);
        
        ctx.font = "80px bold";
        ctx.fillText(this.time, this.x + this.w / 2, this.y + 100);
    }
};

function start() {
    const fontPromises = [
        bold.load(),
        italic.load()
    ];
    const imagePromises = preloadLogos();
    Promise.all([...fontPromises, ...imagePromises]).then((loadedAssets) => {
        document.fonts.add(loadedAssets[0]);
        document.fonts.add(loadedAssets[1]);
        draw();
    })
}

function preloadLogos() {
    const imgs = [awayInfo, homeInfo];
    return imgs.map(team => {
        return new Promise((resolve) => {
            const img = new Image();
            img.src = team.logo;
            img.onload = () => {
                team.logoImg = img;
                resolve(img);
            };
        });
    });
}

function draw() {
    bold.load();
    italic.load();
    awayTimeouts.draw();
    homeTimeouts.draw();
    awayDown.draw();
    homeDown.draw();
    specialDown.draw();
    awayInfo.draw();
    homeInfo.draw();
    quarter.draw();
    awayScore.draw();
    homeScore.draw();
}