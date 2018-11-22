import {d2a,gd,rnd,JSON} from './common';
import Bullet from './bullet';

export default class DieBullet extends Bullet{
    constructor(type){
        super(type);
        this.DieBullet_SIZE = [
            null,
            {x:336,y:373,w:78,h:88},
            {x:13,y:412,w:111,h:108},
            {x:179,y:370,w:128,h:128},
            {x:254,y:196,w:149,h:148},
            {x:0,y:244,w:163,h:153},
            {x:243,y:0,w:179,h:179},
            {x:22,y:22,w:199,h:199}
        ];
        this.move();
    }
    move(){}
    draw(gd){
        let w = this.DieBullet_SIZE[this.type].w;
        let h = this.DieBullet_SIZE[this.type].h;
        let x = this.DieBullet_SIZE[this.type].x;
        let y = this.DieBullet_SIZE[this.type].y;
        gd.save();
        gd.translate(this.x,this.y);
        gd.rotate(d2a(this.rotate));
        gd.drawImage(
            JSON['web'],
            x,y,w,h,
            -w/2,-h/2,w,h
        )
        gd.restore();
    }
}