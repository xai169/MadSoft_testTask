import {
  SET_ANSWER,
  NEXT_QUESTION,
  CALCULATE_RESULTS,
  RESTART_QUIZ,
} from '../actions/quizActions';
import {questions} from '../mocks/questions';

const loadState = () => {
  try {
    const serializedState = localStorage.getItem('quizState');
    if (serializedState === null) {
      return undefined;
    }
    return JSON.parse(serializedState);
  } catch (err) {
    return undefined;
  }
};

const saveState = (state) => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem('quizState', serializedState);
  } catch (err) {
    // Ignore write errors.
  }
};

const persistedState = loadState();

const initialState = {
  questions: questions,
  currentQuestionIndex: 0,
  answers: [],
  results: null,
  ...persistedState
};

const quizReducer = (state = initialState, action) => {
  let newState;
  switch (action.type) {
    case SET_ANSWER:
      const answers = [...state.answers];
      answers[state.currentQuestionIndex] = action.payload;
      newState = {
        ...state,
        answers
      };
      saveState(newState);
      return newState;
    case NEXT_QUESTION:
      newState = {
        ...state,
        currentQuestionIndex: state.currentQuestionIndex + 1
      };
      saveState(newState);
      return newState;
    case CALCULATE_RESULTS:
      const correctAnswers = state.questions.reduce((count, question, index) => {
        if (question.correctAnswer === state.answers[index]) {
          return count + 1;
        }
        return count;
      }, 0);
      newState = {
        ...state,
        results: correctAnswers
      };
      saveState(newState);
      return newState;
    case RESTART_QUIZ:
      localStorage.clear();
      newState = {
        questions: questions,
        currentQuestionIndex: 0,
        answers: [],
        results: null
      };
      saveState(newState);
      return newState;
    default:
      return state;
  }
};

export default quizReducer;
