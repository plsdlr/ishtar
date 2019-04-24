var _now = new Date().getTime();
var _actions = new Array();
var _scroll_counter = 0;

document.onclick = clickListener;

window.onscroll = function (e) {
  _scroll_counter = _scroll_counter + 1;
  console.log(_scroll_counter)
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
      //console.log(_actions)
      console.log(timer())
  }


function timer(){
     var distance = new Date().getTime() - _now;
     return distance
  }

export default function get_user_stats() {
    var time_spend = timer()
    var _newstring = _actions.length.toString().concat("__",time_spend.toString(),"__", _scroll_counter.toString())
    console.debug(_newstring)
    return _newstring
  }
