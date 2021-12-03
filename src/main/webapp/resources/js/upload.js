/**
 * 
 */
$(document).ready(function(e){

   var formObj=$("form[role='form']");

   $("input[type='submit']").on("click",function(e){

      e.preventDefault();
      
      var str="";
      
      $(".uploadResult ul li").each(function(i,obj){
    	  var jobj=$(obj);
    	  														
		  str+="<input type='text' name='t' value='/resources/img"+"/s_"+jobj.data("uuid")+"_"+jobj.data("filename")+"'>"
    	  str+="<input type='text' name='attachList["+i+"].filename' value='"+jobj.data("filename")+"'>"
    	  str+="<input type='text' name='attachList["+i+"].uuid' value='"+jobj.data("uuid")+"'>"
    	  str+="<input type='text' name='attachList["+i+"].uploadpath' value='"+jobj.data("path")+"'>"
    	  str+="<input type='text' name='attachList["+i+"].filetype' value='"+jobj.data("type")+"'>"
      })
//      formObj.append(str).submit();
      formObj.append(str);
   })// $("button[type='submit']") 끝
   
                     // 정규식
   var regex = new RegExp("(.*?)\.(exe|sh|zip|alz)$");
   var maxSize = 5242880; 
   // checkExtension함수 선언
   function checkExtension(filename, fileSize) {

      if (fileSize >= maxSize) {
         alert("파일 사이즈 초과");
         return false;
      }

      if (regex.test(filename)) {
         alert("해당 종류의 파일은 업로드할 수 없습니다.");
         return false;
      }
      return true;
   } // checkExtension함수 끝
   $("input[type='file']").change(function(e) {

      var formData = new FormData();

      var inputFile = $("input[name='uploadFile']");

      var files = inputFile[0].files;

      console.log(files);

      for (var i = 0; i < files.length; i++) {
         // checkExtension함수 호출
         if (!checkExtension(files[i].name, files[i].size)) {
            return false;
         }
     
         formData.append("uploadFile", files[i]);
      }

      $.ajax({
         url : '/uploadAjaxAction',
         processData : false,
         contentType : false,
         data : formData,
         type : 'POST',
         dataType : 'json',
         success : function(result) {
      
            console.log(result);
            
            showUploadResult(result);
      

         }
      }); //$.ajax
      
   }); //$("input[type='file']").change(function(e) { 이벤트 끝
   $(".ucBtn").click(function(){
	   $(".uploadDiv").find("input[type='file']").val(null);
	   $(".uploadResult ul").html("");
   })
   function showUploadResult(uploadResultArr){
    
         if(!uploadResultArr || uploadResultArr.length==0){
            return;
         }
         var uploadUL = $(".uploadResult ul");
         
         var str = "";
         
         $(uploadResultArr).each(function(i, obj){
           console.log(obj);
           
           if(obj.image){
               var fileCallPath =  encodeURIComponent( obj.uploadPath+ "/s_"+obj.uuid +"_"+obj.fileName);
               str += "<li data-path='"+obj.uploadPath+"'";
               str +=" data-uuid='"+obj.uuid+"' data-filename='"+obj.fileName+"' data-type='"+obj.image+"'"
               str +" ><div>";
               str += "<span> "+ obj.fileName+"</span>";
               str += "<br>";
               str += "</div>";
               str +"</li>";
            }else{ 
               var fileCallPath =  encodeURIComponent( obj.uploadpath+"/"+ obj.uuid +"_"+obj.fileName);               
                var fileLink = fileCallPath.replace(new RegExp(/\\/g),"/");
                  
               str += "<li "
               str += "data-path='"+obj.uploadPath+"' data-uuid='"+obj.uuid+"' data-filename='"+obj.fileName+"' data-type='"+obj.image+"' ><div>";
               str += "<span> "+ obj.fileName+"</span>";
               str += "<button type='button' data-file=\'"+fileCallPath+"\' data-type='file' " 
               str += "><i class='fa fa-times'>X</i></button><br>";
               str += "</a>";
               str += "</div>";
               str +"</li>";
            }
           
         });
         
         uploadUL.append(str);
       }
   $(".uploadResult").on("click","button", function(e){
	   
		  var targetFile = $(this).data("file");
		  var type = $(this).data("type");
		  
		  var targetLi=(this).closest("li");
		  console.log(targetFile);
		  
		  $.ajax({
		    url: '/deleteFile',
		    data: {filename: targetFile, type:type},
		    dataType:'text',
		    type: 'POST',
		      success: function(result){
		         alert(result);
		         targetLi.remove();
		       }
		  }); //$.ajax
		  
		});
   
   
})