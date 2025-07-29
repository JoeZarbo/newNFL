const canvas = document.getElementById('bug');
const ctx = canvas.getContext('2d');
const bold = new FontFace('bold', 'url("/fonts/ARIBLK.TTF")');
const italic = new FontFace('italic', 'url("/fonts/ARIALI.TTF")');
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

}

function draw() {
    bold.load();
    italic.load();
    background.draw();
}