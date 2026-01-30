@echo off
echo ========================================
echo  GitHub Repository Setup
echo ========================================
echo.
echo This script will help you:
echo 1. Configure your GitHub remote
echo 2. Push your code to GitHub
echo.
echo First, create your repository on GitHub:
echo https://github.com/new
echo.
echo Repository Settings:
echo - Name: GrudgeWarlords
echo - Description: 3D Action RPG with 7 playable character races
echo - Visibility: Public or Private (your choice)
echo - DO NOT initialize with README, .gitignore, or license
echo.
pause
echo.

:get_username
set /p username="Enter your GitHub username: "
if "%username%"=="" (
    echo Username cannot be empty!
    goto get_username
)

echo.
echo Adding remote: https://github.com/%username%/GrudgeWarlords.git
git remote add origin https://github.com/%username%/GrudgeWarlords.git

if %errorlevel% neq 0 (
    echo.
    echo Remote already exists. Updating...
    git remote set-url origin https://github.com/%username%/GrudgeWarlords.git
)

echo.
echo Verifying remote...
git remote -v

echo.
echo ========================================
echo  Ready to Push
echo ========================================
echo.
echo Your repository is configured!
echo.
echo IMPORTANT: Make sure you've created the repository on GitHub first!
echo Visit: https://github.com/%username%/GrudgeWarlords
echo.
echo If you haven't created it yet:
echo 1. Press Ctrl+C to cancel
echo 2. Go to https://github.com/new
echo 3. Create the repository
echo 4. Run this script again
echo.
set /p confirm="Ready to push? (y/n): "

if /i not "%confirm%"=="y" (
    echo Cancelled. Create your GitHub repository and run this script again.
    pause
    exit /b
)

echo.
echo ========================================
echo  Pushing to GitHub
echo ========================================
echo.
echo This may take a few minutes...
echo.

git push -u origin master

if %errorlevel% equ 0 (
    echo.
    echo ========================================
    echo  SUCCESS!
    echo ========================================
    echo.
    echo Your code is now on GitHub!
    echo View it at: https://github.com/%username%/GrudgeWarlords
    echo.
    echo Next step: Deploy to Vercel
    echo Run: SETUP-VERCEL.bat
    echo.
) else (
    echo.
    echo ========================================
    echo  AUTHENTICATION REQUIRED
    echo ========================================
    echo.
    echo If you got an authentication error:
    echo.
    echo Option 1: Use Personal Access Token
    echo 1. Go to: https://github.com/settings/tokens
    echo 2. Click "Generate new token (classic)"
    echo 3. Give it a name: GrudgeWarlords
    echo 4. Select scope: repo (all)
    echo 5. Generate and copy the token
    echo 6. Run this script again
    echo 7. Use token as password when prompted
    echo.
    echo Option 2: Use GitHub CLI
    echo 1. Install: winget install --id GitHub.cli
    echo 2. Run: gh auth login
    echo 3. Run this script again
    echo.
)

pause
