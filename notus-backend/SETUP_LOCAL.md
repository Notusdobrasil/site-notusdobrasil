# 🏠 Setup Backend Local - Guia Completo

Este backend servirá **APENAS** a área administrativa (login, gerenciamento de vagas).
Os formulários (newsletter, contato, garantia, currículo) continuam usando o Render.

## 📋 Pré-requisitos

1. ✅ Node.js instalado (já tem)
2. ✅ SQL Server acessível na rede local (já tem)
3. ⚠️ IP fixo ou DNS dinâmico configurado
4. ⚠️ Porta aberta no roteador

## 🚀 Passo 1: Configurar DNS/IP

### Opção A: Usar IP Fixo (Recomendado)
1. Configure IP fixo no seu servidor/PC
2. Anote o IP público: https://www.whatismyip.com/
3. Configure port forwarding no roteador:
   ```
   Porta Externa: 3000
   Porta Interna: 3000
   IP Interno: [IP do seu servidor]
   Protocolo: TCP
   ```

### Opção B: DNS Dinâmico Gratuito
1. Crie conta no No-IP: https://www.noip.com/
2. Crie um hostname: `notus-backend.ddns.net` (exemplo)
3. Instale o cliente No-IP no servidor
4. Configure port forwarding igual opção A

## 🔧 Passo 2: Configurar .env

Certifique-se que o `.env` está configurado:

```env
PORT=3000

# SQL Server (já configurado)
SQL_SERVER=192.168.77.150\idealsql
SQL_DATABASE_ACESSO=Acesso_Duplicado
SQL_USERNAME=consulta
SQL_PASSWORD=consulta123-

# CORS - Adicionar domínio do site
# (já configurado no código)

# Session Secret
SESSION_SECRET=sua-chave-secreta-aleatoria-aqui
```

## ▶️ Passo 3: Rodar Backend

### Windows - Rodar como Serviço (Sempre ativo)

**Instalar PM2 (Gerenciador de Processos):**
```powershell
npm install -g pm2
npm install -g pm2-windows-startup
```

**Configurar para iniciar com Windows:**
```powershell
cd C:\Users\bruno.acioli\Workspace\site-notusdobrasil\notus-backend
pm2 start index.js --name notus-backend
pm2 save
pm2-startup install
```

**Comandos úteis:**
```powershell
pm2 status          # Ver status
pm2 logs            # Ver logs em tempo real
pm2 restart notus-backend
pm2 stop notus-backend
```

### Alternativa: Rodar Manualmente
```powershell
cd notus-backend
node index.js
```

## 🌐 Passo 4: Atualizar Frontend

No arquivo `admin/js/scripts.js`, linha 17, substitua:
```javascript
window.API_BASE_URL = "http://SEU_IP_OU_DOMINIO:3000";
```

Por uma dessas opções:

**Se usar IP fixo:**
```javascript
window.API_BASE_URL = "http://200.123.45.67:3000";
```

**Se usar domínio No-IP:**
```javascript
window.API_BASE_URL = "http://notus-backend.ddns.net:3000";
```

**Se configurar subdomínio próprio:**
```javascript
window.API_BASE_URL = "https://backend.notus.ind.br";
```

## 🔒 Passo 5: SSL/HTTPS (Opcional mas Recomendado)

### Opção A: Certificado Let's Encrypt (Gratuito)

**1. Instalar Certbot:**
```powershell
choco install certbot
```

**2. Obter certificado:**
```bash
certbot certonly --standalone -d backend.notus.ind.br
```

**3. Configurar no código (index.js):**
```javascript
const https = require('https');
const fs = require('fs');

const options = {
  key: fs.readFileSync('C:/Certbot/live/backend.notus.ind.br/privkey.pem'),
  cert: fs.readFileSync('C:/Certbot/live/backend.notus.ind.br/fullchain.pem')
};

https.createServer(options, app).listen(443);
```

### Opção B: Usar Cloudflare Tunnel (SSL automático)
1. Instale Cloudflare Tunnel
2. Zero configuração de porta/firewall
3. SSL automático

## ✅ Passo 6: Testar

**1. Teste local:**
```
http://localhost:3000/api/admin/session
```

**2. Teste externo:**
```
http://SEU_IP:3000/api/admin/session
```

**3. Teste admin:**
```
https://notus.ind.br/admin/
```

## 📊 Monitoramento

Ver logs em tempo real:
```powershell
pm2 logs notus-backend
```

Ver uso de recursos:
```powershell
pm2 monit
```

## 🆘 Troubleshooting

### Erro: "Cannot connect to backend"
- ✅ Backend está rodando? (`pm2 status`)
- ✅ Porta 3000 aberta no firewall Windows?
- ✅ Port forwarding configurado no roteador?
- ✅ IP correto no frontend?

### Erro: "SQL Server connection failed"
- ✅ SQL Server está rodando?
- ✅ IP do SQL Server correto no .env?
- ✅ Credenciais corretas?

### Erro: "CORS blocked"
- ✅ `notus.ind.br` está na lista CORS? (já está no código)

## 📞 Suporte

Se tiver problemas, verifique:
1. Logs: `pm2 logs notus-backend`
2. Firewall Windows
3. Configurações do roteador
4. DNS/IP acessível externamente

---
**Backend Híbrido Configurado! 🎉**
- Admin → Backend Local (SQL Server)
- Forms → Backend Render (sem SQL)
