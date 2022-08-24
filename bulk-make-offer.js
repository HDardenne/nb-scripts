(function () {
    const separator = ',';
  
    const mainDiv = document.createElement('div');
    mainDiv.innerHTML = `<div id="nb-hda-makeOffer" style=" position: absolute; background: rgba(0, 0, 0, 0.288); top: 0; bottom: 0; left: 0; right: 0; z-index: 999; display: flex; flex-direction: column; justify-content: center; align-items: center;"> <div id="nb-hda-makeOffer-content" style="display: flex; flex-direction: column; background: white; min-width: 500px; padding: 1em;
    border-radius: .5em;" ></div></div>`;
    document.getElementsByTagName('body')[0].append(mainDiv);
    const dialogue = document.getElementById('nb-hda-makeOffer-content');
  
    const clearDialogue = () => {
      while (dialogue.firstChild) {
        dialogue.removeChild(dialogue.lastChild);
      }
    };
  
    let content;
    const displayPrepDiv = () => {
      console.log('here');
      clearDialogue();
      const prepDiv = document.createElement('div');
      prepDiv.innerHTML = `<div id="nb-hda-makeOffer-preparation"> <div> <label><span style="display:flex;">Offers to make</span><textarea id="nb-hda-makeOffer-input" style="width:100%; min-width:500px"></textarea> </label> </div><div style="margin-top:.5em;"> <button id="nb-hda-makeOffer-cancel">Cancel</button> <button id="nb-hda-makeOffer-submit">Submit</button> </div></div>`;
      dialogue.append(prepDiv.firstChild);
  
      document.getElementById('nb-hda-makeOffer-input').value = content ?? '';
  
      const submitButton = document.getElementById('nb-hda-makeOffer-submit');
      submitButton.onclick = () => {
        content = document.getElementById('nb-hda-makeOffer-input').value;
        readOffers();
      };
  
      const quitButton = document.getElementById('nb-hda-makeOffer-cancel');
      quitButton.onclick = () => quit();
    };
  
    const quit = () => {
      mainDiv.remove();
    };
  
    let offers;
    let sendingOffer = false;
    const readOffers = async () => {
      offers = content
        .replace(/\r/g, '')
        .split('\n')
        .map(a => {
          const parts = a.split(separator);
          return { name: parts[0], amount: parts[1] };
        });
  
      clearDialogue();
      const confDiv = document.createElement('div');
      const rows = offers
        .map(
          o =>
            `<tr><td>${o.name}</td><td>${
              o.amount
            }</td><td id="nb-hda-makeOffer-sent-${o.name}">${
              o.sent ? 'true' : ''
            }</td></tr>`
        )
        .join('');
      confDiv.innerHTML = `<div id="nb-hda-makeOffer-confirmation"><table style="border: 1px solid black;width: 100%;
      text-align: left;border-spacing: .5em;"> <thead> <th>Name</th> <th>Amount</th> <th>Sent</th> </thead> <tbody>${rows}</tbody> </table><div style="margin-top:.5em;"> <button id="nb-hda-makeOffer-cancel">Cancel</button> <button id="nb-hda-makeOffer-submit">Submit</button> </div></div>`;
      dialogue.append(confDiv);
  
      const submitButton = document.getElementById('nb-hda-makeOffer-submit');
      submitButton.onclick = () => {
        if (!confirm('Are you sure you want to send those offers ?')) {
          return;
        }
        sendOffers();
      };
  
      const quitButton = document.getElementById('nb-hda-makeOffer-cancel');
      quitButton.onclick = () => {
        if (sendingOffer) {
          canceled = true;
        } else {
          offers = undefined;
          displayPrepDiv();
        }
      };
    };
  
    let canceled = false;
    const sendOffers = async () => {
      sendingOffer = true;
      for (const offer of offers.filter(o => !o.sent)) {
        if (canceled) {
          sendingOffer = false;
          break;
        }
        await sendBid(offer.name, offer.amount)
          .then(o => (offer.sent = true))
          .catch(err => alert(err.message));
        document.getElementById(`nb-hda-makeOffer-sent-${offer.name}`).innerHTML =
          'true';
        await new Promise(res =>
          setTimeout(() => {
            res();
          }, 100)
        );
      }
  
      if (canceled) {
        return;
      }
  
      if (confirm('All done ! Exit ?')) {
        quit();
      }
    };
  
    const sendBid = async (name, amount) => {
      await fetch('https://www.namebase.io/api/v0/marketplace/' + name + '/bid', {
        credentials: 'include',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: '{"buyOfferAmount":"' + amount + '"}',
        method: 'POST',
      });
    };
  
    displayPrepDiv();
  })();
  