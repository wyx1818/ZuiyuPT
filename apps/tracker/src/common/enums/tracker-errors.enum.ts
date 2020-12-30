export enum TrackerErrors {
  // Error message of base Tracker system
  TRACKER_NOT_OPEN = 201000,

  // Error message about User Agent ( Bittorrent Client )
  INVALID_UA = 101100,
  NOT_ALLOW_CLIENT = 101101,
  UA_TOO_LONG = 101103,

  // Error message about Requests Params
  MISS_FIELD = 101200,
  INVALID_INFO_HASH = 101201,
  INVALID_PEER_ID = 101202,
  INVALID_IP = 101203,
  INVALID_PORT = 101204,
  INVALID_UPLOAD = 101205,
  INVALID_DOWNLOAD = 101205,
}
