var list = document.getElementById("names");
let data;

function fill() {
  for (var i = 0; i < data.names.length; i++) {
    var opt = data.names[i];
    var el = document.createElement("option");
    el.textContent = opt;
    el.value = opt;
    list.appendChild(el);
  }
  list.selectedIndex = 0;

  document.getElementById("info-id").innerHTML = "id: " + data.metadata[0].id;

  document.getElementById("info-ethnicity").innerHTML =
    "ethnicity: " + data.metadata[0].ethnicity;

  document.getElementById("info-gender").innerHTML =
    "gender: " + data.metadata[0].gender;

  document.getElementById("info-age").innerHTML =
    "age: " + data.metadata[0].age;

  document.getElementById("info-location").innerHTML =
    "location: " + data.metadata[0].location;

  document.getElementById("info-bbtype").innerHTML =
    "bbtype: " + data.metadata[0].bbtype;

  document.getElementById("info-wfreq").innerHTML =
    "wfreq: " + data.metadata[0].wfreq;

  list.onchange = function (ev) {
    ev.preventDefault();

    document.getElementById("info-id").innerHTML =
      "id: " + data.metadata[list.selectedIndex].id;

    document.getElementById("info-ethnicity").innerHTML =
      "ethnicity: " + data.metadata[list.selectedIndex].ethnicity;

    document.getElementById("info-gender").innerHTML =
      "gender: " + data.metadata[list.selectedIndex].gender;

    document.getElementById("info-age").innerHTML =
      "age: " + data.metadata[list.selectedIndex].age;

    document.getElementById("info-location").innerHTML =
      "location: " + data.metadata[list.selectedIndex].location;

    document.getElementById("info-bbtype").innerHTML =
      "bbtype: " + data.metadata[list.selectedIndex].bbtype;

    document.getElementById("info-wfreq").innerHTML =
      "wfreq: " + data.metadata[list.selectedIndex].wfreq;
    createHorizontalChart(list.selectedIndex);
    createBubbleChart(list.selectedIndex);
  };

  createHorizontalChart(0);
  createBubbleChart(0);
}

function createHorizontalChart(index) {
  let xValues = [];
  let yValues = [];
  let text = [];
  for (var i = 0; i < 10; i++) {
    if (data.samples[index].sample_values[i] !== undefined) {
      xValues.push(data.samples[index].sample_values[i]);
      yValues.push("OTU ".concat(data.samples[index].otu_ids[i]));
      text.push(data.samples[index].otu_labels[i]);
    }
  }
  let trace = [
    {
      type: "bar",
      x: xValues,
      y: yValues,
      orientation: "h",
      text: text,
    },
  ];
  let layout = {
    title: "OTU ID - Bar Chart",
    height: 600,
    width: 1000,
  };

  Plotly.newPlot(
    document.getElementById("horizontal-bar-chart"),
    trace,
    layout
  );
}

function createBubbleChart(index) {
  let xValues = [];
  let yValues = [];
  let text = [];
  for (var i = 0; i < 10; i++) {
    if (data.samples[index].sample_values[i] !== undefined) {
      xValues.push(data.samples[index].otu_ids[i]);
      yValues.push(data.samples[index].sample_values[i]);
      text.push(data.samples[index].otu_labels[i]);
    }
  }
  let trace = [
    {
      x: xValues,
      y: yValues,
      mode: "markers",
      marker: {
        color: xValues,
        size: yValues,
      },
      text: text,
    },
  ];
  let layout = {
    title: "OTU ID - Bubble Chart",
    height: 600,
    width: 1000,
  };
  Plotly.newPlot(document.getElementById("bubble-chart"), trace, layout);
}

Plotly.d3.json("samples.json", function (figure) {
  data = figure;
  fill();
});
