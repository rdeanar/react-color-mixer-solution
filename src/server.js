// Server code. DO NOT EDIT THIS FILE ↓↓↓↓

// colors data
// array of objects: { r: number, g: number, b: number, likes: number, id: guid }
var colors = [];

// people put likes
setInterval(
  () => colors.forEach(color => (color.likes += Math.floor(Math.random() * 3))),
  1000
);

// moderators remove colors
setInterval(() => {
  colors = colors.filter(color => color.likes < 48 || Math.random() > 0.0625);
}, 8000);

// main functions
export async function serverLoadColors() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (Math.random() > 0.125) {
        const data = colors.map(color => ({ ...color }));
        resolve(data);
      } else {
        reject("503");
      }
    }, getNetworkLatency());
  });
}

export async function serverAddColor(color) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (Math.random() > 0.125) {
        const id = getRandomId();
        colors.push({ id, ...color, likes: 0 });
        resolve(id);
      } else {
        reject("503");
      }
    }, getNetworkLatency());
  });
}

//utils
function getRandomId() {
  const symbols = "abcdefghijklmnopqrstuvwxyz0123456789-+_";
  let id = "";
  for (let i = 0; i < 16; i++) {
    id += symbols[Math.floor(Math.random() * symbols.length)];
  }
  return id;
}

function getNetworkLatency() {
  return 1500 + Math.random() * 1500;
}