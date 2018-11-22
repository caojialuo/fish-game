export const d2a = (n)=>{
    return n*Math.PI/180;
}
export const a2d = (n)=>{
    return n/Math.PI*180;
}
export const random = (n,m)=>{
    return Math.floor(Math.random()*(n-m)+m)
}

export let JSON = {};
export let index = 0;
export const loadImg = (resource,progress,success)=>{
    var count=0;
    for(var i=0;i<resource.length;i++){
        var oImg = new Image();
        oImg.index = i;
        // (function(index){
            oImg.onload = function(){
                count++;     
                progress && progress(count,resource.length);
                if(count == resource.length){
                    success && success(JSON)
                }   
                JSON[resource[this.index]] = this
            }
        // })(i);
        oImg.src = './static/' + resource[i] + '.png';
    }
}