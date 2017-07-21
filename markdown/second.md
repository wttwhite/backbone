使用Collection

html部分同之前没有用collection的一样,这里就不赘述了.

### template部分
```javascript
<script type="text/template" id="content_template">
    <div id="content">
        显示
        <input type="checkbox" <%= obj.done?'checked= "checked"':'' %> />是否选择 
    </div>
</script>
```

### model部分
```javascript
var Test =Backbone.Model.extend({
    default:{
        done:false  //默认不选
    }
});
```

### collection部分
```javascript
var TestCollection = Backbone.Collection.extend({
    model: Test  
});
var testCollection = new TestCollection({//填充实例
    done:true
});
```

### view部分
```javascript
var TestView = Backbone.View.extend({
    el:"#all",
    template:_.template($('#content_template').html()),
    
    initialize: function () {
        this.render();
    },
    render: function(){
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
//创建view实例时把collection传递进去
var testView = new TestView({collection:testCollection});
```