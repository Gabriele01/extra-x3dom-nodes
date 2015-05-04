/*Implementation in x3dom of the x3d TimeTrigger */ 

// ### TimeTrigger ### 
x3dom.registerNodeType(
    "TimeTrigger", 
    "Triggers", 
    defineClass(x3dom.nodeTypes.X3DTriggerNode, 
      /*
       * TimeTrigger Constructor
       * 
       */
    function (ctx) {
         x3dom.nodeTypes.TimeTrigger.superClass.call(this, ctx);
         this.addField_SFBool(ctx, 'set_boolean', false);
         //this.addField_SFTime(ctx, 'triggerTime', 0);
         this.ctx = ctx ;
    }, 
    {
        fieldChanged : function(fieldName){
            // TimeTrigger converts a boolean event into a time event 
            // when a set_boolean is received it modifies the triggerTime in the current time 
             if (fieldName == "set_boolean"){
                 var now = new Date().getTime() / 1000 ;
                 if (this._vf['triggerTime']== undefined ){
                  console.log(now);
                  this.addField_SFTime(this.ctx, 'triggerTime', now);
                 }
                 else {
                      this.postMessage("triggerTime", now);
                 }

             }
        }
    }
    
    )//defineClass 
);//registerNodeType
