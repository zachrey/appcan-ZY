var localOption = (function(){
    return {
        localSave :function(name){
            var WINDOWNAMES = appcan.locStorage.val('WINDOWNAMES');
            WINDOWNAMES = eval('('+WINDOWNAMES+')');
            WINDOWNAMES.push(name);
            appcan.locStorage.val('WINDOWNAMES',WINDOWNAMES);
        },
        localPop : function(){
             var WINDOWNAMES = appcan.locStorage.val('WINDOWNAMES');
             WINDOWNAMES = eval('('+WINDOWNAMES+')');
             var length = WINDOWNAMES.length;
             WINDOWNAMES.splice(WINDOWNAMES.length-1,1);
             var flag = length > WINDOWNAMES.length ? true : false;
             appcan.locStorage.val('WINDOWNAMES',WINDOWNAMES);
             return flag;
        },
        intiWindowsName:function(){
            appcan.locStorage.remove('WINDOWNAMES');
            appcan.locStorage.val('WINDOWNAMES',['root']);
        },
        getWindowName:function(){
            var WINDOWNAMES = appcan.locStorage.val('WINDOWNAMES');
            WINDOWNAMES = eval('('+WINDOWNAMES+')');
            return WINDOWNAMES[WINDOWNAMES.length -1];
        }
    };
}());

