#!/bin/bash

# 执行构建命令
pnpm run build

# 设置工作目录为当前脚本所在目录
cd "$(dirname "$0")"

# 循环提示用户输入，直到输入正确为止
while true; do
    read -p "Whether to deploy to a server? (Y/N): " deployFlag

    # 获取用户输入的第一个字符并转换为大写
    deployFlag=$(echo "$deployFlag" | tr '[:lower:]' '[:upper:]' | cut -c1)

    # 检查用户输入并执行相应操作
    if [ "$deployFlag" = "Y" ]; then
        echo "Start deploy..."
        ssh c-tx "rm -rf /itwxe/blog/dist"
        scp -r ../dist c-tx:/itwxe/blog/
        echo "Deploy completed."
        break  # 跳出循环
    elif [ "$deployFlag" = "N" ]; then
        echo "End deploy."
        break  # 跳出循环
    else
        echo "Invalid input, please enter Y or N."
    fi
done
