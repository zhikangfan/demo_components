import { Modal, Textarea } from 'ant-design-vue'
import { createVNode, ref } from 'vue'
import { EditOutlined } from '@ant-design/icons-vue'
export const useContentModal = (val) => {
  const currentValue = ref(val)
  const cacheInputVal = ref('') // 缓存输入的值
  const onClick = () => {
    Modal.confirm({
      title: '编辑',
      icon: createVNode('i'),
      okText: '保存',
      cancelText: '取消',
      content: createVNode(Textarea, {
        value: currentValue.value, // 默认值
        onChange(e) {
          cacheInputVal.value = e.target.value
        },
        class: 'w-full',
      }),
      onOk() {
        currentValue.value = cacheInputVal.value
      },
      onCancel() {
        currentValue.value = val
      },
      class: 'test',
    })
  }
  return {
    onClick,
    value: currentValue,
  }
}
