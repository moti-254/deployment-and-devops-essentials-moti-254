# Vercel Deployment Quick Start

## 5-Minute Setup

### What You Need
- ✅ Vercel account (free)
- ✅ GitHub repository with latest code
- ✅ Backend URL: `https://mern-chat-backend-nqem.onrender.com`

### Quick Steps

1. **Go to Vercel Dashboard**
   - https://vercel.com/dashboard
   - Click **"New Project"**

2. **Import Repository**
   - Click **"Import Project"**
   - Select your GitHub repository: `deployment-and-devops-essentials-moti-254`

3. **Configure**
   ```
   Root Directory: app/client
   Build Command: npm run build
   Output Directory: dist
   ```

4. **Add Environment Variable**
   ```
   Name: VITE_SOCKET_URL
   Value: https://mern-chat-backend-nqem.onrender.com
   ```

5. **Deploy!**
   - Click **"Deploy"**
   - Wait 2-3 minutes
   - Done! ✅

---

## Test It Works

1. Open your Vercel URL (looks like: `https://mern-chat-frontend-xxxxx.vercel.app`)
2. Login to your chat app
3. Send a message
4. Verify it works in real-time

---

## Automatic Future Deployments

Every time you push to GitHub:
```bash
git push origin main
# → Vercel automatically rebuilds and redeploys!
```

---

## Common Settings

| Setting | Value |
|---------|-------|
| Framework | Vite |
| Root Directory | app/client |
| Build Command | npm run build |
| Output Directory | dist |
| Node Version | 22.x (default) |

---

## Update Backend URL (if needed)

If you change your Render backend URL:

1. Go to Vercel Dashboard → Your Project
2. Go to **Settings** → **Environment Variables**
3. Update `VITE_SOCKET_URL`
4. Redeploy

---

## Need Help?

- Vercel Docs: https://vercel.com/docs
- Common Issues: https://vercel.com/docs/concepts/deployments/troubleshooting

Ready to deploy? Go to https://vercel.com/dashboard!
