### 一、webpack服务只能通过localhost访问 （2019-05-21）
> webpack服务只能通过localhost访问
> https://blog.csdn.net/u011102843/article/details/73839366?utm_source=blogxgwz3
``` package.json
"scripts": {
    ...,
    "serve": "webpack-dev-server --inline  --host 0.0.0.0"
  },
```
> 在启动webpack-dev-serve 的脚本加上 --host 0.0.0.0就可以了

### vscode 代码对齐
> window: shift + alt + f

### 二、 移动端弹窗禁止底部滑动
> 弹出时给html加上如下样式，关闭时去掉该样式即可

```
.pop-modal {
  position: fixed;
  overflow: hidden;
  height: 100%;
  width: 100%;
}
```