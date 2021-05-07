import React, { useState, useEffect,  useContext } from 'react';

import { Customer } from './model/customer';
import { EntityQuery, EntityState } from 'breeze-client';
import { CustomerEditor } from './CustomerEditor';
import { useEntityManager } from './breeze-react/useEntityManager';
import { EntityManagerContext } from './breeze-react/entity-manager-provider';
import { CustomerList } from './CustomerList';
import { Include  } from './utils/Include';

export const CustomerManager = () => {
  const entityManager = useContext(EntityManagerContext)!;
  const [searchName, setSearchName ] = useState('C');
  const [customers, setCustomers ] = useState([] as Customer[]);
  const [currentCust, setCurrentCust] = useState<Customer | null>(null);

  useEffect( () => {
    executeQuery(searchName);
  }, [searchName]);

  useEntityManager(entityManager);

  const executeQuery = async (searchName: string) => {
    const query = new EntityQuery("Customers").where("lastName", "startsWith", searchName).expand("orders");
    const qr = await entityManager.executeQuery(query);
    const addedCustomers = customers.filter(c => c.entityAspect.entityState.isAdded())
    setCustomers([...qr.results, ...addedCustomers]);
  }

  const changeSearchName = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setSearchName(val);
    setCurrentCust(null)
  }

  const selectCust = (cust:Customer) => {
    setCurrentCust(cust);
  }

  const addCustomer = () => {
    const cust = entityManager.createEntity(Customer.prototype.entityType, EntityState.Added) as Customer;
    // cust.id = -1;
    // select the new customer, and add it to the list of customers
    setCustomers([...customers, cust]);
    setCurrentCust(cust);
  }

  return (
      <div className="container">
        <div className="mt-3">
          <label>
            Search for customers with a last name starting with: &nbsp;
            <input type="text" value={searchName} onChange={changeSearchName} />
          </label>
          <span> or </span>
          <button onClick= {addCustomer}>Add Customer</button>
        </div>
        <h1>Customers</h1> 
        <CustomerList customers={customers} currentCust={currentCust} selectCust={selectCust}  />
        
        <Include when={currentCust != null} >
          <h1 className="mt-2">Selected Customer</h1>
          <CustomerEditor customer={currentCust!} /> 
        </Include>
      </div>
    
  );
}
