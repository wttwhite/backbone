


##backbone零基础

讲真，朋友知道我最近开始学backbone，都觉得我在填坑，在大家都在学vue的时候，我还在学横跨了他们好几个时代的框架，我也很无奈啊。更加无奈的是，我愣是没有看懂，没办法毕竟是一只菜鸟。直到刚才，我终于摸到一点门路了，可把我高兴坏了，控制不住地想把整个过程写下来，记录下一只菜鸟学backbone的艰辛历程。总共没几行代码,我就不po`github`地址了。
我就是实现了一个很简单的`click`功能（学习要一点点来嘛，先要把模板，数据和视图之间走通，对，我刚刚才走通）
之前没走通的时候还把带有bug的代码push到了github的仓库内，不过，毕竟关注的人少，还是只能自己默默地解决问题。

### html部分
html部分就是一个按钮，点击后，在按钮下方显示模板内的文字。
```html
<div class="" id="all">
    <div class="Dbtn">
        <button>显示</button>
    </div>
    <div class="content">
    </div>
</div>
```

### script引用和template部分
这边的话，我犯过一个错误：
模板放在自己写的js（test.js）后面，这样的话test.js就找不到模板的内容
```javascript
<script src="lib/jquery.js"></script>
<script src="lib/underscore.js"></script>
<script src="lib/backbone.js"></script>
<script type="text/template" id="content_template">
    <div id="content">
        显示
        <input type="checkbox" <%= done?'checked= "checked"':'' %> />是否选择 
    </div>
</script>
<script src="js/test.js"></script>
```

### js部分
我尝试了两种方法都能实现`click`功能（就是能取到数据）
#### 只有view
```javascript
var TestView = Backbone.View.extend({
    el:"#all", //body下最大的那个容器
    template:_.template($('#content_template').html()),
    initialize: function () {
        this.render();   //执行渲染
    },
    obj:{
        'done':true
    },
    render: function(){
        //把模板中需要用到的数据传递进去
        this.$el.find('.content').html(this.template(this.obj));
        console.log(1);//这个我是用来打印看程序有没有走到这个函数内
    },
    events:{
        "click .Dbtn":"Done", //点击按钮显示
        "click #content" : "hide"  //点击模板隐藏
    },
    Done : function(){
        $('.content').css("display","block"); //显示
        $('#all .Dbtn button').css('background',"red"); //改变按钮的颜色
        console.log('done');
    },
    hide : function(){
        $('.content').css("display","none"); //隐藏
    }
})
var testView = new TestView; //这个一定要有
```

####　有view和model
```javascript
var Test =Backbone.Model.extend({
    default:{
       done:false  //默认不选
    }
});
var test = new Test;
var obj = {
    'done':true
}
test.set(obj);//只能用set设置和get获取，点done不行 

var TestView = Backbone.View.extend({
    el:"#all",
    model:test,
    template:_.template($('#content_template').html()),
    
    initialize: function () {
        this.render();
    },
    render: function(){
        this.$el.find('.content').html(this.template(this.model.toJSON())); 
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
```

### 刚开始卡住的两个问题
1.模板不能显示
之前我一直在render函数内执行`this.template()`，并不行。
后来在官方示例[`todo`](https://github.com/jashkenas/backbone/)中看到它是要插入到父级元素中的`this.$el.find('.content').html(this.template(this.model.toJSON()))`，我是用了`this.$el`（就是`id = all`这个元素）找到它下面的`.content`元素。
2.done没有定义
因为我之前都没有忘template里面传递数据，所以一直找不到（我以为backbone内部会自己找到定义的变量，不用手动传递）

### css部分
这部分可以直接忽略,所以我就放在最后了
```css
body,html{
    margin: 0;
    padding: 0;
}
#all{
    width: 500px;
    background-color: #ccc;
    margin: 100px auto;
}
#all .Dbtn{
    width: 100px;
    height: 50px;
    margin: 0 auto;
    padding: 10px 0;
}
#all .Dbtn button{
    width: 100px;
    height: 50px;
    background-color: #777;
    color: black;
    cursor: pointer;
}
.content{
    display: none;
}
```
