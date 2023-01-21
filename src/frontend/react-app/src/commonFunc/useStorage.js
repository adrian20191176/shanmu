import { useEffect, useState } from 'react';

function getSavedData(key, initialValue) {
  const savedValue = JSON.parse(sessionStorage.getItem(key));

  if (savedValue) return savedValue;
}

const useSessionStorage = (key, initialValue) => {
  
  const [value, setValue] = useState(() => getSavedData(key, initialValue));

  useEffect(() => {
    sessionStorage.setItem(key, JSON.stringify(value));
  }, [value])

  return [value, setValue]

}

export default useSessionStorage;