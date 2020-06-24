(function($, window, document){

  function take_photo(action) {
      Webcam.snap( function(data_uri) {
          var img = $('<img />', { id: action, src: data_uri});
          var btn = $('<a class="js-clear button button-contactForm" onclick="clear_photo(this.name)" href="#" name="'+action+'">Clear</a>');
          var verifyBtn = $('<a id="verifyBtn" class="button button-contactForm" href="javascript:void(verify_identity())">Verify</a>');

          if ($('#api_result').length){
            $('#output1').html('');
            $('#output2').html('');
            $('#output3').html('');
          }
          $('#output2').html($('#output1').html());                      
          $('#output1').html(img).append(btn);

          if ( $('#capturedId').length ) {
            if ($('#output2').html() == ''){
              $('#output2').html(verifyBtn)
            }
            else{
              $('#output3').html(verifyBtn)
            }
          }
      });
  }              

  function clear_photo(name){
    $('#'+name).parent().html('');
    $('#verifyBtn').remove();
  }

  function verify_identity(){
    var apiToken = window.csrf_token;                  
    var identityPost = "/api/identity/";
    var informationGet = "/api/information/";
    var docImage = $('#capturedId').attr('src');
    var liveImage = $('#capturedPhoto');

    var postData = {"doc_image": docImage, "proc_mode": "SYNC"}
    if (liveImage.length)
      postData.live_image = liveImage.attr('src');

    $.ajax({
      type: 'POST',
      url: identityPost,
      headers: { "X-CSRFToken": apiToken },
      contentType: "application/json; charset=utf-8",
      data: JSON.stringify(postData),
      success: function(responsePOST) {
        $.ajax({
          type: 'GET',
          url: informationGet+responsePOST.id,
          headers: { "X-CSRFToken": apiToken },
          contentType: "application/json; charset=utf-8",
          success: function(responseGET){
            var pre = $('<pre id="api_result" class="text-left"></pre>').text(JSON.stringify(responseGET,null,4));
            $('#js-loader').parent().html(pre);
          },
          error: function (jqXHR, textStatus, errorThrown) {
            var pre = $('<pre id="api_result" class="text-left"></pre>').text(jqXHR.responseText);
            $('#js-loader').parent().html(pre);
          },                        
        });
      },
      error: function (jqXHR, textStatus, errorThrown) {
        var pre = $('<pre id="api_result" class="text-left"></pre>').text(jqXHR.responseText);
        $('#js-loader').parent().html(pre);
      },
      beforeSend: function() {
        var loader = $('<div id="js-loader" class="loader"></div');
        $('#verifyBtn').parent().html(loader);
        $('a.js-clear').remove();
      },
      complete: function() {
      }
    });
  }

  window.take_photo = take_photo;
  window.clear_photo = clear_photo;
  window.verify_identity = verify_identity;

})($, window, document);