var QRCode = require('qrcode')
var canvas = document.getElementById('qr_code')

export default function generate_qr(signed_data){
  QRCode.toCanvas(canvas, signed_data, function (error) {
    if (error) console.error(error)
  })
}
