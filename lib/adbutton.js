// Add in share links to elements tagged with 'permalink'
(function () {
  'use strict';

  function addclass(el, className) {
    if (el.classList) {
      el.classList.add(className);
    } else {
      if(! hasclass(el, className)){
        el.className += ' ' + className;
      }
    }
  }

  function removeclass(el, className) {
    if (el.classList) {
      el.classList.remove(className);
    } else {
      el.className = el.className.replace(new RegExp('(^|\\b)' + className.split(' ').join('|') + '(\\b|$)', 'gi'), ' ');
    }
  }

  function hasclass(el, className) {
    if (el.classList) {
      return el.classList.contains(className);
    } else {
      return new RegExp('(^| )' + className + '( |$)', 'gi').test(el.className);
    }
  }

  var audiodescribed = document.querySelectorAll('[data-video-type="audio-described"]');

  Array.prototype.forEach.call(audiodescribed, function(el, i){
    el.setAttribute('hidden', true);
  });

  // Add close functionality to all sharebox close buttons
  var adbutton = document.querySelector('#adbutton');
  adbutton.addEventListener('click', function(e){
    var video_elems = document.querySelectorAll('video');
    Array.prototype.forEach.call(video_elems, function(el, i){
      el.pause();
    });
    if (e.target.getAttribute('data-status') == "audio-described") {
      var videos = document.querySelectorAll('.video-container');
      Array.prototype.forEach.call(videos, function(el, i){
        el.removeAttribute("hidden");
      });
      var nonaudiodescribed = document.querySelectorAll('[data-video-type="audio-described"]');
      Array.prototype.forEach.call(nonaudiodescribed, function(el, i){
        el.setAttribute('hidden', true);
      });
      e.target.setAttribute('data-status', 'non-audio-described');
      e.target.querySelector('span').innerHTML = 'Enable Audio Description';
    } else {
      var videos = document.querySelectorAll('.video-container');
      Array.prototype.forEach.call(videos, function(el, i){
        el.setAttribute('hidden', true);
      });
      var nonaudiodescribed = document.querySelectorAll('[data-video-type="audio-described"]');
      Array.prototype.forEach.call(nonaudiodescribed, function(el, i){
        el.removeAttribute("hidden");
      });
      e.target.setAttribute('data-status', 'audio-described');
      e.target.querySelector('span').innerHTML = 'Disable Audio Description';
    }
  });

}());