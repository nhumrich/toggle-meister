const toastSeparation = 15;
export function expandMinify(pullState, setState, shouldExpand) {
  const state = pullState();
  state.toasts = shouldExpand
    ? state.toasts.reduce(toExpandedArray, [])
    : state.toasts.map(toMinimizedArray);
  setState(state);
}

export function toExpandedArray(expandedToasts, toast, index) {
  let runningTotal = expandedToasts.reduce((total, current) => {
    return total + current.node.clientHeight;
  }, toastSeparation);

  return [...expandedToasts, {...toast, node: expand(toast.node, index, runningTotal)}]
}

export function expand(node, index, runningTotal) {
  node.style.bottom = (index * toastSeparation) + runningTotal + "px";

  return node;
}

export function toMinimizedArray(toast, index) {
  toast.node.style.bottom = (index * toastSeparation) + toastSeparation + "px";

  return toast;
}

export function removeToast(pullState, setState, toastId) {
  const state = pullState();
  state.toasts = state.toasts.filter((toast, index) => {
    toast.message === toastId && document.body.removeChild(toast.node);
    return toast.message !== toastId;
  });
  setState(state);
}

export function removeAllToasts(pullState, setState) {
  let state = pullState();
  state.toasts = state.toasts.filter((toast) => {
    document.body.removeChild(toast.node);
    return false;
  })
  setState(state);
}

export function stopTimer(pullState) {
  clearTimeout(pullState().timer);
}

export function refreshTimer(pullState, setState, removeAll, duration) {
  let state = pullState();
  clearTimeout(state.timer)
  setState({
    ...state,
    timer: setTimeout(
      removeAll.bind(null, pullState, setState),
      duration
    )
  });
}

export function arrayFind(array, prop, value) {
  const found = array.map((item, index) => ({...item, index}))
    .filter((item) => item[prop] === value)[0];

  return found ? found.index : array.length;
}
