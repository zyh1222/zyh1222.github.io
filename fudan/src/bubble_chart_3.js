/* bubbleChart creation function. Returns a function that will
 * instantiate a new bubble chart given a DOM element to display
 * it in and a dataset to visualize.
 */

/**
 * 1 - explore context
 * 2 - select word
 * @type {number}
 */

var bubbles = null;
var myrawdata = null;
var context_data = null;
var activateWord = null;
var texts = null;
var nodes = [];
var backbutton = [];
var pos_dic = {}
var radiusScale = null;
var fontScale = null;
let brushScaleAll = 10
let brushScaleBrush = 10
let brushScaleClick = 40
let brushScale = brushScaleAll
let rawDataNew = []
let zyhKeyword = ""
let zyhKeySvg = null
const colors = ['#5470c6', '#91cc75', '#fac858', '#ee6666', '#73c0de', '#3ba272', '#fc8452', '#9a60b4', '#ea7ccc']
var modesvg = null
const MyFilter = {'name': -1, 'label': -1}

function chartByLabel(label) {
    if (MyFilter['label'] === label) {
        MyFilter['label'] = -1
    } else {
        MyFilter['label'] = label
    }
    myBubbleChart('#vis', myrawdata);
}

function draw_context() {
    let graph = {
        height: 200,
        width: 100,
    }
    d3.select("#vis_tree_words").select('#nn').selectAll('svg').remove()
    if (modesvg === null) {
        modesvg = d3.select("#vis_tree_words").append('svg').attr('id', 'nn').attr("height", 800).attr('position', 'absolute').attr('top', '100px')
    }
    let svg = modesvg

    svg.selectAll("rect_context")
        .data(contextWordSelect)
        .enter().append('svg')
        .append("rect")
        .attr("x", function (d, i) {
            return 5
        })
        .attr("y", function (d, i) {
            console.log(d)
            return graph.height / 6 * i + 330
        })
        .style('width', function (d) {
            return d.length * 9
        })
        .style("opacity", 0.5)
        .style('height', 25)
        .style('fill', '#91d0fa')
        .style('rx', 10)

    svg.selectAll("text_context")
        .data(contextWordSelect)
        .enter().append('svg')
        .append("text")
        .attr("x", function (d, i) {
            return d.length + 5
        })
        .attr("y", function (d, i) {
            return graph.height / 6 * i + 345
        })
        .text(function (d) {
            return d;
        })
        .attr('font-family', "Gill Sans", "Gill Sans MT")
}

function to_context_tree(keyword, select) {
    // var keyword = keyword
    // var select = select
    // d3.selectAll("#vis").attr('class', 'hidden');
    d3.selectAll("#rect1_new").attr('class', 'visible')
    d3.selectAll("#rect2_new").attr('class', 'visible')
    d3.selectAll("#vis_tree").attr('class', 'visible')
    d3.select("#vis_tree").selectAll('svg').remove()
    // d3.selectAll("#vis1").attr('class', 'hidden');
    // d3.selectAll("#vis2").attr('class', 'hidden');
    context_tree(keyword, select)

    function context_tree(keyword, select) {
        // var keyword = 'covid'
        // var select = ['virus', 'disease', 'infection', 'illness', 'flu']

        var disData = {}
        var spark = {}
        var datas = {}
        var horizon = {}
        for (var i = 0; i < select.length; i++) {
            k = select[i]
            if (dis_y[keyword].hasOwnProperty(k)) {
                disData[k] = dis_y[keyword][k]
            }
            if (dis_x[keyword].hasOwnProperty(k)) {
                horizon[k] = dis_x[keyword][k]
            }
        }
        select = Object.keys(disData).sort(function (a, b) {
            return disData[a] - disData[b];
        })
        var disData = {}
        for (var i = 0; i < select.length; i++) {
            k = select[i]
            disData[k] = dis_y[keyword][k]
            spark[k] = spark_all[keyword][k]
            datas[k] = data[keyword][k]
            horizon[k] = dis_x[keyword][k]
        }

        l = Object.keys(datas).length
        sparkl = []
        for (key in spark) {
            sparkl.push({'key': key, 'value': spark[key]})
        }
        var freq = {}

        for (var key in disData) {
            a = datas[key]
            if (a === undefined) {
                continue
            }
            freq[key] = 0

            for (var k = 0; k < a.length; k++) {
                if (a[k].length == 1) {
                    for (var i = 0; i < a[k][0][0].length; i++) {
                        if (a[k][0][0][i][0] == key) {
                            freq[key] += a[k][0][0][i][1]
                        }

                    }
                    for (var i = 0; i < a[k][0][1].length; i++) {
                        if (a[k][0][1][i][0] == key) {

                            freq[key] += a[k][0][1][i][1]
                        }
                    }
                }
            }
        }
        var freq_key = []
        var i = 0
        for (var key in freq) {
            freq_key.push({'freq': freq[key], 'relate': disData[key], 'hor': horizon[key], 'id': i, 'key': key})
            i++
        }
        for (var key in freq) {
            freq_key.push({'freq': freq[key], 'relate': disData[key], 'hor': horizon[key], 'id': i, 'key': key})
            i++
        }

        var data_change = []
        id = -1
        for (var key in disData) {
            id += 1
            a = datas[key]
            if (a === undefined) {
                continue
            }
            len = a.filter(d => d.length > 0).length
            p = -1
            t_left = [];
            f_left = 0;
            num_left = 0
            t_r = [];
            f_r = 0;
            num_r = 0
            name_l = {};
            name_r = {}
            for (var k = 0; k < a.length; k++) {
                Start = 'True'
                if (a[k].length == 1) {
                    p += 1
                    for (var i = 0; i < a[k][0][0].length; i++) {
                        name = a[k][0][0][i][0]
                        if (name == key && i == 3) {
                            start_l = Start
                            num_left += 1
                            t_left.push(k)
                            f_left += a[k][0][0][i][1]
                        } else if (name == key) {
                            start_k = Start
                            if (name_l.hasOwnProperty(i)) {
                                name_l[i]['time'].push(k)
                                name_l[i]['freq'] += a[k][0][0][i][1]
                            } else {
                                name_l[i] = {'time': [k], 'freq': a[k][0][0][i][1]}
                            }

                        } else if (name != "" && Start == 'True') {
                            frequency = a[k][0][0][i][1]
                            //name是词，time是时间，position是左/右，index是左/右边的第几个词，platform是第几块板子，
                            //length是该关键词不为空的pattern数，frac是第几个不为空的pattern，freq出现频率
                            data_change.push({
                                'name': name,
                                'time': [k],
                                'position': 'left',
                                'index': i,
                                'platform': id,
                                'length': a.length,
                                'frac': p,
                                'freq': frequency,
                                'relate': horizon[key],
                                'start': Start
                            })
                            Start = 'False'
                        } else {
                            frequency = a[k][0][0][i][1]
                            //name是词，time是时间，position是左/右，index是左/右边的第几个词，platform是第几块板子，
                            //length是该关键词不为空的pattern数，frac是第几个不为空的pattern，freq出现频率
                            data_change.push({
                                'name': name,
                                'time': [k],
                                'position': 'left',
                                'index': i,
                                'platform': id,
                                'length': a.length,
                                'frac': p,
                                'freq': frequency,
                                'relate': horizon[key],
                                'start': Start
                            })
                        }
                    }

                    for (var i = 0; i < a[k][0][1].length; i++) {
                        name = a[k][0][1][i][0]
                        if (name == key && i == 0) {
                            if (a[k][0][1].length == 1) {
                                start_r = 'True'
                            } else {
                                start_r = 'False'
                            }
                            num_r += 1
                            t_r.push(k)
                            f_r += a[k][0][1][i][1]
                        } else if (name == key) {
                            if (i == a[k][0][1].length - 1) {
                                Start = 'True'
                            }
                            <!--                        num_left += 1-->
                            if (name_r.hasOwnProperty(i)) {
                                if (i == a[k][0][1].length - 1) {

                                }
                                name_r[i]['time'].push(k)
                                name_r[i]['freq'] += a[k][0][1][i][1]
                                name_r[i]['start'] = Start
                            } else {
                                name_r[i] = {'time': [k], 'freq': a[k][0][1][i][1], 'start': Start}
                            }
                            Start = 'False'

                        } else if (i == a[k][0][1].length - 1) {
                            frequency = a[k][0][1][i][1]
                            data_change.push({
                                'name': name,
                                'time': [k],
                                'position': 'right',
                                'index': i,
                                'platform': id + l,
                                'length': a.length,
                                'frac': p,
                                'freq': frequency,
                                'relate': horizon[key],
                                'start': 'True'
                            })
                        } else {
                            frequency = a[k][0][1][i][1]
                            data_change.push({
                                'name': name,
                                'time': [k],
                                'position': 'right',
                                'index': i,
                                'platform': id + l,
                                'length': a.length,
                                'frac': p,
                                'freq': frequency,
                                'relate': horizon[key],
                                'start': 'False'
                            })
                        }
                    }
                }
            }
            if (num_left > 0) {
                data_change.push({
                    'name': key,
                    'time': t_left,
                    'position': 'left',
                    'index': 3,
                    'platform': id,
                    'length': a.length,
                    'frac': p,
                    'freq': f_left,
                    'relate': horizon[key],
                    'start': start_l

                })
            }
            if (num_r > 0) {
                data_change.push({
                    'name': key,
                    'time': t_r,
                    'position': 'right',
                    'index': 0,
                    'platform': id + l,
                    'length': a.length,
                    'frac': p,
                    'freq': f_r,
                    'relate': horizon[key],
                    'start': start_r
                })
            }
            for (i in name_l) {
                data_change.push({
                    'name': key,
                    'time': name_l[i].time,
                    'position': 'left',
                    'index': i,
                    'platform': id,
                    'length': a.length,
                    'frac': p,
                    'freq': name_l[i].freq,
                    'relate': horizon[key],
                    'start': start_k
                })
            }
            for (i in name_r) {
                console.log(i)
                data_change.push({
                    'name': key,
                    'time': name_r[i].time,
                    'position': 'right',
                    'index': parseInt(i),
                    'platform': id + l,
                    'length': a.length,
                    'frac': p,
                    'freq': name_r[i].freq,
                    'relate': horizon[key],
                    'start': name_r[i].start
                })
            }
        }
        // console.log(data_change)

        const pattern_length = 4
        var s = -30

        // const linkColors = ['#f1beb1','#f88477','#d6c9ec','#f5c6e0','#d78ea8','#ca6c90','#b093dc']
        const linkColors = d3.scaleLinear().domain([0, 1]).range(["#7bcafc", "#eed0d5"])
        const horiz = d3.scaleLinear().range([-50, 50]).domain([d3.min(Object.values(horizon)), d3.max(Object.values(horizon))])
        // .range(['#f1beb1','#f88477','#d6c9ec','#f5c6e0','#d78ea8','#ca6c90'])


        var graph = {
            width: 1200,
            height: 700
        };

        var timeticks = ['11th 00pm', '12th 12am', '14th 00pm', '15th 12am', '17th 00pm', '18th 12am']

        var svg = d3.select("#vis_tree").append('svg:svg')
            .attr("width", graph.width)
            .attr("height", graph.height)
            .append('svg:g')
            .attr('transform', 'translate( 10' + ', 0)')
        var id = "md-shadow";
        var deviation = 2;
        var offset = 5;
        var slope = 0.3;
        var pad = 10
        var left = 20
        var mid = 180
        var wid = 285
        var maxAmount1 = d3.max(data_change, function (d) {
            return +d.freq;
        });
        var scaler = d3.scalePow()
            .exponent(0.4)
            .range([10, 25])
            .domain([0, maxAmount1]);


        var diag = d3.linkHorizontal()
        // create filter and assign provided id
        var filter = svg.append("filter")
            .attr("height", "130%")    // adjust this if shadow is clipped
            .attr("id", id);

        // ambient shadow into ambientBlur
        //   may be able to offset and reuse this for cast, unless modified
        filter.append("feGaussianBlur")
            .attr("in", "SourceAlpha")
            .attr("stdDeviation", deviation)
            .attr("result", "ambientBlur");

        // cast shadow into castBlur
        filter.append("feGaussianBlur")
            .attr("in", "SourceAlpha")
            .attr("stdDeviation", deviation)
            .attr("result", "castBlur");
        // offsetting cast shadow into offsetBlur
        filter.append("feOffset")
            .attr("in", "castBlur")
            .attr("dx", offset - 2)
            .attr("dy", offset)
            .attr("result", "offsetBlur");

        // combining ambient and cast shadows
        filter.append("feComposite")
            .attr("in", "ambientBlur")
            .attr("in2", "offsetBlur")
            .attr("result", "compositeShadow");

        // applying alpha and transferring shadow
        filter.append("feComponentTransfer")
            .append("feFuncA")
            .attr("type", "linear")
            .attr("slope", slope);

        // merging and outputting results
        var feMerge = filter.append("feMerge");
        feMerge.append('feMergeNode')
        feMerge.append("feMergeNode")
            .attr("in", "SourceGraphic");


        platform_color = {}
        var myPolygon = svg.selectAll(".polygon")
            .data(freq_key)
            .enter()
            .append("polygon")
            .attr("points", function (d, i) {
                return polygonPoints(d, i);
            })
            .style("fill", function (d, i) {
                console.log(d.relate)
                platform_color[d.id] = linkColors(d.relate)
                return platform_color[d.id]
            })
            .style("opacity", 1)
            .style("filter", "url(#md-shadow)");

        var sparkline = svg.selectAll("linemax")
            .data(sparkl).enter().append('svg:g')
        sparkline.append("polyline")
            .attr("fill", "None")
            .style('opacity', 0)
            .attr("stroke", "black")
            .attr("stroke-width", "1")
            .attr("points", function (p) {
                t = p.value.map(d => d.time)
                co = p.value.map(d => d.co)
                self = p.value.map(d => d.self)
                x = d3.scaleLinear()
                    .domain([d3.min(t), d3.max(t)])
                    .range([0, (p.key.length - 0.5) * pad])
                y = d3.scaleLinear()
                    .domain([d3.min(co), d3.max(self)])
                    .range([0, pad])
                id = freq_key.filter(x => x.key == p.key)
                for (var i = 0; i < id.length; i++) {
                    if (id[i].id < l) {
                        var rel = horiz(id[i].hor)
                        var x_axis = graph.width / 2 - mid - pad - wid + rel
                        var y_axis = graph.height / l * id[i].id + graph.height / l / 2
                    }
                }
                var result = new Array()
                for (var i = 0; i < p.value.length; i++) {
                    var x_add = x(p.value[i].time)
                    var y_add = y(p.value[i].self)
                    var x_point = x_axis + x_add
                    var y_point = y_axis - y_add
                    result.push(x_point + "," + y_point + " ")
                }
                return result
            })


        sparkline.append("polyline")
            .attr("fill", "None")
            .attr("stroke", "black")
            .style('opacity', 0)
            .attr("stroke-width", "1")
            .attr("points", function (p) {
                t = p.value.map(d => d.time)
                co = p.value.map(d => d.co)
                self = p.value.map(d => d.self)
                x = d3.scaleLinear()
                    .domain([d3.min(t), d3.max(t)])
                    .range([0, (p.key.length - 0.5) * pad])
                y = d3.scaleLinear()
                    .domain([d3.min(co), d3.max(self)])
                    .range([0, pad])
                id = freq_key.filter(x => x.key == p.key)
                for (var i = 0; i < id.length; i++) {
                    if (id[i].id >= l) {
                        var rel = horiz(id[i].hor)
                        var x_axis = graph.width / 2 + mid + (12 - p.key.length) * pad + wid / 2 - rel
                        var y_axis = graph.height / l * (id[i].id - l) + graph.height / l / 2
                    }
                }
                var result = new Array()
                for (var i = 0; i < p.value.length; i++) {
                    var x_add = x(p.value[i].time)
                    var y_add = y(p.value[i].self)
                    var x_point = x_axis + x_add
                    var y_point = y_axis - y_add
                    result.push(x_point + "," + y_point + " ")
                }
                return result
            })


        keys = data_change.filter(d => d.time.length > 1)
        keys_f = []
        for (i = 0; i < keys.length; i++) {
            for (j = 0; j < keys[i].time.length; j++) {
                keys_f.push({
                    'name': keys[i].name,
                    'time': keys[i].time,
                    'position': keys[i].position,
                    'index': keys[i].index,
                    'platform': keys[i].platform,
                    'length': keys[i].length,
                    'frac': keys[i].frac,
                    'freq': keys[i].freq,
                    'relate': keys[i].relate,
                    'time1': keys[i].time[j]
                })
            }
        }

        // console.log(keys_f)

        function diagonal(d, i) {
            var result = {
                source: [],
                target: []
            }
            var rel = horiz(d.relate)
            if (d.time.length == 1) {
                if (d.position == 'left' && d.name == "") {
                    result.source = [0, 0]
                    result.target = [0, 0]
                } else if (d.position == 'right' && d.name == "") {
                    result.source = [0, 0]
                    result.target = [0, 0]
                } else if (keys_f.filter(x => x.platform == d.platform && x.index == d.index - 1 && d.position == 'left').length > 0) {
                    result.source = [0, 0]
                    result.target = [0, 0]
                } else if (keys_f.filter(x => x.platform == d.platform && x.index == d.index + 1 && d.position == 'right').length > 0) {
                    result.source = [0, 0]
                    result.target = [0, 0]
                } else if (d.position == 'left') {
                    if (d.start == 'True') {
                        result.source = [0, 0]
                        result.target = [0, 0]
                    } else {
                        result.source = [4 * pad + (wid) / pattern_length * d.index + 60 + s / d.length * d.time[Math.round(d.time.length / 2) - 1] + rel,
                            (graph.height) / l * d.platform + pad + ((graph.height) / l - 2 * pad) / d.length * d.time[Math.round(d.time.length / 2) - 1] - 3]
                        result.target = [4 * pad + (wid) / pattern_length * (d.index - 1) + 60 + s / d.length * d.time[Math.round(d.time.length / 2) - 1] + rel,
                            (graph.height) / l * d.platform + pad + ((graph.height) / l - 2 * pad) / d.length * d.time[Math.round(d.time.length / 2) - 1] - 3]
                    }
                } else if (d.position == 'right') {
                    if (d.start == 'True') {
                        result.source = [0, 0]
                        result.target = [0, 0]
                    } else {
                        result.source = [graph.width / 2 + mid + 3 * pad + wid / pattern_length * d.index + s / d.length * d.time[Math.round(d.time.length / 2) - 1] - rel,
                            (graph.height) / l * (d.platform - l) + pad + ((graph.height) / l - 2 * pad) / d.length * d.time[Math.round(d.time.length / 2) - 1] - 3]
                        result.target = [graph.width / 2 + mid + 3 * pad + wid / pattern_length * (d.index + 1) + s / d.length * d.time[Math.round(d.time.length / 2) - 1] - rel,
                            (graph.height) / l * (d.platform - l) + pad + ((graph.height) / l - 2 * pad) / d.length * d.time[Math.round(d.time.length / 2) - 1] - 3]
                    }
                }
            } else {
                result.source = [0, 0]
                result.target = [0, 0]
            }
            return result
        }

        var diag = d3.linkHorizontal()

        var connect = svg.selectAll('line_connect')
            .data(data_change)
            .enter()
            .append("svg:g")
        connect.append('path')
            .style('stroke', function (d, i) {
                return 'black'
            })
            .attr('stroke-width', 1.5)
            .attr('d', function (d, i) {
                // console.log(d)
                return diag(diagonal(d, i))
            })
            .style("fill", "none")
            .style("opacity", 0.2);


        function diagonal_c(d, i) {
            var result = {
                source: [],
                target: []
            }
            var rel = horiz(d.relate)
            if (d.position == 'left') {
                result.source = [4 * pad + (wid) / pattern_length * d.index + 60 + s / d.length * d.time[Math.round(d.time.length / 2) - 1] + rel,
                    (graph.height) / l * d.platform + pad + ((graph.height) / l - 2 * pad) / d.length * d.time[Math.round(d.time.length / 2) - 1] - 3]
                result.target = [4 * pad + (wid) / pattern_length * (d.index - 1) + 60 + s / d.length * d.time1 + rel,
                    (graph.height) / l * d.platform + pad + ((graph.height) / l - 2 * pad) / d.length * d.time1 - 3]
            } else {
                result.source = [graph.width / 2 + mid + 3 * pad + wid / pattern_length * d.index + s / d.length * d.time[Math.round(d.time.length / 2) - 1] - rel,
                    (graph.height) / l * (d.platform - l) + pad + ((graph.height) / l - 2 * pad) / d.length * d.time[Math.round(d.time.length / 2) - 1] - 3]
                result.target = [graph.width / 2 + mid + 3 * pad + wid / pattern_length * (d.index + 1) + s / d.length * d.time1 - rel,
                    (graph.height) / l * (d.platform - l) + pad + ((graph.height) / l - 2 * pad) / d.length * d.time1 - 3]
            }
            return result
        }


        function diagonal_t(d, i) {
            var result = {
                source: [],
                target: []
            }
            if ((d.index != 3 && d.position == 'left') || (d.index != 0 && d.position == 'right')) {
                var rel = horiz(d.relate)
                if (d.position == 'left') {
                    result.source = [4 * pad + (wid) / pattern_length * d.index + 60 + s / d.length * d.time[Math.round(d.time.length / 2) - 1] + rel,
                        (graph.height) / l * d.platform + pad + ((graph.height) / l - 2 * pad) / d.length * d.time[Math.round(d.time.length / 2) - 1] - 3]
                    result.target = [4 * pad + (wid) / pattern_length * (parseInt(d.index) + 1) + 60 + s / d.length * d.time1 + rel,
                        (graph.height) / l * d.platform + pad + ((graph.height) / l - 2 * pad) / d.length * d.time1 - 3]
                } else {
                    result.source = [graph.width / 2 + mid + 3 * pad + wid / pattern_length * d.index + s / d.length * d.time[Math.round(d.time.length / 2) - 1] - rel,
                        (graph.height) / l * (d.platform - l) + pad + ((graph.height) / l - 2 * pad) / d.length * d.time[Math.round(d.time.length / 2) - 1] - 3]
                    result.target = [graph.width / 2 + mid + 3 * pad + wid / pattern_length * (parseInt(d.index) - 1) + s / d.length * d.time1 - rel,
                        (graph.height) / l * (d.platform - l) + pad + ((graph.height) / l - 2 * pad) / d.length * d.time1 - 3]
                }
            } else {
                result.source = [0, 0]
                result.target = [0, 0]
            }
            return result
        }


        var connect_c = svg.selectAll('connect_center')
            .data(keys_f)
            .enter()
            .append("svg:g")
        connect_c.append('path')
            .style('stroke', function (d, i) {
                return 'black'
            })
            .attr('stroke-width', 1.5)
            .attr('d', function (d, i) {
                return diag(diagonal_c(d, i))
            })
            .style("fill", "none")
            .style("opacity", 0.2);

        connect_c.append('path')
            .style('stroke', function (d, i) {
                return 'black'
            })
            .attr('stroke-width', 1.5)
            .attr('d', function (d, i) {
                return diag(diagonal_t(d, i))
            })
            .style("fill", "none")
            .style("opacity", 0.2);


        svg.selectAll("text_center")
            .data([keyword])
            .enter()
            .append("text")
            .attr("x", graph.width / 2 - 4 * pad - 10)
            .attr("y", graph.height / 2)
            .attr("font-size", 25).text(d => d)


        const similar = Object.keys(disData)
        timetick = []
        for (var j = 0; j < l; j++) {
            a = datas[similar[j]]
            len = a.filter(d => d.length > 0).length
            for (var k = 0; k < a.length; k++) {
                if (a[k].length == 1) {
                    timetick.push({
                        'tick': timeticks[k],
                        'platform': j,
                        'len': a.length,
                        'idx': k,
                        'relate': horiz(horizon[similar[j]])
                    })
                } else {
                    timetick.push({
                        'tick': "",
                        'platform': j,
                        'len': a.length,
                        'idx': k,
                        'relate': horiz(horizon[similar[j]])
                    })
                }
            }
        }

        var timeticks = svg.selectAll("timetick").data(timetick).enter().append("svg:g")
        timeticks.append("text")
            .attr("x", d => 70 + s / d.len * d.idx + d.relate)
            .attr("y", d => (graph.height) / l * d.platform + pad + ((graph.height) / l - 2 * pad) / d.len * d.idx)
            .attr("dy", ".15em")
            .attr("dx", ".15em")
            .attr("font-size", 7)
            .text(function (d) {
                return d.tick;
            })
            .on('mouseover', function (d) {
                d3.select(this).attr("color", "#000000").attr("font-size", 12)
            })
            .on('mouseleave', function (d) {
                d3.select(this).attr("color", "#000000").attr("font-size", 7)
            })

        timeticks.append("text")
            .attr("x", d => graph.width / 2 + mid + 300 + s / d.len * d.idx - d.relate)
            .attr("y", d => (graph.height) / l * d.platform + pad + ((graph.height) / l - 2 * pad) / d.len * d.idx)
            .attr("dy", ".15em")
            .attr("dx", ".15em")
            .attr("font-size", 8)
            .text(function (d) {
                return d.tick;
            })
            .on('mouseover', function (d) {
                d3.select(this).attr("color", "#000000").attr("font-size", 12)
            })
            .on('mouseleave', function (d) {
                d3.select(this).attr("color", "#000000").attr("font-size", 8)
            })


        timeticks.on('click', function (d, i) {
            connect.selectAll('path').style('opacity', function (p) {
                if ((p.time.indexOf(d.idx) > -1 || d.idx == p.time)) {
                    return 1
                } else {
                    return 0
                }
            })
            connect_c.selectAll('path').style('opacity', function (p) {
                if (d.idx == p.time1) {
                    return 1
                } else {
                    return 0
                }
            })
            t = data_change.filter(p => p.time.indexOf(d.idx) > -1)
            text.selectAll('text')
                .style('opacity', function (x, j) {
                    if (t.indexOf(x) > -1) {
                        return 1
                    } else {
                        return 0.1
                    }
                })
            plat = data_change.filter(p => p.time.indexOf(d.idx) > -1).map(d => d.platform)
            plat = data_change.filter(p => p.time.indexOf(d.idx) > -1 && plat.indexOf(p.platform) > -1 && p.name != "").map(d => d.platform)
            // timeticks.style('opacity',function(x,j){
            //         if( t.map(d=>d.idx).indexOf(x.idx)>-1){
            //             return 1
            //         }
            //         else{
            //             return 0.1
            //         }
            //     })
            link.style('opacity', function (x, j) {
                if (plat.indexOf(j) > -1) {
                    return 0.7
                }
                    <!--                        if(j>1 && plat.indexOf(j-l)>-1){-->
                    <!--                            return 0.5-->
                <!--                        }-->
                else {
                    return 0.1
                }
            })
        })


        var text = svg.selectAll('text_p')
            .data(data_change)
            .enter().append("svg:g")

        text.on('mouseleave', function (d) {
            text.selectAll('text')
                .style('opacity', 1)
            link.style('opacity', 0.7)
            sparkline.selectAll("polyline").style('opacity', 0)
            connect_c.selectAll('path').style('opacity', 0.2)
            connect.selectAll('path').style('opacity', 0.2)
        })
            .on('mouseover', function (d) {
                connect.selectAll('path').style('opacity', function (p) {
                    if ((d.time.indexOf(p.time[0]) > -1 || p.time.indexOf(d.time[0]) > -1 || d.time == p.time) && (p.platform == d.platform || p.platform == d.platform - l || p.platform == d.platform + l)) {
                        return 1
                    } else {
                        return 0
                    }
                })
                connect_c.selectAll('path').style('opacity', function (p) {
                    if ((d.time.indexOf(p.time1) > -1) && (p.platform == d.platform || p.platform == d.platform - l || p.platform == d.platform + l)) {
                        return 1
                    } else {
                        return 0
                    }
                })

                sparkline.selectAll('polyline')
                    .style('opacity', function (x) {
                        if (d.name == x.key) {
                            return 1
                        } else {
                            return 0
                        }
                    })
                t = data_change.filter(function (p) {
                    if ((d.time.indexOf(p.time[0]) > -1 || p.time.indexOf(d.time[0]) > -1 || d.time == p.time) && (p.platform == d.platform || p.platform == d.platform - l || p.platform == d.platform + l)) {
                        return p
                    }
                })
                text.selectAll('text')
                    .style('opacity', function (x, j) {
                        if (t.indexOf(x) > -1) {
                            return 1
                        } else {
                            return 0.1
                        }
                    })
                plat1 = t.map(d => d.platform)
                plat = data_change.filter(p => (d.time.indexOf(p.time[0]) > -1 || p.time.indexOf(d.time[0]) > -1 || d.time == p.time) && plat1.indexOf(p.platform) > -1 && p.name != "").map(d => d.platform)

                link.style('opacity', function (x, j) {
                    if (plat.indexOf(j) > -1) {
                        return 0.5
                    } else {
                        return 0.1
                    }
                })
            })


        function diagonal_k(d, i) {
            var result = {
                source: [],
                target: []
            }
            var rel = horiz(d.hor)
            if (i < l) {
                result.source = [graph.width / 2 - 4 * pad - 10, graph.height / 2 - 10]
                result.target = [graph.width / 2 - mid - pad - 10 + rel, graph.height / l * i + graph.height / l / 2]
            } else {
                result.source = [graph.width / 2 + 4 * pad - 10, graph.height / 2 - 10]
                result.target = [graph.width / 2 + mid - pad + 0 - rel, graph.height / l * (i - l) + graph.height / l / 2]
            }
            return result
        }
        var maxAmount2 = d3.max(freq_key, function (d) {
            return +d.freq;
        });
        var scaler_width = d3.scaleLinear().range([5, 15]).domain([0, maxAmount2])

        var link = svg.selectAll("path_center")
            .data(freq_key)
            .enter().append("svg:path")
            .style('stroke', function (d, i) {
                return linkColors(d.relate)
            })
            .attr('stroke-width', function (d) {
                return scaler_width(d.freq)
            }).attr('d', function (d, i) {
                return diag(diagonal_k(d, i))
            })
            .style("fill", "none")
            .style("opacity", 0.5);

        function polygonPoints(d, i) {
            var h = graph.height / l;
            var w = graph.width / 2;
            var rel = horiz(d.hor)
            var points = "";
            var y = -10;
            if (i < l) {
                y += h * i + pad
                x = w - mid - pad + rel
                x1 = x - wid
                points += x1 + "," + y + ","
                points += x + "," + y + ","
                y = h * (i + 1) - 2 * pad
                x2 = x + s
                x3 = x1 + s
                points += x2 + "," + y + ","
                points += x3 + "," + y + ","
            } else {
                y += h * (i - l) + pad
                x1 = w + mid + pad - rel
                x2 = x1 + wid
                points += x2 + "," + y + ","
                points += x1 + "," + y + ","
                y = h * (i - l + 1) - 2 * pad
                x3 = x1 + s
                x4 = x2 + s
                points += x3 + "," + y + ","
                points += x4 + "," + y + ","
            }
            return points.substring(0, points.length - 1);
        }

        var keywords = svg.selectAll('text_key')
            .data(freq_key)
            .enter().append("svg:g")

        keywords.append('text')
            .attr("font-style", "italic")
            .attr("x", function (d, i) {
                console.log(d)
                var rel = horiz(d.hor)
                if (i < l) {
                    return graph.width / 2 - mid - pad - wid + rel
                } else {
                    return graph.width / 2 + mid + (12 - d.key.length) * pad + wid / 2 - rel
                }
            })
            .attr("y", function (d, i) {
                if (i < l) {
                    return graph.height / l * i + graph.height / l / 2
                } else {
                    return graph.height / l * (i - l) + graph.height / l / 2
                }
            })
            .text(d => d.key)
            .attr("font-size", 20)
            .style('opacity', 0.15)
            .on('mouseover', function (d, i) {
                sparkline.selectAll('polyline')
                    .style('opacity', function (x) {
                        if (d.key == x.key) {
                            return 1
                        } else {
                            return 0
                        }
                    })
            })
            .on('mouseleave', function (d, i) {
                sparkline.selectAll("polyline").style('opacity', 0)
            })


        text
            .append("rect")
            .style("fill", function (d, i) {
                // return "black";
                return platform_color[d.platform]
                // return linkColors(d.relate)
            })
            // .style("filter", "url(#md-shadow)")
            .style("opacity", function (d) {
                if (d.name === '') {
                    return 0
                }
                return 1
            })
            .attr("class", "bars")
            .attr("x", function (d, i) {
                // console.log(d)
                var rel = horiz(d.relate)
                x = 0
                if (d.position == 'left') {
                    x = 4 * pad + (wid) / pattern_length * d.index + 60 + s / d.length * d.time[Math.round(d.time.length / 2) - 1] + rel
                } else {
                    x = graph.width / 2 + mid + 3 * pad + wid / pattern_length * d.index + s / d.length * d.time[Math.round(d.time.length / 2) - 1] - rel
                }
                return x
            })
            .attr("y", function (d) {
                y = 0
                if (d.position == 'left') {
                    y = (graph.height) / l * d.platform + pad + ((graph.height) / l - 2 * pad) / d.length * d.time[Math.round(d.time.length / 2) - 1]
                } else {
                    y = (graph.height) / l * (d.platform - l) + pad + ((graph.height) / l - 2 * pad) / d.length * d.time[Math.round(d.time.length / 2) - 1]
                }
                let del = d.freq > 150 ? 20 : 10
                return y - del
            })
            .attr("width", function (d) {
                return scaler(d.freq) * d.name.length/2
            })
            .attr("height", function (d) {
                return scaler(d.freq) * 1.2
            })

        text.append('text')
            .attr("font-style", "italic")
            .attr("x", function (d, i) {
                var rel = horiz(d.relate)
                if (d.position == 'left') {
                    return 4 * pad + (wid) / pattern_length * d.index + 60 + s / d.length * d.time[Math.round(d.time.length / 2) - 1] + rel
                } else {
                    return graph.width / 2 + mid + 3 * pad + wid / pattern_length * d.index + s / d.length * d.time[Math.round(d.time.length / 2) - 1] - rel
                }
            })
            .attr("y", function (d) {
                if (d.position == 'left') {
                    return (graph.height) / l * d.platform + pad + ((graph.height) / l - 2 * pad) / d.length * d.time[Math.round(d.time.length / 2) - 1]
                } else {
                    return (graph.height) / l * (d.platform - l) + pad + ((graph.height) / l - 2 * pad) / d.length * d.time[Math.round(d.time.length / 2) - 1]
                }
            })
            .style('background-color', 'black')
            .style('position', 'static')
            .text(d => d.name)
            .attr("font-size", function (d) {
                return scaler(d.freq)
            })

    }
}

function histChart(data = []) {

    var tooltip = floatingTooltip('gates_tooltip', 240);
    var margin = {top: 50, right: 0, bottom: 20, left: 0},
        width = 1200 - margin.left - margin.right,
        height = 200 - margin.top - margin.bottom;

    const brush = d3.brushX()
        .extent([[margin.left, margin.top], [width, height + margin.bottom]])
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
        .domain([new Date("2021-06-11 00:00"), new Date("2021-06-19 00:00")])
        .range([0, width]);

    var xb = d3.scaleTime()
        .domain([0, width])
        .range([new Date("2021-06-11 00:00"), new Date("2021-06-19 00:00")]);


    function brushended() {
        brushScale = brushScaleBrush
        const selection = d3.event.selection;
        // console.log(selection)
        const start = xb(selection[0])
        const startDay = start.getDate()
        const startHour = start.getHours()

        const end = xb(selection[1])

        const endDay = end.getDate()
        const endHour = end.getHours()
        const time_index = {'110': 0, '113': 1, '116': 2, '119': 3, '1112': 4, '1115': 5, '1118': 6, '1121': 7, '120': 8, '123': 9, '126': 10, '129': 11, '1212': 12, '1215': 13, '1218': 14, '1221': 15, '130': 16, '133': 17, '136': 18, '139': 19, '1312': 20, '1315': 21, '1318': 22, '1321': 23, '140': 24, '143': 25, '146': 26, '149': 27, '1412': 28, '1415': 29, '1418': 30, '1421': 31, '150': 32, '153': 33, '156': 34, '159': 35, '1512': 36, '1515': 37, '1518': 38, '1521': 39, '160': 40, '163': 41, '166': 42, '169': 43, '1612': 44, '1615': 45, '1618': 46, '1621': 47, '170': 48, '173': 49, '176': 50, '179': 51, '1712': 52, '1715': 53, '1718': 54, '1721': 55, '180': 56, '183': 57, '186': 58, '189': 59, '1812': 60, '1815': 61, '1818': 62, '1821': 63, '190': 64, '193': 65, '196': 66, '199': 67, '1912': 68, '1915': 69, '1918': 70, '1921': 71}

        const ss = time_index[String(startDay) + String(startHour)]
        const ee = time_index[String(endDay) + String(endHour)]

        function update_data(ss, ee) {

            const mydata = []
            for (let i = 0; i < myrawdata.length; i++) {
                const d = myrawdata[i];
                if (d.time >= ss && d.time <= ee) {
                    mydata.push(d)
                }
            }
            myBubbleChart('#vis', mydata);
        }

        update_data(ss, ee)
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
            // console.log(d.created_at)
            return d.created_at - 8 * 3600 * 1000;
        })   // I need to give the vector of value
        .domain(x.domain())  // then the domain of the graphic
        .thresholds(x.ticks(200)); // then the numbers of bins

    // // And apply twice this function to data to get the bins.
    var bins1 = histogram(data.filter(function (d) {
        return d.type === "姜文华"
    }));
    var bins2 = histogram(data.filter(function (d) {
        return d.type === "王永珍"
    }));

    // // Y axis: scale and draw:
    var y = d3.scaleLinear()
        .range([height, 0])
        .domain([0, d3.max(bins1, function (d) {
            return d.length;
        })]);
    // d3.hist has to be called before the Y axis obviously

    // append the bars for series 1
    svg.selectAll("rect")
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
        .style("fill", "#fc9b9a")
        .style("opacity", 0.8)

    // // append the bars for series 2
    svg.selectAll("rect2")
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
        .style("fill", "#b4d5e3")
        .style("opacity", 0.8)

}
function selectWord1(m) {
    if(typeof m == 'undefined'){
        brushScale = brushScaleAll
        d3.select("#zyhKeyword").selectAll("rect").remove()
        d3.select("#zyhKeyword").selectAll("text").remove()
    }
    else{
        brushScale = brushScaleClick
        zyhKeyword = m
        d3.select("#zyhKeyword").selectAll("rect").remove()
        d3.select("#zyhKeyword").selectAll("text").remove()
        if (zyhKeySvg === null) {
            zyhKeySvg = d3.select("#zyhKeyword").append("svg")
                .attr('id', 'zyhkk').attr("height", 50).attr('position', 'absolute')
            // .attr('top', '50px')
        }
        zyhKeySvg.selectAll("rect_key")
            .data([zyhKeyword])
            .enter()
            .append("rect")
            .attr("x", 5)
            .attr("y", 5)
            .style('width', function (d) {
                return d.length * 11
            })
            .style("opacity", 0.5)
            .style('height', 30)
            .style('fill', '#91d0fa')
            .style('rx', 10)

        zyhKeySvg.selectAll("text_key")
            .data([zyhKeyword])
            .enter()
            .append("text")
            .attr("x", 10)
            .attr("y", 25)
            .text(function (d) {
                return d;
            })
            .attr('font-size', 15)
            .attr('font-family', "Gill Sans", "Gill Sans MT")
    }


    rawDataNew = []
    // }
    for (let i = 0; i < context_data.length; i++) {
        const currDic = context_data[i][m]
        for (let k in currDic) {
            rawDataNew.push({
                "name": k,
                "label": currDic[k].label,
                "count": currDic[k].count,
                "time": i + 1,
                "position": currDic[k].pos
            })
        }
//                 console.log(rawDataNew)
    }
//            console.log(rawDataNew)


    if(rawDataNew.length ==0){
        myBubbleChart('#vis', myrawdata)
    }
    else{
        myBubbleChart('#vis', rawDataNew)
    }
}
var svg = d3.select("#rect1").append("svg").attr("width", 1200).attr("height", 40)

// Add the path using this helper function
svg.append('rect')
    .attr('y', 20)
    .attr('width', 1200)
    .attr('height', 1.5)
    .attr('stroke', '#b4d5e3')
    .attr('fill', '#b4d5e3').style('opacity', 0.7);
// svg.append('image').attr("xlink:href", "sy.png")
//     .attr('x', 590)
//     .attr('width', 40)
//     .attr('height', 40)
//     .on('click',function(d){
//         backbutton.pop()
//         console.log(backbutton)
//         selectWord1(backbutton[backbutton.length-1])
//     })

// svg.append('text')
//     .attr("xlink:href", "biden.png")
//     .attr('x', 590)
//     .attr('width', 50)
//     .attr('height', 45)

var svg = d3.select("#rect2").append("svg").attr("width", 1200).attr("height", 40)
// Add the path using this helper function
svg.append('rect')
    .attr('y', 20)
    .attr('width', 1200)
    .attr('height', 1.5)
    .attr('stroke', '#fc9b9a')
    .attr('fill', '#fc9b9a');
// svg.append('image').attr("xlink:href", "dy.png")
//     .attr('x', 590)
//     .attr('width', 50)
//     .attr('height', 40)
//     .on('click', function (d) {
//         brushScale = brushScaleAll
//         d3.selectAll("#vis").attr('class', 'visible')
//         d3.selectAll("#vis1").attr('class', 'visible')
//         d3.selectAll("#vis_tree").attr('class', 'hidden')
//         d3.select("#zyhKeyword").selectAll("rect").remove()
//         d3.select("#zyhKeyword").selectAll("text").remove()
//         MyFilter['label'] = -1
//         myBubbleChart('#vis', myrawdata);
//     })
//
//
//
// var svg = d3.select("#rect1_new").append("svg").attr("width", 1200).attr("height", 40)
//
// // Add the path using this helper function
// svg.append('rect')
//     .attr('y', 20)
//     .attr('width', 1200)
//     .attr('height', 1.5)
//     .attr('stroke', '#b4d5e3')
//     .attr('fill', '#b4d5e3').style('opacity', 0.7);
// svg.append('image').attr("xlink:href", "biden.png")
//     .attr('x', 590)
//     .attr('width', 40)
//     .attr('height', 40)
//     .on('click', function (d) {
//         brushScale = brushScaleAll
//         d3.selectAll("#vis").attr('class', 'visible')
//         d3.selectAll("#vis1").attr('class', 'visible')
//         d3.selectAll("#vis_tree").attr('class', 'hidden')
//         myBubbleChart('#vis', myrawdata);
//     })
// svg.append('text')
//     .attr("xlink:href", "biden.png")
//     .attr('x', 590)
//     .attr('width', 50)
//     .attr('height', 45)

// var svg = d3.select("#rect2_new").append("svg").attr("width", 1200).attr("height", 40)
// // Add the path using this helper function
// svg.append('rect')
//     .attr('y', 20)
//     .attr('width', 1200)
//     .attr('height', 1.5)
//     .attr('stroke', '#fc9b9a')
//     .attr('fill', '#fc9b9a');
// svg.append('image').attr("xlink:href", "trump.png")
//     .attr('x', 590)
//     .attr('width', 50)
//     .attr('height', 40)
//     .on('click', function (d) {
//         brushScale = brushScaleAll
//         d3.selectAll("#vis").attr('class', 'visible')
//         d3.selectAll("#vis1").attr('class', 'visible')
//         d3.selectAll("#vis_tree").attr('class', 'hidden')
//         myBubbleChart('#vis', myrawdata);
//     })


// .attr('stroke', 'black')
// .attr('fill', '#b4d5e3');
let width = 1200;
let height = 450;
let centerX = null;
let XSize = 0;

let centerY = [1, height / 9, 2 * height / 9, 3 * height / 9, 4 * height / 9, 5 * height / 9, 6 * height / 9, 7 * height / 9, 8 * height / 9,
    height]

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

    var svg = null;

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

    simulation.stop();

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
            .range([10, 35])
            .domain([0, maxAmount]);
        fontScale = d3.scalePow()
            .exponent(0.4)
            .range([5, 25])
            .domain([0, maxAmount]);

        var myNodes = rawData
        if (MyFilter['label'] !== -1) {
            myNodes = myNodes.filter(function (d) {
                return d.label === MyFilter['label']
            })
        }

        const dateList = new Set()
        let min = 1000
        let max = 0
        // Use map() to convert raw data into node data.
        myNodes = myNodes.map(function (d) {
            if (d.name === '1') {
                console.log(d)
            }
            let cell = Math.round(d.position / 0.1);
            dateList.add(d.time)
            min = Math.min(min, d.time)
            max = Math.max(max, d.time)
            return {
                id: d.name,
                radius: radiusScale(+d.count/5),
                value: d.count,
                name: d.name,
                org: d.label,
                group: d.time,
                year: d.time,
                x: Math.random() * 900,
                y: d.position * 800,
                cen: cell > 9 ? 9 : cell,
                position: d.position,
                num: 1
            };
        });

        let base = (max - min) / 6
        if (base < 1) {
            base = 1
        }
        const groupList = [0, 1, 2, 3, 4, 5]

        // [
        //   [min day in range 1, max day in range 1], // range 1
        //   [min day in range 2, max day in range 2], // range 2
        //    ...
        //   [min day in range 6, max day in range 6]  // range 6
        // ]
        const groupRange = [[100, 0], [100, 0], [100, 0], [100, 0], [100, 0], [100, 0]]

        myNodes = myNodes.map(function (d) {
            var group = parseInt((d.group - min) / base);
            if (groupList.indexOf(group) == -1) {
                // console.log(d.group, group, min, base, dateList.size)
                group = 5
            }
            groupRange[group][0] = Math.min(groupRange[group][0], d.group)
            groupRange[group][1] = Math.max(groupRange[group][1], d.group)
            d.group = group
            return d;
        });


        const xArray = []
        for (let i = 0; i < groupList.length; i++) {
            xArray[i] = (i) * width / groupList.length

        }
        // console.log(xArray)
        // let sortedDates = Array.from(dateList).sort();
        centerX = {}
        for (let i = 0; i < groupList.length; i++) {
            centerX[groupList[i]] = xArray[i] + 100
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
    var svg = d3.select("#status")
    svg.append()
    var chart = function chart(selector, rawData) {

        splitBubbles()
        d3.select("#status").html("<div>No word is active</div>")

        // convert raw data into nodes data
        nodes = createNodes(rawData);
        const new_nodes = {}
        for (let i = 0; i < nodes.length; i++) {
            let d = nodes[i];
            var d_n = d.name + '-' + d.group;
            if (new_nodes[d_n]) {
                new_nodes[d_n].value += d.value;
                new_nodes[d_n].position += d.position;
                new_nodes[d_n].num += 1;
            } else {
                new_nodes[d_n] = d
            }
        }

        const new_nodes_array = []
        for (const nodesKey in new_nodes) {
            const node = new_nodes[nodesKey]
            node.value = parseInt(node.value / 1)
            node.position = node.position / node.num
            const cell = Math.round(node.position / 0.1);
            node.radius = radiusScale(+node.value / brushScale)
            node.cen = cell > 9 ? 9 : cell
            node.y = node.position * 800
            new_nodes_array.push(node)
        }


        nodes = new_nodes_array;
        d3.select('#bubble_svg').remove()
        // Create a SVG element inside the provided selector
        // with desired size.
        svg = d3.select(selector)
            .append('svg')
            .attr('id', 'bubble_svg')
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
            .attr('id', 'bubbles_all')
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
                return fontScale(d.value/ (d.name.length * brushScale));
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
        texts.on('click', click_bubble)
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
        function selectWord(m) {
            brushScale = brushScaleClick
            rawDataNew = []
            // }
            for (let i = 0; i < context_data.length; i++) {
                const currDic = context_data[i][m.name]
                for (let k in currDic) {
                    rawDataNew.push({
                        "name": k,
                        "label": currDic[k].label,
                        "count": currDic[k].count,
                        "time": i + 1,
                        "position": currDic[k].pos
                    })
                }
//                console.log(rawDataNew)
            }
//            console.log(rawDataNew ===[])
//            if(rawDataNew.length==0){
//                    alert('Nothing to explore!')
//                    return 0
//                }
            chart(selector, rawDataNew)

            active(m)
            hideDetail(null)
//            return 1
        }


//        activateWord = selectWord

        bubbles.on('click', click_bubble)

        function click_bubble(m) {
            if (bubbleMode === 1) {

                contextWordSelect = []
//                if(selectWord(m) ==1){
                selectWord(m)
                backbutton.push(m.name)
                zyhKeyword = m.name
                d3.select("#zyhKeyword").selectAll("rect").remove()
                d3.select("#zyhKeyword").selectAll("text").remove()
                if (zyhKeySvg === null) {
                    zyhKeySvg = d3.select("#zyhKeyword").append("svg")
                        .attr('id', 'zyhkk').attr("height", 50).attr('position', 'absolute')
                    // .attr('top', '50px')
                }
                zyhKeySvg.selectAll("rect_key")
                    .data([zyhKeyword])
                    .enter()
                    .append("rect")
                    .attr("x", 5)
                    .attr("y", 5)
                    .style('width', function (d) {
                        return d.length * 11
                    })
                    .style("opacity", 0.5)
                    .style('height', 30)
                    .style('fill', '#91d0fa')
                    .style('rx', 10)

                zyhKeySvg.selectAll("text_key")
                    .data([zyhKeyword])
                    .enter()
                    .append("text")
                    .attr("x", 10)
                    .attr("y", 25)
                    .text(function (d) {
                        return d;
                    })
                    .attr('font-size', 15)
                    .attr('font-family', "Gill Sans", "Gill Sans MT")
//                }

//                console.log(selectWord(m))
                // d3.select("#zyhKeyword").html("<span style='background-color: #2fa1d6'>"+zyhKeyword+"</span>")
// console.log(m)

            } else if (bubbleMode === 2) {



                if (!contextWordSelect.includes(m.name)) {
                    if (contextWordSelect.length > 5) {
                        alert("Words Exceeded!!")
                        return
                    }
                    let key_word = zyhKeyword

                    console.log(m, key_word)
                    if (dis_x[key_word].hasOwnProperty(m.name)) {
                        console.log(m, key_word)
                        if(!isNaN(dis_x[key_word][m.name])){
                            console.log(m, key_word)
                            contextWordSelect.push(m.name)
                        }

                    }
                    else{
                        alert("Words cannot choose!")
                        return
                    }

                } else {
                    contextWordSelect.splice(contextWordSelect.indexOf(m.name), 1)
                }

                draw_context(contextWordSelect)


            }
        }
    };


    function active(m) {
        bubbles.classed("bubble-selected", function (m) {
            return m.name
        })
        if (m.name.length > 0) {
            d3.select("#status").html("<div>The word <span class=\"active\">" + m.name + "</span> is now active \n</div>")
        } else {
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
                const padding = width / XSize/2.5;
                if (d.group === 0) {
                    d.x = Math.max(centerX[d.group] - padding, Math.min(centerX[d.group] + padding - 20, d.x))
                } else if (d.group === 5) {
                    d.x = Math.max(centerX[d.group] - padding + 30, Math.min(centerX[d.group] + padding - 30, d.x))
                } else {
                    d.x = Math.max(centerX[d.group] - padding, Math.min(centerX[d.group] + padding, d.x))

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
                d.y = Math.max(30, Math.min(height - 55, d.y))
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
            '<span class="name">Correlation degree: </span><span class="value">' +
            d.position +
            '</span>';

        tooltip.showTooltip(content, d3.event);
    }

    /*
     * Hides tooltip
     */
    function hideDetail(d) {
        if (d) {
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
    myrawdata = JSON.parse(data)
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
readTextFile('./data/wordCount_3.json', display)

readTextFile('./data/context_words_3.json', function (data) {
    context_data = JSON.parse(data)
})

readTextFile('./data/hist_3.json', function (data) {
    histChart(JSON.parse(data))
})

