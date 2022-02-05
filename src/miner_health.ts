import { refreshAccounts } from "./accounts";
import { getEpochRules, getLocalHeight, getTowerChainView, maybeEmitBacklogDelta, maybeStartMiner } from "./miner_invoke";
import { refreshWaypoint } from "./networks";

export const refreshStats = async () => {
  console.log("refreshStats");

  // this should be instant
  await getEpochRules()

  // also should be instant
  await getLocalHeight()
  // fetch a waypoint to see if we can connect to any fullnode.
  // If successful this will set the `network.connected` bool to true. And wallet will display a view.
  
  await refreshWaypoint()

  await refreshAccounts()

  await getTowerChainView()
    .finally(() => {
      maybeEmitBacklogDelta()
      // maybe a proof needs to be started
      // NOTE: There is no other loop. If we don't start it here, no proof will be created.
      maybeStartMiner()
    })
}
