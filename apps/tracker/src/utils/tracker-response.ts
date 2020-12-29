import * as bencode from 'bencode';

export function trackerFailRes(failMessage: string, errorCode: number) {
  return bencode.encode({
    'failure reason': failMessage,
    errorCode: errorCode,
  });
}
