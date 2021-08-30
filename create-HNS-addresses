(async () => {
  const result = [];
  for (var i = 0; i < 10; i++) {
    result.push(
      await fetch('https://www.namebase.io/api/v0/deposit/address', {
        credentials: 'include',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        referrer: 'https://www.namebase.io/dashboard',
        body: '{"asset":"HNS","timestamp":' + +new Date() + '}',
        method: 'POST',
        mode: 'cors',
      })
        .then(res => res.json())
        .then(json => json.address)
    );
  }
  const hiddenLink = document.createElement('a');
  hiddenLink.href =
    'data:text/txt;charset=utf-8,' + encodeURI(result.join('\n'));
  hiddenLink.target = '_blank';
  hiddenLink.download = `hns-addresses.txt`;
  hiddenLink.click();
  hiddenLink.remove();
})();
