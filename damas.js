$(document).ready(function() {
	for(i = 1; i<= 9; i++) {
		x = (i % 2 == 0) ? 1 : 0;
		$("#contenedor").append("<div id=row-" + i + " class='row'></div>")
		for(y = 1; y <= 8; y++) {
			if(y % 2 == x) {
				col_id = 'row-' + i + '-col-' + y;
				$("#row-" + i).append("<div class='col-white' data-row= "+i+" data-col="+y+" id=" + col_id + "></div>");
				if( i <= 3 ) {
					ficha_id = 'f1-' + 'row-' + i + '-col-' + y;
					$("#"+ col_id).append("<div class='ficha1' id="+ ficha_id +"></div>");
				}
				if( i >= 7) {
					ficha_id = 'f2-' + 'row-' + i + '-col-' + y;
					$("#"+ col_id).append("<div class='ficha2' id="+ ficha_id +"></div>");
				}
			} else {
				$("#row-" + i).append("<div class='col-black'></div>");
			}
		}
		$("#contenedor").append("<br>");

	}
	
	$(".ficha1").draggable({ revert: 'invalid' });
	$(".ficha2").draggable({ revert: 'invalid' });

	for(i = 1; i<= 9; i++) {
		for(y = 1; y <= 8; y++) {
			// Droppable
			col_id = 'row-' + i + '-col-' + y;
			$("#" + col_id).droppable({
				drop: function(event, ui) {
					var row = parseInt($(this).attr("data-row"));
					var col = parseInt($(this).attr("data-col"));
					var row_previus = parseInt(ui.draggable.parent().attr("id").substr(4, 1));
					var col_previus = parseInt(ui.draggable.parent().attr("id").substr(10, 1));
					$(ui.draggable).appendTo($(this));
					if(ui.draggable.hasClass("ficha1")) {
						if((row - 2) == row_previus) {
							col_ = (col_previus > col) ? col_previus - 1 : col_previus + 1;
							div_id = 'row-' + (row - 1) + "-col-" + col_;
							$("#" + div_id).empty();
						}
					} else {
						if((row + 2) == row_previus) {
							col_ = (col_previus > col) ? col_previus - 1 : col_previus + 1;
							div_id = 'row-' + (row + 1) + "-col-" + col_;
							$("#" + div_id).empty();
						}
					}
				},
				accept: function(d) {
					var parentDiv = d.parent().prop('id');
					var row = parseInt(parentDiv.substr(4, 1));
					var col = parseInt(parentDiv.substr(10, 1));
					var row_drop = parseInt($(this).attr("data-row"));
					var col_drop = parseInt($(this).attr("data-col"));
					if (d.hasClass( "ficha1" )) {
						if((row_drop - 2) == row) {
							col_previus = (col > col_drop) ? col_drop + 1 : col_drop - 1;
							div_id = 'row-' + (row_drop - 1) + "-col-" + col_previus;
							return ($("#"+div_id).children().hasClass("ficha2") && ! $(this).children().length > 0 );
						}
						return ((row_drop - 1) == row && (col_drop -1 == col || col_drop + 1 == col) && (! $(this).children().length > 0 ));
					} else {
						if((row_drop + 2) == row) {
							col_previus = (col > col_drop) ? col_drop + 1 : col_drop - 1;
							div_id = 'row-' + (row_drop + 1) + "-col-" + col_previus;
							return ($("#"+div_id).children().hasClass("ficha1") && ! $(this).children().length > 0 );
						}
						return ((row_drop + 1) == row && (col_drop -1 == col || col_drop + 1 == col) && (! $(this).children().length > 0 ));
					}
		    }
			});
		}
	}
});