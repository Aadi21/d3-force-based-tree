window.onload = function () {
  draw();
}


var draw = function () {

  var width = 550,
      height = 500,
      rectHeight = 15,
      rectWidth = 50,
      textLength = 8, //text length to show in Rectange Label
      root, //Root of tree
      stack = []; //Stack to hold current list of Nodes acting as tree root


  var force = d3.layout.force()
                .size([width, height])
                .on("tick", tick);


  var svg =   d3.select("#graph").append("svg")
              .attr("width", width)
              .attr("height", height);

  var link = svg.selectAll(".link"),
      node = svg.selectAll(".node"),
      texts = svg.selectAll(".text");

  //Use this to Load data via server/URL
  // d3.json("url/of/json", function(json) {
  //     root = json;
  //     update();
  // });

  //Local Test Data
  /* JSON Tree
  * Node Strucuure:
  * name     : Label shown on Rect Node
  * id       : Unique node ID within tree
  * children : "visible" child node with same recursive structure
  * _children: "hidden" child node with same recursive structure
  *             Anyone of _children or children should exist in any node.
  */
  var root = {
    "name":"Student",
    "id":"20",
    "_children":[
    {
      "name":"Chemistry",
      id:"201",
      "_children":[
      {
        "name":"kides",
        "id":"20110",
        "size":450,
        "_children":[
        {
          "name":"video",
          "id":"20110101"
        },
        {
          "name":"Legend..",
          "id":"20110102",
          "_children":[
            {"name": "..ary", "id": "201101021"}
          ]
        },
        {
          "name":"Drawing",
          "id":"20110103"
        },
        {
          "name":"Sonds",
          "id":"20110104"
        }
        ]
      },
      {
        "name":"Forum",
        "id":"20130",
        "size":580,
        "_children":[
        {
          "name":"Question",
          "id":"20120301"
        },
        {
          "name":"Answere",
          "id":"20120302"
        },
        {
          "name":"Professor",
          "id":"20120303"
        }
        ]
      }
      ]
    },
    {"name": "NoChild",
     "id": "200"},
    {
      "name":"Physics",
      id:"202",
      "_children":[
      {
        "name":"kides",
        "id":"20210",
        "size":450,
        "_children":[
        {
          "name":"video",
          "id":"20210101"
        },
        {
          "name":"Drawing",
          "id":"20210102"
        },
        {
          "name":"Sonds",
          "id":"20210103"
        }
        ]
      },
      {
        "name":"Forum",
        "id":"20230",
        "size":580,
        "_children":[
        {
          "name":"Question",
          "id":"20230301"
        },
        {
          "name":"Answere",
          "id":"20230302"
        },
        {
          "name":"Professor",
          "id":"20230303"
        }
        ]
      }
      ]
    },
    {
      "name":"Botany",
      id:"203",
      "_children":[
      {
        "name":"kides",
        "id":"20310",
        "size":450,
        "_children":[
        {
          "name":"video",
          "id":"20310101"
        },
        {
          "name":"Drawing",
          "id":"20310102"
        },
        {
          "name":"Sonds",
          "id":"20310103"
        }
        ]
      },
      {
        "name":"Forum",
        "id":"20330",
        "size":580,
        "_children":[
        {
          "name":"Question",
          "id":"20330301"
        },
        {
          "name":"Answere",
          "id":"20330302"
        },
        {
          "name":"Professor",
          "id":"20330303"
        }
        ]
      }
      ]
    },
    {
      "name":"Zoology",
      id:"204",
      "_children":[
      {
        "name":"kides",
        "id":"20410",
        "size":450,
        "_children":[
        {
          "name":"video",
          "id":"20410101"
        },
        {
          "name":"Drawing",
          "id":"20410102"
        },
        {
          "name":"Sonds",
          "id":"20410103"
        }
        ]
      },
      {
        "name":"Forum",
        "id":"20430",
        "size":580,
        "_children":[
        {
          "name":"Question",
          "id":"20430301"
        },
        {
          "name":"Answere",
          "id":"20430302"
        },
        {
          "name":"Professor",
          "id":"20430303"
        }
        ]
      }
      ]
    },
    {
      "name":"Mechanical",
      id:"205",
      "_children":[
      {
        "name":"kides",
        "id":"20510",
        "size":450,
        "_children":[
        {
          "name":"video",
          "id":"20510101"
        },
        {
          "name":"Drawing",
          "id":"20510102"
        },
        {
          "name":"Sonds",
          "id":"20510103"
        }
        ]
      },
      {
        "name":"Forum",
        "id":"20530",
        "size":580,
        "_children":[
        {
          "name":"Question",
          "id":"20530301"
        },
        {
          "name":"Answere",
          "id":"20530302"
        },
        {
          "name":"Professor",
          "id":"20530303"
        }
        ]
      }
      ]
    },
    {
      "name":"Art",
      id:"206",
      "_children":[
      {
        "name":"kides",
        "id":"20610",
        "size":450,
        "_children":[
        {
          "name":"video",
          "id":"20610101"
        },
        {
          "name":"Drawing",
          "id":"20610102"
        },
        {
          "name":"Sonds",
          "id":"20610103"
        }
        ]
      },
      {
        "name":"Forum",
        "id":"30",
        "size":580,
        "_children":[
        {
          "name":"Question",
          "id":"301"
        },
        {
          "name":"Answere",
          "id":"302"
        },
        {
          "name":"Professor",
          "id":"303"
        }
        ]
      }
      ]
    }
    ]
  };

    update();

    // Color leaf nodes orange, and packages white or blue.
    function color(d) {
      return d._children ? "#3182bd" : d.children ? "#c6dbef" : "#fd8d3c";
    }

    //redraw chart
    function update() {
      var nodes = flatten(root),
      links = d3.layout.tree().links(nodes);

      // Restart the force layout.
      force
        .nodes(nodes)
        .links(links)
        .size([width,height])
        .linkDistance([100])
        .charge([-500])
        .gravity(0.3)
        .start();


      // Update the links…
      link = link.data(links, function(d) { return d.target.id; });

      // Exit any old links.
      link.exit()
          .transition().duration(300)
          .attr('opacity', 0.2)
          .remove();

      // Enter any new links.
      link.enter().insert("line", ".node")
        .attr("class", "link")
        .attr("x1", function(d) { return d.source.x + rectWidth/2; })
        .attr("y1", function(d) { return d.source.y; })
        .attr("x2", function(d) { return d.target.x + rectWidth/2; })
        .attr("y2", function(d) { return d.target.y; });

      // Update the nodes…
      node = node.data(nodes, function(d) { return d.id; }).style("fill", color);

      // Exit any old nodes.
      node.exit()
          .transition().duration(300)
          .attr('opacity', 0.2)
          .remove();

      // Enter any new nodes.
      node.enter()
              .append("rect")
              .attr("class", "node")
              .attr("x", function(d) { return d.x; })
              .attr("y", function(d) { return d.y; })
              .attr("height", rectHeight)
              .attr("width", rectWidth)
              .attr("opacity", 1)
              //.attr("r", function(d) { if(d.size) {return Math.sqrt(d.size) / 10 || 4.5; } else {return 5;}  })
              .style("fill", color)
              .on("click", click)
              .call(force.drag);

      // Draw the node labels first
      texts = svg.selectAll("text")
              .data(nodes, function(d) { return d.id; });

      // Remove old text
      texts.exit()
          .transition().duration(300)
          .attr('opacity', 0.2)
          .remove();

      // Enter any new texts.
      texts.enter()
          .append("text")
          .attr("fill", "black")
          .style("cursor", "pointer")
          .attr("font-family", "sans-serif")
          .attr("font-size", "10px")
          .text(function(d) { return d.name.length > textLength ? d.name.substring(0, textLength-1) + "..." : d.name; })
          .on("click", click);

    };

    function tick() {
      link.attr("x1", function(d) { return d.source.x + rectWidth/2; })
            .attr("y1", function(d) {return d.source.y; })
            .attr("x2", function(d) { return d.target.x + rectWidth/2; })
            .attr("y2", function(d) { return d.target.y; });

      node.attr("x", function(d) { return d.x; })
          .attr("y", function(d) { return d.y; });

      texts.attr("transform", function(d) {
            return "translate(" + (d.x+5) + "," + (d.y+11) + ")";
          });
    }

    // Toggle children on click.
    function click(d) {


      if (!d3.event.defaultPrevented) {

        if (d.children) {
          // Children Shown, hide them
          d._children = d.children;
          d.children = null;
          //throw current node from Stack, except for if its the top one [in dustbin]
          if(stack.length > 1) stack.pop();
          //Use previous node as root of tree
          root = stack[stack.length-1];
        } else if(d._children) {
          //has hidden children, but no children shown
          d.children = d._children;
          d._children = null;
          //Make clicked Node as Tree Node
          root = d ;
          //Store node in stack to show it later
          stack.push(d);

        }

        update();
      }
    }

    // Returns a list of all nodes under the root as simple array.
    function flatten(root) {
      var nodes = [], i = 0;

      function recurse(node) {
        if (node.children) node.children.forEach(recurse);
        //In case,there is no 'id' on data
        if (!node.id) node.id = ++i;

        nodes.push(node);
      }

      recurse(root);
      return nodes;
    }
};
