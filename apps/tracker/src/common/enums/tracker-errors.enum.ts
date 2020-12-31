export enum TrackerErrors {
  // Error message of base Tracker system
  TRACKER_NOT_OPEN = 201000,

  // Error message about User Agent ( Bittorrent Client )
  INVALID_UA = 101100,
  NOT_ALLOW_CLIENT = 101101,
  UA_TOO_LONG = 101103,

  // Error message about Requests Params
  MISS_FIELD = 101200,
  INVALID_FIELD_LENGTH = 101201,
  INVALID_FIELD_NUMBER = 101202,
  INVALID_EVENT = 101203,

  INVALID_IP = 101203,
  INVALID_PORT = 101204,
  BLACKLIST_PORT = 101205,

  // Error message about User Account
  INVALID_PASSKEY = 101400,
}
