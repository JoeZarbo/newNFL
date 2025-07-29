const canvas = document.getElementById('bug');
const ctx = canvas.getContext("2d");
const bold = new FontFace('bold', 'url("/fonts/ARIBLK.TTF")');
const italic = new FontFace('italic', 'url("/fonts/ARIALI.TTF")');
const logoCache = {};
let isBusy = false;

window.onload = start;

const background = {
    x: 426,
    y: 1200,
    w: 1560,
    h: 95,
    color: "#222",
    draw() {
        ctx.fillStyle = this.color;
        ctx.fillRect(this.x, this.y, this.w, this.h);
    }
};

const lf0 = {
    x: 426,
    y: 1200,
    w: 95,
    h: 95,
    logo: "/logos/logo.png",
    logoImg: null,
    draw() {
        if (this.logoImg) ctx.drawImage(this.logoImg, this.x, this.y, this.w, this.h);
    }
};

const awayInfo = {
    x: 521,
    y: 1200,
    w: 280,
    h: 95,
    prim: "#241773",
    sec: "#9E7C0C",
    logo: "/logos/ravens.png",
    logoImg: null,
    to: ["#FFF", "#FFF"< "#FFF"],
    code: "BAL",
    record: "#3",
    draw() {
        ctx.fillStyle = this.prim;
        ctx.fillRect(this.x, this.y, this.w, this.h);

        ctx.fillStyle = this.to[0];
        ctx.fillRect(this.x + 5, this.y + this.h - 15, 48, 7);
        ctx.fillStyle = this.to[1];
        ctx.fillRect(this.x + 58, this.y + this.h - 15, 48, 7);
        ctx.fillStyle = this.to[2];
        ctx.fillRect(this.x + 111, this.y + this.h - 15, 48, 7);

        if (this.logoImg) ctx.drawImage(this.logoImg, this.x, this.y - 10, 95, 95);

        ctx.font = "50px bold";
        ctx.fillStyle = this.sec;
        ctx.textAlign = "left";
        ctx.fillText(this.code, this.x + 105, this.y + 55);

        ctx.font = "30px italic";
        ctx.textAlign = "right";
        ctx.fillText(this.record, this.x + this.w - 10, this.y + this.h - 10);
    }
};

const awayScore = {
    x: 801,
    y: 1200,
    w: 90,
    h: 95,
    prim: "#130662",
    sec: awayInfo.sec,
    score: 0,
    draw() {
        ctx.fillStyle = this.prim;
        ctx.fillRect(this.x, this.y, this.w, this.h);

        ctx.font = "60px bold";
        ctx.textAlign = "center";
        ctx.fillStyle = this.sec;
        ctx.fillText(this.score.toString(), this.x + this.w / 2, this.y + this.h / 1.4);
    }
};

const homeInfo = {
    x: 891,
    y: 1200,
    w: 280,
    h: 95,
    prim: "#FB4F14",
    sec: "#002244",
    logo: "/logos/broncos.png",
    logoImg: null,
    to: ["#FFF", "#FFF"< "#FFF"],
    code: "DEN",
    record: "#2",
    draw() {
        ctx.fillStyle = this.prim;
        ctx.fillRect(this.x, this.y, this.w, this.h);

        ctx.fillStyle = this.to[0];
        ctx.fillRect(this.x + 5, this.y + this.h - 15, 48, 7);
        ctx.fillStyle = this.to[1];
        ctx.fillRect(this.x + 58, this.y + this.h - 15, 48, 7);
        ctx.fillStyle = this.to[2];
        ctx.fillRect(this.x + 111, this.y + this.h - 15, 48, 7);

        if (this.logoImg) ctx.drawImage(this.logoImg, this.x, this.y - 10, 95, 95);

        ctx.font = "50px bold";
        ctx.fillStyle = this.sec;
        ctx.textAlign = "left";
        ctx.fillText(this.code, this.x + 105, this.y + 55);

        ctx.font = "30px italic";
        ctx.textAlign = "right";
        ctx.fillText(this.record, this.x + this.w - 10, this.y + this.h - 10);
    }
};

const homeScore = {
    x: 1171,
    y: 1200,
    w: 90,
    h: 95,
    prim: "#EA3E03",
    sec: homeInfo.sec,
    score: 0,
    draw() {
        ctx.fillStyle = this.prim;
        ctx.fillRect(this.x, this.y, this.w, this.h);

        ctx.font = "60px bold";
        ctx.textAlign = "center";
        ctx.fillStyle = this.sec;
        ctx.fillText(this.score.toString(), this.x + this.w / 2, this.y + this.h / 1.4);
    }
};

const quarter = {
    x1: 1280,
    y1: 1262,
    x2: 1520,
    y2: 1263,
    x3: 1261,
    y3: 1200,
    w: 280,
    h: 95,
    qtr: "1ST",
    clock: "13:00",
    draw() {
        ctx.fillStyle = "#222";
        ctx.fillRect(this.x3, this.y3, this.w, this.h);

        ctx.font = "45px bold";
        ctx.textAlign = "left";
        ctx.fillStyle = "#FFF";
        ctx.fillText(this.qtr, this.x1, this.y1);

        ctx.font = "50px italic";
        ctx.textAlign = "right";
        ctx.fillText(this.clock, this.x2, this.y2);
    }
};

const playClock = {
    x: 1541,
    y: 1200,
    w: 75,
    h: 95,
    color: "#333",
    textCol: "#FFF",
    time: "40",
    draw() {
        ctx.fillStyle = this.time > 5 ? "#333" : "#B30707";
        ctx.fillRect(this.x, this.y, this.w, this.h);

        ctx.font = this.time > 9 ? "55px italic" : "75px italic";
        ctx.textAlign = "center";
        ctx.fillStyle = this.time > 5 ? "#FFF" : "#000";
        ctx.fillText(this.time.toString(), this.x + this.w / 2 - 2, this.time > 9 ? this.y + this.h / 1.45 : this.y + this.h / 1.3);
    }
};

const down = {
    x: 1616,
    y: 1200,
    w: 370,
    h: 95,
    chall: false,
    prim: "#FB4F14",
    sec: "#002244",
    distance: "1ST & 10",
    draw() {
        ctx.fillStyle = this.prim;
        ctx.fillRect(this.x, this.y, this.w, this.h);

        ctx.font = this.chall ? "40px italic" : "50px italic";
        ctx.textAlign = "center";
        ctx.fillStyle = this.sec;
        ctx.fillText(this.distance, this.x + this.w / 2, this.y + this.h / 1.5);
    }
}

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
    const imgs = [awayInfo, homeInfo, lf0];
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
    background.draw();
    lf0.draw();
    awayInfo.draw();
    awayScore.draw();
    homeInfo.draw();
    homeScore.draw();
    quarter.draw();
    playClock.draw();
    down.draw();
}