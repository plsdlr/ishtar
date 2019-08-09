let QRCode = require('qrcode');
const qr_code_base64 = document.getElementById('ishtar-qrcode');
const qr_signed_data = document.getElementById('ishtar-signed-data');

export default function generate_qr(signed_data) {
  QRCode.toDataURL(signed_data)
      .then(res => {
          qr_code_base64.value = res;
      });

  qr_signed_data.value = signed_data;
}
