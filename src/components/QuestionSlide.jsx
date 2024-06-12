import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { nextQuestion, setAnswer, calculateResults } from '../actions/quizActions';
import ProgressBar from './ProgressBar';
import '../main.css';

const QuestionSlide = () => {
  const dispatch = useDispatch();
  const { questions, currentQuestionIndex } = useSelector((state) => state.quiz);
  const [selectedOption, setSelectedOption] = useState('');
  const [shortAnswer, setShortAnswer] = useState('');
  const [longAnswer, setLongAnswer] = useState('');

  const handleNextQuestion = () => {
    if (questions[currentQuestionIndex].type === 'multipleChoice') {
      dispatch(setAnswer(selectedOption));
    } else if (questions[currentQuestionIndex].type === 'shortAnswer') {
      dispatch(setAnswer(shortAnswer));
    } else if (questions[currentQuestionIndex].type === 'longAnswer') {
      dispatch(setAnswer(longAnswer));
    }

    if (currentQuestionIndex < questions.length - 1) {
      dispatch(nextQuestion());
    } else {
      dispatch(calculateResults());
    }

    setSelectedOption('');
    setShortAnswer('');
    setLongAnswer('');
  };

  const handleOptionChange = (e) => {
    setSelectedOption(e.target.value);
  };

  const handleShortAnswerChange = (e) => {
    setShortAnswer(e.target.value);
  };

  const handleLongAnswerChange = (e) => {
    setLongAnswer(e.target.value);
  };

  const currentQuestion = questions[currentQuestionIndex];

  return (
    <div className="question-slide">
      <ProgressBar currentQuestionIndex={currentQuestionIndex} totalQuestions={questions.length} />
      <h2 className="question-title">{currentQuestion.question}</h2>
      {currentQuestion.type === 'multipleChoice' && (
        <div className="options">
          {currentQuestion.options.map((option, index) => (
            <div key={index} className="option">
              <input
                type="radio"
                id={`option${index}`}
                name="option"
                value={option}
                checked={selectedOption === option}
                onChange={handleOptionChange}
              />
              <label htmlFor={`option${index}`}>{option}</label>
            </div>
          ))}
        </div>
      )}
      {currentQuestion.type === 'shortAnswer' && (
        <div className="short-answer">
          <input
            type="text"
            value={shortAnswer}
            onChange={handleShortAnswerChange}
            placeholder="Введите ваш ответ"
          />
        </div>
      )}
      {currentQuestion.type === 'longAnswer' && (
        <div className="long-answer">
          <textarea
            value={longAnswer}
            onChange={handleLongAnswerChange}
            placeholder="Введите ваш развернутый ответ"
          />
        </div>
      )}
      <button className="next-button" onClick={handleNextQuestion}>
        {currentQuestionIndex < questions.length - 1 ? 'Следующий вопрос' : 'Отправить'}
      </button>
    </div>
  );
};

export default QuestionSlide;
