var sidebar = {};

var BRANCHES = {
  sen: "Senate",
  rep: "House"
};

var STATES = {
  AL: "Alabama",
  AK: "Alaska",
  AZ: "Arizona",
  AR: "Arkansas",
  CA: "California",
  CO: "Colorado",
  CT: "Connecticut",
  DE: "Delaware",
  DC: "District of Columbia",
  FL: "Florida",
  GA: "Georgia",
  HI: "Hawaii",
  ID: "Idaho",
  IL: "Illinois",
  IN: "Indiana",
  IA: "Iowa",
  KS: "Kansas",
  KY: "Kentucky",
  LA: "Louisiana",
  ME: "Maine",
  MD: "Maryland",
  MA: "Massachusetts",
  MI: "Michigan",
  MN: "Minnesota",
  MS: "Mississippi",
  MO: "Missouri",
  MT: "Montana",
  NE: "Nebraska",
  NV: "Nevada",
  NH: "New Hampshire",
  NJ: "New Jersey",
  NM: "New Mexico",
  NY: "New York",
  NC: "North Carolina",
  ND: "North Dakota",
  OH: "Ohio",
  OK: "Oklahoma",
  OR: "Oregon",
  PA: "Pennsylvania",
  RI: "Rhode Island",
  SC: "South Carolina",
  SD: "South Dakota",
  TN: "Tennessee",
  TX: "Texas",
  UT: "Utah",
  VT: "Vermont",
  VA: "Virginia",
  WA: "Washington",
  WV: "West Virginia",
  WI: "Wisconsin",
  WY: "Wyoming"
};

GENDERS = {
  M: "Male",
  F: "Female"
};

sidebar.fillSenatorInfo = function(legislator) {

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
  if (tmp.branch in BRANCHES) tmp.branch = BRANCHES[tmp.branch];
  if (tmp.state in STATES) tmp.state = STATES[tmp.state];
  if (tmp.gender in GENDERS) tmp.gender = GENDERS[tmp.gender];
  tmp.total_contributions = "$" + tmp.total_contributions;

  $('#contributorinfo').hide();
  $('#legislatorinfo').show();
  $('#legislatorinfo').render(tmp);

}

sidebar.fillContributorInfo = function(contributor) {

  return;  // Not yet implemented; `contributor` needs to be Object, not String!

  var tmp = {
    "name": contributor.name,
    "total_contributions": contributor.total_contributions
  };

  $('#legislatorinfo').hide();
  $('#contributorinfo').show();
  $('#contributorinfo').render(tmp);

}
