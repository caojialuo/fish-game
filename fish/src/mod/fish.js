import {d2a,gd,oC,JSON} from './common';
export default class Fish{
    constructor(type){
        this.type = type || 1;
        this.rotate = 0;
        this.cur = 0;
        this.x = 431;
        this.y = 570;
        this.speed = 1;

        this.move();
    }
    move(){
        setInterval(()=>{
            this.cur++;
            if(this.cur == Fish.FISH_SIZE[this.type].num){
                this.cur = 0;
            }
        },250)

        setInterval(()=>{
            this.x += Math.cos(d2a(this.rotate))*this.speed;
            this.y += Math.sin(d2a(this.rotate))*this.speed;
        },30)
    }
    draw(gd,type){
        let w = Fish.FISH_SIZE[this.type].w;
        let h = Fish.FISH_SIZE[this.type].h;
        gd.save();
        gd.translate(this.x,this.y);
        if (this.type>5) {
            gd.scale(0.5,0.5)
        }
        gd.rotate(d2a(this.rotate));
        if(this.rotate>90 && this.rotate<270){
            gd.scale(1,-1)
        }
        gd.drawImage(
            JSON['fish'+this.type],
            0,this.cur*h,w,h,
            -w/2,-h/2,w,h
        )
        gd.restore();
    }
    isIn(x,y){
        var a=this.x-x;
        var b=this.y-y;
        var c=Math.sqrt(a*a+b*b);
        if (c<Fish.FISH_SIZE[this.type].collR){
            return true;
        } else{
            return false;
        }
    }
}
Fish.FISH_SIZE=[
    null,
    {w: 55, h: 37, collR: 17,num:4},
    {w: 78, h: 64, collR: 24,num:4},
    {w: 72, h: 56, collR: 20,num:4},
    {w: 77, h: 59, collR: 22,num:4},
    {w: 107, h: 122, collR: 29,num:4},
    {w: 509, h: 270, collR: 80,num:8},
    {w: 516, h: 273, collR: 80,num:8}
]