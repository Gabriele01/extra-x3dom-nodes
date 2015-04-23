// ### DistanceSensor ### 
x3dom.registerNodeType(
        "DistanceSensor", 
        "3DoorsSensor", 
        defineClass(x3dom.nodeTypes.X3DNode, 
            /*
             * DistanceSensor Constructor
             */
            function (ctx) {
                x3dom.nodeTypes.DistanceSensor.superClass.call(this, ctx);

                this.addField_SFBool(ctx, 'enabled', true);
                this.addField_SFBool(ctx, 'negated', false);
                this.addField_SFBool(ctx, 'triggerEvent', false);
                this.addField_SFFloat(ctx, 'distance', 0.0); 
                this.addField_SFVec3f(ctx, 'element1Coordinates', 0, 0, 0);
                this.addField_SFVec3f(ctx, 'element2Coordinates', 0, 0, 0);


            }, 
            {
                fieldChanged : function (fieldName) {
                    if (fieldName == "element1Coordinates" || fieldName == "element2Coordinates" )
                        this.calculateDistance();     

                }, 
                calculateDistance : function(){ 
                    var coord1 = this._vf.element1Coordinates; 
                    var coord2 = this._vf.element2Coordinates; 

                    var newDistance = Math.pow((coord1.x - coord2.x), 2) + Math.pow((coord1.y - coord2.y), 2) + Math.pow((coord1.z - coord2.z),2); 
                    newDistance = Math.sqrt(newDistance); 

                    if (!this._vf.negate){
                        if (this._vf.distance >= newDistance ) {
                            this._vf.triggerEvent = true; 
                            this.postMessage("triggerEvent", true); 
                        }
                        else {
                            this._vf.triggerEvent = false ; 
                            this.postMessage("triggerEvent", false); 
                        }
                    }

                    else {
                        if (this._vf.distance >= newDistance ) {
                            this._vf.triggerEvent = false; 
                            this.postMessage("triggerEvent", false); 
                        }
                        else {
                            this._vf.triggerEvent = true ; 
                            this.postMessage("triggerEvent", true); 
                        }

                    }


                }
            }


)//defineClass 
);//registerNodeType
