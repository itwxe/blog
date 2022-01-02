---
title: Linux(CentOS7)下安装jdk1.8
tags:
  - Linux
  - jdk
  - tomcat
permalink: '/posts/c74ad2a1.html'
date: 2019-08-02 00:00:00
updated: 2021-04-19 00:00:00
---

# Linux(CentOS7)下安装jdk1.8

> 作者：IT王小二
>
> 博客：[https://itwxe.com](https://itwxe.com/)

Linux(CentOS7) 下安装 jdk1.8 操作过程。

## 一、检查是否自带jdk

```bash
rpm -qa|grep java
```

如果存在则用下面命令删除，xxx yyy zzz代表查询出来的自带jdk名称，名称中间用空格隔开，至今为止没碰到过自带的。

```bash
rpm -e --nodeps xxx yyy zzz
```

## 二、下载jdk上传

推荐从 [jdk官网](https://www.oracle.com/java/technologies/oracle-java-archive-downloads.html) 下载，虽然下载需要登录(密码设置还麻烦)，并且下载速度不是很快，但是安全，此处使用 jdk8 的最后一个商业免费版本 [jdk-8u202-linux-x64.tar.gz](https://www.oracle.com/java/technologies/javase/javase8-archive-downloads.html#license-lightbox) 演示，下载之后上传Linux `/usr/local/src` 目录下。

## 三、安装jdk

### 1. 创建目录及解压到指定目录

```bash
mkdir -p /usr/local/java

tar -zxvf jdk-8u202-linux-x64.tar.gz -C /usr/local/java/
```

### 2. 配置环境变量

等待解压完成，编辑配置文件，配置环境变量。

```bash
vim /etc/profile
```

文件最下方添加：

```
# jdk配置
export JAVA_HOME=/usr/local/java/jdk1.8.0_202
export JRE_HOME=$JAVA_HOME/jre
export PATH=$JAVA_HOME/bin:$JRE_HOME/bin:$PATH
export CLASSPATH=$CLASSPATH:.:$JAVA_HOME/lib:$JRE_HOME/lib
```

保存退出，刷新配置。

```bash
source /etc/profile
```

### 3. 校验jdk配置是否成功

```bash
java -version
```

打印出如下 jdk 版本信息则配置成功。

```
java version "1.8.0_202"
Java(TM) SE Runtime Environment (build 1.8.0_202-b08)
Java HotSpot(TM) 64-Bit Server VM (build 25.202-b08, mixed mode)
```

> 都读到这里了，来个 **点赞、评论、关注、收藏** 吧！
