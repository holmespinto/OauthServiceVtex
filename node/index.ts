/* eslint-disable @typescript-eslint/consistent-type-imports */
import {
  ParamsContext,
  ServiceContext,
  RecorderState,
  EventContext,
  ClientsConfig,
  method,
  Service,
} from '@vtex/api'

import { Clients } from './clients'
import { getSchema } from './middlewares/getSchema'
import { getUserFavouriteProducts } from './middlewares/getUserFavouriteProducts'
import { allStates, someStates } from './middlewares/orderBroadcast'
import { getAddress } from './resolvers/getAddress'
import { createAddress } from './resolvers/createAddress'
import { orderFormCache } from './resolvers/orderFormCache'
import { setOrderFormCache } from './resolvers/setOrderFormCache'
import { getOrderGiftcards } from './resolvers/getOrderGiftcards'
import { getSellers } from './resolvers/getSellers'
import { getReleaseDate } from './resolvers/getReleaseDate'
import { hollidays } from './middlewares/hollidays'
import { getClientCart } from './resolvers/getClientCart'
import { getUserFromVtex } from './resolvers/getUserFromVtex'
import { getStoreList } from './resolvers/getStoreList'
import { getAllStateFromVtex } from './resolvers/getAllStateFromVtex'
import { getPickupStoresByCityVtex } from './resolvers/getPickupStoresByCityVtex'
import { getPickupStoreVtex } from './resolvers/getPickupStoreVtex'
import { getOldOrders } from './resolvers/getOldOrders'
import { getOldOrdersDetails } from './resolvers/getOldOrdersDetails'
import { getStoreById } from './resolvers/getStoreById'
import { auth, updateUserInfo,startPasswordLess } from './middlewares/auth'

const TIMEOUT_MS = 2000

declare global {
  // We declare a global Context type just to avoid re-writing ServiceContext<Clients, State> in every handler and resolver
  type Context = ServiceContext<Clients, State>

  interface StatusChangeContext extends EventContext<Clients> {
    body: {
      domain: string
      orderId: string
      currentState: string
      lastState: string
      currentChangeDate: string
      lastChangeDate: string
    }
  }

  // The shape of our State object found in `ctx.state`. This is used as state bag to communicate between middlewares.
  // type State = RecorderState

  interface State extends RecorderState {
    provider: string | string[]
  }
}

const clients: ClientsConfig<Clients> = {
  // We pass our custom implementation of the clients bag, containing the Status client.
  implementation: Clients,
  options: {
    // All IO Clients will be initialized with these options, unless otherwise specified.
    default: {
      retries: 2,
      timeout: TIMEOUT_MS,
    },
  },
}

// Export a service that defines route handlers and client options.
export default new Service<Clients, State, ParamsContext>({
  clients,
  graphql: {
    resolvers: {
      Query: {
        getAddress,
        orderFormCache,
        getOrderGiftcards,
        getSellers,
        getReleaseDate,
        getClientCart,
        getUserFromVtex,
        getStoreList,
        getAllStateFromVtex,
        getPickupStoreVtex,
        getPickupStoresByCityVtex,
        getOldOrders,
        getOldOrdersDetails,
        getStoreById,
      },
      Mutation: {
        createAddress,
        setOrderFormCache,
      },
    },
  },
  routes: {
    getSchema: method({
      POST: [getSchema],
    }),
    getUserFavouriteProducts: method({ POST: [getUserFavouriteProducts] }),
    hollidays: method({
      GET: [hollidays],
    }),
    auth: method({
      GET: [auth]
    }),
    updateUserInfo: method({
      PATCH :[updateUserInfo]
    }),
    startPasswordLess: method({
      POST :[startPasswordLess]
    }),
  },
  events: {
    allStates,
    someStates,
  },
})
