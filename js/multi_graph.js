
var multi_graph = {};

multi_graph.load = function() {

  $('#graph').empty();

  load_count = 3;

  d3.json("legislators.json", function(json) {
    multi_graph.legislators = json;
    multi_graph.legislator_map = {};
    multi_graph.legislators.forEach(function(legislator) {
      multi_graph.legislator_map[legislator.id.bioguide] = legislator;
    });
    load_count--;
    if (load_count == 0) {
      multi_graph.loadGraph();
    }
  });

  d3.json("contributors.json", function(json) {
    multi_graph.contributors = json;
    load_count--;
    if (load_count == 0) {
      multi_graph.loadGraph();
    }
  });

  d3.json("contributions.json", function(json) {
    multi_graph.contributions = json;
    load_count--;
    if (load_count == 0) {
      multi_graph.loadGraph();
    }
  });
};

multi_graph.type = "all";
multi_graph.party = "all";
multi_graph.gender = "all";

multi_graph.loadGraph = function() {
  var nodes = [];
  var node_map = {};

  multi_graph.legislators.forEach(function(legislator) {
    var type = legislator.terms[legislator.terms.length-1].type;
    if (multi_graph.type != "all" &&
        multi_graph.type != type)
      return;

    var party = legislator.terms[legislator.terms.length-1].party;
    if (multi_graph.party != "all" &&
        multi_graph.party != party)
      return;

    var gender = legislator.bio.gender;
    if (multi_graph.gender != "all" &&
        multi_graph.gender != gender)
      return;

    var node = {"type": "leg", "id": legislator.id.bioguide};
    nodes.push(node);
    node_map[node.id] = node;
  });

  multi_graph.contributors.forEach(function (contributor, i) {
    var name = contributor;
    contributor.total_contributions = 0;
    contributor.name = name;

    var node = {"type": "contrib", "id": i};
    nodes.push(node);
    node_map[contributor] = node;
  });

  var links = [];
  multi_graph.contributions.forEach(function (recipient) {
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
        multi_graph.contributors[contrib_index.id].total_contributions += amount;
      var legislator = multi_graph.legislator_map[recipient.id];
      legislator.total_contributions = total_contributions;

      if (link.source && link.target && link.weight)
        links.push(link);
    }
  });

  var w = 1024,
      h = 800,
      fill = d3.scale.category10();

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
          var legislator = multi_graph.legislator_map[node_map[node.id].id];
          legislator_pane.fillSenatorInfo(legislator);
        } else {
          var contributor = multi_graph.contributors[node.id];
          legislator_pane.fillContributorInfo(contributor);
        }
      })
      .call(force.drag);

    node
      .append("text")
      .text(function(node) { 
        if (node.type == "leg") {
          var legislator = multi_graph.legislator_map[node_map[node.id].id];
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
