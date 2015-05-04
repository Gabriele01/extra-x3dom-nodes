/* Implementation in x3dom for the x3d BooleanToggle */ 

x3dom.registerNodeType(
        "BooleanToggle", 
        "Core",
        defineClass(x3dom.nodeTypes.X3DNode, 
            /**
             * BooleanToggle Constructor 
             */

            function(ctx){
                x3dom.nodeTypes.BooleanToggle.superClass.call(this, ctx);
                this.addField_SFBool(ctx, 'toggle', false);
                this.addField_SFBool(ctx, 'set_boolean', false);
            }
            , 

            {
                fieldChanged : function(fieldName){
                    if (fieldName == "set_boolean"){
                        if(this._vf[fieldName] == true ){
                            if(this._vf['toggle']==true)
            this.postMessage('toggle', false)
                            else 
            this.postMessage('toggle', true );
                        }
                    }

                }
            }

)//defineClass
);//registerNodeType
