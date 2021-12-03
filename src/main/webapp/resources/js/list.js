/**
 * 
 */
$(document).ready(function(){
	var bno=$("#bno").val();
	console.log(bno)
	//alert(bno)
	$.getJSON("getAttachList",{bno:bno},function(arr){
		console.log(arr)
		var str="";
		$(arr).each(function(i,attach){
			console.log(attach.filetype=="true");
			if(attach.filetype=="true"){// 이미지 파일이면,
				var fileCallPath =  encodeURIComponent( attach.uploadpath+ "/s_"+attach.uuid +"_"+attach.filename);
				str +="<li data-path='"+attach.uploadpath+"'";
				str +=" data-uuid='"+attach.uuid+"' data-filename='"+attach.filename+"' data-type='"+attach.filetype+"'>"
				str +="<div>";
				str +="<a href='/read?bno="+bno+"'>";
				str += "<img src='/resources"+fileCallPath+"'>";
				str +="</a>"
				str += "</div>";
				str +"</li>";
			}else{	// 이미지 파일이 아니면,
				return false;
			}
		})// $(arr).each(function(i,attach){끝
		$(".uploadResult ul").html(str);
	})
})