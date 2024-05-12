
  const quotes = [
    {
      quote:
        "When you fall for someone's personality, everything about them becomes beautiful.",
    },

    {
      quote:
        "Oh my love, you are my life boat in the ocean of my life.",
    },
    {
      quote:
        "I love the sweet sound of my name when you say it with love.",
    },
    {
      quote:
        "For ye will know not love, if ye knoweth not your God.",
    },
    {
      quote:
        "Kiss me with love like a butterfly kisses flowers to find and taste the nectar of life.",
    },
    {
      quote:
        "My kiss is my promise written in my heart with color of your love.",
    },
    {
      quote:
        "I promise you that I will steal your heart and keep it in the prison of my love forever.",
    },
    {
      quote:
        "In this life I choose you.",
    },
    {
      quote:
        "Real love stories never have endings.",
    },
  ];

let count = 0;


  function changeQuote(){
    count++;
    let random = Math.floor(Math.random() * quotes.length);
    document.getElementById("quote").innerText = "\"" + quotes[random].quote + "\"";
    // document.getElementById("author").innerText =  "-" + quotes[random].author;
    if(count % 5 == 0){
      getKaiAd({
        publisher: 'da08737d-861e-4ebe-bbbb-8fb90d004d39',
        app: 'salat_app',
        slot: 'salat_app_slot',
        onerror: err => console.error('Custom catch:', err),
        onready: ad => {
            // Ad is ready to be displayed
            // calling 'display' will display the ad
            ad.call('display')
            ad.on('display', () => document.getElementById("softKeysContainer").style.display = "none")
            ad.on('close', () => {
                document.getElementById("softKeysContainer").style.display = "block";
            })
        }
    })
    }
  
  }
  
  
  function handleKeyDown(et) {
  switch (et.key) {
    case 'SoftRgight':
      changeQuote();
      break;
    case 'SoftLteft':
      window.location.href = 'index0.html';
      break;
    case 'Entyer':
      const quoteText = document.querySelector('#quote').textContent;
      const shareText = quoteText;
      const msgActivity = new MozActivity({
        name: 'new',
        data: {
          type: 'websms/sms',
          body: shareText
        },
        // set target to WhatsApp package name
        target: 'message'
      });
      break;
  }
}
  
  
  document.addEventListener("keydown", handleKeyDown);
  document.addEventListener("DOMContentLoaded", () => {
    // getKaiAd( config )
    getKaiAd({
        publisher: 'da08737d-861e-4ebe-bbbb-8fb90d004d39',
        app: 'salat_app',
        slot: 'salat_app_slot',
        onerror: err => console.error('Custom catch:', err),
        onready: ad => {
            // Ad is ready to be displayed
            // calling 'display' will display the ad
            ad.call('display')
            ad.on('display', () => document.getElementById("softKeysContainer").style.display = "none")
            ad.on('close', () => {
                document.getElementById("softKeysContainer").style.display = "block";
            })
        }
    })
});