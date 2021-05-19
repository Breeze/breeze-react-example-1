import { Entity, EntityAction, EntityChangedEventArgs, EntityManager, PropertyChangedEventArgs } from "breeze-client";
import { useEffect, useReducer } from "react";

export const useEntityManager = (entityManager: EntityManager) => {
  const [_, forceUpdate] = useReducer((x) => x + 1, 0);

  useEffect( () => {
    console.log('subscribe to EntityManager')
    const subid = entityManager.entityChanged.subscribe( (data: EntityChangedEventArgs ) => {
      if (data.entityAction === EntityAction.PropertyChange || data.entityAction === EntityAction.EntityStateChange) {
        // console.log('Use-Action: ' + data.entityAction);
        forceUpdate()
      }
    });
    return () => {
      console.log('unsubscribe from EntityManager')
      entityManager.entityChanged.unsubscribe(subid);
    };
  }, []);
};

export const useEntity = (entity: Entity) => {
  const [_, forceUpdate] = useReducer((x) => x + 1, 0);

  useEffect( () => {
    console.log('subscribe to EntityManager')
    const subid = entity.entityAspect.propertyChanged.subscribe( (_data: PropertyChangedEventArgs ) => {
        forceUpdate()
    });
    return () => {
      console.log('unsubscribe from EntityManager')
      entity.entityAspect.propertyChanged.unsubscribe(subid);
    };
  }, []);
};

