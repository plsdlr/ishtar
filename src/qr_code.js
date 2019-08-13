let QRCode = require('qrcode');

export default function generate_qr(signed_data) {
  return QRCode.toDataURL(signed_data);
}
