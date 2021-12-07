import React, { useState, useEffect } from 'react'
import './App.css';
import { PropertiesTable } from './PropertiesTable';
import Modal from 'react-modal';

function App() {
  const [modalIsOpen, setIsOpen] = useState(false);
  const [properties, setProperties] = useState([]);
  const [addProperties, setAddProperties] = useState({
  
      address: "",
      valuation: undefined
    
  });

  useEffect(() => {
    getProperties()
  }, [])


  //** use for set assign value to variable **//
  
  function setInput(e){
    let obj = JSON.parse(JSON.stringify(addProperties))
    obj[e.target.id]= e.target.value
    setAddProperties(obj)
  }


 // ** getProperties() have GET API which will show all the existing data **//

  function getProperties(){
    const url = "https://take-home.hasura.app/api/rest/properties/all"; 
    const fetchData = async () => {
      try {
        const response = await fetch(url,{method: 'GET',
        headers: { 'x-hasura-user-id': 'SCy/JCTOKbqrs' }}); 
        const json = await response.json();
        let data = json.properties.filter(val => !val.hidden)
        setProperties(data);
      } catch (error) {
        console.log("error", error);
      }
    }; fetchData();
  }

  // ** onSubmitModal() have POST API which will add new record **//

  function onSubmitModal(){
    const url = "https://take-home.hasura.app/api/rest/properties/add"; 
    const addData = async () => {
      try {
        const response = await fetch(url,{
          method: 'POST',
        headers: { 'x-hasura-user-id': 'SCy/JCTOKbqrs' }, 
        body: JSON.stringify(addProperties)
      }); 
        const json = await response.json();
        setIsOpen(false)
        getProperties()
      } catch (error) {
        console.log("error", error);
      }
    }; addData();
  }

// ** thousands_separators() is used for add "," with thousands level. It take num parameter **//

  function thousands_separators(num)
  {
    var num_parts = num.toString().split(".");
    num_parts[0] = num_parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    return num_parts.join(".");
  }

  //** total() use to get summation of all valuation which have hidden 'false'  **//

  function total(){
    let totalValuation = properties.map(item => item.valuation).reduce((prev, curr) => prev + curr, 0);
    return totalValuation
  }

  return (
    <div className='app'>
      <header>
        <h1>Properties</h1>
      </header>
      <main>
        <div className='btn-wrapper'>
          <button onClick={() => setIsOpen(true)}>Add Property</button>
        </div>
        <PropertiesTable list={properties} />
        <h5 className='btn-wrapper'>
          Total: ${thousands_separators(total()).toLocaleString('en-US')}
        </h5>
      </main>
      <Modal isOpen={modalIsOpen}>
        <h2>Enter Property Details</h2>

        <form>
          <fieldset>
            <label>Address</label>
            <input type='text' onChange={setInput} id="address" value={addProperties.address} />
          </fieldset>
          <fieldset>
            <label>Valuation</label>
            <input type='number' onChange={setInput} id="valuation" value={addProperties.valuation} />
          </fieldset>
        </form>
        <div className='button-wrapper'>
          <button onClick={() => setIsOpen(false)}>close</button>
          <button onClick={() => onSubmitModal()}>Accept</button>
        </div>
      </Modal>
    </div>
  );
}

export default App;
