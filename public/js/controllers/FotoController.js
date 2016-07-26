angular.module('alurapic')
		.controller('FotoController', function($scope, $routeParams, fotos) {

				$scope.foto = {};
				$scope.mensagem = '';

				$scope.focado = false;

				if($routeParams.fotoId) {
					fotos.getFoto($routeParams.fotoId)
						.then(function(foto){
							$scope.foto = foto 
						});
				}

				$scope.submeter = function() {
						if ($scope.formulario.$valid) {
							fotos.addOrUpdateFoto($scope.foto)
								.then(function(dados){
										$scope.mensagem = dados.mensagem;
										if (dados.inclusao) {
											$scope.foto = {}
											$scope.formulario.$setPristine();
										}
										$scope.focado = true;
								})
								.catch(function(erro) {
										$scope.mensagem = erro.mensagem;
								});
						};
				};
		});
