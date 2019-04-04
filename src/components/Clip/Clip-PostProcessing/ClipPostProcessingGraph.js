
import React, { Component } from 'react';
import {
  DiagramEngine,
  DiagramModel,
  DefaultNodeModel,
  LinkModel,
  DiagramWidget,
  DefaultLinkModel
} from "storm-react-diagrams";
import 'storm-react-diagrams/dist/style.min.css';
import './ClipPostProcessingGraph.scss';

export default class FrontCreateClip extends React.Component {
  constructor( props ) {
    super(props);
  }
  componentDidMount(){
    this.createDiagram();
  }
  createDiagram(){
    //1) setup the diagram engine
    var engine = new DiagramEngine();
    engine.installDefaultFactories();

    //2) setup the diagram model
    var model = new DiagramModel();

    //3-A) create a default node
    var node1 = new DefaultNodeModel("Node 1", "rgb(0,192,255)");
    let port1 = node1.addOutPort("Out");
    node1.setPosition(100, 100);

    //3-B) create another default node
    var node2 = new DefaultNodeModel("Node 2", "rgb(192,255,0)");
    let port2 = node2.addInPort("In");
    node2.setPosition(400, 100);

    // link the ports
    let link1 = port1.link(port2);
    link1.addLabel("Hello World!");

    //4) add the models to the root graph
    model.addAll(node1, node2, link1);

    //5) load model into engine
    engine.setDiagramModel(model);

    //6) render the diagram!
    this.engine = engine;
  }
  render(){
    
    return (
      this.engine ?
        <DiagramWidget className = "srd-graph-canvas" diagramEngine = { this.engine } />
        : 
        <div></div>
    );
  }
};