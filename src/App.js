import { useState } from 'react';
import logo from './logo.svg';
import './App.css';

function App() {
   

  const hexToBin = (hex, s=4) => {

    return (parseInt(hex,16) >>> 0).toString(2).padStart(s, '0');
  }
  const fullHextoBin = (hex) => {
    let bigBinary = "";
    hex.split("").forEach((h) => {      
      bigBinary = bigBinary.concat(hexToBin(h));
    });
    return bigBinary;
  }
  const fillZeros = (number, cant) => {
    return number.toString().padStart(cant, '0')
  }
  const fullConvertion = (fullString) => {
    const binary = fullHextoBin(fullString);
    const headerBinary = binary.substring(0, 8);
    const filterBinary = binary.substring(8, 11);
    const partitionBinary = binary.substring(11, 14);
    const companyIDBinary = binary.substring(14, 38);
    const itemIDBinary = binary.substring(38, 58);
    const serialNumberlBinary = binary.substring(58, 96);

    const object = {
      'header': {'d': parseInt(headerBinary, 2), 'b': headerBinary},
      'filter': {'d': parseInt(filterBinary, 2), 'b':filterBinary},
      'partition': {'d': parseInt(partitionBinary, 2), 'b':partitionBinary},
      'companyId': {'d': fillZeros(parseInt(companyIDBinary, 2),7), 'b':companyIDBinary},
      'itemId': {'d': fillZeros(parseInt(itemIDBinary, 2),6), 'b':itemIDBinary},
      'serialNumber': {'d': fillZeros(parseInt(serialNumberlBinary, 2),12), 'b':serialNumberlBinary},

    }
    return object;
  }

  const [fullHexadecimal, setFullHexadecimal] = useState("");
  const handleChange = (event) => {
    setFullHexadecimal(event.target.value);
  }
  const upcDecode = fullConvertion(fillZeros(fullHexadecimal,24));
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Full Hexadecimal String: 
        </p>
        <input type="text" value={fullHexadecimal} onChange={handleChange} />
        <div>        
          <p>
            HEADER: {upcDecode.header.d} / FILTER: {upcDecode.filter.d} / PARTITION VAULE: {upcDecode.partition.d} / UPC COMPANY ID: {upcDecode.companyId.d} / ITEM ID: {upcDecode.itemId.d} / SERIAL NUMBER: {upcDecode.serialNumber.d}
          </p>
        </div>
      </header>
    </div>
  );
}

export default App;
