(function ($) {
	$.extend({
		silence: (options) => {
			var silence = new Silence();
			silence.init(options);
		}
	});

	class Silence {
		constructor() {
			this.defaluts = {
				profile: {
					enable: false,
					avatar: null,
					favicon: null,
				},
				catalog: {
					enable: false,
					move: true,
					index: true,
					level1: 'h2',
					level2: 'h3',
					level3: 'h4',
				},
				signature: {
					author: null,
					enable: false,
					home: 'https://www.cnblogs.com',
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
					fill: null,
					link: null,
				},
				topImg: {
					homeTopImg: [
						"https://img2018.cnblogs.com/blog/1646268/201908/1646268-20190806172418911-2037584311.jpg",
					],
					notHomeTopImg: [
						"https://img2018.cnblogs.com/blog/1646268/201908/1646268-20190806172418911-2037584311.jpg"
					]
				},
				topInfo: {
					title: 'Hi,Toretto',
					text: 'You got to put the past behind you before you can move on.',
					github: "",
					weibo: "",
					telegram: "",
					music: "",
					twitter: "",
					zhihu: "",
					mail: "",
				}
			};

			this.version = '1.0.0';
		}

		get cnblogs() {
			return {
				header: '#header',
				blogTitle: '#blogTitle',
				publicProfile: '#profile_block',
				navigator: '#navigator',
				navList: '#navList',
				sideBar: '#sideBar',
				sideBarMain: '#sideBarMain',
				forFlow: '.forFlow',
				postTitle: '#cb_post_title_url',
				postDetail: '#post_detail',
				postBody: '#cnblogs_post_body',
				postDigg: '#div_digg',
				postCommentBody: '.blog_comment_body',
				feedbackContent: '.feedbackCon',
				postSignature: '#MySignature',
				footer: '#footer',
			};
		}

		get isPostPage() {
			return $(this.cnblogs.postDetail).length > 0;
		}

		/**
		 * 初始化
		 * @param {Object} options 全局配置选项
		 */
		init(options) {
			if (options) {
				$.extend(true, this.defaluts, options);
			}
			this.buildCustomElements();
			this.buildGithubCorner();
			this.buildCopyright();
			this.buildBloggerProfile();
			this.getMainMode();
			this.buildToolbar();
			if (this.isPostPage) {
				this.postHeader();
				this.goIntoReadingMode();
				this.buildPostCatalog();
				this.buildPostCodeCopyBtns();
				this.buildPostSignature();
				this.buildPostFavoriteBtn();
				this.buildPostSponsor();
				this.buildPostCommentAvatars();
				this.setNotHomeTopImg();
			} else {
				this.mainHeader();
				this.goIntoNormalMode();
				this.homeImg();
				this.setHomeSuiBiList();
			}
			this.scrollDy();
		}

		/**
		 * 消息弹窗
		 * @param {String} content 消息内容
		 */
		showMessage(content) {
			$('body').prepend(`<div class="esa-layer"><span class="esa-layer-content">${content}</span></div>`);
			let $layer = $('.esa-layer');
			$layer.fadeIn(200);
			setTimeout(() => {
				$layer.remove();
			}, 2000);
		}

		/**
		 * 通用模式设置
		 */
		getMainMode() {
			$('.site-branding').hover(function () {
				$('.logolink .sakuraso').css({
					'background-color': '#FE9600',
					'color': '#fff'
				})
				$('.chinese-font').css('display', 'block')
			}, function () {
				$('.logolink .sakuraso').css({
					'background-color': 'rgba(255,255,255,.5)',
					'color': '#464646'
				})
				$('.chinese-font').css('display', 'none')
			});
			//<!--离开页面改变title-->
			var time;
			var normar_title = document.title;
			document.addEventListener('visibilitychange', function () {
				if (document.visibilityState == 'hidden') {
					clearTimeout(time);
					document.title = '桥豆麻袋(＃°Д°)';
				} else {
					document.title = '你终于回来了(。・∀・)ノ';
					time = setTimeout(function () {
						document.title = normar_title;
					}, 3000);

				}
			});
		}

		/**
		 * 进入阅读模式
		 */
		goIntoReadingMode() {
			let $win = $(window);
			let _that = this;
			if ($win.width() > 767) {
				$(_that.cnblogs.header).css('opacity', '1');
				$('#header #navList').css('margin-left', '0px');
				//修改文章布局
				$('#main').css({'margin': '0 auto', 'padding': '0 10px', 'min-width': '950px'});
			}
		}

		/**
		 * 进入正常模式
		 */
		goIntoNormalMode() {
			let $win = $(window);
			let _that = this;
			var oldScrollY = 0;
			if ($win.width() > 767) {
				$('#main').css({'min-width': '800px'});
				//鼠标悬浮判断，如果页面不是位于顶部则head不消失
				$(_that.cnblogs.header).hover(function () {
					$(_that.cnblogs.header).css('opacity', '1');
					$('#header #navList').css('margin-left', '0px');
				}, function () {
					if ($(document).scrollTop() > 0) {
						$(_that.cnblogs.header).css('opacity', '1');
						$('#header #navList').css('margin-left', '0px');
					} else {
						$(_that.cnblogs.header).css('opacity', '0');
						$('#header #navList').css('margin-left', '100px');
					}

				})
				//鼠标悬浮logo判断
				$('.site-branding').hover(function () {
					$(_that.cnblogs.header).css('opacity', '1');
					$('#header #navList').css('margin-left', '0px');
				}, function () {
					if ($(document).scrollTop() > 0) {
						$(_that.cnblogs.header).css('opacity', '1');
						$('#header #navList').css('margin-left', '0px');
					} else {
						$(_that.cnblogs.header).css('opacity', '0');
						$('#header #navList').css('margin-left', '100px');
					}

				})
				//页面滚动判断
				$win.scroll(function () {
					oldScrollY = this.scrollY;
					if (oldScrollY > 0) {
						$(_that.cnblogs.header).css('opacity', '1');
						$('#header #navList').css('margin-left', '0px');
					} else {
						$(_that.cnblogs.header).css('opacity', '0');
						$('#header #navList').css('margin-left', '100px');
					}
				});
			}
		}

		/**
		 * 构建自定义 DOM 元素
		 */
		buildCustomElements() {
			// Change page title.
			const blogTitle = $(this.cnblogs.blogTitle).find('h1 a').html();
			const autherName = $(this.cnblogs.publicProfile).find('a:eq(0)').html();
			let $title = $('head').find('title');
			$title.html($title.html().replace(`春原庄的雪 | ${autherName}`, `${blogTitle}`));

			// Build a tags button on navbar.
			let $navList = $(this.cnblogs.navList);
			$.each($navList.find('li'), (index, nav) => {
				$(nav).append('<i></i>');
			});

			// Build a menu button on mobile browser.
			$('body').prepend(`<div class="esa-mobile-menu"></div>`);
			$('.esa-mobile-menu').on('click', () => {
				$(this.cnblogs.navigator).fadeToggle(200);
			});

			//回到顶部特效
			$('body').prepend(`<a href="#" class="cd-top faa-float animated cd-fade-out"></a>`);
			let $win = $(window);
			let oldScrollY = 0;
			$win.scroll(function () {
				oldScrollY = this.scrollY;
				let height = window.innerHeight;
				let top = '-' + (900 - height + 80) + 'px';
				if (oldScrollY > 0) {
					$('.cd-top').css('top', top);
				} else {
					$('.cd-top').css('top', '-900px');
				}
			});


			$("#navList").append('<li><a id="blog_nav_myyoulian" class="menu" href="https://www.cnblogs.com/zouwangblog/articles/11177049.html">友链</a><i></i></li><li><a id="blog_nav_myzanshang" class="menu" href="https://www.cnblogs.com/zouwangblog/articles/11340077.html">赞赏</a><i></i></li><li><a id="blog_nav_myguanyu" class="menu" href="">关于</a><i></i></li>');
			//添加标签icon
			$('#blog_nav_myhome').prepend('<i class="fa fa-fort-awesome" aria-hidden="true"></i>');
			$('#blog_nav_contact').prepend('<i class="fa fa-address-book-o" aria-hidden="true"></i>');
			$('#blog_nav_rss').prepend('<i class="fa fa-rss faa-pulse" aria-hidden="true"></i>');
			$('#blog_nav_admin').prepend('<i class="fa fa-list" aria-hidden="true"></i>');
			$('#blog_nav_myyoulian').prepend('<i class="fa fa-link" aria-hidden="true"></i>');
			$('#blog_nav_myzanshang').prepend('<i class="fa fa-heart" aria-hidden="true"></i>');
			$('#blog_nav_myguanyu').prepend('<i class="fa fa-leaf" aria-hidden="true"></i>');

			//添加li内嵌ui
			let guanyu = '<ul class="sub-menu">' +
					'<li><a href="https://www.cnblogs.com/zouwangblog/articles/11157339.html "><i class="fa fa-meetup" aria-hidden="true"></i> 我？</a></li>' +
					'<li><a href="https://www.cnblogs.com/zouwangblog/articles/11346906.html "><i class="fa fa-area-chart" aria-hidden="true"></i> 统计</a></li>' +
					'<li><a href="https://www.cnblogs.com/zouwangblog/articles/11350777.html "><i class="fa fa-heartbeat" aria-hidden="true"></i> 监控</a></li>' +
					'<li><a href="https://www.cnblogs.com/zouwangblog/p/11541835.html "><i class="iconfont icon-taohua" aria-hidden="true"></i> 主题</a></li>' +
					'</ul>';
			$('#blog_nav_myguanyu').after(guanyu);

		}

		/**
		 * 构建主题版权信息
		 */
		buildCopyright() {
			//这里能保留么，算是我的一个小心愿。
			var content = `<div> Powered By <a href="https://www.cnblogs.com" target="_blank">Cnblogs</a> |
            Theme <a href="https://github.com/Zou-Wang/CNblogs-Theme-Sakura" target="_blank">Toretto v${this.version}</a></div>`;
			$(this.cnblogs.footer).append(content);
		}

		/**
		 * 构建博客签名
		 */
		buildPostSignature() {
			const config = this.defaluts.signature;
			if (config.enable) {
				const postUrl = $(this.cnblogs.postTitle).attr('href');
				const authorName = config.author || $(this.cnblogs.publicProfile).find('a:eq(0)').html();

				const content =
						`<div class="esa-post-signature"> 
                    <p>作者：<a href="${config.home}">${authorName}</a></p> 
                    <p>出处：<a href="${postUrl}">${postUrl}</a></p> 
                    <p>本站使用「<a href="${config.link}"  target="_blank">${config.license}</a>」创作共享协议，转载请在文章明显位置注明作者及出处。</p> 
                </div>`;

				$(this.cnblogs.postSignature).html(content).show();
			}
		}

		/**
		 * 构建评论者头像
		 */
		buildPostCommentAvatars() {
			var builder = () => {
				$(this.cnblogs.postCommentBody).before(`<div class='esa-comment-avatar'><a target='_blank'><img /></a></div>`);
				let feedbackCon = $(this.cnblogs.feedbackContent);
				for (var i = 0; i < feedbackCon.length; i++) {
					let avatar = 'https://pic.cnblogs.com/face/sample_face.gif';
					let span = $(feedbackCon[i]).find("span:last")[0];
					if (span) {
						avatar = $(span).html().replace('http://', '//');
					}
					$(feedbackCon[i]).find(".esa-comment-avatar img").attr("src", avatar);
					let href = $(feedbackCon[i]).parent().find(".comment_date").next().attr("href");
					$(feedbackCon[i]).find(".esa-comment-avatar a").attr("href", href);
				}
			}
			if ($(this.cnblogs.postCommentBody).length) {
				builder();
			} else {
				let count = 1;
				// poll whether the feedbacks is loaded.
				let intervalId = setInterval(() => {
					if ($(this.cnblogs.postCommentBody).length) {
						clearInterval(intervalId);
						builder();
					}
					if (count == 10) {
						// no feedback.
						clearInterval(intervalId);
					}
					count++;
				}, 500);
			}
		}

		/**
		 * 构建赞赏模块
		 */
		buildPostSponsor() {
			const sponsor = this.defaluts.sponsor;
			const github = this.defaluts.github;
			const that = this;
			if (!sponsor.enable) {
				return;
			}

			$('#blog_post_info').prepend(`
            <div class="esa-sponsor">
                <a class="github" href="${github.enable ? github.link : 'https://github.com/Kaiyuan/donate-page'}" target="_blank" class="posa tr3" title="Github"></a>
                <div class="text tr3">${sponsor.text || 'Sponsor'}</div>
                <ul class="box posa tr3">
                    <li class="paypal">PayPal</li>
                    <li class="alipay">AliPay</li>
                    <li class="wechat">WeChat</li>
                </ul>
                <div id="QRBox" class="posa left-100">
                    <div id="MainBox"></div>
                </div>
            </div>`);

			const $sponsor = $('.esa-sponsor');
			const QRBox = $('#QRBox');
			const MainBox = $('#MainBox');

			function showQR(QR) {
				if (QR) {
					MainBox.css('background-image', 'url(' + QR + ')');
				}
				$sponsor.find('.text, .box, .github').addClass('blur');
				QRBox.fadeIn(300, function () {
					MainBox.addClass('showQR');
				});
			}

			$sponsor.find('.box>li').click(function () {
				var type = $(this).attr('class');
				if (type === 'paypal') {
					if (!sponsor.paypal) {
						return that.showMessage('博主忘记设置 PayPal 收款地址');
					}
					window.open(sponsor.paypal, '_blank');
				} else if (type === 'alipay') {
					if (!sponsor.alipay) {
						return that.showMessage('博主忘记设置支付宝收款二维码');
					}
					showQR(sponsor.alipay);
				} else if (type === 'wechat') {
					if (!sponsor.wechat) {
						return that.showMessage('博主忘记设置微信收款二维码');
					}
					showQR(sponsor.wechat);
				}
			});

			MainBox.click(function () {
				MainBox.removeClass('showQR').addClass('hideQR');
				setTimeout(function (a) {
					QRBox.fadeOut(300, function () {
						MainBox.removeClass('hideQR');
					});
					$sponsor.find('.text, .box, .github').removeClass('blur');
				}, 600);
			});
		}

		/**
		 * 构建收藏按钮
		 */
		buildPostFavoriteBtn() {
			let builder = () => {
				$(this.cnblogs.postDigg).prepend(`<div class="favorite" onclick="AddToWz(cb_entryId);return false;"><span class="favoritenum" id="favorite_count"></span></div>`);
			};

			if ($(this.cnblogs.postDigg).length) {
				builder();
			} else {
				let intervalId = setInterval(() => {
					if ($(this.cnblogs.postDigg).length) {
						clearInterval(intervalId);
						builder();
					}
				}, 200);
			}
		}

		/**
		 * 构建博客目录
		 */
		buildPostCatalog() {
			const config = this.defaluts.catalog;

			if (config.enable) {
				let levels = [config.level1, config.level2, config.level3];
				let $headers = $(this.cnblogs.postBody).find(levels.join(','));

				if (!$headers.length) {
					return false;
				}

				let $catalog = $(
						`<div class="esa-catalog">
                        <div class="esa-catalog-contents">
                            <div class="esa-catalog-title">目录</div>
                            <a class="esa-catalog-close">✕</a>
                        </div>
                    </div>`);

				let h1c = 0;
				let h2c = 0;
				let h3c = 0;

				let catalogContents = '<ul>';

				let cryptoObj = window.crypto || window.msCrypto; // for IE 11
				let eleIds = cryptoObj.getRandomValues(new Uint32Array($headers.length));

				$.each($headers, (index, header) => {
					const tagName = $(header)[0].tagName.toLowerCase();
					let titleIndex = '';
					let titleContent = $(header).html();
					let title = titleContent;
					if (!config.index) {
						switch (tagName) {
							case config.level1:
								titleContent = `<span class="level1">${titleContent}</span>`;
								break;
							case config.level2:
								titleContent = `<span class="level2">${titleContent}</span>`;
								break;
							case config.level3:
								titleContent = `<span class="level3">${titleContent}</span>`;
								break;
						}
					} else {
						if (tagName === config.level1) {
							h1c++;
							h2c = 0;
							h3c = 0;
							titleIndex = `<span class="level1">${h1c}. </span>`;
						} else if (tagName === config.level2) {
							h2c++;
							h3c = 0;
							titleIndex = `<span class="level2">${h1c}.${h2c}. </span>`;
						} else if (tagName === config.level3) {
							h3c++;
							titleIndex = `<span class="level3">${h1c}.${h2c}.${h3c}. </span>`;
						}
					}

					var idx = eleIds[index];

					catalogContents +=
							`<li class="li_${tagName}" title="${title}">
                            <i class="${idx}" ></i><a class="esa-anchor-link">${(titleIndex + titleContent)}</a>
                        </li>`;

					$(header).attr('id', `${idx}`)
							.html(`<span>${titleContent}</span><a href="#${idx}" class="esa-anchor">#</a>`)
							.hover(() => {
								$(header).find('.esa-anchor').css('opacity', 1);
							}, () => {
								$(header).find('.esa-anchor').css('opacity', 0);
							});
				});
				catalogContents += `</ul>`;

				$catalog.find('.esa-catalog-contents').append(catalogContents);
				$catalog.appendTo('body');

				let $tabContent = $('.esa-catalog-contents');

				$tabContent.fadeIn();

				$('.esa-anchor-link').on('click', function () {
					let position = $('#' + ($(this).prev('i').attr('class'))).offset().top - 80;
					$('html, body').animate({
						scrollTop: position
					}, 300);
				});

				$('.esa-catalog-close').on('click', () => {
					$tabContent.hide();
				});

				if (config.move) {
					let move = {
						start: false,
						pois: [0, 0],
					};
					$('.esa-catalog-title').on('mousedown', function (e) {
						e.preventDefault();
						move.start = true;
						let position = $('.esa-catalog').position();
						let poisX = e.clientX - parseFloat(position.left);
						let poisY = e.clientY - parseFloat(position.top);
						move.pois = [poisX, poisY];
					});
					$(document).on('mousemove', (e) => {
						if (move.start) {
							let offsetX = e.clientX - move.pois[0];
							let offsetY = e.clientY - move.pois[1];
							let fixed = $('.esa-catalog').css('position') === 'fixed';

							e.preventDefault();

							move.stX = fixed ? 0 : $(window).scrollLeft();
							move.stY = fixed ? 0 : $(window).scrollTop();

							let setRig = $(window).width() - $('.esa-catalog').outerWidth() + move.stX;
							let setBot = $(window).height() - $('.esa-catalog').outerHeight() + move.stY;

							offsetX < move.stX && (offsetX = move.stX);
							offsetX > setRig && (offsetX = setRig);
							offsetY < move.stY && (offsetY = move.stY);
							offsetY > setBot && (offsetY = setBot);

							$('.esa-catalog').css({
								left: offsetX,
								top: offsetY,
								right: 'auto',
							});
						}
					}).on('mouseup', (_e) => {
						if (move.start) {
							move.start = false;
						}
					});
				}
			}
		}

		/**
		 * 构建 Github Corner
		 */
		buildGithubCorner() {
			const config = this.defaluts.github;
			if (config.enable) {
				let fillStyle = config.fill ? `fill:${config.fill};` : '';
				$('body').append(
						`<a href="${config.link}" class="github-corner" title="Fork me on GitHub">
                        <svg width="60" height="60" viewBox="0 0 250 250" style="${fillStyle} color:${config.color}; z-index: 999999; position: fixed; top: 0; border: 0; left: 0; transform: scale(-1, 1);" aria-hidden="true">
                            <path d="M0,0 L115,115 L130,115 L142,142 L250,250 L250,0 Z"></path>
                            <path d="M128.3,109.0 C113.8,99.7 119.0,89.6 119.0,89.6 C122.0,82.7 120.5,78.6 120.5,78.6 C119.2,72.0 123.4,76.3 123.4,76.3 C127.3,80.9 125.5,87.3 125.5,87.3 C122.9,97.6 130.6,101.9 134.4,103.2" fill="currentColor" style="transform-origin: 130px 106px;" class="octo-arm"></path>
                            <path d="M115.0,115.0 C114.9,115.1 118.7,116.5 119.8,115.4 L133.7,101.6 C136.9,99.2 139.9,98.4 142.2,98.6 C133.8,88.0 127.5,74.4 143.8,58.0 C148.5,53.4 154.0,51.2 159.7,51.0 C160.3,49.4 163.2,43.6 171.4,40.1 C171.4,40.1 176.1,42.5 178.8,56.2 C183.1,58.6 187.2,61.8 190.9,65.4 C194.5,69.0 197.7,73.2 200.1,77.6 C213.8,80.2 216.3,84.9 216.3,84.9 C212.7,93.1 206.9,96.0 205.4,96.6 C205.1,102.4 203.0,107.8 198.3,112.5 C181.9,128.9 168.3,122.5 157.7,114.1 C157.9,116.9 156.7,120.9 152.7,124.9 L141.0,136.5 C139.8,137.7 141.6,141.9 141.8,141.8 Z" fill="currentColor" class="octo-body"></path>
                        </svg>
                    </a>`);
			}
		}

		/**
		 * 构建代码复制按钮
		 */
		buildPostCodeCopyBtns() {
			let $pres = $('.postBody .cnblogs-markdown').find('pre');

			if (!$pres.length) {
				return false;
			}

			$.each($pres, (index, pre) => {
				$(pre).find('code').attr('id', `copy_target_${index}`);
				$(pre).prepend(`<div class="esa-clipboard-button" data-clipboard-target="#copy_target_${index}" title="复制代码">Copy</div>`);
			});

			$.getScript(`https://unpkg.com/clipboard@2.0.0/dist/clipboard.min.js`, () => {
				let clipboard = new ClipboardJS('.esa-clipboard-button');
				clipboard.on('success', (e) => {
					this.showMessage('代码已复制到粘贴板中');
					e.clearSelection();
				});
				clipboard.on('error', (e) => {
					this.showMessage('代码复制失败');
				});
			});
		}

		/**
		 * 构建工具栏
		 */
		buildToolbar() {
			const catalog = this.defaluts.catalog;

			$('body').append(`<div class="esa-toolbar">
                <!--<button class="esa-toolbar-gotop"><div class="tips">返回顶部</div></button>-->
                <!--<button class="esa-toolbar-contents"><div class="tips">阅读目录</div></button>-->
                <button class="esa-toolbar-follow">捕获</button>
            </div>`);

			// let $btnGotop = $('.esa-toolbar-gotop');
			// let $btnContents = $('.esa-toolbar-contents');
			let $btnFollow = $('.esa-toolbar-follow');

			// if (catalog.enable) {
			// 	$btnContents.on('click', () => {
			// 		let $catalog = $('.esa-catalog-contents');
			// 		if ($catalog.css('display') == 'none') {
			// 			$catalog.fadeIn();
			// 		} else {
			// 			$catalog.hide();
			// 		}
			// 	}).hover(() => {
			// 		$btnContents.find('.tips').show();
			// 	}, () => {
			// 		$btnContents.find('.tips').hide();
			// 	});
			// } else {
			// 	$btnContents.remove();
			// }
			//
			// $btnGotop.on('click', () => {
			// 	$(window).scrollTop(0);
			// }).hover(() => {
			// 	$btnGotop.find('.tips').show();
			// }, () => {
			// 	$btnGotop.find('.tips').hide();
			// });
			//
			// $(window).scroll(function () {
			// 	if (this.scrollY > 200) {
			// 		$btnGotop.fadeIn();
			// 	} else {
			// 		$btnGotop.fadeOut();
			// 	}
			// });

			$btnFollow.on('click', () => {
				loadLink(location.protocol + "//common.cnblogs.com/scripts/artDialog/ui-dialog.css", () => {
					loadScript(location.protocol + "//common.cnblogs.com/scripts/artDialog/dialog-min.js", () => {
						if (!isLogined) {
							return login();
						}
						if (c_has_follwed) {
							return this.showMessage('您已经关注过该博主');
						}
						const n = cb_blogUserGuid;
						$.ajax({
							url: "/mvc/Follow/FollowBlogger.aspx",
							data: '{"blogUserGuid":"' + n + '"}',
							dataType: "text",
							type: "post",
							contentType: "application/json; charset=utf-8",
							success: (msg) => {
								msg == "未登录" ? login() : (msg == "关注成功" && followByGroup(n, !0));
								this.showMessage(msg);
							}
						})
					})
				})
			}).hover(() => {
				$btnFollow.find('.tips').show();
			}, () => {
				$btnFollow.find('.tips').hide();
			});
		}

		/**
		 * 构建博主信息
		 */
		buildBloggerProfile() {
			const config = this.defaluts.profile;

			if (!config.enable) {
				return;
			}

			if (!this.isPostPage && config.avatar) {
				$(this.cnblogs.sideBarMain).prepend(`<img class="esa-profile-avatar" src="${config.avatar}" />`);
			}

			if (config.favicon) {
				$('head').append(`<link rel="shortcut icon" href="${config.favicon}" type="image/x-icon" />`);
			}

			//博客logo
			var title = '<div class="site-branding">' +
					'<span class="logolink moe-mashiro">' +
					'<a href="https://www.cnblogs.com/zouwangblog/" alt="春原庄的雪">' +
					'<ruby><span class="sakuraso">すのはら荘</span><span class="no">の</span><span class="shironeko">雪</span>' +
					'<rt class="chinese-font">春原庄的雪</rt></ruby></a></span>' +
					'</div>'
			$('body').prepend(title);


		}

		/**
		 * 构建顶部滚动进度条 需要在页面dom元素构建成功之后再计算文档高度。
		 */
		scrollDy() {
			let that = this;
			$('body').prepend(`<div class="scrollCls" id="scrollInfo"></div>`);
			// 可滚动的总高度
			var scrollTotal = this.getScrollHeight() - this.getWindowHeight();
			// 获取dom元素
			var scrollEl = document.getElementById('scrollInfo')
			$(window).scroll(function () {
				// 已经滚动距离
				var sHeight = that.getScrollTop();
				// 占比
				var bl = Math.min((sHeight / scrollTotal) * 100, 100);
				// 设置
				scrollEl.style.width = bl + '%';
			})

		}

		// 已经滚动距离
		getScrollTop() {
			var scrollTop = 0, bodyScrollTop = 0, documentScrollTop = 0;
			if (document.body) {
				bodyScrollTop = document.body.scrollTop;
			}
			if (document.documentElement) {
				documentScrollTop = document.documentElement.scrollTop;
			}
			scrollTop = (bodyScrollTop - documentScrollTop > 0) ? bodyScrollTop : documentScrollTop;
			return scrollTop;
		}

		// 文档的总高度
		getScrollHeight() {
			var scrollHeight = 0, bodyScrollHeight = 0, documentScrollHeight = 0;
			if (document.body) {
				bodyScrollHeight = document.body.scrollHeight;
			}
			if (document.documentElement) {
				documentScrollHeight = document.documentElement.scrollHeight;
			}
			scrollHeight = (bodyScrollHeight - documentScrollHeight > 0) ? bodyScrollHeight : documentScrollHeight;
			return scrollHeight;
		}

		// 窗体高度
		getWindowHeight() {
			var windowHeight = 0;
			if (document.compatMode == "CSS1Compat") {
				windowHeight = document.documentElement.clientHeight;
			} else {
				windowHeight = document.body.clientHeight;
			}
			return windowHeight;
		}

		//=========================设置主页逻辑
		/**
		 * 构建主页头部html
		 * headertop 网格遮罩
		 */
		mainHeader() {
			const config = this.defaluts.topInfo;
			var header =
					`<div class="headertop filter-dot">` +
					`</div>` +
					`<div class="main-header">` +
					`</div>` +
					`<div class="focusinfo no-select">` +
					`       <h1 class="center-text glitch is-glitching Ubuntu-font" data-text="Hi, Toretto!">${config.title}</h1>` +
					`       <div class="header-info"><p><i class="fa fa-quote-left"></i> ${config.text} <i class="fa fa-quote-right"></i></p>` +
					`           <div class="top-social_v2">` +
					`              <li id="bg-pre"><img class="flipx" src="https://img2018.cnblogs.com/blog/1646268/201908/1646268-20190808103709869-648245711.png"></li>` +
					`              <li><a href="${config.github}" target="_blank" class="social-github" title="github"><img src="https://img2018.cnblogs.com/blog/1646268/201908/1646268-20190808095618459-218538626.png"></a></li>` +
					`              <li><a href="${config.weibo}" target="_blank" class="social-sina" title="sina"><img src="https://img2018.cnblogs.com/blog/1646268/201908/1646268-20190808095623418-1617766229.png"></a></li>` +
					`              <li><a href="${config.telegram}" target="_blank" class="social-lofter" title="telegram"><img src="https://img2018.cnblogs.com/blog/1646268/201908/1646268-20190808095628401-835828752.png"></a></li>` +
					`              <li><a href="${config.music}" target="_blank" class="social-wangyiyun" title="CloudMusic"><img src="https://img2018.cnblogs.com/blog/1646268/201908/1646268-20190808095640330-1209750721.png"></a></li>` +
					`              <li><a href="${config.twitter}" target="_blank" class="social-wangyiyun" title="Twitter"><img src="https://img2018.cnblogs.com/blog/1646268/201908/1646268-20190808095635213-701885869.png"></a></li>` +
					`              <li><a href="${config.zhihu}" target="_blank" class="social-wangyiyun" title="Zhihu"><img src="https://img2018.cnblogs.com/blog/1646268/201908/1646268-20190808095650119-1882504549.png"></a></li>` +
					`              <li><a href="${config.mail}" target="_blank" class="social-wangyiyun" title="E-mail"><img src="https://img2018.cnblogs.com/blog/1646268/201908/1646268-20190808095613956-1350546638.png"></a></li>` +
					`              <li id="bg-next"><img src="https://img2018.cnblogs.com/blog/1646268/201908/1646268-20190808103709869-648245711.png"></li>` +
					`           </div>` +
					`      </div>` +
					`</div>` +
					`<div class="wave">` +
					`   <div id="banner_wave_1"></div>` +
					`   <div id="banner_wave_2"></div>` +
					`</div>` +
					`<div class="scroll-down" data-offset="-45">` +
					`        <span class="hidden">Scroll Down</span>` +
					`        <i class="fa fa-chevron-down" aria-hidden="true"></i>` +
					`</div>`;
			$('#home').prepend(header);
		}

		/**
		 * 构建主页头图
		 */
		homeImg() {
			const config = this.defaluts.topImg;
			// 设置主页图片
			let homeTopImg = config.homeTopImg, bgImg;
			let index = this.randomNum(0, homeTopImg.length - 1);
			homeTopImg.length > 0 ?
					(homeTopImg.length > 1 ? bgImg = homeTopImg[index] : bgImg = homeTopImg[0])
					: bgImg = "";
			$('.main-header').css({
				'background-image': 'url(' + bgImg + ')',
			});

			// 头图点击滚动到内容位置
			$('.scroll-down').click(function () {
				let endScroll;
				endScroll = $('#main').offset().top - 20;
				$('html,body').stop().animate({scrollTop: endScroll}, 1000);
			});

			//切换首页壁纸
			$('#bg-pre').click(function () {
				index--;
				if (index < 0) {
					index = homeTopImg.length - 1
				}
				let nextImg = homeTopImg[index]
				$('.main-header').css({
					'background-image': 'url(' + nextImg + ')',
				});
			});
			$('#bg-next').click(function () {
				index++;
				if (index > homeTopImg.length - 1) {
					index = 0
				}
				let preImg = homeTopImg[index]
				$('.main-header').css({
					'background-image': 'url(' + preImg + ')',
				});

			})
		}

		/**
		 * 构建首页随笔列表
		 */
		setHomeSuiBiList() {
		let article_list = $('.day');
    	let author = $(this.cnblogs.publicProfile).find('a:eq(0)').html() //作者
		for(let i = article_list.length-1;i>=0;i--)
		{
			let time = $('.day').find('div.dayTitle')[i].textContent.replace('年', '-').replace('月', '-').replace('日', ''); //获取年月日
			let PostTitles = $(article_list[i]).find('.postTitle');
			let readMores = $(article_list[i]).find('a.c_b_p_desc_readmore');
			let descs = $(article_list[i]).find('.postDesc');
			let infos = $(article_list[i]).find('.postCon');
			let contents = $(article_list[i]).find('.c_b_p_desc');
			for(let j=PostTitles.length-1;j>=0;j--)
			{
				let readMore = $(readMores[j]).context.href;
				let postTitle = $(PostTitles[j]).context.innerHTML;
				let desc = $(descs[j]).text();
				let readNum = desc.substring(desc.indexOf("(") + 1, desc.indexOf(")"));
				let comNum = desc.substring(desc.lastIndexOf("(") + 1, desc.lastIndexOf(")"));
				let edit =  $(descs[j]).find('a')[0].href;
				let url = $(infos[j]).find('img')[0];
				let content = contents[j].textContent.replace('阅读全文','');
				if(url!=undefined)
				{
					url = url.src;
				}else{
					url = url = 'https://img2018.cnblogs.com/blog/1646268/201908/1646268-20190807151203983-873040918.jpg';   
				}
				let html = `<div class="post post-list-thumb post-list-show">` +
				`  <div class="post-thumb"> <a href="${readMore}"> <img class="lazyload" src="${url}"  data-src="${url}"> </a></div>` +
				`  <div class="post-content-wrap">` +
				`   <div class="post-content">` +
				`     <div class="post-date"> <i class="iconfont icon-time"></i>发布于 ${time}</div>` +
				`     <div class="post-title">${postTitle}</div>` +
				`     <div class="post-meta"> <span><i class="iconfont icon-attention"></i>${readNum} 热度</span> <span class="comments-number"><i class="iconfont icon-mark"></i>${comNum} 条评论</span> <span><i class="iconfont icon-cc-user"></i><a href="https://www.cnblogs.com/zouwangblog/p/11157339.html"></a>${author}</span></div>` +
				`     <div class="float-content"><p>${content}</p>` +
				`        <div class="post-bottom">` +
				`           <a href="${readMore}" class="button-normal"><i class="iconfont icon-gengduo"></i></a>` +
				`           <a href="${edit}" class="button-normal"><i class="iconfont icon-bianji"></i></a>` +
				`        </div>` +
				`     </div>` +
				`  </div>` +
				` </div>` +
				`</div>`;
				$('.forFlow').prepend(html);
			}
		}
	
			$('.post-list-thumb:odd').addClass('post-list-thumb-left')

			//构建notice
			const config = this.defaluts.profile;
			let notice = `<div class="notice"> <i class="iconfont icon-notification"></i><div class="notice-content">${config.notice}</div></div>`
			$('#main').prepend(notice);
		}

		//=================阅读页逻辑
		/**
		 * 构建阅读页头部html 如果是文章则只显示标题，如果是随笔则显示发布时间，头像，阅读量
		 */
		postHeader() {
			var center =
					'<div class="pattern-center">' +
					' <div class="pattern-attachment-img"><img src="" data-src=""' +
					'    style="width: 100%; height: 100%; object-fit: cover; pointer-events: none;"></div>' +
					' <header class="pattern-header "><h1 class="entry-title"></h1></header>' +
					'</div>';
			$('#home').prepend(center);
			const sbTitle = $('#cb_post_title_url').text();
			$('.entry-title').text(sbTitle);// 设置标题
			$('.postTitle').css('display', 'none');
			let post_date = $('#post-date').text() //发布时间
			let post_view_count = $('#post_view_count').text() //阅读数
			if (window.location.href.indexOf('articles') === -1) {
				var header =
						`<p class="entry-census"><span><a href="https://www.cnblogs.com/zouwangblog/"><img src="//pic.cnblogs.com/face/1646268/20190628143903.png"></a></span><span><a href="https://www.cnblogs.com/zouwangblog/">Toretto</a></span><span class="bull">·</span>${post_date}<span class="bull">·</span>${post_view_count} 次阅读</p>`;
				$('.pattern-header').append(header)
				$('.pattern-center').addClass('single-center')
				$('.pattern-header').addClass('single-header')
			} else {
				return
			}

		}

		/**
		 * 构建非主页头图
		 */
		setNotHomeTopImg = function () {
			const config = this.defaluts.topImg;
			// 设置主页图片
			let notHomeTopImg = config.notHomeTopImg, bgImg;

			notHomeTopImg.length > 0 ?
					(notHomeTopImg.length > 1 ? bgImg = notHomeTopImg[this.randomNum(0, notHomeTopImg.length - 1)] : bgImg = notHomeTopImg[0])
					: bgImg = "";
			$('.pattern-attachment-img img').attr('src', bgImg);
		};

		/**
		 * 随机数
		 */
		randomNum = function (minNum, maxNum) {
			switch (arguments.length) {
				case 1:
					return parseInt(Math.random() * minNum + 1);
					break;
				case 2:
					return parseInt(Math.random() * (maxNum - minNum + 1) + minNum);
					break;
				default:
					return 0;
					break;
			}
		};
	}
})(jQuery);