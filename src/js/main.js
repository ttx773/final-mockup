import Swiper from 'swiper';
import 'swiper/css';
import { Pagination, Scrollbar } from 'swiper/modules';
import 'swiper/css/pagination';


document.addEventListener("DOMContentLoaded", function(event) {


	if(window.innerWidth < 768){
		const swiper = new Swiper('.swiper', {
			modules: [Pagination, Scrollbar],
			direction: 'horizontal',
			loop: true,
			speed: 300,
			slidesOffsetBefore: 16,
			slidesPerView: 'auto',
			spaceBetween: 16,
			centeredSlides: false,
			pagination: {
				el: '.swiper-pagination',
			}
		});
	}


	const sidebarOpen = document.querySelectorAll(".button-toggle__sidebar");
	const sidebar = document.querySelector(".sidebar");
	if(!sidebar) return;

	sidebarOpen.forEach(el => {
		el.addEventListener("click", function() {
			const isActive = document.body.classList.toggle("sidebar-active");
			sidebarOpen.forEach(btn => {
				btn.classList.toggle("active", isActive);
			});
		})
	})


	const searchButton = document.querySelector(".sidebar__header--search-button");
	const searchInput = document.querySelector(".sidebar__header--search-input");

	searchButton.addEventListener("click", function() {
		searchInput.classList.toggle("active-search-input");
		document.querySelector(".sidebar__header--logo").classList.toggle("hidden");
	})


	const readMoreBrandsButton = document.querySelector('.read-more--brands');
	readMoreBrandsButton.addEventListener("click", function() {
		const brandsWrapper = document.querySelector('.brands-items');
		brandsWrapper.classList.toggle("visible");
	})


	const heroTabsWrapper = document.querySelector('.hero__tabs');
	heroTabsWrapper.addEventListener("click", function(e) {
		if(e.target.classList.contains('hero__tab')) {
			const currActiveTab = e.target; // Сам элемент, а не массив классов
			const prevActiveTab = document.querySelector('.hero__tab--active');

			if (prevActiveTab) {
				prevActiveTab.classList.remove('hero__tab--active');
			}
			// Всегда добавляем класс к текущему элементу
			currActiveTab.classList.add('hero__tab--active');
		}
	});
})

