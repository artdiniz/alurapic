angular.module('minhasDiretivas', [])
       .directive('meuPainel', function(){
			  	var ddo = {}

					ddo.restrict = "AE"

					ddo.transclude = true

					ddo.scope = {
						titulo: '@'
					}

					ddo.templateUrl = 'js/directives/meu-painel.html'

					return ddo
			  })
			 .directive('minhaFoto', function(){
				 var ddo = {}

				 ddo.restrict = 'AE'

				 ddo.scope = {
					 titulo: '@'
					 ,url: '@'
				 }

				 ddo.template = '<img class="img-responsive center-block" src="{{url}}" alt="{{titulo}}">'

				 return ddo
			 })
			 // módulo omitido
			 .directive('meuFocus', function() {
 		      var ddo = {};
 		      ddo.restrict = "A";
 		     // não tem mais scope
 		      ddo.link = function(scope, element) {
 		           scope.$on('fotoCadastrada', function() {
 		               element[0].focus();
 		           });
 		      };

 		      return ddo;
 		  });