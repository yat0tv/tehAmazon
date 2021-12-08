// This will check for Amazon Links and adds the affiliate code. You can add any other affilaite program by adding more enteries.

var configurations = {
      amazonca : {
        rx: /^http.*?\.amazon.ca.*?(\/dp\/|obidos.tg.detail|.gp.product)/i,
        params: [
          { param: "tag", paramValue: "tehunplayed-20" }
        ]
      },
      amazoncom : {
        rx: /^http.*?\.amazon.com.*?(\/dp\/|obidos.tg.detail|.gp.product)/i,
        params: [
          { param: "tag", paramValue: "tehunplayed0e-20" }
        ]
      },
      amazonco : {
        rx: /^http.*?\.amazon.co.uk.*?(\/dp\/|obidos.tg.detail|.gp.product)/i,
        params: [
          { param: "tag", paramValue: "tehunplayed09-21" }
        ]
      },
      amazonde : {
        rx: /^http.*?\.amazon.de.*?(\/dp\/|obidos.tg.detail|.gp.product)/i,
        params: [
          { param: "tag", paramValue: "tehunplayed06-21" }
        ]
      },
      amazones : {
        rx: /^http.*?\.amazon.es.*?(\/dp\/|obidos.tg.detail|.gp.product)/i,
        params: [
          { param: "tag", paramValue: "tehunplayed00-21" }
        ]
      },
      amazonfr : {
        rx: /^http.*?\.amazon.fr.*?(\/dp\/|obidos.tg.detail|.gp.product)/i,
        params: [
          { param: "tag", paramValue: "tehunplayed-21" }
        ]
      },
      amazonit : {
        rx: /^http.*?\.amazon.it.*?(\/dp\/|obidos.tg.detail|.gp.product)/i,
        params: [
          { param: "tag", paramValue: "tehunplayed0c-21" }
        ]
      },
    };
    
    function addTag(info) {
        var tUrl = info.url;
        var r = { cancel: false };
        
        console.log("Inside addTag() "); 
        
        for ( var config in configurations) { 
          if( configurations.hasOwnProperty(config) ) {
            if (tUrl.match(configurations[config].rx) ) { 
              if (tUrl.indexOf(configurations[config].params[0].param) == -1 ) {    
                r = { redirectUrl: tUrl+(tUrl.indexOf("?") == -1 ? "?" : "&") + createTag(configurations[config].params) };
                chrome.windows.getCurrent(function (currentWindow) {
                  chrome.tabs.query({active: true, windowId: currentWindow.id}, function(tabs) {
                    chrome.pageAction.show(tabs[0].id);
                  });
                });
                break;
              }
            } 
          }
        }
        return r;
    }

    function createTag(params) {
      var result = "";
      for( var i = 0; i < params.length; i++ ) {
        result = result + params[i].param + "=" + params[i].paramValue;
        if( i >= 0 && i < params.length - 1 ) {
            result = result + "&";
        }
      }
      return result;
    }

  
  if (!chrome.webRequest.onBeforeRequest.hasListener(addTag)) {      
   var site_urls = [ 
            "https://*.amazon.ca/*/dp/*",
            "https://*.amazon.ca/dp/*",
            "https://*.amazon.ca/exec/obidos/tg/detail/*",
            "https://*.amazon.ca/gp/product/*",
            "https://*.amazon.ca/o/*",
			
            "https://*.amazon.com/*/dp/*",
            "https://*.amazon.com/dp/*",
            "https://*.amazon.com/exec/obidos/tg/detail/*",
            "https://*.amazon.com/gp/product/*",
            "https://*.amazon.com/o/*",
			
            "https://*.amazon.co.uk/*/dp/*",
            "https://*.amazon.co.uk/dp/*",
            "https://*.amazon.co.uk/exec/obidos/tg/detail/*",
            "https://*.amazon.co.uk/gp/product/*",
            "https://*.amazon.co.uk/o/*",
			
            "https://*.amazon.de/*/dp/*",
            "https://*.amazon.de/dp/*",
            "https://*.amazon.de/exec/obidos/tg/detail/*",
            "https://*.amazon.de/gp/product/*",
            "https://*.amazon.de/o/*",
			
            "https://*.amazon.es/*/dp/*",
            "https://*.amazon.es/dp/*",
            "https://*.amazon.es/exec/obidos/tg/detail/*",
            "https://*.amazon.es/gp/product/*",
            "https://*.amazon.es/o/*",
			
            "https://*.amazon.fr/*/dp/*",
            "https://*.amazon.fr/dp/*",
            "https://*.amazon.fr/exec/obidos/tg/detail/*",
            "https://*.amazon.fr/gp/product/*",
            "https://*.amazon.fr/o/*",
			
            "https://*.amazon.it/*/dp/*",
            "https://*.amazon.it/dp/*",
            "https://*.amazon.it/exec/obidos/tg/detail/*",
            "https://*.amazon.it/gp/product/*",
            "https://*.amazon.it/o/*",
    ];
  
    chrome.webRequest.onBeforeRequest.addListener(addTag, { urls: site_urls }, [ "blocking" ]); 
  }