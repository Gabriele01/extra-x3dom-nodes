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
         this.addField_SFBool('inputTrue', false);
         this.addField_SFBool('inputFalse', true);


    }, 
    {
        fieldChanged : function(fieldName){
            if (fieldName === "firstValue" || fieldName === "secondValue" ){
                 if (this._vf.firstValue == true && this._vf.secondValue == true){
                      this._vf.inputTrue = true ; 
                      this._vf.inputFalse= false ; 
                      this.postMessage("inputTrue", true); 
                      this.postMessage("inputFalse", false); 
                 }
                 else {
                      this._vf.inputTrue = false ; 
                      this._vf.inputFalse= true ; 
                      this.postMessage("inputTrue", false); 
                      this.postMessage("inputFalse", true); 
                      
                 }
            }

        }
    }
    
    )//defineClass 
);//registerNodeType
