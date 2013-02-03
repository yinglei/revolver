var legislator_pane = {};

legislator_pane.fillSenatorInfo = function( legislator) {
  var tmp= { "name" : legislator["name"]["official_full"],
             "party" : legislator["terms"][ legislator["terms"].length - 1 ]["party"],
             "state" : legislator["terms"][ legislator["terms"].length - 1 ]["state"] 
  };
  $( '#legislatorinfo' ).render( tmp );
}
