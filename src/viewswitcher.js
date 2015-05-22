var View = (function (window, document) {
  'use strict';
  var VIEW_ATTRIBUTE = 'data-view',
      VIEW_ATTRIBUTE_NAME = 'view',
      url = window.location.hash,
      pageTitle = document.querySelector('head title'),
      originalTitle = pageTitle.textContent,
      TITLE_DEVIDER = '&mdash;',
      ERROR_VIEW = document.querySelector('[' + VIEW_ATTRIBUTE + '="error"]'),
      MENU;

  var options = {
    changeTitle: true, 
    setupEvents: true
  }
  
  // select all the views
  var views = document.querySelectorAll('[' + VIEW_ATTRIBUTE + ']');
  
  // hide all views by default.
  // @TODO this should may be optional.
  Array.prototype.forEach.call(views, function(view) {
     view.style.display = 'none'; 
  });

  // SETTERS
  
  //
  // Set Options to configure viewSwitcher before
  // using it. This needs to be called first!
  // 
  // @param {Object} - Options Object 
  //
  function _setOptions(opts) {
    options = {
      changeTitle: opts.changeTitle,
      setupEvents: opts.setupEvents
    }  
  }
  
  //
  // This function sets up the events viewSwitcher "needs"
  // As of v0.0.4, it only handles internal and external links
  // and sets the correct views active.
  // However, in the future more "generic" event listeners will
  // be placed here.
  //
  function _initEvents() {
     // we observe for any click inside the document
      document.addEventListener('click', function(event) {
        // if it is an A tag (link)
        if(event.target.nodeName == 'A') {
        // we create a reference
        var link = event.target;
        // see if it has a hash 
        var hasHash = (link.href.indexOf('#') > -1);
        // and if there's a url assigned to it
        var noHttp = !!link.href.match(/(http|s)/gi);
          // if there's no URL and no hash
          if(hasHash && noHttp) {
            // we cancel the event
            event.preventDefault();
            // and try to active the view
            try {
              var targetView = link.href.match(/#[a-zA-Z0-9]+/)[0].toString().replace('#', '');
              View.setActive(targetView);  
            } catch(e) {
              console.log(e);  
            }
          }
        }
      }); 
    // if there is a MENU set via View.setMenu,
    // it will be assign the proper events by _initEvents
    // if event setting is enabled.
    if(MENU) {
      this._menu.addEventListener('click', function(event) {
        event.preventDefault();
        // Get the VIEW identifier
        var url = event.target.href.match(/#[a-zA-Z0-9]+/)[0].toString().replace('#', '');
        View.setActive(url);
      })
    }
  }
  if(options.setupEvents) {
    _initEvents();
  }
  //
  // Set a new URL or VIEW to be active, this
  // also hides all other open views!
  // 
  // @param {String} - URL/Hash to display
  //
  function _setActive(url) {
      var viewSelector = '[' + VIEW_ATTRIBUTE + '="' + url + '"]';
      var view = document.querySelector(viewSelector); 
      
      if(!view) {
        view = ERROR_VIEW;
      }
       
      View.setTitle(view.dataset[VIEW_ATTRIBUTE_NAME]);
      View.setHash(url);
      
      Array.prototype.forEach.call(views, function(view) {
         view.style.display = 'none';    
      });

      view.style.display = 'block';
    }

  // _setHash
  // Update the page's hash.
  //
  // @param {String} - Hash
  function _setHash(hash) {
    window.location.hash = hash;
  }

  // _setTitle
  // Update the page's real title
  //
  // @param {String} - Title
  function _setTitle(title) {
    if(options.changeTitle) {
      var titleFirstLetter = title.slice(0,1),
          titleRemaining = title.slice(1),
          title = titleFirstLetter.toUpperCase() + titleRemaining; 
      pageTitle.innerHTML = title + ' '+ TITLE_DEVIDER +' ' + originalTitle;
    }
  }
  
  // _initActive
  // set a view as active view when the page loads.
  // If there is a hash present, this one will load!
  //
  // @param {String} - default View 
  function _initActive(defaultView) {
    if(window.location.hash) {
      View.setActive(window.location.hash.replace('#', ''));
    } else {
      View.setActive(defaultView);
    }
  }


 // _getHash
 // get the current hash
 //
 // @return url
  function _getHash() {
    return url;
  }


 // _createMenuHtml
 // Auto-Generate Basic HTML markup
 // 
 // @params {String} - Class Name(s)
 // @return generated HTML
 function _createMenuHtml(className) {
   var output = '<ul>';
   
     Array.prototype.forEach.call(views, function(view) {
       if(view.dataset.view === '404' || view.dataset.view === 'error' || view.dataset.viewExclude) {
          // return nothing and skip the Error Page.
          return;
       }
       output += '<li class="' + className + '">';
       output += '<a href="#'+ view.dataset[VIEW_ATTRIBUTE_NAME] +'">';
       output += view.dataset[VIEW_ATTRIBUTE_NAME] + '</a></li>';
     });
   
   output += '</ul>';
   
   return output;
 }
  
 // _assignMenu
 // Tell viewSwitcher what Element in the DOM
 // represents the Navigation
 // 
 // @params {Node|String} - Node Element or String (ID/ClassName)
 // @return nothing
 function _assignMenu(menu) {
   if(typeof menu == 'string') {
     menu = document.querySelector(menu);
   }
  MENU = menu;
 }
  
  // Public exposed functions.
  // All these functions are available
  // to the View object, like
  // View.getHash(), View.setOptions(), etc.
  return {
    getHash: _getHash,
    getHtmlMenu: _createMenuHtml,
    
    setOptions: _setOptions,   
    setHash: _setHash,   
    setActive: _setActive,
    setTitle: _setTitle,
    setMenu: _assignMenu,
    
    initActive: _initActive
  }
}(window, document));
