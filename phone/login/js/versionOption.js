(function(){
    //获取当前的版本号
    uexWidgetOne.getCurrentWidgetInfo();  //引擎3.X的操作方法
    uexWidgetOne.cbGetCurrentWidgetInfo = function(opId, dataType, data) {
            var info = JSON.parse(data);
            var softVer = info.version;  //之后再比对哪个版本是最新的，然后在提供下载的
    }
    //请求判断是否需要更新或者得打下载地址
    var getDownUrl = function(softVer){
        appcan.ajax({
            url:'',
            type:'POST',
            data:{
                
            },
            dataType:'json',
            succeess : function( info ){
                //更具是否更新，来调用下载方法
            },
            error : function(e){
                appcan.window.openToast('网络请求出错！',1000,5,0);
            }
        });
    }
    
    //下载处理函数
    var downloadFile = function(){
        uexDownloaderMgr.createDownloader(1);
    }
    //创建下载对象回调
    uexDownloaderMgr.cbCreateDownloader = function(opCode,dataType,data){
            if(data == 0){
                //创建下载对象
                uexDownloaderMgr.download(1, "http://wallpaper.pocketdigi.com/upload/1/bigImage/1284565196.jpg", "wgt://data/down/1284565196.jpg",1);
            }else{
                alert('创建下载链接失败！');
            }
    } 
    
    //下载状态对象
    uexDownloaderMgr.onStatus = function(opCode,fileSize,percent,status){
        switch (status) {
            case 0:
                //下载中
                //document.getElementById('percentage').innerHTML ="文件大小:"+fileSize+"字节<br>下载进度:"+percent;
                break;
            case 1:
                alert("下载完成");
                uexDownloaderMgr.closeDownloader(opCode);
                //下载完成后，打开文件所在的位置,或者直接打开文件
                uexFileMgr.openFile(1,"wgt://data/down/1284565196.jpg",'1');  //id， 路径 ， 读取模式
                break;
            case 2:
                alert("下载失败");
                uexDownloaderMgr.closeDownloader(opCode);
                break;
            case 3:
                alert("已取消下载");
                break;
        }
    }
    
    //打开文件回调
    uexFileMgr.cbOpenFile=function(opId,dataType,data){
        if(data == 0){
            alert("打开文件成功");
        }else{
            alert("打开文件失败");
        }
    }
     
})();
