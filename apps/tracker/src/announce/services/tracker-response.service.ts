import * as bencode from 'bencode';

export function trackerFailRes(failMessage: string) {
  return bencode
    .encode({
      'failure reason': failMessage,
      'min interval': 600,
    })
    .toString();
}

export function trackerSuccessRes() {
  return bencode
    .encode({
      complete: 0,
      incomplete: 0,
      interval: 120,
      peers: [
        {
          'peer id': '-qB4300-PrSo_sswdJXT',
          ip: '127.0.0.1',
          port: 2233,
        },
      ],
      peers6: '',
    })
    .toString();
}
