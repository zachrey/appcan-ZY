var localOption = (function(){
    return {
        localSave :function(name){
            appcan.window.evaluateScript({
               name:"root", 
               scriptContent:"setWindowName('"+name+"')"
            });
        },
        localPop : function(){
            appcan.window.evaluateScript({
               name:"root", 
               scriptContent:"popWindowName()"
            });
        }
        // showWindowName:function(){
            // var WINDOWNAMES = appcan.locStorage.val('WINDOWNAMES');
            // WINDOWNAMES = eval('('+WINDOWNAMES+')');
            // alert(WINDOWNAMES[WINDOWNAMES.length-1]);
        // }
        // intiWindowsName:function(){
            // appcan.locStorage.remove('WINDOWNAMES');
            // appcan.locStorage.val('WINDOWNAMES',['root']);
        // },
        // getWindowName:function(){
            // var WINDOWNAMES = appcan.locStorage.val('WINDOWNAMES');
            // return WINDOWNAMES;
        // }
    };
}());

