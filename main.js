$(document).ready(function(){



		var Meme = Backbone.Model.extend({
		  initialize: function () {
		    console.log("A new meme has been created");
		  },
		  _parse_class_name: "Meme",

		});

		var Memes = Backbone.Collection.extend({
			model:Meme,
			_parse_class_name:"Meme"
		});

		var MemeCollection = new Memes();

		MemeCollection.fetch({
			success: function(resp){
				var dataObj={'data':resp.toJSON()};
				var template= $("#memesTemplate").text();
				var memeHTML= Mustache.render(template,dataObj)
				$("#memesDiv").html(memeHTML);
			},
			error: function(err){
				console.log(err);
			}
		});








	var Router = Backbone.Router.extend({
	  initialize: function () {
	    Backbone.history.start({pushState: true});
	  },
	  routes: {
	    "meme/:objectId":"meme",
	    "":"index",
	    "add":"add"
	    
	  }
	});

	var router = new Router();

	router.on('route:index', function() {
		$("#memesDiv").show();
		$("#oneMemeDiv").hide();
		$("#nav").css("width","730px");
		$("#addForm").hide();

	});

	router.on('route:meme', function(objectId) {
	  var meme = new Meme({objectId:objectId});
	  meme.fetch({
	  	success: function(resp){
	  		var memeObj = {'data':resp.toJSON()};
			var template2=$('#memeTemplate2').text();
			var memeHTML = Mustache.render(template2,memeObj);
			$("#oneMemeDiv").html(memeHTML);
			$("#memesDiv").hide();
			$("#oneMemeDiv").show();
			$("#nav").css("width","1000px");

	  	}


	  });

	  router.on('route:add', function() {
	  	$("#memesDiv").hide();
	  	$("#addForm").show();
	  

	  
	  });
	  

	  
	 
	});




	$("body").on('click',"a", function(e){
	  e.preventDefault();
	  var href = $(this).attr('href');
	  href = href.substr(1);
	  router.navigate(href, {trigger:true});
	});



});
