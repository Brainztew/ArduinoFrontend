import './App.css'
import Readings from './components/readings'

function App() {
  return (
    <>
      <h1>Här syns andruino avläsning!</h1>
      <h3>Du kan se senaste avläsningen som uppdateras var 30 sekund här under.</h3>
      <h3>ifall du väljer "skicka auto DB" så skickas data var 30:e minut som sedan syns i diagramet. Du kan även trycka på "skicka data" knappen på arduino enheten för att manuellt skicka in värde till databasen.</h3>
      <p>Ifall live värdena går utanför komfortabla nivårer så ändras färg till rött för att markera dåligt inomhusklimat!</p>
      <Readings />
 
  
    </>
  );
}

export default App
