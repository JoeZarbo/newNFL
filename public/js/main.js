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
    pos: false,
    animating: false,
    alpha: 0,
    draw() {
        ctx.save();
        ctx.globalAlpha = this.alpha;
        if (this.pos) {
            ctx.fillStyle = this.back;
            ctx.fillRect(this.x - 420, this.y - 7, 585, 30);
        }
        ctx.restore();

        ctx.fillStyle = this.tos === 0 ? this.usedCol : this.fullCol;
        ctx.fillRect(this.x, this.y, 45, 15);
        ctx.fillStyle = this.tos < 2 ? this.usedCol : this.fullCol;
        ctx.fillRect(this.x + 55, this.y, 45, 15)
        ctx.fillStyle = this.tos < 3 ? this.usedCol : this.fullCol;
        ctx.fillRect(this.x + 110, this.y, 45, 15);
    },
    _redrawRegion(padding = 2) {
        const pad = padding;
        const w = 585;
        const h = 40;
        ctx.clearRect(this.x - pad - 420, this.y - pad - 7, w + pad * 2, h + pad * 2);
        this.draw();
    },
    changePos(duration = 600) {
        if (this.animating) return;
        this.animating = true;
        const start = performance.now();
        const startA = this.alpha;
        const targetA = this.pos ? 0 : 1;
        if (!this.pos && targetA === 1) this.pos = true;
        const ease = (t) => t < 0.5 ? 2*t*t : -1 + (4 - 2*t)*t;
        const self = this;

        function step(now) {
            const elapsed = now - start;
            const t = Math.min(1, elapsed / duration);
            const eased = ease(t);
            self.alpha = startA + (targetA - startA) * eased;
            if (self.alpha < 0) self.alpha = 0;
            if (self.alpha > 1) self.alpha = 1;

            if (typeof self._redrawRegion === "function") self._redrawRegion();
            awayInfo.draw();

            if (t < 1) {
                requestAnimationFrame(step);
            } else {
                self.alpha = targetA;
                self.animating = false;
                if (self.alpha === 0) self.pos = false;
            }
        }
        requestAnimationFrame(step);
    }
};

const homeTimeouts = {
    x: 1550,
    y: 1275,
    tos: 3,
    fullCol: "#fff",
    usedCol: "#888",
    back: "#fb4f14",
    pos: false,
    animating: false,
    alpha: 0,
    draw() {
        ctx.save();
        ctx.globalAlpha = this.alpha;
        if (this.pos) {
            ctx.fillStyle = this.back;
            ctx.fillRect(this.x - 5, this.y - 7, 585, 30);
        }
        ctx.restore();

        ctx.fillStyle = this.tos === 0 ? this.usedCol : this.fullCol;
        ctx.fillRect(this.x, this.y, 45, 15);
        ctx.fillStyle = this.tos < 2 ? this.usedCol : this.fullCol;
        ctx.fillRect(this.x + 55, this.y, 45, 15)
        ctx.fillStyle = this.tos < 3 ? this.usedCol : this.fullCol;
        ctx.fillRect(this.x + 110, this.y, 45, 15);
    },
    _redrawRegion(padding = 2) {
        const pad = padding;
        const w = 585;
        const h = 40;
        ctx.clearRect(this.x - pad - 5, this.y - pad - 7, w + pad * 2, h + pad * 2);
        this.draw();
    },
    changePos(duration = 600) {
        if (this.animating) return;
        this.animating = true;
        const start = performance.now();
        const startA = this.alpha;
        const targetA = this.pos ? 0 : 1;
        if (!this.pos && targetA === 1) this.pos = true;
        const ease = (t) => t < 0.5 ? 2*t*t : -1 + (4 - 2*t)*t;
        const self = this;

        function step(now) {
            const elapsed = now - start;
            const t = Math.min(1, elapsed / duration);
            const eased = ease(t);
            self.alpha = startA + (targetA - startA) * eased;
            if (self.alpha < 0) self.alpha = 0;
            if (self.alpha > 1) self.alpha = 1;

            if (typeof self._redrawRegion === "function") self._redrawRegion();
            homeInfo.draw();

            if (t < 1) {
                requestAnimationFrame(step);
            } else {
                self.alpha = targetA;
                self.animating = false;
                if (self.alpha === 0) self.pos = false;
            }
        }
        requestAnimationFrame(step);
    }
};

const awayDown = {
    x: 580,
    y: 1055,
    pos: false,
    back: "#241773",
    fore: "#9e7c0c",
    pc: ":40",
    down: "1st & 10",
    animating: false,
    alpha: 0,
    draw() {
        if (this.alpha <= 0) return;
        ctx.save();
        ctx.globalAlpha = this.alpha;
        ctx.fillStyle = this.back;
        ctx.fillRect(this.x, this.y, 585, 40);
        ctx.font = "40px italic";
        ctx.fillStyle = this.fore;
        ctx.textAlign = "left";
        ctx.fillText(this.down, this.x + 10, this.y + 35);
        ctx.textAlign = "right";
        ctx.fillText(this.pc, this.x + 580, this.y + 35);
        ctx.restore();
    },
    // clear and redraw only the awayDown region
    _redrawRegion(padding = 2) {
        const pad = padding;
        const w = 585;
        const h = 40;
        ctx.clearRect(this.x - pad, this.y - pad, w + pad * 2, h + pad * 2);
        this.draw();
    },
    // toggle possession display with fade in/out without calling global draw()
    changePos(duration = 600) {
        if (this.animating) return;
        this.animating = true;

        const start = performance.now();
        const startAlpha = this.alpha;
        const targetAlpha = this.pos ? 0 : 1;
        if (!this.pos && targetAlpha === 1) this.pos = true;

        const ease = (t) => t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
        const self = this;

        function step(now) {
            const elapsed = now - start;
            const t = Math.min(1, elapsed / duration);
            const eased = ease(t);
            self.alpha = startAlpha + (targetAlpha - startAlpha) * eased;
            if (self.alpha < 0) self.alpha = 0;
            if (self.alpha > 1) self.alpha = 1;

            if (typeof self._redrawRegion === "function") self._redrawRegion();

            if (t < 1) {
                requestAnimationFrame(step);
            } else {
                self.alpha = targetAlpha;
                self.animating = false;
                if (self.alpha === 0) self.pos = false;
            }
        }

        requestAnimationFrame(step);
    }
};

const homeDown = {
    x: 1550,
    y: 1055,
    pos: false,
    back: "#fb4f14",
    fore: "#002244",
    pc: ":40",
    down: "1st & 10",
    animating: false,
    alpha: 0,
    draw() {
        if (this.alpha <= 0) return;
        ctx.save();
        ctx.globalAlpha = this.alpha;
        ctx.fillStyle = this.back;
        ctx.fillRect(this.x, this.y, 585, 40);
        ctx.font = "40px italic";
        ctx.fillStyle = this.fore;
        ctx.textAlign = "left";
        ctx.fillText(this.down, this.x + 10, this.y + 35);
        ctx.textAlign = "right";
        ctx.fillText(this.pc, this.x + 580, this.y + 35);
        ctx.restore();
    },
    _redrawRegion(padding = 2) {
        const pad = padding;
        const w = 585;
        const h = 40;
        ctx.clearRect(this.x - pad, this.y - pad, w + pad * 2, h + pad * 2);
        this.draw();
    },
    changePos(duration = 600) {
        if (this.animating) return;
        this.animating = true;

        const start = performance.now();
        const startAlpha = this.alpha;
        const targetAlpha = this.pos ? 0 : 1;
        if (!this.pos && targetAlpha === 1) this.pos = true;

        const ease = (t) => t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
        const self = this;

        function step(now) {
            const elapsed = now - start;
            const t = Math.min(1, elapsed / duration);
            const eased = ease(t);
            self.alpha = startAlpha + (targetAlpha - startAlpha) * eased;
            if (self.alpha < 0) self.alpha = 0;
            if (self.alpha > 1) self.alpha = 1;

            if (typeof self._redrawRegion === "function") self._redrawRegion();

            if (t < 1) {
                requestAnimationFrame(step);
            } else {
                self.alpha = targetAlpha;
                self.animating = false;
                if (self.alpha === 0) self.pos = false;
            }
        }

        requestAnimationFrame(step);
    }
};

const specialDown = {
    x: 1175,
    y: 1055,
    show: false,
    back: "#222",
    fore: "#fff",
    text: "KICKOFF",
    alpha: 0,
    animating: false,
    draw() {
        if (this.alpha <= 0) return;

        ctx.save();
        ctx.globalAlpha = this.alpha;
        ctx.fillStyle = this.text === "FLAG" ? "#fcdf03" : this.back;
        ctx.fillRect(this.x, this.y, 365, 40);
        ctx.fillStyle = this.text === "FLAG" ? "#222" : this.fore;
        ctx.font = "40px italic";
        ctx.textAlign = "center";
        ctx.fillText(this.text, this.x + 182, this.y + 35);
        ctx.restore();
    },
    // clear and redraw only the specialDown region (avoids calling the global draw())
    _redrawRegion(padding = 2) {
        const pad = padding;
        const w = 365;
        const h = 40;
        // clear only the area we need to update
        ctx.clearRect(this.x - pad, this.y - pad, w + pad * 2, h + pad * 2);
        // draw current state of this element into the cleared region
        this.draw();
    },
    changeDown() {
        if (this.animating) return;
        this.animating = true;
        let duration = 600;

        const start = performance.now();
        const startAlpha = this.alpha;
        const targetAlpha = this.show ? 0 : 1;
        
        if (!this.show && targetAlpha === 1) this.show = true;

        const ease = (t) => t < 0.5 ? 2*t*t : -1 + (4 - 2*t)*t;

        const self = this;
        function step(now) {
            const elapsed = now - start;
            const t = Math.min(1, elapsed / duration);
            const eased = ease(t);
            self.alpha = startAlpha + (targetAlpha - startAlpha) * eased;

            if (self.alpha < 0) self.alpha = 0;
            if (self.alpha > 1) self.alpha = 1;

            // redraw only the specialDown region to avoid invoking the main draw loop
            if (typeof self._redrawRegion === "function") self._redrawRegion();

            if (t < 1) {
                requestAnimationFrame(step);
            } else {
                self.alpha = targetAlpha;
                self.animating = false;
                if (self.alpha === 0) self.show = false;
            }
        }
        requestAnimationFrame(step);
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

const socket = new WebSocket(`ws://${window.location.host}`);

socket.onmessage = (event) => {
    const receivedMessage = JSON.parse(event.data);
    console.log(receivedMessage);

    switch (receivedMessage.type) {
        case "change-special":
            specialDown.changeDown();
            break;
        case "away-possession":
            awayDown.changePos();
            awayTimeouts.changePos();
            break;
        case "home-possession":
            homeDown.changePos();
            homeTimeouts.changePos();
            break;
    }
}