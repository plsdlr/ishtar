var _now = new Date().getTime();
var token = 0;

var x = 10;
var interval = 1000


function timer(){
     var distance = new Date().getTime() - _now;
     var seconds = Number(distance)/1000
     return distance
  }

export function get_user_stats() {
    return token;
  }

export function add_tokens(number){
  token = Number(token) + Number(number);
  update_balance();

}

export function reset_tokens(){
  token = 0;
  update_balance();
}


function update_balance() {
  document.getElementById("token_unminted").innerHTML = token;
}
