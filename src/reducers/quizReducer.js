import {
  SET_ANSWER,
  NEXT_QUESTION,
  CALCULATE_RESULTS,
  RESTART_QUIZ,
} from '../actions/quizActions';
import {questions} from '../mocks/questions'

const initialState = {
  questions: questions,
  currentQuestionIndex: 0,
  answers: [],
  results: null,
};

const quizReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_ANSWER:
      const answers = [...state.answers];
      answers[state.currentQuestionIndex] = action.payload;
      return {
        ...state,
        answers
      };
    case NEXT_QUESTION:
      return {
        ...state,
        currentQuestionIndex: state.currentQuestionIndex + 1
      };
    case CALCULATE_RESULTS:
      // Обработка результатов
      const correctAnswers = state.questions.reduce((count, question, index) => {
        if (question.correctAnswer === state.answers[index]) {
          return count + 1;
        }
        return count;
      }, 0);
      return {
        ...state,
        results: correctAnswers
      };
      case RESTART_QUIZ:
      return {
        ...state,
        currentQuestionIndex: 0,
        selectedAnswers: [],
        results: null,
      };
    default:
      return state;
  }
};

export default quizReducer;
