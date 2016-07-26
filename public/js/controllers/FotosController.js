angular.module('alurapic').controller('FotosController', function($scope, fotos) {
		fotos.getFotos().then(function(fotos){
			$scope.fotos = fotos
		});

		$scope.remover = function(foto) {
				fotos.remove(foto)
					.then(function(){
						$scope.mensagem = 'Foto ' + foto.titulo + ' removida com sucesso!';
					})
					.catch(function(erro){
						$scope.mensagem = 'Não foi possível apagar a foto ' + foto.titulo;
						console.error(erro);
					})
		};

});
