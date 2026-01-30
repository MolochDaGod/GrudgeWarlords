@echo off
color 0A
echo.
echo ========================================
echo   GRUDGE WARLORDS - MASTER DEPLOYMENT
echo ========================================
echo.
echo This script will:
echo 1. Commit all changes to Git
echo 2. Push to GitHub
echo 3. Deploy to Vercel
echo.
echo Make sure you have:
echo - Created GitHub repository
echo - Installed Vercel CLI (or will install now)
echo.
pause
echo.

:check_git_remote
echo ========================================
echo  Step 1: Check Git Configuration
echo ========================================
echo.

git remote -v > nul 2>&1
if %errorlevel% equ 0 (
    echo Git remote found:
    git remote -v
    echo.
    set /p use_existing="Use this remote? (y/n): "
    if /i not "%use_existing%"=="y" (
        call SETUP-GITHUB.bat
    )
) else (
    echo No Git remote configured.
    echo.
    set /p setup_github="Setup GitHub now? (y/n): "
    if /i "%setup_github%"=="y" (
        call SETUP-GITHUB.bat
    ) else (
        echo.
        echo Cannot proceed without GitHub remote.
        echo Run SETUP-GITHUB.bat first.
        pause
        exit /b 1
    )
)

:commit_changes
echo.
echo ========================================
echo  Step 2: Commit Changes
echo ========================================
echo.

git status --short
if %errorlevel% equ 0 (
    echo.
    echo Current changes shown above.
    echo.
    set /p has_changes="Commit these changes? (y/n): "
    if /i "%has_changes%"=="y" (
        set /p commit_msg="Enter commit message (default: 'Update and deploy'): "
        if "%commit_msg%"=="" set commit_msg=Update and deploy
        
        echo.
        echo Staging all changes...
        git add -A
        
        echo.
        echo Committing...
        git commit -m "%commit_msg%

Co-Authored-By: Warp <agent@warp.dev>"
        
        if %errorlevel% equ 0 (
            echo.
            echo Changes committed successfully!
        ) else (
            echo.
            echo No changes to commit or commit failed.
        )
    )
)

:push_github
echo.
echo ========================================
echo  Step 3: Push to GitHub
echo ========================================
echo.

set /p do_push="Push to GitHub? (y/n): "
if /i "%do_push%"=="y" (
    echo.
    echo Pushing to GitHub...
    git push
    
    if %errorlevel% equ 0 (
        echo.
        echo Successfully pushed to GitHub!
    ) else (
        echo.
        echo Push failed!
        echo.
        echo Common issues:
        echo - Authentication required (use Personal Access Token)
        echo - Repository doesn't exist on GitHub
        echo - No internet connection
        echo.
        echo Try running SETUP-GITHUB.bat for help.
        pause
        
        set /p retry="Continue to Vercel deployment anyway? (y/n): "
        if /i not "%retry%"=="y" (
            exit /b 1
        )
    )
)

:deploy_vercel
echo.
echo ========================================
echo  Step 4: Deploy to Vercel
echo ========================================
echo.

where vercel >nul 2>nul
if %errorlevel% neq 0 (
    echo Vercel CLI not installed.
    echo Installing now...
    npm install -g vercel
)

echo.
echo Vercel Deployment Options:
echo 1. Deploy to Preview (test first)
echo 2. Deploy to Production (live)
echo 3. Skip Vercel deployment
echo.
set /p vercel_choice="Select option (1-3): "

if "%vercel_choice%"=="1" (
    echo.
    echo Deploying to Vercel Preview...
    vercel
) else if "%vercel_choice%"=="2" (
    echo.
    echo Deploying to Vercel Production...
    vercel --prod
) else (
    echo.
    echo Skipping Vercel deployment.
    echo You can deploy later with: vercel --prod
)

:complete
echo.
echo ========================================
echo  DEPLOYMENT COMPLETE!
echo ========================================
echo.
echo What was done:
echo - Changes committed to Git
echo - Code pushed to GitHub
echo - Game deployed to Vercel
echo.
echo Your game is now live!
echo.
echo Next steps:
echo 1. Test your live game
echo 2. Share the URL
echo 3. Update README with live demo link
echo.
echo Useful commands:
echo - npm start          : Run locally
echo - git push          : Update GitHub
echo - vercel --prod     : Update live site
echo.

:show_urls
echo ========================================
echo  Your Project URLs
echo ========================================
echo.

git remote get-url origin > nul 2>&1
if %errorlevel% equ 0 (
    for /f "delims=" %%i in ('git remote get-url origin') do set github_url=%%i
    echo GitHub: %github_url%
    echo.
)

echo Vercel Dashboard: https://vercel.com/dashboard
echo.
echo Open these URLs to view your deployed game!
echo.

pause
exit /b 0
