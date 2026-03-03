# 🚀 Quick Start - Backend Local

## ⚡ Setup Rápido (5 minutos)

### 1️⃣ Instalar PM2
```powershell
npm install -g pm2
```

### 2️⃣ Iniciar Backend
```powershell
cd notus-backend
pm2 start index.js --name notus-backend
pm2 save
```

### 3️⃣ Descobrir seu IP Público
Acesse: https://www.whatismyip.com/
Anote o IP (ex: `200.123.45.67`)

### 4️⃣ Configurar Port Forwarding no Roteador
- Porta Externa: **3000**
- Porta Interna: **3000**
- IP Interno: **[IP deste computador na rede local]**
- Protocolo: **TCP**

💡 Para descobrir IP local:
```powershell
ipconfig
# Procure por "Endereço IPv4" (ex: 192.168.1.100)
```

### 5️⃣ Atualizar URL no Frontend

Edite `admin/js/scripts.js` (linha ~17):
```javascript
window.API_BASE_URL = "http://200.123.45.67:3000"; // Seu IP aqui
```

### 6️⃣ Commit e Deploy
```powershell
git add -A
git commit -m "Update admin backend to local server"
git push origin main
```

### 7️⃣ Testar
- Local: http://localhost:3000/api/admin/session
- Externo: http://SEU_IP:3000/api/admin/session
- Admin: https://notus.ind.br/admin/

## 📋 Comandos Úteis

```powershell
pm2 status              # Ver status
pm2 logs notus-backend  # Ver logs
pm2 restart notus-backend
pm2 stop notus-backend
```

## 🆘 Problemas?

Veja [SETUP_LOCAL.md](SETUP_LOCAL.md) para guia completo.

---
**Pronto! Admin usa backend local, formulários continuam no Render** 🎉
