$(document).on("change", "select.status-update, input[type=checkbox].status-update", function(){
  window.formSubmit = true;
  $(this).parents('form.result-notify').submit();
});

$(document).on("change", "select.fetch-data", function(){
  window.formSubmit = true;
  alertBox("Processing... Please wait", "warning");
  $(this).parents('form.result-notify').submit();
});

$(document).on("click", ".show-processing", function(){
  alertBox("Processing... Please wait", "warning", 60000);
});

$(document).on("blur", "textarea.status-update", function(){
  window.formSubmit = true;
  if(!$(this).data('noshrink')) $(this).css('height', '75px');
  if($(this).data('initial') == $(this).val()) return;
  $(this).parents('form.result-notify').submit();
});

$(document).on("focus", "textarea", function(){
  if(!$(this).data('atwho-done')){
    $(this).data('atwho-done', true);
    $(this).atwho({at:"@", 'data': window.mentions || []});
  }
});

$(document).on('click', '.select-all-checkbox', function(){
  if($('input.checkbox-selected').not(':checked').length === 0){
    $('.checkbox-selected').prop('checked', false);
  }
  else {
    $('.checkbox-selected').prop('checked', true)
  }
});

$(document).on("blur", "input.status-update", function(){
  window.formSubmit = true;
  if($(this).data('hide')){
    $($(this).data('hide')).addClass("hidden");
  }
  if($(this).data('show')){
    $($(this).data('show')).removeClass("hidden");
  }

  if($(this).data('set')){
    $($(this).data('set')).html($($(this).data('val')).val());
  }

  if($(this).data('initial') == $(this).val()) return;
  $(this).parents('form.result-notify').submit();
});

$(document).on("change", "input.save-remote", function(){
  window.formSubmit = true;
  $(this).parents('form.result-notify').submit();
});

$(document).on("blur", 'input.save-remote[type="datetime-pick"]', function(){
  window.formSubmit = true;
  $(this).parents('form.result-notify').submit();
});

$(document).on('change', "input.trigger-panel", function(){
  if($(this).is(':checked')){
    $('.' + $(this).data('panel')).removeClass('hidden');
    if(!$(this).data('no-reset-select')){
      $('.' + $(this).data('panel') + ' select').val($('.' + $(this).data('panel') + ' select').data('val'));
    }
    if($(this).data('reset')){
      $('.' + $(this).data('reset')).addClass('hidden');
      $('.' + $(this).data('reset') + ' input').val('');
      $('.' + $(this).data('reset') + ' select').data('val', $('.' + $(this).data('reset') + ' select').val());
      $('.' + $(this).data('reset') + ' select').val('')
    }
  }
  else {
    $('.' + $(this).data('panel')).addClass('hidden');
    if(!$(this).data('no-reset-select')){
      $('.' + $(this).data('panel') + ' input').val('');
      $('.' + $(this).data('panel') + ' select').val('');
      if($(this).data('reset')){
        $('.' + $(this).data('reset')).removeClass('hidden');
      }
    }
  }
});

$(document).on('change', "input.trigger-control", function(){
  if($(this).is(':checked')){
    $($(this).data('control')).removeAttr('disabled');
  }
  else {
    $($(this).data('control')).attr('disabled', true);
  }
});

$(document).on('click', ".trigger-selection", function(){
  var that = this;
  if($(that).data('selector')){
    $($(that).data('selector')).each(function(){
      $($(this).data('parent')).addClass('hidden');
      if($(this).val() == $(that).data('show'))
        $($(this).data('parent')).removeClass('hidden');
      else
        $($(this).data('parent')).addClass('hidden');
    })
  }
  return false;
});

$(document).on('click', '.toggle', function(){
  if($(this).data('parent-close')){
    $($(this).data('parent-close')).removeClass($(this).data('class'));
  }

  if($(this).data('parent')){
    $($(this).data('parent')).toggleClass($(this).data('class'));
  }
  return false;
});

$(document).on('blur', '.copy-html', function(){
  if($(this).data('target')){
    $($(this).data('target')).val($(this).html());
  }
});

$(document).on("change", "select.status-trigger", function(){
  window.formSubmit = true;
  if($(this).data('target')){
    $($(this).data('target')).click();
  }
});

$(document).on('change', 'input.auto-calculate', function(){
  $($(this).data('auto')).each(function(){
    var catId = $(this).data('cat'), paramId = $(this).data('param');
    $(this).text($('#cat-' + catId + '-weight input.auto-calculate').val() * $('#param-' + paramId + '-weight input.auto-calculate').val() / 100);

    var sum = 0;
    $('.overall').each(function(){
      sum += parseFloat($(this).text());
    });
    $('#total-overall').text(sum + " %");
    $('#total-overall').parent().removeClass('success danger').addClass(sum == 100 ? "success" : "danger");
  });
});

$(document).on('change', 'select.ratings', function(){
  var total = 0, score = 0;
  $('select.ratings').each(function(){
    var paramId = $(this).data('param');
    var weight = parseFloat($('#param-' + paramId + '-overall-weight').text());
    score += weight * $(this).val();
    total += weight;
  });
  $('.total-score').text((score / total).toFixed(2));
});

$(document).on('change', '#reuters_status', function() {
  showRiskBasedOnStatus();
});

$(document).on('click', '#track_all_containers', function() {
  $('.container-tracking-results').removeClass('hidden');
  $('.track-container').trigger('submit');
});

$(document).on('submit', '.track-container', function(e) {
  e.preventDefault();
  var clickedContainers = $(this).data('id');
  clickedContainers.forEach(function(container) {
    var tableContainer = $('#container-tracking-results-table-' + container + ' tbody');
    tableContainer.html('<tr style="text-align: center"><td>Tracking container</td></tr>');
  });
});


function triggerShowHide(){
  console.log('Here', $(this));
  if($(this).data('hide')){
    $($(this).data('hide')).addClass("hidden");
  }
  if($(this).data('show')){
    $($(this).data('show')).removeClass("hidden");
  }
  if($(this).data('focus')){
    $($(this).data('focus')).focus();
  }
}

function scroller() {
  var $scrollingDiv = $(".scrolling_pane");
  if($scrollingDiv.length != 0){
    $(window).scroll(function() {
      var original_offset = $(".fixed_pane").offset().top;
      var max_margin_top = $('.fixed_pane').height() - $scrollingDiv.height();
      if ($(window).scrollTop() > original_offset) {
        //var fixed_pane_bottom = $('#fixed_pane').offset().top + $('#fixed_pane').height();
        var new_margin_top = $(window).scrollTop() - original_offset;
        //var divs_height_diff = fixed_pane_bottom - $(window).scrollTop();
        if (new_margin_top > max_margin_top){
          new_margin_top = max_margin_top;
        }
        $scrollingDiv.stop().animate({"marginTop": new_margin_top + "px"}, "slow" );
      } else {
        $scrollingDiv.stop().animate({"marginTop": "0px"}, "slow" );
      }
    });
  }
}

$(document).on('click', 'a.trigger, td.trigger, div.trigger', function(){
  triggerShowHide.call(this);
  return false;
});

$(document).on('click', 'input.trigger', function(){
  triggerShowHide.call(this);
  return true;
});

$(document).on("change", "select.select-trigger", function(){
  var selected = $(this).val();
  console.log(selected);
  if($(this).data('sections')){
    var sections = $(this).data('sections');
    $(sections).addClass('hidden');
    $(sections + '.' + selected).removeClass('hidden');
  }
  if($(this).data('reference')){
    $('.reference').val(selected)
  }
});

$(document).on("change", "input#invoice-gross-value, input#invoice-advance-received", function(){
  var gross_value = $('input#invoice-gross-value').val();
  var advance_received = $('input#invoice-advance-received').val();
  if(gross_value && advance_received && (gross_value - advance_received > 0))
    $('input#invoice-net-value').val(gross_value - advance_received);
});

$(document).on("change", "input#investment-principal", function(){
  var principal = $('input#investment-principal').val();
  $('input#investment-advance-value').val(principal);
});

function auto_calculate_due_date(e){
  var term = $('input#invoice-term').val();
  var tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  // var bl_date = $('input#invoice-bl-date').val();
  // var invoice_date = $('input#invoice-invoice-date').val();
  // var from_date = $('input#invoice-from-inv-date').is(':checked') ? invoice_date : ($('input#invoice-from-bl-date').is(':checked') ? bl_date : null);
  // if(term && from_date){
  //   from_date = new Date(from_date);
  //   from_date.setDate(from_date.getDate() + parseInt(term));
  //   $('input#invoice-repayment-date').val(from_date.toISOString().slice(0, 10));
  // }

  if($('input#invoice-from-inv-date').is(':checked')){
    var from_date = $('input#invoice-invoice-date').val();
  }

  if($('input#invoice-from-bl-date').is(':checked')){
    var from_date = $('input#invoice-bl-date').val();
  }

  if($('input#invoice-from-discharge-date').is(':checked')){
    var from_date = $('input#invoice-discharge-date').val();
  }

  if($('input#invoice-from-fda-date').is(':checked')){
    var discharge_date = $('input#invoice-discharge-date').val(),
       fda_date = $('input#invoice-fda-date').val();

    if(discharge_date){
      if(!fda_date){
        fda_date = new Date(discharge_date);
        fda_date.setDate(fda_date.getDate() + parseInt(3));
      }
      else {
        fda_date = new Date(fda_date);
      }
    }

    if(e && e.target && e.target.id == 'invoice-discharge-date' && discharge_date){
      fda_date = new Date(discharge_date);
      fda_date.setDate(fda_date.getDate() + parseInt(3));
    }

    if(e && e.target && e.target.id == 'invoice-fda-date'){
    } else {
      fda_date = new Date(Math.max.apply(null, [fda_date, tomorrow]))
    }

    $('input#invoice-fda-date').val(fda_date.toISOString().slice(0, 10));
    var from_date = fda_date;
  }

  if($('input#invoice-from-goods-date').is(':checked')){
    var discharge_date = $('input#invoice-discharge-date').val(),
       fda_date = $('input#invoice-fda-date').val();

    if(discharge_date){
      if(!fda_date){
        fda_date = new Date(discharge_date);
        fda_date.setDate(fda_date.getDate() + parseInt(30));
      }
      else {
        fda_date = new Date(fda_date);
      }
    }

    if(e && e.target && e.target.id == 'invoice-discharge-date' && discharge_date){
      fda_date = new Date(discharge_date);
      fda_date.setDate(fda_date.getDate() + parseInt(15));
    }

    if(e && e.target && e.target.id == 'invoice-fda-date'){
    } else {
      fda_date = new Date(Math.max.apply(null, [fda_date, tomorrow]))
    }

    $('input#invoice-fda-date').val(fda_date.toISOString().slice(0, 10));
    var from_date = fda_date;

    // var discharge_date = $('input#invoice-discharge-date').val();
    // if(discharge_date){
    //   discharge_date = new Date(discharge_date);
    //   discharge_date.setDate(discharge_date.getDate() + parseInt(15));
    //   discharge_date = new Date(Math.max.apply(null, [discharge_date, tomorrow]))
    //   $('input#invoice-fda-date').val(discharge_date.toISOString().slice(0, 10));
    // }
    // var from_date = $('input#invoice-fda-date').val();
  }

  if(term && from_date){
    from_date = new Date(from_date);
    from_date.setDate(from_date.getDate() + parseInt(term));
    $('input#invoice-repayment-date').val(from_date.toISOString().slice(0, 10));
  }
}

$(document).on("change",
               "input#invoice-term, input#invoice-bl-date, input#invoice-invoice-date, input#invoice-discharge-date, \
                input#invoice-fda-date, input#invoice-from-inv-date, input#invoice-from-bl-date, \
                input#invoice-from-discharge-date, input#invoice-from-fda-date, input#invoice-from-goods-date",
               auto_calculate_due_date);

// $(document).on("change", "input#invoice-shipping-bill, input#invoice-shipping-bill-date, select#invoice-shipping-port", function(){
$(document).on("click", "#invoice-verify", function(){
  var shipping_bill = $('input#invoice-shipping-bill').val();
  var shipping_bill_date = $('input#invoice-shipping-bill-date').val();
  var shipping_port = $('select#invoice-shipping-port').val();
  if(shipping_bill && shipping_bill_date && shipping_port){
    $('#invoice-verify').attr("disabled", true);
    $('#invoice-verify').text('Fetching... Please wait 1-2 mins')

    $.ajax({
      type: "POST",
      url: "/admin/shipping_data/new.json",
      data: {
        shipping_data: {
          shipping_bill: shipping_bill,
          shipping_bill_date: shipping_bill_date,
          shipping_port: shipping_port
        }
      }
    })
    .done(function(data){
      // console.log(data);
      var results = $('#invoice-verify-results p.form-control-static');
      $(results.get(0)).html(data["shipping_datum"]["fob_inr"]);
      $(results.get(1)).html(data["shipping_datum"]["container_no"]);
      $(results.get(2)).html(data["shipping_datum"]["leo_date"]);
    })
    .fail(function(e){
      console.log(e);
    })
    .always(function(){
      $('#invoice-verify').removeAttr("disabled");
      $('#invoice-verify').text('Fetch');
    });
  }
  return false;
});

$(document).on('click', "a.expandable", function(){
  $('.' + $(this).data('linked')).removeClass("hidden");
  $(this).addClass("hidden");
  if($(this).data("rowspan"))
    $(this).parent().siblings('.rowspan').attr("rowspan", $(this).data("rowspan"))
  return false;
});

$(document).on('click', "a.collapsible", function(){
  $('.' + $(this).data('linked')).addClass("hidden");
  $('.' + $(this).data('linked') + '.expandable').removeClass("hidden");
  if($(this).data("rowspan"))
    $(this).parent().siblings('.rowspan').attr("rowspan", $(this).data("rowspan"));
  return false;
});

$(document).on('click', 'a.cross-click', function(){
  $($(this).data('cross')).click();
  if ($(this).data('no-click')) return false;
});

$(document).on('click', 'a.js-print', function(){
  window.print();
  return false;
});

function mark_payments(){
  var payment_incoming = parseFloat($('#payment-incoming').text());
  // console.log('HERE', payment_incoming);
  var payments = 0;
  $('form.mark-payments input.payments').each(function(){
    var payment = parseFloat($(this).val());
    if(!isNaN(payment)) payments += payment
  })
  // console.log('HERE', payments);
  if(!isNaN(payment_incoming)) {
    $('#payment-pending').text(payment_incoming - payments);
    if(payment_incoming - payments < 0){
      $('#save-mark-payments').val('Payments more than incoming value').attr('disabled', 'disabled');
    } else {
      $('#save-mark-payments').val('Save Payments').removeAttr('disabled');
    }
  }
  return false;
}

$(document).on('change', 'form.mark-payments input.payments', mark_payments);
$(document).on('keyup', 'form.mark-payments input.payments', mark_payments);

function load_url(url, container){
  $.ajax({
    type: "GET",
    url: url
  })
  .done(function(data){
    // console.log(data);
    container.html(data);
  })
  .fail(function(e){
    console.log(e);
  })
  .always(function(){
  });
}

function load_template(tab, reload){
  if(tab === undefined) return;
  var tpl = tab.data('tpl');
  // console.log('HERE');

  if(tpl && !tab.data('tpl-loading')){
    if(!reload) tab.data('tpl-loading', true);
    tab.html('<div class="admin-section tabpanel row"><div class="subtagline subfont grey col-md-6"><strong>Loading...</strong></div></div>');
    // console.log('HERE 2');

    $.ajax({
      type: "GET",
      url: tab.data('url') || window.location.href,
      data: {
        _tpl: tpl
      }
    })
    .done(function(data){
      // console.log(data);
      if(!reload) tab.data('tpl-loaded', true);
      tab.html(data);
      tab.trigger('turbolinks:load');
    })
    .fail(function(e){
      console.log(e);
    })
    .always(function(){
    });
  }
}

$(document).on('click', '.nav-tabs a', function (e) {
  if($(this).tab) $(this).tab('show');

  var href = $(this).attr('href');
  var tab = $(href);
  load_template(tab);

  return true;
});

$(document).on('click', '.template-loader', function (e) {
  var container = $(this).data('container');
  var tab = $(container + ' div[data-tpl]');
  // console.log('Here', tab);
  // console.log('Here', tab.data('tpl'));
  load_template(tab);

  return true;
});

$(document).on('click', '.load-tpl', function (e) {
  $(this).attr('disabled', true);
  var that = this;
  var tab = $($(this).data('container'));
  if(tab === undefined) return false;

  var tpl = $(this).data('tpl');

  if(tpl && !tab.data('tpl-loading')){
    tab.data('tpl-loading', true);
    $(this).text('Loading...');
    // console.log('HERE 2');

    $.ajax({
      type: "GET",
      url: $(this).data('url') || window.location.href,
      data: {
        _tpl: tpl
      }
    })
    .done(function(data){
      // console.log(data);
      tab.replaceWith(data);
      // tab.trigger('turbolinks:load');
    })
    .fail(function(e){
      console.log(e);
    })
    .always(function(){
      if($(that).hasClass('dismiss')) $(that).remove();
    });
  }

  return false;
});

function isScrolledIntoView(elem){
  var docViewTop = $(window).scrollTop();
  var docViewBottom = docViewTop + $(window).height();

  var elemTop = $(elem).offset().top;
  var elemBottom = elemTop + $(elem).height();

  return ((elemBottom <= docViewBottom) && (elemTop >= docViewTop));
}

var scrollThrottle = false;
$(document).on( 'scroll', function(){
  if(!scrollThrottle){
    scrollThrottle = true;
    setTimeout(function(){ scrollThrottle = false; }, 150);

    $('.load-tpl.on-scroll:visible').each(function(index, elem){
      if(isScrolledIntoView(elem)){
        elem.click();
      }
    });
  }
});

$(document).on('shown.bs.modal', '.modal', function(e){
  var tab = $(this).find('div[data-tpl]');
  if(!tab) return true;
  // console.log('Here', tab.data('tpl'));
  load_template(tab);
  return true;
});

function textAreaAdjust(o) {
  var initial = o.style.height;
  o.style.height = "1px";
  if((25 + o.scrollHeight) > 75){
    o.style.height = (25+o.scrollHeight) + "px";
  }
  else {
    o.style.height = "75px";
  }
}

$(document).on("change", "input.date-reload", function(){
  var uptoDate = $(this).val();
  if(uptoDate){
    var url = $(this).data('url').replace(':date', uptoDate);
    window.location = url;
  }
  else if($(this).data('remove')){
    var url = $(this).data('url').replace($(this).data('remove'), uptoDate);
    window.location = url;
  }
});

$(document).on("click", ".ask-data", function(){
  var value = prompt('Moneycontrol ID:');
  if(value){
    var url = $(this).attr('href').replace(':key', value);
    window.location = url;
  }
  return false;
});

$(document).on("change", "input#upto-date, input#from-date", function(){
  var uptoDate = $('input#upto-date').val();
  var fromDate = $('input#from-date').val();
  $('#download-reports').find('a').each(function(){
    var link = $(this).attr('href');
    var parts = link.split('?');
    if(uptoDate && fromDate)
      $(this).attr('href', parts[0] + '?upto=' + uptoDate + '&from=' + fromDate);
  })
});

$(document).on("change", "input#calc-date", function(){
  var calcDate = $('input#calc-date').val();
  var invoiceID = $('input#calc-date').data('invoice');
  window.location = '/admin/invoices/' + invoiceID + '/calc/' + calcDate + '#calculations';
});

function displayLink(text, link, timeout){
  alertBox(text, 'info', timeout);
  // $('#realtime').text(text).attr('href', link || '#').finish().fadeIn(1500).delay(timeout || 5000).fadeOut(5000);
}

function stopUnsaved(flag){
  if(window.location.pathname.match(/new|edit/) && !window.unsavedShown && !window.formSubmit){
    if(flag) alertBox("Form is not submitted... Please check. Try again to ignore.", "danger", 60000);
    window.unsavedShown = true;
    return false;
  }
  return true;
}

// window.onbeforeunload = function(e) {
//   console.log(e);
//   if(!window.formSubmit) stopUnsaved(unsavedShown);
//   if(window.unsavedShown && !window.formSubmit) return true;
// };

// $(document).on('turbolinks:before-visit', stopUnsaved);

Realtime = window.Realtime || {};

Realtime.process = function(event, data){
  Realtime.log(event, data);
  switch(event){
    case 'test':
      console.log('TEST', data);
      break;

    case 'link':
      displayLink(data.text, data.link, data.timeout);
      break;

    case 'reload':
      if(window.location.pathname == data.path){
        Turbolinks.visit(data.path, { action: 'replace' })
      }
      break;

    default:
      break;
  }
}

$(document).ready(function(){
  if(Realtime.subscribe) Realtime.subscribe('admin');
  if($("#bank_names").length > 0) initBankName();
  if($("#reuters_status").length > 0) showRiskBasedOnStatus();
  $('.track-container').bind('ajax:success', function(e, data, status, xhr) {
    var clickedContainers = $(this).data('id');
    clickedContainers.forEach(function(container) {
      var tableContainer = $('#container-tracking-results-table-' + container + ' tbody');
      tableContainer.html(data);
    });
  });
});

$(document).on('click', '#exporter-applications-table input[type=search]', function(){
  $('#exporter-applications-table tr').removeClass('hidden');
});

$(document).on('click', "a.remove-row", function(){
  $($(this).data('row')).remove();
  return false;
});

$(document).on('change', '#commercial_cibil_state, #commercial_cibil_personal_state', function() {
  fetchCitiesBasedOnStateForCommercialCibil($(this));
});

$(document).on('click', '#commercial_cibil_button', function(e) {
  e.preventDefault();
  generateCommercialCibilUUID();
  $('#fetch_commercial_cibil').submit();
});

$(document).on('click', '.reuters_select_all', function(e) {
  e.preventDefault();
  if ( $('.reuters_select_all').text() === 'Select All' ) {
    $('.reuters_select_all').html('Deselect All');
    $('.reuters_checkbox').prop('checked', true);
  } else {
    $('.reuters_select_all').html('Select All');
    $('.reuters_checkbox').prop('checked', false);
  }
});

$(document).on("change", "input#invoice-charges", function(){
  var settlement_init = $('input#invoice-settlement').data('initial');
  var charges_init = $('input#invoice-charges').data('initial');
  var total_fees_init = $('input#invoice-total-fees').data('initial');

  var charges = $('input#invoice-charges').val();
  if(settlement_init && charges_init && total_fees_init && charges){
    $('input#invoice-settlement').val(parseInt(charges_init) + parseInt(settlement_init) - parseInt(charges));
    $('input#invoice-total-fees').val(parseInt(total_fees_init) - parseInt(charges_init) + parseInt(charges));
  }
});

$(document).on('hidden.bs.modal', '.modal', function (e) {
  $(this).find('form').trigger('reset');
});

$(document).on('keypress', 'body', function(e){
  if(e.target == document.body){
    // console.log(e);
    if(parseInt(e.key)){
      $($('.nav-tabs>li>a')[parseInt(e.key) - 1]).trigger('click')
    }
  }
});

$(document).on('mouseover', '.notification', function (e) {
  $(this).find('button.close').trigger('click');
});

$(document).on("keyup", ".estimated-irr-calc input", function(){
  var advance_rate = $('.estimated-irr-calc input#task_data_list_plan_attributes_advance_rate').val(),
      interest_rate = $('.estimated-irr-calc input#task_data_list_plan_attributes_interest_rate').val(),
      factor_fee = $('.estimated-irr-calc input#task_data_list_plan_attributes_flat_discounting_fee').val(),
      setup_fee = $('.estimated-irr-calc input#task_data_list_setup_fee').val(),
      value = $('.estimated-irr-calc input#task_data_list_facility_size').val(),
      duration = $('.estimated-irr-calc input#task_data_list_plan_attributes_payment_days').val();

  console.log(advance_rate, interest_rate, factor_fee, value, duration);

  try {
    var balance = Math.round(parseFloat(advance_rate) * parseFloat(value) / 100);
    var total_fees = Math.round(parseFloat(factor_fee) * parseFloat(value) / 100) +
                     Math.round(balance * ((Math.pow(1 + (parseFloat(interest_rate) + parseFloat(setup_fee)) / 36000, duration) - 1)));
    var ir = total_fees / balance;
    // var irr = Math.pow(1 + ir, 365/duration) - 1;
    var irr = parseFloat(interest_rate) + parseFloat(setup_fee) + parseFloat(factor_fee * 36000/(duration * advance_rate));
    var est_irr = irr;
    console.log(balance, total_fees, ir, irr, est_irr);
    $('.estimated-irr-calc .form-control-static').text(est_irr.toFixed(2) + '%')
  }
  catch(e) { console.log(e); }
});


$(document).on("click", "#fetch-deth-balance", function(){
  var account = $(this).data('account');

  $.ajax({
    type: "GET",
    url: "/dashboard/drip_coin/accounts/" + account + "/balance",
  })
  .done(function(data){
    console.log(data);
    var results = $('#deth-balance');
    results.html(data['balance']);
  });
})

function myFunction() {
    var input, filter, ul, li, a, i;
    input = document.getElementById("user_search");
    filter = input.value.toUpperCase();
    ul = document.getElementById("filter_ul");
    li = ul.getElementsByTagName("li");
    for (i = 3; i < li.length; i++) {
        a = li[i].getElementsByTagName("a")[0];
        if (a.innerHTML.toUpperCase().indexOf(filter) > -1) {
            li[i].style.display = "";
        } else {
            li[i].style.display = "none";

        }
    }
}

// "chart-1", {"data":[["Website visits",15654],["Downloads",4064],["Requested price list",1987],["Invoice sent",976],["Finalized",846]]}, {}
function FunnelChart (container, data, options) {
  // Chart.apply(this, arguments);
  Highcharts.chart(container, {
      chart: {
          type: 'funnel'
      },
      title: {
          text: 'Sales funnel'
      },
      plotOptions: {
          series: {
              dataLabels: {
                  enabled: true,
                  format: '<b>{point.name}</b> ({point.y:,.0f})',
                  color: (Highcharts.theme && Highcharts.theme.contrastTextColor) || 'black',
                  softConnector: true
              },
              center: ['50%', '50%'],
              neckWidth: '30%',
              neckHeight: '45%',
              width: '45%'
          }
      },
      legend: {
          enabled: false
      },
      series: [{name: 'Conversion Funnel', data: data}]
  });
}

Chartkick.FunnelChart = FunnelChart;

function showRiskBasedOnStatus () {
  var statusValue = $('#reuters_status').val().toLowerCase();
  if ($('#reuters_status').data('options') === undefined) {
    $('#reuters_status').data('options', $('#reuters_risk option').clone());
  }
  var options = $('#reuters_status').data('options').filter('.' + statusValue);
  $('#reuters_risk').html(options);
}

function fetchCitiesBasedOnStateForCommercialCibil (element) {
  var stateValue = element.val();
  var url = '/admin/commercial_cibils/fetch_cities?stateCode=' + stateValue;
  var xmlHttp = new XMLHttpRequest();
  xmlHttp.onreadystatechange = function() {
    if (xmlHttp.readyState == 4 && xmlHttp.status == 200) {
      cities = JSON.parse(xmlHttp.responseText);
      var innerHtml = '';
      for(var i = 0; i < cities.length; i++) {
        innerHtml += '<option value="' + cities[i] + '">' + cities[i] + '</option>';
      }
      if (element.attr('id') === 'commercial_cibil_personal_state')
        $('#commercial_cibil_personal_city').html(innerHtml);
      else
        $('#commercial_cibil_city').html(innerHtml);
    }
  }
  xmlHttp.open('GET', url, true);
  xmlHttp.send(null);
}

function generateCommercialCibilUUID() {
	var d = new Date().getTime();
	var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
		var r = (d + Math.random() * 16) % 16 | 0;
		d = Math.floor(d / 16);
		return (c === 'x' ? r : (r & 0x3 | 0x8)).toString(16);
	});
	$('#commercial_cibil_guid').val(uuid);
}
