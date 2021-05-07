
import React, { useState } from 'react';
import { EntityManagerContext, entityManagerProvider } from './breeze-react/entity-manager-provider';
import { CustomerManager } from './CustomerManager';

import './App.css';

const App = () => {
  const [entityManager, setEntityManager] = useState(entityManagerProvider.newManager());

  return (
    <EntityManagerContext.Provider value={entityManager}>
      <CustomerManager />
    </EntityManagerContext.Provider>
  );
}

export default App;
