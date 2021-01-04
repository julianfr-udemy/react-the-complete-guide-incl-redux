import { useEffect, useState } from "react";

let globalState = {};
let listeners = [];
let actions = {};

export const useStore = (shouldListen = true) => {
  const setState = useState(globalState)[1];

  const dispatch = (action, payload) => {
    const newState = actions[action](globalState, payload);

    globalState = { ...globalState, ...newState };

    for (const listener of listeners) {
      listener(globalState);
    }
  };

  useEffect(() => {
    if (shouldListen) {
      listeners.push(setState);
    }

    return () => {
      if (shouldListen) {
        listeners = listeners.filter(listener => listener !== setState);
      }
    }
  }, [setState, shouldListen]);

  return [globalState, dispatch]
};

export const initStore = (userActions, state) => {
  if (state !== null) {
    globalState = { ...globalState, ...state };
  }

  actions = { ...actions, ...userActions }
};