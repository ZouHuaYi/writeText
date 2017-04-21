(function($){
    function MainWrite(ele,obj){
        this.opts={
            height:30,                     //设置文本定位高度的大小
            distance:20,
            line:"_",
            speed:100,
            fn:function(){},
            arrWidth:[],
            callback:function(){}
        };
        this.setting=$.extend(true,this.opts,obj);
        this.parent=ele;                            //这是这个元素对象
        this.parent.find(".spanText").append('<div class="textLine">'+this.setting.line+'</div>');
        this.$textLine=ele.find(".textLine");
        this.$ospan=ele.find(".spanText span");
        this.numLength=this.$ospan.size();
        this.onoff=true;
        this.gowidth=this.setting.distance;
        this.goheight=this.setting.height;
    };
    MainWrite.prototype.writeMove=function(){
        this.setText();                //生成显示字体的函数
        this.lineBor();                //光标显示的函数
        this.lineRun(this.gowidth,0);  //移动生成字体的函数
    };
    MainWrite.prototype.setText=function(){
        var p=this;
        this.$ospan.each(function(i,ele){
            p.setting.arrWidth[i]= $(ele).width();
            $(ele).css({"top":i* p.setting.height+"px","width":"0px","lineHeight": p.setting.height+"px"});
        });
    };
    MainWrite.prototype.lineBor=function(){
        var p=this;
        this.$textLine.show(100,function(){
            $(this).hide(100,function(){
                if(p.onoff){
                    p.lineBor();
                };
            });
        });
    };
    MainWrite.prototype.lineRun=function(iW,iA){
        var p=this;
        p.$textLine.stop(false,true).animate({"left":(iW+= p.gowidth)+"px"},p.setting.speed,function(){
            p.$ospan.eq(iA).css({"width":iW+"px"});
            if(iW>=p.setting.arrWidth[iA]){
                iA++;
                iW=0;
            };
            if(iA<p.numLength){
                p.$textLine.css({"top":iA* p.goheight+"px"});
                p.lineRun(iW,iA);
                p.setting.fn&& p.setting.fn(iA);
            }else{
                p.onoff=false;
                p.setting.callback&&p.setting.callback();
                p.setting={};
            };
        });
    };
    $.fn.writeCode=function(obj){
        var s=new MainWrite(this,obj);
        return s.writeMove();
    }
})(jQuery);