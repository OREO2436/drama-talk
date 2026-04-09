@echo off
echo ========================================================
echo 剧圈 / DramaTalk 启动脚本
echo ========================================================
echo.
echo 正在安装依赖 (npm install)...
call npm install
echo.
echo 正在启动开发服务器 (npm run dev)...
call npm run dev
pause
