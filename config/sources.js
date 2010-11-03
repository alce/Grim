/*globals exports*/

exports.sources = function() {
	return [
		 {"name":"El Heraldo Aguascalientes","url":"http://feeds.feedburner.com/heraldoags"}
		,{"name":"El Sol del Centro","url":"http://www.oem.com.mx/elsoldelcentro/rss/rss_mexico.xml"}
		,{"name":"La Crónica","url":"http://www.lacronica.com/rss/rssnacional.xml"}
		,{"name":"Frontera","url":"http://www.frontera.info/rss/rssnacional.xml"}
		,{"name":"El Sol de Tijuana","url":"http://www.oem.com.mx/elsoldetijuana/rss/rss_mexico.xml"}
		,{"name":"La Voz de la Frontera","url":"http://www.oem.com.mx/lavozdelafrontera/rss/rss_mexico.xml"}
		,{"name":"El Sudcaliforniano","url":"http://www.oem.com.mx/elsudcaliforniano/rss/rss_mexico.xml"}
		,{"name":"Chiapas Hoy","url":"http://chiapashoy.com/notashoy/index.php/index.1.rss"}
		,{"name":"Diario del Sur","url":"http://www.oem.com.mx/diariodelsur/rss/rss_mexico.xml"}
		,{"name":"El Heraldo de Chiapas","url":"http://www.oem.com.mx/elheraldodechiapas/rss/rss_mexico.xml"}
		,{"name":"El Orbe","url":"http://elorbe.com/feed"}
		,{"name":"Agencia Fronteriza de noticias","url":"http://www.afntijuana.info/afn/?feed=rss"}
		,{"name":"El Diario Ciudad Juárez","url":"http://www.diario.com.mx/rss/local/"}
		,{"name":"Aguas Digital","url":"http://www.aguasdigital.com/rss/rss_gral.php"}
		//^*s
	]; 
};

//terminado chiapas de http://www.mexico-periodicos.com/
exports.localSources = function() {
	return [
		 {"name":"El Heraldo Aguascalientes","url":"http://localhost:1234/el_heraldo_aguascalientes.xml"} 
		,{"name":"El Sol del Centro","url":"http://localhost:1235/el_sol_del_centro.xml"} 
		,{"name":"La Crónica","url":"http://localhost:1234/la_cronica.xml"} 
		,{"name":"Frontera","url":"http://localhost:1234/frontera.xml"} 
		,{"name":"El Sol de Tijuana","url":"http://localhost:1234/el_sol_de_tijuana.xml"} 
		,{"name":"La Voz de la Frontera","url":"http://localhost:1234/la_voz_de_la_frontera.xml"} 
		,{"name":"El Sudcaliforniano","url":"http://localhost:1234/el_sudcaliforniano.xml"} 
		,{"name":"Chiapas Hoy","url":"http://localhost:1234/chiapas_hoy.xml"}
		,{"name":"Diario del Sur","url":"http://localhost:1234/diario_del_sur.xml"}
		,{"name":"El Heraldo de Chiapas","url":"http://localhost:1234/el_heraldo_de_chiapas.xml"}
		,{"name":"El Orbe","url":"http://localhost:1234/el_orbe.xml"}
		// ,{"name":"Agencia Fronteriza de noticias","url":"http://localhost:1234/agencia_fronteriza_de_noticias.xml"}
		// ,{"name":"El Diario Ciudad Juárez","url":"http://localhost:1234/el_diario_ciudad_juarez.xml","encoding":"ISO-8859-1"} //encoding
		//^*ls
	]; 
};

