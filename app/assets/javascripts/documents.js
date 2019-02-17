// Drive Picker Integration

// The Browser API key obtained from the Google Developers Console.
var developerKey = CONSTANTS.drive.api_key;

// The Client ID obtained from the Google Developers Console. Replace with your own Client ID.
var clientId = CONSTANTS.drive.client_id;
var accessToken = null;

// Scope to use to access user's photos.
var scope = ['https://www.googleapis.com/auth/drive'];

var pickerApiLoaded = false;
var oauthToken;
var pickerElement = false;

// Use the API Loader script to load google.picker and gapi.auth.
function onApiLoad() {
  gapi.load('auth', {'callback': onAuthApiLoad});
  gapi.load('picker', {'callback': onPickerApiLoad});
}

function onAuthApiLoad() {
  if(!accessToken){
    window.gapi.auth.authorize(
        {
          'client_id': clientId,
          'scope': scope,
          'immediate': false
        },
        handleAuthResult);
  }
  else createPicker();
}

function onPickerApiLoad() {
  pickerApiLoaded = true;
  createPicker();
}

function handleAuthResult(authResult) {
  if (authResult && !authResult.error) {
    oauthToken = authResult.access_token;
    accessToken = oauthToken;
    createPicker();
  }
}

// Create and render a Picker object for picking user Photos.
function createPicker() {
  if (pickerApiLoaded && oauthToken) {
    var picker = new google.picker.PickerBuilder().
        disableFeature(google.picker.Feature.NAV_HIDDEN).
        enableFeature(google.picker.Feature.MULTISELECT_ENABLED).
        addView(google.picker.ViewId.DOCS).
        setOAuthToken(oauthToken).
        addView(new google.picker.DocsUploadView()).
        setDeveloperKey(developerKey).
        setCallback(pickerCallback).
        build();
    picker.setVisible(true);
  }
}

function getFormData(){
  var formData = {};
  $((pickerElement && pickerElement.data('upload-form')) || '#document-upload').serializeArray().forEach(function(item){
    if(item.name == "document[invoice_id]"){
      formData["invoice_id"] = item.value;
    }
    if(item.name == "document[user_id]"){
      formData["user_id"] = item.value;
    }
    if(item.name == "document[parent_id]"){
      formData["parent_id"] = item.value;
    }
    if(item.name == "document[document_type]"){
      formData["document_type"] = item.value;
    }
    if(item.name == "document[tags]"){
      formData["tags"] = item.value;
    }
  });
  pickerElement = false;
  return formData;
}

// A simple callback implementation.
function pickerCallback(data) {
  var fileid = 'nothing';
  if (data[google.picker.Response.ACTION] == google.picker.Action.PICKED) {
    console.log(data);

    alertBox("Processing... Please wait", "warning", 300000);
    var formData = getFormData();

    $.ajax({
      type: "POST",
      url: "/admin/documents/drive_picker",
      data: {
        docs: data['docs'],
        accessToken: accessToken,
        formData: formData,
        nextHash: window.location.hash
      }
    })
    .done(function(data){
      // console.log(data);
    })
    .fail(function(e){
      console.log(e);
    });
  }
}

$(document).on("click", ".drive-picker", function(){
  pickerElement = $(this);
  onApiLoad();
  return false;
});

// Dropbox Chooser Integration

function onBoxLoad(){
  Dropbox.choose({

    // Required. Called when a user selects an item in the Chooser.
    success: function(files) {
      console.log(files);

      alertBox("Processing... Please wait", "warning", 300000);
      var formData = getFormData();

      $.ajax({
        type: "POST",
        url: "/admin/documents/dropbox_chooser",
        data: {
          docs: files,
          formData: formData
        }
      })
      .done(function(data){
        // console.log(data);
      })
      .fail(function(e){
        console.log(e);
      });
    },

    // Optional. Called when the user closes the dialog without selecting a file
    // and does not include any parameters.
    cancel: function() {},

    // Optional. "preview" (default) is a preview link to the document for sharing,
    // "direct" is an expiring link to download the contents of the file. For more
    // information about link types, see Link types below.
    linkType: "direct",

    // Optional. A value of false (default) limits selection to a single file, while
    // true enables multiple file selection.
    multiselect: true

    // Optional. This is a list of file extensions. If specified, the user will
    // only be able to select files with these extensions. You may also specify
    // file types, such as "video" or "images" in the list. For more information,
    // see File types below. By default, all extensions are allowed.
    // extensions: ['.pdf', '.doc', '.docx'],
  });
}

$(document).on("click", ".dropbox-chooser", function(){
  onBoxLoad();
  return false;
});
