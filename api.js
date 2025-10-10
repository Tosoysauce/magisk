/*
作者: soy
日期: 2025/10/11
------------------------------------------------------------


*/
/**
 * 初始化 CryptoJs 模块
 * @returns {object} CryptoJs 模块实例
 * @throws {Error} 如果 crypto-js 模块未安装
 */
const CryptoJs = (() => {
  try {
    return require("crypto-js");
  } catch (error) {
    throw new Error("\n缺少依赖：请安装 `crypto-js` 安装依赖\n");
  }
})();
/**
 * 初始化 axios 模块
 * @returns {object} axios 模块实例
 * @throws {Error} 如果 axios 模块未安装
 */
const axios = (() => {
  try {
    return require("axios");
  } catch (error) {
    throw new Error("\n缺少依赖：请安装 `axios` 安装依赖\n");
  }
})();
/**
 * 初始化 node-rsa 模块
 * @returns {object} node-rsa 模块实例
 * @throws {Error} 如果 node-rsa 模块未安装
 */
const NodeRSA = (() => {
  try {
    return require("node-rsa");
  } catch (error) {
    throw new Error("\n缺少依赖：请安装 `node-rsa` 安装依赖\n");
  }
})();

/**
 * 随机延时函数
 * @param {number} min - 最小延时时间（秒）
 * @param {number} max - 最大延时时间（秒）
 * @returns {Promise<void>} 延时完成的 Promise
 * @throws {Error} 如果 min 或 max 不是正数，或 min > max
 */
async function Sleep_time(min, max) {
  if (
    typeof min !== "number" ||
    typeof max !== "number" ||
    min <= 0 ||
    max <= 0
  ) {
    throw new Error("min 和 max 必须是正数");
  }
  if (min > max) {
    throw new Error("min 必须小于或等于 max");
  }
  await wait(Math.floor(Math.random() * (max - min + 1)) + min);
}

/**
 * 延时函数
 * @param {number} t - 延时时间（秒）
 * @returns {Promise<void>} 延时完成的 Promise
 * @throws {Error} 如果 t 不是正数
 */
async function wait(t) {
  if (typeof t !== "number" || t <= 0) {
    throw new Error("t 必须是正数");
  }
  return new Promise((resolve) => setTimeout(resolve, t * 1000));
}

/**
 * 对手机号进行脱敏处理
 * @param {string} phone_num - 手机号
 * @returns {string} 脱敏后的手机号
 * @throws {Error} 如果 phone_num 不是字符串
 */
async function phoneNum(phone_num) {
  if (typeof phone_num !== "string") {
    throw new Error("phone_num 必须是字符串");
  }
  if (phone_num.length === 11) {
    return phone_num.replace(/(\d{3})\d{4}(\d{4})/, "$1****$2");
  }
  return phone_num;
}

/**
 * 对字符串进行补位操作
 * @param {string|number} num - 要补位的字符串或数字
 * @param {number} len - 补位后的目标长度
 * @param {string} [padding="0"] - 补位字符，默认为 "0"
 * @param {string} [side="左"] - 补位方向，可选 "左" 或 "右"，默认为 "左"
 * @returns {string} 补位后的字符串
 * @throws {Error} 如果 len 不是正整数或 side 不是 "左" 或 "右"
 */
async function padStr(num, len, padding = "0", side = "左") {
  if (typeof len !== "number" || len <= 0 || !Number.isInteger(len)) {
    throw new Error("len 必须是正整数");
  }
  if (side !== "左" && side !== "右") {
    throw new Error('side 必须是 "左" 或 "右"');
  }
  const str = String(num);
  return side === "左" ? str.padStart(len, padding) : str.padEnd(len, padding);
}

/**
 * 从数组中随机选择一个元素
 * @param {Array} a - 输入数组
 * @returns {*} 随机选择的数组元素
 * @throws {Error} 如果 a 不是数组或为空
 */
async function randomList(a) {
  if (!Array.isArray(a) || a.length === 0) {
    throw new Error("输入字符串必须是非空数组");
  }
  const idx = Math.floor(Math.random() * a.length);
  return a[idx];
}

/**
 * 生成指定长度的 MD5 哈希值（16 或 32 位）
 * @param {string} str - 待哈希的字符串
 * @param {number} [len=32] - 哈希长度（16 或 32）
 * @param {boolean} [upper=false] - 是否返回大写哈希值
 * @returns {string} MD5 哈希值
 * @throws {Error} 如果 str 不是字符串或 len 不是 16 或 32
 */
async function MD5(str, len = 32, upper = false) {
  if (typeof str !== "string") {
    throw new Error("str 必须是字符串");
  }
  if (len !== 16 && len !== 32) {
    throw new Error("len 必须是 16 或 32");
  }
  let hash = CryptoJs.MD5(str).toString();
  if (len === 16) {
    hash = hash.slice(8, 24);
  }
  if (upper) {
    hash = hash.toUpperCase();
  }
  return hash;
}

/**
 * 生成指定长度的随机字符串（包含字母和数字）
 * @param {number} n - 字符串长度
 * @returns {string} 随机字符串
 * @throws {Error} 如果 n 不是正整数
 */
async function getStr(n) {
  if (typeof n !== "number" || n <= 0 || !Number.isInteger(n)) {
    throw new Error("n 必须是正整数");
  }
  const chars = "qwertyuiopasdfghjklzxcvb1234567890";
  const result = Array.from(
    { length: n },
    () => chars[Math.floor(Math.random() * chars.length)]
  ).join("");
  return result;
}

/**
 * 生成指定长度的随机数字字符串
 * @param {number} n - 字符串长度
 * @returns {string} 随机数字字符串
 * @throws {Error} 如果 n 不是正整数
 */
async function getNum(n) {
  if (typeof n !== "number" || n <= 0 || !Number.isInteger(n)) {
    throw new Error("n 必须是正整数");
  }
  const chars = "1234567890";
  const result = Array.from(
    { length: n },
    () => chars[Math.floor(Math.random() * chars.length)]
  ).join("");
  return result;
}

/**
 * 生成指定范围内的随机整数（包含 min 和 max）
 * @param {number} min - 最小值（包含）
 * @param {number} max - 最大值（包含）
 * @returns {number} 随机整数
 * @throws {Error} 如果 min > max 或输入非数值
 */
async function getRandomInt(min, max) {
  if (typeof min !== "number" || typeof max !== "number") {
    throw new Error("min 和 max 必须是数值");
  }
  if (min > max) {
    throw new Error("min 必须小于或等于 max");
  }
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

/**
 * 使用 HmacSHA256 算法生成签名并返回指定格式的字符串
 * @param {string} msg - 待签名的消息
 * @param {string} Key - 签名密钥
 * @param {string} [format="hex"] - 返回格式，可选 "hex" 或 "base64"
 * @returns {string} 签名字符串（十六进制或 Base64 格式）
 * @throws {Error} 如果 msg 或 Key 不是字符串，或 format 不是 "hex" 或 "base64"
 */
async function HmacSHA256(msg, Key, format = "hex") {
  if (typeof msg !== "string" || typeof Key !== "string") {
    throw new Error("msg 和 Key 必须是字符串");
  }
  if (format !== "hex" && format !== "base64") {
    throw new Error('format 必须是 "hex" 或 "base64"');
  }
  // 使用 HmacSHA256 算法生成签名
  const hash = CryptoJs.HmacSHA256(msg, Key);
  // 根据 format 返回对应格式的签名
  return format === "hex"
    ? hash.toString(CryptoJs.enc.Hex)
    : hash.toString(CryptoJs.enc.Base64);
}

/**
 * 检查数字是否为偶数
 * @param {number} number - 待检查的数字
 * @returns {boolean} 如果是偶数返回 true，否则返回 false
 * @throws {Error} 如果 number 不是数字
 */
async function checkOddEven(number) {
  if (typeof number !== "number") {
    throw new Error("number 必须是数字");
  }
  return number % 2 === 0;
}

/**
 * 使用 DES 算法加密消息
 * @param {string} msg - 待加密的消息
 * @param {string} key - 加密密钥
 * @param {string} iv - 初始化向量（仅 CBC 模式需要）
 * @param {string} [mode="CBC"] - 加密模式，可选 "CBC" 或 "ECB"
 * @returns {string} 加密后的字符串
 * @throws {Error} 如果 msg 或 key 不是字符串，或 mode 不是 "CBC" 或 "ECB"，或 CBC 模式下 iv 不是字符串
 */
async function DES_encryptBy(msg, key, iv, mode = "CBC") {
  if (typeof msg !== "string" || typeof key !== "string") {
    throw new Error("msg 和 key 必须是字符串");
  }
  if (mode !== "CBC" && mode !== "ECB") {
    throw new Error('mode 必须是 "CBC" 或 "ECB"');
  }
  const parsedKey = CryptoJs.enc.Utf8.parse(key);
  const options = {
    padding: CryptoJs.pad.Pkcs7,
    mode: mode === "CBC" ? CryptoJs.mode.CBC : CryptoJs.mode.ECB,
  };
  if (mode === "CBC") {
    if (typeof iv !== "string") {
      throw new Error("CBC 模式下 iv 必须是字符串");
    }
    options.iv = CryptoJs.enc.Utf8.parse(iv);
  }
  const encrypted = CryptoJs.DES.encrypt(msg, parsedKey, options);
  return encrypted.toString();
}

/**
 * 使用 DES 算法解密消息
 * @param {string} msg - 待解密的消息
 * @param {string} key - 解密密钥
 * @param {string} iv - 初始化向量（仅 CBC 模式需要）
 * @param {string} [mode="CBC"] - 解密模式，可选 "CBC" 或 "ECB"
 * @returns {string} 解密后的字符串
 * @throws {Error} 如果 msg 或 key 不是字符串，或 mode 不是 "CBC" 或 "ECB"，或 CBC 模式下 iv 不是字符串
 */
async function DES_decryptBy(msg, key, iv, mode = "CBC") {
  if (typeof msg !== "string" || typeof key !== "string") {
    throw new Error("msg 和 key 必须是字符串");
  }
  if (mode !== "CBC" && mode !== "ECB") {
    throw new Error('mode 必须是 "CBC" 或 "ECB"');
  }
  const parsedKey = CryptoJs.enc.Utf8.parse(key);
  const options = {
    padding: CryptoJs.pad.Pkcs7,
    mode: mode === "CBC" ? CryptoJs.mode.CBC : CryptoJs.mode.ECB,
  };
  if (mode === "CBC") {
    if (typeof iv !== "string") {
      throw new Error("CBC 模式下 iv 必须是字符串");
    }
    options.iv = CryptoJs.enc.Utf8.parse(iv);
  }
  const decrypted = CryptoJs.DES.decrypt(msg, parsedKey, options);
  return decrypted.toString(CryptoJs.enc.Utf8);
}

/**
 * 使用 AES 算法加密消息
 * @param {string} msg - 待加密的消息
 * @param {string} key - 加密密钥
 * @param {string} iv - 初始化向量（仅 CBC 模式需要）
 * @param {string} [mode="CBC"] - 加密模式，可选 "CBC" 或 "ECB"
 * @returns {string} 加密后的字符串
 * @throws {Error} 如果 msg 或 key 不是字符串，或 mode 不是 "CBC" 或 "ECB"
 */
async function AES_encrypt(msg, key, iv, mode = "CBC") {
  if (typeof msg !== "string" || typeof key !== "string") {
    throw new Error("msg 和 key 必须是字符串");
  }
  if (mode !== "CBC" && mode !== "ECB") {
    throw new Error('mode 必须是 "CBC" 或 "ECB"');
  }
  const parsedKey = CryptoJs.enc.Utf8.parse(key);
  const options = {
    padding: CryptoJs.pad.Pkcs7,
    mode: mode === "CBC" ? CryptoJs.mode.CBC : CryptoJs.mode.ECB,
  };
  if (mode === "CBC") {
    if (typeof iv !== "string") {
      throw new Error("iv 必须是字符串");
    }
    options.iv = CryptoJs.enc.Utf8.parse(iv);
  }
  const encrypted = CryptoJs.AES.encrypt(msg, parsedKey, options);
  return encrypted.toString();
}

/**
 * 使用 AES 算法解密消息
 * @param {string} msg - 待解密的消息
 * @param {string} key - 解密密钥
 * @param {string} iv - 初始化向量（仅 CBC 模式需要）
 * @param {string} [mode="CBC"] - 解密模式，可选 "CBC" 或 "ECB"
 * @returns {string} 解密后的字符串
 * @throws {Error} 如果 msg 或 key 不是字符串，或 mode 不是 "CBC" 或 "ECB"
 */
async function AES_decrypt(msg, key, iv, mode = "CBC") {
  if (typeof msg !== "string" || typeof key !== "string") {
    throw new Error("msg 和 key 必须是字符串");
  }
  if (mode !== "CBC" && mode !== "ECB") {
    throw new Error('mode 必须是 "CBC" 或 "ECB"');
  }
  const parsedKey = CryptoJs.enc.Utf8.parse(key);
  const options = {
    padding: CryptoJs.pad.Pkcs7,
    mode: mode === "CBC" ? CryptoJs.mode.CBC : CryptoJs.mode.ECB,
  };
  if (mode === "CBC") {
    if (typeof iv !== "string") {
      throw new Error("iv 必须是字符串");
    }
    options.iv = CryptoJs.enc.Utf8.parse(iv);
  }
  const decrypted = CryptoJs.AES.decrypt(msg, parsedKey, options);
  return decrypted.toString(CryptoJs.enc.Utf8);
}

// 生成 UUID
async function getUUID(length = 36) {
  const chars = "0123456789abcdef";
  const randomChar = () => chars.charAt(Math.floor(Math.random() * 16));
  const uuid = Array.from({ length }, (_, i) => randomChar());

  // 设置 UUID 的固定格式字符
  uuid[14] = "4";
  uuid[19] = chars.charAt((parseInt(uuid[19], 16) & 0x3) | 0x8);
  [8, 13, 18, 23].forEach((pos) => (uuid[pos] = "-"));

  return uuid.join("");
}

/**
 * 生成指定长度的随机字符串，字符串来源于指定的句子
 * @param {number} len - 随机字符串的长度
 * @param {string} sentence - 用于生成随机字符的源字符串
 * @returns {string} 随机生成的字符串
 * @throws {Error} 如果 len 不是正整数或 sentence 不是字符串
 */
async function get_random_sentence(len, sentence) {
  if (typeof len !== "number" || len <= 0 || !Number.isInteger(len)) {
    throw new Error("len 必须是正整数");
  }
  if (typeof sentence !== "string") {
    throw new Error("sentence 必须是字符串");
  }
  const characters = Array.from(sentence);
  const randomChars = Array.from({ length: len }, () => {
    const randomIndex = Math.floor(Math.random() * characters.length);
    return characters[randomIndex];
  });
  return randomChars.join("");
}

/**
 * 将对象转换为 URL 查询字符串格式
 * @param {Object} e - 需要转换的对象
 * @returns {string} 转换后的查询字符串
 */
async function getStrFun(e) {
  var t = "";
  for (var n in e) t += "".concat(n, "=").concat(e[n], "&");
  return t.lastIndexOf("&") == t.length - 1 ? t.substring(0, t.length - 1) : t;
}

/**
 * 使用 RSA 公钥对指定字符串进行加密
 * @param {string} t - 需要加密的字符串
 * @param {string} key - RSA 公钥
 * @param {string} [outputFormat="hex"] - 输出格式，支持 "hex" 或 "base64"
 * @returns {string} 加密后的字符串（十六进制或 Base64 格式）
 */
async function encrypt_rsa(t, key, outputFormat = "base64") {
  const nodersa = new NodeRSA(
    "-----BEGIN PUBLIC KEY-----\n" + key + "\n-----END PUBLIC KEY-----"
  );
  nodersa.setOptions({ encryptionScheme: "pkcs1" });
  const decryptText = nodersa.encrypt(
    t,
    outputFormat === "base64" ? "base64" : "hex",
    "utf8"
  );
  return decryptText;
}

/**
 * 使用 RSA 私钥对指定字符串进行解密
 * @param {string} encryptedText - 需要解密的字符串（Base64 或十六进制格式）
 * @param {string} privateKey - RSA 私钥
 * @param {string} [inputFormat="base64"] - 输入格式，支持 "base64" 或 "hex"
 * @returns {string} 解密后的原始字符串
 */
async function decrypt_rsa(t, key, outputFormat = "base64") {
  const nodersa = new NodeRSA(
    "-----BEGIN PUBLIC KEY-----\n" + key + "\n-----END PUBLIC KEY-----"
  );
  nodersa.setOptions({ encryptionScheme: "pkcs1" });
  const decryptText = nodersa.decrypt(
    t,
    outputFormat === "base64" ? "base64" : "hex",
    "utf8"
  );
  return decryptText;
}

/**
 * 发送 HTTP 请求
 * @param {string} m - HTTP 方法（get/post/put/delete）
 * @param {Object} t - 请求配置（url, headers, body, timeout）
 * @param {string} p - 代理配置（格式：IP:端口）
 * @param {Function} e - 回调函数（error, request, response）
 */
function send(m, t, p, e = () => {}) {
  // 校验 HTTP 方法
  const validMethods = new Set(["get", "post", "put", "delete"]);
  if (!validMethods.has(m)) {
    console.log(`无效的 HTTP 方法：${m}`);
    return;
  }

  // 动态设置请求头
  if (t.headers) {
    if (m === "get") {
      delete t.headers["content-type"];
      delete t.headers["Content-Length"];
    } else if (t.body && !t.headers["content-type"]) {
      t.headers["content-type"] = "application/json";
    }
  }

  // 代理配置（仅在需要时生成）
  const proxyConfig = p.includes(":")
    ? {
        host: p.split(":")[0],
        port: parseInt(p.split(":")[1]),
      }
    : undefined;

  // 请求配置
  const axiosConfig = {
    method: m,
    url: t.url,
    headers: t.headers,
    timeout: t.timeout,
    data: m === "get" ? undefined : t.body,
    proxy: proxyConfig,
  };

  // 发送请求并处理响应/错误
  axios(axiosConfig)
    .then((response) => {
      const { status, headers, data } = response;
      e(null, response.request, { statusCode: status, headers, body: data });
    })
    .catch((error) => {
      console.error("请求失败:", error);
      e(error, null, null);
    });
}

// 获取代理 IP
async function fetchProxyIp(url) {
  try {
    const { data } = await axios.get(url);
    return data; // 直接返回 data，避免不必要的变量声明
  } catch (error) {
    console.error("获取代理 IP 失败:", error.message);
    throw error; // 保持错误抛出，便于上层处理
  }
}

/**
 * 获取指定长度的时间戳
 * @param {number} len - 时间戳长度（10 或 13），默认为 13
 * @returns {number} 对应位数的时间戳
 * @throws {Error} 如果 len 不是 10 或 13
 */
function getTimestamps(len = 13) {
  if (len !== 10 && len !== 13) {
    throw new Error("参数 len 必须是 10 或 13");
  }
  const now = new Date();
  return len === 10 ? Math.floor(now.getTime() / 1000) : now.getTime();
}

/**
 * 格式化日期时间
 * @param {Date|string|number} date - 日期对象、日期字符串或时间戳
 * @param {string} format - 格式字符串，支持以下占位符：
 *   YYYY: 4位年份
 *   YY: 2位年份
 *   MM: 月份(01-12)
 *   M: 月份(1-12)
 *   DD: 日期(01-31)
 *   D: 日期(1-31)
 *   HH: 24小时制小时(00-23)
 *   H: 24小时制小时(0-23)
 *   hh: 12小时制小时(01-12)
 *   h: 12小时制小时(1-12)
 *   mm: 分钟(00-59)
 *   m: 分钟(0-59)
 *   ss: 秒(00-59)
 *   s: 秒(0-59)
 *   SSS: 毫秒(000-999)
 *   A: 上午/下午
 *   a: am/pm
 * @returns {string} 格式化后的日期时间字符串
 * @example
 * formatDateTime(new Date(), 'YYYY-MM-DD HH:mm:ss') // 2023-10-11 15:30:45
 * formatDateTime(Date.now(), 'YY/MM/DD hh:mm:ss A') // 23/10/11 03:30:45 下午
 */
function formatDateTime(date, format = "YYYY-MM-DD HH:mm:ss") {
  let d = date;
  if (!(d instanceof Date)) {
    d = new Date(d);
  }

  const pad = (n) => n.toString().padStart(2, "0");
  const pad3 = (n) => n.toString().padStart(3, "0");

  const year = d.getFullYear();
  const month = d.getMonth() + 1;
  const day = d.getDate();
  const hours = d.getHours();
  const minutes = d.getMinutes();
  const seconds = d.getSeconds();
  const milliseconds = d.getMilliseconds();
  const isAM = hours < 12;

  const replacements = {
    YYYY: year,
    YY: year.toString().slice(-2),
    MM: pad(month),
    M: month,
    DD: pad(day),
    D: day,
    HH: pad(hours),
    H: hours,
    hh: pad(hours % 12 || 12),
    h: hours % 12 || 12,
    mm: pad(minutes),
    m: minutes,
    ss: pad(seconds),
    s: seconds,
    SSS: pad3(milliseconds),
    A: isAM ? "上午" : "下午",
    a: isAM ? "am" : "pm",
  };

  return format.replace(
    /YYYY|YY|MM|M|DD|D|HH|H|hh|h|mm|m|ss|s|SSS|A|a/g,
    (match) => replacements[match]
  );
}

module.exports = {
  延时: wait,
  延时_随机: Sleep_time,
  手机号: phoneNum,
  左右侧补位: padStr,
  数组_取随机值: randomList,
  校验_md5: MD5,
  CryptoJs: CryptoJs,
  字符串_随机: getStr,
  数字_随机: getNum,
  数字_取范围: getRandomInt,
  校验_HmacSHA256: HmacSHA256,
  校验_奇偶: checkOddEven,
  DES加密: DES_encryptBy,
  DES解密: DES_decryptBy,
  AES加密: AES_encrypt,
  AES解密: AES_decrypt,
  生成UUID: getUUID,
  字符串_生成句子: get_random_sentence,
  json_转换字符串: getStrFun,
  RSA加密: encrypt_rsa,
  RSA解密: decrypt_rsa,
  获取ip: fetchProxyIp,
  axios: axios,
  NodeRSA: NodeRSA,
  发送HTTP请求: send,
  时间_取时间戳: getTimestamps,
  时间_格式化: formatDateTime,
};
