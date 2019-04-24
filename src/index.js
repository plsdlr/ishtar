import _ from 'lodash'
import get_user_stats from './user_tracker.js';

function component() {
  const element = document.createElement('div');
  const btn = document.createElement('button');

  // Lodash, currently included via a script, is required for this line to work
  element.innerHTML = _.join(['Hello', ':)'], ' ');
  console.log("MAGIC")
  btn.innerHTML = 'Click me and check the console!';
  btn.onclick = get_user_stats;

  element.appendChild(btn);

  return element;
}

document.body.appendChild(component());
