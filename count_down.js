// eg
			// var config ={
			// 	"Year":2020,
			// 	"Month":5,
			// 	"Day":28,
			// 	"Hour":16,
			// 	"Minute":14
			// }
			// countDown(config);
			function countDown(config) {
				tarYear = config.Year;
				tarMonth = config.Month - 1;
				tarDay = config.Day;
				tarHour = config.Hour;
				tarMinute = config.Minute;
				// 获取天数对应部分
				var dayTag = document.getElementsByClassName("Day")[0];
				// 获取小时对应部分
				var hourTag = document.getElementsByClassName("Hour")[0];
				// 获取分钟对应部分
				var minuteTag = document.getElementsByClassName("Minute")[0];
				// 获取秒对应部分
				var secondTag = document.getElementsByClassName("Second")[0];
				// 目标时间的毫秒数
				var targetDate = new Date(tarYear, tarMonth, tarDay, tarHour, tarMinute);
				getResult();
				var timer = setInterval(getResult, 1000);

				function getResult() {
					// 现在时间的毫秒数
					var nowDate = new Date().getTime();
					// 相差多少毫秒数
					var differ = targetDate - nowDate;

					// 一共秒
					var seconds = parseInt(differ / 1000);
					// 一共分钟
					var minutes = parseInt(seconds / 60);
					// 一共小时
					var hours = parseInt(minutes / 60);
					// 还有多少天
					var Days = parseInt(hours / 24);

					// 还有多少小时
					var surplusHours = Days * 24 - hours;
					var countHours = surplusHours < 0 ? -(surplusHours) : surplusHours;
					// 还有多少分钟
					var surplusMinutes = hours * 60 - minutes;
					var countMinutes = surplusMinutes < 0 ? -(surplusMinutes) : surplusMinutes;
					// 还有多少秒
					var surplusSeconds = minutes * 60 - seconds;
					var countSeconds = surplusSeconds < 0 ? -(surplusSeconds) : surplusSeconds;
					// DOM操作
					secondTag.innerText = addZero(countSeconds);
					minuteTag.innerText = addZero(countMinutes);
					hourTag.innerText = addZero(countHours);
					dayTag.innerText = addZero(Days);
					if (seconds == 0) {
						clearInterval(timer);
						console.log("计时完成");
					}
				}

				function addZero(num) {
					return num < 10 ? "0" + num : num
				}
			}
