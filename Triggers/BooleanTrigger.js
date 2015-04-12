/* Implementation in x3dom of the x3d BooleanTrigger */

x3dom.registerNodeType(
        "BooleanTrigger", 
        "Core",
        defineClass(x3dom.nodeTypes.X3DNode, 
            /**
             *BooleanToggle Constructor 
             **/

            function(ctx){
                x3dom.nodeTypes.BooleanTrigger.superClass.call(this, ctx);
                this.addField_SFTime(ctx, 'set_triggerTime', 0);
                this.addField_SFBool(ctx, 'triggerTrue', false);
            }, 
            {
                fieldChanged : function(fieldName){
                    if (fieldName == "set_triggerTime"){
                        this.postMessage("triggerTrue", true);
                    }
                }

            }
            )//defineClass
        );//registerNodeType 
