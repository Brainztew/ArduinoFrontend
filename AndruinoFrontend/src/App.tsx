import './App.css'
import Readings from './components/readings'

function App() {
  return (
    <>
      <h1>Här syns andruino avläsning!</h1>
      <h3>Du kan se senaste avläsningen som uppdateras var 30 sekund här under.</h3>
      <h3>Var 30:e minut fångas värde och skickas till databasen som syns i diagramet. Du kan även trycka på skicka knappen på arduino enheten för att manuellt skicka in värde till databasen.</h3>
      <p>Ifall värdena går utanför komfortabla nivårer så ändras färg till rött för att markera!</p>
      <Readings />
 
  
    </>
  );
}

export default App
