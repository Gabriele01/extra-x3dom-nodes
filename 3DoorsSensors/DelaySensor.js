/**
 * This x3domNode inherit from TimeSensor beacuse when the field 'startTime'
 * is greater than the current time the field 'isActive' of the sensor comes true . 
 **/ 

// ### DelaySensor ### 
x3dom.registerNodeType(
        "DelaySensor", 
        "Time",
        defineClass(x3dom.nodeTypes.TimeSensor, 

            function(ctx){
                x3dom.nodeTypes.DelaySensor.superClass.call(this, ctx);

                this.addField_SFTime(ctx, 'additionalDelay', 0);
                this.addField_SFTime(ctx, 'delay', 0);

                var now = new Date().getTime() / 1000 ;
                var totalDelay = this._vf.additionalDelay + this._vf.delay + now; 
                
                this._vf.startTime = totalDelay ; 
                this._vf.loop = true ; 

                this._updateCycleStopTime();

                this._backupStartTime = this._vf.startTime;
                this._backupStopTime = this._vf.stopTime;

            }, 
            {

            }

)//defineClass 
);//registerNodeType

