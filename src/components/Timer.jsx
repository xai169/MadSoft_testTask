import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { calculateResults } from '../actions/quizActions';
import '../main.css';

const Timer = () => {
  const dispatch = useDispatch();
  // Используйте localStorage для сохранения состояния времени
  const [time, setTime] = useState(localStorage.getItem('quizTimer') || 15 * 60);

  useEffect(() => {
    // Сохранение времени в localStorage при каждом обновлении
    localStorage.setItem('quizTimer', time);

    if (time <= 0) {
      dispatch(calculateResults());
      return;
    }

    const timerId = setInterval(() => {
      setTime((prevTime) => prevTime - 1);
    }, 1000);

    return () => clearInterval(timerId);
  }, [time, dispatch]);

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  return <div className="timer">{formatTime(time)}</div>;
};

export default Timer;
