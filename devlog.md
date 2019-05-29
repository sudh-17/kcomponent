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

### 三、 js怎么监听div元素的resize
>在实现一个项目需求的时候，需要监听到某个div元素的宽高变化，第一时间想到的是resize事件，但是很不幸运的是，resize事件只能加在window对象上，并不能监听具体某个DOM元素。大神帖子https://blog.csdn.net/u010419337/article/details/81474311
MutationObserver，这是一个可以用来监听整个DOM中任何变化的东西，可以把它理解为一个类，实例化之后调用类实例的几个简单接口即可完成监听