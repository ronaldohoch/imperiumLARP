(function(){
    'use strict';
    
    var elements = {
      modal : document.getElementById("infosModal"),
      body : document.getElementsByTagName("body")[0],
      modalLinks : document.getElementsByClassName("modal-links")
    }

    var vm = new Vue({
      el:'#infosModal',
      data:{
        modalTitle:"",
        modalSubtitle:"",
        modalText:""
      },
      methods:{
        closeModal:closeModal
      }
    });

    function setSizes(){
        var particle = document.getElementById("particleJS");
        particle.style.width = (window.innerWidth>600?(window.innerWidth-17):window.innerWidth)+"px";
        particle.style.height = window.innerHeight+"px";
    };
    function initParticle(){
        particlesJS("particleJS",{
            "particles": {
              "number": {
                "value": 40,
                "density": {
                  "enable": true,
                  "value_area": 800
                }
              },
              "color": {
                "value": "#fff"
              },
              "shape": {
                "type": "image",
                "stroke": {
                  "width": 0,
                  "color": "#000000"
                },
                "polygon": {
                  "nb_sides": 5
                },
                "image": {
                  "src": "https://upload.wikimedia.org/wikipedia/commons/thumb/3/30/Leaf.svg/2000px-Leaf.svg.png",
                  "width": 100,
                  "height": 100
                }
              },
              "opacity": {
                "value": 0.5,
                "random": true,
                "anim": {
                  "enable": false,
                  "speed": 1,
                  "opacity_min": 0.1,
                  "sync": false
                }
              },
              "size": {
                "value": 10,
                "random": true,
                "anim": {
                  "enable": false,
                  "speed": 40,
                  "size_min": 0.1,
                  "sync": false
                }
              },
              "line_linked": {
                "enable": false,
                "distance": 500,
                "color": "#ffffff",
                "opacity": 0.4,
                "width": 2
              },
              "move": {
                "enable": true,
                "speed": 4,
                "direction": "bottom-right",
                "random": false,
                "straight": false,
                "out_mode": "out",
                "bounce": false,
                "attract": {
                  "enable": false,
                  "rotateX": 500,
                  "rotateY": 1000
                }
              }
            },
            "interactivity": {
              "detect_on": "canvas",
              "events": {
                "onhover": {
                  "enable": true,
                  "mode": "bubble"
                },
                "onclick": {
                  "enable": true,
                  "mode": "repulse"
                },
                "resize": true
              },
              "modes": {
                "grab": {
                  "distance": 400,
                  "line_linked": {
                    "opacity": 0.5
                  }
                },
                "bubble": {
                  "distance": 400,
                  "size": 4,
                  "duration": 0.3,
                  "opacity": 1,
                  "speed": 3
                },
                "repulse": {
                  "distance": 200,
                  "duration": 0.4
                },
                "push": {
                  "particles_nb": 4
                },
                "remove": {
                  "particles_nb": 2
                }
              }
            },
            "retina_detect": true
          })
    }
    function customEvents(){
      //https://developer.mozilla.org/pt-BR/docs/Web/Events/resize
      var throttle = function(type, name, obj) {
        obj = obj || window;
        var running = false;
        var func = function() {
            if (running) { return; }
            running = true;
             requestAnimationFrame(function() {
                obj.dispatchEvent(new CustomEvent(name));
                running = false;
            });
        };
        obj.addEventListener(type, func);
      };
      /* init - you can init any event */
      throttle("resize", "optimizedResize");

      
    }
    function setResizeEvent(){
      window.addEventListener("optimizedResize", function() {
        setSizes();
        //quando o resize acontece o canvas fica achatado ou espremido
        //estas linhas fazem com que a animação reinicie
        //mantendo o tamanho da imagem
        pJSDom[0].pJS.particles.move.enable = true;
        pJSDom[0].pJS.fn.particlesRefresh();
      });
    }
    function eventListeners(){
      for(var i=0;i<elements.modalLinks.length;i++){
        elements.modalLinks[i].addEventListener("click",function(e){
          e.preventDefault();

          return doRequest(e,this.dataset.text);
        });
      }
    }
    function openModal(obj){
      var modal = document.getElementById("infosModal");
      modal.className += " open";

      elements.body.className += " modal-open";

      vm.modalTitle = obj.title,
      vm.modalSubtitle = obj.subtitle,
      vm.modalText = obj.text
      
    }
    function closeModal(e){
      e.preventDefault();
      var modal = document.getElementById("infosModal");
      modal.className = modal.className.replace(/\bopen\b/,'');

      elements.body.className = elements.body.className.replace(/\bmodal-open\b/,'');
    }
    function initShuffle(){
      var Shuffle = window.Shuffle;
      var element = document.querySelector('.shuffle-tomes');
      var sizer = element.querySelector('.shuffle-tomes li:first-child');
      var filterLinks = document.getElementsByClassName("filter-links");
      var filters = [];     
      var shuffleInstance = new Shuffle(element, {
        itemSelector: '.shuffle-tomes li'
      });
  
      function applyFilters(filters){
        shuffleInstance.filter(filters);
      }

      for(var i=0;i<filterLinks.length;i++){
        filterLinks[i].addEventListener('click',function(e){
          e.preventDefault();
          var filter = this.dataset.filter;
    
          if(this.className.indexOf('filtered')>-1){
            this.className = this.className.replace(/\bfiltered\b/,'');
          }else{
            this.className += " filtered";
          }
          
          if(filters.indexOf(filter)>-1){
            filters.splice(filters.indexOf(filter),1);
            applyFilters(filters);
            return
          }
          filters.push(filter);
          applyFilters(filters);
        });
      }
    }
    function doRequest(e,endpoint){
      e.preventDefault();
      axios({
        method:'get',
        responseType: 'json',
        url:'/textos/'+endpoint
      })
        .then(function (response) {
          openModal(response.data)
        })
        .catch(function (error) {
          console.log(error);
        });
    }
    function loadGoogleMaps(){
      var url = 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3461.3255446076123!2d-51.265616384890045!3d-29.826023681962234!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x9519612d2deccdcd%3A0x5bd329681dcda587!2sEstrada+Cap%C3%A3o+da+Uni%C3%A3o%2C+70%2C+Nova+Santa+Rita+-+RS%2C+92480-000!5e0!3m2!1spt-BR!2sbr!4v1514919193689';
      var iframe = document.getElementById("googleMap");
      iframe.src=url;
    }

    customEvents();
    setSizes();
    setResizeEvent();
    initParticle();
    eventListeners();
    initShuffle();
    loadGoogleMaps();
})();