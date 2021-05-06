import React, { useState, useEffect } from 'react';

import './App.css';

import { Customer } from './model/customer';
import { entityManagerProvider } from './breeze/entity-manager-provider';
import { EntityAction, EntityQuery } from 'breeze-client';
import { CustomerEditor } from './CustomerEditor';
import { useEntityManager } from './utils/useEntityManager';

const App = () => {
  const [customers, setCustomers ] = useState([] as Customer[]);
  const [searchName, setSearchName] = useState('C');
  const [currentCust, setCurrentCust] = useState<Customer | null>(null);

  const entityManager = entityManagerProvider.newManager();
  const executeQuery = async (searchName: string) => {
    const query = new EntityQuery("Customers").where("lastName", "startsWith", searchName).expand("orders");
    const qr = await entityManager.executeQuery(query);
    setCustomers(qr.results);
  }

  useEffect( () => {
    executeQuery(searchName);
  }, [searchName]);

  useEntityManager(entityManager);

  // useEffect( () => {
  //   const subid = entityManager.entityChanged.subscribe((data: { entityAction: EntityAction }) => {
  //     if (data.entityAction === EntityAction.PropertyChange || data.entityAction === EntityAction.EntityStateChange) {
  //       forceUpdate()
  //     }
  //   });
  //   return () => {
  //     entityManager.entityChanged.unsubscribe(subid);
  //   };
  // }, []);

  // const forceUpdate = React.useReducer(() => ({}), {})[1] as () => void;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setSearchName(val);
    setCurrentCust(null)
  }

  const selectRow = (index: number) => {
    const cust = customers[index];
    setCurrentCust(cust);
  }


  return (
    
    <div className="App">
      <label>
        Search for Last Name starting with:
        <input type="text" value={searchName} onChange={handleChange} />
      </label>

      <h1>Customers</h1>
      
      <table style={{margin: 'auto'}}>
        <tbody>
          {customers.map((cust, ix) =>
            <tr key={cust.id} onClick={() => selectRow(ix)} className={ currentCust === cust ? 'selected' : '' }>
              <td>{cust.firstName} {cust.lastName}</td>
              <td>{cust.city}</td>
              <td>{cust.orders.length} Orders</td>
              <td>{cust.entityAspect.entityState.name}</td>
            </tr>)
          }
        </tbody>
      </table>
      { (currentCust != null)  && (
        <CustomerEditor customer={currentCust} /> 
      ) } 
    </div>
    
  );
}

export default App;
