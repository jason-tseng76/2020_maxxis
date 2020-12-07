/* global window, document */
require('~/stylus/index.styl');
const $ = require('jquery');

let resizeDebounce = 0;
let nowPage = 'introduction';

const onResize = () => {
  clearTimeout(resizeDebounce);
  resizeDebounce = setTimeout(() => {
    const _width = $(window).width();
    if (_width > 768) $('.kv-image > img').attr('src', 'images/kv.png');
    if (_width <= 768) $('.kv-image > img').attr('src', 'images/kv_pad.png');
    // equalCubeHeight();
  }, 200);
};

$(() => {
  $('#root').fadeIn();

  const params = {};
  window.location.search.replace(/[?&]+([^=&]+)=([^&]*)/gi, (str, key, value) => {
    params[key] = value;
  });

  $('.kv-image').removeClass('timing');
  if (params.page === 'feature') {
    nowPage = 'feature';
    $('a.nav-link').eq(1).addClass('active');
  } else if (params.page === 'timing') {
    nowPage = 'timing';
    $('.kv-image').addClass('timing');
    $('a.nav-link').eq(2).addClass('active');
  } else {
    nowPage = 'introduction';
    $('a.nav-link').eq(0).addClass('active');
  }

  $(`#${nowPage}`).show();

  $(window).on('resize', onResize);
  onResize();
});
