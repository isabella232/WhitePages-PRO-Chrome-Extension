$( document ).ready(function() {
  var hostname = document.location.hostname;
  if (hostname.indexOf('pro.lookup.whitepages.com')== -1){
    wpReversePhoneLookup(document.body);
  }
}); 

function wpReversePhoneLookup(elem) {  
  var nodes = elem.childNodes
   , i = nodes.length
    //, regexp =  /\d*[-\s\.\(\ ][0-9][0-9][0-9][-\s\.\)\ ]*[0-9][0-9][0-9][-\s\.]*[0-9][0-9][0-9][0-9]*[(\.)|]*/gi
   , regexp =  /((\(|( |))?[0-9]{3}([- . ]|\)|) ?([0-9]{3}([- . ]|)[0-9]{4}| [0-9]{3}[0-9]{4})|([+]|)?[1][- ]?[0-9]{3}([- . ]|\)|) ?[0-9]{3}[- . ][0-9]{4})/gi
   , node, phoneNode, a, result;
  while (node = nodes[--i]) { 
    if (node.nodeType === 1) {  
      wpReversePhoneLookup(node);
    } else if (node.nodeType === 3) { 
      while (result = regexp.exec(node.textContent)) { 
        node = node.splitText(result.index);
        node = node.splitText(result[0].length);
        phoneNode = node.previousSibling 
        var link = "https://pro.lookup.whitepages.com/phones?number=" + result[0];
        var imgURL = chrome.extension.getURL("images/rsz_wp_16.png");
        var img = new Image();
        img.src = imgURL;
        img.className = "wpChromeExtensionImg";
        img.onclick = function() {
          window.open( link ,"_blank" ,"width=1000, height=650");
        };
        document.getElementsByClassName("wpChromeExtensionImg").src = imgURL;
        //Create link
        wpLink = document.createElement('a');
        wpLink.href = '#';
        wpLink.className = "wpChromeExtension-link";
        //Append phoneNode
        wpLink.appendChild(img)
        var refNode = phoneNode; 
        if (node.nextSibling != null){
          if (node.previousSibling == refNode && node.nextSibling.nextElementSibling != null ){
            if (hasClass(node.nextSibling.nextElementSibling, 'wpChromeExtension-link') == false)
              refNode.parentNode.insertBefore(wpLink, refNode.nextSibling);
          }
        }else
        if (node.nextSibling == null){
          refNode.parentNode.insertBefore(wpLink, refNode.nextSibling);
        }
      }
    }
  }
}

function hasClass(element, cls) {
  return (' ' + element.className + ' ').indexOf(' ' + cls + ' ') > -1;
}