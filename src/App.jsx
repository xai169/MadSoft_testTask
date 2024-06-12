import React from 'react';
import { useSelector } from 'react-redux';
import QuestionSlide from './components/QuestionSlide';
import Result from './components/Result';
import Timer from './components/Timer';
import './main.css';

const App = () => {
  const { results } = useSelector((state) => state.quiz);

  return (
    <div className="app-container">
      <h1 className="app-title">Тестирование</h1>
      {results === null ? (
        <div className="quiz-container">
          <div className="top-section">
            <Timer />
          </div>
          <QuestionSlide />
        </div>
      ) : (
          <Result />
      )}
    </div>
  );
};

export default App;
