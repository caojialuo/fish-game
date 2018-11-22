import {d2a,a2d,random,JSON} from './common';

export default class Gold{
    constructor(type){
        this.type  = type || 1;
        this.cur = 0;
        this.speed = 10;
        this.s = 1;
        this.move();
    }
    move(){
        this.timer = setInterval(()=>{
            this.cur++;
            if (this.cur == 10) {
                this.cur = 0;
            }
        },50)
    }
    draw(gd){
        let w = 60;
        let h = 60;
        let a = 0;
        let x = 90 - a2d(Math.atan2(this.y-580,this.x-70));
        this.speed = Math.sqrt((this.y-580)*(this.y-580)+(this.x-70)*(this.x-70))*0.05
        gd.save();
        gd.translate(this.x-=this.speed*Math.sin(d2a(x)),this.y-=this.speed*Math.cos(d2a(x)));
        gd.rotate(d2a(a++));
        gd.scale(this.s,this.s)
        gd.drawImage(
            JSON['coinAni'+this.type],
            0,(this.cur)*h,w,h,
            -w/2,-h/2,w,h
        )
        gd.restore();
        this.s *=  0.98;
    }
    clear(){
        clearInterval(this.timer);
    }
}