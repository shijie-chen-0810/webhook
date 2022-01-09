#!/bin/bash
WORK_PATH='/dockerprojects/antd-pro-project-fe'
cd $WORK_PATH
echo "清楚老代码"
git reset --hard origin/master
git clean -f
echo "拉去新代码"
git pull origin master
echo "开始拉去新的依赖"
npm install
echo "开始打包"
npm run build
echo "开始构建"
docker build -t front:1.0 .
echo "停止旧容器并删除旧容器"
docker stop front-container
docker rm front-container
echo "启动新容器"
docker container run -p 80:80 --name front-container -d front:1.0