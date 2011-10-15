function InteractiveElements(element) {
	var self = this;
	this.root = element;
	
	this.initalize = function() {
		if($(window).height() > 684) $('#projectMenu').css('top', $(window).height() - 164);
		if($(window).height() > 784) {
				var padding = $(window).height() - 784;
			
				$('#bottomContainer').css('padding-bottom', padding);
		}
		
		$(window).resize(function(){
			if($(window).height() > 684) $('#projectMenu').css('top', $(window).height() - 164);
			if($(window).height() > 784) {
				var padding = $(window).height() - 784;
			
				$('#bottomContainer').css('padding-bottom', padding);
			}
		});
		
		
		
	
		
		$("#resume a").hover(function(event) {
	
			$('#resume a').css({"background" : "url(media/images/about/resumeBtn_hover.png)", "color" : "#e3e7ec"});
			
	
		}, function() {  
			
			$('#resume a').css({"background" : "url(media/images/about/resumeBtn.png)", "color" : "#ffffff"}); 
		
     	});
		
		
		
		$("#previewSite a").hover(function(event) {
	
			$("#previewSite a").css({"color" : "#76b7d8"});
			
	
		}, function() {  
			
			$("#previewSite a").css({"color" : "#ffffff"}); 
		
     	});
		
		$("#linked").hover(function(event) {
			
			$('#linked img').attr("src" , "media/images/about/linkedIcon_hover.png");
			
	
		}, function() {  
			
			$('#linked img').attr("src" , "media/images/about/linkedIcon.png"); 
		
     	});
		
		$("#twitter").hover(function(event) {
			
			$('#twitter img').attr("src" , "media/images/about/twitterIcon_hover.png");
			
	
		}, function() {  
			
			$('#twitter img').attr("src" , "media/images/about/twitterIcon.png"); 
		
     	});
		
		$("#facebook").hover(function(event) {
			
			$('#facebook img').attr("src" , "media/images/about/facebookIcon_hover.png");
			
	
		}, function() {  
			
			$('#facebook img').attr("src" , "media/images/about/facebookIcon.png"); 
		
     	});
		
		 $('#loopedSlider').loopedSlider({
			containerClick: false,
			slidespeed: 400,
			fadespeed: 200
		});
		
		$('#projectSlider').loopedSlider({
			containerClick: false,
			slidespeed: 400,
			fadespeed: 200
		});
		
		$('#projectSlider').hide();

		$(".next img").hover(function(event) {
		

			$(".next img").attr("src","media/images/rightArrow_active.png");
			
	
		}, function() {  
			
			$(".next img").attr("src","media/images/rightArrow.png"); 
		
     	});
		
		$(".previous img").hover(function(event) {
		

			$(".previous img").attr("src","media/images/leftArrow_active.png");
			
	
		}, function() {  
			
			$(".previous img").attr("src","media/images/leftArrow.png"); 
		
     	});
			
		
		$(".thumbNav img").click(function(event) {
		
			var selectedThumb = this.id;
					
			$('#loopedSlider').load('projects.html #projectInfo', function() {
				$.ajax({
					type: 'GET',
					url: 'xml/projectData.xml',
					dataType: 'xml',
					success: function(xml_list) {
						
						$(xml_list).find('project').each(function(i) {
	
							var projectID = $(this).attr('id');
							var projectTitle = $(this).attr('projectTitle');
							var projectDesc = $(this).find('description').text();
							var projectTech = "";
							var projectImages = "";
							var projectURL = $(this).find('url').text();
							
							var length = $(this).find('url').text().length;
							$('#projectInfo, #projectSlider').hide();
							
							if ( projectID == selectedThumb ) {
								$('#projectSlider').show();
								$('#projectInfo h2').text(projectTitle);
								
								$('#siteURL').attr('href', projectURL);
								
								if(length < 8) {
									$('#siteURL').css("display", "none");
								}
								
								$('#projectInfo p').text(projectDesc);
								
								$(this).find("technology").each(function(i) {
					  	
									projectTech = $(this).text();
									$('<li>'+ projectTech + '</li>').appendTo('#projectInfo ul');
								

								});
								
	
								$(this).find("image").each(function(i) {
					  	
									projectImages = $(this).text();
		
									if(i == 0) {
										$('#firstPreview img').attr("src", projectImages).load(function() {
											$('#projectInfo, #projectSlider').fadeIn();															
										}); 	
										
									}
									else if(i == 1) {
										$('#secondPreview img').attr("src", projectImages);	
									}
									else if(i == 2) {
										$('#thirdPreview img').attr("src", projectImages);	
									}
								});
								
								
							}
				   
						});
						
					}
	
				});
					  		   
			});
			
			return false;
			
		});
		
		
		$(".thumbNav img").hover(function(event) {
		
			$(this).attr("src", function() { 
          		return "media/images/projects/thumbnails/" + this.name + "_hover.png"; 
        	});
	
	
		}, function() {  
			
			$(this).attr("src", function() { 
          		return "media/images/projects/thumbnails/" + this.name + ".png"; 
        	});
		
     	});
		
		$("#siteURL").hover(function(event) {
			$("#siteURL").css({"color" : "#76b7d8"});
			
	
		}, function() {  
			
			$("#siteURL").css({"color" : "#ffffff"}); 
		
     	});
		
	}

	self.initalize();
	
}