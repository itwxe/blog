---
title: nginx+keepalived高可用
tags:
  - KeepAlived
  - Nginx
permalink: '/posts/4c06301f.html'
date: 2020-11-03 00:00:00
updated: 2020-11-03 00:00:00
---

# nginx+keepalived高可用

> 作者：IT王小二
> 
> 博客：[https://itwxe.com](https://www.itwxe.com/)

- 面试官：你这个使用 nginx 做负载，是使用单台 nginx 吗？如果 nginx 挂了怎么办？
- 小二：是的，由于业务访问量不大 nginx 挂的可能性不大，考虑服务的稳定性可以使用 keepalived。
- 面试官：你知道实现的思路和配置吗？ 
- 小二：。。。

近期找工作，上午面试了一家公司，很久没更新文章了，记录一下碰到的问题，就当查缺补漏了，哈哈。

## 一、传统高可用

tomcat 高可用的思路是在 tomcat 集群前面加一层负载nginx，如下图：

![传统高可用](https://images.itwxe.com/images/2021/08/05/72f8a10272cf8.png)

但是这种结构一旦 nginx 挂掉了，那么整个服务就瘫痪了。

## 二、LVS思想解决高可用问题

### 1. 什么是LVS

> LVS是Linux Virtual Server的简写，意即Linux虚拟服务器，是一个虚拟的服务器集群系统。本项目在1998年5月由章文嵩博士成立，是中国国内最早出现的自由软件项目之一    -- 摘自百度百科

LVS 个人理解就是利用多个物理机集群虚拟出一个虚拟ip（Virtual Server IP，简称VIP），虚拟ip不是实际存在的物理机，所以虚拟ip不会挂，而 LVS 的实现 Linux 内核已经帮助我们实现了，结构如下图：

![LVS示意图](https://images.itwxe.com/images/2021/08/05/6c01915ac98f2.png)

### 2. nginx+keepalived

在传统高可用的基础上，利用多台服务器集群借助 keepavlied 管理 LVS 虚拟出一个虚拟ip，只要两台 nginx 服务器不宕机那么服务就不会瘫痪，如下图：

![nginx+keepalived](https://images.itwxe.com/images/2021/08/05/bc04a63270eb7.png)

## 三、环境说明

1. 演示机器ip：192.168.5.11，192.168.5.12
2. Linux版本：CentOS Linux release 7.6.1810 (Core)
3. keepalived版本：1.3.4
4. nginx版本：1.13.1

## 四、keepalived具体配置

### 1. 前提

**注意：**两台机器都需要进行此步操作

1、修改 selinux，关闭 SELINUX，打开 `vim /etc/sysconfig/selinux`，设置 `SELINUX=disabled`，我 VMWare 里面安装的 Linux 和腾讯云的云服务器都默认关闭了，如下图：

![关闭selinux](https://images.itwxe.com/images/2021/08/05/a39d908e05054.png)

2、安装需要的依赖包。

```bash
yum -y install libnl libnl-devel libnfnetlink-devel
```

### 2. keepalived安装

**注意：**两台机器都需要进行此步操作

1、不要使用 yum 方式安装（有bug），[keepalived 官网](https://www.keepalived.org/download.html)下载 keepalived 上传，或者使用 wget 下载，下载后解压。

```bash
wget https://www.keepalived.org/software/keepalived-1.3.4.tar.gz
tar -zxvf keepalived-1.3.4.tar.gz
```

2、解压之后，指定目录。

```bash
cd keepalived-1.3.4
./configure --prefix=/usr/local/keepalived --sysconf=/etc
```

**注：**

- --prefix：指定安装目录。
- --sysconf：keepalived配置文件目录，如果指定了其他配置目录需要指定配置文件启动keepalived，如：`/usr/local/keepalived/sbin/keepalived -D -f 配置文件路径`。

3、编译安装。

```bash
make && make install
```

### 3. keepalived配置

这一步略有不同，其中一台机器作为主机（192.168.5.11），另外一台机器作为备份机（192.168.5.12）

**主机（192.168.5.11）配置**

打开 keepalived 配置文件目录（我的是`/etc/keepalived`）下的 `keepalived.conf` 文件，配置如下信息，其余多余配置删除。

```bash
! Configuration File for keepalived

global_defs {
   router_id 192.168.5.11       # keepalived的唯一标识
}

vrrp_instance VI_1 {
    state MASTER                # 初始状态，MASTER 和 BACKUP
    interface ens33             # 系统使用的网卡接口名称，可以使用ip addr查看
    virtual_router_id 51        # 组名，参与此虚拟机ip的机器配置一样的值，即一个集群内的机器都使用同一个值
    priority 200                # 优先级，数值大的优先级高，组内最高的胜出
    advert_int 1                # 心跳检测1秒一次
    authentication {            # 授权，无需改动
        auth_type PASS
        auth_pass 1111
    }
    virtual_ipaddress {
        192.168.5.10            # 虚拟ip
    }
}

```

**备份机（192.168.5.12）配置**

同样打开 keepalived 配置文件目录 ，打开 keepalived.conf 文件，配置如下信息，和主机不同的是 router_id，interface，priority，配置如下：

```
! Configuration File for keepalived

global_defs {
   router_id 192.168.5.12       # keepalived的唯一标识
}

vrrp_instance VI_1 {
    state BACKUP                # 初始状态，MASTER 和 BACKUP
    interface ens33             # 系统使用的网卡接口名称，可以使用ip addr查看
    virtual_router_id 51        # 组名，参与此虚拟机ip的机器配置一样的值，即一个集群内的机器都使用同一个值
    priority 100                # 优先级，数值大的优先级高，组内最高的胜出
    advert_int 1                # 心跳检测1秒一次
    authentication {            # 授权，无需改动
        auth_type PASS
        auth_pass 1111
    }
    virtual_ipaddress {
        192.168.5.10            # 虚拟ip
    }
}

```

### 4. 校验LVS效果

1、分别启动两个机器上的 keepalived。

```bash
/usr/local/keepalived/sbin/keepalived
```

2、使用 `ip addr` 查看效果，正常的结果是虚拟ip位于 192.168.5.11 这台机器上，因为其配置的优先级更高。可是...结果...不出意外的翻车了，哈哈哈！出现的问题是两个机器出现了双VIP，翻车截图如下：

![VM11ipaddr](https://images.itwxe.com/images/2021/08/05/9bad3a54b57c2.png)

![VM12ipaddr](https://images.itwxe.com/images/2021/08/05/ff5e1e0596402.png)

个人猜测是防火墙的原因，于是一波 Google 大法，果不其然，找到了原因：防火墙将 vrrp 广播给拦截了，所以导致 BACKUP 接收不到 MASTER 的广播。

**查找问题的过程：**

局域网内任意一台机器安装抓包工具 tcpdump，命令：`yum -y install tcpdump`

执行 `tcpdump -i ens33 vrrp -n` 命令查看情况，发现两台机器都在广播，正常情况 BACKUP 不应该在广播的。

![抓包异常情况](https://images.itwxe.com/images/2021/08/05/e41d619a81d81.png)

为了验证一下，把两台机器的防火墙全部关闭，命令：`systemctl stop firewalld.service`，发现情况正常了。

![抓包正常情况](https://images.itwxe.com/images/2021/08/05/4b53d09e39dd7.png)

`ip addr` 查看，发现配置成功了。

![master_success](https://images.itwxe.com/images/2021/08/05/ada2ce635290f.png)

![backup_success](https://images.itwxe.com/images/2021/08/05/8c27c1dbe827e.png)

**不关闭防火墙放行 vrrp 广播**

正常情况咱们肯定不裸奔需要防火墙的，那么就需要放行 vrrp 广播。

```bash
# 需要注意命令中的网卡名称
firewall-cmd --direct --permanent --add-rule ipv4 filter INPUT 0 --in-interface ens33 --destination 224.0.0.18 --protocol vrrp -j ACCEPT
# 重启防火墙
firewall-cmd --reload
```

3、配置正常了，那么就需要检验一下当 MASTER 主机宕机之后虚拟ip是否会自动漂移到 BACKUP 备份机器了，当然为了模拟场景我只需要把 keepalived 服务干掉就可以了。

![kill_master](https://images.itwxe.com/images/2021/08/05/9a9dcea8d7315.png)

可以看到 BACKUP 备份机已经接管了。

![BACKUP_MASTER](https://images.itwxe.com/images/2021/08/05/302d05bccfe2d.png)

而当 MASTER 主机重启之后，MASTER 主机又会抢回虚拟ip的控制权。

## 五、nginx+keepalived配合使用

前面配置好 keepalived 之后有人会问，这和nginx貌似没啥关系，是滴，确实没啥关系，但是接下来的配置就有关系了。

有时候，并非是服务器宕机了，而只是 nginx 挂掉了，而 keepalived 中并没有相关配置，这样的话如果 MASTER 主机中的 nginx 挂掉了，那么虚拟ip也不会自动飘逸到 BACKUP 备份机，接下来就是为了结合 nginx的配置，使用 keepalived 来监控 nginx 。

### 1. 编辑心跳执行脚本

我的执行脚本位置保存在 `/usr/local/keepalived/chk_nginx_pid.sh`，内容如下：

```bash
#!/bin/bash

A=`ps -C nginx --no-header |wc -l` # 统计nginx进程数，若为0，表明nginx被杀
if [ $A -eq 0 ];then
        # 重启nginx，不是默认配置路径所以需要指定路径，因人而异
        /usr/local/nginx/sbin/nginx -c /usr/local/nginx/conf/nginx.conf
        # nginx重启失败，则停掉keepalived服务，进行VIP转移
        if [ `ps -C nginx --no-header |wc -l` -eq 0 ];then
                # 杀掉，VIP就漫游到另一台机器
                killall keepalived
        fi
fi

```

**注意：**

1. 保存后赋予可执行权限：`chmod +x chk_nginx_pid.sh`
2. 查看是否可以使用 killall 命令，如果无法使用 killall 命令则安装psmisc： `yum -y install psmisc`

### 2. 配置keepalived配置文件

增加的配置如图：

![keepalived心跳检测nginx](https://images.itwxe.com/images/2021/08/05/bfefc59421b74.png)

```
vrrp_script check_nginx {
    script "/usr/local/keepalived/check_nginx.sh"       # 心跳执行的脚本
    interval 2                                          # 每2秒检测一次
    weight 2                                            # 脚本结果导致的优先级变更：10表示优先级+10；-10则表示优先级-10
}

track_script {
    check_nginx             # 调用检测脚本
}

```

### 3. 测试是否生效

关闭 keepalived 和 nginx的进程，重启 keepalived，看 keepalived 是否可以自动启动 nginx 。

```bash
killall keepalived

killall nginx

/usr/local/keepalived/sbin/keepalived
```

![打不死的nginx](https://images.itwxe.com/images/2021/08/05/2a3334fbba5fa.png)

同理，BACKUP 备份机也同样增加相同的心跳检测脚本和配置即可 。

测试发现，后面无论怎么 kill 掉 nginx，nginx都会被 keepalived自动重启，变成了打不死的小强，也就实现了 nginx 的高可用。

> 都读到这里了，来个 **点赞、评论、关注、收藏** 吧！
