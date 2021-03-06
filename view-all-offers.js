(async function () {
  let all = [];
  let keepGoing = true;
  let i = 0;
  while (keepGoing) {
    const page = await fetch(
      'https://www.namebase.io/api/v0/offers/received?offset=' +
        i++ * 15 +
        '&sortKey=createdAt&sortDirection=desc',
      {
        credentials: 'include',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        method: 'GET',
        mode: 'cors',
      }
    ).then(a => a.json());
    all = all.concat(page.domains);
    if (page.domains.length === 0) {
      keepGoing = false;
    }
  }
  for (let d of all.filter(d => d.isUnseen)) {
    await fetch('https://www.namebase.io/api/v0/offers/view', {
      credentials: 'include',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: '{"domainOwnerId":"' + d.domainOwnerId + '"}',
      method: 'POST',
      mode: 'cors',
    });
  }

  await fetch('https://www.namebase.io/api/v0/offers/inbox/received', {
    credentials: 'include',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    method: 'GET',
    mode: 'cors',
  })
    .then(a => a.json())
    .then(a =>
      localStorage.setItem(
        'namebase:dashboard:activeOffers:bids:hidden',
        JSON.stringify(
          a.inbox.reduce((prev, next) => prev.concat(next.offers), [])
        )
      )
    );
  alert('view-all-offers done');
})();