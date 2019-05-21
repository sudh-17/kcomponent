### 2019-05-21
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
