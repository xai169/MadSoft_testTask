import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { restartQuiz } from '../actions/quizActions';
import '../main.css';

const Result = () => {
  const dispatch = useDispatch();
  const {results , questions} = useSelector((state) => state.quiz);

  const handleRestartQuiz = () => {
    dispatch(restartQuiz());
  };

  return (
    <div className="result-screen result-container">
      <h2 className="result-title">Результаты</h2>
      <p className="result-text">Вы ответили наприльно на {results} из {questions.length}</p>
      <button className="restart-button" onClick={handleRestartQuiz}>Начать заново</button>
    </div>
  );
};

export default Result;
