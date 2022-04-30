---
title: 04.DockerFile构建镜像
tags:
  - Docker
permalink: '/posts/be6627e1.html'
date: 2021-07-14 00:00:00
updated: 2021-07-14 00:00:00
---

# DockerFile构建镜像

> 作者：IT王小二
>
> 博客：[https://itwxe.com](https://itwxe.com/)

前面介绍了怎么通过容器生成镜像，这里来记录一下 DockerFile 构建镜像，学习参考来自 [菜鸟教程](https://www.runoob.com/docker/docker-dockerfile.html) 。

## 一、DockerFile是什么

> Dockerfile 是一个用来构建镜像的文本文件，文本内容包含了一条条构建镜像所需的指令和说明。
>
> -- 摘自菜鸟教程

说人话就是 Docker 提供了一系列的指令，Docker 引擎可以通过这些指令来构建出镜像。

## 二、DockerFile指令

### 1 FORM

```bash
FORM 基础镜像
```

必须放在 DOckerfile 的第一行，表示从哪个 基础镜像 开始构建。

### 2 MAINTAINET

```bash
MAINTAINET 作者名称
```

指定维护者的信息。

### 3 COPY

```
COPY [--chown=<user>:<group>] <源路径1>... <目标路径>
COPY [--chown=<user>:<group>] ["<源路径1>",... "<目标路径>"]

[--chown=<user>:<group>]：可选参数，用户改变复制到容器内文件的拥有者和属组
<目标路径>：镜像内的指定路径，该路径不用事先建好，路径不存在的话，会自动创建
```

复制文件到镜像，例如：

```bash
COPY hom* /mydir/
COPY hom?.txt /mydir/
```

和 ADD 不一样的是源路径不能访问网络资源，也不会自动解压压缩包。

### 4 ADD

ADD 指令和 COPY 的使用格式一致（同样需求下，官方推荐使用 COPY）。功能也类似，不同之处如下：

- ADD 的优点：在执行 <源文件> 为 tar 压缩文件的话，压缩格式为 gzip, bzip2 以及 xz 的情况下，会自动复制并解压到 <目标路径>，源路径可以使用网络资源
- ADD 的缺点：在不解压的前提下，无法复制 tar 压缩文件。会令镜像构建缓存失效，从而可能会令镜像构建变得比较缓慢。具体是否使用，可以根据是否需要自动解压来决定

### 5 RUN

```bash
shell 格式：
	RUN <命令行命令>
	# <命令行命令> 等同于，在终端操作的 shell 命令

exec 格式：
    RUN ["可执行文件", "参数1", "参数2"]
    # RUN ["./test.sh", "param1", "param2"] 等价于 RUN ./test.sh param1 param2
```

**构建镜像时执行的命令，RUN用于在镜像容器中执行命令**

RUN指令创建的中间镜像会被缓存，并会在下次构建中使用。如果不想使用这些缓存镜像，可以在构建时指定 `--no-cache` 参数，如：`docker build --no-cache` 。

同时为了使构建出来的镜像的文件层数尽量小，shell 命令最好一次执行多条，使用 `&&` 连接，例如：`mkdir data && cd data` 。

### 6 CMD

```bash
CMD <shell 命令> 
CMD ["<可执行文件或命令>","<param1>","<param2>",...]
CMD ["<param1>","<param2>",...]  # 该写法是为 ENTRYPOINT 指令指定的程序提供默认参数
```

**类似于 RUN 指令，但是 CMD 是容器启动时执行的命令**，并且定义多个 CMD 命令的时候，仅最后一个会生效。

菜鸟教程中指出，推荐使用第二种，第一种格式实际上在运行的过程中也会自动转换成第二种格式运行，并且默认可执行文件是 sh。

### 7 ENTRYPOINT

```
ENTRYPOINT ["<executeable>","<param1>","<param2>",...]
```

类似于 CMD 指令，但其不会被 docker run 的命令行参数指定的指令所覆盖，而且这些命令行参数会被当作参数送给 ENTRYPOINT 指令指定的程序。

但是, 如果运行 docker run 时使用了 `--entrypoint` 选项，将覆盖 CMD 指令指定的程序。

在执行 docker run 的时候可以指定 ENTRYPOINT 运行所需的参数。

和 CMD 类似，如果 Dockerfile 中如果存在多个 ENTRYPOINT 指令，仅最后一个生效。

可以搭配 CMD 命令使用：一般是变参才会使用 CMD ，这里的 CMD 等于是在给 ENTRYPOINT 传参。

#### 示例：

假设已通过 Dockerfile 构建了 nginx:test 镜像：

```bash
FROM nginx

ENTRYPOINT ["nginx", "-c"] # 定参
CMD ["/etc/nginx/nginx.conf"] # 变参 
```

1、不传参运行。

```bash
docker run nginx:test
```

容器内会默认运行以下命令，启动主进程。

```bash
nginx -c /etc/nginx/nginx.conf
```

2、传参运行。

```bash
docker run nginx:test -c /etc/nginx/new.conf
```

容器内会默认运行以下命令，启动主进程(/etc/nginx/new.conf:假设容器内已有此文件)。

```bash
nginx -c /etc/nginx/new.conf
```

### 8 EXPOSE

```bash
EXPOSE <端口1> [<端口2>...]
```

告诉Docker服务端暴露端口，在容器启动时需要通过 -p 做端口映射。

### 9 EVN

```bash
ENV <key>=<value>
```

设置环境变量，定义了环境变量，那么在后续的指令中，就可以使用这个环境变量。

### 10 WORKDIR

```bash
WORKDIR <工作目录路径>
```

指定工作目录。用 WORKDIR 指定的工作目录，会在构建镜像的每一层中都存在。

WORKDIR 指定的工作目录，必须是提前创建好的。

### 11 USER

```bash
USER <用户名>[:<用户组>]
```

用于指定执行后续命令的用户和用户组，这边只是切换后续命令执行的用户（用户和用户组必须提前已经存在）。

### 12 VOLUME

```bash
VOLUME ["<路径1>", "<路径2>"...]
VOLUME <路径>
```

定义匿名数据卷。在启动容器时忘记挂载数据卷，会自动挂载到匿名卷，通常用于 MySQL 等保存需要持久化数据，启动容器时也可以通过 -v 挂载。

## 三、演示例子

1、创建目录，下载好编译好的 jdk 文件上传，项目 jar 包上传。

```bash
mkdir /itwxe/DockerFile && cd /itwxe/DockerFile
```

2、创建 Dockerfile 文件，**名字必须叫 Dockerfile**，添加内容。

```bash
vim Dockerfile

# 添加内容，为了尽量多使用点指令，基于 centos 镜像来演示，当然如果为了运行 jar 当然首选 openjdk 为基础镜像

# 基础镜像是 centos
FROM centos
# 维护者 itwxe
MAINTAINER itwxe
# 复制JDK
COPY jdk1.8.0_202 jdk1.8.0_202
# 将项目的添加到镜像中
COPY sunny-admin.jar docker-sunny.jar
# 配置jdk环境
ENV JAVA_HOME=/jdk1.8.0_202
ENV PATH=$JAVA_HOME/bin:$PATH
ENV CLASSPATH=.:$JAVA_HOME/lib:$JRE_HOME/lib
# 容器对外提供服务的端口是 9002
EXPOSE 9002
# 启动容器后启动app.jar的应用
ENTRYPOINT ["java","-jar","docker-sunny.jar"]
```

3、注意目录结构

![DockerFile目录结构](https://img.itwxe.com/i/2021/08/ded31b3a7d322.png)

4、编译并生成镜像

其中 `.` 代表上下文路径，该目录下的文件都会打包进镜像，我们的 jdk 和 jar 包就是都放在这个目录下，当需要 COPY 等操作时都是从这个目录下查找。

```bash
docker build -t itwxe/sunny-admin .
```

打包过程如下，可以看到镜像创建成功。

![编译并生成镜像](https://img.itwxe.com/i/2021/08/f8b06839cacc6.png)

5、创建容器运行看下，项目是否正常。

```bash
docker run -d --name sunny -p 9002:9002 itwxe/sunny-admin
```

![dockerfile项目运行结果](https://img.itwxe.com/i/2021/08/71c2112e3e05f.png)

可以看到项目正常运行，这是我自己写的一个基础应用框架，该有的基础都有了，就差业务开发了，以后准备写一个系列搭建教程，找个好一点的方向。

至此就成功通过 Dockerfile 创建镜像并运行了，但是这种方式过于麻烦，需要上传 jar 包到 Docker 环境，而作为一个 Java 程序员，当然不想使用这么麻烦的打包方式，下一篇开始通过 maven 插件一键打包 SpringBoot 镜像并发布到服务器。

> 都读到这里了，来个 **点赞、评论、关注、收藏** 吧！
