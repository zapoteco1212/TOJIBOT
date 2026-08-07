cat > lib/level.js << 'EOF'
const growth = Math.pow(Math.PI / Math.E, 1.618) * Math.E * 0.75

function xpRange(level, multiplier = global.multiplier || 2) {
  if (level < 0) throw new TypeError('level cannot be negative value')
  level = Math.floor(level)
  const min = level === 0 ? 0 : Math.round(Math.pow(level, growth) * multiplier) + 1
  const max = Math.round(Math.pow(level + 1, growth) * multiplier)
  return { min, max, xp: max - min }
}

function findLevel(xp, multiplier = global.multiplier || 2) {
  if (xp === Infinity) return Infinity
  if (isNaN(xp)) return NaN
  if (xp <= 0) return -1
  let level = 0
  do { level++ } while (xpRange(level, multiplier).min <= xp)
  return --level
}

function canLevelUp(level, xp, multiplier = global.multiplier || 2) {
  if (level < 0) return false
  if (xp === Infinity) return true
  if (isNaN(xp)) return false
  if (xp <= 0) return false
  return level < findLevel(xp, multiplier)
}

// ⚡ TOJIBOT - LEVEL SYSTEM ⚡
export default async (m, sock) => {
  try {
    const user = global.db.data.users[m.sender]
    const chatUsers = global.db.data.chats[m.chat]?.users?.[m.sender]
    if (!user || !chatUsers) return

    let before = user.level || 0
    while (canLevelUp(user.level, user.exp, global.multiplier)) {
      user.level++
    }

    if (before !== user.level) {
      const { min, max } = xpRange(user.level, global.multiplier)
      user.minxp = min
      user.maxxp = max

      if (user.level % 5 === 0) {
        const coinBonus = Math.floor(Math.random() * (10000 - 7000 + 1)) + 7000
        const expBonus = Math.floor(Math.random() * (800 - 300 + 1)) + 300
        chatUsers.coins = (chatUsers.coins || 0) + coinBonus
        user.exp = (user.exp || 0) + expBonus

        // Mensaje pro solo cada 5 niveles
        await sock.sendMessage(m.chat, {
          text: `⚡ *¡LEVEL UP - TOJIBOT!* ⚡\n\n*${m.pushName}* subió al nivel *${user.level}*\n\n▢ *Rango:* ${user.level < 10 ? 'Aprendiz' : user.level < 20 ? 'Cazador' : user.level < 30 ? 'Asesino' : 'TOJI FUSHIGURO'}\n\n🎁 *Bonus x5:* +${coinBonus} coins`,
          mentions: [m.sender]
        }, { quoted: m })
      }
    }
  } catch {}
}

export { xpRange, findLevel, canLevelUp }
EOF
