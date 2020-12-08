/* global window, document */
require('~/stylus/index.styl');
const $ = require('jquery');

let resizeDebounce = 0;
let nowPage = 'introduction';

const onResize = () => {
  clearTimeout(resizeDebounce);
  resizeDebounce = setTimeout(() => {
  }, 200);
};

const fbShare = (e) => {
  e.preventDefault();

  const url = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(process.env.APP_URL)}`;
  window.open(url, '_blank');
};

const gotoAnchor = (name) => {
  if (name !== 'sedan' && name !== 'suv') return;
  const target = name === 'sedan' ? '.sec-1.t-0' : '.sec-2.t-0';
  const offset = $(target).offset();
  $([document.documentElement, document.body]).animate({
    scrollTop: offset.top,
  }, 500);
};

const onPushState = (e) => {
  const state = e.state || {};
  if (state.url) gotoAnchor(state.url.replace('#', ''));
};

$(() => {
  // $('#root').fadeIn();
  $('#root').show();

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

  $('a.share').on('click', fbShare);

  window.addEventListener('popstate', onPushState);
  $('.sec-banner.sec-1').on('click', () => {
    window.history.pushState({ url: '#sedan' }, null, '#sedan');
    gotoAnchor('sedan');
  });
  $('.sec-banner.sec-2').on('click', () => {
    window.history.pushState({ url: '#suv' }, null, '#suv');
    gotoAnchor('suv');
  });
  const hash = window.location.hash.replace('#', '');
  if (hash) {
    gotoAnchor(hash);
  }

  $(window).on('resize', onResize);
  onResize();
});
