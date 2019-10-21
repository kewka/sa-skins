const path = require('path');
const fs = require('fs');
const skinsArray = require('../src/data/skins.json');

const SOURCE_DIR = path.join(__dirname, '../skins');
const OUTPUT_DIR = path.join(__dirname, '../public/skins');
const SKINS_DICTIONARY = skinsArray.reduce(
  (dict, skin) => ({ ...dict, [skin.model]: skin }),
  {}
);
const SOURCE_FILES = fs.readdirSync(SOURCE_DIR);

const existsSkins = [];

SOURCE_FILES.forEach(file => {
  const model = path.parse(file).name;
  const skin = SKINS_DICTIONARY[model];

  if (!skin) {
    console.log(`${model} is not found in the skins.json`);
    return;
  }

  if (existsSkins.indexOf(model) === -1) existsSkins.push(model);

  const sourcePath = path.join(SOURCE_DIR, file);
  const destDirectory = path.join(OUTPUT_DIR, skin.id.toString());
  const destPath = path.join(destDirectory, file);

  if (!fs.existsSync(destDirectory))
    fs.mkdirSync(destDirectory, { recursive: true });

  fs.copyFileSync(sourcePath, destPath);
});

Object.keys(SKINS_DICTIONARY).forEach(skin => {
  if (existsSkins.indexOf(skin) === -1)
    console.log(`${skin} is not found in the skins folder.`);
});
