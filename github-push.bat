@echo off
echo 初始化 Git 仓库...
git init
git add .
git commit -m "feat: init drama-talk community project"
echo.
echo ========================================================
echo 本地 Git 仓库初始化并提交完成！
echo ========================================================
echo.
echo 接下来你可以使用 GitHub CLI 或网页创建仓库并推送：
echo 1. gh repo create drama-talk --public --source=. --remote=origin --push
echo 或
echo 2. git remote add origin ^<你的仓库地址^>
echo    git branch -M main
echo    git push -u origin main
pause