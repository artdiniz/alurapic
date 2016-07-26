angular.module('meusServicos', ['ngResource'])
		.factory('recursoFoto', function($resource) {

				return $resource('/v1/fotos/:fotoId', null, {
						'update' : {
								method: 'PUT'
						}
				});
		})
		.factory("cadastroDeFotos", function(recursoFoto, $q, $rootScope) {

				// novidade
				var evento = 'fotoCadastrada';

				var service = {};
				service.cadastrar = function(foto) {
						return $q(function(resolve, reject) {

								if(foto._id) {
										recursoFoto.update({fotoId: foto._id}, foto, function() {

												// novidade
												$rootScope.$broadcast(evento);

												resolve({
														mensagem: 'Foto ' + foto.titulo + ' atualizada com sucesso',
														inclusao: false
												});
										}, function(erro) {
												reject({
														mensagem: 'Não foi possível atualizar a foto ' + foto.titulo
												});
										});

								} else {
										 recursoFoto.save(foto, function() {

												// novidade
												$rootScope.$broadcast(evento);

												resolve({
														mensagem: 'Foto ' + foto.titulo + ' incluída com sucesso',
														inclusao: true
												});
										}, function(erro) {
												reject({
														mensagem: 'Não foi possível incluir a foto ' + foto.titulo
												});
										});
								}
						});
				};
				return service;
		})
		.service('fotos', function(recursoFoto, cadastroDeFotos, $q){
			var FotosPromise = $q(function(resolve, reject){
				recursoFoto.query(function(fotos) {
					resolve(fotos)
				}, function(erro) {
					reject(erro);
				});
			})



			return {
				 getFotos: function(){
					return FotosPromise
				}
				,getFoto: function(id){
						return FotosPromise.then(function(fotos){
							var foto = fotos.reduce(function(l, foto){
								if(foto._id == id) {
									return foto
								}
								return l
							})
							return foto
						})
				}
				,addOrUpdateFoto: function(fotoP){
					return cadastroDeFotos.cadastrar(fotoP)
					      	.then(function(dados){
								if(dados.inclusao){
									FotosPromise = $q(function(resolve, reject){
										recursoFoto.query(function(fotos) {
											resolve(fotos)
										}, function(erro) {
											reject(erro);
										});
									})
								} else {
									FotosPromise.then(function(fotos){
										FotosPromise = $q.when(fotos.map(function(foto){
											if(foto._id == fotoP._id){
												return fotoP
											}
											return foto
										}))
									})
								}
								return dados
					      	})
				}
				,remove: function(fotoP){
					return $q(function(resolve, reject){
						recursoFoto.delete({fotoId: fotoP._id}, function() {
							resolve(fotoP)
						}, function(erro) {
							reject(erro)
						});
					})
						.then(function(fotoRemovida){
							return FotosPromise
								.then(function(fotos){
									var indiceDaFoto = fotos.indexOf(fotoRemovida);
									FotosPromise.then(function(ft){
										console.log(fotos==ft)
									})
									fotos.splice(indiceDaFoto, 1);
									return fotos
								})
						})
				}
			}
		})
