import { Include  } from './utils/Include';
import { Customer } from './model/customer';

export const CustomerList = (props: { 
  customers: Customer[], 
  currentCust: Customer | null, 
  selectCust: (cust: Customer) => void 
  undoCust: (cust: Customer) => void 
} ) => {
  const { customers, currentCust, selectCust, undoCust } = props;

  return (
    <table className="ml-3">
      <tbody>
        {customers.map((cust) =>
          <tr key={cust.id} onClick={() => selectCust(cust)} className={currentCust === cust ? 'selected' : ''}>
            <td>{cust.id}</td>
            <td>{cust.firstName} {cust.lastName}</td>
            <td>{cust.city}</td>
            <td>{cust.orders.length} Orders</td>
            <td>{cust.entityAspect.entityState.name}</td>
            <td>
              <Include when={cust.entityAspect.entityState.isAddedModifiedOrDeleted()} >
                <button onClick={ () => undoCust(cust)}>Cancel Changes</button>
              </Include>
            </td>
          </tr>)
        }
      </tbody>
    </table>
  );
}
