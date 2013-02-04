
var multigraph = {};

multigraph.load = function() {

  $('#graph').empty();

  load_count = 3;

  d3.json("data/legislators.json", function(json) {
    multigraph.legislators = json;
    multigraph.legislator_map = {};
    multigraph.legislators.forEach(function(legislator) {
      legislator.committees = [];
      multigraph.legislator_map[legislator.id.bioguide] = legislator;
    });
    if (--load_count == 0) multigraph.loadGraph();
  });

  d3.json("data/contributors.json", function(json) {
    multigraph.contributors = json.map(function(entry) {
      return {
        "name": entry,
        "total_contributions": 0
      };
    });
    if (--load_count == 0) multigraph.loadGraph();
  });

  d3.json("data/contributions.json", function(json) {
    multigraph.contributions = json;
    if (--load_count == 0) multigraph.loadGraph();
  });

  /* TODO
  d3.json("data/committees.json", function(json) {
    multigraph.committees = json;
    if (--load_count == 0) multigraph.loadGraph();
  });
  */

};

multigraph.type = "all";
multigraph.party = "all";
multigraph.gender = "all";

multigraph.loadGraph = function() {
  var nodes = [];
  var node_map = {};

  /* TODO
  multigraph.committees.forEach(function (committee_key) {
    var committee = multigraph.committees[committee_key];
    committee.forEach(function(member) {
      multigraph.legislator_map[member.bioguide].committees.push(committee_key);
    });
  });
  */

  multigraph.legislators.forEach(function(legislator) {
    var type = legislator.terms[legislator.terms.length-1].type;
    if (multigraph.type != "all" &&
        multigraph.type != type)
      return;

    var party = legislator.terms[legislator.terms.length-1].party;
    if (multigraph.party != "all" &&
        multigraph.party != party)
      return;

    var gender = legislator.bio.gender;
    if (multigraph.gender != "all" &&
        multigraph.gender != gender)
      return;

    var node = {"type": "leg", "id": legislator.id.bioguide};
    nodes.push(node);
    node_map[node.id] = node;
  });


  multigraph.contributors.forEach(function (contributor, i) {
    var node = {"type": "contrib", "id": i};
    nodes.push(node);
    node_map[contributor.name] = node;
  });

  var links = [];
  multigraph.contributions.forEach(function (recipient) {
    var total_contributions = 0;
    for (var c = 0; c < recipient.contributions.length; ++c) {
      var contribution = recipient.contributions[c];
      var amount = parseFloat(contribution.Amount, 10);
      total_contributions += amount;
      var link = {
        "source": node_map[contribution.Contrib],
        "target": node_map[recipient.id],
        "weight": amount
      };
      var contrib_index = node_map[contribution.Contrib];
      if (contrib_index.id)
        multigraph.contributors[contrib_index.id].total_contributions += amount;
      var legislator = multigraph.legislator_map[recipient.id];
      legislator.total_contributions = total_contributions;

      if (link.source && link.target && link.weight)
        links.push(link);
    }
  });

  var fill = d3.scale.category10();
  var w = $("#graph").width();
  var h = $("#graph").height();

  d3.select("#graph").append("svg:svg").remove();

  var vis = d3.select("#graph").append("svg:svg")
    .attr("width", w)
    .attr("height", h);

  var force = d3.layout.force()
    .nodes(nodes)
    .links(links)
    .size([w, h])
    .charge(-1)
    .start();

  var node = vis.selectAll("circle.node")
    .data(nodes)
    .enter().append("svg:circle")
    .attr("class", "node")
    .attr("id", function(d) { return d.type +"-"+d.id; })
    .attr("cx", function(d) { return d.x; })
    .attr("cy", function(d) { return d.y; })
    .attr("r", 3)
    .style("fill", function(d, i) { return fill(d.type == "leg"); })
    .style("stroke", function(d, i) { return d3.rgb(fill(d.type == "leg")).darker(2); })
    .style("stroke-width", 1.5)
    .on("click", function(node) {
      if (node.type == "leg") {
        var legislator = multigraph.legislator_map[node_map[node.id].id];
        legislator_pane.fillSenatorInfo(legislator);
      } else {
        var contributor = multigraph.contributors[node.id];
        legislator_pane.fillContributorInfo(contributor);
      }
    })
    .call(force.drag);

  node
    .append("text")
    .text(function(node) { 
      if (node.type == "leg") {
        var legislator = multigraph.legislator_map[node_map[node.id].id];
        return legislator.name.official_full;
      } else {
        return node_map[node.id];
      }
    });

  vis.style("opacity", 1e-6)
    .transition()
    .duration(1000)
    .style("opacity", 1);

  force.on("tick", function(e) {
    var k = 9 * e.alpha;
    nodes.forEach(function(o, i) {
      o.y += o.type == "leg" ? k : -k;
    });

    node.attr("cx", function(d) { return d.x; })
        .attr("cy", function(d) { return d.y; });
  });
};
