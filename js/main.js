            var count;
			var pcStatus = [];
			var pcName = []; //for help seat creator get index
            var aCount = 0;
            var a1A = 0;
            var a2A = 0;
            var a3A = 0;
			var cameraRotate = 1; //flag, open in default
            var seatPosi=[];
            
            
            function closeGuide(){
                var guideWindow = document.getElementById("guide");
                var guideWindow_text = document.getElementById("guide_text");
                var guideWindow_line = document.getElementById("guide_line");
                var guideWindow_close = document.getElementById("guide_close");
                var fid = setInterval(frame, 1);
                var pos_height = 240;
                function frame() {
                    if (pos_height == 0) {
                        clearInterval(fid);
                        guideWindow_text.style.opacity = 0;
                        guideWindow_line.style.opacity = 0;
                        guideWindow_close.style.opacity = 0;
                        guideWindow.style.opacity = 0;
                    } else {
                        pos_height = pos_height - 5; 
                        guideWindow.style.height = pos_height + 'px'; 
                        guideWindow_text.style.animation = "disappear 0.5s 1";
                        guideWindow_line.style.animation = "disappear 0.5s 1";
                        guideWindow_close.style.animation = "disappear 0.5s 1";
                    }
                }
            }



		
			

			function cameraRSF(){
				cameraRotate = (cameraRotate == 1) ? 0 : 1;
				cameraRotateText = (cameraRotate == 1) ? 'Stop Camera 360°' : 'Open Camera 360°';
				$('#cameraRBtn').text(cameraRotateText);
			}
			
			
			


			var OBJLoader2Example = (function () {
				var Validator = THREE.LoaderSupport.Validator;
				function OBJLoader2Example( elementToBindTo ) {
					this.renderer = null;
					this.canvas = elementToBindTo;
					this.aspectRatio = 0;
					this.recalcAspectRatio();
					this.scene = null;
					this.cameraDefaults = {
						posCamera: new THREE.Vector3( 0.0, 1600.0, 1800.0 ),
						posCameraTarget: new THREE.Vector3( 0, 1, 0 ),
						near: 200,
						far: 66000,
						fov: 40
					};
					this.camera = null;
					this.cameraTarget = this.cameraDefaults.posCameraTarget;
					this.controls = null;
				}
				//console.log(pcName.indexOf('UL-OA-MAIN-3-PC-245'));
				
				OBJLoader2Example.prototype.initGL = function () {
					this.renderer = new THREE.WebGLRenderer( {
						canvas: this.canvas,
						antialias: true,
						autoClear: true,
						alpha: true,
					} );
					//this.renderer.setClearColor( 0x050505 );
					this.scene = new THREE.Scene();
					this.camera = new THREE.PerspectiveCamera( this.cameraDefaults.fov, this.aspectRatio, this.cameraDefaults.near, this.cameraDefaults.far );
					this.resetCamera();
					//this.controls = new THREE.TrackballControls( this.camera, this.renderer.domElement );
					this.controls = new THREE.OrbitControls( this.camera, this.renderer.domElement );
					//this.controls.addEventListener( 'change', this.render ); // remove when using animation loop
					this.controls.enableZoom = true;
					
					
					

					//Ambient Light
					var ambientLight = new THREE.AmbientLight(0x60a0ae);
					this.scene.add(ambientLight);

					//Directional Light 
					var directionalLight1 = new THREE.DirectionalLight( 0xafcdd3 );
					var directionalLight2 = new THREE.DirectionalLight( 0xafcdd3 );
					var directionalLight3 = new THREE.DirectionalLight( 0xafcdd3);
					var directionalLight4 = new THREE.DirectionalLight( 0xefefef);
					//var pointLight1 = new THREE.PointLight( 0xf3f3f3 );
                    //var directionalLight5 = new THREE.DirectionalLight( 0xefefef);
					directionalLight1.position.set( -400, 300, -400 );
					directionalLight2.position.set( 5000, 10000, 5000 );
					directionalLight3.position.set( 0, 100, -50 );
                    directionalLight4.position.set( 0, 500, 0 );
                    //directionalLight5.position.set( 0, 1000, 0 );
					this.scene.add( directionalLight1 );
					this.scene.add( directionalLight2 );
					this.scene.add( directionalLight3 );
					this.scene.add( directionalLight4 );
					//this.scene.add( pointLight1 );
                    //this.scene.add( directionalLight5 );

					//set sence background
					//this.scene.background = new THREE.Color( 0xff0000 );
					

					//grid line
					var helper = new THREE.GridHelper( 30000, 100, 0x415053, 0x131313 );
					this.scene.add( helper );
					//console.log(this.scene);
					
				};

				
				
				//IMPORT OBJ FILE
				OBJLoader2Example.prototype.initContent = function () {
					var modelName1 = 'libraryMainBuilding';
					var modelName2 = 'librarySeat';
					var modelName3 = 'libraryNearBy';
					var modelName4 = 'libraryInner';
					var scope = this;
					var objLoader = new THREE.OBJLoader2();

					var callbackOnLoad = function ( event ) {
						var local = new THREE.Object3D();
						scope.scene.add( local );
						local.add( event.detail.loaderRootNode );
						local.position.set( 500, 0, 2400 );
					};

					//Load Main Library Object
					var onLoadMtl_Main = function ( materials ) {
						objLoader.setModelName( modelName1 );
						objLoader.setMaterials( materials );
						objLoader.setUseIndices( true );
						objLoader.setDisregardNormals( false );
						console.log(objLoader)
						
						objLoader.load( 'Project_SAS_Main.obj', callbackOnLoad, null, null, null, false );
					};
					//Load Seat Object
					var onLoadMtl_Seat = function ( materials ) {
						objLoader.setModelName( modelName2 );
						//objLoader.setMaterials( materials );
						objLoader.setUseIndices( true );
						objLoader.setDisregardNormals( false );
						objLoader.load( 'Project_SAS_Seat.obj', callbackOnLoad, null, null, null, false );
					};
					//Load Nearby Building
					var onLoadMtl_NB = function ( materials ) {
						objLoader.setModelName( modelName3 );
						//objLoader.setMaterials( materials );
						objLoader.setUseIndices( true );
						objLoader.setDisregardNormals( false );
						objLoader.load( 'Project_SAS_NB.obj', callbackOnLoad, null, null, null, false );
					};

					//Loader Controller
					//Load Main Building Material and callback main building loadup
					objLoader.loadMtl( './Project_SAS_Main.mtl', 'Project_SAS_Main.mtl', null, onLoadMtl_Main );
					//Load seat and nearby building
					onLoadMtl_Seat();
					onLoadMtl_NB();
                    
                    var onLoadRoad = function(){
                        var material = new THREE.LineBasicMaterial({
                            color: 0x00aeff
                        });
                        
                        var geometry1 = new THREE.Geometry();
                        geometry1.vertices.push(
                            new THREE.Vector3( 5451.825 + 500, 150, -10283.786 + 2400 ),
                            new THREE.Vector3( -6489.499 + 500, 150, -10283.786 + 2400 ),
                            new THREE.Vector3( -11601.639 + 500, 150, -1963.667 + 2400 ),
                            new THREE.Vector3( -3008 + 500, 150, 1446.87 + 2400 ),
                            new THREE.Vector3( 22467.996 + 500, 150, 1446.87 + 2400 )
                        );

                        var geometry2 = new THREE.Geometry();
                        geometry2.vertices.push(
                            new THREE.Vector3( -11601.639 + 500, 150, -1963.667 + 2400 ),
                            new THREE.Vector3( -27760.524 + 500, 150, -1963.667 + 2400 ),
                        );

                        var geometry3 = new THREE.Geometry();
                        geometry3.vertices.push(
                            new THREE.Vector3( 5451.852 + 500, 150, -36356 + 2400 ),
                            new THREE.Vector3( 5451.852 + 500, 150, 18924.165 + 2400 ),
                        );
                        
                        var line1 = new THREE.Line( geometry1, material );
                        var line2 = new THREE.Line( geometry2, material );
                        var line3 = new THREE.Line( geometry3, material );
                        scope.scene.add(line1);
                        scope.scene.add(line2);
                        scope.scene.add(line3);
                    }

					onLoadRoad();

				};
				

				

				
				OBJLoader2Example.prototype.initLt = function () {
						//get seat position from local API
						$.ajax({
								url: 'data_seat.php',
								type: 'POST',
								dataType: 'json',
								async: false,
								success: function (res) {
									for(i=0;i<res.length;i++){
										seatPosi.push(res[i]);
										
									}
								},
						});


			/*
					0 = off
					1 = powered on
					2 = in use
				*/

				//Request data from IT Services API
				/*$.ajax({
					url: 'http://api.ssd.port.ac.uk/lib-pca/',
					type: 'post',
					dataType: 'json',
					async: false,
					success: function (res) {
						

						for(i=0;i<res.length;i++){
							if(res[i].state == 0 || res[i].state == 1){
								aCount++;
							}

							pcStatus.push(res[i]);
							pcName.push(res[i].name);
						}
						$('#info_pcAva').text(aCount);
					}
				});*/
				

				//get local json data

				$.ajax({
					url: './data.json',
					dataType: 'json',
					async: false,
					success: function (res) {
						
						for(i=0;i<res.length;i++){
							if(res[i].state == 0 || res[i].state == 1){
                                var resName = res[i].name;
                                if(resName.search("MAIN") != -1){
                                    var resArea = resName.substring(11,12);
                                    switch (parseInt(resArea)){

                                        case 1:
                                        a1A++;
                                        break;
    
                                        case 2:
                                        a2A++;
                                        break;
    
                                        case 3:
                                        a3A++;
                                        break;
                                    }
                                }
                                aCount++;   
                            }
                            
							pcStatus.push(res[i]);
							pcName.push(res[i].name);
                        }
                        loadText(a1A,500,500,-200,"AREA-1");
                        loadText(a2A,-1000,500,-1000,"AREA-2");
                        loadText(a3A,-2200,500,-600,"AREA-3");
						$('#info_pcAva').text(aCount);
					}
				});
					that = this;
					function createLaptop(){
						
						count = i;
						//console.log(seatPosi[count]);
						
						var geometry = new THREE.BoxGeometry( 36, 20, 3 );
						
						var pcIndex = pcName.indexOf(seatPosi[count].name)
                        var theStatus = pcStatus[pcIndex].state;
						if(theStatus == 2){
							var material = new THREE.MeshBasicMaterial({ 
								color: 0xe82d43,
								specular: 0xff0000,
								shininess: 1,
							});
						}
						if(theStatus == 1 || theStatus == 0){
							var material = new THREE.MeshBasicMaterial({ 
								color: 0x59ecaf,
								specular: 0xff0000,
								shininess: 1,
							});
						}
						
						var cube = new THREE.Mesh( geometry, material );
                        //console.log(seatPosi[count][0].substring(seatPosi[count][0].length - 3, seatPosi[count][0].length));
                        var cube_x = parseInt(seatPosi[count].position_x) + 500;
                        var cube_y = parseInt(seatPosi[count].position_y);
                        var cube_z = parseInt(seatPosi[count].position_z) + 2400;
                        cube.position.set(cube_x, cube_y, cube_z);
                        //console.log(seatPosi[count].position_x)
						cube.rotateY((seatPosi[count].rotation * Math.PI)/180);
                        that.scene.add( cube );
						that.scene.fog = new THREE.Fog( 0x20556b, 6000, 29000 );

						/*
							0 = off
							1 = powered on
							2 = in use
						*/

					}
					for(i=0;i<seatPosi.length;i++){
						createLaptop();
					}
                }

                function loadText(t,x,y,z,n) {
                    that = this;
                    var loader = new THREE.FontLoader();
                    loader.load( "./asset/fonts/barlow_bold.typeface.json", function ( font ) {

                        var textGeo = new THREE.TextGeometry( t, {
                            font: font,
                            size: 200,
                            height: 1,
                            curveSegments: 100,
                            bevelEnabled: false
                        } );

                        var textGeo_area = new THREE.TextGeometry( n, {
                            font: font,
                            size: 70,
                            height: 1,
                            curveSegments: 100,
                            bevelEnabled: false
                        } );

                        var textGeo_intro = new THREE.TextGeometry( "AVALIABLE", {
                            font: font,
                            size: 50,
                            height: 1,
                            curveSegments: 100,
                            bevelEnabled: false
						} );
						
						if(t > 40){
							var textMaterial = new THREE.MeshPhongMaterial( { color: 0x59ecaf } );
						}

						if(t >= 20 && t <= 40){
							var textMaterial = new THREE.MeshPhongMaterial( { color: 0xff8b3e } );
						}

						if(t < 20){
							var textMaterial = new THREE.MeshPhongMaterial( { color: 0xff3e3e } );
						}
                        
                    
                        var textMesh = new THREE.Mesh( textGeo, textMaterial );
                        var textMesh_intro = new THREE.Mesh( textGeo_intro, textMaterial );
                        var textMesh_area = new THREE.Mesh( textGeo_area, textMaterial );

                        y = y + parseInt(t)*5;

                        textMesh.position.x = x;
                        textMesh.position.y = y;
                        textMesh.position.z = z;

                        textMesh_area.position.x = x;
                        textMesh_area.position.y = y - 100;
                        textMesh_area.position.z = z;

                        textMesh_intro.position.x = x;
                        textMesh_intro.position.y = y - 160;
                        textMesh_intro.position.z = z;



                        var text_cLine_material = new THREE.LineBasicMaterial({
                            color: 0x00aeff
                        });
                        var text_cLine = new THREE.Geometry();
                        
                        text_cLine.vertices.push(
                            new THREE.Vector3( x, y-20,z ),
                            new THREE.Vector3( x,0,z),
                        );

                        var text_cLine_Final = new THREE.Line( text_cLine, text_cLine_material );
                        that.scene.add(text_cLine_Final);
                        
                        textMesh.name = n;
                        textMesh_area.name = n + "-area";
                        textMesh_intro.name = n + "-intro";

                        that.scene.add( textMesh );
                        that.scene.add( textMesh_area );
                        that.scene.add( textMesh_intro );
                        console.log(that.scene)
                    
                    });
                }

                

                var loader = new THREE.FontLoader();


    

				OBJLoader2Example.prototype._reportProgress = function( event ) {
					var output = Validator.verifyInput( event.detail.text, '' );
					console.log( 'Progress: ' + output );
					//document.getElementById( 'feedback' ).innerHTML = output;
					
				};

				OBJLoader2Example.prototype.resizeDisplayGL = function () {
					//this.controls.handleResize();
					this.recalcAspectRatio();
					this.renderer.setSize( this.canvas.offsetWidth, this.canvas.offsetHeight, false );
					this.updateCamera();
					
				};

				OBJLoader2Example.prototype.recalcAspectRatio = function () {
					this.aspectRatio = ( this.canvas.offsetHeight === 0 ) ? 1 : this.canvas.offsetWidth / this.canvas.offsetHeight;
				};

				OBJLoader2Example.prototype.resetCamera = function () {
					this.camera.position.copy( this.cameraDefaults.posCamera );
					this.cameraTarget.copy( this.cameraDefaults.posCameraTarget );
					this.updateCamera();
				};

				OBJLoader2Example.prototype.updateCamera = function () {
					this.camera.aspect = this.aspectRatio;
					this.camera.lookAt( this.cameraTarget );
					this.camera.updateProjectionMatrix();
				};

				OBJLoader2Example.prototype.render = function () {
					//if ( ! this.renderer.autoClear ) this.renderer.clear();
					this.controls.update();
					this.renderer.render( this.scene, this.camera );
				};

				return OBJLoader2Example;
			})();

			var app = new OBJLoader2Example( document.getElementById( 'main' ) );
			var resizeWindow = function () {
				app.resizeDisplayGL();
			};
			var render = function () {
				
                requestAnimationFrame( render );
                
                var aCText0 = app.scene.getObjectByName("AREA-1");
                var aCText1 = app.scene.getObjectByName("AREA-2");
                var aCText2 = app.scene.getObjectByName("AREA-3");
                
                var aCText0_area = app.scene.getObjectByName("AREA-1-area");
                var aCText1_area = app.scene.getObjectByName("AREA-2-area");
                var aCText2_area = app.scene.getObjectByName("AREA-3-area");

                var aCText0_intro = app.scene.getObjectByName("AREA-1-intro");
                var aCText1_intro = app.scene.getObjectByName("AREA-2-intro");
                var aCText2_intro = app.scene.getObjectByName("AREA-3-intro");
                
                aCText0.lookAt( app.camera.position );
                aCText1.lookAt( app.camera.position );
                aCText2.lookAt( app.camera.position );

                aCText0_area.lookAt( app.camera.position );
                aCText1_area.lookAt( app.camera.position );
                aCText2_area.lookAt( app.camera.position );
                
                aCText0_intro.lookAt( app.camera.position );
                aCText1_intro.lookAt( app.camera.position );
                aCText2_intro.lookAt( app.camera.position );

				//Turn On and Off the camera auto-rotation
				if(cameraRotate == 1){
					//Animate Camera
					var timer = Date.now() * 0.0001;
					app.camera.position.x = Math.cos( timer ) * 3600;
					app.camera.position.z = Math.sin( timer ) * 3600;				
				}else{
					//closer and transparant
					var tranOpTarget_Main = app.scene.getObjectById(22);
					var tranOpTargetChildren_Main = tranOpTarget_Main.children;
					//console.log(tranOpTarget_Inner)
					//z < 800 || z > -800
					if(app.camera.position.x < 5400 
						&& app.camera.position.x > -5400 
						&& app.camera.position.z < 5400 
						&& app.camera.position.z > -5400 
						&& app.camera.position.y < 5400 
						&& app.camera.position.y > -5400){
						//tranOpTarget_Main.children.material.opacity = 0.05;
						for(i=0;i<tranOpTargetChildren_Main.length;i++){
							tranOpTarget_Main.children[i].material.opacity = 0.05;
						}

					}else{

						for(i=0;i<tranOpTargetChildren_Main.length;i++){
							tranOpTarget_Main.children[i].material.opacity = 0.8;
						}

					}
					//do nothing...
				}
				


				app.render();
				
			};
			window.addEventListener( 'resize', resizeWindow, false );

			app.initGL();
			app.resizeDisplayGL();
			app.initContent();
			//app.initSeat();
			app.initLt();
			render();