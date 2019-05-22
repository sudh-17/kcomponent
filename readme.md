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

>实例构造器  ktree.init(dom, data, multi)

ktree.init(dom, data, multi)， 参数分别为挂载点(dom节点)，multi单选多选设置(boolean)，以及数据源（格式如下, text为节点值）
```
[
  {
    text: 'Parent 1',
    href: '#parent1',
    tags: ['2'],
    nodes: [
      {
        text: 'Child 1',
        href: '#child1',
        tags: ['2'],
        nodes: [
          {
            text: 'Grandchild 1',
            href: '#grandchild1',
            tags: ['0']
          },
          {
            text: 'Grandchild 2',
            href: '#grandchild2',
            tags: ['0']
          }
        ]
      },
      {
        text: 'Child 2',
        href: '#child2',
        tags: ['0']
      }
    ]
  },
  {
    text: 'Parent 2',
    href: '#parent2',
    tags: ['0']
  },
  {
    text: 'Parent 3',
    href: '#parent3',
    tags: ['0']
  },
  {
    text: 'Parent 4',
    href: '#parent4',
    tags: ['0'],
    nodes: [
      {
        text: 'Child 1',
        href: '#child1',
        tags: ['2'],
        nodes: [
          {
            text: 'Grandchild 1',
            href: '#grandchild1',
            tags: ['0']
          },
          {
            text: 'Grandchild 2',
            href: '#grandchild2',
            tags: ['0']
          }
        ]
      },
      {
        text: 'Child 2',
        href: '#child2',
        tags: ['0']
      }
    ]
  },
  {
    text: 'Parent 5',
    href: '#parent5',
    tags: ['0']
  }
];
```