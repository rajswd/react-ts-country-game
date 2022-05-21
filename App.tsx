import * as React from 'react';
import './style.css';

export default function App() {
  const data = {
    Canada: 'Ottawa',
    China: 'Beijing',
    Mauritius: 'Port Louis',
    'United Kingdom': 'London',
    'United States': '	Washington D.C.',
    India: 'New Delhi',
    Malaysia: 'Kualalumpur',
    Germany: 'Berlin',
    'New Zealand': 'Wellington',
  };
  const [gameData, setGameData] = React.useState([]);
  const [actionData, setActionData] = React.useState('');
  const [errData, setErrData] = React.useState([]);

  React.useEffect(() => {
    const d = [];
    for (let i in data) {
      d.push(i, data[i]);
    }
    d.sort();
    setGameData(d);
  }, []);

  const clearActionData = () => {
    setActionData(null);
    setErrData([]);
  };

  const onBtnClick = (e) => {
    const tBtn = e.target.id;
    if(!tBtn) return;
    if (!actionData) {
      setActionData(tBtn);
      setErrData([]);
    } else if (data[tBtn] === actionData || data[actionData] === tBtn) {
      const d = gameData.filter((item) => item !== tBtn && item !== actionData);
      setGameData(d);
      clearActionData();
    } else {
      setErrData([actionData, tBtn]);
      setActionData('');
    }
  };

  return (
    <div
    onClick={onBtnClick}>
      {gameData.length > 0 ? (
        gameData.map((item) => {
          return (
            <button
              className={
                actionData === item
                  ? 'selected-cl'
                  : errData.includes(item)
                  ? 'error-cl'
                  : ''
              }
              id={item}
            >
              {' '}
              {item}
            </button>
          );
        })
      ) : (
        <p>Congratulation</p>
      )}
    </div>
  );
}
