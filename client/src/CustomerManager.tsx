import React, { useState, useEffect,  useContext } from 'react';

import { Customer } from './model/customer';
import { EntityQuery, EntityState } from 'breeze-client';
import { CustomerEditor } from './CustomerEditor';
import { useEntityManager } from './breeze-react/useEntityManager';
import { EntityManagerContext } from './breeze-react/entity-manager-provider';
import { CustomerList } from './CustomerList';
import { Include  } from './utils/Include';
import { SaveErrorDialog } from './SaveErrorDialog';
import { SaveError } from 'breeze-client/src/entity-manager';
import { ToastMessage } from './ToastMessage';

export const CustomerManager = () => {
  const entityManager = useContext(EntityManagerContext)!;
  const [searchName, setSearchName ] = useState('C');
  const [customers, setCustomers ] = useState([] as Customer[]);
  const [currentCust, setCurrentCust] = useState<Customer | null>(null);
  const [saveError, setSaveError] = useState<SaveError | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  useEffect( () => {
    executeQuery(searchName);
  }, [searchName]);

  useEntityManager(entityManager);

  async function executeQuery(searchName: string) {
    const query = new EntityQuery("Customers").where("lastName", "startsWith", searchName).expand("orders");
    const qr = await entityManager.executeQuery(query);
    // keep added customers around
    const addedCustomers = customers.filter(c => c.entityAspect.entityState.isAdded())
    setCustomers([...qr.results, ...addedCustomers]);
  }

  function changeSearchName(e: React.ChangeEvent<HTMLInputElement>) {
    const val = e.target.value;
    setSearchName(val);
    setCurrentCust(null);
  }

  function selectCust(cust:Customer) {
    setCurrentCust(cust);
  }

  function undoCust(cust: Customer) {
    if (cust.entityAspect.entityState.isAdded()) {
      setCustomers(custs => custs.filter(c => c != cust));
    }
    cust.entityAspect.rejectChanges();
  }

  function addCustomer() {
    const cust = entityManager.createEntity(Customer.prototype.entityType, { id: 0}) as Customer;

    // select the new customer, and add it to the list of customers
    setCustomers([...customers, cust]);
    setCurrentCust(cust);
  }

  async function saveChanges() {
    try {
      const sr = await entityManager.saveChanges();
      if (sr.entities.length > 0) {
        setToastMessage('Saved');
      }
    } catch (e: any) {
      setToastMessage('Save Failed');
      setSaveError(e as SaveError);
      return;
    }
    
    await executeQuery(searchName);
  }

  async function rejectChanges() {
    entityManager.rejectChanges();
    await executeQuery(searchName);
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
      <CustomerList { ...{ customers, currentCust, selectCust, undoCust } } />
      {/* same as <CustomerList  customers={customers} currentCust={currentCust} selectCust={selectCust}  undoCust={undoCust} /> */}
      
      <Include when={currentCust != null && !currentCust.entityAspect.entityState.isDetached() } >
        <h1 className="mt-2">Selected Customer - Edit here</h1>
        <CustomerEditor customer={currentCust!} /> 
      </Include>

      <div className="mt-4">
        <button type="button" className="mr-4" disabled={!entityManager.hasChanges()} onClick={saveChanges}>Save Changes</button>
        <button type="button" className="ml-4" disabled={!entityManager.hasChanges()} onClick={rejectChanges}>Revert Changes</button>
      </div>
            
      <SaveErrorDialog title="Save Errors encountered" saveError={saveError} onClose={() => setSaveError(null)} />

      {/* <Toast onClose={() => setToast('')} show={toast!=''} delay={3000} autohide> 
        <Toast.Header>{toast}</Toast.Header>
      </Toast>                      */}
      <ToastMessage onClose={() => setToastMessage(null)} message={toastMessage}/>
    </div>
    
  );
}
