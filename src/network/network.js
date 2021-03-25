require('./network.css');
const d3 = require('d3');
import stories from '../stories.js';

const INITIAL = 'door';

function get_edges_from_nodes(nodes)
{
  let edges = [];

  nodes.forEach(node => {
    node.transitions.next.forEach(id => {
      edges.push({parent: node.id, type: 'next', source: node.id, target: id});
    });

    node.transitions.prev.forEach(id => {
      edges.push({parent: node.id, type: 'prev', source: node.id, target: id});
    })
  })

  return edges;
}

let svg_node = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
document.body.appendChild(svg_node);

let width = window.innerWidth;
let height = window.innerHeight;

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
  .force('link', d3.forceLink().id(d => d.id).distance(150).strength(1))
  .force('charge', d3.forceManyBody())
  .force('center', d3.forceCenter(width / 2, height / 2));

let edges = get_edges_from_nodes(stories)

var link = svg.append('g')
  .attr('class', 'links')
  .selectAll('line')
  .data(edges)
  .enter()
  .append('line')
  .attr('class', 'link')
  .attr('marker-end', 'url(#arrowhead)')

var node = svg.append('g')
  .attr('class', 'nodes')
  .selectAll('g')
  .data(stories)
  .enter()
  .append('g');

var circles = node.append('circle')
  .attr('r', 8)
  .attr('fill', d => d.id === INITIAL ? '#ff0' : '#fff')
  .call(d3.drag()
    .on('start', dragstarted)
    .on('drag', dragged)
    .on('end', dragended));

var labels = node.append('text')
  .text(d => d.id)
  .attr('x', 20)
  .attr('y', 10);

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
    .attr('x1', d => d.source.x)
    .attr('y1', d => d.source.y)
    .attr('x2', d => d.target.x)
    .attr('y2', d => d.target.y)

  node
    .attr('transform', d => `translate(${d.x}, ${d.y})`);
}

function dragstarted(event, d)
{
  if (!event.active) simulation.alphaTarget(0.3).restart();

  d.fx = d.x;
  d.fy = d.y;
}

function dragged(event, d)
{
  d.fx = event.x;
  d.fy = event.y;
}

function dragended(event, d)
{
  if (!event.active) simulation.alphaTarget(0);

  d.fx = null;
  d.fy = null;
}

console.log(edges);

window.addEventListener('resize', () => {
  simulation.force('center', d3.forceCenter(window.innerWidth / 2, window.innerHeight / 2));
})
