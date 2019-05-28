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

### 人员选择框
> 在线示例： https://sudh-17.github.io/kcomponent/dist/kchooser.html

> 使用方法:

导入目录dist/js下的kchooser.min.js

>实例构造器  kchooser.init(dom, data, multi)

kchooser.init(dom, data, multi)， 参数分别为挂载点(dom节点)，multi单选多选设置(boolean)，data为数据源（格式如下,data是一个数组，数组每个对象就是一个节点，其中有id，人员名称name以及部门deparment）
```
[{
  "id": "C3E8bD41-a66d-937E-536b-f4b2675FdDAD",
  "name": "冯平",
  "department": "同部门"
},
{
  "id": "ee5ddFfe-8D2d-8BCc-8cCc-7edF544Cd8F7",
  "name": "石伟",
  "department": "常用人"
}]
```
>用法可以参考dist目录下的kchooser.html

### 表格
> 在线示例： https://sudh-17.github.io/kcomponent/dist/ktable.html

> 使用方法:


导入目录dist/js下的ktable.min.js

>实例构造器：ktable.init(dom, data, horizontal)

ktable.init(dom, data, horizontal) 参数dom为HTML节点（为table元素），data（数组）为表头参数，格式如下数组的每个元素就是一个表头对象，该对象有字段名field，标题title，输入类型type（type有text、select、number、date、password以及textarea 7种输入类型）， 参数horizontal(boolean)为列表布局方式，默认为true水平排列，false为竖直排列

```
let data = [{
  field: 'name',
  title: '姓名',
  type: 'text',
}, {
  field: 'sex',
  title: '性别',
  type: 'select',
  option: [
    '男','女'
  ],
}, {
  field: 'age',
  title: '年龄',
  type: 'number',
}, {
  field: 'post',
  title: '职位',
  type: 'text',
}, {
  field: 'desc',
  title: '描述',
  type: 'textarea',
}, {
  field: 'date',
  title: '入职时间',
  type: 'date',
}]
```
> API  getValue()

getValue() 是获取表格输入的所有参数的集合，返回类型是数组，该数组的每个元素对应着表格相应的行的数据id是行的id，data是行的具体数据
