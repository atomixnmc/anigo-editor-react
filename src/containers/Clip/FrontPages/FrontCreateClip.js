import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { connect, ReactReduxContext } from 'react-redux';
import lodash from 'lodash';
import Permissions from 'react-redux-permissions';
import {
  Route,
  Switch
} from 'react-router-dom';

import { Provider } from 'react-redux';
// import GoldenLayout from 'golden-layout';

import {
  GoldenLayoutComponent,
  ClipStructure,
  ClipView2D,
  ClipTimeline,
  ClipObjetNodeProperties,
  ClipPostProcessingGraph,
  CodeEditor
} from 'components';
import './FrontCreateClip.scss';

function wrapComponent(AComponent, store) {
  class WrappedComponent extends React.Component {
    render() {
      return (
        <Provider store={store}>
          <AComponent context={ReactReduxContext}/>
        </Provider>
      );
    }
  }
  return WrappedComponent;
}

@connect(
  state => ({
    user: state.auth.user
  }),
  {
  })
export default class FrontCreateClip extends React.Component {
  static propTypes = {
    user: PropTypes.object
  };

  constructor( props ) {
    super(props);
    this.layoutDomRef = React.createRef();
  }

  componentDidMount() {
  }

  render() {
    return (
      <div className ="fullPageLayout" ref={this.layoutDomRef}>
        <ReactReduxContext.Consumer>
          {({ store }) => {
            this.store = store;

            return (
              <GoldenLayoutComponent //config from simple react example: https://golden-layout.com/examples/#qZXEyv
                htmlAttrs={{ style: { height: "600px", width: "100%" } }}
                config={{
                  content: [{
                    type: 'row',
                    content: [{
                      type: 'react-component',
                      component: 'ClipStructure',
                      width: 20,
                      title: 'Structure',
                      props: {
                        store: store
                      }
                    }, {
                      type: 'column',
                      content: [{
                        type: 'stack',
                        content: [{
                          type: 'react-component',
                          component: 'CodeEditor',
                          height: 80,
                          title: 'Code'
                        },{
                          type: 'react-component',
                          component: 'ClipPostProcessingGraph',
                          height: 80,
                          title: 'PostProcessing'
                        },{
                          type: 'react-component',
                          component: 'ClipView2D',
                          height: 80,
                          title: 'View 2D'
                        }]
                      }, {
                        type: 'react-component',
                        component: 'ClipTimeline',
                        height: 20,
                        title: 'TimeLine'
                      }]
                    }, {
                      type: 'react-component',
                      component: 'ClipObjetNodeProperties',
                      width: 20,
                      title: 'Properties'
                    }]
                  }]
                }}
                registerComponents={layout => {
                  layout.registerComponent('ClipStructure', ClipStructure);
                  layout.registerComponent('ClipView2D', ClipView2D);
                  layout.registerComponent('ClipTimeline', ClipTimeline);
                  layout.registerComponent('ClipObjetNodeProperties', ClipObjetNodeProperties);
                  layout.registerComponent('ClipPostProcessingGraph', ClipPostProcessingGraph);
                  layout.registerComponent('CodeEditor', CodeEditor);
                }}
              />
            )
          }}
        </ReactReduxContext.Consumer>
      </div>
    );
  }
}
