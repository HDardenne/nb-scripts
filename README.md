# nb-scripts

You will need to be in a browser tab pointing to Namebase to use most of those scripts :
- Base scripts must be run in the "Developer Tools"
- Bookmark versions need to be used as bookmark URLs (also known as bookmarklet)
- NodeJS scripts need NodeJS installed

# Disclaimer

Scripts are provided as-is, may or may not work, with no guarantee of any kind. By using them, you and only are responsible for whatever may happen, not me. Use them at your own risks. 

# Available scripts
- [list all owned TLD](./list-tlds.js) (bookmark version [here](./list-tlds-fav.js))
- [make an offer on multiple names](./bulk-make-offer.js) (bookmark version [here](./bulk-make-offer-fav.js))
- [list many TLDs on the marketplace](./bulk-market-listing.js)
- [remove many TLDs from the marketplace (unlist)](./bulk-market-unlisting.js)
- [create X new HNS addresses](./create-HNS-addresses.js) (bookmark version [here](./create-HNS-addresses-fav.js))
- [remove the "new offer pending" for every names](./view-all-offers.js) (bookmark version [here](./view-all-offers-fav.js))
- [compute the price of each won name based on your history CSV file](./name-auction-prices.js), need to run it locally with NodeJS
- [check if names are on Namebase, for sale and how much, and if they allow offers](./name-state-on-NB.js), need to run it locally with NodeJS and need a ```npm install node-fetch@2``` to install the dependancy