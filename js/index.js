!function(root,handler,name){
    handler(name);
}(this,function(name){
    $.fn[name]=function(options){
        var DEFAULT = {
            Event:'input'
        };
        var Rules = {
            'regexp':function(data){
                var $this = $(this);
                var reg = new RegExp($this.data(data));
                return reg.test($(this).val());
            },
            'rightlength':function(data){
                var $this = $(this);
                return $this.val().length==$this.data(data);
            }
        }
        $.extend(this,DEFAULT,options);
        this.find('input').on(this.Event,function(){
            var _this = this;
            $(_this).next('p').remove();
            $.each(Rules,function(key,fn){
                var dataKey = $(_this).data('yz-'+key);
                if(dataKey){
                    var result = fn.call(_this,'yz-'+key);
                    if(!result){
                        $(_this).next('p').remove();
                        $(_this).after('<p class="tips" style="color:red;">'+$(_this).data('yz-'+key+'-message')+'</p>');
                    }
                }
            })
        })
    }
},'check')