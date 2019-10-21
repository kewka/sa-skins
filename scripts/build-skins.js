const path = require('path');
const fs = require('fs');
const { spawnSync } = require('child_process');

const PUBLIC_DIR = path.join(__dirname, '../public');

const TXD2PNG_SCRIPT = path.join(__dirname, '../txd2png/script.py');
const DFF2OBJ_BINARY = path.join(__dirname, '../dff2obj/dff2obj');

const SKINS_DIRECTORY = path.join(PUBLIC_DIR, '/skins');
const SKINS_DIRECTORIES = fs.readdirSync(SKINS_DIRECTORY);

SKINS_DIRECTORIES.forEach(skinDir => {
  const skinId = Number(path.basename(skinDir));
  const skinDirPath = path.join(SKINS_DIRECTORY, skinDir);

  const skinFiles = fs.readdirSync(skinDirPath).reduce((files, file) => {
    const { ext } = path.parse(file);
    ext === '.txd' && (files[0] = file);
    ext === '.dff' && (files[1] = file);
    return files;
  }, []);

  skinFiles.forEach(skinFile => {
    const filePath = path.join(skinDirPath, skinFile);
    const { ext, name } = path.parse(filePath);

    if (ext === '.txd') {
      spawnSync('python3', [TXD2PNG_SCRIPT, filePath], {
        cwd: skinDirPath
      });
    } else if (ext === '.dff') {
      spawnSync(
        DFF2OBJ_BINARY,
        [filePath, path.join(skinDirPath, `${name}.obj`)],
        {
          cwd: path.dirname(DFF2OBJ_BINARY),
          env: {
            TEXTURES_DIR: skinDirPath
          }
        }
      );
    }
  });

  // Clean up.
  fs.readdirSync(skinDirPath).forEach(file => {
    const { ext } = path.parse(file);

    if (ext !== '.obj' && ext !== '.png' && ext !== '.mtl') {
      fs.unlinkSync(path.join(skinDirPath, file));
    }
  });

  console.log('Complete %d id', skinId);
});
