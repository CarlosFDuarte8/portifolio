import logo from './logo.svg';
import './App.css';
import Navtop from './components/Navtop';
import Intro from './components/Intro';
import About from './components/About';
import Contact from './components/Contact';
import Footer from './components/Footer';

function App() {
  return (
    <div className="container">
      <Navtop />
      <Intro />
      <About />
      <Contact />
      <Footer />
      
    </div>
  );
}

export default App;
