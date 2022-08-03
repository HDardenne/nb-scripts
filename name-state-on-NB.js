const fetch = require('node-fetch');
const fs = require('fs');

const filename = 'name-state-on-NB-' + +new Date() + '.csv';
const separator = ',';
const temporisation = 200;
const nameAmountPerIteration = 100;
// const allDomains = ['name1','name2'];
const allDomains = fs
  .readFileSync('name-state-on-NB-input.txt')
  .toString()
  .replace(/\r/g, '')
  .split('\n');

const result = [];
(async function () {
  while ((domains = allDomains.splice(0, nameAmountPerIteration)).length > 0) {
    const subresult = await fetch(
      'https://www.namebase.io/api/domains/search',
      {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        referrer: 'https://www.namebase.io/domains/hayden',
        body: JSON.stringify({ domains: domains }),
        method: 'POST',
        mode: 'cors',
      }
    )
      .then(response => response.json())
      .then(json =>
        json.domains.map(d => ({
          name: d.domainInfo.name,
          onNamebase: d.marketplaceInfo !== null,
          forSale: !!d.marketplaceInfo && !!d.marketplaceInfo.listing,
          price:
            d.marketplaceInfo &&
            d.marketplaceInfo.listing &&
            +d.marketplaceInfo.listing.amount / 1000000,
          acceptOffers:
            !!d.marketplaceInfo && !!d.marketplaceInfo.isAcceptingOffers,
        }))
      );
    result.push(...subresult);
    await new Promise(resolve => setTimeout(() => resolve(), temporisation));
  }
  const keys = Object.keys(result[0]);
  const lines = [keys, ...result].map(r => Object.values(r).join(separator));
  fs.writeFileSync(filename, lines.join('\n'));
})();
