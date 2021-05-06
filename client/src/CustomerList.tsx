import React, { useState, useEffect,  useContext } from 'react';

import { Customer } from './model/customer';
import { EntityQuery, EntityState } from 'breeze-client';
import { CustomerEditor } from './CustomerEditor';
import { useEntityManager } from './utils/useEntityManager';
import { EntityManagerContext } from './App';

export const CustomerList = () => {
  const entityManager = useContext(EntityManagerContext)!;
  const [searchName, setSearchName] = useState('C');
  const [customers, setCustomers ] = useState([] as Customer[]);
  const [currentCust, setCurrentCust] = useState<Customer | null>(null);

  useEffect( () => {
    executeQuery(searchName);
  }, [searchName]);

  useEntityManager(entityManager);

  const executeQuery = async (searchName: string) => {
    const query = new EntityQuery("Customers").where("lastName", "startsWith", searchName).expand("orders");
    const qr = await entityManager.executeQuery(query);
    setCustomers(qr.results);
  }

  const changeSearchName = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setSearchName(val);
    setCurrentCust(null)
  }

  const selectRow = (index: number) => {
    const cust = customers[index];
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
        <table className="ml-3">
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
