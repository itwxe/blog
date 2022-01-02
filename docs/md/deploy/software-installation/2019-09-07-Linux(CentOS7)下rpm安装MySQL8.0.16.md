---
title: Linux(CentOS7)下rpm安装MySQL8.0.16
stags:
  - Linux
  - MySQL
permalink: '/posts/79382061.html'
date: 2019-09-07 00:00:00
updated: 2019-09-07 00:00:00
---

# Linux(CentOS7)下rpm安装MySQL8.0.16

> 作者：IT王小二
>
> 博客：[https://itwxe.com](https://itwxe.com/)

记录一下自己在 CentOS7 下 rpm 安装 MySQL8.0.16 的过程。

## 一、准备工作

### 1. 下载MySQL所需要的安装包

从 [MySQL官网](https://downloads.mysql.com/archives/community/) 下载，上传至 CentOS 系统 `/usr/local/MySQL` 目录下，当然你也可以使用 `wget` 命令直接下载至 CentOS，此处使用的 8.0.16 版本。

```bash
# 你想要的版本
Product Version: 8.0.16
# CentOS选择Red Hat Enterprise Linux / Oracle Linux
Operating System:OS Version: Red Hat Enterprise Linux / Oracle Linux
# CentOS7 64位选择
OS Version: Red Hat Enterprise Linux 7 / Oracle Linux 7 (x86, 64-bit)
```

然后下载rpm包(RPM Bundle)。

### 2. 检查是否存在自带mariadb

CentOS7 开始不自带 MySQL，替换成了 mariadb，但是我们安装 MySQL 的时候会冲突，所以需要先卸载 mariadb。

```bash
# 查找是否存在自带mariadb
rpm -qa | grep mariadb

# 如果存在则卸载, 比如我查找出来的名称为mariadb-libs-5.5.60-1.el7_5.x86_64
rpm -e mariadb-libs-5.5.60-1.el7_5.x86_64 --nodeps
```

### 3. 检查是否安装过MySQL

```bash
# 检查是否安装过mysql
rpm -qa | grep mysql

# 如果存在则卸载, 比如名称为mysql-libs-5.1.52.x86_64
rpm -e mysql-libs-5.1.52.x86_64 --nodeps
```

### 4. 检查mysql组及用户是否存在，不存在则创建

```bash
# 检查
cat /etc/group | grep mysql
cat /etc/passwd | grep mysql

# 创建
groupadd mysql
useradd -r -g mysql mysql
```

### 5. 检查是否开启MySQL使用端口

我使用的默认端口3306。

```bash
# 查看想开的端口是否已开,若此提示FirewallD is not running, 表示为不可知的防火墙 需要查看状态并开启防火墙, 如果是云服务器还需要去控制台配置安全组访问
firewall-cmd --query-port=3306/tcp

# 开启端口, success代表成功
firewall-cmd --add-port=3306/tcp --permanent
# 刷新配置, 使配置生效
firewall-cmd --reload
```

## 二、安装及配置MySQL

### 1. 解压

```bash
cd /usr/local/mysql

# 解压
tar -xvf mysql-8.0.16-2.el7.x86_64.rpm-bundle.tar

# 查看一下解压出来的文件
ll
#结果
-rw-r--r--. 1 7155 31415  33432660 5月   3 2019 mysql-community-client-8.0.16-2.el7.x86_64.rpm
-rw-r--r--. 1 7155 31415    588520 5月   3 2019 mysql-community-common-8.0.16-2.el7.x86_64.rpm
-rw-r--r--. 1 7155 31415   5712552 5月   3 2019 mysql-community-devel-8.0.16-2.el7.x86_64.rpm
-rw-r--r--. 1 7155 31415  24493344 5月   3 2019 mysql-community-embedded-compat-8.0.16-2.el7.x86_64.rpm
-rw-r--r--. 1 7155 31415   3127296 5月   3 2019 mysql-community-libs-8.0.16-2.el7.x86_64.rpm
-rw-r--r--. 1 7155 31415   2177156 5月   3 2019 mysql-community-libs-compat-8.0.16-2.el7.x86_64.rpm
-rw-r--r--. 1 7155 31415 422672748 5月   3 2019 mysql-community-server-8.0.16-2.el7.x86_64.rpm
-rw-r--r--. 1 7155 31415 114848996 5月   3 2019 mysql-community-test-8.0.16-2.el7.x86_64.rpm
```

### 2. 通过rpm命令安装common

```bash
# 命令
rpm -ivh mysql-community-common-8.0.16-2.el7.x86_64.rpm 

# 打印内容
警告：mysql-community-common-8.0.16-2.el7.x86_64.rpm: 头V3 DSA/SHA1 Signature, 密钥 ID 5072e1f5: NOKEY
准备中...                          ################################# [100%]
正在升级/安装...
   1:mysql-community-common-8.0.16-2.e################################# [100%]
```

### 3. 通过rpm命令安装libs

```bash
# 命令
rpm -ivh mysql-community-libs-8.0.16-2.el7.x86_64.rpm 

# 打印内容
警告：mysql-community-libs-8.0.16-2.el7.x86_64.rpm: 头V3 DSA/SHA1 Signature, 密钥 ID 5072e1f5: NOKEY
准备中...                          ################################# [100%]
正在升级/安装...
   1:mysql-community-libs-8.0.16-2.el7################################# [100%]
```

### 4. 通过rpm命令安装client

```bash
# 命令
rpm -ivh mysql-community-client-8.0.16-2.el7.x86_64.rpm 

# 打印内容
警告：mysql-community-client-8.0.16-2.el7.x86_64.rpm: 头V3 DSA/SHA1 Signature, 密钥 ID 5072e1f5: NOKEY
准备中...                          ################################# [100%]
正在升级/安装...
   1:mysql-community-client-8.0.16-2.e################################# [100%]
```

### 5. 通过rpm命令安装server

如果这里提示缺少net-tool依赖，那么 `yum -y install net-tools*` 安装再执行
```bash
# 命令
rpm -ivh mysql-community-server-8.0.16-2.el7.x86_64.rpm 

# 打印内容
警告：mysql-community-server-8.0.16-2.el7.x86_64.rpm: 头V3 DSA/SHA1 Signature, 密钥 ID 5072e1f5: NOKEY
准备中...                          ################################# [100%]
正在升级/安装...
   1:mysql-community-server-8.0.16-2.e################################# [100%]
```

### 6. 查看MySQL安装包

```bash
# 命令
rpm -qa | grep mysql

# 打印内容
mysql-community-libs-8.0.16-2.el7.x86_64
mysql-community-common-8.0.16-2.el7.x86_64
mysql-community-client-8.0.16-2.el7.x86_64
mysql-community-server-8.0.16-2.el7.x86_64
```
### 7. 初始化MySQL数据库

该命令会在 `/var/log/mysqld.log` 生成随机密码。

```
mysqld --initialize
```

### 8. 配置用户组

配置MySQL数据库目录所属的用户和组，默认MySQL的配置文件路径为： `/etc/my.cnf`，如果有需要可以修改配置文件。

```bash
chown mysql:mysql /var/lib/mysql -R
```

### 9. 启动MySQL数据库

```bash
# 启动mysqld.service
systemctl start mysqld

# 查看状态, 显示有 running 代表启动成功
systemctl status mysqld
```

### 10. 修改数据库密码

```bash
# 查看数据库密码
cat /var/log/mysqld.log | grep password

# 打印内容, 其中4M4pSDfcr=9o就是数据库密码
2020-04-03T14:34:28.837144Z 5 [Note] [MY-010454] [Server] A temporary password is generated for root@localhost: 4M4pSDfcr=9o
```

```sql
# 使用查询到的密码登录MySQL
mysql -u root -p'4M4pSDfcr=9o'

# 登录到MySQL之后修改密码为自定义密码(我设置为123456), 这个设置还和5.7版本不同呢
ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY '123456';

# 使用`exit;`退出MySQL后使用自定义密码重新登录
```

### 11. 创建用户并授权远程登录

此处不能使用 5.7 版本的方式，不然会报错。

```
mysql> GRANT ALL PRIVILEGES ON *.* TO 'SunnyBear'@'%' IDENTIFIED BY '123456';
ERROR 1064 (42000): You have an error in your SQL syntax; check the manual that corresponds to your MySQL server version for the right syntax to use near 'IDENTIFIED BY '123456'' at line 1
```

**8.0版本需要使用如下方式**，和 Oralce 的创建授权类似，先创建用户再赋予权限。

因为正常开发一般 root 用户不允许远程登录，所以我们创建一个 SunnyBear 用户，赋予使用 sunny 数据库(已经使用命令创建好)的权限。

```sql
# 先创建一个用户
mysql> CREATE USER 'SunnyBear'@'%' IDENTIFIED BY '123456';
Query OK, 0 rows affected (0.00 sec)

# 授权
# 其中sunny.*代表赋予sunny数据库所有操作权限, 如果想赋予所有数据库权限, 可设置为*.*
# 其中'SunnyBear'@'%'代表允许SunnyBear用户在任何ip登录, 当然也可以指定ip, 例如'用户名称'@'ip地址'
mysql> GRANT ALL PRIVILEGES ON sunny.* TO 'SunnyBear'@'%' WITH GRANT OPTION;
Query OK, 0 rows affected (0.00 sec)

# 刷新权限
FLUSH PRIVILEGES;
```

配置成功之后可以使用连接工具尝试连接，我这里使用的是 Navicat，至此，单机版 MySQL 安装配置完成。

### 12. 一些命令

```bash
# 启动mysql服务
systemctl start mysqld.service

# 停止mysql服务
systemctl stop mysqld.service

# 重启mysql服务
systemctl restart mysqld.service

# 查看mysql服务当前状态
systemctl status mysqld.service

# 设置mysql服务开机自启动
systemctl enable mysqld.service

# 停止mysql服务开机自启动
systemctl disable mysqld.service
```

> 都读到这里了，来个 **点赞、评论、关注、收藏** 吧！
