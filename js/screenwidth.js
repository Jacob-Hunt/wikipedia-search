/* Detect screen width for responsive JavaScript; requires Modernizr
   library (https://modernizr.com/) */

var ScreenWidth = {

  xxs: function(){
    return Modernizr.mq('(max-width: 399px)');
  },

  xs: function(){
    return Modernizr.mq('all and (min-width: 400px) and (max-width: 575px)');
  },

  sm: function(){
    return Modernizr.mq('all and (min-width: 576px) and (max-width: 767px)');
  },

  md: function(){
    return Modernizr.mq('all and (min-width: 768px) and (max-width: 991px)');
  },

  lg: function(){
    return Modernizr.mq('all and (min-width: 992px) and (max-width: 1199px)');
  },

  xl: function(){
    return Modernizr.mq('(min-width: 1200px)');
  },

  mobile: function(){
    return Modernizr.mq('(max-width: 575px)');
  },

}
