(function(){
    'use strict';

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
      var modalLinks = document.getElementsByClassName("modal-links");
      
      for(var i=0;i<modalLinks.length;i++){
        modalLinks[i].addEventListener("click",function(e){
          e.preventDefault();

          return doRequest(e,this.dataset.text);
        });
      }

      var close = document.getElementById("closeModal");
      close.addEventListener("click",closeModal);

    }
    function openModal(){
      var el = this;
      var modal = document.getElementById("infosModal");
      modal.className += " open";
    }
    function closeModal(e){
      e.preventDefault();
      var modal = document.getElementById("infosModal");
      modal.className = modal.className.replace(/\bopen\b/,'');
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
          console.log(response);
          openModal()
        })
        .catch(function (error) {
          console.log(error);
        });
    }

    customEvents();
    setSizes();
    setResizeEvent();
    initParticle();
    eventListeners();
    initShuffle();
})();