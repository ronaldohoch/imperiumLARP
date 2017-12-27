(function(){
    'use strict';

    customEvents();
    setSizes();
    setResizeEvent();
    initParticle();
    eventListeners();
    initShuffle();

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
        modalLinks[i].addEventListener("click",openModal);
      }

    }
    function openModal(e){
      e.preventDefault();
      var el = this;
      var modal = document.getElementById("infos-modal");
      modal.className += " open";
    }
    function closeModal(){
      var modal = document.getElementById("infos-modal");
      modal.className = modal.className.replace(/\bopen\b/,'');
    }
    function initShuffle(){
      var Shuffle = window.Shuffle;
      var element = document.querySelector('.shuffle-tomes');
      var sizer = element.querySelector('.shuffle-tomes li:first-child');
      var tomeLinks = document.getElementsByClassName(".shuffle-tomes li a");
      var filters = [];

      // Overrideable options
      Shuffle.options = {
        buffer: 0, // Useful for percentage based heights when they might not always be exactly the same (in pixels).
        columnThreshold: 0.01, // Reading the width of elements isn't precise enough and can cause columns to jump between values.
        columnWidth: 0, // A static number or function that returns a number which tells the plugin how wide the columns are (in pixels).
        delimeter: null, // If your group is not json, and is comma delimeted, you could set delimeter to ','.
        easing: 'cubic-bezier(0.4, 0.0, 0.2, 1)', // CSS easing function to use.
        filterMode: Shuffle.FilterMode.ANY, // When using an array with filter(), the element passes the test if any of its groups are in the array. With "all", the element only passes if all groups are in the array.
        group: Shuffle.ALL_ITEMS, // Initial filter group.
        gutterWidth: 0, // A static number or function that tells the plugin how wide the gutters between columns are (in pixels).
        initialSort: null, // Shuffle can be initialized with a sort object. It is the same object given to the sort method.
        isCentered: false, // Attempt to center grid items in each row.
        itemSelector: '*', // e.g. '.picture-item'.
        roundTransforms: true, // Whether to round pixel values used in translate(x, y). This usually avoids blurriness.
        sizer: null, // Element or selector string. Use an element to determine the size of columns and gutters.
        speed: 250, // Transition/animation speed (milliseconds).
        staggerAmount: 15, // Transition delay offset for each item in milliseconds.
        staggerAmountMax: 150, // Maximum stagger delay in milliseconds.
        throttleTime: 300, // How often shuffle can be called on resize (in milliseconds).
        useTransforms: true, // Whether to use transforms or absolute positioning.
      };
      
      var shuffleInstance = new Shuffle(element, {
        itemSelector: '.shuffle-tomes li'
      });

      
      for(var i=0;i<tomeLinks.length;i++){
        tomeLinks[i].addEventListener("click",function(){
          
        });
      }
    }
})();