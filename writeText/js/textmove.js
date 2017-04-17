/*
*anchor:zhy
*  content:{   每行显示的内容
 "a":"作者：zhy;" ,
 "b":"今年25岁;",
 "c":"未婚",
 "d":"本科毕业于广东海洋大学。"
 },
 height:30,      设置文本定位高度的大小
 distance:20,    设置每一步走的距离是多少
 lineNum:0,      这是上一次这个函数走过的段数
 haveLine:false, 这是第二次添加的时候必须添加的内容
 line:"_",       光标
 moveTime:100,   时间
 callback:function(){} 回调函数
* */
(function($){
    var olink=$('<link rel="stylesheet" href="css/textstyle.css" type="text/css"/>');
    $("head").append(olink);
    var opt={
        content:{
            "a":"作者：zhy;" ,
            "b":"今年25岁;",
            "c":"未婚",
            "d":"性别：男",
            "e":"本科毕业于广东海洋大学。"
        },
        height:30,      //设置文本定位高度的大小
        distance:20,
        lineNum:0,
        haveLine:false,
        line:"_",
        speed:100,
        callback:function(){}
    };
    var setting={},
        $parent=null;
    arrWidth=[],
        numLength=0,
        gowidth=0,
        onoff=true,
        goheight=0;
    function writeText(obj){ //这是主要的函数部分，
        $.extend(setting,opt,obj);
        $parent=this;
        onoff=true;
        if(!setting.haveLine){
            setHtml();   //动态生成主要结构的函数
        }
        setText();   //生成显示字体的函数
        lineBor();   //光标显示的函数
        gowidth=setting.distance;
        goheight=setting.height;
        lineRun(gowidth,setting.lineNum);  //移动生成字体的函数
        return this;
    };
    function setHtml(){
        var str='<div class="wrapText">'+
            ' <div class="spanText"></div>'+
            '<div class="textLine">'+setting.line+'</div>'+
            '</div>';
        $parent.html(str);
    };
    function setText(){
        for(var attr in setting.content){
            var ospan=$("<span>");
            ospan.html(setting.content[attr]);
            $(".spanText").append(ospan);
        };
        numLength=$(".spanText span").size();
        for(var i=setting.lineNum;i<numLength;i++){
            arrWidth[i]=$(".spanText span").eq(i).width();
            $(".spanText span").eq(i).css({"top":i*setting.height+"px","width":"0px","height":setting.height+"px","lineHeight":setting.height+"px"});
        };
    };
    function lineBor(){
        $(".textLine").show(100,function(){
            $(this).hide(100,function(){
                if(onoff){
                    lineBor();
                };
            });
        });
    };
    function lineRun(iW,iA){
        console.log(iW,iA)
        $(".textLine").stop(false,true).animate({"left":(iW+=gowidth)+"px"},setting.speed,function(){
            $(".spanText span").eq(iA).css({"width":iW+"px"});
            if(iW>=arrWidth[iA]){
                iA++;
                iW=0;
            };
            if(iA<numLength){
                $(".textLine").css({"top":iA*goheight+"px"});
                lineRun(iW,iA);
            }else{
                onoff=false;
                setting.callback&&setting.callback();
            };
        });
    };
    $.fn.extend({
        writeText:writeText
    })
})(jQuery);