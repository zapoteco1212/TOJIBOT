cat > cmds/socket/setprefix.js << 'EOF'
import GraphemeSplitter from 'grapheme-splitter'

export default {
  command: ['setprefix', 'setbotprefix', 'setprefijo'],
  category: 'owner',
  isOwner: true,
  run: async (sock, m, args, usedPrefix, command) => {
    const idBot = sock.user.id.split(':')[0] + '@s.whatsapp.net'
    const config = global.db.data.settings[idBot]

    // TOJIBOT VERIFICATION
    const isOwner2 = [idBot,...(config.owner? [config.owner] : []),...global.owner.map(num => num + '@s.whatsapp.net')].includes(m.sender)
    if (!isOwner2) return sock.reply(m.chat, '《✧》 Este comando es solo para el Owner de TOJIBOT.', m)

    const value = args.join(' ').trim()
    const defaultPrefix = ["#", "/", "!", "."]

    if (!value) {
      const lista = config.prefix === true? '`sin prefijos`' : (Array.isArray(config.prefix)? config.prefix : [config.prefix || '/']).map(p => `\`${p}\``).join(', ')
      return m.reply(`⚡ *TOJIBOT - SETPREFIX* ⚡\n\n❀ Elige un método de prefijo:\n\n> *○ Only-Prefix* » ${usedPrefix + command} *.*\n> *○ Multi-Prefix* » ${usedPrefix + command} *!/.#*\n> *○ No-Prefix* » ${usedPrefix + command} *noprefix*\n> *○ Reset* » ${usedPrefix + command} reset\n\nꕥ Prefijo actual TOJIBOT: ${lista}`)
    }

    if (value.toLowerCase() === 'reset') {
      config.prefix = defaultPrefix
      return sock.reply(m.chat, `⚡ TOJIBOT restaurado.\n❀ Prefijos predeterminados: *${defaultPrefix.join(' ')}*`, m)
    }

    if (value.toLowerCase() === 'noprefix') {
      config.prefix = true
      return m.reply(`⚡ *TOJIBOT - NOPREFIX ACTIVADO* ⚡\n> Ahora TOJIBOT responderá sin prefijos.`)
    }

    const splitter = new GraphemeSplitter()
    const graphemes = splitter.splitGraphemes(value)
    const lista = []
    for (const g of graphemes) {
      if (/^[a-zA-Z]+$/.test(g)) continue
      if (!lista.includes(g)) lista.push(g)
    }

    if (lista.length === 0) return sock.reply(m.chat, 'ꕥ TOJIBOT: No se detectaron prefijos válidos. Usa símbolos o emojis.', m)
    if (lista.length > 6) return sock.reply(m.chat, 'ꕥ TOJIBOT: Máximo 6 prefijos permitidos.', m)

    config.prefix = lista
    return sock.reply(m.chat, `⚡ *TOJIBOT* ⚡\n❀ Prefijo cambiado a *${lista.join(' ')}* correctamente.`, m)
  },
}
EOF
