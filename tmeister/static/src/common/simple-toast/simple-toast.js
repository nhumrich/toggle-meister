import { addExpandEvents, addActionEvents } from "./events.js";
import {
  expandMinify,
  removeToast,
  removeAllToasts,
  refreshTimer,
  stopTimer,
} from "./modifyDOM.js";
import styles from "./toast-service.styles.css";

const DEFAULT_TOAST_DURATION = 6000;

let toastServiceState = {
  allJS: false,
  toasts: [],
};

const toastTypes = {
  warning: 'warning',
  general: 'general',
  success: 'success',
  info: 'info',
};

const toasts = {
  warningToast: function(toastObj, actionText, actionCallback, durationInMillis, links=[]) {
    showToast(toastTypes.warning, toastServiceState, ...arguments);
    console.error('WARNING-TOAST: ', toastObj);
    return toasts;
  },
  generalToast: function(toastObj, actionText, actionCallback, durationInMillis, links=[]) {
    showToast(toastTypes.general, toastServiceState, ...arguments);
    console.error('GENERAL-TOAST: ', toastObj);
    return toasts;
  },
  successToast: function(toastObj, actionText, actionCallback, durationInMillis, links=[]) {
    showToast(toastTypes.success, toastServiceState, ...arguments);
    return toasts;
  },
  infoToast: function(toastObj, actionText, actionCallback, durationInMillis, links=[]) {
    showToast(toastTypes.info, toastServiceState, ...arguments);
    return toasts;
  }
};

export function pullState() {
  return toastServiceState;
}

export function setState(state) {
  toastServiceState = state;
}

export function catchAllJsErrors() {
  console.warn('catchAllJsErrors is deprecated');

  return toasts;
}

function showToast(type, state, toastObj, actionText, actionCallback, durationInMillis = DEFAULT_TOAST_DURATION, links) {
  //API works with strings or error objects sadly
  toastObj = typeof toastObj === "string" ? {message: toastObj} : toastObj;
  const index = arrayFind(state.toasts, "message", toastObj.message);
  let refresh = refreshTimer.bind(null, pullState, setState, removeAllToasts, durationInMillis);
  state.toasts[index] = index < state.toasts.length
    ? duplicateToast(state.toasts[index], refresh)
    : buildToast(type, state, links, toastObj, actionText, actionCallback, durationInMillis, refresh)
  return state;
}

export function arrayFind(array, prop, value) {
  const found = array.map((item, index) => ({...item, index}))
    .filter((item) => item[prop] === value)[0];
  return found ? found.index : array.length;
}

export function duplicateToast(toast, refresh) {
  toast.number = toast.number ? toast.number + 1 : 2;
  toast.node.querySelector("#dupes").textContent = `x ${toast.number}`;

  refresh();

  return toast;
}

export function buildToast(type, state, links, toastObj, actionText, actionCallback, durationInMillis, refresh) {
  const toastNode = makeDomNode(
    buildToastString(type, state.toasts.length, links)
  );
  addDomNodeText(toastNode, toastObj.message, actionText, links);
  addExpandEvents(
    toastNode,
    expandMinify.bind(null, pullState, setState),
    refresh,
    stopTimer.bind(null, pullState)
  );
  addActionEvents(
    toastNode,
    removeToast.bind(null, pullState, setState, toastObj.message),
    expandMinify.bind(null, pullState, setState),
    actionCallback
  );
  addToDom(toastNode);

  refresh();

  return {...toastObj, node: toastNode}
}

export function buildToastString(type, stackSize, links = []) {
  const toastTypeMeta = getToastTypeMeta(type);

  return `<div class="MuiPaper-root MuiPaper-elevation3 MuiPaper-rounded ${styles.toaster} ${styles[type]}" style="z-index: ${110000 - stackSize}; bottom: ${stackSize * 15 + 15}px;">
      <div class="${styles.dismiss}">
        <a id="dismissIcon">
          <i class="material-icons MuiIcon-root" aria-hidden="true">
            close
          </i>
        </a>
      </div>
      <div>
        ${toastTypeMeta.image}
      </div>
      <div class="cps-padding-8">
        <strong>${toastTypeMeta.text}</strong>
      </div>
      <div id="messageAndLinks" class="cps-medium-gray" style="text-align: center;">
        <pre style="margin: 0; font-family: inherit; white-space: pre-wrap; word-wrap: break-word; text-align: center; width: 200px;"></pre>
        ${addLinks(links, toastTypeMeta.color)}
      </div>
      <div class="cps-padding-24">
        <strong><a style="color: ${toastTypeMeta.color};" id="actionButton"></a></strong>
      </div>
      <div id="dupes" class="${styles.dupes}" style="font-size: .8rem;">
      </div>
  </div>`;
}

function getToastTypeMeta(type) {
  const meta = {
    color: '#919191',
    text: '',
    image: getImageTag(type),
  };

  switch (type) {
    case toastTypes.info:
      meta.color = '#3399FF';
      meta.text = 'Heads up';
      break;

    case toastTypes.success:
      meta.color = '#00BF4B';
      meta.text = 'Woohoo!';
      break;

    case toastTypes.warning:
      meta.color = '#FF345E';
      meta.text = 'Hmm...';
      break;
  }

  return meta;
}

function getImageTag(toastType) {
  function getIconSvg(type) {
    let theSvg = { file_name: 'exclamation.svg', width: 45, height: 41 };

    switch (type) {
      case toastTypes.info:
        theSvg = { file_name: 'lightbulb.svg', width: 47, height: 64 };
        break;

      case toastTypes.success:
        theSvg = { file_name: 'thumbs-up.svg', width: 42, height: 41 };
        break;
    }

    return theSvg;
  }

  const iconSvg = getIconSvg(toastType);

  return iconSvg ? `<img src="https://cdn.canopytax.com/static/style-guide/${iconSvg.file_name}" width="${iconSvg.width}" height="${iconSvg.height}" />` : null;
}

export function addLinks(links, color) {
  return links.reduce(function(anchors, link) {
    return anchors + `<a href="${link.url}" style="float: none !important; color: ${color};"></a><br />`;
  }, "");
}

export function makeDomNode(domString) {
  let doc = document.implementation.createHTMLDocument("");
  doc.body.innerHTML = domString;

  return doc.body.childNodes[0];
}

export function addDomNodeText(node, message, actionText = "Dismiss", links = []) {
  let messageAndLinks = node.querySelector("#messageAndLinks");
  messageAndLinks.children[0].textContent = message;

  if (Array.isArray(links)) {
    let i = 0;
    Array.prototype.forEach.call(
      Array.prototype.slice.call(messageAndLinks.children, 1),
      (anchor) => {
        if (anchor.nodeName === 'A') {
          anchor.textContent = links[i].label || links[i].url;
          i++;
        }
      }
    );
  }
  node.querySelector("#actionButton").textContent = actionText;
  return node;
}

export function addToDom(node) {
  document.body.appendChild(node);
}

const {warningToast, infoToast, generalToast, successToast} = toasts;
export default toasts;
export {warningToast, infoToast, generalToast, successToast};
