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
 * 初始化 https 模块
 * @returns {object} https 模块实例
 * @throws {Error} 如果 https 模块未安装
 */
const https = (() => {
  try {
    return require("https");
  } catch (error) {
    throw new Error("\n缺少依赖：请安装 `https` 安装依赖\n");
  }
})();
//=================================================================================
//=================================================================================
//=================================================================================
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
//=================================================================================
//=================================================================================
//=================================================================================
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
//=================================================================================
//=================================================================================
//=================================================================================
/**
 * 对手机号进行脱敏处理
 * @param {string} phone_num - 手机号
 * @returns {string} 脱敏后的手机号
 * @throws {Error} 如果 phone_num 不是字符串
 */
function phoneNum(phone_num) {
  if (typeof phone_num !== "string") {
    throw new Error("phone_num 必须是字符串");
  }
  if (phone_num.length === 11) {
    return phone_num.replace(/(\d{3})\d{4}(\d{4})/, "$1****$2");
  }
  return phone_num;
}
//=================================================================================
//=================================================================================
//=================================================================================
/**
 * 对字符串进行补位操作
 * @param {string|number} num - 要补位的字符串或数字
 * @param {number} len - 补位后的目标长度
 * @param {string} [padding="0"] - 补位字符，默认为 "0"
 * @param {string} [side="左"] - 补位方向，可选 "左" 或 "右"，默认为 "左"
 * @returns {string} 补位后的字符串
 * @throws {Error} 如果 len 不是正整数或 side 不是 "左" 或 "右"
 */
function padStr(num, len, padding = "0", side = "左") {
  if (typeof len !== "number" || len <= 0 || !Number.isInteger(len)) {
    throw new Error("len 必须是正整数");
  }
  if (side !== "左" && side !== "右") {
    throw new Error('side 必须是 "左" 或 "右"');
  }
  const str = String(num);
  return side === "左" ? str.padStart(len, padding) : str.padEnd(len, padding);
}
//=================================================================================
//=================================================================================
//=================================================================================
/**
 * 从数组中随机选择一个元素
 * @param {Array} a - 输入数组
 * @returns {*} 随机选择的数组元素
 * @throws {Error} 如果 a 不是数组或为空
 */
function randomList(a) {
  if (!Array.isArray(a) || a.length === 0) {
    throw new Error("输入字符串必须是非空数组");
  }
  const idx = Math.floor(Math.random() * a.length);
  return a[idx];
}
//=================================================================================
//=================================================================================
//=================================================================================
/**
 * 生成指定长度的 MD5 哈希值（16 或 32 位）
 * @param {string} str - 待哈希的字符串
 * @param {number} [len=32] - 哈希长度（16 或 32）
 * @param {boolean} [upper=false] - 是否返回大写哈希值
 * @returns {string} MD5 哈希值
 * @throws {Error} 如果 str 不是字符串或 len 不是 16 或 32
 */
function MD5(str, len = 32, upper = false) {
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
//=================================================================================
//=================================================================================
//=================================================================================
/**
 * 生成指定长度的随机字符串（包含字母和数字）
 * @param {number} n - 字符串长度
 * @returns {string} 随机字符串
 * @throws {Error} 如果 n 不是正整数
 */
function getStr(n) {
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
//=================================================================================
//=================================================================================
//=================================================================================
/**
 * 生成指定长度的随机数字字符串
 * @param {number} n - 字符串长度
 * @returns {string} 随机数字字符串
 * @throws {Error} 如果 n 不是正整数
 */
function getNum(n) {
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
//=================================================================================
//=================================================================================
//=================================================================================
/**
 * 生成指定范围内的随机整数（包含 min 和 max）
 * @param {number} min - 最小值（包含）
 * @param {number} max - 最大值（包含）
 * @returns {number} 随机整数
 * @throws {Error} 如果 min > max 或输入非数值
 */
function getRandomInt(min, max) {
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
//=================================================================================
//=================================================================================
//=================================================================================
/**
 * 使用 HmacSHA256 算法生成签名并返回指定格式的字符串
 * @param {string} msg - 待签名的消息
 * @param {string} Key - 签名密钥
 * @param {string} [format="hex"] - 返回格式，可选 "hex" 或 "base64"
 * @returns {string} 签名字符串（十六进制或 Base64 格式）
 * @throws {Error} 如果 msg 或 Key 不是字符串，或 format 不是 "hex" 或 "base64"
 */
function HmacSHA256(msg, Key, format = "hex") {
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
//=================================================================================
//=================================================================================
//=================================================================================
/**
 * 检查数字是否为偶数
 * @param {number} number - 待检查的数字
 * @returns {boolean} 如果是偶数返回 true，否则返回 false
 * @throws {Error} 如果 number 不是数字
 */
function checkOddEven(number) {
  if (typeof number !== "number") {
    throw new Error("number 必须是数字");
  }
  return number % 2 === 0;
}
//=================================================================================
//=================================================================================
//=================================================================================
/**
 * 使用 DES 算法加密消息
 * @param {string} msg - 待加密的消息
 * @param {string} key - 加密密钥
 * @param {string} iv - 初始化向量（仅 CBC 模式需要）
 * @param {string} [mode="CBC"] - 加密模式，可选 "CBC" 或 "ECB"
 * @returns {string} 加密后的字符串
 * @throws {Error} 如果 msg 或 key 不是字符串，或 mode 不是 "CBC" 或 "ECB"，或 CBC 模式下 iv 不是字符串
 */
function DES_encryptBy(msg, key, iv, mode = "CBC") {
  if (typeof msg !== "string" || typeof key !== "string") {
    throw new Error("msg 和 key 必须是字符串");
  }
  if (mode !== "CBC" && mode !== "ECB") {
    throw new Error('mode 必须是 "CBC" 或 "ECB"');
  }
  const parsedKey = CryptoJs.enc.Utf8.parse('DbaCsNok');
  iv = CryptoJs.enc.Utf8.parse('12345678');
  const options = {
    padding: CryptoJs.pad.Pkcs7,
    mode: CryptoJs.mode.CBC,
    iv:iv
  };
  
    //options.iv = CryptoJs.enc.Utf8.parse('12345678');
  
  //console.log(options)
  const encrypted = CryptoJs.DES.encrypt('mi7758258', parsedKey, options);
  //console.log(msg, key, iv)
  return encrypted.toString();
}
//=================================================================================
//=================================================================================
//=================================================================================
/**
 * 使用 DES 算法解密消息
 * @param {string} msg - 待解密的消息
 * @param {string} key - 解密密钥
 * @param {string} iv - 初始化向量（仅 CBC 模式需要）
 * @param {string} [mode="CBC"] - 解密模式，可选 "CBC" 或 "ECB"
 * @returns {string} 解密后的字符串
 * @throws {Error} 如果 msg 或 key 不是字符串，或 mode 不是 "CBC" 或 "ECB"，或 CBC 模式下 iv 不是字符串
 */
function DES_decryptBy(msg, key, iv, mode = "CBC") {
  if (typeof msg !== "string" || typeof key !== "string") {
    throw new Error("msg 和 key 必须是字符串");
  }
  if (mode !== "CBC" && mode !== "ECB") {
    throw new Error('mode 必须是 "CBC" 或 "ECB"');
  }
  const parsedKey = CryptoJs.enc.Base64.parse(key) || CryptoJs.enc.Utf8.parse(key);
  const options = {
    padding: CryptoJs.pad.Pkcs7,
    mode: mode === "CBC" ? CryptoJs.mode.CBC : CryptoJs.mode.ECB,
  };
  if (mode === "CBC") {
    if (typeof iv !== "string") {
      throw new Error("CBC 模式下 iv 必须是字符串");
    }
    options.iv = CryptoJs.enc.Base64.parse(iv) || CryptoJs.enc.Utf8.parse(iv);
  }
  const decrypted = CryptoJs.TripleDES.decrypt(msg, parsedKey, options);
  //console.log(decrypted.toString(CryptoJs.enc.Base64))
  return decrypted.toString(CryptoJs.enc.Base64);
}
//=================================================================================
//=================================================================================
//=================================================================================
/**
 * 使用 AES 算法加密消息
 * @param {string} msg - 待加密的消息
 * @param {string} key - 加密密钥
 * @param {string} iv - 初始化向量（仅 CBC 模式需要）
 * @param {string} [mode="CBC"] - 加密模式，可选 "CBC" 或 "ECB"
 * @returns {string} 加密后的字符串
 * @throws {Error} 如果 msg 或 key 不是字符串，或 mode 不是 "CBC" 或 "ECB"
 */
function AES_encrypt(msg, key, iv, mode = "CBC") {
  if (typeof msg !== "string" || typeof key !== "string") {
    throw new Error("msg 和 key 必须是字符串");
  }
  if (mode !== "CBC" && mode !== "ECB") {
    throw new Error('mode 必须是 "CBC" 或 "ECB"');
  }
  const parsedKey = CryptoJs.enc.Base64.parse(key) || CryptoJs.enc.Utf8.parse(key);
  const options = {
    padding: CryptoJs.pad.Pkcs7,
    mode: mode === "CBC" ? CryptoJs.mode.CBC : CryptoJs.mode.ECB,
  };
  if (mode === "CBC") {
    if (typeof iv !== "string") {
      throw new Error("iv 必须是字符串");
    }
    options.iv = CryptoJs.enc.Base64.parse(iv) || CryptoJs.enc.Utf8.parse(iv);
  }
  const encrypted = CryptoJs.AES.encrypt(msg, parsedKey, options);
  return encrypted.toString();
}
//=================================================================================
//=================================================================================
//=================================================================================
/**
 * 使用 AES 算法解密消息
 * @param {string} msg - 待解密的消息
 * @param {string} key - 解密密钥
 * @param {string} iv - 初始化向量（仅 CBC 模式需要）
 * @param {string} [mode="CBC"] - 解密模式，可选 "CBC" 或 "ECB"
 * @returns {string} 解密后的字符串
 * @throws {Error} 如果 msg 或 key 不是字符串，或 mode 不是 "CBC" 或 "ECB"
 */
function AES_decrypt(msg, key, iv, mode = "CBC") {
  if (typeof msg !== "string" || typeof key !== "string") {
    throw new Error("msg 和 key 必须是字符串");
  }
  if (mode !== "CBC" && mode !== "ECB") {
    throw new Error('mode 必须是 "CBC" 或 "ECB"');
  }
  const parsedKey = CryptoJs.enc.Base64.parse(key) || CryptoJs.enc.Utf8.parse(key);
  const options = {
    padding: CryptoJs.pad.Pkcs7,
    mode: mode === "CBC" ? CryptoJs.mode.CBC : CryptoJs.mode.ECB,
  };
  if (mode === "CBC") {
    if (typeof iv !== "string") {
      throw new Error("iv 必须是字符串");
    }
    options.iv = CryptoJs.enc.Base64.parse(iv) || CryptoJs.enc.Utf8.parse(iv);
  }
  const decrypted = CryptoJs.AES.decrypt(msg, parsedKey, options);
  return decrypted.toString(CryptoJs.enc.Utf8);
}
//=================================================================================
//=================================================================================
//=================================================================================
// 生成 UUID
function getUUID(length = 36) {
  const chars = "0123456789abcdef";
  const randomChar = () => chars.charAt(Math.floor(Math.random() * 16));
  const uuid = Array.from({ length }, (_, i) => randomChar());

  // 设置 UUID 的固定格式字符
  uuid[14] = "4";
  uuid[19] = chars.charAt((parseInt(uuid[19], 16) & 0x3) | 0x8);
  [8, 13, 18, 23].forEach((pos) => (uuid[pos] = "-"));

  return uuid.join("");
}
//=================================================================================
//=================================================================================
//=================================================================================
/**
 * 生成指定长度的随机字符串，字符串来源于指定的句子
 * @param {number} len - 随机字符串的长度
 * @param {string} sentence - 用于生成随机字符的源字符串
 * @returns {string} 随机生成的字符串
 * @throws {Error} 如果 len 不是正整数或 sentence 不是字符串
 */
function get_random_sentence(len, sentence) {
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
//=================================================================================
//=================================================================================
//=================================================================================
/**
 * 将对象转换为 URL 查询字符串格式
 * @param {Object} e - 需要转换的对象
 * @returns {string} 转换后的查询字符串
 */
function getStrFun(e) {
  var t = "";
  for (var n in e) t += "".concat(n, "=").concat(e[n], "&");
  return t.lastIndexOf("&") == t.length - 1 ? t.substring(0, t.length - 1) : t;
}
//=================================================================================
//=================================================================================
//=================================================================================
/**
 * 使用 RSA 公钥对指定字符串进行加密
 * @param {string} t - 需要加密的字符串
 * @param {string} key - RSA 公钥
 * @param {string} [outputFormat="hex"] - 输出格式，支持 "hex" 或 "base64"
 * @returns {string} 加密后的字符串（十六进制或 Base64 格式）
 */
function encrypt_rsa(t, key, outputFormat = "base64") {
    const nodersa = new NodeRSA(`-----BEGIN PUBLIC KEY-----\n${key}\n-----END PUBLIC KEY-----`);
    
    nodersa.setOptions({ encryptionScheme: 'pkcs1' });
    const encryptedText = nodersa.encrypt(t, 'base64');
    console.log('加密后的文本:', encryptedText);
    return encryptedText;
}
//=================================================================================
//=================================================================================
//=================================================================================
/**
 * 使用 RSA 私钥对指定字符串进行解密
 * @param {string} encryptedText - 需要解密的字符串（Base64 或十六进制格式）
 * @param {string} privateKey - RSA 私钥
 * @param {string} [inputFormat="base64"] - 输入格式，支持 "base64" 或 "hex"
 * @returns {string} 解密后的原始字符串
 */
function decrypt_rsa(t, key, outputFormat = "base64") {
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
//=================================================================================
//=================================================================================
//=================================================================================
/**
 * 发送 HTTP 请求
 * @param {string} m - HTTP 方法（get/post/put/delete）
 * @param {Object} t - 请求配置（url, headers, body, timeout）
 * @param {string} p - 代理配置（格式：IP:端口）
 * @param {Function} e - 回调函数（error, request, response）
 */
async function send(m, t, p, e = () => {}) {
  m = m.toLowerCase()
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
      delete t.headers["content-length"];
    }
  }
  
  // 代理配置（仅在需要时生成）
  const proxyConfig = (p ?? '').includes(':') 
  ? {protocol:'http',host: p.split(':')[0],port: Number(p.split(':')[1]),headers:{'Connection':'keep-alive'}}   // 端口转数字更稳妥
  : undefined;

  // 请求配置
  const axiosConfig = {
    method: m,
    url: t.url,
    headers: t.headers,
    timeout: t.timeout,
    [m === 'get' ? 'params' : 'data']: m === "get" ? undefined : t.body,
    proxy: proxyConfig,
    httpsAgent: proxyConfig ? new https.Agent({rejectUnauthorized:false}):undefined,
    maxRedirects: 5,
    validateStatus: s => s < 400,
  };
  //console.log(axiosConfig)
  
  //console.log(res)
  try {
      const res = await axios(axiosConfig);
      //console.log(res)
      if(res.status == 200){
          return {err: null, res: res, data: res.data };
          
      }else if(res.status == 301){
          return {err: null, res: res, data: res.data?res.data:'请求响应状态:'+res.status};
          
      }else{
          return {err: null, res: res, data: res.data?res.data:'请求响应状态:'+res.status};
          
          
      }
      
  } catch (err) {
      const status = err.response?.status || err.status || 'NETWORK_ERROR';
      const message = err.response?.data || err.message || null;
      return {
          err: status,
          res: err.response || null,
          data:message
      };
    }
}
//=================================================================================
//=================================================================================
//=================================================================================
// 获取代理 IP
async function fetchProxyIp(url) {
  try {
    const { data } = await axios.get(url,{timeout:5000});

    // 检查数据是否为空或非字符串
    if (typeof data !== "string" || !data.trim()) {
      console.log("获取代理 IP 无效:");
      return null;
    }
    // 检查格式是否为 IP:端口
    const parts = data.split(":");
    if (parts.length !== 2) {
      console.log("获取非代理 IP 格式:");
      return null;  
    }
    // 返回有效数据
    return data; 
  } catch {
    console.log("获取代理 IP 失败:");
    return null;
  }
}
//=================================================================================
//=================================================================================
//=================================================================================
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
//=================================================================================
//=================================================================================
//=================================================================================
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
function formatDateTime(format = "YYYY-MM-DD HH:mm:ss") {
  let d = getTimestamps();
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

//=================================================================================
//=================================================================================
//=================================================================================
/**
 * 3DES 加密
 * @param {string} plainText - 待加密的明文
 * @param {string} key - 加密密钥（16 或 24 字节）
 * @param {string} [iv] - 初始化向量（仅 CBC 模式需要）
 * @param {string} [mode="CBC"] - 加密模式（CBC 或 ECB）
 * @returns {string} - Base64 编码的密文
 */
function tripleDESEncrypt(plainText, key, iv, mode = "CBC") {
  // 输入验证
  if (typeof plainText !== "string" || !plainText.trim()) {
    throw new Error("plainText 必须是非空字符串");
  }
  if (typeof key !== "string" || !key.trim()) {
    throw new Error("key 必须是非空字符串");
  }
  if (mode !== "CBC" && mode !== "ECB") {
    throw new Error('mode 必须是 "CBC" 或 "ECB"');
  }
  if (mode === "CBC" && (typeof iv !== "string" || !iv.trim())) {
    throw new Error("iv 必须是非空字符串");
  }

  try {
    const parsedKey = CryptoJs.enc.Utf8.parse(key);
    const options = {
      mode: mode === "CBC" ? CryptoJs.mode.CBC : CryptoJs.mode.ECB,
      padding: CryptoJs.pad.Pkcs7,
    };
    if (mode === "CBC") {
      options.iv = CryptoJs.enc.Utf8.parse(iv);
    }

    const encrypted = CryptoJs.TripleDES.encrypt(
      CryptoJs.enc.Utf8.parse(plainText),
      parsedKey,
      options
    );
    return encrypted.toString();
  } catch (error) {
    console.error("3DES 加密失败:", error);
    throw new Error("加密过程中发生错误");
  }
}
//=================================================================================
//=================================================================================
//=================================================================================
/**
 * 3DES 解密
 * @param {string} cipherText - Base64 编码的密文
 * @param {string} key - 解密密钥（16 或 24 字节）
 * @param {string} [iv] - 初始化向量（仅 CBC 模式需要）
 * @param {string} [mode="CBC"] - 解密模式（CBC 或 ECB）
 * @returns {string} - 解密后的明文
 */
function tripleDESDecrypt(cipherText, key, iv, mode = "CBC") {
  // 输入验证
  if (typeof cipherText !== "string" || !cipherText.trim()) {
    throw new Error("cipherText 必须是非空字符串");
  }
  if (typeof key !== "string" || !key.trim()) {
    throw new Error("key 必须是非空字符串");
  }
  if (mode !== "CBC" && mode !== "ECB") {
    throw new Error('mode 必须是 "CBC" 或 "ECB"');
  }
  if (mode === "CBC" && (typeof iv !== "string" || !iv.trim())) {
    throw new Error("iv 必须是非空字符串");
  }

  try {
    const parsedKey = CryptoJs.enc.Utf8.parse(key);
    const options = {
      mode: mode === "CBC" ? CryptoJs.mode.CBC : CryptoJs.mode.ECB,
      padding: CryptoJs.pad.Pkcs7,
    };
    if (mode === "CBC") {
      options.iv = CryptoJs.enc.Utf8.parse(iv);
    }

    const decrypted = CryptoJs.TripleDES.decrypt(
      cipherText,
      parsedKey,
      options
    );
    return decrypted.toString(CryptoJs.enc.Utf8);
  } catch (error) {
    console.error("3DES 解密失败:", error);
    throw new Error("解密过程中发生错误");
  }
}
//new Date().toLocaleString('sv-SE') // "2025-10-27 14:32:45"
//=================================================================================
//=================================================================================
//=================================================================================
/**
 * 获取指定时间日期
 * @param {str} 年月日
 */
function getTimes(t) {
    const now = new Date();
    // 获取年、月、日
    const year = now.getFullYear(); // 获取年份
    const month = now.getMonth() + 1; // 获取月份，注意月份是从0开始的
    const date = now.getDate(); // 获取日期
    
    // 获取星期
    const days = ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六'];
    const dayOfWeek = days[now.getDay()]; // 获取星期
    // 获取时、分、秒
    const hours = now.getHours(); // 获取小时
    const minutes = now.getMinutes(); // 获取分钟
    const seconds = now.getSeconds(); // 获取秒
    let m = ''
    if(t=='年'){
        m = year
    }else if(t=='月'){
        m = month
    }else if(t=='日'){
        m = date
    }else if(t=='时'){
        m = hours
    }else if(t=='分'){
        m = minutes
    }else if(t=='秒'){
        m = seconds
    }else if(t=='星期'){
        m = dayOfWeek
    }
    return m
}
function get_version() {
    return '版本号:25.10.11'
}
function timeUntilNextTen() {
    const now = new Date(); // 获取当前时间
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate()); // 获取今天0点的时间
    const nextTen = new Date(today.getTime() + 10 * 60 * 60 * 1000); // 计算下一个10点的时间

    // 如果当前时间已经过了10点，计算到下一个10点的时间
    if (now >= nextTen) {
        nextTen.setUTCDate(nextTen.getUTCDate() + 1); // 加一天
    }

    const timeUntilNextTen = nextTen - now; // 计算时间差（毫秒）
    return timeUntilNextTen;
}

module.exports = {
  版本号: get_version,
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
  NodeRSA: NodeRSA,
  发送HTTP请求: send,
  时间_取时间戳: getTimestamps,
  时间_格式化: formatDateTime,
  时间_取日期: getTimes,
  时间_取时间差: timeUntilNextTen,
  DES_3加密: tripleDESEncrypt,
  DES_3解密: tripleDESDecrypt,
};
