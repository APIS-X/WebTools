/**
 * 统一过滤前后端交互的ajax数据对象
 * @param {*待过滤的数据对象} params
 */
export const dataFilters = (params = {}) => {
  for (let key in params) {
    if (params[key] === '') {
      delete params[key];
    }
  }
  return params;
};

/**
 * 将对象转换为以key对应的值为内容的数组
 * @param {Object} enums (将要转换的对象)
 */
export const objToArray = (enums = {})=> {
  const arr = [];
  Object.keys(enums).forEach(key => {
    arr.push(enums[key]);
  });
  return arr;
}

/**
 * 将数组转换为以指定字段为key的对象
 * @param {Array} arrs (将要转换的数组)
 * @param {String} key (以哪个字段作为对象的key)
 */
export const arrayToObj = (arrs = [], key = 'id')=> {
  const params = {};
  for(let i = 0, len = arrs.length; i < len; i++ ) {
    const item = arrs[i];
    params[item[key]] = item;
  }
  return params;
}

/**
 * 判断数据类型
 * @param {*} data
 */
export const typeChecks = data=> {
  return Object.prototype.toString.call(data);
}

/**
 * 金额字符串千位分隔符格式化
 * @param {String} data 
 */
export const formatMoney = data=> {
  return data && data.replace(/(?!^)(?=(\d{3})+($|\.))/g, ",");
}

/**
 * 判断是否是数字或者字符串数字
 * @param {*} data
 */
export function isNumber(data) {
  return +data === +data;
}

/**
 * 函数去抖
 * @param {Function} fn 
 * @param {Number} delay
 */
export const debance = (fn, delay)=> {
  let t = null;
  return function() {
      let that = this;
      let args = arguments;
      clearTimeout(t);
      t = setTimeout(function() {
          fn.apply(context, args);
      }, delay);
  }
}

/**
 * 函数节流
 * @param {Function} fn 
 * @param {Number} delay 
 */
export const throttle = (fn, delay)=> {
  let preTime = Date.now();
  return function() {
      let that = this;
      let args = arguments;
      let nowTime = Date.now();
      if (preTime + delay < nowTime) {
          fn.apply(that, args);
          preTime = nowTime;
      }
  }
}

/**
 * 生成随机数
 * @param {Number} min 随机数左区间
 * @param {Nmuber} max 随机数右区间
 * @param {String} mode 随机数要求(m, n]: 'leftOpen' | [m, n): 'rightOpen' | (m, n) : 'open' | [m, n] : 'close'
 */
export const getRandom = (min, max, mode = 'rightOpen')=> {
  let r;

  switch(mode) {
    case 'leftOpen': {  // (m, n]
      r = Math.random()*(max - min + 1) + min - 1;
      while(r < min) {
        r = Math.random()*(max - min + 1) + min - 1;
      }
      break;
    }
    case 'rightOpen': { // [m, n)
      r = Math.random()*(max - min) + min;
      break;
    }
    case 'open': {  // (m, n)
      r = Math.random()*(max - min) + min;
      while(r === min) {
        r = Math.random()*(max - min) + min;
      }
      break;
    }
    case 'close': { // [m, n]
      r = Math.random()*(max - min + 1) + min;
      while(r > max) {
        r = Math.random()*(max - min + 1) + min;
      }
      break;
    }
  }
  return r;
}

/**
 * 生成随机整数
 * @param {Number} min 随机数左区间
 * @param {Nmuber} max 随机数右区间
 */
export const getRandomInt = (min, max)=> Math.round(Math.random()*(max-min)) + min;

/**
 * 生成独立ID
 * @param {Number} n 生成的独立id的长度
 * @param {Array} arr 和将要生成的随机数作比较去重的id集合
 * @param {String} comb 可用于生成随机数id的字符集合
 */
export const getUniqueId = (arr = [], n = 8, comb = '123456789') => {
  const random = n => {
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