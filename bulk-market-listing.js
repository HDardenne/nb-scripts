(async function () {
  const description = 'my generic description';
  const tlds = [
    {
      name: 'tld-1',
      price: 1000,
    },
    {
      TLDName: 'tld-2',
      price: 2000,
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
          description +
          '"}',
        method: 'POST',
        mode: 'cors',
      }
    );
  }
})();
