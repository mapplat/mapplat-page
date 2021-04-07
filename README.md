# mapplat-page
## Features

+ 账号登陆注册（jwt）
+ 文件的上传下载（续传、秒传）
+ 文件导入数据库 （用ogr 到入 csv，geojson，shp）
+ 动态添加数据库链接信息（todo）
+ 查看、管理数据库已有数据（增删）（修改）
+ 用户权限管理（todo admin, manager)
+ config ，配置地图，发布服务gallery，获取可视化ak
+ 根据ak获取config渲染数据（z,x,y）
+ 形式包括png，geojson,矢量瓦片


# router

mapplat.com
  - 没有登陆跳转到home
  - mapplat.com/home 首页 (登陆、注册)(登录后显示进入)、介绍、体验地图、联系方式
    - mapplat.com/gallery 分享地图的地方
  - mapplat.com/data 数据管理 （上传｜ 下载｜ 编辑｜ 预切片）
  - mapplat.com/map 制图结果管理 （选择数据｜可视化配置（todo）（cartocss｜xml））
  - mapplat.com/user/profile 账号设置｜退出登录|修改密码（原始密码｜验证码）｜ 邮箱提醒| 用户名｜｜邮箱｜密码｜头像
  - mapplat.com/user/msg 消息查看 已读｜未读
  - ? 管理员群发消息｜群发接受规则
  - todo 支持赞助｜制图赞赏｜广告 
  - mapplat.com/about
  - docs.mapplat.com 使用文档（todo）
  - blog.mapplat.com 
  - 联系方式发送邮件
