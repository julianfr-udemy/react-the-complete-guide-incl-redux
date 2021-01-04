import { useCallback, useReducer } from "react";

const httpReducer = (http, action) => {
  switch (action.type) {
    case "SEND": return { isLoading: true, error: null, data: null, extra: null, id: action.id };
    case "RESPONSE": return { ...http, isLoading: false, data: action.data, extra: action.extra };
    case "ERROR": return { isLoading: false, error: action.error, data: null };
    case "CLEAR": return { isLoading: false, error: null, data: null };
    default: throw new Error("Should not get there!");
  }
};

const useHttp = () => {
  const [http, httpDispatch] = useReducer(httpReducer, {
    isLoading: false,
    error: null,
    data: null,
    extra: null,
    id: null
  });

  const sendRequest = useCallback((url, method, body, extra, id) => {
    httpDispatch({ type: "SEND", id })
    fetch(url, { method, body, headers: { "Content-Type": "application/json" } })
      .then(response => {
        httpDispatch({ type: "RESPONSE", data: response, extra });
      }).catch(error => {
        httpDispatch({ type: "ERROR", error: "Something went wrong!" });
      });
  }, []);

  return {
    isLoading: http.isLoading,
    data: http.data,
    error: http.error,
    sendRequest,
    id: http.id
  };
};

export default useHttp;