# 🚀 Deploy NOW - Quick Start

## 🎯 Three Ways to Deploy

### ⚡ Method 1: One Command (Easiest!)

```powershell
.\DEPLOY-ALL.bat
```

This script will:
- ✅ Commit your changes
- ✅ Push to GitHub
- ✅ Deploy to Vercel
- ✅ Show you the live URL

**That's it!** Follow the prompts.

---

### 🎮 Method 2: Step by Step

#### Step 1: Push to GitHub

```powershell
.\SETUP-GITHUB.bat
```

- Create repository at: https://github.com/new
- Name it: `GrudgeWarlords`
- Follow the script prompts

#### Step 2: Deploy to Vercel

```powershell
.\SETUP-VERCEL.bat
```

- Login when prompted
- Select "Deploy to Production"
- Done!

---

### 💻 Method 3: Manual Commands

```powershell
# 1. Create GitHub repo at: https://github.com/new

# 2. Add remote (replace YOUR_USERNAME)
git remote add origin https://github.com/YOUR_USERNAME/GrudgeWarlords.git

# 3. Push to GitHub
git add -A
git commit -m "Deploy Grudge Warlords"
git push -u origin master

# 4. Deploy to Vercel
npm install -g vercel
vercel login
vercel --prod
```

---

## ✅ After Deployment

Your game will be live at:
- **Vercel**: `https://grudge-warlords-xxxx.vercel.app`
- **GitHub**: `https://github.com/YOUR_USERNAME/GrudgeWarlords`

### Test Your Game

1. Open the Vercel URL
2. Character selection should load
3. Try selecting different characters
4. Click "START GAME"
5. Test the game!

---

## 🎊 You're Done!

Share your game:
```
🎮 Play Grudge Warlords: [YOUR_VERCEL_URL]
⭐ GitHub: [YOUR_GITHUB_URL]
```

---

## 🔧 Update Later

After making changes:

```powershell
# Quick update
git add -A
git commit -m "Update game"
git push
vercel --prod
```

Or just run:
```powershell
.\DEPLOY-ALL.bat
```

---

## 📞 Need Help?

- **GitHub Issues**: https://github.com/YOUR_USERNAME/GrudgeWarlords/issues
- **Vercel Docs**: https://vercel.com/docs
- **Check**: `DEPLOYMENT-GUIDE.md` for detailed help

---

**Ready? Run:** `.\DEPLOY-ALL.bat` 🚀
