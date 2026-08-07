cat > plugins/owner/setprefix.js << 'EOF'
import GraphemeSplitter from 'grapheme-splitter'

export default {
  command: ['setprefix', 'setbotprefix', 'setprefijo'],
  category: 'owner',
  isOwner: true,
  description: 'Cambia el prefijo de TOJIBOT',

  run: async (sock, m, args, usedPrefix, command) => {
    const idBot = sock.user.id.split(':')[0] + '@s.whatsapp.net'
    const config = global.db.data.settings[idBot]

    // TOJIBOT - Solo Owner
    const isOwner2 = [idBot,...(config.owner? [config.owner] : []),...global.owner.map(n => n + '@s.whatsapp.net')].includes(m.sender)
    if (!isOwner2) return sock.reply(m.chat, '⚡ Este comando es solo para el Owner de TOJIBOT.', m)

    const value = args.join(' ').trim()
    const defaultPrefix = ["#", "/", "!", "."]

    if (!value) {
      const lista = config.prefix === true? '`sin prefijos (TOJIBOT)`' : (Array.isArray(config.prefix)? config.prefix : [config.prefix || '/']).map(p => `\`${p}\``).join(', ')
      return m.reply(
`⚡ *TOJIBOT - SETPREFIX* ⚡

❀ Elige cómo quieres que responda TOJIBOT:

> *○ Only-Prefix* » ${usedPrefix + command} *.*
> *○ Multi-Prefix* » ${usedPrefix + command} *!/.#*
> *○ No-Prefix* » ${usedPrefix + command} *noprefix*
> *○ Reset* » ${usedPrefix + command} *reset*

ꕥ Prefijo actual: ${lista}`
      )
    }

    if (value.toLowerCase() === 'reset') {
      config.prefix = defaultPrefix
      return sock.reply(m.chat, `⚡ *TOJIBOT RESTAURADO* ⚡\n❀ Prefijos: *${defaultPrefix.join(' ')}*`, m)
    }

    if (value.toLowerCase() === 'noprefix') {
      config.prefix = true
      return m.reply(`⚡ *TOJIBOT - MODO NOPREFIX* ⚡\n> Ahora respondo sin prefijos, solo escribe el comando.`)
    }

    const splitter = new GraphemeSplitter()
    const graphemes = splitter.splitGraphemes(value)
    const lista = []
    for (const g of graphemes) {
      if (/^[a-zA-Z]+$/.test(g)) continue
      if (!lista.includes(g)) lista.push(g)
    }

    if (lista.length === 0) return sock.reply(m.chat, '⚡ TOJIBOT: No detecté prefijos válidos. Usa símbolos.', m)
    if (lista.length > 6) return sock.reply(m.chat, '⚡ TOJIBOT: Máximo 6 prefijos.', m)

    config.prefix = lista
    return sock.reply(m.chat, `⚡ *TOJIBOT ACTUALIZADO* ⚡\n❀ Nuevo prefijo: *${lista.join(' ')}*`, m)
  }
}
EOF
