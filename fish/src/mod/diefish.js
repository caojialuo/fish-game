import {d2a,gd,rnd,JSON} from './common';
import Fish from './fish';
export default class DieFish extends Fish{
    constructor(type){
        super(type);
        this.move();
    }
    move(){
        var timer = setInterval(()=>{
            this.cur++;
            if(this.cur == 4){
                this.cur = 0;
                clearInterval(timer);
            }
        },250)
    }
    draw(gd){
        let w = Fish.FISH_SIZE[this.type].w;
        let h = Fish.FISH_SIZE[this.type].h;
        gd.save();
        gd.translate(this.x,this.y);
        if(this.type<6){
            gd.scale(1.2,1.2)
        }else{
            gd.scale(0.6,0.6)
        }
        gd.rotate(d2a(this.rotate));
        if(this.rotate>90 && this.rotate<270) gd.scale(1,-1);
        gd.drawImage(
            JSON['fish'+this.type],
            0,(this.cur+4)*h,w,h,
            -w/2,-h/2,w,h
        )
        gd.restore();
    }
}