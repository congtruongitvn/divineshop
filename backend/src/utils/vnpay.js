const crypto = require('crypto');
const querystring = require('querystring');

exports.createVnpayUrl = (orderCode, amount, ipAddr) => {
  const tmnCode = process.env.VNPAY_TMN_CODE;
  const secretKey = process.env.VNPAY_HASH_SECRET;
  const vnpUrl = process.env.VNPAY_URL;
  const returnUrl = process.env.VNPAY_RETURN_URL;

  const date = new Date();
  const createDate = date.toISOString().replace(/[-:T.Z]/g, '').substring(0, 14);

  let vnpParams = {
    vnp_Version: '2.1.0',
    vnp_Command: 'pay',
    vnp_TmnCode: tmnCode,
    vnp_Locale: 'vn',
    vnp_CurrCode: 'VND',
    vnp_TxnRef: orderCode,
    vnp_OrderInfo: `Thanh toan don hang ${orderCode}`,
    vnp_OrderType: 'other',
    vnp_Amount: Math.round(amount) * 100,
    vnp_ReturnUrl: returnUrl,
    vnp_IpAddr: ipAddr || '127.0.0.1',
    vnp_CreateDate: createDate,
  };

  vnpParams = Object.keys(vnpParams).sort().reduce((obj, key) => { obj[key] = vnpParams[key]; return obj; }, {});
  const signData = querystring.stringify(vnpParams, { encode: false });
  const hmac = crypto.createHmac('sha512', secretKey);
  vnpParams.vnp_SecureHash = hmac.update(Buffer.from(signData, 'utf-8')).digest('hex');

  return `${vnpUrl}?${querystring.stringify(vnpParams, { encode: false })}`;
};

exports.verifyVnpay = (query) => {
  const secureHash = query.vnp_SecureHash;
  const params = { ...query };
  delete params.vnp_SecureHash;
  delete params.vnp_SecureHashType;
  const sorted = Object.keys(params).sort().reduce((obj, key) => { obj[key] = params[key]; return obj; }, {});
  const signData = querystring.stringify(sorted, { encode: false });
  const hmac = crypto.createHmac('sha512', process.env.VNPAY_HASH_SECRET);
  const hash = hmac.update(Buffer.from(signData, 'utf-8')).digest('hex');
  return hash === secureHash;
};
