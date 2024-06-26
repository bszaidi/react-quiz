import React, { useEffect, useReducer } from "react";
import Header from "./Header";
import Main from "./Main";
import Loader from "./Loader";
import Error from "./Error";
import StartScreen from "./StartScreen";
import Question from "./Question";
import NextButton from "./NextButton";
import Progress from "./Progress";
function App() {
  const initialState = {
    questions: [],
    status: "loading",
    index: 0,
    answer: null,
    points: 0,
  };
  function reducer(state, action) {
    switch (action.type) {
      case "dataReceived":
        return { ...state, questions: action.payload, status: "ready" };
      case "dataFailed":
        return { ...state, status: "error" };
      case "start":
        return { ...state, status: "active" };
      case "newAnswer":
        const question = state.questions.at(state.index);
        return { ...state, answer: action.payload, points: action.payload === question.correctOption ? state.points + question.points : state.points };
      case "nextQuestion":
        return { ...state, index: state.index + 1, answer: null };
      default:
        throw new Error("Action unknown");
    }
  }
  const [{ questions, status, index, answer, points }, dispatch] = useReducer(reducer, initialState);
  const numQuestions = questions.length;
  const maxPoints = questions.reduce((acc, question) => acc + question.points, 0);

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
      <Main>
        {status === "loading" && <Loader />}
        {status === "error" && <Error />}
        {status === "ready" && <StartScreen numQuestions={numQuestions} dispatch={dispatch} />}
        {status === "active" && (
          <>
            <Progress index={index} numQuestions={numQuestions} points={points} maxPoints={maxPoints} />
            <Question question={questions[index]} dispatch={dispatch} answer={answer} />
            {answer !== null && <NextButton dispatch={dispatch} />}
          </>
        )}
      </Main>
    </div>
  );
}

export default App;
