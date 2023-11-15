import Map from "../Object/Map.js";

// const MapObject = new Map({ mapID: "map-edit" });
(function init() {
    // MapObject.create();
})();

const getNode = document.querySelector.bind(document);
const canvasWrapper = getNode("#canvas-wrapper");
console.log(canvasWrapper.clientWidth);
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

const width = 1760;
const height = 1536;

let imageData;
canvas.width = canvasWrapper.clientWidth;
canvas.height = canvasWrapper.clientHeight;

const dental =
    Math.max(height, canvasWrapper.clientHeight) /
    Math.min(height, canvasWrapper.clientHeight);

const xhr = new XMLHttpRequest();
xhr.open("GET", "/map22.pgm");
xhr.responseType = "arraybuffer";
xhr.onload = function () {
    console.log(xhr.response);
    const data = new Uint8Array(xhr.response);
    console.log(data);
    for (let i = 204000; i < 300000; i++) {
        data[i] = 80;
    }

    // const newData = newPgm();

    displayPgm(data);
    // data[1000] = 0
    // setTimeout(() => {
    //     console.log("reset");
    //     const newData = newPgm();
    //     console.log(newData);
    //     ctx.clearRect(0, 0, canvas.width, canvas.height);
    //     displayPgm(newData);
    //     console.log(newData);
    // }, 1000);
    // ..............
};

function displayPgm(data) {
    for (let y = 0; y < height; y += 1) {
        for (let x = 0; x < width; x += 1) {
            const value = data[y * width + x];
            let color = "rgb(" + value + "," + value + "," + value + ")";
            ctx.fillStyle = color;
            ctx.fillRect(x / dental, y / dental, 1, 1);
        }
    }
    imageData = ctx.getImageData(0, 0, width, height);
}

function downloadImage(data, filename = "untitled.jpeg") {
    var a = document.createElement("a");
    a.href = data;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
}

xhr.send();
getNode("#range").oninput = (e) => {
    const value = Number(e.target.value) * 10;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.putImageData(imageData, value, 0);
    // imageData = ctx.getImageData(value, value, canvas.width, canvas.height);
};

function newPgm() {
    const CR = "\n";
    var header = "P5"; // required
    header += CR; // add whitespace char
    header += canvas.width;
    header += CR; // add whitespace char
    header += canvas.height;
    header += CR; // add whitespace char

    const formats = {
        mean: {
            convert(r, g, b) {
                bin[j++] = ((r + g + b) / 3) | 0;
            },
            dataStore(w, h) {
                return new Uint8Array(w * h);
            },
        },
        summed: {
            convert(r, g, b) {
                bin[j++] = r + g + b;
            },
            dataStore(w, h) {
                return new Uint16Array(w * h);
            },
        },
        meanLog: {
            convert(r, g, b) {
                bin[j++] = Math.sqrt((r * r + g * g + b * b) / 3) | 0;
            },
            dataStore(w, h) {
                return new Uint8Array(w * h);
            },
        },
        summedLog: {
            convert(r, g, b) {
                bin[j++] = Math.sqrt(r * r + g * g + b * b) | 0;
            },
            dataStore(w, h) {
                return new Uint16Array(w * h);
            },
        },
    };
    var imgData = ctx.getImageData(0, 0, ctx.canvas.width, ctx.canvas.height);
    var format = formats.mean;
    var bin = format.dataStore(canvas.width, canvas.height);
    var r, g, b, summed, mean, summedLog, meanLog;
    var i = 0;
    var j = 0;
    var max = 0;
    var d = imgData.data; // shorthand var to pixel data
    while (i < d.length) {
        format.convert(d[i++], d[i++], d[i++]);
        max = Math.max(bin[j - 1], max);
        i++; // skip alpha
    }
    header += max; // max value.
    header += CR; // add whitespace char
    // We have all that is needed to create the file so first convert
    // header string to ascII
    var fileBin = new Uint8Array(header.length + bin.length);
    for (i = 0; i < header.length; i++) {
        fileBin[i] = header.charCodeAt(i) & 0b01111111; // strip of top bit just in case superstitious coder reads this
    }
    fileBin.set(new Uint8Array(bin.buffer), header.length); // add the pixel data
    return fileBin;
}
