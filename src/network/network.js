require('./network.css');
const d3 = require('d3');
const stories = require( '../stories.js');
const INITIAL_STORY_ID = require('./initial.js');

function get_edges_from_nodes(nodes)
{
  let edges = [];

  nodes.forEach(node => {
    node.transitions.next.forEach(data => {
      edges.push({parent: node.id, type: 'next', source: node.id, target: data.id});
    });

    node.transitions.prev.forEach(data => {
      edges.push({parent: node.id, type: 'prev', source: node.id, target: data.id});
    })
  })

  return edges;
}

let svg_node = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
document.body.appendChild(svg_node);

let width = window.innerWidth;
let height = window.innerHeight;

function linkArc(d) {
  const r = Math.hypot(d.target.x - d.source.x, d.target.y - d.source.y);
  return `
    M${d.source.x},${d.source.y}
    A${r},${r} 0 0,1 ${d.target.x},${d.target.y}
  `;
}

var svg = d3.select("svg")
  .attr('width', width)
  .attr('height', height);

svg.append('text')
  .attr('class', 'graph-title')
  .attr('x', 10)
  .attr('y', 35)
  .text('Ray Story Structure');

svg.append('defs').append('marker')
  .attr('id', 'arrowhead')
  .attr('viewBox', '-0 -5 10 10')
  .attr('refX', 13)
  .attr('refY', 0)
  .attr('orient', 'auto')
  .attr('markerWidth', 13)
  .attr('markerHeight', 13)
  .attr('xoverflow', 'visible')
  .append('svg:path')
  .attr('d', 'M 0,-5 L 10 ,0 L 0,5')
  .attr('fill', '#fff')
  .style('stroke', 'none');

var simulation = d3.forceSimulation()
  .force('link', d3.forceLink().id(d => d.id).distance(65).strength(0.5))
  .force('charge', d3.forceManyBody())
  .force('center', d3.forceCenter(width / 2, height / 2))
  .alphaTarget(0.4);

let edges = get_edges_from_nodes(stories)

var link = svg.append('g')
  .attr('class', 'links')
  .selectAll('path')
  .data(edges)
  .enter()
  .append('path')
  .classed('link', true)
  .classed('prev', d => d.type == 'prev')
  .classed('next', d => d.type == 'next')
  .attr('marker-end', 'url(#arrowhead)')

var node = svg.append('g')
  .attr('class', 'nodes')
  .selectAll('g')
  .data(stories)
  .enter()
  .append('g');

var circles = node.append('circle')
  .attr('r', 8)
  .attr('fill', d => {
    if (d.id == INITIAL_STORY_ID)
    {
      return '#ff0';
    }
    else if (d.transitions.next.length == 0 && d.transitions.prev.length == 0)
    {
      return '#f00';
    }
    else
    {
      return '#fff';
    }
  })
  .call(d3.drag()
    .on('start', dragstarted)
    .on('drag', dragged)
    .on('end', dragended));

var labels = node.append('text')
  .classed('text-id', true)
  .text(d => d.id)
  .attr('x', 20)
  .attr('y', 10);

// var sublabels = node.append('text')
//   .classed('text-info', true)
//   .text(d => d.text.slice(0,50) + '...')
//   .attr('x', 20)
//   .attr('y', 30);

node.append('title')
  .text(d => d.id);

simulation
  .nodes(stories)
  .on('tick', ticked);

simulation
  .force('link')
  .links(edges);

function ticked ()
{
  link
    .attr('d', linkArc);

  node
    .attr('transform', d => `translate(${d.x}, ${d.y})`);
}

function dragstarted(event, d)
{
  if (!event.active) simulation.alphaTarget(0.5).restart();

  event.subject.fx = event.subject.x;
  event.subject.fy = event.subject.y;
}

function dragged(event, d)
{
  event.subject.fx = event.x;
  event.subject.fy = event.y;
}

function dragended(event, d)
{
  if (!event.active) simulation.alphaTarget(0);

  event.subject.fx = null;
  event.subject.fy = null;
}

console.log(edges);

window.addEventListener('resize', () => {
  width = window.innerWidth;
  height = window.innerHeight
  svg
    .attr('width', width)
    .attr('height', height);

  simulation.force('center', d3.forceCenter( width / 2,  height / 2));
})
