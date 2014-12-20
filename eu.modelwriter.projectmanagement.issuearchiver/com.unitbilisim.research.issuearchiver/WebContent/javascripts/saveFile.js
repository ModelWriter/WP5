/**
 * 
 */

$("#btnExport ").on('click', function (event) {

	exportToCSV.apply();

	});


	function exportToCSV() {

		var csv = "Abc, DEF, GHI, JKLM";

		// Data URI

		csvData = 'data:application/csv;charset=utf-8,'
				+ encodeURIComponent(csv);

		$(this).attr({

			'href' : csvData,

			'target' : '_blank'

		});

	}