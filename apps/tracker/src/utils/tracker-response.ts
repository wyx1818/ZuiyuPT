import * as bencode from 'bencode';

export function trackerFailRes(failMessage: string) {
  return bencode.encode({
    'failure reason': failMessage,
  });
}
