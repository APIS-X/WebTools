/**
 * 将对象转换为以key对应的值为内容的数组
 * @param {Object} enums (将要转换的对象)
 */
export const objToArray = (enums = {}) => {
  const arr = [];
  Object.keys(enums).forEach((key) => {
    arr.push(enums[key]);
  });
  return arr;
};

/**
 * 将数组转换为以指定字段为key的对象
 * @param {Array} arr (将要转换的数组)
 * @param {String} key (以哪个字段作为对象的key)
 */
export const arrayToObj = (arr = [], key = 'id') => {
  const params = {};
  for (let i = 0, len = arr.length; i < len; i++) {
    const item = arr[i];
    params[item[key]] = item;
  }
  return params;
};

/**
 * 判断数据类型
 * @param {*} data
 * @returns  返回 Number/String/Boolean/Function 等
 */
export const typeChecks = (data) => {
  return Object.prototype.toString
    .call(data)
    .replace(/\[object\s([a-zA-Z]*)\]/g, '$1');
};
/**
 * 判断是否是数字或者字符串数字
 * @param {*} data
 */
export const isNumber = (data) => {
  return +data === +data;
};

/**
 * 统一过滤前后端交互的ajax数据对象
 * @param {*待过滤的数据对象} params
 */
export const dataFiltersEmpty = (params = {}) => {
  for (let key in params) {
    if (params[key] === '') {
      delete params[key];
    }
  }
  return params;
};

/**
 * 数据格式化显示-千分位
 * @param {String} data
 */
export const formatThousandth = (data) => {
  return data && (data + '').replace(/(?!^)(?=(\d{3})+($|\.))/g, ',');
};

/**
 * 数据格式化显示-最大单位显示
 * @param {将要格式化的数据} data
 * @param {将要格式化的数据} 保留几位小数，默认2位
 */
export const formatDataUnit = (data, n = 2) => {
  const limitY = 100000000;
  const limitW = 10000;
  let t;

  if (checkType(data) !== 'Number') {
    return data;
  }

  if (data / limitY >= 1) {
    t = `${(data / limitY).toFixed(n)}亿`;
  } else if (data / limitW >= 1) {
    t = `${(data / limitW).toFixed(n)}万`;
  } else {
    t = data;
  }

  return t;
};

/**
 * 函数去抖
 * @param {Function} fn
 * @param {Number} delay
 */
export const debance = (fn, delay) => {
  let t = null;
  return function () {
    let that = this;
    let args = arguments;
    clearTimeout(t);
    t = setTimeout(function () {
      fn.apply(context, args);
    }, delay);
  };
};

/**
 * 函数节流
 * @param {Function} fn
 * @param {Number} delay
 */
export const throttle = (fn, delay) => {
  let preTime = Date.now();
  return function () {
    let that = this;
    let args = arguments;
    let nowTime = Date.now();
    if (preTime + delay < nowTime) {
      fn.apply(that, args);
      preTime = nowTime;
    }
  };
};

/**
 * 生成随机数
 * @param {Number} min 随机数左区间
 * @param {Nmuber} max 随机数右区间
 * @param {String} mode 随机数要求(m, n]: 'leftOpen' | [m, n): 'rightOpen' | (m, n) : 'open' | [m, n] : 'close'
 */
export const getRandom = (min, max, mode = 'rightOpen') => {
  let r;

  switch (mode) {
    case 'leftOpen': {
      // (m, n]
      r = Math.random() * (max - min + 1) + min - 1;
      while (r < min) {
        r = Math.random() * (max - min + 1) + min - 1;
      }
      break;
    }
    case 'rightOpen': {
      // [m, n)
      r = Math.random() * (max - min) + min;
      break;
    }
    case 'open': {
      // (m, n)
      r = Math.random() * (max - min) + min;
      while (r === min) {
        r = Math.random() * (max - min) + min;
      }
      break;
    }
    case 'close': {
      // [m, n]
      r = Math.random() * (max - min + 1) + min;
      while (r > max) {
        r = Math.random() * (max - min + 1) + min;
      }
      break;
    }
  }
  return r;
};

/**
 * 生成随机整数
 * @param {Number} min 随机数左区间
 * @param {Number} max 随机数右区间
 */
export const getRandomInt = (min, max) =>
  Math.round(Math.random() * (max - min)) + min;

/**
 * 生成独立ID
 * @param {Number} n 生成的独立id的长度
 * @param {Array} arr 和将要生成的随机数作比较去重的id集合
 * @param {String} comb 可用于生成随机数id的字符集合
 */
export const getUniqueId = (arr = [], n = 8, comb = '123456789') => {
  const random = (n) => {
    let str = comb;
    let result = '';
    for (let i = 0; i < n; i++) {
      result += str[parseInt(Math.random() * str.length)];
    }

    if (arr.includes(result)) {
      random(n);
    } else {
      return result;
    }
  };

  return random(n);
};

/**
 * 参数字符串解析为对象
 * @param {String} str 参数字符串
 */
export const getSearchQuery = (str) => {
  if (!str) return;
  let arrStr = decodeURIComponent(str).split('&');
  let objStr = {};
  for (let i = 0, len = arrStr.length; i < len; i++) {
    const [key, value] = arrStr[i].split('=');
    if (key !== undefined && key !== '') {
      objStr[key] = value;
    }
  }
  return objStr;
};

/**
 * Dom操作相关
 */
export const EventUtils = {
  addEvent: function (element, type, handler) {
    if (element.addEventListener) {
      element.addEventListener(type, handler, false);
    } else if (element.attachEvent) {
      element.attachEvent('on' + type, handler);
    } else {
      element['on' + type] = handler;
    }
  },
  // 移除事件
  removeEvent: function (element, type, handler) {
    if (element.removeEventListener) {
      element.removeEventListener(type, handler, false);
    } else if (element.detachEvent) {
      element.detachEvent('on' + type, handler);
    } else {
      element['on' + type] = null;
    }
  },
  // 获取事件目标
  getTarget: function (event) {
    return event.target || event.srcElement;
  },
  // 获取 event 对象的引用，取到事件的所有信息，确保随时能使用 event
  getEvent: function (event) {
    return event || window.event;
  },
  // 阻止事件（主要是事件冒泡，因为 IE 不支持事件捕获）
  stopPropagation: function (event) {
    if (event.stopPropagation) {
      event.stopPropagation();
    } else {
      event.cancelBubble = true;
    }
  },
  // 取消事件的默认行为
  preventDefault: function (event) {
    if (event.preventDefault) {
      event.preventDefault();
    } else {
      event.returnValue = false;
    }
  },
};
/**
 * 格式化字符串JSON
 * @param {*} str
 * @returns
 */
const formatStringJson = (str = '') =>
  str.replace(/(\s*?{\s*?|\s*?,\s*?)(['"])?([a-zA-Z0-9]+)(['"])?:/g, '$1"$3":')
