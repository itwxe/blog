---
title: 01.Linux单机安装RabbitMQ
tags:
  - RabbitMQ
permalink: '/posts/c5ec20ad'
date: 2020-06-08 00:00:00
updated: 2020-06-08 00:00:00
---

# Linux单机安装RabbitMQ

> 作者：IT王小二
>
> 博客：[https://itwxe.com](https://www.itwxe.com/)

## 一、准备工作

Linux版本：CentOS7
RabbitMQ版本：3.6.5

RabbitMQ 依赖 erlang 环境，所以需要下载好 RabbitMQ版本 对应的版本包，可以根据 [RabbitMQ官网](https://www.rabbitmq.com/) 选择需要使用对应版本下载，演示版本如下:

- Erlang: [erlang-18.3-1.el7](http://www.rabbitmq.com/releases/erlang/erlang-18.3-1.el7.centos.x86_64.rpm)
- Socat: [socat-1.7.3.2-5.el7](http://repo.iotti.biz/CentOS/7/x86_64/socat-1.7.3.2-5.el7.lux.x86_64.rpm)
- RabbitMQ：[rabbitmq-server-3.6.5-1](http://www.rabbitmq.com/releases/rabbitmq-server/v3.6.5/rabbitmq-server-3.6.5-1.noarch.rpm)

下载之后上传服务器。

## 二、安装

1、安装 Erlang 。

```bash
rpm -ivh erlang-18.3-1.el7.centos.x86_64.rpm
```

2、下载 socat 。

```bash
rpm -ivh socat-1.7.3.2-5.el7.lux.x86_64.rpm
```

3、安装 RabbitMQ，默认端口 5672。

```bash
rpm -ivh rabbitmq-server-3.6.5-1.noarch.rpm
```

4、启动 RabbitMQ。

```bash
service rabbitmq-server start
```

5、启用 web 管理插件，管理端口 15672 。

```bash
rabbitmq-plugins enable rabbitmq_management
```

6、查看 RabbitMQ 。

rabbitmq从3.3.0开始，默认用户guest只允许本机访问，即: `http://localhost:15672`，如果通过 `http://ip:port` 访问, 会发现Login failed 。

当然你可以创建用户，赋予权限来使用，但是如果要使用默认用户（username：guest，password：guest）登录，那么需要设置配置文件，配置文件在 `/etc/rabbitmq/rabbitmq.config`，如果没有这个文件则需要找到模板复制到这个目录。

```bash
find / -name "rabbitmq.config.example"
cp /usr/share/doc/rabbitmq-server-3.6.5/rabbitmq.config.example /etc/rabbitmq/
mv rabbitmq.config.example rabbitmq.config
```

修改配置文件内容。

```bash
vim rabbitmq.config
# 修改内容并保存，修改 {loopback_users, [<<"guest">>]} 为 {loopback_users, []}
# 重启服务
service rabbitmq-server restart
```

这时候就可以使用 `http://ip:port` 访问了。

## 三、其他命令

```bash
# 查看已有虚拟主机
rabbitmqctl list_vhosts

# 增加名为 uukongjian 的虚拟主机
rabbitmqctl add_vhost uukongjian

# 增加 SunnyBear 这个用户，设置密码为123456
rabbitmqctl add_user SunnyBear 123456

# 赋予 SunnyBear 这个用户 uukongjian 的虚拟主机权限
rabbitmqctl set_permissions -p uukongjian SunnyBear '.*' '.*' '.*'

# 赋予 SunnyBear 这个用户管理员权限
rabbitmqctl set_user_tags  SunnyBear administrator
```

> 都读到这里了，来个 **点赞、评论、关注、收藏** 吧！
