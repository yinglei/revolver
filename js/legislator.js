var legislator_pane = {};

legislator_pane.fillSenatorInfo = function( legislator) {
  var tmp= { "name" : legislator["name"]["official_full"],
             "party" : legislator["terms"][ legislator["terms"].length - 1 ]["party"],
             "state" : legislator["terms"][ legislator["terms"].length - 1 ]["state"] 
  };
  $( '#legislatorinfo' ).render( tmp );
}

legislator_pane.fillContributorInfo = function(contributor) {
  var tmp= { "name" : contributor.name,
             "party" : "Contributor",
             "state" : "State"
  };
  $( '#legislatorinfo' ).render( tmp );
}
