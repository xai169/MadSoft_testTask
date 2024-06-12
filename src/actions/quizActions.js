export const SET_ANSWER = 'SET_ANSWER';
export const NEXT_QUESTION = 'NEXT_QUESTION';
export const CALCULATE_RESULTS = 'CALCULATE_RESULTS';
export const RESTART_QUIZ = 'RESTART_QUIZ';

export const setAnswer = (answer) => ({
  type: SET_ANSWER,
  payload: answer,
});

export const nextQuestion = () => ({
  type: NEXT_QUESTION,
});

export const calculateResults = () => ({
  type: CALCULATE_RESULTS,
});

export const restartQuiz = () => ({
  type: RESTART_QUIZ,
});
