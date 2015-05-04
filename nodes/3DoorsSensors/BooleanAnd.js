// Implementation of a simple boolean and that accept 2 boolean value and returns and 'outputTrue' value. 


// ### BooleanAnd ### 
x3dom.registerNodeType(
    "BooleanAnd", 
    "Boolean ", 
    defineClass(x3dom.nodeTypes.X3DNode, 
      /*
       * BooleanAnd Constructor
       */
    function (ctx) {
         x3dom.nodeTypes.BooleanAnd.superClass.call(this, ctx);
         this.addField_SFBool('firstValue', false);
         this.addField_SFBool('secondValue', false);
         this.addField_SFBool('outputTrue', false);
         this.addField_SFBool('outputFalse', true);


    }, 
    {
        fieldChanged : function(fieldName){
            if (fieldName === "firstValue" || fieldName === "secondValue" ){
                 if (this._vf.firstValue == true && this._vf.secondValue == true){
                      this._vf.outputTrue = true ; 
                      this._vf.outputFalse= false ; 
                      this.postMessage("outputTrue", true); 
                      this.postMessage("outputFalse", false); 
                 }
                 else {
                      this._vf.outputTrue = false ; 
                      this._vf.outputFalse= true ; 
                      this.postMessage("outputTrue", false); 
                      this.postMessage("outputFalse", true); 
                      
                 }
            }

        }
    }
    
    )//defineClass 
);//registerNodeType
