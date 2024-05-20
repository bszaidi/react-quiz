import React, { useEffect, useReducer } from "react";
import Header from "./Header";
import Main from "./Main";

function App() {
  const initialState = {
    questions: [],
    status: "loading",
  };
  function reducer(state, action) {
    switch (action.type) {
      case "dataReceived":
        return { ...state, questions: action.payload, status: "ready" };
      case "dataFailed":
        return { ...state, status: "error" };
      default:
        throw new Error("Action unknown");
    }
  }
  const [state, dispatch] = useReducer(reducer, initialState);

  //Using useEffect to set the title of the document
  useEffect(() => {
    document.title = "The React Quiz";
  }, []);
  //Using useEffect to fetch data from the server
  useEffect(() => {
    fetch("http://localhost:8000/questions")
      .then((response) => response.json())
      .then((data) => dispatch({ type: "dataReceived", payload: data }))
      .catch((error) => dispatch({ type: "dataFailed" }));
  }, []);
  return (
    <div className="App">
      <Header />
      <Main></Main>
    </div>
  );
}

export default App;
