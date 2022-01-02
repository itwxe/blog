---
title: Linux(CentOS7)安装Redis5.0
tags:
  - Linux
  - Redis
permalink: '/posts/c162db60.html'
date: 2019-11-02 14:16:00
updated: 2019-11-02 14:16:00
---

# Linux(CentOS7)安装Redis5.0

> 作者：IT王小二
>
> 博客：[https://itwxe.com](https://www.itwxe.com/)

记录一下自己在 Linux(CentOS 7) 下安装 Redis5.0.8 过程。

## 一、准备工作

### 1. 下载Redis

从 [Redis官网](https://redis.io/download) 下载后上传CentOS目录 `/usr/local` ，当然，你也可以使用 wget 命令下载。

### 2. 安装编译环境

```bash
yum -y install gcc-c++
```

### 3. 开放访问端口

如果需要远程访问，需要打开访问端口，云服务器还需控制台配置安全组访问。

```bash
# 查看想开的端口是否已开,若此提示FirewallD is not running, 表示为不可知的防火墙 需要查看状态并开启防火墙, 如果是云服务器还需要去控制台配置安全组访问
firewall-cmd --query-port=6379/tcp

# 开启端口, success代表成功
firewall-cmd --add-port=6379/tcp --permanent
# 刷新配置, 使配置生效
firewall-cmd --reload
```

## 二、安装及配置Redis

### 1. 安装Redis

```bash
# 解压
cd /usr/local
tar -zxvf redis-5.0.8.tar.gz

# 编译Redis
cd redis-5.0.8
make

# 在`/usr/local/`下创建多个文件夹
mkdir -p /usr/local/redis/{etc,data}

# 安装Redis, 将Redis安装在/usr/local/redis目录下
make PREFIX=/usr/local/redis install

# 复制redis.conf配置文件到/usr/local/redis/etc目录下
cp redis.conf /usr/local/redis/etc

# 添加环境变量, 任何目录下都可以使用redis-server、redis-cli等等
vim /etc/profile
# 最后面添加
export PATH=$PATH:/usr/local/redis/bin

# wq保存修改后刷新文件
source /etc/profile
```

### 2. 修改配置文件

```bash
# 复制配置文件到/usr/local/redis/etc目录下
cp redis.conf /usr/local/redis/etc/

# 打开配置文件
cd /usr/local/redis/etc
vim redis.conf

# 修改后台启动, 默认为daemonize no, 修改为daemonize yes
daemonize yes

# 客户端闲置多长时间后断开连接, 默认为0关闭此功能
timeout 0

# 设置密码, 默认被注释, 取消注释修改为自定义密码(我的是123456)
requirepass 123456

# 监听ip, 允许访问的ip, 默认为127.0.0.1, 修改为0.0.0.0(允许所有服务器ip访问)或者注释掉
bind 0.0.0.0

# 指定监听端口, 默认为6379, 此处我保持默认
port 6379

# 是否开启AOF持久化，默认为no
appendonly yes

# 修改AOF及RBD存放路径, 默认为./, 修改为/usr/local/redis/data
dir /usr/local/redis/data

# 修改log存放路径, 默认为"", 修改为"/usr/local/redis/data/redis_6379.log"
logfile "/usr/local/redis/data/redis_6379.log"
```

### 3. 启动Redis

这里碰了个坑，开始没指定配置文件启动，然后远程连接不上。

```bash
# 启动
redis-server /usr/local/redis/etc/redis.conf

# 查看Redis是否启动
ps -ef | grep redis

# CentOS本地查看
redis-cli
# 输入配置密码即可
auth 123456

# 远程则自行使用工具查看
```

### 4. 添加系统服务与开机自启

这时候 Redis 每次重启还不能自动启动，需要把他设置为自启。

添加文件：

```
# 新建文件
vim /lib/systemd/system/redis.service

# 添加内容
[Unit]
Description=redis.server
After=network.target

[Service]
Type=forking
PIDFILE=/var/run/redis_6379.pid
ExecStart=/usr/local/redis/bin/redis-server /usr/local/redis/etc/redis.conf
ExecRepload=/bin/kill -s HUP $MAINPID
ExecStop=/bin/kill -s QUIT $MAINPID
PrivateTmp=true

[Install]
WantedBy=multi-user.target
```

保存文件之后，可以使用systemctl来管理了，使用 `systemctl enable redis.service` 开启自动重启，然后重启查看效果。

```bash
# 启动redis服务
systemctl start redis.service

# 停止redis服务
systemctl stop redis.service

# 重启redis服务
systemctl restart redis.service

# 查看redis服务当前状态
systemctl status redis.service

# 设置redis服务开机自启动
systemctl enable redis.service

# 停止redis服务开机自启动
systemctl disable redis.service
```

> 都读到这里了，来个 **点赞、评论、关注、收藏** 吧！

