---
title: 02.CentOS7安装Docker初体验
tags:
  - Docker
permalink: '/posts/ca1638ad.html'
date: 2021-07-09 00:00:00
updated: 2021-07-09 00:00:00
---

# CentOS7安装Docker初体验

> 作者：IT王小二
>
> 博客：[https://itwxe.com](https://www.itwxe.com/)

## 一、安装Docker

1、安装依赖。

```bash
yum -y install yum-utils device-mapper-persistent-data lvm2
```
2、配置安装 Docker 的仓库为阿里云。

```bash
yum-config-manager --add-repo http://mirrors.aliyun.com/docker-ce/linux/centos/docker-ce.repo
```

```bash
yum clean all && yum makecache fast
```

3、安装 Docker，安装最新版 Docker 或安装指定版本 Docker，此处我使用的指定版本安装。

```bash
# 安装最新版Docker
yum -y install docker-ce

# 安装指定版本Docker，查看可安装版本使用`yum list docker-ce --showduplicates | sort -r`查看
yum -y install docker-ce-18.09.9 docker-ce-cli-18.09.9 containerd.io
```

4、国内访问 Docker 仓库过慢，配置国内镜像加速，使用腾讯云镜像加速。

```bash
sudo mkdir -p /etc/docker
sudo tee /etc/docker/daemon.json <<-'EOF'
{
  "registry-mirrors": ["https://mirror.ccs.tencentyun.com"]
}
EOF
sudo systemctl daemon-reload
sudo systemctl restart docker
```

当然你也可以配置阿里云镜像加速，阿里云为每个用户设定专属加速链接，注册阿里云后在控制台找到 容器镜像服务（阿里云容器镜像服务 -> 镜像加速器）

![配置阿里云镜像加速器](https://images.itwxe.com/images/2021/08/05/1e8a0390e0d7f.png)

5、启动 Docker。

如果执行了上面的 `systemctl restart docker` 命令，那么Docker服务就已经启动起来了。

6、`docker run hello-world` 测试一下 Docker 是否可以正常启动容器。

![hellor-world运行结果](https://images.itwxe.com/images/2021/08/05/012a77a71b75b.png)

## 二、一些命令

```bash
# 查看Docker版本
docker version
# Docker信息
docker info

# 启动Docker
systemctl start docker
# 停止Docker
systemctl stop docker
# 重启Docker
systemctl restart docker

# 设置Docker随系统启动
chkconfig docker on
```

> 都读到这里了，来个 **点赞、评论、关注、收藏** 吧！
