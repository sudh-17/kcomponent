### 1. 下拉列表
> 在线示例 https://sudh-17.github.io/kcomponent/dist/kselect.html

> 使用方法:

导入目录dist/js下的kselect.min.js

>实例构造器  kselect.init(dom, data, multi)

kselect.init(dom, data, multi)， 参数分别为挂载点(dom节点)，数据源(键值对数组, 数组元素必须包含key和value，例如[{key:'123', value:'json'}, ...]) 以及多选设置(boolean)

### 2. 选择树
> 在线示例： https://sudh-17.github.io/kcomponent/dist/ktree.html

> 使用方法:

导入目录dist/js下的ktree.min.js

>实例构造器  ktree.init(dom, data, multi, tag)

ktree.init(dom, data, multi)， 参数分别为挂载点(dom节点)，multi单选多选设置(boolean)，tag可以设置隐层或显示子节点量的标签（boolean），data为数据源（格式如下,data是一个数组，数组每个对象就是一个节点，其中text为节点值，tag为节点下的子节点量，nodes为子节点的数组，其内容同上）
```
[{
    text: 'Parent 1',
    tags: ['2'],
    nodes: [
      {
        text: 'Child 1',
        tags: ['2'],
        nodes: [
          {
            text: 'Grandchild 1',
            tags: ['0']
          },
          {
            text: 'Grandchild 2',
            tags: ['0']
          }
        ]
      },
      {
        text: 'Child 2',
        tags: ['0']
      }
    ]
  },
  {
    text: 'Parent 2',
    tags: ['0']
  },
  {
    text: 'Parent 3',
    tags: ['0']
  },
  {
    text: 'Parent 4',
    tags: ['0'],
    nodes: [
      {
        text: 'Child 1',
        tags: ['2'],
        nodes: [
          {
            text: 'Grandchild 1',
            tags: ['0']
          },
          {
            text: 'Grandchild 2',
            tags: ['0']
          }
        ]
      },
      {
        text: 'Child 2',
        tags: ['0']
      }
    ]
  },
  {
    text: 'Parent 5',
    tags: ['0']
  }
];
```