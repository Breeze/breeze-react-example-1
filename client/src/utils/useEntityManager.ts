import { EntityAction, EntityManager } from "breeze-client";
import React, { useEffect } from "react";

export const useEntityManager = (entityManager: EntityManager) => {

  const forceUpdate = React.useReducer(() => ({}), {})[1] as () => void;

  useEffect( () => {
    const subid = entityManager.entityChanged.subscribe((data: { entityAction: EntityAction }) => {
      if (data.entityAction === EntityAction.PropertyChange || data.entityAction === EntityAction.EntityStateChange) {
        forceUpdate()
      }
    });
    return () => {
      entityManager.entityChanged.unsubscribe(subid);
    };
  }, []);
};

// export const forceUpdate = React.useReducer(() => ({}), {})[1] as () => void;