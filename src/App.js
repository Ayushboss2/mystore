import { useState } from 'react';
import './App.css';
//import React, { useState } from 'react'; // Import useState from React
import {
  ActionCardCollection,
  NavBarHeader,
  MarketingFooterBrand,
  AddProduct,
  MyIcon
} from './ui-components';

function App() {
  const [showForm, setshowForm] = useState(false);
  const navOverrides = {
    "Dashboard": {
      style: {
        cursor: "pointer"
      },
      onClick: () => alert("You Are On Dashboard ."),
    },
    "Add Product": {
      style: {
        cursor: "pointer"
      },
      onClick: () => setshowForm(!showForm),
    },
    "Free": {
      style: {
        cursor: "pointer"
      },
      onClick: () => alert("Free Products Dashboard."),
    }
  };
  
return (
  <div className="App">
    <NavBarHeader width={"100%"} overrides={navOverrides} />
    <header className="App-header">
      {
        showForm && (<AddProduct
          style={{
            textAlign: 'left',
            margin: '2rem',
          }}/>)
      }
      {
        !showForm && (<ActionCardCollection />)
      }
    </header>
    <MarketingFooterBrand width={"100%"} />
  </div>
);
}

export default App;
