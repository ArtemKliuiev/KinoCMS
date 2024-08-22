export function useLocalStorage() {
  const getLocalStorage = (key) => {
    const storedValue = localStorage.getItem(key);
    return storedValue ? JSON.parse(storedValue) : null;
  };

  const setLocalStorage = (key,value) => {
    localStorage.setItem(key, JSON.stringify(value));
  };

  const removeLocalStorage = (key) => {
    localStorage.removeItem(key);
  };

  return { getLocalStorage, setLocalStorage, removeLocalStorage };
}
