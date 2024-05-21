import { type } from "@testing-library/user-event/dist/type";

export default function StartScreen({ numQuestions, dispatch }) {
  return (
    <div>
      <h2>Welcome to the React Quiz!</h2>
      <h3>{numQuestions} Questions to test your React Mastery</h3>
      <button className="btn btn-ui" onClick={() => dispatch({ type: "start" })}>
        Start
      </button>
    </div>
  );
}
