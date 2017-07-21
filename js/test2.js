(function($){
    var Test =Backbone.Model.extend({
        default:{
            done:false  //默认不选
        }
    });

    var TestCollection = Backbone.Collection.extend({
        model: Test  
    });
    var testCollection = new TestCollection({//填充实例
        done:true
    });

    var TestView = Backbone.View.extend({
        el:"#all",
        template:_.template($('#content_template').html()),
        
        initialize: function () {
            this.render();
        },
        // obj:{
        //     'done':true
        // },
        render: function(){
            //this.model.toJSON()
            var data = {
                obj:this.collection.toJSON()
            }
            this.$el.find('.content').html(this.template(data)); 
            console.log(1);
        },
        events:{
            "click .Dbtn":"Done",
            "click #content" : "hide"
        },
        Done : function(){
            $('.content').css("display","block");
            $('#all .Dbtn button').css('background',"red");
            console.log('done');
        },
        hide : function(){
            $('.content').css("display","none");
        }
    });
    
    var testView = new TestView({collection:testCollection});//创建view实例时把collection传递进去
})(jQuery)