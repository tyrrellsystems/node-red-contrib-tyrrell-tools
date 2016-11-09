/**
 * Copyright 2016 IBM Corp.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 **/

module.exports = function(RED) {
  "use strict";

  function counter(n) {
  	RED.nodes.createNode(this, n);
    this.start = parseFloat(n.start);
  	this.increment = parseFloat(n.increment);
  	this.name = n.name;
    this.presetValue = parseFloat(n.preset);
    this.presetTopic = n.presetTopic;
    this.resetTopic = n.resetTopic;
  	this.topic = n.topic;
  	this.value = this.start;

    this.preset = false;

  	var node = this;

  	this.on('input', function(msg) {
      if (msg.hasOwnProperty('topic') && msg.topic === node.resetTopic) {
        node.value = node.start;
        node.send({
          topic:msg.topic,
          payload: node.value
        });
      } else if (msg.hasOwnProperty('topic') && msg.topic === node.presetTopic) {
        if (msg.hasOwnProperty('payload') && (typeof msg.payload === 'boolean' || typeof msg.payload === 'number')) {
          if (msg.payload) {
            node.preset = true;
          } else {
            node.preset = false;
          }
          if (node.preset) {
            node.send({
              topic:msg.topic,
              payload: node.presetValue
            });
          } else {
            node.send({
              topic:msg.topic,
              payload: node.value
            });
          }
        }
      } else if (node.preset) {
        node.send({
          topic:msg.topic,
          payload: node.presetValue
        });
      } else {
        //console.log(msg.payload);
    		if (msg.hasOwnProperty('payload') && (typeof msg.payload === 'boolean' || typeof msg.payload === 'number')) {
    			if (msg.payload) {
    				node.value += node.increment;
    			} else {
    				node.value -= node.increment;
    			}
          //console.log(node.value);
    			node.send({
    				topic:msg.topic,
    				payload: node.value
    			});
    		}
      }
  	});
  }

  RED.nodes.registerType("counter", counter); 
};