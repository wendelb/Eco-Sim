import $ from 'jquery';
import * as d3 from 'd3';

﻿$(() => {

    // Array mit den Werten
    const NumberOfPeople = 45;

    var people = new Array(NumberOfPeople);
    for (let i = 0; i < NumberOfPeople; i++) {
        people[i] = { item: (i + 1), money: NumberOfPeople, bar: false };
    }

    var svg1 = d3.select('svg#svg1');
    var svg2 = d3.select('svg#svg2');
    var run = d3.select('#run');

    // Same for both
    const margin = { top: 20, right: 20, bottom: 30, left: 40 };
    const width = +svg1.attr("width") - margin.left - margin.right;
    const height = +svg1.attr("height") - margin.top - margin.bottom;

    // Setup Axis
    var x = d3.scaleBand().rangeRound([0, width]).padding(0.1);
    var y = d3.scaleLinear().rangeRound([height, 0]);

    x.domain(people.map((d) => { return "" + d.item; }));
    y.domain([0, NumberOfPeople * 3]);

    // Setup the chart
    const setupChart = (svg) => {
        var g = svg.append("g")
            .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

        // Bottom-Axis
        g.append("g")
        .attr("class", "axis axis--x")
        .attr("transform", "translate(0," + height + ")")
        .call(d3.axisBottom(x));

        // Left-Axis
        g.append("g")
            .attr("class", "axis axis--y")
            .call(d3.axisLeft(y).ticks(10));

        return g;
    }
    var g1 = setupChart(svg1);
    var g2 = setupChart(svg2);


    // Redraw-Function to apply all the changes to the chart
    const redraw = function (svgGroup) {
        // Data
        var chart = svgGroup.selectAll(".bar")
          .data(people, (d) => { return "" + d.item })
            .attr("y", function (d) { return y(d.money); })
            .attr("height", function (d) { return height - y(d.money); });

        // New people
        chart.enter().append("rect")
            .attr("class", "bar")
            .attr("x", (d) => { return x(d.item); })
            .attr("y", (d) => { return y(d.money); })
            .attr("width", x.bandwidth())
            .attr("height", (d) => { return height - y(d.money); });

        // Remove people (doesn't happen)
        chart.exit().remove();
    }

    // Generates an Axis with the supplied data
    const getSortedAxis = function (data) {
        return x.domain(data.map((d) => { return d.item; })).copy();
    }


    // Basically same as redraw() but it sorts the data and redraws the x-axis
    const redraw2 = function (svgGroup) {
        var data = people.sort((a, b) => { return b.money - a.money; });
        var x0 = getSortedAxis(data);

        // Redraw Axis
        svgGroup.select('.axis--x').call(d3.axisBottom(x0));

        // Redraw Data
        var chart = svgGroup.selectAll(".bar")
          .data(data, (d) => { return "" + d.item })
            .attr("x", (d) => { return x0(d.item); })
            .attr("y", (d) => { return y(d.money); })
            .attr("height", (d) => { return height - y(d.money); });

        // New people
        chart.enter().append("rect")
            .attr("class", "bar")
            .attr("x", (d) => { return x0(d.item); })
            .attr("y", (d) => { return y(d.money); })
            .attr("width", x.bandwidth())
            .attr("height", (d) => { return height - y(d.money); });

        // Remove people (doesn't happen)
        chart.exit().remove();
    }

    // Generate the next step
    // This function changes the people data
    const nextStep = function () {
        // Uncomment this for some fun!
        // people[Math.floor(Math.random() * NumberOfPeople)].money = Math.floor(Math.random() * 100);

        // Every person with money gives 1 Dollar to a random guy
        for (let i = 0; i < NumberOfPeople; i++) {
            if (people[i].money > 0) {
                people[i].money--;
                people[Math.floor(Math.random() * NumberOfPeople)].money++;
            }
        }
    };


    // The iteration counter
    var iterationCount = 0;

    // This function executes all the work via Timer.
    const tick = function () {
        // Update
        nextStep();

        // Draw
        redraw(g1);
        redraw2(g2);

        // Iteration Counter
        iterationCount++;
        run.text(iterationCount);

        // Enqueue next Iteration
        setTimeout(tick, 1);
    }

    // And run it!
    tick();
});
