(async function () {
  const tlds = [
    {
      name: 'tld-1',
      price: 1000,
	    description: 'tld-1 is the perfect name for blah blah blah flexing'
    },
    {
      TLDName: 'tld-2',
      price: 2000,
      description: 'tld-2 - a great handshake name blah blah blah brochure text here'
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
          n.description +
          '"}',
        method: 'POST',
        mode: 'cors',
      }
    );
  }
})();
