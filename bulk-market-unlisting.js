(async function () {
  const tlds = [
    "tld-1",
    "tld-2"
  ];
  for (let n of tlds) {
    await fetch("https://www.namebase.io/api/v0/marketplace/"+n+"/cancel", {
      "credentials": "include",
      "headers": {
          "Accept": "application/json",
          "Accept-Language": "en-GB,en;q=0.5",
          "Content-Type": "application/json",
          "Sec-Fetch-Dest": "empty",
          "Sec-Fetch-Mode": "cors",
          "Sec-Fetch-Site": "same-origin"
      },
      "body": "{}",
      "method": "POST",
      "mode": "cors"
    });
  }
})();