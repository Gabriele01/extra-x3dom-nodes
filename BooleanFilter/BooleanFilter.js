/* Implementation in x3dom for the x3d BooleanFilter */ 

x3dom.registerNodeType(
    "BooleanFilter",
    "Core",
    defineClass(x3dom.nodeTypes.X3DNode,
		/**  
		  *Constructor for BooleanFilter 
		  *
		*/
		function (ctx) {
			x3dom.nodeTypes.BooleanFilter.superClass.call(this, ctx);
			this.addField_SFBool(ctx, 'inputTrue', false );
			this.addField_SFBool(ctx, 'inputFalse', false);
            this.addField_SFBool(ctx, 'inputNegate', false);
            this.addField_SFBool(ctx, 'set_boolean', false); 
		}, 
		{
		fieldChanged : function(fieldName) 
		{	 
		     if ( fieldName == "set_boolean" ) { // set_boolean is the only field inputOnly
		        if (this._vf[fieldName] == true){
                    this.postMessage('inputNegate', false);
                    this.postMessage( 'inputTrue', true);
                    this.postMessage( 'inputFalse', false ); 
                }
                else {
                    this.postMessage('inputNegate', true);
                    this.postMessage('inputTrue', false);  
                    this.postMessage('inputFalse', true);
                }
        }
		
		}
        } 
    )
);
// REMOVE , only for testing 
function active(){
  $("#Trigger").attr("enable", true);
  $("#Trigger").attr("loop", true); 
}
