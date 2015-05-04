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
// Implementation of a simple boolean or that accept 2 boolean value and returns and 'outputTrue' value. 


// ### BooleanOr ### 
x3dom.registerNodeType(
    "BooleanOr", 
    "Boolean ", 
    defineClass(x3dom.nodeTypes.X3DNode, 
      /*
       * BooleanOr Constructor
       */
    function (ctx) {
         x3dom.nodeTypes.BooleanOr.superClass.call(this, ctx);
         this.addField_SFBool('fistValue', false);
         this.addField_SFBool('secondValue', false);
         this.addField_SFBool('outputTrue', false);
         this.addField_SFBool('outputFalse', true);


    }, 
    {
        fieldChanged : function(fieldName){
            if (fieldName === "firstValue" || fieldName === "secondValue" ){
                 if (this._vf.firstValue == true || this._vf.secondValue == true){
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
/**
 * This x3domNode inherit from TimeSensor beacuse when the field 'startTime'
 * is greater than the current time the field 'isActive' of the sensor comes true . 
 **/ 

// ### DelaySensor ### 

x3dom.registerNodeType(
        "DelaySensor",
        "Time",
        defineClass(x3dom.nodeTypes.X3DSensorNode,

            /**
             * Constructor for TimeSensor
             * @constructs x3dom.nodeTypes.TimeSensor
             * @x3d 3.3
             * @component Time
             * @status full
             * @extends x3dom.nodeTypes.X3DSensorNode
             * @param {Object} [ctx=null] - context object, containing initial settings like namespace
             * @classdesc TimeSensor nodes generate events as time passes.
             */
            function (ctx) {
                x3dom.nodeTypes.DelaySensor.superClass.call(this, ctx);

                if (ctx)
            ctx.doc._nodeBag.timer.push(this);
                else
            x3dom.debug.logWarning("TimeSensor: No runtime context found!");


                /**
                 * The "cycle" of a TimeSensor node lasts for cycleInterval seconds. The value of cycleInterval shall be greater than zero.
                 * @var {x3dom.fields.SFTime} cycleInterval
                 * @range [0, inf]
                 * @memberof x3dom.nodeTypes.TimeSensor
                 * @initvalue 1
                 * @field x3d
                 * @instance
                 */
        this.addField_SFTime(ctx, 'cycleInterval', 1);


        /**
         * Specifies whether the timer cycle loops.
         * @var {x3dom.fields.SFBool} loop
         * @memberof x3dom.nodeTypes.TimeSensor
         * @initvalue false
         * @field x3d
         * @instance
         */
        this.addField_SFBool(ctx, 'loop', false);

        /**
         * Sets the startTime for the cycle.
         * @var {x3dom.fields.SFTime} startTime
         * @memberof x3dom.nodeTypes.TimeSensor
         * @initvalue 0
         * @field x3d
         * @instance
         */
        this.addField_SFTime(ctx, 'additionalDelay', 0);
        this.addField_SFTime(ctx, 'delay', 0);

        var now = new Date().getTime() / 1000 ;
        var totalDelay = this._vf.additionalDelay + this._vf.delay + now; 


        this.addField_SFTime(ctx, 'startTime', totalDelay);
        this.addField_SFTime(ctx, 'delayCompleteTime', totalDelay);
        this.addField_SFBool(ctx, 'delayComplete', false); 

        /**
         * Sets a time for the timer to stop.
         * @var {x3dom.fields.SFTime} stopTime
         * @memberof x3dom.nodeTypes.TimeSensor
         * @initvalue 0
         * @field x3d
         * @instance
         */
        this.addField_SFTime(ctx, 'stopTime', 0);

        /**
         * Sets a time for the timer to pause.
         * @var {x3dom.fields.SFTime} pauseTime
         * @memberof x3dom.nodeTypes.TimeSensor
         * @initvalue 0
         * @field x3d
         * @instance
         */
        this.addField_SFTime(ctx, 'pauseTime', 0);

        /**
         * Sets a time for the timer to resume from pause.
         * @var {x3dom.fields.SFTime} resumeTime
         * @memberof x3dom.nodeTypes.TimeSensor
         * @initvalue 0
         * @field x3d
         * @instance
         */
        this.addField_SFTime(ctx, 'resumeTime', 0);


        /**
         * A cycleTime outputOnly field can be used for synchronization purposes such as sound with animation.
         * The value of a cycleTime event will be equal to the time at the beginning of the current cycle. A cycleTime event is generated at the beginning of every cycle, including the cycle starting at startTime.
         * The first cycleTime event for a TimeSensor node can be used as an alarm (single pulse at a specified time).
         * @var {x3dom.fields.SFTime} cycleTime
         * @memberof x3dom.nodeTypes.TimeSensor
         * @initvalue 0
         * @field x3d
         * @instance
         */
        this.addField_SFTime(ctx, 'cycleTime', 0);

        /**
         * The elapsedTime outputOnly field delivers the current elapsed time since the TimeSensor was activated and running, cumulative in seconds and not counting any time while in a paused state.
         * @var {x3dom.fields.SFTime} elapsedTime
         * @memberof x3dom.nodeTypes.TimeSensor
         * @initvalue 0
         * @field x3d
         * @instance
         */
        this.addField_SFTime(ctx, 'elapsedTime', 0);

        /**
         * fraction_changed events output a floating point value in the closed interval [0, 1]. At startTime the value of fraction_changed is 0. After startTime, the value of fraction_changed in any cycle will progress through the range (0.0, 1.0].
         * @var {x3dom.fields.SFFloat} fraction_changed
         * @memberof x3dom.nodeTypes.TimeSensor
         * @initvalue 0
         * @field x3d
         * @instance
         */
        this.addField_SFFloat(ctx, 'fraction_changed', 0);

        /**
         * Outputs whether the timer is active.
         * @var {x3dom.fields.SFBool} isActive
         * @memberof x3dom.nodeTypes.TimeSensor
         * @initvalue false
         * @field x3d
         * @instance
         */
        this.addField_SFBool(ctx, 'isActive', false);

        /**
         * Outputs whether the timer is paused.
         * @var {x3dom.fields.SFBool} isPaused
         * @memberof x3dom.nodeTypes.TimeSensor
         * @initvalue false
         * @field x3d
         * @instance
         */
        this.addField_SFBool(ctx, 'isPaused', false);

        /**
         * The time event sends the absolute time for a given tick of the TimeSensor node.
         * @var {x3dom.fields.SFTime} time
         * @memberof x3dom.nodeTypes.TimeSensor
         * @initvalue 0
         * @field x3d
         * @instance
         */
        this.addField_SFTime(ctx, 'time', 0);


        /**
         *
         * @var {x3dom.fields.SFBool} first
         * @memberof x3dom.nodeTypes.TimeSensor
         * @initvalue true
         * @field x3dom
         * @instance
         */
        this.addField_SFBool(ctx,'first', true);

        /**
         *
         * @var {x3dom.fields.SFFloat} firstCycle
         * @memberof x3dom.nodeTypes.TimeSensor
         * @initvalue 0.0
         * @field x3dom
         * @instance
         */
        this.addField_SFFloat(ctx,'firstCycle', 0.0);

        this._prevCycle = -1;
        this._lastTime = 0;
        this._cycleStopTime = 0;
        this._activatedTime = 0;

        if (this._vf.startTime > 0) {
            this._updateCycleStopTime();
        }

        this._backupStartTime = this._vf.startTime;
        this._backupStopTime = this._vf.stopTime;
        this._backupCycleInterval = this._vf.cycleInterval;

            },
{
    tick: function (time)
    {
        if (!this._vf.enabled) {
            this._lastTime = time;
            return false;
        }
        
        var isActive = ( this._vf.cycleInterval > 0 &&
                time >= this._vf.startTime &&
                (time < this._vf.stopTime || this._vf.stopTime <= this._vf.startTime) &&
                (this._vf.loop == true || (this._vf.loop == false && time < this._cycleStopTime)) );

        if (isActive && !this._vf.isActive) {
            this.postMessage('isActive', true);
            this._vf.delayComplete = true; 
            this._vf.delayCompleteTime  = this._vf.startTime; 
            this.postMessage('delayComplete', true); 
            this.postMessage('delayCompleteTime', this._vf.startTime); 
            this._activatedTime = time;
        }

        // Checking for this._vf.isActive allows the dispatch of 'final events' (before deactivation)
        if (isActive || this._vf.isActive) {
            this.postMessage('elapsedTime', time - this._activatedTime);

            var isPaused = ( time >= this._vf.pauseTime && this._vf.pauseTime > this._vf.resumeTime );

            if (isPaused && !this._vf.isPaused) {
                this.postMessage('isPaused', true);
                this.postMessage('pauseTime', time);
            } else if (!isPaused && this._vf.isPaused) {
                this.postMessage('isPaused', false);
                this.postMessage('resumeTime', time);
            }

            if (!isPaused) {
                var cycleFrac = this._getCycleAt(time);
                var cycle = Math.floor(cycleFrac);

                var cycleTime = this._vf.startTime + cycle*this._vf.cycleInterval;
                var adjustTime = 0;

                if (this._vf.stopTime > this._vf.startTime &&
                        this._lastTime < this._vf.stopTime && time >= this._vf.stopTime)
                    adjustTime = this._vf.stopTime;
                else if (this._lastTime < cycleTime && time >= cycleTime)
                    adjustTime = cycleTime;

                if( adjustTime > 0 ) {
                    time = adjustTime;
                    cycleFrac = this._getCycleAt(time);
                    cycle = Math.floor(cycleFrac);
                }

                var fraction = cycleFrac - cycle;

                if (fraction < x3dom.fields.Eps) {
                    fraction = ( this._lastTime < this._vf.startTime ? 0.0 : 1.0 );
                    this.postMessage('cycleTime', time);
                }

                this.postMessage('fraction_changed', fraction);

                this.postMessage('time', time);
            }
        }

        if (!isActive && this._vf.isActive)
            this.postMessage('isActive', false);

        this._lastTime = time;

        return true;
    },

    fieldChanged: function(fieldName)
    {
        if (fieldName == "enabled") {
            // TODO; eval other relevant outputs
            if (!this._vf.enabled && this._vf.isActive) {
                this.postMessage('isActive', false);
            }
        }
        else if (fieldName == "isActive"){
             if (this._vf.isActive == true )
             this.postMessage("delayCompleteTime", this._vf.startTime);
        }
        else if (fieldName == "startTime") {
            // Spec: Should be ignored when active. (Restore old value)
            if (this._vf.isActive) {
                this._vf.startTime = this._backupStartTime;
                return;
            }

            this._backupStartTime = this._vf.startTime;
            this._updateCycleStopTime();
        }
        else if (fieldName == "stopTime") {
            // Spec: Should be ignored when active and less than startTime. (Restore old value)
            if (this._vf.isActive && this._vf.stopTime <= this._vf.startTime) {
                this._vf.stopTime = this._backupStopTime;
                return;
            }

            this._backupStopTime = this._vf.stopTime;
        }
        else if (fieldName == "cycleInterval") {
            // Spec: Should be ignored when active. (Restore old value)
            if (this._vf.isActive) {
                this._vf.cycleInterval = this._backupCycleInterval;
                return;
            }

            this._backupCycleInterval = this._vf.cycleInterval;
        }
        else if (fieldName == "loop") {
            this._updateCycleStopTime();
        }
    },

    parentRemoved: function(parent)
    {
        if (this._parentNodes.length === 0) {
            var doc = this.findX3DDoc();

            for (var i=0, n=doc._nodeBag.timer.length; i<n; i++) {
                if (doc._nodeBag.timer[i] === this) {
                    doc._nodeBag.timer.splice(i, 1);
                }
            }
        }
    },

    _getCycleAt: function(time)
    {
        return Math.max( 0.0, time - this._vf.startTime ) / this._vf.cycleInterval;
    },

    _updateCycleStopTime: function()
    {
        if (this._vf.loop == false) {
            var now = new Date().getTime() / 1000;
            var cycleToStop = Math.floor(this._getCycleAt(now)) + 1;

            this._cycleStopTime = this._vf.startTime + cycleToStop*this._vf.cycleInterval;
        }
        else {
            this._cycleStopTime = 0;
        }
    }
}
)//defineClass 
);//registerNodeType

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
/* Implementation in x3dom for the x3d BooleanSequencer */ 

x3dom.registerNodeType(
        "BooleanSequencer", 
        "Core", 
        defineClass(x3dom.nodeTypes.X3DNode, 
            /** 
             * BooleanSequencer Constructor 
             */
            function(ctx){
                x3dom.nodeTypes.BooleanSequencer.superClass.call(this, ctx);
            //    this.addField_SFBool(ctx, 'next', false);          //outputOnly
            //    this.addField_SFBool(ctx, 'previous', false);      //outputOnly
                this.addField_SFFloat(ctx, 'set_fraction', 0);     //inputOnly
                this.addField_SFBool(ctx,'value_changed', false);  //outputOnly
                this.addField_MFFloat(ctx, 'key', []);             //inputOutput 
                this.addField_MFBoolean(ctx, 'keyValue', []);         //inputOutput 
                console.log("ciao");
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
/* Implementation in x3dom of the x3d BooleanTrigger */

x3dom.registerNodeType(
        "BooleanTrigger", 
        "Triggers",
        defineClass(x3dom.nodeTypes.X3DTriggerNode,
            /**
             *BooleanTrigger Constructor 
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
/* Implementation in x3dom of the x3d X3DTriggerNode */ 


x3dom.registerNodeType(
    "X3DTriggerNode", 
    "Triggers", 
    defineClass(x3dom.nodeTypes.X3DChildNode, 
      /*
       * X3DTriggerNode Constructor
       */
    function (ctx) {
         x3dom.nodeTypes.X3DTriggerNode.superClass.call(this, ctx);
         
    }, 
    {
         
    }
    
    )//defineClass 
);//registerNodeType
