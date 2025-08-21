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
            const grad = ctx.createLinearGradient(this.x, this.y, this.x + 585, this.y + 40);
            grad.addColorStop(0, GetLowGradient(this.back));
            grad.addColorStop(0.5, GetHighGradient(this.back));
            grad.addColorStop(1, GetLowGradient(this.back));
            ctx.fillStyle = grad;
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
            const grad = ctx.createLinearGradient(this.x, this.y, this.x + 585, this.y + 40);
            grad.addColorStop(0, GetLowGradient(this.back));
            grad.addColorStop(0.5, GetHighGradient(this.back));
            grad.addColorStop(1, GetLowGradient(this.back));
            ctx.fillStyle = grad;
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
        const grad = ctx.createLinearGradient(this.x, this.y, this.x + 585, this.y + 40);
        grad.addColorStop(0, GetLowGradient(this.back));
        grad.addColorStop(0.5, GetHighGradient(this.back));
        grad.addColorStop(1, GetLowGradient(this.back));
        ctx.fillStyle = grad;
        ctx.fillRect(this.x, this.y, 585, 40);
        ctx.font = "40px italic";
        ctx.fillStyle = this.fore;
        ctx.textAlign = "left";
        ctx.fillText(this.pc, this.x + 10, this.y + 35);
        ctx.textAlign = "right";
        ctx.fillText(this.down, this.x + 580, this.y + 35);
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
                if (self.alpha === 0) {
                    self.pos = false;
                    self.down = "1st & 10";
                }
            }
        }

        requestAnimationFrame(step);
    },
    changeDown(newDown, newDistance, duration = 300) {
        if (this.animating || !this.pos) return;
        this.animating = true;

        let start = performance.now();
        const ease = (t) => t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
        const self = this;

        function stepOne(now) {
            const elapsed = now - start;
            const t = Math.min(1, elapsed / duration);
            const eased = ease(t);

            ctx.clearRect(self.x - 2, self.y - 2, self.w + 2 * 2, self.h + 2 * 2);

            ctx.fillStyle = self.back;
            ctx.fillRect(self.x, self.y, 585, 40);
            ctx.font = "40px italic";
            ctx.fillStyle = self.fore;
            ctx.textAlign = "left";
            ctx.fillText(self.pc, self.x + 10, self.y + 35);

            let newA = 1 + (0 - 1) * eased;
            let newX = 580 + (540 - 580) * eased;
            ctx.save();
            ctx.globalAlpha = newA;
            ctx.fillStyle = self.fore;
            ctx.textAlign = "right";
            ctx.fillText(self.down, newX + 580, self.y + 35);
            ctx.restore();
            awayInfo.draw();

            if (t < 1) {
                requestAnimationFrame(stepOne);
            } else {
                start = performance.now();
                let comboDown;
                if (newDistance === -1) {
                    comboDown = `${GetDownNum(newDown)} & GOAL`;
                } else if (newDistance === 0) {
                    comboDown = `${GetDownNum(newDown)} & INCHES`;
                } else if (newDistance === -2) {
                    comboDown = `${GetDownNum(newDown)} DOWN`;
                } else {
                    comboDown = `${GetDownNum(newDown)} & ${newDistance}`;
                }
                self.down = comboDown;
                requestAnimationFrame(stepTwo);
            }
        }

        function stepTwo(now) {
            const elapsed = now - start;
            const t = Math.min(1, elapsed / duration);
            const eased = ease(t);

            ctx.clearRect(self.x - 2, self.y - 2, self.w + 2 * 2, self.h + 2 * 2);

            const grad = ctx.createLinearGradient(this.x, this.y, this.x + 585, this.y + 40);
            grad.addColorStop(0, GetLowGradient(this.back));
            grad.addColorStop(0.5, GetHighGradient(this.back));
            grad.addColorStop(1, GetLowGradient(this.back));
            ctx.fillStyle = grad;
            ctx.fillRect(self.x, self.y, 585, 40);
            ctx.font = "40px italic";
            ctx.fillStyle = self.fore;
            ctx.textAlign = "left";
            ctx.fillText(self.pc, self.x + 10, self.y + 35);

            let newA = 0 + (1.0 - 0) * eased;
            let newX = 540 + (580 - 540) * eased;
            ctx.save();
            ctx.globalAlpha = newA;
            ctx.fillStyle = self.fore;
            ctx.textAlign = "right";
            ctx.fillText(self.down, newX + 580, self.y + 35);
            ctx.restore();
            awayInfo.draw();

            if (t < 1) {
                requestAnimationFrame(stepTwo);
            } else {
                self.animating = false;
            }
        }

        requestAnimationFrame(stepOne);
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
        const grad = ctx.createLinearGradient(this.x, this.y, this.x + 585, this.y + 40);
        grad.addColorStop(0, GetLowGradient(this.back));
        grad.addColorStop(0.5, GetHighGradient(this.back));
        grad.addColorStop(1, GetLowGradient(this.back));
        ctx.save();
        ctx.globalAlpha = this.alpha;
        ctx.fillStyle = grad;
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
                if (self.alpha === 0) {
                    self.pos = false;
                    self.down = "1st & 10";
                }
            }
        }

        requestAnimationFrame(step);
    },
    changeDown(newDown, newDistance, duration = 300) {
        if (this.animating || !this.pos) return;
        this.animating = true;

        let start = performance.now();
        const ease = (t) => t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
        const self = this;

        function stepOne(now) {
            const elapsed = now - start;
            const t = Math.min(1, elapsed / duration);
            const eased = ease(t);
            
            //clear area
            ctx.clearRect(self.x - 2, self.y - 2, self.w + 2 * 2, self.h + 2 * 2);

            //draw background and play clock
            const grad = ctx.createLinearGradient(this.x, this.y, this.x + 585, this.y + 40);
            grad.addColorStop(0, GetLowGradient(this.back));
            grad.addColorStop(0.5, GetHighGradient(this.back));
            grad.addColorStop(1, GetLowGradient(this.back));
            ctx.fillStyle = grad;
            ctx.fillRect(self.x, self.y, 585, 40);
            ctx.font = "40px italic";
            ctx.fillStyle = self.fore;
            ctx.textAlign = "right";
            ctx.fillText(self.pc, self.x + 580, self.y + 35);

            //draw down shrinking and fading away and moving to the right
            let newA = 1 + (0 - 1) * eased;
            let newX = 1560 + (1600 - 1560) * eased;
            ctx.save();
            ctx.globalAlpha = newA;
            ctx.fillStyle = self.fore;
            ctx.textAlign = "left";
            ctx.fillText(self.down, newX, self.y + 35);
            ctx.restore();
            homeInfo.draw();

            if (t < 1) {
                requestAnimationFrame(stepOne);
            } else {
                start = performance.now();
                let comboDown;
                if (newDistance === -1) {
                    comboDown = `${GetDownNum(newDown)} & GOAL`;
                } else if (newDistance === -2) {
                    comboDown = `${GetDownNum(newDown)} DOWN`;
                } else if (newDistance === 0) {
                    comboDown = `${GetDownNum(newDown)} & INCHES`;
                } else {
                    comboDown = `${GetDownNum(newDown)} & ${newDistance}`;
                }
                self.down = comboDown;
                requestAnimationFrame(stepTwo);
            }
        }

        function stepTwo(now) {
            const elapsed = now - start;
            const t = Math.min(1, elapsed / duration);
            const eased = ease(t);

            //clear area
            ctx.clearRect(self.x - 2, self.y - 2, self.w + 2 * 2, self.h + 2 * 2);

            //draw background and play clock
            ctx.fillStyle = self.back;
            ctx.fillRect(self.x, self.y, 585, 40);
            ctx.font = "40px italic";
            ctx.fillStyle = self.fore;
            ctx.textAlign = "right";
            ctx.fillText(self.pc, self.x + 580, self.y + 35);

            //draw down growing and fading in and moving to the left
            let newA = 0 + (1.0 - 0) * eased;
            let newX = 1600 + (1560 - 1600) * eased;
            ctx.save();
            ctx.globalAlpha = newA;
            ctx.fillStyle = self.fore;
            ctx.textAlign = "left";
            ctx.fillText(self.down, newX, self.y + 35);
            ctx.restore();
            homeInfo.draw();

            if (t < 1) {
                requestAnimationFrame(stepTwo);
            } else {
                self.animating = false;
            }
        }

        requestAnimationFrame(stepOne);
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
        const grad = ctx.createLinearGradient(this.x, this.y, this.x + 365, this.y + 40);
        grad.addColorStop(0, GetLowGradient(this.text === "FLAG" ? "#fcdf03" : this.back));
        grad.addColorStop(0.5, GetHighGradient(this.text === "FLAG" ? "#fcdf03" : this.back));
        grad.addColorStop(1, GetLowGradient(this.text === "FLAG" ? "#fcdf03" : this.back));
        ctx.fillStyle = grad;
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
    },
    changeText(newText) {
        this.text = newText;
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
        case "set-kickoff":
            specialDown.changeText("KICKOFF");
            specialDown.changeDown();
            break;
        case "set-flag":
            specialDown.changeText("FLAG");
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
        case "send-down":
            if (receivedMessage.away) {
                awayDown.changeDown(receivedMessage.down, receivedMessage.distance);
            } else {
                homeDown.changeDown(receivedMessage.down, receivedMessage.distance);
            }
            break;
    }
}

function GetDownNum(num) {
    if (num === 1) {
        return "1st";
    } else if (num === 2) {
        return "2nd";
    } else if (num === 3) {
        return "3rd";
    } else {
        return "4th";
    }
}

function GetLowGradient(col) {
    let finalCol = "";
    for (const char of col) {
        switch (char) {
            case "#":
                finalCol += "#";
                break;
            case "0":
            case "1":
                finalCol += "0";
                break;
            case "2":
                finalCol += "1";
                break;
            case "3":
                finalCol += "2";
                break;
            case "4":
                finalCol += "3";
                break;
            case "5":
                finalCol += "4";
                break;
            case "6":
                finalCol += "5";
                break;
            case "7":
                finalCol += "6";
                break;
            case "8":
                finalCol += "7";
                break;
            case "9":
                finalCol += "8";
                break;
            case "a":
                finalCol += "9";
                break;
            case "b":
                finalCol += "a";
                break;
            case "c":
                finalCol += "b";
                break;
            case "d":
                finalCol += "c";
                break;
            case "e":
                finalCol += "d";
                break;
            case "f":
                finalCol += "e";
                break;
        }
    }
    return finalCol;
}

function GetHighGradient(col) {
    let finalCol = "";
    for (const char of col) {
        switch (char) {
            case "#":
                finalCol += "#";
                break;
            case "0":
                finalCol += "1";
                break;
            case "1":
                finalCol += "2";
                break;
            case "2":
                finalCol += "3";
                break;
            case "3":
                finalCol += "4";
                break;
            case "4":
                finalCol += "5";
                break;
            case "5":
                finalCol += "6";
                break;
            case "6":
                finalCol += "7";
                break;
            case "7":
                finalCol += "8";
                break;
            case "8":
                finalCol += "9";
                break;
            case "9":
                finalCol += "a";
                break;
            case "a":
                finalCol += "b";
                break;
            case "b":
                finalCol += "c";
                break;
            case "c":
                finalCol += "d";
                break;
            case "d":
                finalCol += "e";
                break;
            case "e":
            case "f":
                finalCol += "f";
                break;
        }
    }
    return finalCol;
}