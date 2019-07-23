jQuery(document).ready(function($) {	
	
	
	// CONFIGURACION DE LA APLICACION
	var zoomMinimo = 1;
	var zoomMaximo = 2;
	
	
	
	// FIN DE LA CONFIGURACION
	// NO EDITAR ABAJO.	
	Number.prototype.pad = function(size) { var s = String(this); while (s.length < (size || 2)) {s = "0" + s;} return s; }
	
	// TEXTOS DINAMICOS DE LA PARTE SUPERIOR
	$(".year").text(codigo.substring(0, 4));
	$(".cur").text((inicial).pad(2));
	$(".tot").text(paginas);
	$(".desc").text( contenido[inicial]["desc"] );
	
	// OBTENEMOS LA CARPETA CON LOS SKETCHS
	var url = window.location.pathname;
	var folder = url.match(/([^\/]+)(?=\.\w+$)/)[0];
	var folder2 = folder.charAt(0).toUpperCase() + folder.slice(1);
	
	// RECORREMOS LOS ARCHIVOS DE CADA SKETCH PARA MOSTRAR EN CARROUSEL
	for(i=1; i<=paginas; i++) {	
		if(i == inicial) {
			$(".swiper-wrapper").append('<div class="swiper-slide"><div class="swiper-zoom-container"><img src="sketchbooks/'+folder2+'/'+codigo+'/'+codigo+'_'+(i).pad(3)+'_SPREAD.jpg" /></div></div>');		
		} else {
			$(".swiper-wrapper").append('<div class="swiper-slide"><div class="swiper-zoom-container"><img src="sketchbooks/'+folder2+'/'+codigo+'/'+codigo+'_'+(i).pad(3)+'.jpg" /></div></div>');		
		}
	}
	
	
	// INICIALIZADOR DE CARROUSEL DE SKETCHS
	var mySwiper = new Swiper ('.swiper-container', {
		initialSlide: inicial-1,
	    zoom: {
			maxRatio: zoomMaximo,
			minRatio: zoomMinimo,
		},
	});

	
	// INICIALIZADOR DEL SLIDER INFERIOR (LINEA BLANCA)
	$("#ui-slider").slider({
		range: "min",
		min: 1,
		max: paginas,
		value: inicial,
		slide: function( event, ui ) {
			mySwiper.slideTo(ui.value-1);
		}
	});
	
	// DEFINE POSICION DE LA PELOTA BLANCA INFERIOR
	var initialIndicator = $(".ui-state-default")[0].style.left;	
	$("#initialIndicator").css("left", initialIndicator)

	
	// CUANDO SE MUEVE EL CARROUSEL, MOVER EL SLIDER INFERIOR
	mySwiper.on('slideChange', function () {
		$( "#ui-slider" ).slider( "value", mySwiper.activeIndex + 1 );
		$(".cur").text((mySwiper.activeIndex + 1).pad(2));
		$(".desc").text( contenido[mySwiper.activeIndex + 1]["desc"] );
	});
	
	// CUANDO SE PINCHA LA PELOTA BLANCA INFERIOR VOLVER AL SLIDER INICIAL
	$("#initialIndicator").on('click', function(){ 
		mySwiper.slideTo(inicial-1);
	});
	
});