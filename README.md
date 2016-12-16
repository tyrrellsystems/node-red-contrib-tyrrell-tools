# A collection of Node-RED Nodes

## Toggle node

This node has 2 payloads that are sent to the output based on the
incoming message. The incoming message should have a payload of 
true or false to trigger the appropiate output.

The 2 payloads can be dyamically changed by sending a message with a topic of "setOn" or 
"setOff" respectively.

## Counter node

This node increments a counter when it receives a message. The starting value and the 
amount the value is incremented can be set in config UI.

The value can also be locked to a preset value by sending a message with a payload of 
`true` and the topic set in the Preset Topic. This mode can be disabled again by 
sending a payload of `false` on the same topic.

The value can be reset by sending a message with the topic set in in the Reset Topic.