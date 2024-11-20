import React, { useEffect, useRef } from "react";
import * as d3 from "d3";

function TransactionGraph ( { transactions } )
{
  const svgRef = useRef();

  useEffect( () =>
  {
    if ( !transactions || transactions.length === 0 )
    {
      return;
    }

    // Prepare data
    const nodes = {};
    const edges = [];

    transactions.forEach( ( tx ) =>
    {
      // Ensure tx.from is an array
      const fromAddresses = Array.isArray( tx.from ) ? tx.from : [ tx.from ];
      // Ensure tx.to is an array
      const toAddresses = Array.isArray( tx.to ) ? tx.to : [ tx.to ];

      fromAddresses.forEach( ( from ) =>
      {
        if ( !nodes[ from ] )
        {
          nodes[ from ] = { id: from, type: "sender" };
        }
      } );

      toAddresses.forEach( ( to ) =>
      {
        if ( !nodes[ to ] )
        {
          nodes[ to ] = { id: to, type: "receiver" };
        }
      } );

      fromAddresses.forEach( ( from ) =>
      {
        toAddresses.forEach( ( to ) =>
        {
          edges.push( { source: from, target: to, ...tx } );
        } );
      } );
    } );


    const width = 800;
    const height = 600;

    const svg = d3
      .select( svgRef.current )
      .attr( "width", width )
      .attr( "height", height )
      .style( "border", "1px solid black" );

    svg.selectAll( "*" ).remove();

    // Tooltip creation
    const tooltip = d3
      .select( "body" )
      .append( "div" )
      .attr( "class", "tooltip" )
      .style( "position", "absolute" )
      .style( "background", "#fff" )
      .style( "padding", "5px" )
      .style( "border", "1px solid #ccc" )
      .style( "border-radius", "4px" )
      .style( "pointer-events", "none" )
      .style( "visibility", "hidden" )
      .style( "z-index", "1000" );

    const simulation = d3
      .forceSimulation( Object.values( nodes ) )
      .force(
        "link",
        d3
          .forceLink()
          .id( ( d ) => d.id )
          .distance( 50 )
      )
      .force( "charge", d3.forceManyBody().strength( -100 ) ) // Adjust charge strength
      .force( "center", d3.forceCenter( width / 2, height / 2 ) );

    const link = svg
      .append( "g" )
      .attr( "class", "links" )
      .selectAll( "line" )
      .data( edges )
      .enter()
      .append( "line" )
      .attr( "stroke", "gray" )
      .attr( "stroke-width", 2 )
      .attr( "pointer-events", "all" )
      .on( "mouseenter", ( event, d ) =>
      {
        tooltip.style( "visibility", "visible" ).html(
          `<strong>Transaction:</strong> ${ d.hash }<br>
           <strong>Amount:</strong> ${ d.amount } BTC<br>
           <strong>Block Height:</strong> ${ d.blockHeight }<br>
           <strong>Timestamp:</strong> ${ d.confirmed }<br>`
        );
      } )
      .on( "mousemove", ( event ) =>
      {
        tooltip
          .style( "top", `${ event.pageY + 5 }px` )
          .style( "left", `${ event.pageX + 5 }px` );
      } )
      .on( "mouseout", () =>
      {
        tooltip.style( "visibility", "hidden" );
      } );

    const node = svg
      .append( "g" )
      .attr( "class", "nodes" )
      .selectAll( "circle" )
      .data( Object.values( nodes ) )
      .enter()
      .append( "circle" )
      .attr( "r", 8 )
      .attr( "fill", ( d ) => ( d.type === "sender" ? "blue" : "green" ) )
      .attr( "pointer-events", "all" )
      .on( "mouseenter", ( event, d ) =>
      {
        tooltip
          .style( "visibility", "visible" )
          .html(
            `<strong>Wallet:</strong> ${ d.id }<br><strong>Type:</strong> ${ d.type }`
          );
      } )
      .on( "mousemove", ( event ) =>
      {
        tooltip
          .style( "top", `${ event.pageY + 5 }px` )
          .style( "left", `${ event.pageX + 5 }px` );
      } )
      .on( "mouseout", () =>
      {
        tooltip.style( "visibility", "hidden" );
      } )
      .call(
        d3
          .drag()
          .on( "start", dragStarted )
          .on( "drag", dragged )
          .on( "end", dragEnded )
      );

    simulation.nodes( Object.values( nodes ) ).on( "tick", () =>
    {
      link
        .attr( "x1", ( d ) => d.source.x )
        .attr( "y1", ( d ) => d.source.y )
        .attr( "x2", ( d ) => d.target.x )
        .attr( "y2", ( d ) => d.target.y );

      node.attr( "cx", ( d ) => d.x ).attr( "cy", ( d ) => d.y );

      // Constrain nodes within SVG bounds
      node.each( ( d ) =>
      {
        d.x = Math.max( 8, Math.min( width - 8, d.x ) );
        d.y = Math.max( 8, Math.min( height - 8, d.y ) );
      } );
    } );

    simulation.force( "link" ).links( edges );

    function dragStarted ( event, d )
    {
      if ( !event.active ) simulation.alphaTarget( 0.3 ).restart();
      d.fx = d.x;
      d.fy = d.y;
    }

    function dragged ( event, d )
    {
      d.fx = event.x;
      d.fy = event.y;
    }

    function dragEnded ( event, d )
    {
      if ( !event.active ) simulation.alphaTarget( 0 );
      d.fx = null;
      d.fy = null;
    }

    return () =>
    {
      simulation.stop();
      svg.selectAll( "*" ).remove();
      d3.select( ".tooltip" ).remove();
    };
  }, [ transactions ] );

  return <svg ref={ svgRef }></svg>;
}

export default TransactionGraph;
