@echo off

call pnpm run build

cd /d "%~dp0"

setlocal

:prompt
set /p deployFlag=Whether to deploy to a server? (Y/N):

set deployFlag=%deployFlag:~0,1%

if /i "%deployFlag%"=="Y" (
    echo Start deploy...
    ssh c-tx "rm -rf /itwxe/blog/dist"
    scp -r ../dist c-tx:/itwxe/blog/
    echo Deploy completed.
    goto end
) else if /i "%deployFlag%"=="N" (
    echo End deploy...
    goto end
) else (
    echo Invalid input, please enter Y or N.
    goto prompt
)

:end
pause
endlocal