/* bubbleChart creation function. Returns a function that will
 * instantiate a new bubble chart given a DOM element to display
 * it in and a dataset to visualize.
 */

var bubbles = null;
var myrawdata = null;
var context_data = null;
var texts = null;
var nodes = [];
var pos_dic = {}
var radiusScale = null;
let brushScaleAll = 10
let brushScaleBrush = 25
let brushScaleClick = 35
let brushScale = brushScaleAll
var rawDataNew = []
const colors = ['#5470c6', '#91cc75', '#fac858', '#ee6666', '#73c0de', '#3ba272', '#fc8452', '#9a60b4', '#ea7ccc']

const MyFilter = {'name': -1, 'label':-1}

function chartByLabel(label) {
    if (MyFilter['label'] === label) {
        MyFilter['label'] = -1
    } else {
        MyFilter['label'] = label
    }
    myBubbleChart('#vis', myrawdata);
}

function histChart(data = []) {

    var tooltip = floatingTooltip('gates_tooltip', 240);
    var margin = {top: 20, right: 0, bottom: 20, left: 0},
        width = 1200 - margin.left - margin.right,
        height = 150 - margin.top - margin.bottom;

    const brush = d3.brushX()
        .extent([[margin.left, margin.top], [width, height + 2*margin.bottom]])
        .on("end", brushended);

// append the svg object to the body of the page
    var svg_all = d3.select("#vis1")
        .append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom);
        // .call(brush)
    var svg = svg_all.append("g")
        .attr("transform",
            "translate(" + margin.left + "," + margin.top + ")");
    svg_all
        .append("g")
        .attr("class", "brush")
        .call(brush);

    // X axis: scale and draw:
    var x = d3.scaleTime()
        .domain([new Date("2020-10-06 08:00"), new Date("2020-10-09 8:00")])
        .range([0, width]);

    var xb = d3.scaleTime()
        .domain([0, width])
        .range([new Date("2020-10-06 08:00"), new Date("2020-10-09 8:00")]);


    function brushended() {
        brushScale=brushScaleBrush
        const selection = d3.event.selection;
        const start = xb(selection[0])
        const startDay = start.getDate()
        const startHour = start.getHours()

        const end = xb(selection[1])

        const endDay = end.getDate()
        const endHour = end.getHours()
        const time_index={"68": 0, "69": 1, "610": 2, "611": 3, "612": 4, "613": 5, "614": 6, "615": 7, "616": 8, "617": 9, "618": 10, "619": 11, "620": 12, "621": 13, "622": 14, "623": 15, "70": 16, "71": 17, "72": 18, "73": 19, "74": 20, "75": 21, "76": 22, "77": 23, "78": 24, "79": 25, "710": 26, "711": 27, "712": 28, "713": 29, "714": 30, "715": 31, "716": 32, "717": 33, "718": 34, "719": 35, "720": 36, "721": 37, "722": 38, "723": 39, "80": 40, "81": 41, "82": 42, "83": 43, "84": 44, "85": 45, "86": 46, "87": 47, "88": 48, "89": 49, "810": 50, "811": 51, "812": 52, "813": 53, "814": 54, "815": 55, "816": 56, "817": 57, "818": 58, "819": 59, "820": 60, "821": 61, "822": 62, "823": 63, "90": 64, "91": 65, "92": 66, "93": 67, "94": 68, "95": 69, "96": 70, "97": 71}
        const ss = time_index[String(startDay)+String(startHour)]
        const ee = time_index[String(endDay)+String(endHour)]

        function update_data(ss,ee){

            const mydata = []
            for (let i = 0; i < myrawdata.length; i++) {
                const d = myrawdata[i];
                if (d.time>=ss && d.time <=ee){
                    mydata.push(d)
                }
            }
            myBubbleChart('#vis', mydata);
        }
        update_data(ss,ee)
        // if (!event.sourceEvent || !selection) return;
        // const [x0, x1] = selection.map(d => interval.round(x.invert(d)));
        // d3.select(this).transition().call(brush.move, x1 > x0 ? [x0, x1].map(x) : null);
    }



    svg.append("g")
        .attr("transform", "translate(0," + height + ")")
        .call(d3.axisBottom(x));

    // set the parameters for the histogram
    var histogram = d3.histogram()
        .value(function (d) {
            return d.created_at - 8 * 3600 * 1000;
        })   // I need to give the vector of value
        .domain(x.domain())  // then the domain of the graphic
        .thresholds(x.ticks(200)); // then the numbers of bins

    // // And apply twice this function to data to get the bins.
    var bins1 = histogram(data.filter(function (d) {
        return d.type === "trump"
    }));
    var bins2 = histogram(data.filter(function (d) {
        return d.type === "biden"
    }));

    // // Y axis: scale and draw:
    var y = d3.scaleLinear()
        .range([height, 0])
        .domain([0, d3.max(bins1, function (d) {return d.length;})]);
        // d3.hist has to be called before the Y axis obviously

    // append the bars for series 1
    svg.selectAll("rect")
        .data(bins1)
        .enter()
        .append("rect")
        .attr("x", 1)
        .attr("transform", function (d) {
            return "translate(" + x(d.x0) + "," + y(d.length) + ")";
        })
        .attr("width", function (d) {
            return x(d.x1) - x(d.x0) - 1;
        })
        .attr("height", function (d) {
            return height - y(d.length);
        })
        .style("fill", "#fc9b9a")
        .style("opacity", 0.8)

    // // append the bars for series 2
    svg.selectAll("rect2")
        .data(bins2)
        .enter()
        .append("rect")
        .attr("x", 1)
        .attr("transform", function (d) {
            return "translate(" + x(d.x0) + "," + y(d.length) + ")";
        })
        .attr("width", function (d) {
            return x(d.x1) - x(d.x0) - 1;
        })
        .attr("height", function (d) {
            return height - y(d.length);
        })
        .style("fill", "#b4d5e3")
        .style("opacity", 0.8)







    // Handmade legend
    // svg1.append("circle").attr("cx", 1200).attr("cy", 30).attr("r", 6).style("fill", "#fc9b9a")
    // svg1.append("circle").attr("cx", 1200).attr("cy", 60).attr("r", 6).style("fill", "#b4d5e3")
    // svg1.append("text").attr("x", 1210).attr("y", 30).text("trump").style("font-size", "15px").attr("alignment-baseline", "middle")
    // svg1.append("text").attr("x", 1210).attr("y", 60).text("biden").style("font-size", "15px").attr("alignment-baseline", "middle")

    // svg1.append('image').attr("xlink:href", "trump_19.png")
    //     .attr('x', 40)
    //     .attr('width', 60)
    //     .attr('height', 130)
    //     .on('mouseenter',function (){tooltip.showTooltip("Trump Tests Positive For Coronavirus", d3.event)})
    //     .on('mouseout', function (){
    //         tooltip.hideTooltip()
    //     })
    // svg1.append('image').attr("xlink:href", "biden says.png")
    //     .attr('x', 180)
    //     .attr('width', 50)
    //     .attr('height', 100)
    //     .on('mouseenter',function (){tooltip.showTooltip("Biden suggests people were able to quarantine because 'some Black woman was able to stack the grocery shelf' in viral clip.", d3.event)})
    //     .on('mouseout', function (){
    //     tooltip.hideTooltip()
    //     })
    // svg1.append('image').attr("xlink:href", "court.png")
    //     .attr('x', 280)
    //     .attr('width', 180)
    //     .attr('height', 60)
    //     .on('mouseenter',function (){tooltip.showTooltip("US Supreme Court allows release of Trump tax returns.", d3.event)})
    //     .on('mouseout', function (){
    //         tooltip.hideTooltip()
    //     })
    // svg1.append('image').attr("xlink:href", "be.png")
    //     .attr('x', 500)
    //     .attr('width', 50)
    //     .attr('height', 150)
    //     .on('mouseenter',function (){tooltip.showTooltip("It would open a confirmation hearing for President Donald Trump’s Supreme Court nominee, Amy Coney Barrett. The public are concerning about whether an outbreak of COVID-19 will interfere with the schedule."
    //         , d3.event)})
    //     .on('mouseout', function (){
    //         tooltip.hideTooltip()
    //     })
    //
    // svg1.append('image').attr("xlink:href", "vpdebate.png")
    //     .attr('x', 670)
    //     .attr('width', 80)
    //     .attr('height', 80)
    //     .on('mouseenter',function (){tooltip.showTooltip("VPDEBATE:Vice President Mike Pence defended President Trump stance on white supremacists during Wednesday night’s vice presidential debate and denied the existence of systemic racism by law enforcement. </br> However, many people on the internet think Pence and Trump are liars.", d3.event)})
    //     .on('mouseout', function (){
    //         tooltip.hideTooltip()
    //     })
    // svg1.append('image').attr("xlink:href", "climate.png")
    //     .attr('x', 870)
    //     .attr('width', 90)
    //     .attr('height', 150)
    //     .on('mouseenter',function (){tooltip.showTooltip("Republican Vice President Mike Pence and Senator Kamala Harris clashed over fracking, the Green New Deal, and whether climate change poses an existential threat to humanity.</br> Mike Pence refuses to say climate change is an 'existential threat', which Senator Harris strongly refuted.", d3.event)})
    //     .on('mouseout', function (){
    //         tooltip.hideTooltip()
    //     })
    // svg1.append('image').attr("xlink:href", "tax.png")
    //     .attr('x', 1050)
    //     .attr('width', 90)
    //     .attr('height', 100)
    //     .on('mouseenter',function (){tooltip.showTooltip("Trump cut taxes for the rich </br>But Biden wants to raise them. </br> @@:The Republican Party is lack of concern for the most American people. Still fighting to take away our healthcare with no replacement! Trump paid$750 in taxes & just received $100K in treatment.</br> ", d3.event)})
    //     .on('mouseout', function (){
    //         tooltip.hideTooltip()
    //     })

//


        // svg1.append('image').attr("xlink:href", "court.png")
    //     .attr('x', 150)
    //     .attr('width', 50)
    //     .attr('height', 120)
    //     .on('mouseenter',function (){tooltip.showTooltip("Trump’s Diagnosis Imperils Quick Supreme Court Confirmation Timeline"
    //         , d3.event)})
    //     .on('mouseout', function (){
    //         tooltip.hideTooltip()
    //     })
    // svg1.append('text').attr("cx", 100).attr("cy", 30).text()

}

var svg = d3.select("#rect1").append("svg").attr("width", 1200).attr("height", 40)

// Add the path using this helper function
svg.append('rect')
    .attr('y', 20)
    .attr('width', 1200)
    .attr('height', 1.5)
    .attr('stroke', '#b4d5e3')
    .attr('fill', '#b4d5e3').style('opacity', 0.7);
svg.append('image').attr("xlink:href", "biden.png")
    .attr('x', 590)
    .attr('width', 40)
    .attr('height', 40)
    .on('click', function (d){
        brushScale = brushScaleAll
        myBubbleChart('#vis', myrawdata);
    })
// svg.append('text')
//     .attr("xlink:href", "biden.png")
//     .attr('x', 590)
//     .attr('width', 50)
//     .attr('height', 45)

var svg = d3.select("#rect2").append("svg").attr("width", 1200).attr("height", 40)
// Add the path using this helper function
svg.append('rect')
    .attr('y',20)
    .attr('width', 1200)
    .attr('height', 1.5)
    .attr('stroke', '#fc9b9a')
    .attr('fill', '#fc9b9a');
svg.append('image').attr("xlink:href", "trump.png")
    .attr('x', 590)
    .attr('width', 50)
    .attr('height', 45)
    .on('click', function (d){
        brushScale = brushScaleAll
        myBubbleChart('#vis', myrawdata);
    })
// .attr('stroke', 'black')
// .attr('fill', '#b4d5e3');
let width = 1200;
let height = 450;
let centerX = null;
let XSize = 0;

let centerY = [1, height/9,2*height/9,3*height/9,4*height/9,5*height/9,6*height/9,7*height/9,8*height/9,
    9*height/9]

// update_data(myrawdata,context_data,hour);
// function update_data(myrawdata,context_data,hour){
//     for (let i = 0; i < 72; i++) {
//         var num=72/hour
//         myrawdata[i].time=myrawdata[i].time/num
//         context_data[i].time=context_data[i].time/num
//     }
// }
function bubbleChart() {
    // Constants for sizing

    // tooltip for mouseover functionality
    var tooltip = floatingTooltip('gates_tooltip', 240);


    // These will be set in create_nodes and create_vis
    var svg = null;

    // Charge function that is called for each node.
    // As part of the ManyBody force.
    // This is what creates the repulsion between nodes.
    //
    // Charge is proportional to the diameter of the
    // circle (which is stored in the radius attribute
    // of the circle's associated data.
    //
    // This is done to allow for accurate collision
    // detection with nodes of different sizes.
    //
    // Charge is negative because we want nodes to repel.
    // @v4 Before the charge was a stand-alone attribute
    //  of the force layout. Now we can use it as a separate force!
    // function charge(d) {
    //     return -Math.pow(d.radius, 2.0) * forceStrength;
    // }

    // Here we create a force layout and
    // @v4 We create a force simulation now and
    //  add forces to it.


    // var simulation = d3.forceSimulation()
    //   .velocityDecay(0.2)
    //
    //   .force('y', d3.forceY().strength(forceStrength).y(center.y))
    //   .force('charge', d3.forceManyBody().strength(5))
    //     .force('collision', d3.forceCollide().radius(function(d) {
    //       return d.radius
    //     }))
    //   .on('tick', ticked);
    var simulation = d3.forceSimulation()
        .force('charge', d3.forceManyBody().strength(0))
        .force('x', d3.forceX().x(function (d) {
            return centerX[d.group];
        }))
        .force('y', d3.forceY().y(function (d) {
            return centerY[d.cen];
        }))
        .force('collision', d3.forceCollide().radius(function (d) {
            return d.radius;
        }))
        .on('tick', ticked);
    // centerY=[height*1/5,height*2/5,height*2/5,height*4/5,height*5/5]

    // simulation.force('x', d3.forceX())


    // @v4 Force starts up automatically,
    //  which we don't want as there aren't any nodes yet.
    simulation.stop();

    // Nice looking colors - no reason to buck the trend
    // @v4 scales now have a flattened naming scheme

    /*
     * This data manipulation function takes the raw data from
     * the CSV file and converts it into an array of node objects.
     * Each node will store data and visualization values to visualize
     * a bubble.
     *
     * rawData is expected to be an array of data objects, read in from
     * one of d3's loading functions like d3.csv.
     *
     * This function returns the new node array, with a node in that
     * array for each element in the rawData input.
     */

    function createNodes(rawData) {
        // Use the max total_amount in the data as the max in the scale's domain
        // note we have to ensure the total_amount is a number.
        var maxAmount = d3.max(rawData, function (d) {
            return +d.count;
        });

        // Sizes bubbles based on area.
        // @v4: new flattened scale names.
        radiusScale = d3.scalePow()
            .exponent(0.4)
            .range([2, 90])
            .domain([0, maxAmount]);

        var myNodes = rawData
        if (MyFilter['label'] !== -1){
            myNodes = myNodes.filter(function (d) {
                return d.label === MyFilter['label']
            })
        }

        const dateList = new Set()
        let min = 1000
        let max = 0
        // Use map() to convert raw data into node data.
        myNodes = myNodes.map(function (d) {
            let cell = Math.round(d.position/0.1);
            dateList.add(d.time)
            min = Math.min(min, d.time)
            max = Math.max(max, d.time)
            return {
                id: d.name,
                radius: radiusScale(+d.count / 5),
                value: d.count,
                name: d.name,
                org: d.label,
                group: d.time,
                year: d.time,
                x: Math.random() * 900,
                y: d.position * 800,
                cen: cell > 9 ? 9 : cell,
                position:d.position,
                num:1
            };
        });

        let base = (max-min)/6
        if (base < 1){
            base = 1
        }
        const groupList = [0,1,2,3,4,5]

        myNodes = myNodes.map(function (d) {
            var group = parseInt((d.group-min)/base);
            if (groupList.indexOf(group) == -1){
                console.log(d.group, group, min, base, dateList.size)
                group = 5
            }
            d.group = group
            return d;
        });


        const xArray = []
        for (let i = 0; i <= groupList.length; i++) {
            xArray[i]=(2*i+1)*width/groupList.length/2
        }

        // let sortedDates = Array.from(dateList).sort();
        centerX = {}
        for (let i = 0; i < groupList.length; i++) {
            centerX[groupList[i]] = xArray[i]
        }
        XSize = groupList.length

        // sort them to prevent occlusion of smaller nodes.
        myNodes.sort(function (a, b) {
            return b.value - a.value;
        });

        // console.log(centerX)
        return myNodes;
    }

    /*
     * Main entry point to the bubble chart. This function is returned
     * by the parent closure. It prepares the rawData for visualization
     * and adds an svg element to the provided selector and starts the
     * visualization creation process.
     *
     * selector is expected to be a DOM element or CSS selector that
     * points to the parent element of the bubble chart. Inside this
     * element, the code will add the SVG continer for the visualization.
     *
     * rawData is expected to be an array of data objects as provided by
     * a d3 loading function like d3.csv.
     */

    var chart = function chart(selector, rawData) {

        splitBubbles()
        d3.select("#status").html("<div>No word is active</div>")

        // convert raw data into nodes data
        nodes = createNodes(rawData);
        const new_nodes={}
        for (let i = 0; i < nodes.length; i++) {
            let d=nodes[i];
            var d_n = d.name + '-' + d.group;
            if (new_nodes[d_n]){
                new_nodes[d_n].value+=d.value;
                new_nodes[d_n].position+=d.position;
                new_nodes[d_n].num+=1;
            } else {
                new_nodes[d_n] = d
            }
        }

        const new_nodes_array = []
        for (const nodesKey in new_nodes) {
            const node = new_nodes[nodesKey]
            node.value = parseInt(node.value/1)
            node.position = node.position/node.num
            const cell = Math.round(node.position/0.1);
            node.radius = radiusScale(+node.value/brushScale)
            node.cen = cell > 9 ? 9 : cell
            node.y = node.position * 800
            new_nodes_array.push(node)
        }



        nodes=new_nodes_array;
        d3.select('#bubble_svg').remove()
        // Create a SVG element inside the provided selector
        // with desired size.
        svg = d3.select(selector)
            .append('svg')
            .attr('id','bubble_svg')
            .attr('width', width)
            .attr('height', height);


        // Bind nodes data to what will become DOM elements to represent them.
        bubbles = svg.selectAll('.bubble')
            .data(nodes, function (d) {
                return d.id;
            })

        // Create new circle elements each with class `bubble`.
        // There will be one circle.bubble for each object in the nodes array.
        // Initially, their radius (r attribute) will be 0.
        // @v4 Selections are immutable, so lets capture the
        //  enter selection to apply our transtition to below.
        var bubblesE = bubbles.enter().append('circle')
            .classed('bubble', true)
            .attr('r', 0)
            .style('fill', function (d) {
                return colors[d.org];
            })
            .style("opacity", function (d) {
                return d.radius / 30;
            })
            .on('mouseenter', showDetail)
            .on('mouseout', hideDetail);


        // @v4 Merge the original empty selection and the enter selection
        bubbles = bubbles.merge(bubblesE);
        // Fancy transition to make bubbles appear, ending with the
        // correct radius
        bubbles.transition()
            .attr('id','bubbles_all')
            .duration(2000)
            .attr('r', function (d) {
                return d.radius;
            })


        // Set the simulation's nodes to our newly created nodes array.
        // @v4 Once we set the nodes, the simulation will start running automatically!
        simulation.nodes(nodes);

        texts = svg.selectAll(".texts")
            .data(nodes)
            .enter()
            .append("text")
            .style("text-anchor", "middle")
            .attr("font-family", "Gill Sans", "Gill Sans MT")
            .attr("font-size", function (d) {
                return radiusScale(d.value / (d.name.length * brushScale ));
            })
            .text(function (d) {
                pos_dic[d.name + '-' + d.group] = {x: 0, y: 0}
                if (d.radius <= 10) {
                    return d.name[0];
                }
                // else if (d.radius <= 15) {
                //     return d.name.slice(0,3);
                // }
                return d.name;

            });

        // bubbles.on('click', function (m) {
        //     const org = MyFilter['org'];
        //     MyFilter['org'] = org === -1 ? m.org : -1
        //     bubbles.style('visibility', function (d) {
        //         return MyFilter['org'] === -1 || d.org === MyFilter['org'] ? "visible" : "hidden"
        //     })
        //     texts.style('visibility', function (d) {
        //         return MyFi
        //
        //         lter['org'] === -1 || d.org === MyFilter['org'] ? "visible" : "hidden"
        //     })

        // })
        bubbles.on('click',function(m) {
            // console.log(d.name)
            // if (brushScale == brushScaleLarge) {
            brushScale = brushScaleClick
            // }
            for (let i = 0; i < context_data.length; i++) {
                const currDic = context_data[i][m.name]
                for (let k in currDic) {
                    rawDataNew.push({
                        "name": k,
                        "label": currDic[k].label,
                        "count": currDic[k].count,
                        "time": i+1,
                        "position": currDic[k].pos
                    })
                }
            }
            chart(selector, rawDataNew)
            active(m)
            hideDetail(null)
        })
    };
    function active(m){
        bubbles.classed("bubble-selected", function(m) {return m.name})
        if (m.name.length > 0){
            d3.select("#status").html("<div>The word <span class=\"active\">"+m.name+"</span> is now active</div>")}
        else{
            d3.select("#status").html("<div>No word is active</div>")
        }
    }

    /*
     * Callback function that is called after every tick of the
     * force simulation.
     * Here we do the acutal repositioning of the SVG circles
     * based on the current x and y values of their bound node data.
     * These x and y values are modified by the force simulation.
     */
    function dragstarted(d) {
        if (!d3.event.active) simulation.alphaTarget(0.3).restart();
        d.fx = d.x;
        d.fy = d.y;
    }

    function dragged(d) {
        d.fx = d3.event.x;
        d.fy = d3.event.y;
    }

    function dragended(d) {
        if (!d3.event.active) simulation.alphaTarget(0);
        d.fx = null;
        d.fy = null;
    }

    function ticked() {
        bubbles
            .attr('cx', function (d) {
                // if (d.group === 1) {
                //     d.x = Math.max(40, Math.min(2 * width / 12 +80, d.x))
                // } else if (d.group === 2) {
                //     d.x = Math.max(2 * width / 12 + 120, Math.min(6 * width / 12 - 20, d.x))
                // } else if (d.group === 3) {
                //     d.x = Math.max(5 * width / 12 + 160, Math.min(9 * width / 12 + 10, d.x))
                // } else if (d.group === 4) {
                //     d.x = Math.max(9 * width / 12 + 100, Math.min(11 * width / 12 + 50, d.x))
                // }else{
                //     console.log(d.group)
                // }
                const padding = width/XSize/2;
                if(d.group===0){
                    d.x = Math.max(centerX[d.group]-padding+40, Math.min(centerX[d.group]+padding+30, d.x))
                }else if (d.group===5){
                    d.x = Math.max(centerX[d.group]-padding-30, Math.min(centerX[d.group]+padding-45, d.x))
                }else{
                    d.x = Math.max(centerX[d.group]-padding+30, Math.min(centerX[d.group]+padding-30, d.x))

                }
                pos_dic[d.name + '-' + d.group].x = d.x;

                // if (d.group === 1) {
                //     d.x = Math.max(0, Math.min(centerX[d.group]+40, d.x))
                // }
                // else{
                //     d.x = Math.max(centerX[d.group-1], Math.min(centerX[d.group]+40, d.x))
                // }
                return d.x;
            })
            .attr('cy', function (d) {
                d.y = Math.max(40, Math.min(height - 60, d.y))
                pos_dic[d.name + '-' + d.group].y = d.y;
                return d.y;
            })
            .call(d3.drag()
                .on("start", dragstarted)
                .on("drag", dragged)
                .on("end", dragended))

        texts.attr("x", function (d) {
            return pos_dic[d.name + '-' + d.group].x;
        })
            .attr("y", function (d) {
                return pos_dic[d.name + '-' + d.group].y
            }, 100);
    }


    /*
     * Provides a x value for each node to be used with the split by year
     * x force.
     */
    function nodeYearPos(d) {
        return centerX[d.group];
    }

    /*
     * Sets visualization in "split by year mode".
     * The year labels are shown and the force layout
     * tick function is set to move nodes to the
     * yearCenter of their data's year.
     */
    function splitBubbles() {

        // @v4 Reset the 'x' force to draw the bubbles to their year centers
        simulation.force('x', d3.forceX().x(nodeYearPos));
        // @v4 We can reset the alpha value and restart the simulation
        simulation.alpha(1).restart();
    }



    /*
     * Function called on mouseover to display the
     * details of a bubble in the tooltip.
     */
    function showDetail(d) {
        // change outline to indicate hover state.
        d3.select(this).attr('stroke', 'black');

        var content = '<span class="name">Title: </span><span class="value">' +
            d.name +
            '</span><br/>' +
            '<span class="name">Count: </span><span class="value">' +
            d.value +
            '</span><br/>' +
            '<span class="name">Pos: </span><span class="value">' +
            d.position +
            '</span>';

        tooltip.showTooltip(content, d3.event);
    }

    /*
     * Hides tooltip
     */
    function hideDetail(d) {
        if (d){
            // reset outline
            d3.select(this)
                .attr('strokewidth', 0);
        }

        tooltip.hideTooltip();
    }
    /*
     * Externally accessible function (this is attached to the
     * returned chart function). Allows the visualization to toggle
     * between "single group" and "split by year" modes.
     *
     * displayName is expected to be a string and either 'year' or 'all'.
     */
    chart.toggleDisplay = function (displayName) {
    };
    // splitBubbles()
    // return the chart function from closure.
    return chart;
}

/*
 * Below is the initialization code as well as some helper functions
 * to create a new bubble chart instance, load the data, and display it.
 */

var myBubbleChart = bubbleChart();
// var myHistChart = histChart();
/*
 * Function called once data is loaded from CSV.
 * Calls bubble chart function to display inside #vis div.
 */

function display(data) {
    myrawdata=JSON.parse(data)
    myBubbleChart('#vis', myrawdata);
}

/*
 * Sets up the layout buttons to allow for toggling between view modes.
 */

/*
 * Helper function to convert a number into a string
 * and add commas to it to improve presentation.
 */
function addCommas(nStr) {
    nStr += '';
    var x = nStr.split('.');
    var x1 = x[0];
    var x2 = x.length > 1 ? '.' + x[1] : '';
    var rgx = /(\d+)(\d{3})/;
    while (rgx.test(x1)) {
        x1 = x1.replace(rgx, '$1' + ',' + '$2');
    }

    return x1 + x2;
}

let hist_bins = null;
// Load the data.
readTextFile('./data/wordCount.json', display)

readTextFile('./data/context_words.json', function (data) {
    context_data = JSON.parse(data)
})

readTextFile('./data/hist.json', function (data) {
    histChart(JSON.parse(data))
})

