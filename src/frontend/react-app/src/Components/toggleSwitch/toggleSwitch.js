import React from 'react';
import './toggleSwitch.scss';
import { ThemeContext } from '../../App';
import { useContext } from 'react';

const Switch = () => {

  const { isDark, setIsDark } = useContext(ThemeContext);

  function handleSwitch() {
    setIsDark(!isDark);
  }

    return (
        <>
            <input
                className="react-switch-checkbox"
                id={`react-switch-new`}
                type="checkbox"
                checked={isDark}
                onChange={handleSwitch}
            />
            <label
                className="react-switch-label"
                htmlFor={`react-switch-new`}
            >
                <span className={`react-switch-button`} />
            </label>
        </>
    );
};

export default Switch;