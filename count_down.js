			// eg
			// var config = {
			// 	"Year": 2020,
			// 	"Month": 5,
			// 	"Day": 28,
			// 	"Hour": 22,
			// 	"Minute": 10
			// }
			function countDown(config) {
				var targetYear = config.Year;
				var targetMonth = config.Month-1;
				var targetDay = config.Day;
				var targetHour = config.Hour;
				var targetMinute = config.Minute;
				// 获取天数对应部分
				var dayTag = document.getElementsByClassName("Day")[0];
				// 获取小时对应部分
				var hourTag = document.getElementsByClassName("Hour")[0];
				// 获取分钟对应部分
				var minuteTag = document.getElementsByClassName("Minute")[0];
				// 获取秒对应部分
				var secondTag = document.getElementsByClassName("Second")[0];
				// 目标时间的毫秒数
				var targetDate = new Date(targetYear, targetMonth, targetDay, targetHour, targetMinute).getTime();
				getResult();
				// var a1 = new Date(targetYear, targetMonth, targetDay, targetHour, targetMinute);
				// console.log(a1);
				var timer = setInterval(getResult, 1000);
				function getResult(){
					var nowDate = new Date().getTime();
					
					var differ = targetDate - nowDate;
					// 秒数
					var seconds = Math.floor(differ / 1000)%60;
					// 分钟数
					var minutes = Math.floor(differ / 1000 / 60)%60;
					// 小时数
					var hours = Math.floor(differ / 1000 / 60 / 60)%24;
					// 天数
					var days = Math.floor(differ / 1000 / 60 / 60 / 24);
					// 添加DOM
					secondTag.innerText = addZero(seconds);
					minuteTag.innerText = addZero(minutes);
					hourTag.innerText = addZero(hours);
					dayTag.innerText = addZero(days);
					
				};
				function addZero(num) {
					return num < 10 ? "0" + num : num
				}
			}