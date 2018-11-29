import { removeToast, refreshTimer } from './modifyDOM.js';

export function addExpandEvents(node, expandMinify, refresh, stopTimer) {
  node.addEventListener("mouseover", () => {
    stopTimer();
    expandMinify(true);
  });

  node.addEventListener("mouseout", () => {
    refresh();
    expandMinify(false);
  });
}

export function addActionEvents(node, removeToast, resetExpansion, actionCallback) {
  node.querySelector("#actionButton").addEventListener("click", function () {
    actionCallback && actionCallback();
    removeToast();
    resetExpansion(true);
  });

  node.querySelector('#dismissIcon').addEventListener('click', () => {
    removeToast();
    resetExpansion(true);
  });
}
