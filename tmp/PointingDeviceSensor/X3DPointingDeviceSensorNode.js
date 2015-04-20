/** @namespace x3dom.nodeTypes */
/*
 * X3DOM JavaScript Library
 * http://www.x3dom.org
 *
 * (C)2009 Fraunhofer IGD, Darmstadt, Germany
 * Dual licensed under the MIT and GPL
 */

/**
 * The abstract pointing device sensor node class serves as a base class for all pointing device sensors.
 * Pointing device sensors catch pointing device events from all sibling nodes.
 */

x3dom.registerNodeType(
    "X3DPointingDeviceSensorNode",
    "PointingDeviceSensor",
    defineClass(x3dom.nodeTypes.X3DSensorNode,

        /**
         * Constructor for X3DPointingDeviceSensorNode
         * @constructs x3dom.nodeTypes.X3DPointingDeviceSensorNode
         * @x3d 3.3
         * @component PointingDeviceSensor
         * @status experimental
         * @extends x3dom.nodeTypes.X3DSensorNode
         * @param {Object} [ctx=null] - context object, containing initial settings like namespace
         * @classdesc An abstract base class for all pointing device sensor nodes.
         */
        function (ctx)
        {
            x3dom.nodeTypes.X3DPointingDeviceSensorNode.superClass.call(this, ctx);

            //---------------------------------------
            // FIELDS
            //---------------------------------------

            //route-able output fields
            //this.addField_SFBool(ctx, 'isOver', false);
            this.addField_SFBool(ctx, 'isActive', false);
            this.addField_SFBool(ctx, 'enabled', true);
            this.addField_SFString(ctx, 'description', "");
            this.addField_SFBool(ctx, 'isOver', false);
            ctx.xmlNode.parentNode.addEventListener('mousedown', this.handleMouseDown, false);
            ctx.xmlNode.parentNode.addEventListener('mouseup', this.handleMouseUp, false);
            ctx.xmlNode.parentNode.addEventListener('mouseover', this.handleMouseOver, false);
            ctx.xmlNode.parentNode.addEventListener('mouseout', this.handleMouseOut, false);

            //---------------------------------------
            // PROPERTIES
            //---------------------------------------
        },
        {
            handleMouseDown: function (){
                for(var i=0; i < this.childNodes.length ; i++){
                    var node = this.childNodes[i];
                    if (node.tagName === "TouchSensor")
                        node.pointerPressedOverSibling();
                    }
                },

            handleMouseUp: function(){
                for(var i=0; i < this.childNodes.length ; i++){
                    var node = this.childNodes[i];
                    if (node.tagName === "TouchSensor")
                        node.pointerReleased();
                        
                    }
            },
            
            handleMouseOver : function(){
                for(var i=0; i < this.childNodes.length ; i++){
                    var node = this.childNodes[i];
                    if (node.tagName === "TouchSensor")
                        node.pointerMovedOver();
                    }
            }, 

            handleMouseOut : function(){
                for(var i=0; i < this.childNodes.length ; i++){
                    var node = this.childNodes[i];
                    if (node.tagName === "TouchSensor")
                        node.pointerMovedOut();
                    }
            }, 
            //----------------------------------------------------------------------------------------------------------------------
            // PUBLIC FUNCTIONS
            //----------------------------------------------------------------------------------------------------------------------

            /**
             * Function that gets called if the pointing device has been pressed over a sibling node of this sensor
             * @param {DOMEvent} event - the pointer event
             * @private
             */
            pointerPressedOverSibling: function()
            {
                if (this._vf.enabled)
                {
                    this._vf.isActive = true;
                    this.postMessage('isActive', true);
                }
            },
            

            //----------------------------------------------------------------------------------------------------------------------

            /**
             * Function that gets called if the pointing device has been moved,
             * after it has been pressed over a sibling of this node
             * @param {DOMEvent} event - the pointer event
             * @private
             */
            pointerMoved: function(event)
            {

            },

            //----------------------------------------------------------------------------------------------------------------------

            /**
             * Function that gets called if the pointing device has entered a sibling of this node.
             * @param {DOMEvent} event - the pointer event
             */
            pointerMovedOver: function(event)
            {
                if (this._vf.enabled)
                {
                    this.postMessage('isOver', true);
                }
            },

            //----------------------------------------------------------------------------------------------------------------------

            /**
             * Function that gets called if the pointing device has left a sibling of this node.
             * @param {DOMEvent} event - the pointer event
             */
            pointerMovedOut: function(event)
            {
                if (this._vf.enabled)
                {
                    this.postMessage('isOver', false);
                }
            },

            //----------------------------------------------------------------------------------------------------------------------

            /**
             * Function that gets called if the pointing device has been released,
             * after it has been pressed over a sibling of this node
             * @private
             */
            pointerReleased: function()
            {
                if (this._vf.enabled)
                {
                    this._vf.isActive = false;
                    this.postMessage('isActive', false);
                }
            }

            //----------------------------------------------------------------------------------------------------------------------
        }
    )
);
