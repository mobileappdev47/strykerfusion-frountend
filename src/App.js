import './App.css';
import Handcraft from './components/handcraft/Handcraft';
import Header from './components/header/Header';
import OurBrand from './components/ourbrands/OurBrand';
import Process from './components/process/Process';
import Revolution from './components/revolution/Revolution';
import Products from './components/products/Products';
import AllProducts from './components/allproducts/AllProducts';

function App() {
  return (
    <>
      <section id='homepage'><Header /><Handcraft /></section>
      <section id='brandandprocess'><OurBrand /> <Process /></section>
      <section id='revolution'><Revolution /></section>
      {[1, 2, 3, 4].map((item, index) => (
        <section id='products'>
          <Products key={index} />
        </section>
      ))}
      <section id='allproducts'><AllProducts/></section>
    </>
  );
}

export default App;