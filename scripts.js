$('.editable').on('click', function() {
  $('.editable').removeClass('active');
  $(this).addClass('active');
  $(this).find('input').select();
});

$('.editable input').on('blur', function() {
  $(this).closest('.editable').removeClass('active');
});

$('.editable input').on('focus', function() {
  $(this).closest('.editable').addClass('active');
});




var calculateWaterfall = function(waterfall, percentage) {
  return Math.floor( (waterfall / percentage) * 100 );
};



var formatNumber = function(number) {
  return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};



var calculateCost = function(waterfallNumber) {
  var budget = $('#budget input').val();
  return Number(budget) / Number(waterfallNumber);
};



var updateCost = function(conversionsWaterfall, opportunityWaterfall, sqlWaterfall, salWaterfall, mqlWaterfall, totalLeadsWaterfall, totalClicksWaterfall, totalImpressionsWaterfall) {

  // Conversions
  if ( conversionsWaterfall ) {
    var conversionCost = calculateCost(conversionsWaterfall);
    $('#conversion-cost').html( '$' + formatNumber( Math.floor(conversionCost * 100) / 100 ) );
  } else {
    $('#conversion-cost').html('-');
    $('#conversion-waterfall').html('-');
  }
  

  // Opportunity
  if ( opportunityWaterfall ) {
    var opportunityCost = calculateCost(opportunityWaterfall);
    $('#opportunity-cost').html( '$' + formatNumber( Math.floor(opportunityCost * 100) / 100 ) );
  } else {
    $('#opportunity-cost').html('-');
    $('#opportunity-waterfall').html('-');
  }
  

  // SQL
  if ( sqlWaterfall ) {
    var sqlCost = calculateCost(sqlWaterfall);
    $('#sql-cost').html( '$' + formatNumber( Math.floor(sqlCost * 100) / 100 ) );
  } else {
    $('#sql-cost').html('-');
    $('#sql-waterfall').html('-');
  }
  

  // SAL
  if ( salWaterfall ) {
    var salCost = calculateCost(salWaterfall);
    $('#sal-cost').html( '$' + formatNumber( Math.floor(salCost * 100) / 100 ) );
  } else {
    $('#sal-cost').html('-');
    $('#sal-waterfall').html('-');
  }
  

  // MQL
  if ( mqlWaterfall ) {
    var mqlCost = calculateCost(mqlWaterfall);
    $('#mql-cost').html( '$' + formatNumber( Math.floor(mqlCost * 100) / 100 ) );
  } else {
    $('#mql-cost').html('-');
    $('#mql-waterfall').html('-');
  }
  

  // Total Leads
  if ( totalLeadsWaterfall ) {
    var totalLeadsCost = calculateCost(totalLeadsWaterfall);
    $('#total-leads-cost').html( '$' + formatNumber( Math.floor(totalLeadsCost * 100) / 100 ) );
  } else {
    $('#total-leads-cost').html('-');
    $('#total-leads-waterfall').html('-');
  }
  

  // Total Clicks
  if ( totalClicksWaterfall ) {
    var totalClicksCost = calculateCost(totalClicksWaterfall);
    $('#total-clicks-cost').html( '$' + formatNumber( Math.floor(totalClicksCost * 100) / 100 ) );
  } else {
    $('#total-clicks-cost').html('-');
    $('#total-clicks-waterfall').html('-');
  }
  

  // Total Impressions
  if ( totalImpressionsWaterfall ) {
    var totalImpressionsCost = calculateCost(totalImpressionsWaterfall / 1000);
    $('#total-impressions-cost').html( '$' + formatNumber( Math.floor(totalImpressionsCost * 100) / 100 ) + '<br/>(per 1000)' );
  } else {
    $('#total-impressions-cost').html('-');
    $('#total-impressions-waterfall').html('-');
  }
  
};



var calculateLeadsOrConversions = 'conversions';
var updateWaterfall = function() {

  if ( calculateLeadsOrConversions == 'conversions' ) {
    var conversionsWaterfall = $('#conversions-waterfall').val().replace(/\D/g, '');
    var conversionPercentage = $('#conversion-percentage').val();
    var opportunityPercentage = $('#opportunity-percentage').val();
    var sqlPercentage = $('#sql-percentage').val();
    var salPercentage = $('#sal-percentage').val();
    var mqlPercentage = $('#mql-percentage').val();
    var totalLeadsPercentage = $('#total-leads-percentage').val();
    var totalClicksPercentage = $('#total-clicks-percentage').val();

    // Opportunity
    var opportunityWaterfall = calculateWaterfall( conversionsWaterfall, conversionPercentage);
    $('#opportunity-waterfall').html( formatNumber(opportunityWaterfall) );

    // SQL
    var sqlWaterfall = calculateWaterfall( opportunityWaterfall, opportunityPercentage);
    $('#sql-waterfall').html( formatNumber(sqlWaterfall) );

    // SAL
    var salWaterfall = calculateWaterfall( sqlWaterfall, sqlPercentage);
    $('#sal-waterfall').html( formatNumber(salWaterfall) );

    // MQL
    var mqlWaterfall = calculateWaterfall( salWaterfall, salPercentage);
    $('#mql-waterfall').html( formatNumber(mqlWaterfall) );

    // Total Leads
    var totalLeadsWaterfall = calculateWaterfall( mqlWaterfall, mqlPercentage);
    $('#total-leads-waterfall').val( formatNumber(totalLeadsWaterfall) );

    // Total Clicks
    var totalClicksWaterfall = calculateWaterfall( totalLeadsWaterfall, totalLeadsPercentage);
    $('#total-clicks-waterfall').html( formatNumber(totalClicksWaterfall) );

    // Total Impressions
    var totalImpressionsWaterfall = calculateWaterfall( totalClicksWaterfall, totalClicksPercentage);
    $('#total-impressions-waterfall').html( formatNumber(totalImpressionsWaterfall) );


    updateCost(
      conversionsWaterfall,
      opportunityWaterfall,
      sqlWaterfall,
      salWaterfall,
      mqlWaterfall,
      totalLeadsWaterfall,
      totalClicksWaterfall,
      totalImpressionsWaterfall
    );

    $('#conversions-waterfall').val( String( formatNumber(conversionsWaterfall) ) );

  } else if ( calculateLeadsOrConversions == 'leads' ) {
    var totalLeadsPercentage = $('#total-leads-percentage').val();
    var totalClicksPercentage = $('#total-clicks-percentage').val();

    // Total Leads
    var totalLeadsWaterfall = $('#total-leads-waterfall').val();

    // Total Clicks
    var totalClicksWaterfall = calculateWaterfall( totalLeadsWaterfall, totalLeadsPercentage);
    $('#total-clicks-waterfall').html( formatNumber(totalClicksWaterfall) );

    // Total Impressions
    var totalImpressionsWaterfall = calculateWaterfall( totalClicksWaterfall, totalClicksPercentage);
    $('#total-impressions-waterfall').html( formatNumber(totalImpressionsWaterfall) );

    $('#conversions-waterfall').val('-')

    updateCost(
      false,
      false,
      false,
      false,
      false,
      totalLeadsWaterfall,
      totalClicksWaterfall,
      totalImpressionsWaterfall
    );
  }
};




$(window).on('load keyup', function(event) {
  if ( event.target.id == 'total-leads-waterfall' ) {
    calculateLeadsOrConversions = 'leads';
  } else if ( event.target.id == 'conversions-waterfall' ) {
    calculateLeadsOrConversions = 'conversions';
  }

  updateWaterfall();
});



// var formatNumber = function(number, format = false) {
//   if ( format == 'currency' ) {
//     return String( new Intl.NumberFormat('en-US').format(number) );
//   } else {
//     return String( new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(number) );
//   }
// };