
		var data = [{
			img:1,h2:'Hey',h3:'嘿'},
			{
			img:2,h2:'Hi',h3:'嗨'},
			{
			img:3,h2:'Hello',h3:'哈喽'},
			{
			img:4,h2:'Hey',h3:'嘿'},
			{
			img:5,h2:'Hi',h3:'嗨'},
			{
			img:6,h2:'Hello',h3:'哈喽'},
			{
			img:7,h2:'Hey',h3:'嘿'	
			}
		];
		//2.通用函数
		var g = function(id){
			if(id.substr(0,1) == '.'){
				return document.getElementsByClassName(id.substr(1));
			}

			return document.getElementById(id);
			}
		//3.添加幻灯片
		function addSliders(){
			var tpl_main = g('template_main').innerHTML.replace(/^\s*/,'').replace(/\s*$/,'');
			var tpl_ctrl = g('template_ctrl').innerHTML.replace(/^\s*/,'').replace(/\s*$/,'');
			var out_main = [];
			var out_ctrl = [];
			for (i in data){
				var _html_main = tpl_main.replace(/{{index}}/g,data[i].img).replace(/{{h2}}/g,data[i].h2).replace(/{{h3}}/g,data[i].h3);
				var _html_ctrl = tpl_ctrl.replace(/{{index}}/g,data[i].img);
					// console.log(_html_main);
					// console.log(_html_ctrl);
				out_main.push(_html_main);
				out_ctrl.push(_html_ctrl);
			}
			g('template_main').innerHTML = out_main.join('');
			g('template_ctrl').innerHTML = out_ctrl.join('');

			//6优化，增加main_background
			g('template_main').innerHTML += tpl_main.replace(/{{index}}/g,'{{index}}').replace(/{{h2}}/g,data[i].h2).replace(/{{h3}}/g,data[i].h3);
			g('main_{{index}}').id = 'main_background';

			setTimeout(function(){
				movePictures(); },100);//获得图片高度需要资源加载完全
		}

		 //4幻灯片切换
		function switchSlider(n){
			var main = g('main_'+n);
			var ctrl = g('ctrl_'+n);
			var clear_main = g('.main-i');
			var clear_ctrl = g('.ctrl-i');
			for (i=0; i<clear_ctrl.length;i++){
				clear_main[i].className = clear_main[i].className.replace(' main-i_active','');
				clear_ctrl[i].className = clear_ctrl[i].className.replace(' ctrl-i_active','');
			}
			main.className += ' main-i_active';
			ctrl.className += ' ctrl-i_active';
			
			//6.2 切换完成后复制当前背景图
			setTimeout(function(){g('main_background').innerHTML = main.innerHTML},1000);

		}
		//5让图片垂直居中
		function movePictures(){
			var pictures = g('.picture');
			for(i=0;i<pictures.length;i++){
				if (pictures[i].clientHeight!=0) {
						pictures[i].style.marginTop = (-1 * pictures[i].clientHeight/2) + 'px';
						console.log(pictures[i].style.marginTop);
					}
			}
		}
		window.onload = function(){
			addSliders();
			switchSlider(1);
				
			
		}
	