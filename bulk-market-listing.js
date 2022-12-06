(async function () {
  // Default description used if there isn't one set for the TLD
  const defaultDescription = "Contact XYZ for more details"
  const tlds = [
    {
      name: 'tld-1',
      price: 1000,
    },
    {
      TLDName: 'tld-2',
      price: 2000,
      description: 'tld-2 - a great handshake name ...'
    },
    {
      TLDName: 'tld-3',
      price: 5000,
      description: 'tld-3 is the perfect name for ...'
    },
  ].filter(t=>t.price);
  for (let n of tlds) {
    let resp = await fetch(
      'https://www.namebase.io/api/v0/marketplace/' + n.name + '/list',
      {
        credentials: 'include',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        referrer: 'https://www.namebase.io/list-name/' + n.name,
        body:
          '{"amount":"' +
          n.price +
          '","asset":"HNS","description":"' +
          (n.description ?? defaultDescription) +
          '"}',
        method: 'POST',
        mode: 'cors',
      }
    );
  }
})();
