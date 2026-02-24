const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: process.env.SMTP_PORT,
  auth: { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS }
});

exports.sendOrderEmail = async (email, order, items) => {
  const keysList = items.map(item => 
    `<li><b>${item.productName}</b> x${item.quantity}<br/>
     Keys: ${(item.deliveredKeys || []).join('<br/>')}</li>`
  ).join('');

  await transporter.sendMail({
    from: `"Divine Shop" <${process.env.SMTP_USER}>`,
    to: email,
    subject: `✅ Đơn hàng #${order.orderCode} đã hoàn thành`,
    html: `
      <h2>Cảm ơn bạn đã mua hàng tại Divine Shop!</h2>
      <p>Mã đơn hàng: <b>#${order.orderCode}</b></p>
      <p>Tổng tiền: <b>${order.finalAmount.toLocaleString('vi-VN')}đ</b></p>
      <h3>Sản phẩm đã mua:</h3>
      <ul>${keysList}</ul>
      <p>Trân trọng,<br/>Divine Shop Team</p>
    `
  });
};
