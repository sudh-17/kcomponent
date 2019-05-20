import './less.less'
import kselect from './kselect.js'

const data = [
  {
    "key": "C76Be67E-ccae-EcBC-7Fd5-B7e12C1d18E1",
    "value": "叶明"
  },
  {
    "key": "EDedAF3C-DE5c-5c8E-FDAD-e7c1195c6438",
    "value": "朱强"
  },
  {
    "key": "0be8eBC8-cc7F-beE5-11BB-6cC17A5D32BF",
    "value": "萧娟"
  },
  {
    "key": "CF96C4F9-e6f2-26Db-A4Eb-c22750FB4408",
    "value": "万秀兰"
  },
  {
    "key": "4Dd3EC4e-DAaA-EeFC-83f9-e25b896C9FAB",
    "value": "邱芳"
  },
  {
    "key": "0F8F4F32-6f0E-8Ab3-D0ee-a8fb5Cf9676B",
    "value": "韩秀兰"
  },
  {
    "key": "Eaf5A46b-B86e-e8cb-DFde-573DEF22AA54",
    "value": "程军"
  },
  {
    "key": "E2EdCD8a-dd56-A76C-F42B-D55a16F837F7",
    "value": "魏杰"
  },
  {
    "key": "A77Bdd1E-CDE5-54bA-96c5-13ee14FaBc8F",
    "value": "郭芳"
  },
  {
    "key": "AcfEfFea-cD6D-Dac8-B8BB-Fde8fd38DC4B",
    "value": "钱杰"
  },
  {
    "key": "E2EdCD8a-dd56-A76C-F42B-D55a16F037F7",
    "value": "魏杰8"
  },
  {
    "key": "A77Bdd1E-CDE5-54bA-96c5-130e14FaBc8F",
    "value": "郭芳6"
  },
  {
    "key": "AcfEfFea-cD6D-Dac8-B8B0-Fde8fd38DC4B",
    "value": "钱杰44"
  }
];
  let single = kselect.init(document.getElementById('select'), data, false)
  document.getElementById('btnGet').addEventListener('click', function () {
    alert(single.getValue())
  })

  const data2 = JSON.parse(JSON.stringify(data));
  let multi = kselect.init(document.getElementById('select2'), data2, true)
  document.getElementById('btnGet2').addEventListener('click', function () {
    alert(multi.getValue())
  })
  single.setOption({
    width: '100vw',
    height: '10px'
  })