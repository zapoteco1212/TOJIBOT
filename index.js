const { default: makeWASocket, useMultiFileAuthState, Browsers } = require('@whiskeysockets/baileys')
const P = require('pino')
const readline = require('readline')
const rl = readline.createInterface({ input: process.stdin, output: process.stdout })
const ask = (t) => new Promise(r => rl.question(t, r))

async function start() {
  const { state, saveCreds } = await useMultiFileAuthState('./session')
  const sock = makeWASocket({
    logger: P({level: 'silent'}),
    auth: state,
    browser: Browsers.macOS('Chrome')
  })

  if (!sock.authState.creds.registered) {
    const num = await ask('Tu numero con codigo pais ej 521XXXXXXXXXX: ')
    const code = await sock.requestPairingCode(num.trim())
    console.log(`\nTU CODE LOLIBOT: ${code}\n`)
  }

  sock.ev.on('creds.update', saveCreds)
  sock.ev.on('connection.update', u => {
    if (u.connection === 'open') console.log('LoliBot Conectada 💮')
    if (u.connection === 'close') start()
  })

  sock.ev.on('messages.upsert', async m => {
    const msg = m.messages[0]
    if (!msg.message) return
    const txt = msg.message.conversation || msg.message.extendedTextMessage?.text || ''
    const from = msg.key.remoteJid

    if (txt.toLowerCase() === '.loli') {
      await sock.sendMessage(from, { text: 'Hola soy LoliBot 💮✨\nComandos:.loli.ping.menu' })
    }
    if (txt.toLowerCase() === '.ping') {
      await sock.sendMessage(from, { text: 'Pong! LoliBot activa 💖' })
    }
  })
}
start()