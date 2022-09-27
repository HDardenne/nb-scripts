'use strict';

const fetch = require('node-fetch');
const fs = require('fs');

// Your HSD / Bob API key
const apiKey = 'YOUR-HSD-API-KEY';
// Your names info (one name per line, no trailing "/")
const namesData = fs
  .readFileSync('verify-expire-input.txt')
  .toString()
  .split('\n')
  .map(n => n.trim())
  .filter(n => n.length > 0);

async function main() {
  const result = [];
  for (var name of namesData) {
    const ret = await fetch(`http://x:${apiKey}@127.0.0.1:12037`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ method: 'getnameinfo', params: [name] }),
    }).then(a => a.json());
    result.push({ name: name, renewal: ret.result.info.renewal });
  }
  result.sort((a, b) => a.renewal - b.renewal);
  fs.writeFileSync(
    'verify-expire-output.csv',
    result.map(r => r.name + ',' + r.renewal).join('\r\n')
  );
}

main();
