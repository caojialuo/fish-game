require('./css/style');
import {random,a2d,loadImg,JSON} from './mod/common';
import Fish from './mod/fish';
import DieFish from './mod/diefish';
import Bullet from './mod/bullet';
import DieBullet from './mod/diebullet';
import Cannon from './mod/cannon';
import Grade from './mod/grade';
import Gold from './mod/gold';

let oC = document.createElement('canvas');
var gd = oC.getContext('2d');
oC.width = 800;
oC.height = 600;

document.querySelector('#root').appendChild(oC);
oC.style.background = "url(./static/game_bg_2_hd.jpg)";

var data=[
    'fish1','fish2','fish3','fish4','fish5',
    'cannon1','cannon2','cannon3','cannon4','cannon5','cannon6','cannon7',
    'coinAni1','coinAni2','bottom','bullet','web','fish6','fish7','number_black','coinText'
];
//加载资源
loadImg(
    data,
    (loaded,total)=>{
        // console.log(loaded/total*100+"%")
    },
    ()=>{
        init();
    }
);

function init(){
    let arrFish = [];
    let arrBullet = [];
    let arrDieFish = [];
    let arrDieBullet = [];
    let arrCoin = [];

    let grade = 0;
    let out = 50;
    let rules = 0.02;

    var c = new Cannon(1);   
    var g = new Grade("0000"); 
    setInterval(()=>{
        gd.clearRect(0,0,oC.width,oC.height);
        document.onmousewheel = function(){
            if(c.type == 7){
                c.type = 1;
            }else{
                c.type++;
            }
        }
        //普通鱼种
        if(Math.random()<rules){
            let f = new Fish(random(1,6));
            if(Math.random()<0.5){
                f.rotate = random(-45,45);
                f.x = 0-out;
            }else{
                f.rotate = random(135,225);
                f.x = oC.width+out;
            }
            f.y = random(100,oC.height-100);
            arrFish.push(f);
        }
        if(Math.random()<rules*0.05){
            let f = new Fish(random(6,8));
            if(Math.random()<0.5){
                f.rotate = random(-45,45);
                f.x = -100;
            }else{
                f.rotate = random(135,225);
                f.x = oC.width+100;
            }
            f.y = random(100,oC.height-100);
            arrFish.push(f);
        }
        
        arrFish.forEach((item,index)=>{
            item.draw(gd);
        })
        arrDieFish.forEach((item,index)=>{
            item.draw(gd);
        })
        arrDieBullet.forEach((item,index)=>{
            item.draw(gd);
        })
        arrCoin.forEach((item,index)=>{
            item.draw(gd);
        })

        gd.drawImage(
            JSON['bottom'],
            0,0,765,70,
            0,532,765,70
        )

        arrBullet.forEach((item,index)=>{
            if(item.x<-out||item.y<-out||item.x>oC.width+out||item.y>oC.height+out){
                arrBullet.splice(index,1)
                item.clear();
            }else{
                item.draw(gd);
            }
        })
        

        //碰撞检测
          for (var i=0;i<arrFish.length;i++){
            for (var j=0;j<arrBullet.length;j++){
                if (arrFish[i].isIn(arrBullet[j].x,arrBullet[j].y)){
                    var x = arrFish[i].x;
                    var y = arrFish[i].y;
                    var type_f = arrFish[i].type;
                    var w = arrBullet[j].w;
                    var h = arrBullet[j].h;
                    var rotate = arrFish[i].rotate;
                    var type = arrFish[i].type;
                    arrBullet[j].clear();
                    arrBullet.splice(j, 1);
                    
                    //实例子弹消亡
                    let dieB = new DieBullet(c.type);
                    dieB.x = x;
                    dieB.y = y;
                    dieB.w = w;
                    dieB.h = h;
                    dieB.rotate = rotate;
                    arrDieBullet.push(dieB);
                    setTimeout(()=>{
                        arrDieBullet.shift();
                    },300)
                    //实例死鱼
                    let die;
                    let coin;
                    if(Math.random()<(c.type/type_f)/10){
                        die = new DieFish(type);
                        if(die.type<6){
                            coin = new Gold(1);
                        }else{
                            coin = new Gold(2);
                        }
                        // 分数
                        if(grade<1000){
                            grade = "0" + grade;
                            if (grade<100) {
                                grade = "0" + grade;
                                if(grade <10){
                                    grade = "0" + grade
                                }
                            }
                        }

                        g = new Grade(grade);
                        grade = parseInt(grade) + die.type;

                        die.x = x;
                        die.y = y;
                        die.rotate = rotate;
                        arrDieFish.push(die);
                        //同步生成金币
                        setTimeout(()=>{
                        //实例金币
                            coin.x = arrDieFish[0].x;
                            coin.y = arrDieFish[0].y;
                            arrDieFish.shift();
                            arrCoin.push(coin);
                        },500)

                        setTimeout(()=>{
                            arrCoin[0].clear()
                            arrCoin.shift();
                        },2000)
                        arrFish.splice(i, 1);

                    }
                }
            }
        }
        c.draw(gd);
        g.draw(gd);
    },16)

    oC.onclick = function(ev){
        var x = ev.clientX-oC.offsetLeft-c.x;
        var y = c.y - ev.clientY-oC.offsetTop;
        var d = 90 - a2d(Math.atan2(y,x));
        if(d>90) d=90;
        if(d<-90) d=-90;
        
        c.rotate = d;
        c.emit();

        //实例炮弹
        let bullet = new Bullet(c.type);
        bullet.x = c.x;
        bullet.y = c.y;
        bullet.rotate = c.rotate;
        arrBullet.push(bullet);
    }


}
