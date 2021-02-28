# 一些问题

## 父层设置 position: fixed 和 overflow: auto 无法垂直滚动

1. 父层需要同时设置 top 和 bottom 属性

## localStorage初始化

1. 在created hook函数中，获取localStorage中的值，提交Mutations改变state状态即可。

## touchend事件

1. 弹出层需要添加 `prevent` 修饰符阻止默认事件

## 部署在github上 

1. 创建gh-pages分支
2. 把打包之后的文件提交到gh-pages分支上
3. 访问https://username.github.io/demo