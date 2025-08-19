const canvas = document.getElementById('bug');
const ctx = canvas.getContext("2d");
const bold = new FontFace('bold', 'url("/fonts/ARIBLK.TTF")');
const italic = new FontFace('italic', 'url("/fonts/ARIALI.TTF")');
const logoCache = {};
let isBusy = false;

let phase = 'normal';

window.onload = start;

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
    awayInfo.draw();
    homeInfo.draw();
}