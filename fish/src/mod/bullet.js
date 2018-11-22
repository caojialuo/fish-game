import {d2a,gd,rnd,JSON} from './common';
export default class Bullet{
    constructor(type){
        this.type = type || 1;
        this.rotate = 0;
        this.x = 431;
        this.y = 570;
        this.speed = 5;
        this.timer = null
        
        this.BULLET_SIZE=[
            null,
            {x: 86, y: 0, w: 24, h: 26},
            {x: 62, y: 0, w: 25, h: 29},
            {x: 30, y: 0, w: 31, h: 35},
            {x: 32, y: 35, w: 27, h: 31},
            {x: 30, y: 82, w: 29, h: 33},
            {x: 0, y: 82, w: 30, h: 34},
            {x: 0, y: 0, w: 30, h: 44}
        ];
        this.move();
    }
    move(){
        this.timer = setInterval(()=>{
            this.x += Math.sin(d2a(this.rotate))*this.speed;
            this.y -= Math.cos(d2a(this.rotate))*this.speed;
        },30)
    }
    draw(gd){
        let w = this.BULLET_SIZE[this.type].w;
        let h = this.BULLET_SIZE[this.type].h;
        let x = this.BULLET_SIZE[this.type].x;
        let y = this.BULLET_SIZE[this.type].y;

        gd.save();
        gd.translate(this.x,this.y);
        gd.rotate(d2a(this.rotate));
       
        gd.drawImage(
            JSON['bullet'],
            x,y,w,h,
            -w/2,-h/2,w,h
        )
        gd.restore();
    }
    clear(){
        clearInterval(this.timer)
    }
}