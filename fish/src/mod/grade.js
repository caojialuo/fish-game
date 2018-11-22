import {d2a,gd,random,JSON} from './common';
export default class Grade{
    constructor(grade){
        this.grade = grade;
    }
    draw(gd){
        let g = this.grade%10;
        let s = parseInt(this.grade/10%10);
        let b = parseInt(this.grade/100%10);
        let q = parseInt(this.grade/1000%10);

        gd.save();
        gd.drawImage(
            JSON['coinText'],
            q*36,0,36,49,
            0,0,36,49
        )
        gd.drawImage(
            JSON['coinText'],
            b*36,0,36,49,
            36,0,36,49
        )
        gd.drawImage(
            JSON['coinText'],
            s*36,0,36,49,
            72,0,36,49
        )
        gd.drawImage(
            JSON['coinText'],
            g*36,0,36,49,
            108,0,36,49
        )
        gd.restore();
    }
}