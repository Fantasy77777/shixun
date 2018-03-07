function ceshi(){
	alert("我是测试用的");
}


window.indexedDB = window.indexedDB || window.webkitIndexedDB || window.mozIndexedDB || window.msIndexedDB;
window.IDBTransaction = window.IDBTransaction || window.webkitIDBTransaction || window.msIDBTransaction ||window.mozIDBTransaction;
window.IDBKeyRange = window.IDBKeyRange || window.webkitIDBKeyRange || window.msIDBKeyRange ||window.mozIDBKeyRange;
window.IDBCursor = window.IDBCursor || window.webkitIDBCursor || window.msIDBCursor ||window.mozIDBCursor;
var dbName = 'MyData';
var dbVersion = 20170924; 
var idb,datatable;
var data;

function window_onload(){
	var dbConnect = indexedDB.open(dbName,dbVersion);
	dbConnect.onsuccess = function(e){
		idb = e.target.result;
		datatable = document.getElementById("datatable");
		showAllData(false);                             //++++++++++++++++++++++++++++++++++++
	};
	dbConnect.onerror = function(){
		alert("数据库连接失败");
	};
	// 请求数据库版本变化的句子
	dbConnect.onupgradeneeded = function(e){  
		idb = e.target.result;
		if (!idb.objectStoreNames.contains('orders'))
		{
			var tx = e.target.transaction;
			tx.oncomplete = function(){
				showAllData(true);
			}
			tx.onabort = function(e){
				alert('对象仓库创建失败');
			};
			var name = 'orders';
			var optionalParameters = {
				keyPath : 'id',
				autoIncrement: true
			};
			var store = idb.createObjectStore(name, optionalParameters);
			alert('对象仓库创建成功');
			var name = 'codeIndex';
			var keyPath = 'code';
			var optionalParameters = {
				unique : true,
				multiEntry: false
			};
			var idx = store.createIndex(name,keyPath,optionalParameters);
			alert('索引创建成功');
		}
	};	
}
function tbxNum_onblur()
{
	var num,price;
	num = parseInt(document.getElementById("tbxNum").value);
	price = parseFloat(document.getElementById("tbxPrice").value);
	if (isNaN(num*price)) 
	{
		document.getElementById("tbxNum").value = "0";
		document.getElementById("tbxMoney").value = "0";
	}
	else
		document.getElementById("tbxMoney").value = (num * price);//*****
}
function tbxPrice_onblur()
{
	var num,price;
	num = parseInt(document.getElementById("tbxNum").value);
	price = parseFloat(document.getElementById("tbxPrice").value);

	if (isNaN(num*price))
	{
		document.getElementById("tbxPrice").value = "0";
		document.getElementById("tbxMoney").value = "0";
	}
	else
		document.getElementById("tbxMoney").value = num * price;
}
function btnAdd_onclick()
{ 
	data = new Object();
	data.Code = document.getElementById("tbxCode").value;
	data.Date = document.getElementById("tbxDate").value;
	data.GoodsCode = document.getElementById("tbxGoodsCode").value;
	data.BrandName = document.getElementById("tbxBrandName").value;
	data.Num = document.getElementById("tbxNum").value;
	data.Price = document.getElementById("tbxPrice").value;
	data.PersonName = document.getElementById("tbxPersonName").value;
	data.Email = document.getElementById("tbxEmail").value;
	var tx = idb.transaction(['orders'],"readwrite");
	var chkErrorMsg="";
	tx.oncomplete = function(){
		if (chkErrorMsg!="")
			alert(chkErrorMsg);
		else{
			alert('追加数据成功');
			showAllData(false);
			btnNew_onclik();
		}
	}
	tx.onabort = function(){alert('追加数据失败');}
	var store = tx.objectStore('orders');
	var idx = store.index('codeIndex');
	var range = IDBKeyRange.only(data.Code);
	var direction = "next";
	var req = idx.openCursor(range,direction);
	req.onsuccess = function(){
		var cursor = this.result;
		if (cursor) {
			chkErrorMsg = "输入的订单号已存在！";
		}
		else{
			var value ={
				code:data.Code,
				date:data.Date,
				goodscode:data.GoodsCode,
				brandName:data.BrandName,
				num:data.Num,
				price:data.Price,
				personName:data.PersonName,
				email:data.Email
			};
			store.put(value);
		}
	}
	req.onerror = function(){
		alert('追加数据失败');
	}
}
function btnUpdate_onclick()
{
	data = new Object();
	data.Code = document.getElementById("tbxCode").value;
	data.Date = document.getElementById("tbxDate").value;
	data.GoodsCode = document.getElementById("tbxGoodsCode").value;
	data.BrandName = document.getElementById("tbxBrandName").value;
	data.Num = document.getElementById("tbxNum").value;
	data.Price = document.getElementById("tbxPrice").value;
	data.PersonName = document.getElementById("tbxPersonName").value;
	data.Email = document.getElementById("tbxEmail").value;
	var tx = idb.transaction(['orders'],"readwrite");
	tx.oncomplete = function(){
		alert('修改数据成功');
		showAllData(false);
	}
	tx.onabort = function(){alert('修改数据失败');}
	var store = tx.objectStore('orders');
	var idx = store.index('codeIndex');
	var range = IDBKeyRange.only(data.Code);
	var direction = "next";
	var req = idx.openCursor(range,direction);
	req.onsuccess = function(){
		var cursor = this.result;
		if (cursor) {
			var value = {
				id:cursor.value.id,
				code:data.Code,
				date:data.Date,
				goodscode:data.GoodsCode,
				brandName:data.BrandName,
				num:data.Num,
				price:data.Price,
				personName:data.PersonName,
				email:data.Email
			};
			cursor.update(value);
		}
	}
	req.onerror = function(){
		alert('修改数据失败');
	}
}
	function btnDelete_onclick()                                      
	{
		var tx = idb.transaction(['orders'],"readwrite");            //   {['orders'],"readwrite"};
		tx.oncomplete = function(){
			alert('删除数据成功');
			showAllData(false);
			//btnNew_onclik();
		}
		tx.onabort = function(){alert('删除数据失败');}
		var store = tx.objectStore('orders');
		var idx = store.index('codeIndex');
		var range = IDBKeyRange.only(document.getElementById("tbxCode").value);
		var direction = "next";
		var req = idx.openCursor(range,direction);
		req.onsuccess = function(){
			var cursor = this.result;
			if (cursor) {
				cursor.delete();                      ///+value
			}
		}
		req.onerror = function(){
			alert('删除数据失败');
		}

	}
function btnNew_onclick()
{
	document.getElementById("form1").reset();
	document.getElementById("tbxCode").removeAttribute("readonly");
	// document.getElementById("btnAdd").disabled="";
	// document.getElementById("btnUpdate").disabled="disabled";
	// document.getElementById("btnDelete").disabled="disabled";

}
function btnClear_onclick()
{
	document.getElementById("tbxCode").value="";       //+++++++++++++++++++++++
	document.getElementById("tbxDate").value="";
	document.getElementById("tbxGoodsCode").value="";
	document.getElementById("tbxBrandName").value="";
	document.getElementById("tbxNum").value="0";
	document.getElementById("tbxPrice").value="0";
	document.getElementById("tbxMoney").value="0";
	document.getElementById("tbxPersonName").value="";
	document.getElementById("tbxEmail").value="";	
}
function tr_onclick(tr,i)
{
	document.getElementById("tbxCode").value=tr.children.item(0).innerHTML;
	document.getElementById("tbxDate").value=tr.children.item(1).innerHTML;
	document.getElementById("tbxGoodsCode").value=tr.children.item(2).innerHTML;
	document.getElementById("tbxBrandName").value=tr.children.item(3).innerHTML;
	document.getElementById("tbxNum").value=tr.children.item(4).innerHTML;
	document.getElementById("tbxPrice").value=tr.children.item(5).innerHTML;
	document.getElementById("tbxMoney").value=tr.children.item(6).innerHTML;
	document.getElementById("tbxPersonName").value=tr.children.item(7).innerHTML;
	document.getElementById("tbxEmail").value=tr.children.item(8).innerHTML;
	//document.getElementById("tbxCode").setAttribute("readonly",true);
	//document.getElementById("btnAdd").disabled="disabled";
	//document.getElementById("btnUpdate").disabled="";
	//document.getElementById("btnDelete").disabled="";
}
function showAllData(loadpage)
{
	if(!loadpage)
		removeAllData();
	 var tx = idb.transaction(['orders'],"readonly")//{['orders'],"readonly"};    //就是这句
	var store = tx.objectStore('orders');
	var range = IDBKeyRange.lowerBound(1);


	var direction = "next";
	var req = store.openCursor(range,direction);
	var i=0;
	req.onsuccess = function(){
		var cursor = this.result;
		if(cursor){
			i+=1;
			showData(cursor.value,i);
			                            //               alert(cursor.value);              ///+++++++++++++++++++++++++++++
			cursor.continue();
		}
	}
	req.onerror = function(){
		alert('检索数据失败');
	}
}
function removeAllData()
{
	for (var i=datatable.childNodes.length-1;i>1;i--)
		datatable.removeChild(datatable.childNodes[i]);
}
function showData(row,i)
{
	var tr = document.createElement('tr');
	tr.setAttribute("onclick","tr_onclick(this,"+i+")");
	var td1 = document.createElement('td');
	td1.innerHTML = row.code;
	var td2 = document.createElement('td');
	td2.innerHTML = row.date;
	var td3 = document.createElement('td');
	td3.innerHTML = row.goodscode;
	var td4 = document.createElement('td');
	td4.innerHTML = row.brandName;
	var td5 = document.createElement('td');
	td5.innerHTML = row.num;
	var td6 = document.createElement('td');
	td6.innerHTML = row.price;
	var td7 = document.createElement('td');
	td7.innerHTML = parseInt(row.num)*parseFloat(row.price);
	var td8 = document.createElement('td');
	td8.innerHTML = row.personName;
	var td9 = document.createElement('td');
	td9.innerHTML = row.email;
	tr.appendChild(td1);
	tr.appendChild(td2);
	tr.appendChild(td3);
	tr.appendChild(td4);
	tr.appendChild(td5);
	tr.appendChild(td6);
	tr.appendChild(td7);
	tr.appendChild(td8);
	tr.appendChild(td9);
	datatable.appendChild(tr);
}