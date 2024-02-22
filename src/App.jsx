import React, { useState, useCallback, useEffect, useRef } from 'react';

function App() {
  const [length, setLength] = useState(8);
  const [Number, setNumber] = useState(false);
  const [char, setChar] = useState(false);
  const [ password, setPassword] = useState('');
  const passwordRef = useRef(null);

  const passwordGenerator = useCallback(() => {
    let pass ="";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    if(Number) str += "0123456789";
    if(char) str += "!@#$%^&*()_+";
    for (let i = 0; i < length; i++) {
      pass += str.charAt(Math.floor(Math.random() * str.length));
    }
    setPassword(pass);

  }, [length, Number, char]);

  const copyPasswordToClipbord = useCallback(() => {
    passwordRef.current.select();
    window.navigator.clipboard.writeText(password);
  },[password])

  useEffect(() => {
    passwordGenerator();
  },[length, Number, char]);

  return (
    <>
      <div className="flex justify-center items-center h-screen">
        <div className="bg-gray-200 p-4 rounded-lg shadow-md">
          <input
            type="text"
            placeholder="Password"
            readOnly
            className="w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={password}
            ref={passwordRef}
          />
          <button
            onClick={copyPasswordToClipbord}
            className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-md shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Copy
          </button>
          <div className="m-4">
          <div className="mb-2">
            <input
              type="range"
              min={8}
              max={100}
              value={length}
              onChange={(e) => setLength(e.target.value)}
              placeholder="length"
              className="w-64"
            />
            <label className="ml-2">Length: {length}</label>
          </div>
          <div className="flex items-center mb-2">
            <input
              type="checkbox"
              defaultChecked={Number}
              id="inputNumber"
              onChange={() => setNumber((prev) => !prev)}
              className="mr-2"
            />
            <label htmlFor="inputNumber">Number</label>
          </div>
          <div className="flex items-center">
            <input
              type="checkbox"
              defaultChecked={char}
              id="inputChar"
              onChange={() => setChar((prev) => !prev)}
              className="mr-2"
            />
            <label htmlFor="inputChar">Character</label>
          </div>
          </div>
        </div>
      </div>
    </>
)}

export default App
