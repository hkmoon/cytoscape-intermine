var ui = function (graph) {
  this.graph = graph;
  var display = function(node) {
    targetElem = document.getElementById('nodeDetails'),
    setTitle(node);
    listProperties(node);
  },
  setTitle = function (node) {
    var title = targetElem.querySelector('.nodeTitle');
    title.innerHTML = node.label;
  },
  listProperties = function(node) {
    //todo: make this more sane. bold tags and inline html, not so brainy
    var display = expandPropertyVals(node);
    targetElem.querySelector('.nodeInfo').innerHTML = display;
  },
  addProperty = function(prop, key) {
    return '<dt> ' + key + '</dt><dd>' + prop[key] + "</dd>";
  },
  expandPropertyVals = function(obj) {
    var display = "";
    for (var prop in obj) {
      if(typeof obj[prop] === "object") {
        display = "<dt>" + prop + "</dt><dd class='child'><dl>" + expandPropertyVals(obj[prop]) + "</dl></dd>" + display;
      } else{
        display = addProperty(obj, prop) + display;
      }
    }
    return display;
  },
  init = function() {
    cy = cytoscape({
      container: graph.targetElem,
      layout: { name: 'cose'},
      style: cytoscape.stylesheet()
  .selector('node')
    .css({
      'content': 'data(label)'
    })
  .selector(':selected')
    .css({
      'background-color': 'black',
      'line-color': 'black',
      'target-arrow-color': 'black',
      'source-arrow-color': 'black',
      'text-outline-color': 'black'
    }),
      elements: graph.data,
      ready: function(){
        window.cy = this;
        graph.statusBar.remove();
      }
    });

    cy.on('tap', 'node', function(){
      display(this.data());
    });

  },
  noResults = function (message) {
  //  console.log("Test",graph.statusBar, graph, message);
    graph.statusBar.className = "status no-results";
    graph.statusBar.innerHTML = message;
  }

  return {
    init:init,
    noResults:noResults
  }

};

module.exports = ui;
