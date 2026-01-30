@echo off
echo ========================================
echo  Vercel Deployment Setup
echo ========================================
echo.

echo Checking if Vercel CLI is installed...
where vercel >nul 2>nul

if %errorlevel% neq 0 (
    echo.
    echo Vercel CLI not found!
    echo.
    echo Installing Vercel CLI globally...
    echo This may take a few minutes...
    echo.
    npm install -g vercel
    
    if %errorlevel% neq 0 (
        echo.
        echo Failed to install Vercel CLI.
        echo Please check your npm installation.
        pause
        exit /b 1
    )
    
    echo.
    echo Vercel CLI installed successfully!
)

echo.
echo Vercel CLI is ready!
echo.

:menu
echo ========================================
echo  Deployment Options
echo ========================================
echo.
echo 1. Login to Vercel
echo 2. Deploy to Preview
echo 3. Deploy to Production
echo 4. View Deployment Logs
echo 5. Exit
echo.
set /p choice="Select option (1-5): "

if "%choice%"=="1" goto login
if "%choice%"=="2" goto deploy_preview
if "%choice%"=="3" goto deploy_prod
if "%choice%"=="4" goto logs
if "%choice%"=="5" goto end
goto menu

:login
echo.
echo ========================================
echo  Login to Vercel
echo ========================================
echo.
echo This will open a browser window.
echo Please authorize the Vercel CLI.
echo.
pause
vercel login
echo.
echo Login complete!
echo.
pause
goto menu

:deploy_preview
echo.
echo ========================================
echo  Deploy to Preview
echo ========================================
echo.
echo Deploying to preview environment...
echo This creates a unique URL for testing.
echo.
vercel

if %errorlevel% equ 0 (
    echo.
    echo ========================================
    echo  Preview Deployment Complete!
    echo ========================================
    echo.
    echo Your preview is ready!
    echo Check the URL above to test your game.
    echo.
    echo When you're ready, deploy to production (Option 3)
    echo.
) else (
    echo.
    echo Deployment failed!
    echo Please check the errors above.
    echo.
)
pause
goto menu

:deploy_prod
echo.
echo ========================================
echo  Deploy to Production
echo ========================================
echo.
echo This will deploy to your live production URL.
echo.
set /p confirm="Are you sure? (y/n): "

if /i not "%confirm%"=="y" (
    echo Cancelled.
    pause
    goto menu
)

echo.
echo Deploying to production...
echo.
vercel --prod

if %errorlevel% equ 0 (
    echo.
    echo ========================================
    echo  PRODUCTION DEPLOYMENT COMPLETE!
    echo ========================================
    echo.
    echo Your game is now LIVE!
    echo.
    echo Share your game with the world!
    echo.
    echo To update documentation with your URL:
    echo 1. Copy your production URL
    echo 2. Update README.md with the live demo link
    echo 3. Commit and push the changes
    echo.
) else (
    echo.
    echo Production deployment failed!
    echo Please check the errors above.
    echo.
)
pause
goto menu

:logs
echo.
echo ========================================
echo  Deployment Logs
echo ========================================
echo.
vercel logs
echo.
pause
goto menu

:end
echo.
echo ========================================
echo  Deployment Complete
echo ========================================
echo.
echo Your Grudge Warlords game is deployed!
echo.
echo Useful Commands:
echo - vercel           : Deploy to preview
echo - vercel --prod    : Deploy to production
echo - vercel logs      : View deployment logs
echo - vercel list      : List all deployments
echo.
echo Visit Vercel Dashboard: https://vercel.com/dashboard
echo.
pause
exit
