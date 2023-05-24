import { IOClients } from '@vtex/api'

import MasterData from './masterData'
import VtexId from './VtexIdClient'
import OrdersClient from './order'
import FavItemsClient from './favItemsClient'
import { MasterDataClient } from './md'
import { OrderFormClient } from './orderForm'
import { CatalogClient } from './catalogClient'
import { HollidaysClient } from './hollidaysClient'
import { AuthClient } from './auth'

// Extend the default IOClients implementation with our own custom clients.
export class Clients extends IOClients {
  public get masterData() {
    return this.getOrSet('masterData', MasterData)
  }

  public get orders() {
    return this.getOrSet('orders', OrdersClient)
  }

  public get favItems() {
    return this.getOrSet('favItems', FavItemsClient)
  }

  public get vtexId() {
    return this.getOrSet('vtexId', VtexId)
  }

  public get md() {
    return this.getOrSet('md', MasterDataClient)
  }

  public get orderForm() {
    return this.getOrSet('orderForm', OrderFormClient)
  }

  public get catalogClient() {
    return this.getOrSet('ordecatalogClientrForm', CatalogClient)
  }

  public get hollidaysClient() {
    return this.getOrSet('hollidaysClient', HollidaysClient)
  }

  public get authClient() {
    return this.getOrSet('authClient', AuthClient)
  }
}
