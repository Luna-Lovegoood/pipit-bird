## 项目运行环境

#### Node.Js + MongoDB

- Node.js 需要在本地安装和配置
- MongoDB 虽然运行在云服务器上，本地连接也需要安装并配置环境变量





## 项目运行方式

1. 进入项目文件夹 `cd /Users/luna/Documents/project/pipit-bird`

2. 安装依赖 `pipit-bird > npm install`

3. 运行 server.js `pipit-bird > node server.js`

   若显示 `express running on http://localhost:3000; Connection successfully to server` 则运行成功

4. 新建终端，开启 http-server 服务 `pipit-bird > http-server`，在浏览器中打开 `http://127.0.0.1:8080`





## 更新日志

###### 2020.1.26 

- 添加 package.json 文件，规范项目所需模块 http-server、express、mongodb 的安装方式。

###### 2020.1.27

- 将数据库上传至云端，更新server.js文件中数据库的访问地址。
- 整理资源文件夹，并更新相关url。





## 环境配置

#### Node.js

##### mac 系统

- 安装教程：https://blog.csdn.net/xujiuba/article/details/107223046
- 默认安装位置：`/usr/local/bin/node`, `/usr/local/bin/npm`
- 多数情况下不需要配置环境变量，可能 `/usr/local/bin` 是默认的

##### win系统

- （待补充）