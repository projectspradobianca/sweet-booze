/**
* Template Name: Delicious
* Updated: May 30 2023 with Bootstrap v5.3.0
* Template URL: https://bootstrapmade.com/delicious-free-restaurant-bootstrap-theme/
* Author: BootstrapMade.com
* License: https://bootstrapmade.com/license/
*/

var list = [
	{"desc":"rice", "amount":"1", "value":"5.40"},
	{"desc":"beer", "amount":"12", "value":"1.99"},
	{"desc":"meat", "amount":"1", "value":"15.00"}
];


//somando total
function getTotal(list){
	var total = 0;
	for(var key in list){
		total += list[key].value * list[key].amount;
	}
	document.getElementById("totalValue").innerHTML = formatValue(total);
}

//criando a tabela
function setList(list){
	var table = '<thead><tr><td>Description</td><td>Amount</td><td>Value</td><td>Action</td></tr></thead><tbody>';
	for(var key in list){
		table += '<tr><td>'+ formatDesc(list[key].desc) +'</td><td>'+ formatAmount(list[key].amount) +'</td><td>'+ formatValue(list[key].value) +'</td><td><button class="btn btn-default" onclick="setUpdate('+key+');">Edit</button> <button class="btn btn-default" onclick="deleteData('+key+');">Delete</button></td></tr>';
	}
	table += '</tbody>';

	document.getElementById('listTable').innerHTML = table;
	getTotal(list);
	saveListStorage(list);
}

//formatando o nome do produto
function formatDesc(desc){
	var str = desc.toLowerCase();
	str = str.charAt(0).toUpperCase() + str.slice(1);
	return str;
}

//formatando a quantidade
function formatAmount(amount){
	return parseInt(amount);
}

//formatando o preço
function formatValue(value){
	var str = parseFloat(value).toFixed(2) + "";
	str = str.replace(".",",");
	str = "$ " + str;
	return str;
}

//adicionar novo produto
function addData(){
	if(!validation()){
		return;
	}
	var desc = document.getElementById("desc").value;
	var amount = document.getElementById("amount").value;
	var value = document.getElementById("value").value;

	list.unshift({"desc":desc , "amount":amount , "value":value });
	setList(list);
}

//botões de editar
function setUpdate(id){
	var obj = list[id];
	document.getElementById("desc").value = obj.desc;
	document.getElementById("amount").value = obj.amount;
	document.getElementById("value").value = obj.value;
	document.getElementById("btnUpdate").style.display = "inline-block";
	document.getElementById("btnAdd").style.display = "none";

	document.getElementById("inputIDUpdate").innerHTML = '<input id="idUpdate" type="hidden" value="'+id+'">';
}

//limpa os campos de editar
function resetForm(){
	document.getElementById("desc").value = "";
	document.getElementById("amount").value = "";
	document.getElementById("value").value = "";
	document.getElementById("btnUpdate").style.display = "none";
	document.getElementById("btnAdd").style.display = "inline-block";
	
	document.getElementById("inputIDUpdate").innerHTML = "";
	document.getElementById("errors").style.display = "none";
}

//atualizando os dados
function updateData(){
	if(!validation()){
		return;
	}
	var id = document.getElementById("idUpdate").value;
	var desc = document.getElementById("desc").value;
	var amount = document.getElementById("amount").value;
	var value = document.getElementById("value").value;

	list[id] = {"desc":desc, "amount":amount, "value":value};
	resetForm();
	setList(list);
}

//deletando os dados
function deleteData(id){
	if(confirm("Delete this item?")){
		if(id === list.length - 1){
			list.pop();
		}else if(id === 0){
			list.shift();
		}else{
			var arrAuxIni = list.slice(0,id);
			var arrAuxEnd = list.slice(id + 1);
			list = arrAuxIni.concat(arrAuxEnd);
		}
		setList(list);
	}
}

//validando e printando erros
function validation(){
	var desc = document.getElementById("desc").value;
	var amount = document.getElementById("amount").value;
	var value = document.getElementById("value").value;
	var errors = "";
	document.getElementById("errors").style.display = "none";

	if(desc === ""){
		errors += '<p>Fill out description</p>';
	}
	if(amount === ""){
		errors += '<p>Fill out a quantity</p>';
	}else if(amount != parseInt(amount)){
		errors += '<p>Fill out a valid amount</p>';
	}
	if(value === ""){
		errors += '<p>Fill out a value</p>';
	}else if(value != parseFloat(value)){
		errors += '<p>Fill out a valid value</p>';
	}

	if(errors != ""){
		document.getElementById("errors").style.display = "block";
		document.getElementById("errors").innerHTML = "<h3>Error:</h3>" + errors;
		return 0;
	}else{
		return 1;
	}
}

//deletando lista
function deleteList(){
	if (confirm("Delete this list?")){
		list = [];
		setList(list);
	}
}

//salvando em storage
function saveListStorage(list){
	var jsonStr = JSON.stringify(list);
	localStorage.setItem("list",jsonStr);
}

//verifica se já tem algo salvo
function initListStorage(){
	var testList = localStorage.getItem("list");
	if(testList){
		list = JSON.parse(testList);
	}
	setList(list);
}

initListStorage();
(function() {
  "use strict";

  /**
   * Easy selector helper function
   */
  const select = (el, all = false) => {
    el = el.trim()
    if (all) {
      return [...document.querySelectorAll(el)]
    } else {
      return document.querySelector(el)
    }
  }

  /**
   * Easy event listener function
   */
  const on = (type, el, listener, all = false) => {
    let selectEl = select(el, all)
    if (selectEl) {
      if (all) {
        selectEl.forEach(e => e.addEventListener(type, listener))
      } else {
        selectEl.addEventListener(type, listener)
      }
    }
  }

  /**
   * Easy on scroll event listener 
   */
  const onscroll = (el, listener) => {
    el.addEventListener('scroll', listener)
  }

  /**
   * Navbar links active state on scroll
   */
  let navbarlinks = select('#navbar .scrollto', true)
  const navbarlinksActive = () => {
    let position = window.scrollY + 200
    navbarlinks.forEach(navbarlink => {
      if (!navbarlink.hash) return
      let section = select(navbarlink.hash)
      if (!section) return
      if (position >= section.offsetTop && position <= (section.offsetTop + section.offsetHeight)) {
        navbarlink.classList.add('active')
      } else {
        navbarlink.classList.remove('active')
      }
    })
  }
  window.addEventListener('load', navbarlinksActive)
  onscroll(document, navbarlinksActive)

  /**
   * Scrolls to an element with header offset
   */
  const scrollto = (el) => {
    let header = select('#header')
    let offset = header.offsetHeight

    let elementPos = select(el).offsetTop
    window.scrollTo({
      top: elementPos - offset,
      behavior: 'smooth'
    })
  }

  /**
   * Toggle .header-scrolled class to #header when page is scrolled
   */
  let selectHeader = select('#header')
  let selectTopbar = select('#topbar')
  if (selectHeader) {
    const headerScrolled = () => {
      if (window.scrollY > 100) {
        selectHeader.classList.add('header-scrolled')
        if (selectTopbar) {
          selectTopbar.classList.add('topbar-scrolled')
        }
      } else {
        selectHeader.classList.remove('header-scrolled')
        if (selectTopbar) {
          selectTopbar.classList.remove('topbar-scrolled')
        }
      }
    }
    window.addEventListener('load', headerScrolled)
    onscroll(document, headerScrolled)
  }

  /**
   * Back to top button
   */
  let backtotop = select('.back-to-top')
  if (backtotop) {
    const toggleBacktotop = () => {
      if (window.scrollY > 100) {
        backtotop.classList.add('active')
      } else {
        backtotop.classList.remove('active')
      }
    }
    window.addEventListener('load', toggleBacktotop)
    onscroll(document, toggleBacktotop)
  }

  /**
   * Mobile nav toggle
   */
  on('click', '.mobile-nav-toggle', function(e) {
    select('#navbar').classList.toggle('navbar-mobile')
    this.classList.toggle('bi-list')
    this.classList.toggle('bi-x')
  })

  /**
   * Mobile nav dropdowns activate
   */
  on('click', '.navbar .dropdown > a', function(e) {
    if (select('#navbar').classList.contains('navbar-mobile')) {
      e.preventDefault()
      this.nextElementSibling.classList.toggle('dropdown-active')
    }
  }, true)

  /**
   * Scrool with ofset on links with a class name .scrollto
   */
  on('click', '.scrollto', function(e) {
    if (select(this.hash)) {
      e.preventDefault()

      let navbar = select('#navbar')
      if (navbar.classList.contains('navbar-mobile')) {
        navbar.classList.remove('navbar-mobile')
        let navbarToggle = select('.mobile-nav-toggle')
        navbarToggle.classList.toggle('bi-list')
        navbarToggle.classList.toggle('bi-x')
      }
      scrollto(this.hash)
    }
  }, true)

  /**
   * Scroll with ofset on page load with hash links in the url
   */
  window.addEventListener('load', () => {
    if (window.location.hash) {
      if (select(window.location.hash)) {
        scrollto(window.location.hash)
      }
    }
  });

  /**
   * Hero carousel indicators
   */
  let heroCarouselIndicators = select("#hero-carousel-indicators")
  let heroCarouselItems = select('#heroCarousel .carousel-item', true)

  heroCarouselItems.forEach((item, index) => {
    (index === 0) ?
    heroCarouselIndicators.innerHTML += "<li data-bs-target='#heroCarousel' data-bs-slide-to='" + index + "' class='active'></li>":
      heroCarouselIndicators.innerHTML += "<li data-bs-target='#heroCarousel' data-bs-slide-to='" + index + "'></li>"
  });

  /**
   * Menu isotope and filter
   */
  window.addEventListener('load', () => {
    let menuContainer = select('.menu-container');
    if (menuContainer) {
      let menuIsotope = new Isotope(menuContainer, {
        itemSelector: '.menu-item',
        layoutMode: 'fitRows'
      });

      let menuFilters = select('#menu-flters li', true);

      on('click', '#menu-flters li', function(e) {
        e.preventDefault();
        menuFilters.forEach(function(el) {
          el.classList.remove('filter-active');
        });
        this.classList.add('filter-active');

        menuIsotope.arrange({
          filter: this.getAttribute('data-filter')
        });

      }, true);
    }

  });

  /**
   * Testimonials slider
   */
  new Swiper('.events-slider', {
    speed: 600,
    loop: true,
    autoplay: {
      delay: 5000,
      disableOnInteraction: false
    },
    slidesPerView: 'auto',
    pagination: {
      el: '.swiper-pagination',
      type: 'bullets',
      clickable: true
    }
  });

  /**
   * Initiate gallery lightbox 
   */
  const galleryLightbox = GLightbox({
    selector: '.gallery-lightbox'
  });

  /**
   * Testimonials slider
   */
  new Swiper('.testimonials-slider', {
    speed: 600,
    loop: true,
    autoplay: {
      delay: 5000,
      disableOnInteraction: false
    },
    slidesPerView: 'auto',
    pagination: {
      el: '.swiper-pagination',
      type: 'bullets',
      clickable: true
    }
  });

})()