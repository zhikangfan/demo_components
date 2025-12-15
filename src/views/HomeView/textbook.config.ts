import type { Textbook } from '@/views/HomeView/TextbookModalProps.ts'

const TextbookConfig: Textbook[] = [
  {
    grade: 1, // 范围1-6， 1表示一年级，
    volume: 0, // 0：上册，1：下册
    edition: 2, // 0:部编版 1:部编5年版 2: 统编版
    sections: [
      {
        name: '识字',
        lessons: [
          {
            name: '第1课',
            learnType: [0],
            content: ['天', '地', '人', '你', '我', '他'],
          },
          {
            name: '第2课',
            learnType: [0],
            content: ['一', '二', '三', '四', '五', '上', '下'],
          },
          {
            name: '第3课',
            learnType: [0],
            content: ['口', '耳', '目', '手', '足', '站', '坐'],
          },
          {
            name: '第4课',
            learnType: [0],
            content: ['日', '月', '山', '川', '水', '火', '田', '禾'],
          },
          {
            name: '语文园地一',
            learnType: [0],
            content: ['六', '七', '八', '九', '十'],
          },
          {
            name: '第5课',
            learnType: [0],
            content: ['对', '歌', '雨', '风', '虫', '清', '绿', '桃', '红'],
          },
          {
            name: '第6课',
            learnType: [0],
            content: ['力', '尖', '尘', '众', '双', '林', '森', '不', '条', '心', '金'],
          },
          {
            name: '第7课',
            learnType: [0],
            content: ['包', '尺', '作', '业', '笔', '刀', '宝', '贝', '少', '课', '早'],
          },
          {
            name: '第8课',
            learnType: [0],
            content: ['升', '国', '旗', '中', '们', '声', '起', '多', '么', '向', '立'],
          },
          {
            name: '语文园地六',
            learnType: [0],
            content: ['老', '师', '工', '厂', '医', '院', '生', '门', '卫'],
          },
        ],
      },
      {
        name: '汉语拼音',
        lessons: [
          {
            name: '第3课',
            learnType: [0],
            content: ['爸', '妈'],
          },
          {
            name: '第4课',
            learnType: [0],
            content: ['大', '马', '路', '土'],
          },
          {
            name: '语文园地二',
            learnType: [0],
            content: ['本', '学', '校', '班', '级', '姓', '名', '王'],
          },
          {
            name: '第5课',
            learnType: [0],
            content: ['哥', '弟', '画', '花'],
          },
          {
            name: '第6课',
            learnType: [0],
            content: ['打', '棋', '积', '木'],
          },
          {
            name: '第7课',
            learnType: [0],
            content: ['字', '词', '句', '子'],
          },
          {
            name: '第8课',
            learnType: [0],
            content: ['桌', '纸', '读', '书'],
          },
          {
            name: '第9课',
            learnType: [0],
            content: ['鱼', '鸭', '乌', '鸦'],
          },
          {
            name: '语文园地三',
            learnType: [0],
            content: ['午', '星', '期', '语', '文', '数', '写', '会'],
          },
          {
            name: '第10课',
            learnType: [0],
            content: ['白', '菜', '西', '瓜', '果'],
          },
          {
            name: '第11课',
            learnType: [0],
            content: ['小', '桥', '流', '柳'],
          },
          {
            name: '第12课',
            learnType: [0],
            content: ['开', '雪', '夜', '色', '美'],
          },
          {
            name: '第13课',
            learnType: [0],
            content: ['蓝', '云', '草', '原'],
          },
          {
            name: '第14课',
            learnType: [0],
            content: ['冰', '自', '行', '车'],
          },
          {
            name: '语文园地四',
            learnType: [0],
            content: ['晚', '昨', '今', '明', '个', '这', '去', '年'],
          },
        ],
      },
      {
        name: '阅读',
        lessons: [
          {
            name: '第1课',
            learnType: [0],
            content: ['秋', '气', '了', '树', '叶', '黄', '片', '从', '来', '飞'],
          },
          {
            name: '第2课',
            learnType: [0],
            content: ['江', '南', '可', '采', '莲', '戏', '间', '东', '北'],
          },
          {
            name: '第3课',
            learnType: [0],
            content: ['的', '家', '鸡', '竹', '牙', '用', '几', '步', '没', '参', '加'],
          },
          {
            name: '第4课',
            learnType: [0],
            content: ['鸟', '说', '是', '春', '青', '蛙', '夏', '着', '皮', '地', '就', '冬'],
          },
          {
            name: '语文园地五',
            learnType: [0],
            content: ['男', '女', '关', '正', '反', '先', '后', '内', '外'],
          },
          {
            name: '第5课',
            learnType: [0],
            content: ['船', '弯', '儿', '两', '头', '在', '里', '看', '见', '闪'],
          },
          {
            name: '第6课',
            learnType: [0],
            content: ['影', '前', '常', '黑', '狗', '左', '右', '它', '好', '朋', '友'],
          },
          {
            name: '第7课',
            learnType: [0],
            content: ['件', '有', '和', '做', '也', '办', '到', '又', '才', '能'],
          },
          {
            name: '语文园地七',
            learnType: [0],
            content: ['爷', '奶', '叔', '姐', '妹'],
          },
          {
            name: '第8课',
            learnType: [0],
            content: ['比', '尾', '巴', '谁', '长', '短', '把', '伞', '兔', '最', '公'],
          },
          {
            name: '第9课',
            learnType: [0],
            content: ['喝', '只', '处', '找', '着', '许', '石', '出', '法', '放', '进', '高'],
          },
          {
            name: '第10课',
            learnType: [0],
            content: ['点', '数', '彩', '半', '空', '问', '回', '答', '方', '久', '更', '长'],
          },
          {
            name: '语文园地八',
            learnType: [0],
            content: ['牛', '羊', '爪', '旦', '拼', '音'],
          },
        ],
      },
      {
        name: '识字',
        lessons: [
          {
            name: '第2课',
            learnType: [1],
            content: ['一', '二', '三', '上'],
          },
          {
            name: '第3课',
            learnType: [1],
            content: ['口', '耳', '目', '手'],
          },
          {
            name: '第4课',
            learnType: [1],
            content: ['日', '火', '田', '禾'],
          },
          {
            name: '语文园地一',
            learnType: [1],
            content: ['六', '七', '八', '十'],
          },
          {
            name: '第5课',
            learnType: [1],
            content: ['云', '雨', '虫', '山', '水'],
          },
          {
            name: '第6课',
            learnType: [1],
            content: ['力', '男', '土', '木', '心'],
          },
          {
            name: '第7课',
            learnType: [1],
            content: ['尺', '本', '刀', '不', '少'],
          },
          {
            name: '第8课',
            learnType: [1],
            content: ['中', '五', '风', '立', '正'],
          },
          {
            name: '语文园地六',
            learnType: [1],
            content: ['工', '厂', '门', '卫'],
          },
        ],
      },

      {
        name: '汉语拼音',
        lessons: [
          {
            name: '语文园地二',
            learnType: [1],
            content: ['九', '王'],
          },
          {
            name: '语文园地三',
            learnType: [1],
            content: ['午', '下'],
          },
          {
            name: '语文园地四',
            learnType: [1],
            content: ['去', '年'],
          },
        ],
      },

      {
        name: '阅读',
        lessons: [
          {
            name: '第1课',
            learnType: [1],
            content: ['了', '子', '大', '人'],
          },
          {
            name: '第2课',
            learnType: [1],
            content: ['可', '叶', '东', '西'],
          },
          {
            name: '第3课',
            learnType: [1],
            content: ['竹', '马', '牙', '用', '几'],
          },
          {
            name: '第4课',
            learnType: [1],
            content: ['四', '小', '鸟', '是', '天'],
          },
          {
            name: '语文园地五',
            learnType: [1],
            content: ['女', '开', '关', '先'],
          },
          {
            name: '第5课',
            learnType: [1],
            content: ['月', '儿', '头', '里', '见'],
          },
          {
            name: '第6课',
            learnType: [1],
            content: ['在', '我', '左', '右'],
          },
          {
            name: '第7课',
            learnType: [1],
            content: ['和', '也', '又', '才'],
          },
          {
            name: '语文园地七',
            learnType: [1],
            content: ['爸', '妈'],
          },
          {
            name: '第8课',
            learnType: [1],
            content: ['比', '巴', '长', '公'],
          },
          {
            name: '第9课',
            learnType: [1],
            content: ['只', '个', '多', '石', '出'],
          },
          {
            name: '第10课',
            learnType: [1],
            content: ['来', '半', '你', '有'],
          },
          {
            name: '语文园地八',
            learnType: [1],
            content: ['牛', '羊', '果', '白'],
          },
        ],
      },
    ],
  },
]
export default TextbookConfig
