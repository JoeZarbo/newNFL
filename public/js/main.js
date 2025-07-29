const canvas = document.getElementById('bug');
const ctx = canvas.getContext('2d');
const logoCache = {};
let isBusy = false;

const background = {
    x: 426,
    y: 1200,
    w: 1560,
    h: 95,
    color: '#222',
    draw() {
        ctx.fillStyle = this.color;
        ctx.fillRect(this.x, this.y, this.w, this.h);
    }
};

function start() {
    
}