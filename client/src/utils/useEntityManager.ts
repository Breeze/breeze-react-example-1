import { EntityAction, EntityChangedEventArgs, EntityManager } from "breeze-client";
import { useEffect, useReducer } from "react";

export const useEntityManager = (entityManager: EntityManager) => {

  
  const [_, forceUpdate] = useReducer((x) => x + 1, 0);

  useEffect( () => {
    console.log('subscribe to EntityManager')
    const subid = entityManager.entityChanged.subscribe( (data: EntityChangedEventArgs ) => {
      if (data.entityAction === EntityAction.PropertyChange || data.entityAction === EntityAction.EntityStateChange) {
        console.log('Use-Action: ' + data.entityAction);
        forceUpdate()
      }
    });
    return () => {
      console.log('unsubscribe from EntityManager')
      entityManager.entityChanged.unsubscribe(subid);
    };
  }, []);
};

// export const forceUpdate = React.useReducer(() => ({}), {})[1] as () => void;