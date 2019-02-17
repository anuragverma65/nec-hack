// Place all the behaviors and hooks related to the matching controller here.
// All this logic will automatically be available in application.js.

function onLoad(e){
  if(window.location_path != window.location.pathname) flushTableExportStorage();
  if(e && e.type == "popstate" && e.state == null){
    // console.log(e, window.location.pathname);
    if(window.location_path != window.location.pathname){
      Turbolinks.visit(window.location.href, { action: 'replace' })
    }
  }
  window.location_path = window.location.pathname;
  // if(e && e.type == "hashchange" && e.newURL && !e.newURL.match(/\#/)){
  //   Turbolinks.visit(window.location.href, { action: 'replace' })
  // }

  var initHeight = $('#full-section').height();
  var onloadHeight = Math.max($(window).height() - $('header').height() - 80*2, initHeight);

  if(initHeight != onloadHeight){
    var margin = (onloadHeight-initHeight)/2;
    if($('#full-section').data('top')){
      $('#full-section').css("margin-bottom", margin*2);
    } else {
      $('#full-section').css("margin-top", margin).css("margin-bottom", margin);
    }
  }
  else {
    $('#full-section').css("margin-top", "0").css("margin-bottom", "0");
  }

  if(window.location.hash != ""){
    scrollToHref(window.location.hash);
  } else {
    window.location_href = "";
  }

  $('.index-container').css('margin-bottom', $('footer').outerHeight());
  if(window.Realtime && Realtime.updateValue) Realtime.updateValue();
  window.unsavedShown = false;
  return false;
}

function scrollToHref(href){
  if(window.location_href == href && window.location.hash == href && window.location.pathname == '/') return;
  window.location_href = href;

  if($(href).attr('role') == 'tabpanel'){
    if($(href).data('parent')){
      $('a[href="'+$(href).data('parent')+'"]').click();
    }
    $('a[href="'+href+'"]').click();
    return;
  }
  else if($('[data-children*="'+href+'"]').attr('role') == 'tabpanel'){
    $('a[href="#'+$('[data-children*="'+href+'"]').attr('id')+'"]').click();
    return;
  }

  if($(href).length == 0) return;

  $('html, body').animate({
      scrollTop: $(href).offset().top - $('header').height()
  }, {
    duration: 700,
    done: function () {
      window.location.hash = href;
    }
  });

  $('a.scroll').removeClass('active');
  $(href+"-menu").addClass('active');
  $(".navbar-collapse").collapse('hide');
}

$(document).on('turbolinks:load', function(){
  onLoad();
  // if(!window.location.pathname.match(/admin/)) mixpanel_track('page-loaded');
  // setTimeout(function() { mixpanel_track('page-loaded'); }, 1000);
  mixpanel_track('page-loaded');
});

$(document).on('click', 'a.scroll', function(event){
    event.preventDefault();
    scrollToHref($.attr(this, 'href').substring(1));
    return false;
});

if(document && document.fonts){
  document.fonts.onloadingdone = function(d){
    onLoad();
  };
}

window.addEventListener('orientationchange', onLoad);
window.onhashchange = onLoad;
window.onpopstate = onLoad;


function tweakIframe(){
  console.log("Setting iframe styles");
  $('iframe').contents().find("head")
    .append($("<style type='text/css'> img { max-width: 100%; } </style>"));

  if($('#position-document iframe').length > 0){
    // $('#position-document iframe').get(0).contentWindow.document.body.onclick = function(e){
    $('#position-document #position-overlay').on('click', function(e){
      // console.log(e);
      $('#position-document').addClass('hidden');
      $('#position-choose').removeClass('hidden');
      e.x = e.offsetX;
      e.y = e.offsetY;
      $('#_position_x').val(e.x);
      $('#_position_y').val(e.y);
      $('#position-x-y').html(' Coordinates: (' + e.x + ', ' + e.y + ')');
      return true;
    });
  }
}
$(document).on('click', '#position-document #position-overlay', function(e){
  // console.log(e);
  $('#position-document').addClass('hidden');
  $('#position-choose').removeClass('hidden');
  e.x = e.offsetX;
  e.y = e.offsetY;
  $('#_position_x').val(e.x);
  $('#_position_y').val(e.y);
  $('#position-x-y').html(' Coordinates: (' + e.x + ', ' + e.y + ')');
  return true;
});

function refresh_token(form){
  if(!form.data('retries')){
    form.data('retries', 1)
    $.ajax({
      type: "GET",
      url: '/accounts/token'
    })
    .done(function(data){
      console.log(data);
      form.find('input[name="api_token"]').val(data);
      $(this).submit();
    })
    .fail(function(e){
      console.log(e);
    })
    .always(function(){ });
    return true;
  }
  return false;
}

function alertBox(text, cls, timeout){
  if(!text) return

  $('#notify-box').finish().html('<div class="alert alert-'+cls+' alert-dismissible" id="alert-box" role="alert">\
    <button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button>\
    <span id="notify-text">'+text+'</span>\
  </div>');

  $('#notify-box').slideDown(500).delay(timeout || 15000).fadeOut(500);
}

$(document).on("ajax:beforeSend", ".result-notify", function(e, data, status, xhr){
  alertBox("Processing... Please wait", "warning");
});

$(document).on("ajax:success", ".result-notify", function(e, data, status, xhr){
  alertBox(data.message || 'Updated!', "success");
  if($(this).hasClass('dismiss')) $(this).remove();
  if($(this).hasClass('star')){
    if($(this).find('.glyphicon-star').length > 0){
      $(this).find('.glyphicon-star').removeClass('glyphicon-star').addClass('glyphicon-star-empty gray');
    }
    else if($(this).find('.glyphicon-star-empty').length > 0) {
      $(this).find('.glyphicon-star-empty').removeClass('glyphicon-star-empty gray').addClass('glyphicon-star');
    }
  }
  if($(this).hasClass('hot')){
    if($(this).find('.btn-default').length > 0){
      $(this).find('.btn-default').removeClass('btn-default').addClass('btn-warning');
    }
    else if($(this).find('.btn-warning').length > 0) {
      $(this).find('.btn-warning').removeClass('btn-warning').addClass('btn-default');
    }
  }
  if($(this).hasClass('tpl')){
    if($(this).data('parent')){
      load_template($($(this).data('parent')), true);
    }
  }
  if($(this).hasClass('task-modal')){
    // console.log(e, data, status, xhr);
    if(data.task_id){
      var html = '<div class="modal fade" id="task-modal-'+data.task_id+'" role="dialog" tabindex="-1">\
  <div class="modal-dialog">\
    <div class="modal-content">\
      <div class="modal-header">\
        <button type="button" class="close" data-dismiss="modal">&times;</button>\
        <h4 class="modal-title"><strong>'+data.task_name+'</strong></h4>\
        <div class="small gray">EDIT TASK</div>\
      </div>\
      <div class="modal-body col-md-12" data-url="/admin/tasks/'+data.task_id+'" data-tpl="admin/tasks/edit">\
      </div>\
      <div class="modal-footer">\
        <a href="/admin/tasks/'+data.task_id+'" class="btn btn-default" target="_blank">Open in New Tab</a>\
        <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>\
      </div>\
    </div>\
  </div>\
</div>';
      $(html).appendTo($(document.body));
      $('#task-modal-'+data.task_id).modal();
    }
  }
});

$(document).on("ajax:error", ".result-notify", function(e, xhr, status, error){
  // console.log(xhr, xhr.status =s= 401, status, error);
  if(xhr.status == 401){
    console.log('Token expired, getting new');
    if(refresh_token($(this))) {
      return false;
    };
  }

  var data = {};
  try { data = JSON.parse(xhr.responseText); } catch(e) {
    console.log(e, xhr.responseText);
    return alertBox('An error occured, please contact Tech Team', "danger");
  }
  alertBox(Array.isArray(data.message) ? data.message.join(", ") : data.message, "danger");
});

Dropzone.autoDiscover = false;
Dropzone.options.documentUpload = {
  paramName: "document[file]", // The name that will be used to transfer the file
  maxFilesize: 50,//, // MB
  timeout: 600000,
  init: function(){
    this.on("addedfile", function(file, response) {
      console.log("addedfile", file, response);
    });
    this.on("success", function(file, response) {
      console.log("success", file, response);
    });
    this.on("queuecomplete", function(file, response) {
      console.log("queuecomplete", file, response);

      if($(this.element).data('redirect')){
        window.location = $(this.element).data('redirect');
      }
      if($(this.element).data('reload')){
        Turbolinks.visit(window.location.href, { action: 'replace' });
        // window.location.reload();
      }
      if($(this.element).data('remove')){
        $($(this.element).data('remove')).remove();
      }
      if($(this.element).data('submitform')){
        $($(this.element).data('submitform')).submit();
      }
      if($(this.element).hasClass('tpl')){
        if($(this.element).data('parent')){
          load_template($($(this.element).data('parent')), true);
        }
      }
    });
  }
  // uploadMultiple: true
};

function randomSequenceGenerator() {
  return Math.random().toString(36).substr(2);
}

function initTableExport(table) {
  if($(table).hasClass('tableExport-currency-as-numbers')) {
    TableExport.prototype.formatValue = function (t, e) {
      var val = e.trim();
      val = val.match(/^\(?\$?[\d,.]+\)?$/) ? val.replace(/[$,]/g, '') : val
      return t ? val : e;
    }
  }
  else {
    TableExport.prototype.formatValue = function (t, e) {
      return t ? e.trim() : e;
    }
  }

  TableExport.prototype.typeConfig.date.assert = function(v) { return false; }

  var excludeExport = $(table).find("th.exclude-tableExport").map(function(){
    return $(this).index();
  }).toArray();

  window.exportedTables = window.exportedTables || {};
  if(exportedTables[$(table).data('export-table-id')])  {
    exportedTables[$(table).data('export-table-id')].reset();
  } else {
    var randomId = randomSequenceGenerator();
    $(table).data('export-table-id', randomId)
    window.exportedTables[randomId] = $(table).tableExport({
      formats: ['xlsx', 'csv'],
      bootstrap: true,
      ignoreCols: excludeExport
    });
  }

  $(document).on('change', '.currency-as-numbers', function() {
    if(typeof(localStorage) != 'undefined') {
      localStorage.setItem('drip-currency-as-numbers', $(this).is(':checked'));
      if($(this).is(':checked')) {
        $(this).parent().prev('table').addClass('tableExport-currency-as-numbers');
      } else {
        $(this).parent().prev('table').removeClass('tableExport-currency-as-numbers');
      }
      initTableExport($(this).parent().prev('table'));
    }
  });
}

$(document).on('turbolinks:load', function(){
  if($('#notify-text').length && $('#notify-cls').length){
    alertBox($('#notify-text').html(), $('#notify-cls').text(), 15000);
  }

  $('.datatable').each(function(index, el){
    if($(el).parents('.dataTables_wrapper').length == 0){
      var options = { order: [] };

      if($(el).hasClass('onlySort')){
        options['searching'] = false;
        options['paging'] = false;
        options['info'] = false;
      }

      if($(el).hasClass('fixed-header')){
        options['fixedHeader'] =  true
      }

      if($(el).hasClass('scroll-y')){
        options['scrollY'] = '450px'
      }

      if($(el).data('nopages')){
        options['lengthMenu'] = [[25, 50, 100, -1], [25, 50, 100, "All"]];
        options['paging'] = false;
        options['info'] = false;
      }
      else
        options['lengthMenu'] = [[-1, 25, 50, 100], ["All", 25, 50, 100]];

      if($(el).data('coldefs'))
        options["columnDefs"] = [
          {
            "targets": $(el).data('coldefs'),
            "data": function(row, type, val, meta) {
              if (type === 'set') {
                row.price = $('<div>' + val + '</div>').find('div').first().text();
                row.val_display = val;
                return;
              }
              else if(type == 'display'){
                return row.val_display;
              }
              return row.price;
            }
          }
        ];

      var t = $(el).DataTable(options);
      $(el).data('data-table-instance', t);

      if(!$(el).hasClass('onlySort') && !$(el).hasClass('no-table-export')){
        var currencyAsNumber = ((typeof(localStorage) != 'undefined') && localStorage.getItem('drip-currency-as-numbers')) == 'true';
        var node = $("<div><input type='checkbox' class='currency-as-numbers'>&nbsp;&nbsp;Currency as numbers</div>")
        node.find('input').attr('checked', currencyAsNumber);
        node.insertAfter(el);
        if(currencyAsNumber) $(el).addClass('tableExport-currency-as-numbers')
        $(el).on( 'draw.dt', function () {
          initTableExport($(this));
        });
        initTableExport(el);
      }
    }
  })

  $('.bootstrap-multi-select').each(function(index, el) {
    $(el).selectpicker();
  });

  $('form.dropzone').each(function(index, el){
    if(!$(el).hasClass('dz-clickable')){
      $(el).dropzone(Dropzone.options.documentUpload);
    }
  });

  if($('input.cleave').length > 0) {
    window.cleave = new Cleave('input.cleave', {
      numeral: true,
      numeralThousandsGroupStyle: 'thousand'
    });
  }

  $('select.multiselect').each(function(index, el){
    if(!$(el).hasClass('ms-done')){
      $(el).addClass('ms-done');
      $(el).multiselect({
        buttonClass: 'btn btn-default mxp',
        numberDisplayed: 15,
        maxHeight: 300,
        enableCaseInsensitiveFiltering: true,
        enableCollapsibleOptGroups: true,
        onDropdownShown: function(){
          $('.caret-container b').click()
        },
        onDropdownHidden: function(){
          $('.caret-container b').click()
        },
        dropUp: ($(this).data('dropup') || '').toString() == "true"
      });
    }
  });

  initializeTypeAhead();
  initializeWebTicker();

  $('input[type="date-pick"]').each(function(index, el){
    if(!$(el).hasClass('dp-done')){
      $(el).addClass('dp-done');
      if(!$(el).hasClass('date-non-readonly')) {
        $(el).attr('readonly', 'readonly');
      }

      var datepickerOptions = {
        format: 'yyyy-mm-dd',
        clearBtn: true,
        autoclose: true
      };

      if($(el).hasClass('disable-holidays')) {
        datepickerOptions['datesDisabled'] = CONSTANTS.us_holidays;
        datepickerOptions['daysOfWeekDisabled'] = '0,6';
      }

      $(el).datepicker(datepickerOptions);
    }
  });

  $('input[type="datetime-pick"]').each(function(index, el){
    if(!$(el).hasClass('dtp-done')){
      $(el).addClass('dtp-done');

      var datepickerOptions = {
        format: 'YYYY-MM-DD hh:mm A'
      };

      $(el).datetimepicker(datepickerOptions);
    }
  });

  $('[data-toggle="tooltip"]').each(function(index, el){
    if(!$(el).hasClass('tt-done')){
      $(el).addClass('tt-done');
      $(el).tooltip();
    }
  });

  $('.hide-content').each(function(index, el){
    if(!$(el).hasClass('sm-done')){
      $(el).addClass('sm-done');
      $(el).showmore({
        closedHeight: 20,
        buttonTextMore: 'Show more'
      });
    }
  });


  // $('table.freeze-table').each(function(index, el){
  //   if(!$(el).hasClass('tf-done')){
  //     $(el).addClass('tf-done');
  //     $(el).CongelarFilaColumna({lboHoverTr:true});
  //   }
  // });
});

function initializeTypeAhead() {
  $('.typeahead').each(function(index, el){
    if(!$(el).hasClass('th-done')){
      $(el).addClass('th-done');

      var delimiter = $(el).data('delimiter') || ',';
      var tokenizer = new Bloodhound({
        datumTokenizer: Bloodhound.tokenizers.whitespace,
        queryTokenizer: Bloodhound.tokenizers.whitespace,
        local: $(el).data('tokens').split(delimiter.toString())
      });

      tokenizer.initialize();

      $(el).typeahead({
        hint: true, highlight: true, minLength: 1
      }, {
        // name: $(el).data('target'),
        source: tokenizer.ttAdapter()
      });
    }
  });

}
$(document).on('cocoon:after-insert', initializeTypeAhead);
$(document).on('submit', 'form', function(e) {
  $(this).find('input.cleave').each(function() {
    $(this).val($(this).val().replace(/,/g, ''));
  });
  return true;
});

$(document).on('dp.change', 'input[type="datetime-pick"]', function(e){
  console.log(e, $(this).val());
  return true;
})

$(document).on('click', 'a.move-up', function(event){
    event.preventDefault();
    $('html, body').animate({ scrollTop: 0 }, { duration: 700 });
    return false;
});

function mixpanel_track(event, data){
  var data = data || {};
  data['url'] = data['url'] || window.location.href;
  if(typeof(mixpanel) == 'undefined') return
  if(mixpanel && mixpanel.track) mixpanel.track(event, data);
  // console.log('MIXPANEL', event, data);
}

$(document).on("ajax:beforeSend", "form", function(e, data, xhr){
  // console.log(e, data, status, xhr)
  mixpanel_track('ajax-request', { url: xhr.url, type: xhr.type, data: xhr.data });
});

$(document).on('click', 'a, input, select, button, textarea', function(){
  if($(this).data('mxp-event')){
    d = {};
    $(this).each(function(){
      $.each(this.attributes, function(){
        if(this.name.match(/^data-mxp-*/))
          d[this.name] = this.value;
      })
    })
    mixpanel_track($(this).data('mxp-event'), d);
  }
})

function flushTableExportStorage() {
  if(typeof(sessionStorage) != 'undefined') {
    Object.keys(sessionStorage).filter(function(key) { return key.match(/tableexport/) }).forEach(function(k) {
      sessionStorage.removeItem(k);
    });
  }
}

function initializeWebTicker() {
  $('.webticker').each(function(index, el){
    if(!$(el).hasClass('wt-done')){
      $(el).addClass('wt-done');
      if($(el).hasClass('hide')) $(el).removeClass('hide');
      $(el).webTicker();
    }
  });
}
