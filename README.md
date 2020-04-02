# CNblogs-Theme-Sakura
* 基于Sakura美化方案打造的博客园样式，给你不一样的博客园体验
* 如有幸使用了本样式，还请给个Star。
## 功能简介

* 首页及随笔页头图随机切换
* 其他网站链接
* 音乐播放器
* 看板娘
* 图片灯箱
* 自动生成文章目录
* 导航菜单子目录
* 滚动进度条

## 主题预览
![模板](https://img2018.cnblogs.com/blog/1646268/201909/1646268-20190918142305086-506659351.png)
![模板](https://img2018.cnblogs.com/blog/1646268/201909/1646268-20190918142319261-319169416.png)
![模板](https://img2018.cnblogs.com/blog/1646268/201909/1646268-20190918142330498-1750029747.png)
![模板](https://img2018.cnblogs.com/blog/1646268/201909/1646268-20190918142339700-1796728881.png)
## 主题部署

### 一键部署

<div class="info"><p>如果你想快速搭建出与本博客一样的样式，	请看下面这句说明，当然前提是得有<span style="color: red">js权限</span></p></div>

如果将部署和本博客一样的主题，直接下载整个主题，下载地址在文末。把**css**、**侧边栏**、**页脚**，代码粘贴的你的博客后台，然后对应的改下**文件链接地址** 就行。下面的内容是为了个性化定制而写，如果你想个性化定制博客，请往下看基本部署。

### 基本部署

* 前提：已经开通`js`权限

* 引入样式
  把**page.css**中的代码粘贴到自定义css中

* 引入文件
  放在侧边栏中

  ```javascript
  <script src="https://blog-static.cnblogs.com/files/zouwangblog/main.js"></script>
  ```

* 选择模板
  按照图片内容设置模板
  ![模板](https://img2018.cnblogs.com/blog/1646268/201909/1646268-20190918142410336-166783367.jpg)

* 顶部菜单设置

  将以下链接替换成自己的文章或者随笔地址，以下代码在`main.js`中

  ```javascript
  $("#navList").append('<li><a id="blog_nav_myyoulian" class="menu"href="https://www.cnblogs.com/zouwangblog/articles/11177049.html">友链</a><i></i></li><li><a id="blog_nav_myzanshang" class="menu" href="https://www.cnblogs.com/zouwangblog/articles/11340077.html">赞赏</a><i></i></li><li><a id="blog_nav_myguanyu" class="menu" href="">关于</a><i></i></li>');
  ```

  * 菜单icon设置
    就是菜单前的小图标，感兴趣的可以去了解一下[Font awesome](http://fontawesome.dashgame.com/ )

    ```javascript
    $('#blog_nav_myhome').prepend('<i class="fa fa-fort-awesome" aria-hidden="true"></i>');
    			$('#blog_nav_contact').prepend('<i class="fa fa-address-book-o" aria-hidden="true"></i>');
    			$('#blog_nav_rss').prepend('<i class="fa fa-rss faa-pulse" aria-hidden="true"></i>');
    			$('#blog_nav_admin').prepend('<i class="fa fa-list" aria-hidden="true"></i>');
    			$('#blog_nav_myyoulian').prepend('<i class="fa fa-link" aria-hidden="true"></i>');
    			$('#blog_nav_myzanshang').prepend('<i class="fa fa-heart" aria-hidden="true"></i>');
    			$('#blog_nav_myguanyu').prepend('<i class="fa fa-leaf" aria-hidden="true"></i>');
    ```

    

  * 菜单子目录设置

    菜单悬浮触发的菜单子目录，这里我在**关于**菜单下添加了子目录

    ```javascript
    let guanyu = '<ul class="sub-menu">' +
    					'<li><a href="https://www.cnblogs.com/zouwangblog/articles/11157339.html "><i class="fa fa-meetup" aria-hidden="true"></i> 我？</a></li>' +
    					'<li><a href="https://www.cnblogs.com/zouwangblog/articles/11346906.html "><i class="fa fa-area-chart" aria-hidden="true"></i> 统计</a></li>' +
    					'<li><a href="https://www.cnblogs.com/zouwangblog/articles/11350777.html "><i class="fa fa-heartbeat" aria-hidden="true"></i> 监控</a></li>' +
    					'<li><a href="https://www.cnblogs.com/zouwangblog/articles/11350787.html"><i class="iconfont icon-taohua" aria-hidden="true"></i> 主题</a></li>' +
    					'</ul>';
    			$('#blog_nav_myguanyu').after(guanyu);
    ```

* 脚本设置

  为了配置方便，我在侧边栏里设置了一些常用参数，可根据下表选择需要开启和配置

  ```javascript
  <script type="text/javascript"> 
  $.silence({
          profile: {
              enable: true,
              avatar: '',
              favicon: 'https://files-cdn.cnblogs.com/files/zouwangblog/blog_logo.gif',
          },
          catalog: {
              enable: true,
              move: true,
              index: true,
              level1: 'h2',
              level2: 'h3',
              level3: 'h4',
          },
          signature: {
              enable: true,
              home: 'https://www.cnblogs.com/zouwangblog/',
              license: 'CC BY 4.0',
              link: 'https://creativecommons.org/licenses/by/4.0'
          },
          sponsor: {
              enable: true,
              paypal: null,
              wechat: 'https://www.cnblogs.com/images/cnblogs_com/zouwangblog/1477590/t_%e5%be%ae%e4%bf%a1%e5%9b%be%e7%89%87_20190704175553.png',
              alipay: 'https://www.cnblogs.com/images/cnblogs_com/zouwangblog/1477590/t_%e5%be%ae%e4%bf%a1%e5%9b%be%e7%89%87_20190704174158.png'
          },
          github: {
              enable: false,
              color: '#fff',
              fill: '#FF85B8',
              link: 'https://github.com/Zou-Wang'
          },
  	topImg: {
  		homeTopImg: [
  "https://img2018.cnblogs.com/blog/1646268/201908/1646268-20190828104950450-644943924.jpg",
  "https://img2018.cnblogs.com/blog/1646268/201908/1646268-20190806172418911-2037584311.jpg",
  					],
                notHomeTopImg: [
  "https://img2018.cnblogs.com/blog/1646268/201908/1646268-20190807151151330-1121103170.png",
  "https://img2018.cnblogs.com/blog/1646268/201908/1646268-20190807151203983-873040918.jpg",
  					]
  		},
      topInfo: {
  					title: 'Hi,Toretto',
                        text: 'You got to put the past behind you before you can move on.',
  					github: "https://github.com/Zou-Wang",
  					weibo: "https://weibo.com/5682002748/profile?topnav=1&wvr=6&is_all=1",
  					telegram: "",
  					music: "https://music.163.com/#/user/home?id=436757779",
  					twitter: "",
  					zhihu:"https://www.zhihu.com/people/zouwang/activities",
  					mail: "http://mail.qq.com/cgi-bin/qm_share?t=qm_mailme&email=KlBFX11LRE0SGBlqW1sESUVH",
  				}
      });
  </script>
  ```

  参数说明表：

  | 模块                     | 属性          | 说明             | 类型    | 默认值                                                       |
  | :----------------------- | ------------- | ---------------- | ------- | ------------------------------------------------------------ |
  | profile（基础信息）      | enable        | 是否启用         | Boolean | true                                                         |
  |                          | avatar        | 作者头像         | String  |                                                              |
  |                          | favicon       | 网站标题图标     | String  ||
  |                          | notice       | 公告     | String  |海上月是天上月，眼前人是心上人。|
  |                          | authorName       | 作者姓名     | String  |不忘编码|
  | catalog（博文目录）      | enable        | 是否启用         | Boolean | false                                                        |
  |                          | move          | 是否允许拖拽     | Boolean | true                                                         |
  |                          | index         | 是否显示索引     | Boolean | true                                                         |
  |                          | level1        | 一级标题         | String  | h2                                                           |
  |                          | level2        | 二级标题         | String  | h3                                                           |
  |                          | level3        | 三级标题         | String  | h4                                                           |
  | signature（博文签名      | enable        | 是否启用         | Boolean | true                                                         |
  |                          | home          | 作者主页         | String  | [https://www.cnblogs.com](https://www.cnblogs.com/)          |
  |                          | license       | 许可证名称       | String  | CC BY 4.0                                                    |
  |                          | link          | 许可证链接       | String  | <https://creativecommons.org/licenses/by/4.0>                |
  | sponsor（博文赞赏）      | enable        | 是否启用         | Boolean | false                                                        |
  |                          | paypal        | PayPal 收款地址  | String  | null                                                         |
  |                          | alipay        | 支付宝收款二维码 | String  | null                                                         |
  |                          | wechat        | 微信收款二维码   | String  | null                                                         |
  | github（GitHub Corners） | enable        | 是否启用         | Boolean | false                                                        |
  |                          | fill          | 背景填充色       | String  | [Silence Theme Color]                                        |
  |                          | color         | 章鱼猫颜色       | String  | #fff                                                         |
  |                          | link          | Github 链接      | String  | null                                                         |
  | topImg（头图）           | homeTopImg    | 首页头图         | Array   | [https://img2018.cnblogs.com/blog/1646268/201908/1646268-20190808213858652-132088076.jpg<br />https://img2018.cnblogs.com/blog/1646268/201908/1646268-20190808214726187-2092834311.jpg] |
  |                          | notHomeTopImg | 文章和随笔页头图 | Array   | [https://img2018.cnblogs.com/blog/1646268/201908/1646268-20190807151203983-873040918.jpg] |
  | topInfo(首页头图信息)    | titile        | 头部标题         | String  | Hi, Toretto!                             |
  |                          | text          | 座右铭           | String  | You got to put the past behind you before you can move on.   |
  |                          | github        | GitHub链接       | String  | “ ”                                                          |
  |                          | weibo         | 微博链接         | String  | “ ”                                                          |
  |                          | telegram      | telegram链接     | String  | “ ”                                                          |
  |                          | music         | 网易云音乐链接   | String  | “ ”                                                          |
  |                          | twitter       | twitter链接      | String  | “ ”                                                          |
  |                          | zhihu         | 知乎链接         | String  | “ ”                                                          |
  |                          | mail          | 邮箱链接         | String  | “ ”                                                          |

配置完成后，记得点击「保存」按钮，保存上述操作。 

## 个性化定制

### 首页及文章大图

首页和随笔以及文章页的头图都是随机切换的，添加图片在侧边栏配置中。这里类型为随笔的时候头部会显示**标题**、**头像**、**作者**、**发布时间**、**阅读数**，而类型为文章的时候只会显示标题，根据情况选择类型发布。

### 随笔预览图

![](E:\Tools\important\博客园备份\使用Custorm的\CNblogs-Theme-Sakura\img\1568776947(1).png)

![](E:\Tools\important\博客园备份\使用Custorm的\CNblogs-Theme-Sakura\img\1568776993(1).png)

在写随笔或者文章的时候添加摘要图片和摘要文字，**摘要文字一定要添加**，如果不添加摘要图片会给一张默认图片。

<div class="info important"><p>发布随笔的时候不要再同一天发布超过一篇文章，因为博客园同一天的文章会归档在一起导致我构建html的时候出现bug，这个bug到现在还没有解决，所以只能一天发布一篇文章。</p></div>

### 公告

![](E:\Tools\important\博客园备份\使用Custorm的\CNblogs-Theme-Sakura\img\1568777132(1).png)

公告内容修改在侧边栏基础信息配置中，修改`notice`

### 看板娘

没错还是看板娘，出现在我三篇文章中的看板娘，因为有一段时间api失效导致看板娘都没有，最近被我找到了新的api，我个人博客的看板娘api是搭建在我自己服务器上的，博客园的用的还是别人api，有失效的风险，当然失效了我会及时修复的。将以下代码添加到页脚。

```javascript
<script src="https://blog-static.cnblogs.com/files/zouwangblog/autoload.js"></script>
```

### 音乐播放器

相信看过我以前文章的同学对这个一定不会陌生，怎么获取id我也不在这里罗嗦了，可以去找我以前的文章。获取到id之后把下面的id替换掉就可以了

```javascript
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/aplayer@1.10.0/dist/APlayer.min.css">
<script src="https://blog-static.cnblogs.com/files/zouwangblog/APlayer.min.js"></script>
<script src="https://unpkg.com/meting@1.2/dist/Meting.min.js"></script>
<div id="player" class="aplayer aplayer-withlist aplayer-fixed" data-id="2878443703" data-server="netease" data-type="playlist" data-order="random" data-fixed="true" data-listfolded="true" data-theme="orange"></div>
```

### 博客logo

左上角的logo，修改文字需要到`main.js`里找到以下代码，替换文字即可，如果不喜欢可以注掉（我费了很大劲竟然敢不喜欢🤕）。

```javascript
var title = '<div class="site-branding">' +
					'<span class="logolink moe-mashiro">' +
					'<a href="https://www.cnblogs.com/zouwangblog/" alt="富士的雪">' +
					'<ruby><span class="sakuraso">ふじさん</span><span class="no">の</span><span class="shironeko">雪</span>' +
					'<rt class="chinese-font">富士的雪</rt></ruby></a></span>' +
					'</div>'
			$('body').prepend(title);
```

### 页面滚动进度条

页面滚动的时候会在顶部出现一个橙色的进度条，修改颜色到页面css里，找到以下代码修改`background`

```css
.scrollCls {
    position: fixed;
    top: 0;
    height: 3px;
    background: orange;
    transiton-property: width,background;
    transition-duration: 1s,1s;
    z-index: 99999;
}
```

### 首页个人信息

![](E:\Tools\important\博客园备份\使用Custorm的\CNblogs-Theme-Sakura\img\1568785906(1).png)

* 名称
  在侧边栏配置中修改`topInfo`里的`title`

* 座右铭
  在侧边栏配置中修改`topInfo`里的`text`

* 其他网站链接
  在侧边栏配置中修改`topInfo`里对应的链接地址，这里邮箱使用的是QQ邮箱的邮我，可以在QQ邮箱里配置。

## 写在最后

技术是无私的，非常不舍得把我这个美化分享了出去，毕竟以我的前端技术构建这么个样式还是很费劲的，花了很多心血，这也是我在博客园的最后一篇美化文章了，毕竟太浪费时间，以后精力还是放在个人网站上，博客还有很多小功能在这里就不叙述了，比如我比较喜欢的小吊死鬼和首页的波浪，希望采用这个样式的你能够多多支持博主，有什么问题都可以提交，我也会及时为大家解决。最后也欢迎大家光临我的小站 https://zouwang.vip/

## 微信公众平台
微信搜索 “不忘编码” 关注我
