var checktd = document.getElementsByTagName("td");

// https://api.covid19api.com/summary
fetch('https://api.covid19india.org/data.json')
  .then(function (response) {
    return response.json();
  })
  .then(function (res) {
    console.log(res);

    //Dates
    var Dates = [];
    for (let i = 0; i < res.cases_time_series.length; i++) {
      Dates.push(res.cases_time_series[i].date.substring(0, 6));
    }
    //TotalCnf
    var Confirm = [];
    for (let i = 0; i < res.cases_time_series.length; i++) {
      Confirm.push(res.cases_time_series[i].totalconfirmed);
    }
    //Recover
    var Recover = [];
    for (let i = 0; i < res.cases_time_series.length; i++) {
      Recover.push(res.cases_time_series[i].totalrecovered);
    }
    //Deaths
    var Deaths = [];
    for (let i = 0; i < res.cases_time_series.length; i++) {
      Deaths.push(res.cases_time_series[i].totaldeceased);
    }
    console.log(Deaths);

    var ctx = document.getElementById("myChart").getContext("2d");
    var myChart = new Chart(ctx, {
      type: "line",
      data: {
        labels: Dates,
        datasets: [
          {
            label: "Confirmed",
            data: Confirm,
            backgroundColor: ["#fff"],
            borderColor: ["#ff073a"],
            //borderWidth: 1,
          },
          {
            label: "Recovered",
            data: Recover,
            backgroundColor: ["#fff"],
            borderColor: ["#28a745"],
            //borderWidth: 1,
          },
          {
            label: "Deceased",
            data: Deaths,
            backgroundColor: ["#fff"],
            borderColor: ["#6c757d"],
            //borderWidth: 1,
          },
        ],
      },
      options: {
        scales: {
          yAxes: [
            {
              ticks: {
                beginAtZero: true,
              },
            },
          ],
        },
      },
    });


    // Table data start
    var time = document.getElementById("time");
    time.innerHTML = res.statewise[0].lastupdatedtime;

    var cnf = document.getElementById("one");
    cnf.style.color = "#ff073a"
    cnf.innerHTML = res.statewise[0].confirmed.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
    var act = document.getElementById("two");
    act.style.color = "#007bff"
    act.innerHTML = res.statewise[0].active.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
    var rec = document.getElementById("three");
    rec.style.color = "#28a745"
    rec.innerHTML = res.statewise[0].recovered.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
    var det = document.getElementById("four");
    det.style.color = "#6c757d";
    det.innerHTML = res.statewise[0].deaths.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");

    for (let i = 1; i < res.statewise.length; i++) {

      var table = document.getElementById("covid-india");
      var tr = document.createElement("tr");

      var td = document.createElement("td");
      td.textContent = res.statewise[i].state;
      table.appendChild(tr);
      tr.appendChild(td);

      var td2 = document.createElement("td");
      td2.textContent = res.statewise[i].confirmed.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
      td2.style.color = "#ff073a"
      tr.appendChild(td2);

      var td3 = document.createElement("td");
      td3.textContent = res.statewise[i].active.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
      td3.style.color = "#007bff"
      tr.appendChild(td3);

      var td4 = document.createElement("td");
      td4.textContent = res.statewise[i].recovered.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
      td4.style.color = "#28a745"
      tr.appendChild(td4);

      var td5 = document.createElement("td");
      td5.textContent = res.statewise[i].deaths.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
      td5.style.color = "#6c757d";
      tr.appendChild(td5);

    }

  });


