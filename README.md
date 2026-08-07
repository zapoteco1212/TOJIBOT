# TOJIBOT


cat > README.md << 'EOF'
<p align="center">
  <img src="https://i.imgur.com/8Km9tLL.png" width="300"/>
</p>

<h1 align="center">⚡ TOJIBOT - MD ⚡</h1>

<p align="center">
  <b>El Bot de WhatsApp más rápido y estable, hecho en México 🇲🇽</b><br>
  <b>Powered by Zapoteco</b>
</p>

<p align="center">
  <img src="https://img.shields.io/github/stars/zapoteco1212/TOJIBOT?style=for-the-badge&color=blue">
  <img src="https://img.shields.io/github/forks/zapoteco1212/TOJIBOT?style=for-the-badge&color=green">
  <img src="https://img.shields.io/badge/Version-1.0.0-cyan?style=for-the-badge">
  <img src="https://img.shields.io/badge/Baileys-Multi%20Device-red?style=for-the-badge">
</p>

---

### 🚀 Características TOJIBOT

- ✅ Botón QR y Código de 8 dígitos
- ✅ SubBots ilimitados ( `Sessions/Subs` )
- ✅ Anti-baneo y reconexión automática
- ✅ Base de Datos optimizada
- ✅ Handler de plugins avanzado
- ✅ Warmup de grupos ultra rápido
- ✅ Soporte para `code` y `qr`

### 📦 Instalación en Termux

```bash
pkg update && pkg upgrade -y
pkg install nodejs git -y
git clone https://github.com/zapoteco1212/TOJIBOT.git
cd TOJIBOT
npm install

# Iniciar con código
node index.js --code

# Iniciar con QR
node index.js --qr
