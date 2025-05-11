#!/bin/bash

# 定义服务器选项数组
options=(
    "dev - root@dev.swlws.site"
    "prod - root@swlws.site"
)

# 显示服务器列表
echo "可用的服务器列表（共 ${#options[@]} 个）："
PS3="请选择目标服务器 [1-${#options[@]}]: "

# 使用 select 进行选择
select choice in "${options[@]}"; do
    if [ -n "$choice" ]; then
        # 解析选择的服务器信息
        SERVER_KEY=$(echo $choice | cut -d'-' -f1 | xargs)
        REMOTE_HOST=$(echo $choice | cut -d'-' -f2 | xargs)
        break
    else
        echo "错误：无效的选择，请输入 1 到 ${#options[@]} 之间的数字"
    fi
done

echo "已选择服务器: $REMOTE_HOST ($SERVER_KEY)"

# 定义远程服务器信息
REMOTE_PATH="/root/e-recycle-web"
DIST_ZIP="dist.zip"

# 打包前端代码
echo "开始打包前端代码..."
npm run build
# 压缩打包后的代码
echo "开始压缩打包后的代码..."
zip -r $DIST_ZIP dist

# 远程服务器删除旧代码
ssh $REMOTE_HOST "rm -rf $REMOTE_PATH && \
    mkdir -p $REMOTE_PATH"

# 上传压缩包到远程服务器
echo "开始上传压缩包到远程服务器..."
scp $DIST_ZIP $REMOTE_HOST:$REMOTE_PATH

# 远程服务器执行部署脚本
echo "开始远程服务器执行部署脚本..."
ssh $REMOTE_HOST "cd $REMOTE_PATH && \
    unzip $DIST_ZIP && \
    mv dist/* $REMOTE_PATH && \
    rm -rf dist*"
# 删除本地的压缩包
echo "开始删除本地的压缩包..."
rm $DIST_ZIP
echo "部署完成！"