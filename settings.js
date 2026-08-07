cat > config.js << 'EOF'
import { watchFile, unwatchFile } from "fs";
import chalk from "chalk";
import { fileURLToPath } from "url";

global.owner = ['5217444317595', '527444317595'];

global.dev = "© ⍴᥆ᥕᥱrᥱძ ᑲᥡ Zapoteco - TOJIBOT";
global.botname = "TOJIBOT";
global.vs = "1.0.0 - Toji Edition";

global.links = {
  api: 'https://api.tojibot.com',
  channel: "https://whatsapp.com/channel/0029Vb64nWqLo4hb8cuxe23n",
  github: "https://github.com/zapoteco1212/TOJIBOT",
  gmail: "zapoteco1212@gmail.com"
}

global.my = {
  ch1: '120363401404146384@newsletter'
};

global.APIs = { 
  toji: { url: "https://api.tojibot.com", key: "TojiBot-MD" },
  yuki: { url: "https://api.yuki-wabot.my.id", key: "YukiBot-MD" },
  vreden: { url: "https://api.vreden.web.id", key: null },
  ootaizumi: { url: "https://api.ootaizumi.web.id", key: null },
  delirius: { url: "https://api.delirius.store", key: null },
  zenzxz: { url: "https://api.zenzxz.my.id", key: null },
  siputzx: { url: "https://app.siputzx.my.id", key: null }
};

global.mess = {
  owner: '《✧》 Este comando solo puede ser usado por mi Creador - TOJIBOT.',
  socket: '《✧》 Este comando solo puede ser ejecutado por un Socket.',
  admin: '《✧》 Este comando solo puede ser ejecutado por los Administradores del Grupo.',
  botAdmin: '《✧》 Este comando solo puede ser ejecutado si TOJIBOT es Administrador del Grupo.',
  group: '《✧》 Este comando solo puede ser usado en grupos.',
  premium: '《✧》 Este comando es solo para usuarios Premium.'
};

let file = fileURLToPath(import.meta.url);
watchFile(file, () => {
  unwatchFile(file);
  console.log(chalk.redBright(`Update ${file}`));
  import(`${file}?update=${Date.now()}`);
});
EOF
