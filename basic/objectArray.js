var cars = [];
var car01 = {
    name : "sonata",
    ph : "500ph",
    start : function(){
        console.log("engine is starting");
    },
    stop : function (){
        console.log("engine is stoped");
    }
}

var car02 = {
    name : "BMW",
    ph : "600ph",
    start : function(){
        console.log("engine is starting");
    },
    stop : function (){
        console.log("engine is stoped");
    }
}

var car03 = {
    name : "Fiat",
    ph : "200ph",
    start : function(){
        console.log("engine is starting");
    },
    stop : function (){
        console.log("engine is stoped");
    }
}

//cars[0] = car01;
//cars[1] = car02;

var cars = [car01, car02, car03];
console.log(cars[1].name);

//#work1 자동차 배열안에 BNW라는 이름의 차가 있다면 'find !' 라는 문자열 출력
//for, if 사용
for(var i=0 ; i < cars.length ; i++){
    if(cars[i].name == "BMW"){
        //console.log("i : " + i);
        console.log("find!");
    }
}