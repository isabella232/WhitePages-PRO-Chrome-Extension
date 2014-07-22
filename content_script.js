// function will call when document load and checking site url, that should not be pro.lookup.whitepages.com
$( document ).ready(function() {
  var hostname = document.location.hostname;
  if (hostname.indexOf('pro.lookup.whitepages.com')== -1){
    wpReversePhoneLookup(document.body);
  }
});

// this function will search a valid phone number on the page and adds whitePages icon along with phone number.
function wpReversePhoneLookup(elem) {
  var nodes = elem.childNodes
   , i = nodes.length
    // regular expression for phone number.
    //, regexp =  /\d*[-\s\.\(\ ][0-9][0-9][0-9][-\s\.\)\ ]*[0-9][0-9][0-9][-\s\.]*[0-9][0-9][0-9][0-9]*[(\.)|]*/gi
   , regexp =  /([0-9]{3})\)?[-. ]?[^0-9a-zA-Z]([0-9]{3})[-. ]?([0-9]{4})/g
   , node, phoneNode, a, result;
  while (node = nodes[--i]) {
    if (node.nodeType === 1) {
      wpReversePhoneLookup(node);
    } else if (node.nodeType === 3) {
      while (result = regexp.exec(node.textContent)) {
        node = node.splitText(result.index);
        node = node.splitText(result[0].length);
        phoneNode = node.previousSibling
        // white pages reverse phone URL.
        var link = "https://pro.lookup.whitepages.com/phones?number=" + result[0];
        // whitePages icon.
        var imgURL = chrome.extension.getURL("images/rsz_wp_16.png");
        var img = new Image();
        img.src = imgURL;
        img.className = "wpChromeExtensionImg";
        img.onclick = function() {
          window.open( link ,"_blank" ,"width=1000, height=650");
        };
        document.getElementsByClassName("wpChromeExtensionImg").src = imgURL;
        //Create link for whitePages icon
        wpLink = document.createElement('a');
        wpLink.href = '#';
        wpLink.className = "wpChromeExtension-link";
        //Append phoneNode with whitePages link
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

// function for checking whitePages link class "wpChromeExtension-link" on web page.
function hasClass(element, cls) {
  return (' ' + element.className + ' ').indexOf(' ' + cls + ' ') > -1;
}