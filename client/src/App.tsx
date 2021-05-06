
import { EntityManager } from 'breeze-client';
import { createContext, useState } from 'react';
import './App.css';
import { entityManagerProvider } from './breeze/entity-manager-provider';
import { CustomerList } from './CustomerList';

export const EntityManagerContext = createContext<EntityManager>(entityManagerProvider.newManager());

const App = () => {
  const [entityManager, setEntityManager] = useState(entityManagerProvider.newManager());

  return (
    <EntityManagerContext.Provider value={entityManager}>
      <CustomerList />
    </EntityManagerContext.Provider>
  );
}

export default App;
