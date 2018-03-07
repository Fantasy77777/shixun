// function openregister(){
//     var s = document.getElementById("test");
//     s.style.display = "block";
    
//     var l = document.getElementById("register");
//     l.style.display = "block";
// }
// function closeregister(){
// 	var s = document.getElementById("test");
//     s.style.display = "none";
    
//     var l = document.getElementById("register");
//     l.style.display = "none";
// }
// $(".test").style.display="block";
// $("#register").style.display="block";

// $(document).ready(function(){
//   $("#button1").click(function(){
//     $("#test").css("display","block");
//     $("#register").css("display","block");
//   })
// })


// $(document).ready(function(){
//   $("#button1").click(function(){
//     $("#test")[0].style.display='block';
//     $("#register")[0].style.display='block';
//   })
// })
$(document).ready(function(){
  $("#button1").click(function(){
    $("#test").show();
    $("#register").show();
  })
})
$(document).ready(function(){
  $("#close").click(function(){
    $("#test").hide();
    $("#register").hide();
  })
})


$(function(){
  $("#sure").click(function(){
    var name = $("#name").val();
  	var p1=$("#password1").val();
  	var p2=$("#password2").val();
  	if (p1!=p2) {
  		alert("两次密码不一样！");
    } else if (p1==""||p2==""){
      alert("你好，密码不能为空！");
    }
    else{
      // var  i=parseInt(localStorage.getItem('count'))+1;  
      // localStorage.setItem('name'+i ,name);  
      // localStorage.setItem('password' +i, p1); 
      // localStorage.setItem('count',i);
      localStorage.setItem(name,p1);
      alert("注册成功！");
    }
	}) 
  })
$(function(){
  $("#button2").click(function(){
    var username = $("#username").val();
    var userpassword = $("#userpassword").val();
    var p1=localStorage.getItem(username);
    if(localStorage.getItem(username)==undefined){
      alert("用户名不存在");
    }
    else if (userpassword != p1) {
      alert("密码不对");
    }
    else{
      window.open("shixun2.html");
    }
  })
})




