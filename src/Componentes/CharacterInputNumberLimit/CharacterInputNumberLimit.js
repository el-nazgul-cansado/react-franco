import React, { useRef, useEffect } from 'react';

export const CharacterLimitInput = ({ limit, className, onChange, name, value, placeholder }) => {
  const inputRef = useRef(null);

  useEffect(() => {
    const handleKeyPress = (event) => {
      if (event.target.value.length >= limit) {
        event.preventDefault();
      }
    };

    const handleInput = (event) => {
      if (event.target.value.length > limit) {
        inputRef.current.value = event.target.value.slice(0, limit);
      }
    };

    inputRef.current.addEventListener('keypress', handleKeyPress);
    inputRef.current.addEventListener('input', handleInput);

  }, [limit]);

  return (
    <input type="number" className={className} onChange={onChange} name={name} value={value} placeholder={placeholder} ref={inputRef} />
  )
};
