var car = {
	name : "sonata",
	ph : "500ph",
	start : function () {
		console.log("engine is starting");
	},
	stop : function () {
		console.log("engine is stoped");
	}
}

console.log('car name : ', car.name);
console.log('car ph : ', car.ph);
car.start();
car.stop();