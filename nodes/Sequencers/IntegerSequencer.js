/* Implementation in x3dom for the x3d BooleanSequencer */ 

x3dom.registerNodeType(
        "IntegerSequencer", 
        "Core", 
        defineClass(x3dom.nodeTypes.X3DNode, 
            /** 
             * IntegerSequencer Constructor 
             */
            function(ctx){
                x3dom.nodeTypes.IntegerSequencer.superClass.call(this, ctx);
                /*this.addField_SFBool(ctx, 'next', false);          //outputOnly
                  this.addField_SFBool(ctx, 'previous', false);      //outputOnly
                  */
                this.addField_SFFloat(ctx, 'set_fraction', 0);     //inputOnly
                this.addField_SFInt32(ctx,'value_changed', false);  //outputOnly
                this.addField_MFFloat(ctx, 'key', []);             //inputOutput 
                this.addField_MFInt32(ctx, 'keyValue', []);         //inputOutput 
            }, 
            {
                fieldChanged: function(fieldName) {
                    function findValue(time, key, keyValue){
                        if (time <= key[0])
                            return keyValue[0];

                        else if (time >= key[key.length-1])
                            return keyValue[key.length-1];

                        for (var i = 0; i < key.length-1; ++i) {
                            if ((key[i] < time) && (time <= key[i+1])){
                                return keyValue[i];             
                            }
                        }
                    }
                    if(fieldName === "set_fraction") {
                        var value = findValue(this._vf.set_fraction, this._vf.key, this._vf.keyValue);
                        this.postMessage('value_changed', value);
                    }
                }
            }

)//defineClass
);//registerNodeType 
