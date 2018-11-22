import {d2a,gd,rnd,JSON} from './common';
export default class Cannon{
    constructor(type){
        this.type = type || 1;
        this.rotate = 0;
        this.cur = 0;
        this.x = 431;
        this.y = 570;
        this.CANNON_SIZE=[
            null,
            {w: 74, h: 74},
            {w: 74, h: 76},
            {w: 74, h: 76},
            {w: 74, h: 83},
            {w: 74, h: 85},
            {w: 74, h: 90},
            {w: 74, h: 94}
        ]
    }
    draw(gd){
        let w = this.CANNON_SIZE[this.type].w;
        let h = this.CANNON_SIZE[this.type].h;
        gd.save();
        gd.translate(this.x,this.y);
        gd.rotate(d2a(this.rotate));
        gd.drawImage(
            JSON['cannon' + this.type],
            0,this.cur*h,w,h,
            -w/2,-h/2,w,h
        );
        gd.restore();
    }
    emit(){
        var timer = setInterval(()=>{
            this.cur++;
            if(this.cur == 5){
                clearInterval(timer);
                this.cur = 0;
            }
        },30)
    }
}