var _now = new Date().getTime();
var _actions = new Array();
var _scroll_counter = 0;

document.onclick = clickListener;

window.onscroll = function (e) {
  _scroll_counter = _scroll_counter + 1;
  }

function clickListener(e)
  {
      var clickedElement=(window.event)
                          ? window.event.srcElement
                          : e.target,
          tags=document.getElementsByTagName(clickedElement.tagName);
      console.log("get input")
      for(var i=0;i<tags.length;++i)
      {
        if(tags[i]==clickedElement)
        {
          _actions.push({tag:clickedElement.tagName,index:i});

        }
      }


      document.getElementById("token_unminted").innerHTML = get_user_unminted_token()
  }


function timer(){
     var distance = new Date().getTime() - _now;
     return distance
  }

export default function get_user_stats() {
    var time_spend = timer()
    var tokens =  Number(_actions.length)*Number(time_spend) * 0.0001  //// needs to add _scroll_counter
    //var _newstring = _actions.length.toString().concat("__"*,time_spend.toString(),"__", _scroll_counter.toString())
    //_now = new Date().getTime();
    _actions = new Array();
    _now = new Date().getTime();
    var round = Math.round(tokens)
    return round
  }

function get_user_unminted_token(){
  var time_spend = timer()
  var tokens =  Number(_actions.length)*Number(time_spend) * 0.0001  //// needs to add _scroll_counter
  var round = Math.round(tokens)
  return round
}
