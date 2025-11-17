import { noAuthAxios, authAxios } from '@/api'
import { md5 } from 'js-md5'
const uploadLoginData_baiDu = async () => {
  await authAxios.post(
    '/imageformat/login_baidu',
    {
      bdVID: localStorage.getItem('bd_vid'),
    },
    {
      headers: {
        'Content-Type': 'application/json',
      },
    },
  )
}

const uploadPayData_baiDu = async (amount) => {
  await authAxios.post(
    '/imageformat/order_baidu',
    {
      bdVID: localStorage.getItem('bd_vid'),
      amount: amount,
    },
    {
      headers: {
        'Content-Type': 'application/json',
      },
    },
  )
}

const uploadOrder_360 = async (orderId, price) => {
  try {
    await noAuthAxios.post(
      '/api/upload360data',
      {
        data: {
          data_industry: 'ocpc_ps_convert',
          data_detail: {
            qhclickid: window.localStorage.getItem('qhclickid'),
            trans_id: md5(orderId),
            event: 'ORDER',
            event_param: {
              value: price,
            },
          },
        },
      },
      {
        headers: {
          'Content-Type': 'application/json',
        },
      },
    )
  } catch (e) {
    console.log('上报失败： ' + e)
  }
}

const uploadLoginData_360 = async () => {
  try {
    await noAuthAxios.post(
      '/api/upload360v2data',
      {
        data: {
          data_industry: 'ocpc_ps_convert',
          data_detail: {
            qhclickid: window.localStorage.getItem('qhclickid'),
            event: 'REGISTERED',
          },
        },
      },
      {
        headers: {
          'Content-Type': 'application/json',
        },
      },
    )
  } catch (e) {
    console.log('上报失败： ' + e)
  }
}

export function trackLogin() {
  try {
    if (import.meta.env.VITE_REPORT_BAI_DU === 'true') {
      uploadLoginData_baiDu().catch((e) => {})
    }

    if (import.meta.env.VITE_REPORT_BING === 'true') {
      window.uetq = window.uetq || []
      window.uetq.push('event', 'login', { event_category: 'login' })
    }

    if (import.meta.env.VITE_REPORT_360 === 'true') {
      uploadLoginData_360().catch((e) => {})
    }

    if (import.meta.env.VITE_REPORT_TENCENT === 'true') {
    }
  } catch (e) {
    console.log(e)
  }
}

export function trackOrder(id, orderId, price) {
  try {
    if (import.meta.env.VITE_REPORT_BAI_DU === 'true') {
      uploadPayData_baiDu(price).catch((e) => {})
    }

    if (import.meta.env.VITE_REPORT_BING === 'true') {
      window.uetq = window.uetq || []
      window.uetq.push('event', 'purchase', {
        event_category: 'purchase',
        event_label: `${orderId}${id}`,
        event_value: price,
      })
    }

    if (import.meta.env.VITE_REPORT_360 === 'true') {
      uploadOrder_360(orderId, price).catch((e) => {})
    }

    if (import.meta.env.VITE_REPORT_TENCENT === 'true') {
      gdt('track', 'COMPLETE_ORDER', {
        order_id: orderId,
        price: price,
      })
    }
  } catch (e) {
    console.log(e)
  }
}

/**
 * 功能统计访问
 * @param functionName 功能标识
 * @param title 功能描述
 */
export function trackUsageFunc(functionName, title) {
  authAxios
    .post('/imageformatV2/sentuser', {
      use_func: 'image_' + functionName,
      use_func_title: '图片压缩_' + title,
    })
    .catch((e) => {})
}
