
document.addEventListener('DOMContentLoaded', function() {
  document.getElementById('closeButton').onclick = doClose;
});

function doClose() {
  self.close();
}