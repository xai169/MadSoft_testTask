import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { nextQuestion, setAnswer, calculateResults } from '../actions/quizActions';
import ProgressBar from './ProgressBar';
import '../main.css';

const MultipleChoice = ({ options, selectedOption, handleOptionChange }) => (
  <div className="options">
    {options.map((option, index) => (
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
);

const ShortAnswer = ({ shortAnswer, handleShortAnswerChange }) => (
  <div className="short-answer">
    <input
      type="text"
      value={shortAnswer}
      onChange={handleShortAnswerChange}
      placeholder="Введите ваш ответ"
    />
  </div>
);

const LongAnswer = ({ longAnswer, handleLongAnswerChange }) => (
  <div className="long-answer">
    <textarea
      value={longAnswer}
      onChange={handleLongAnswerChange}
      placeholder="Введите ваш развернутый ответ"
    />
  </div>
);

const QuestionSlide = () => {
  const dispatch = useDispatch();
  const { questions, currentQuestionIndex, answers } = useSelector((state) => state.quiz);
  const [selectedOption, setSelectedOption] = useState('');
  const [shortAnswer, setShortAnswer] = useState('');
  const [longAnswer, setLongAnswer] = useState('');

  useEffect(() => {
    // Load answers from localStorage
    const storedAnswers = JSON.parse(localStorage.getItem('answers')) || {};
    if (questions.length > 0) {
      const currentAnswer = storedAnswers[currentQuestionIndex] || answers[currentQuestionIndex] || '';
      switch (questions[currentQuestionIndex].type) {
        case 'multipleChoice':
          setSelectedOption(currentAnswer);
          break;
        case 'shortAnswer':
          setShortAnswer(currentAnswer);
          break;
        case 'longAnswer':
          setLongAnswer(currentAnswer);
          break;
        default:
          break;
      }
    }
  }, [currentQuestionIndex, answers, questions]);

  const saveAnswerToLocalStorage = (index, answer) => {
    const storedAnswers = JSON.parse(localStorage.getItem('answers')) || {};
    storedAnswers[index] = answer;
    localStorage.setItem('answers', JSON.stringify(storedAnswers));
  };

  const handleNextQuestion = () => {
    let answer;
    switch (questions[currentQuestionIndex].type) {
      case 'multipleChoice':
        answer = selectedOption;
        dispatch(setAnswer(answer));
        break;
      case 'shortAnswer':
        answer = shortAnswer;
        dispatch(setAnswer(answer));
        break;
      case 'longAnswer':
        answer = longAnswer;
        dispatch(setAnswer(answer));
        break;
      default:
        break;
    }

    saveAnswerToLocalStorage(currentQuestionIndex, answer);

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
    saveAnswerToLocalStorage(currentQuestionIndex, e.target.value);
  };

  const handleShortAnswerChange = (e) => {
    setShortAnswer(e.target.value);
    saveAnswerToLocalStorage(currentQuestionIndex, e.target.value);
  };

  const handleLongAnswerChange = (e) => {
    setLongAnswer(e.target.value);
    saveAnswerToLocalStorage(currentQuestionIndex, e.target.value);
  };

  const currentQuestion = questions[currentQuestionIndex];

  if (!currentQuestion) return null;

  return (
    <div className="question-slide">
      <ProgressBar currentQuestionIndex={currentQuestionIndex} totalQuestions={questions.length} />
      <h2 className="question-title">{currentQuestion.question}</h2>
      {currentQuestion.type === 'multipleChoice' && (
        <MultipleChoice 
          options={currentQuestion.options} 
          selectedOption={selectedOption} 
          handleOptionChange={handleOptionChange} 
        />
      )}
      {currentQuestion.type === 'shortAnswer' && (
        <ShortAnswer 
          shortAnswer={shortAnswer} 
          handleShortAnswerChange={handleShortAnswerChange} 
        />
      )}
      {currentQuestion.type === 'longAnswer' && (
        <LongAnswer 
          longAnswer={longAnswer} 
          handleLongAnswerChange={handleLongAnswerChange} 
        />
      )}
      <button className="next-button" onClick={handleNextQuestion} disabled={!selectedOption && !shortAnswer && !longAnswer}>
        {currentQuestionIndex < questions.length - 1 ? 'Следующий вопрос' : 'Отправить'}
      </button>
    </div>
  );
};

export default QuestionSlide;
