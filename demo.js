// NOTE: You must replace the client id on the following line.
var clientId = '828274649672-4hf7if4390du1pc4p86gemefn5dts5f1.apps.googleusercontent.com';
var scopes = 'https://spreadsheets.google.com/feeds';

function init() {
  gapi.auth.authorize(
      {client_id: clientId, scope: scopes, immediate: true},
      handleAuthResult);
}

function handleAuthResult(authResult) {
  var authorizeButton = document.getElementById('authorize-button');
  if (authResult && !authResult.error) {
    authorizeButton.style.visibility = 'hidden';
    makeApiCall();
  } else {
    authorizeButton.style.visibility = '';
    authorizeButton.onclick = handleAuthClick;
  }
}

function handleAuthClick(event) {
  gapi.auth.authorize(
      {client_id: clientId, scope: scopes, immediate: false},
      handleAuthResult);
  return false;
}

function makeApiCall() {
  // Note: The below spreadsheet is "Public on the web" and will work
  // with or without an OAuth token.  For a better test, replace this
  // URL with a private spreadsheet.
  var tqUrl = 'https://docs.google.com/spreadsheets' +
      '/d/1472WBAZMKUxCgMj4X1r42v4CX7nNK2FS9qHGUzoBqwc/gviz/tq?gid=546681635' +
      '?tqx=responseHandler:handleTqResponse' +
      '&access_token=' + encodeURIComponent(gapi.auth.getToken().access_token);

  document.write('<script src="' + tqUrl +'" type="text/javascript" async></script>');
}

function handleTqResponse(resp) {
  document.write(JSON.stringify(resp));
}
