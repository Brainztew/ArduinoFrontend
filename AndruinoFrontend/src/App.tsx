import './App.css'
import Readings from './components/readings'

function App() {
  return (
    <>
      <h1>Här syns andruino avläsning!</h1>
      <h3>Du kan se statistik över läsningar och fånga nuvarnade värde!</h3>
      <h3>Du har en ruta med senaste avläsningen som uppdateras var 10 sekund!</h3>
      <Readings />
 
  
    </>
  );
}

export default App
