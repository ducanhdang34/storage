var _lb={};function ajaxStart(){0===$("#loading-bar").length&&($("body").append($("<div/>").attr("id","loading-bar").addClass(_lb.position)),_lb.percentage=30*Math.random()+30,$("#loading-bar")[_lb.direction](_lb.percentage+"%"),_lb.interval=setInterval((function(){_lb.percentage=Math.random()*((100-_lb.percentage)/2)+_lb.percentage,$("#loading-bar")[_lb.direction](_lb.percentage+"%")}),500))}function ajaxStop(){window.scrollTo(0,0),clearInterval(_lb.interval),$("#loading-bar")[_lb.direction]("101%"),setTimeout((function(){$("#loading-bar").fadeOut(300,(function(){$(this).remove()}))}),300)}_lb.position="top",_lb.direction="width",_lb.get=function(t){_lb.loading=!0,jQuery.ajax({url:this.href,success:function(i){_lb.loading=!1,"function"==typeof t&&t(i)}})},jQuery((function(t){t(".btn-action").click((function(){switch(t(this).data("action")){case"load":_lb.get();break;case"position":_lb.position=t(this).data("position"),_lb.direction=t(this).data("direction"),t("#section-position h1 small").html(_lb.position)}}))}));