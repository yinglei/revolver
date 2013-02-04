var legislator_pane = {};

legislator_pane.fillSenatorInfo = function( legislator) {

  var tmp = {
    "name": legislator.name.official_full,
    "branch": legislator.terms[legislator["terms"].length - 1].type || "n/a",
    "state": legislator.terms[legislator["terms"].length - 1].state || "n/a",
    "party": legislator.terms[legislator["terms"].length - 1].party || "n/a",
    "born": legislator.bio.birthday || "n/a",
    "gender": legislator.bio.gender || "n/a",
    "religion": legislator.bio.religion || "n/a",
    "total_contributions": legislator.total_contributions || 0
  };

  if (!tmp.name) return;
  if (tmp.branch == "sen") tmp.branch = "Senate";
  if (tmp.branch == "rep") tmp.branch = "House";
  tmp.total_contributions = "$" + tmp.total_contributions;

  $('#contributorinfo').hide();
  $('#legislatorinfo').show();
  $('#legislatorinfo').render(tmp);

}

legislator_pane.fillContributorInfo = function(contributor) {

  return;  // Not yet implemented; `contributor` needs to be Object, not String!

  var tmp = {
    "name": contributor.name,
    "total_contributions": contributor.total_contributions
  };

  $('#legislatorinfo').hide();
  $('#contributorinfo').show();
  $('#contributorinfo').render(tmp);

}
