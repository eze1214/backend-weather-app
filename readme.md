**Levantar el backend:**

-Versiones:
  Node: v10.16.0
  NPM: 6.9.0
  
-Bajarse el nvm:
https://github.com/nvm-sh/nvm/blob/master/README.md
Una vez instalado ejecutar 
	nvm install 10.16.0
	nvm use 10.16.0

-npm install

**Ejectutar:** 
npm start

**Ejecutar test**
Instalarse mocha 
npm install -g mocha

-Con el servidor corriendo en la carpeta raiz ejercutar mocha.

Aclaraciones:
-Se agrego un servicio que no estaba definido en el enunciado /cities?filter. Este servicio permite obtener cuidades que contengan el filtro ingresado en filter.
-Para evitar ambiguedades se utilizo el id de la ciudad definido por la api http://bulk.openweathermap.org/sample/. Esta file fue utilizado para mantener en el servidor la lista de ciudades disponibles.
-En los casos en los que se obtiene la obucacion de ipApi. Se lee un query param en donde se especifica la ip, si no existe se utiliza la ip externa del servidor.

Librerias utilizadas. Si bien en el package.json se pueden ver las librerias utilizadas se nombran las mas importante

	framework de ruteo: express
	Pruebas: supertest y should
	Localizacion: ip-api
	logger: winston
	fechas: moment
