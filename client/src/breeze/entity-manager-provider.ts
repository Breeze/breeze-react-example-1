import { DataService, EntityManager, NamingConvention } from "breeze-client";
import { AjaxFetchAdapter } from "breeze-client/adapter-ajax-fetch";
import { DataServiceWebApiAdapter } from "breeze-client/adapter-data-service-webapi";
import { ModelLibraryBackingStoreAdapter } from "breeze-client/adapter-model-library-backing-store";
import { UriBuilderJsonAdapter } from "breeze-client/adapter-uri-builder-json";

import { NorthwindMetadata } from "../model/metadata";
import { NorthwindRegistrationHelper } from "../model/registration-helper";

export class EntityManagerProvider {

  protected masterManager: EntityManager;

  constructor() {
    // configure breeze adapters
    ModelLibraryBackingStoreAdapter.register();
    UriBuilderJsonAdapter.register();
    AjaxFetchAdapter.register();
    DataServiceWebApiAdapter.register();
    NamingConvention.camelCase.setAsDefault();

    // configure API endpoint
    const dataService = new DataService({
      serviceName: "http://localhost:4000/api/breeze",
      hasServerMetadata: false
    });

    // register entity metadata
    this.masterManager = new EntityManager({ dataService });
    const metadataStore = this.masterManager.metadataStore;
    metadataStore.importMetadata(NorthwindMetadata.value);
    NorthwindRegistrationHelper.register(metadataStore);
  }

  /** Return empty manager configured with dataservice and metadata */
  newManager(): EntityManager {
    return this.masterManager.createEmptyCopy();
  }

  // /** Call forceUpdate() on the component when an entity property or state changes */
  // subscribeComponent(manager: EntityManager, component: { forceUpdate: () => void }) {
  //   let subid = manager.entityChanged.subscribe((data: { entityAction: EntityAction }) => {
  //     if (data.entityAction === EntityAction.PropertyChange || data.entityAction === EntityAction.EntityStateChange) {
  //       component.forceUpdate();
  //     }
  //   });
  //   component["subid"] = subid;
  // }

  // /** Remove subscription created with subscribeComponent() */
  // unsubscribeComponent(manager: EntityManager, component: any) {
  //   if (component.subid) {
  //     manager.entityChanged.unsubscribe(component.subid);
  //   }
  // }
}

export const entityManagerProvider = new EntityManagerProvider();