
var side_panel = {};

side_panel.load = function() {
  var leg_id = "K000367";
  d3.json("legislators_"+leg_id+".json", side_panel.init);
};

side_panel.init = function(legislator_json) {

  // Print the history graph.
  var dateFormat = d3.time.format("%Y-%M-%e");
  legislator_json.terms.forEach(function(term) {
    term.start = dateFormat.parse(term.start);
    term.end = dateFormat.parse(term.end);
  });
  var startDate = d3.min(legislator_json.terms, function(d) { return d.start; });
  var endDate = d3.max(legislator_json.terms, function(d) { return d.end; });
  var years = endDate.getFullYear() - startDate.getFullYear();
  console.log(years);

  console.log(legislator_json.terms)
  var history_svg = d3.select("#history")
    .append("svg")
    .append("g");

  var history = history_svg
    .selectAll("rect")
    .data(legislator_json.terms)
    .enter()
    .append("rect")
    .attr("height", 20)
    .attr("width", function(d) { 
       return Math.round(200 * (d.end.getFullYear() - d.start.getFullYear()) / years)-2;
    })
    .attr("class", function(d) { return d.type; })
    .attr("x", function(d) { 
      return Math.round(200 * (d.start.getFullYear() - startDate.getFullYear()) / years);
    });
  var timeline = history_svg
    .selectAll("g.tick")
    .data(legislator_json.terms)
    .enter()
    .append("g")
    .attr("class", "tick")
    .append("text")
    .attr("transform", "rotate(-65)")
    .attr("x", function(d) { 
      return Math.round(200 * (d.start.getFullYear() - startDate.getFullYear()) / years);
    })
    .attr("y", 35)
    .style("text-anchor", "end")
    .text(function(d) { return d.start.getFullYear();});
};
