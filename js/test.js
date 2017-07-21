(function($){
    // var Test =Backbone.Model.extend({
    //     default:{
    //         done:false  //默认不选
    //     }
    // });
    // var test = new Test;
    // var obj = {
    //     'done':true
    // }
    // test.set('done',"true");


    // var TestCheck = Backbone.Collection.extend({
    //     model: Test,
        //collection还没开始用
    // })
  
    var TestView = Backbone.View.extend({
        el:"#all",
        model:test,
        template:_.template($('#content_template').html()),
        
        initialize: function () {
            this.render();
        },
        obj:{
            'done':true
        },
        render: function(){
            //this.model.toJSON()
            this.$el.find('.content').html(this.template(this.obj)); 
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
    })
    var testView = new TestView;
})(jQuery)