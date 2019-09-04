var _now = new Date().getTime();
var _actions = new Array();
var _scroll_counter = 0;
var update_func;
let canvas;

document.onclick = clickListener;


// Select the node that will be observed for mutations
const graphContainer = document.getElementById('graph-container');

// Options for the observer (which mutations to observe)
const config = { attributes: true, childList: true, subtree: true };

// Callback function to execute when mutations are observed
const callback = function(mutationsList, observer) {
    canvas = document.getElementsByTagName('canvas');
    for (let item of canvas) {
        // console.log(item);
        item.addEventListener('click', function(event) {
            clickListener(event);
        }, false);
    }
    observer.disconnect();
};

// Create an observer instance linked to the callback function
const observer = new MutationObserver(callback);

// Start observing the target node for configured mutations
observer.observe(graphContainer, config);

// Later, you can stop observing
// observer.disconnect();

window.onload = function () {
    main_loop();
};


function main_loop() {
    update_func = setInterval(update_balance, 2000);
}


window.onscroll = function (e) {
    _scroll_counter = _scroll_counter + 1;
}

function clickListener(e) {
    var clickedElement = (window.event)
        ? window.event.srcElement
        : e.target,
        tags = document.getElementsByTagName(clickedElement.tagName);
    console.log("get input")
    for (var i = 0; i < tags.length; ++i) {
        if (tags[i] == clickedElement) {
            _actions.push({tag: clickedElement.tagName, index: i});

        }
    }
}


function timer() {
    var distance = new Date().getTime() - _now;
    return distance
}

export default function get_user_stats() {
    var time_spend = timer()
    var tokens = Number(_actions.length) * Number(time_spend) * 0.000001  //// needs to add _scroll_counter
    //var _newstring = _actions.length.toString().concat("__"*,time_spend.toString(),"__", _scroll_counter.toString())
    //_now = new Date().getTime();
    _actions = new Array();
    _now = new Date().getTime();
    var round = Math.round(tokens)
    return round
}

function get_user_unminted_token() {
    var time_spend = timer()
    var tokens = Number(_actions.length) * Number(time_spend) * 0.000001  //// needs to add _scroll_counter
    var round = Math.round(tokens)
    _now = new Date().getTime();
    return round
}

function update_balance() {
    document.getElementById("token_unminted").innerHTML = get_user_unminted_token()
}
