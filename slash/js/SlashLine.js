var SlashLine = SlashLine || {};

SlashLine = {

  id: null,
  definition : {
      upperEnd: null,
      lowerEnd: null,
      gradient: null,
      intercept: null
  },

  pickTime: function(timeRange){
    var time = (Number((Math.random()*(timeRange[1]-timeRange[0])).toFixed(0)) + timeRange[0]) / 5;
    // console.log("time is: " + time);
    return time;
  },

  generateObjects: function(timeRange, maxDistance){
    var flyingObjects = [];
    var time = this.pickTime(timeRange);
    var numOfObjects = Math.ceil(Math.random()*4);
    for (i=1; i<= numOfObjects; i++){
      flyingObject = Object.create(FlyingObject);
      flyingObject.id = i;
      flyingObject.origin = this.generateOrigin();
      flyingObject.time = time;
      flyingObject.pickDisplacement(maxDistance);
      flyingObject.pickSpeed();
      flyingObject.materialise();
      flyingObjects.push(flyingObject);
    }
    return flyingObjects;
  },

  generateOrigin: function(){
    // var margin = 30;
    var dtop = Math.round(Math.random()*(this.lowerEnd.top - this.upperEnd.top));
    var origin = [this.upperEnd.top + dtop, ((this.upperEnd.top + dtop) + this.intercept) / this.gradient];
    // console.log(origin);
    return origin;
  },

  strike: function(flyingObjects){
    $.each(flyingObjects, function(index, flyingObject){
      var x = flyingObject.physicalBody.offset().left;
      var y = flyingObject.physicalBody.offset().top;
      var striked = (y + this.intercept) / x;
      Math.abs(striked - this.gradient) < 0.04 ? console.log("Dead cat!") : console.log("miss!" + striked);
    })
  }
}