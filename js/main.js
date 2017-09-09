var sliderFirst = document.getElementById('sliderFirst');
var sliderSecond = document.getElementById('sliderSecond');

noUiSlider.create(sliderFirst, {
	start: [20],
	connect: true,
	range: {
		'min': 0,
		'max': 10
	}
});

noUiSlider.create(sliderSecond, {
	start: [20],
	connect: true,
	range: {
		'min': 0,
		'max': 5
	}
});

var nodes = [
	document.getElementById('value'),
	document.getElementById('upper-value') 
];

sliderFirst.noUiSlider.on('update', function ( values, handle, unencoded, isTap, positions ) {
	nodes[0].innerHTML = '$' + values[handle] + ' M / standing';
	$('input[name="starting_deposit"]').val(values[handle] * 1000000).change();
});

sliderSecond.noUiSlider.on('update', function ( values, handle, unencoded, isTap, positions ) {
	nodes[1].innerHTML = '$' + values[handle] + ' M monthly excess';
	$('input[name="monthly_cash_flow"]').val(values[handle] * 1000000).change();
});


