import React, {useState, useEffect} from 'react'
import './App.css';
import Header from './components/Header'
import Figure from './components/Figure'
import WrongLetters from './components/WrongLetters'
import Word from './components/Word'
import Notification from './components/Notification'
import Popup from './components/Popup'
import {showNotification as show} from './helpers/helpers'



const words = ['app', 'programming', 'interface', 'wizard'];
let selectedWord = words[Math.floor(Math.random() * words.length)];


function App() {
  const [playable, setPlayable] = useState(true)
  const [correctLetters, setCorrectLetters] = useState([])
  const [wrongLetters, setWrongLetters] = useState([])
  const [showNotification, setShowNotification] = useState(false)


  useEffect(() => {
    const handleKeydown = evt => {
      const { key, keyCode } = evt
        if (playable && keyCode >= 65 && keyCode <= 90) {
          const letter = key.toLowerCase();

          if (selectedWord.includes(letter)) {
            if (!correctLetters.includes(letter)) {
              //create a new array, by spreading in the currentLetters
              setCorrectLetters(currentLetters => [...currentLetters, letter])
            } else {
              show(setShowNotification)
            }
          } else {
            if (!wrongLetters.includes(letter)) {
              //create a new array, by spreading in the currentLetters
              setWrongLetters(currentLetters => [...currentLetters, letter])
            } else {
              show(setShowNotification)
            }
          }
        }
     }

     window.addEventListener('keydown', handleKeydown)

    //cleanup so there is only 1 event listner when rerender
    return () => window.removeEventListener('keydown', handleKeydown)

    //empty [] will be render on inital render. Having dependences when updated, this function will be called
  }, [correctLetters, wrongLetters, playable])





  return (
    <>
      <Header />
      <div className='game-container'>
        <Figure wrongLetters={wrongLetters}/>
        <WrongLetters wrongLetters={wrongLetters}/>
        <Word selectedWord={selectedWord} correctLetters={correctLetters}/>
      </div>
        <Popup />
        <Notification showNotification={showNotification}/>
    </>
  );
}

export default App;
