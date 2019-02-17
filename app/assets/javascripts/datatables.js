/**
 * Automatically detect numbers which use a comma in the place of a decimal
 * point to allow them to be sorted numerically.
 *
 * Please note that the 'Formatted numbers' type detection and sorting plug-ins
 * offer greater flexibility that this plug-in and should be used in preference
 * to this method.
 *
 *  @name Commas for decimal place
 *  @summary Detect numeric data which uses a comma as the decimal place.
 *  @deprecated
 *  @author [Allan Jardine](http://sprymedia.co.uk)
 */

jQuery.fn.dataTableExt.aTypes.unshift(
  function ( sData )
  {
    var sValidChars = "0123456789,.";
    var Char;
    var bDecimal = false;
    var iStart=0;

    /* Negative sign is valid - shift the number check start point */
    if ( sData.charAt(0) === '-' ) {
      iStart = 1;
    }

    /* Check the numeric part */
    for ( var i=iStart ; i<sData.length ; i++ )
    {
      Char = sData.charAt(i);
      if (sValidChars.indexOf(Char) == -1)
      {
        return null;
      }
    }

    return 'numeric-comma';
  }
);

/**
 * It is not uncommon for non-English speaking countries to use a comma for a
 * decimal place. This sorting plug-in shows how that can be taken account of in
 * sorting by adding the type `numeric-comma` to DataTables. A type detection
 * plug-in for this sorting method is provided below.
 *
 * Please note that the 'Formatted numbers' type detection and sorting plug-ins
 * offer greater flexibility that this plug-in and should be used in preference
 * to this method.
 *
 *  @name Commas for decimal place
 *  @summary Sort numbers correctly which use a comma as the decimal place.
 *  @deprecated
 *  @author [Allan Jardine](http://sprymedia.co.uk)
 *
 *  @example
 *    $('#example').dataTable( {
 *       columnDefs: [
 *         { type: 'numeric-comma', targets: 0 }
 *       ]
 *    } );
 */

jQuery.extend( jQuery.fn.dataTableExt.oSort, {
  "numeric-comma-pre": function ( a ) {
    var x = (a == "-") ? 0 : a.replace( /,/, "." );
    return parseFloat( x );
  },

  "numeric-comma-asc": function ( a, b ) {
    return ((a < b) ? -1 : ((a > b) ? 1 : 0));
  },

  "numeric-comma-desc": function ( a, b ) {
    return ((a < b) ? 1 : ((a > b) ? -1 : 0));
  }
} );
