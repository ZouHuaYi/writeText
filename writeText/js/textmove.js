/*
*anchor:zhy
*  content:{   ÿ����ʾ������
 "a":"���ߣ�zhy;" ,
 "b":"����25��;",
 "c":"δ��",
 "d":"���Ʊ�ҵ�ڹ㶫�����ѧ��"
 },
 height:30,      �����ı���λ�߶ȵĴ�С
 distance:20,    ����ÿһ���ߵľ����Ƕ���
 lineNum:0,      ������һ����������߹��Ķ���
 haveLine:false, ���ǵڶ�����ӵ�ʱ�������ӵ�����
 line:"_",       ���
 moveTime:100,   ʱ��
 callback:function(){} �ص�����
* */
(function($){
    var olink=$('<link rel="stylesheet" href="css/textstyle.css" type="text/css"/>');
    $("head").append(olink);
    var opt={
        content:{
            "a":"���ߣ�zhy;" ,
            "b":"����25��;",
            "c":"δ��",
            "d":"�Ա���",
            "e":"���Ʊ�ҵ�ڹ㶫�����ѧ��"
        },
        height:30,      //�����ı���λ�߶ȵĴ�С
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
    function writeText(obj){ //������Ҫ�ĺ������֣�
        $.extend(setting,opt,obj);
        $parent=this;
        onoff=true;
        if(!setting.haveLine){
            setHtml();   //��̬������Ҫ�ṹ�ĺ���
        }
        setText();   //������ʾ����ĺ���
        lineBor();   //�����ʾ�ĺ���
        gowidth=setting.distance;
        goheight=setting.height;
        lineRun(gowidth,setting.lineNum);  //�ƶ���������ĺ���
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