
(async function () {
  let domains = [];
  let done = false;
  while (!done) {
    const resp = await fetch(
      'https://www.namebase.io/api/user/domains/not-listed/' +
        domains.length +
        '?sortKey=acquiredAt&sortDirection=desc&limit=100',
      {
        credentials: 'include',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          'Cache-Control': 'max-age=0',
        },
        referrer: 'https://www.namebase.io/manage/owned?page=1',
        method: 'GET',
        mode: 'cors',
      }
    );
    const json = await resp.json();
    const newDomains = json.domains.map(a => a.name);
    domains = domains.concat(newDomains);
    if (newDomains.length === 0) {
      done = true;
    } else {
      await new Promise(res => setTimeout(() => res()), 1000);
    }
  }

  const listedResp = await fetch(
    'https://www.namebase.io/api/user/domains/listed',
    {
      credentials: 'include',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      referrer: 'https://www.namebase.io/manage/listed',
      method: 'GET',
      mode: 'cors',
    }
  );
  const listedJson = await listedResp.json();
  const listedDomains = listedJson.domains.map(a => a.name);
  domains = domains.concat(listedDomains);
  const hiddenLink = document.createElement('a');
  hiddenLink.href =
    'data:text/txt;charset=utf-8,' + encodeURI(domains.join('\n'));
  hiddenLink.target = '_blank';
  hiddenLink.download = `domains.txt`;
  hiddenLink.click();
  hiddenLink.remove();
})();
