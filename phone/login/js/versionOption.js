appcan.ready(function() {
    //获取当前的版本号
    // uexWidgetOne.getCurrentWidgetInfo();  //引擎3.X的操作方法
    // uexWidgetOne.cbGetCurrentWidgetInfo = function(opId, dataType, data) {
            // var info = JSON.parse(data);
            // var softVer = info.version;  //之后再比对哪个版本是最新的，然后在提供下载的
    // }
    
//++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
//当前的条码
//++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
    var versionNum = 0;
//++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
//准备下载的文件名,准备下载的地址
    var dlFileName = 'install.apk',
        downUrl;
//++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
    //请求判断是否需要更新或者得打下载地址
    (function(softVer){
        appcan.request.ajax({
            url:'http://10.101.55.73/fzzy/SPEngine/Barcode',
            type:'POST',
            data:{
                input:JSON.stringify({
                    LogicType:"登录",
                    OpType:"版本控制",
                    nVersion:softVer
                 })
            },
            dataType:'json',
            success : function( info ){
                //更具是否更新,来调用下载方法
                console.log(JSON.stringify(info));
                //如果当期版本是旧的版本
                if( info.IsOldVersion ){
                    var url = info.DownloadUrl+'/'+info.nCurrentVersion;
                    //赋值文件名
                    alert('版本有更新,请安装该程序！');
                    dlFileName = info.Name || dlFileName;
                    downUrl = url;
                    // alert('文件名:' + dlFileName);    
                    // alert('地址:' + url);                  
                    
                    //不允许打开浮动页面
                    openFloatWin(false);
                    //创建下载对象
                    createDown();
                    // console.log(dlFileName,url);
                    
                }else{
                    //允许打开浮动页
                    openFloatWin(true);
                }
            },
            error : function(e){
                appcan.window.openToast('网络请求出错！',1000,5,0);
            }
        });
    })(versionNum);
    
    //下载处理函数
    var createDown = function(){
        //alert('准备创建下载对象');
        uexDownloaderMgr.createDownloader(10);
    }
    //创建下载对象回调
    uexDownloaderMgr.cbCreateDownloader = function(opCode,dataType,data){
            if(data == 0){
                //创建下载对象
                //alert('创建下载对象成功!部署地址！');
                uexDownloaderMgr.download(10, downUrl, "wgt://data/down/"+dlFileName ,1);
            }else{
                alert('创建下载链接失败！');
            }
    } 
    
    //下载状态对象  
    uexDownloaderMgr.onStatus = function(opCode,fileSize,percent,status){
        switch (status) {
            case 0:
                //下载中
                //alert('下载中...');
                document.getElementById('percentage').innerHTML ="文件大小:"+fileSize+"字节<br>下载进度:"+percent + '%';
                break;
            case 1:
                alert("下载完成，请安装。");
                uexDownloaderMgr.closeDownloader(opCode);
                //下载完成后，直接安装指定位置的apk
                uexWidget.installApp("wgt://data/down/"+dlFileName);
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
    //打开浮动页
    var openFloatWin = function(permissionFlag){
        if(permissionFlag){
                var titHeight = $('#header').offset().height;
                appcan.frame.open("content", "login_content.html", 0, titHeight);
                window.onorientationchange = window.onresize = function() {
                    appcan.frame.resize("content", 0, titHeight);
                }
            }else{
                appcan.window.openToast('请先更新程序！',0,5,0);
        }
    }
});
