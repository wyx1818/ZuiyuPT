/**
 * @see https://www.speedguide.net/port.php or other website
 */
export const BLACK_PORTS = [
  24888,
  22, // SSH Port
  53, // DNS queries
  80,
  81,
  8080,
  8081, // Hyper Text Transfer Protocol (HTTP) - port used for web traffic
  411,
  412,
  413, // 	Direct Connect Hub (unofficial)
  443,
  8443, // HTTPS / SSL - encrypted web traffic, also used for VPN tunnels over HTTPS.
  1214, // Kazaa - peer-to-peer file sharing, some known vulnerabilities, and at least one worm (Benjamin) targeting it.
  3389, // IANA registered for Microsoft WBT Server, used for Windows Remote Desktop and Remote Assistance connections
  4662, // eDonkey 2000 P2P file sharing service. http://www.edonkey2000.com/
  6346,
  6347, // Gnutella (FrostWire, Limewire, Shareaza, etc.), BearShare file sharing app
  6699, // Port used by p2p software, such as WinMX, Napster.
  6881,
  6882,
  6883,
  6884,
  6885,
  6886,
  6887,
  6888,
  6889,
  6890, // BitTorrent part of full range of ports used most often (unofficial)
];
