import Head from "next/head";
import Link from "next/link";
import { NextComponentType, NextPageContext } from "next";
import { HomeList } from "../components/game/HomeList";
import { List } from "../components/countries/list";
import { BrandsSearchList } from "../components/brands/SearchList";
import { PagedCollection } from "../types/Collection";
import { Game } from "../types/Game";
import { Brands } from "../types/Brands";
import { GameCountryBlock } from "../types/GameCountryBlock";
import { fetch, filterGamesByCountry } from "../utils/dataAccess";
import { useEffect, useState, useRef } from 'react';
import { useDebouncedCallback } from 'use-debounce';
import { useRouter, withRouter } from 'next/router';

interface Props {
  gamesCollection: PagedCollection<Game>;
  brandsCollection: PagedCollection<Brands>;
  gamesBlockedByCountryCollection: PagedCollection<GameCountryBlock>;
}

const Welcome: NextComponentType<NextPageContext, Props, Props>  = ({
    gamesCollection,
    brandsCollection,
    gamesBlockedByCountryCollection
}) =>  {
 
  const [gameBag, setGameBag] = useState(filterGamesByCountry(gamesCollection,gamesBlockedByCountryCollection));
  const [itemsPerPage, setItemsPerPage] = useState(30);
  const [brandId, setBrandId] = useState("96");
  const [gameNameSelector, setGameNameSelector] = useState('');
  const [blockedGamesByCountry, setBlockedGamesByCountry] = useState();

  const searchQuery = async (url, callback) => {
    const res = await fetch(url, {
      method: 'GET',
    });
    return callback(filterGamesByCountry(res, gamesBlockedByCountryCollection));
  }

  console.log("Games blocked by country", gamesBlockedByCountryCollection);

  const handleGameSearch = useDebouncedCallback(async (input) =>  {
    let inputValue = input.target.value;
    setGameNameSelector(inputValue);
    let url = `/games?name=${inputValue}&itemsPerPage=${itemsPerPage}&brand_firewall_launchcode=${brandId}`;
    searchQuery(url, (result) => {
      setGameBag(result);
    });
  }, 600);

  const handleBrandSelection = (e) => {
    let brand = e.target.value.replace("/brands/", "");
    brand = (brand==1) ? "" : brandId;
    let url = (e.target.value == "/brands/1") ? `/games?itemsPerPage=${itemsPerPage}&brand_firewall_launchcode=${brandId}` : e.target.value.replace('brands', 'brand_relations') + "/games";
    searchQuery(url, (result) => {
       setBrandId(brand);
       setGameBag(result);
       inputGameName.value = "";
    });
  }

  return <>
   <div>
    <Head>
      <title>White Hat Gaming Recruitment Test</title>
    </Head>

    <div className="s013">
      <section>
        <form>
          <fieldset>
            <Logo/>
          </fieldset>
          <div className="inner-form">
            <div className="left">
              <div className="input-wrap first">
                <div className="input-field first">
                  <label>GAME</label>
                  <input 
                    type="text"
                    placeholder="ex: Starburst"
                    onChange={(e) => handleGameSearch(e)}
                  />
                </div>
              </div>
              <div className="input-wrap second">
                <div className="input-field second">
                  <label>BRAND</label>
                  <div className="input-select">
                      <select id="brand" name="choices-single-default" onChange={(e) => handleBrandSelection(e)}>
                         <BrandsSearchList brands={brandsCollection["hydra:member"]} />
                      </select>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </form>
      </section>

      <section>
        <HomeList games={gameBag["hydra:member"]} />
      </section>

      <style jsx global>{`
           @import url("https://fonts.googleapis.com/css?family=Poppins:400,500,700");

		html {
		  line-height: 1.15;
		  /* 1 */
		  -ms-text-size-adjust: 100%;
		  /* 2 */
		  -webkit-text-size-adjust: 100%;
		  /* 2 */
                  background-color: blanchedalmond;
		}

		/* Sections
		   ========================================================================== */
		/**
		 * Remove the margin in all browsers (opinionated).
		 */
		body {
		  margin: 0;
                  background-color: blanchedalmond;
                  line-height: 0 !Important;
		}

		/**
		 * Add the correct display in IE 9-.
		 */
		article,
		aside,
		footer,
		header,
		nav,
		section {
		  display: block;
		}

		h1 {
		  font-size: 2em;
		  margin: 0.67em 0;
		}

		/* Grouping content
		   ========================================================================== */
		/**
		 * Add the correct display in IE 9-.
		 * 1. Add the correct display in IE.
		 */
		figcaption,
		figure,
		main {
		  /* 1 */
		  display: block;
		}

		/**
		 * Add the correct margin in IE 8.
		 */
		figure {
		  margin: 1em 40px;
		}

		/**
		 * 1. Add the correct box sizing in Firefox.
		 * 2. Show the overflow in Edge and IE.
		 */
		hr {
		  box-sizing: content-box;
		  /* 1 */
		  height: 0;
		  /* 1 */
		  overflow: visible;
		  /* 2 */
		}

		pre {
		  font-family: monospace, monospace;
		  /* 1 */
		  font-size: 1em;
		  /* 2 */
		}

		/* Text-level semantics
		   ========================================================================== */
		/**
		 * 1. Remove the gray background on active links in IE 10.
		 * 2. Remove gaps in links underline in iOS 8+ and Safari 8+.
		 */
		a {
		  background-color: transparent;
		  /* 1 */
		  -webkit-text-decoration-skip: objects;
		  /* 2 */
		}

		/**
		 * 1. Remove the bottom border in Chrome 57- and Firefox 39-.
		 * 2. Add the correct text decoration in Chrome, Edge, IE, Opera, and Safari.
		 */
		abbr[title] {
		  border-bottom: none;
		  /* 1 */
		  text-decoration: underline;
		  /* 2 */
		  text-decoration: underline dotted;
		  /* 2 */
		}

		b,
		strong {
		  font-weight: inherit;
		}

		/**
		 * Add the correct font weight in Chrome, Edge, and Safari.
		 */
		b,
		strong {
		  font-weight: bolder;
		}

		code,
		kbd,
		samp {
		  font-family: monospace, monospace;
		  /* 1 */
		  font-size: 1em;
		  /* 2 */
		}

		/**
		 * Add the correct font style in Android 4.3-.
		 */
		dfn {
		  font-style: italic;
		}

		/**
		 * Add the correct background and color in IE 9-.
		 */
		mark {
		  background-color: #ff0;
		  color: #000;
		}

		/**
		 * Add the correct font size in all browsers.
		 */
		small {
		  font-size: 80%;
		}

		 
		sub,
		sup {
		  font-size: 75%;
		  line-height: 0;
		  position: relative;
		  vertical-align: baseline;
		}

		sub {
		  bottom: -0.25em;
		}

		sup {
		  top: -0.5em;
		}

		audio,
		video {
		  display: inline-block;
		}

		audio:not([controls]) {
		  display: none;
		  height: 0;
		}

		/**
		 * Remove the border on images inside links in IE 10-.
		 */
		img {
		  border-style: none;
		}

		/**
		 * Hide the overflow in IE.
		 */
		svg:not(:root) {
		  overflow: hidden;
		}

		/* Forms
		   ========================================================================== */
		/**
		 * 1. Change the font styles in all browsers (opinionated).
		 * 2. Remove the margin in Firefox and Safari.
		 */
		button,
		input,
		optgroup,
		select,
		textarea {
		  font-family: sans-serif;
		  /* 1 */
		  font-size: 100%;
		  /* 1 */
		  line-height: 1.15;
		  /* 1 */
		  margin: 0;
		  /* 2 */
		}

		/**
		 * Show the overflow in IE.
		 * 1. Show the overflow in Edge.
		 */
		button,
		input {
		  /* 1 */
		  overflow: visible;
		}

		/**
		 * Remove the inheritance of text transform in Edge, Firefox, and IE.
		 * 1. Remove the inheritance of text transform in Firefox.
		 */
		button,
		select {
		  /* 1 */
		  text-transform: none;
		}

		button,
		html [type="button"],
		[type="reset"],
		[type="submit"] {
		  -webkit-appearance: button;
		}

		button::-moz-focus-inner,
		[type="button"]::-moz-focus-inner,
		[type="reset"]::-moz-focus-inner,
		[type="submit"]::-moz-focus-inner {
		  border-style: none;
		  padding: 0;
		}

		button:-moz-focusring,
		[type="button"]:-moz-focusring,
		[type="reset"]:-moz-focusring,
		[type="submit"]:-moz-focusring {
		  outline: 1px dotted ButtonText;
		}

		fieldset {
		  padding: 0.35em 0.75em 0.625em;
		}

		legend {
		  box-sizing: border-box;
		  color: inherit;
		  display: table;
		  max-width: 100%;
		  padding: 0;
		  white-space: normal;
		}
		progress {
		  display: inline-block;
		  vertical-align: baseline;
		}

		 
		textarea {
		  overflow: auto;
		}

		 
		[type="checkbox"],
		[type="radio"] {
		  box-sizing: border-box;
		  padding: 0;
		}

		[type="number"]::-webkit-inner-spin-button,
		[type="number"]::-webkit-outer-spin-button {
		  height: auto;
		}

		[type="search"] {
		  -webkit-appearance: textfield;
		  outline-offset: -2px;
		}

		 
		[type="search"]::-webkit-search-cancel-button,
		[type="search"]::-webkit-search-decoration {
		  -webkit-appearance: none;
		}

		 
		::-webkit-file-upload-button {
		  -webkit-appearance: button;
		  font: inherit;
		}

		 
		details,
		menu {
		  display: block;
		}

		summary {
		  display: list-item;
		}

		 
		canvas {
		  display: inline-block;
		}

		 
		template {
		  display: none;
		}

		[hidden] {
		  display: none;
		}

		html {
		  height: 100%;
		}

		fieldset {
		  margin: 0;
		  padding: 0;
		  -webkit-margin-start: 0;
		  -webkit-margin-end: 0;
		  -webkit-padding-before: 0;
		  -webkit-padding-start: 0;
		  -webkit-padding-end: 0;
		  -webkit-padding-after: 0;
		  border: 0;
		}

		legend {
		  margin: 0;
		  padding: 0;
		  display: block;
		  -webkit-padding-start: 0;
		  -webkit-padding-end: 0;
		}

                .choices{
		  position: relative;
		  margin-bottom: 24px;
		  font-size: 16px;
		}

		.choices:focus {
		  outline: none;
		}

		.choices:last-child {
		  margin-bottom: 0;
		}

		.choices.is-disabled .choices__inner, .choices.is-disabled .choices__input {
		  background-color: #EAEAEA;
		  cursor: not-allowed;
		  -webkit-user-select: none;
			 -moz-user-select: none;
			  -ms-user-select: none;
				  user-select: none;
		}

		.choices.is-disabled .choices__item {
		  cursor: not-allowed;
		}

		.choices[data-type*="select-one"] {
		  cursor: pointer;
		}

		.choices[data-type*="select-one"] .choices__inner {
		  padding-bottom: 7.5px;
		}

		.choices[data-type*="select-one"] .choices__input {
		  display: block;
		  width: 100%;
		  padding: 10px;
		  border-bottom: 1px solid #DDDDDD;
		  background-color: #FFFFFF;
		  margin: 0;
		}

		.choices[data-type*="select-one"] .choices__button {
		  background-image: url("../../icons/cross-inverse.svg");
		  padding: 0;
		  background-size: 8px;
		  height: 100%;
		  position: absolute;
		  top: 50%;
		  right: 0;
		  margin-top: -10px;
		  margin-right: 25px;
		  height: 20px;
		  width: 20px;
		  border-radius: 10em;
		  opacity: .5;
		}

		.choices[data-type*="select-one"] .choices__button:hover, .choices[data-type*="select-one"] .choices__button:focus {
		  opacity: 1;
		}

		.choices[data-type*="select-one"] .choices__button:focus {
		  box-shadow: 0px 0px 0px 2px #00BCD4;
		}

		.choices[data-type*="select-one"]:after {
		  content: "";
		  height: 0;
		  width: 0;
		  border-style: solid;
		  border-color: #333333 transparent transparent transparent;
		  border-width: 5px;
		  position: absolute;
		  right: 11.5px;
		  top: 50%;
		  margin-top: -2.5px;
		  pointer-events: none;
		}

		.choices[data-type*="select-one"].is-open:after {
		  border-color: transparent transparent #333333 transparent;
		  margin-top: -7.5px;
		}

		.choices[data-type*="select-one"][dir="rtl"]:after {
		  left: 11.5px;
		  right: auto;
		}

		.choices[data-type*="select-one"][dir="rtl"] .choices__button {
		  right: auto;
		  left: 0;
		  margin-left: 25px;
		  margin-right: 0;
		}

		.choices[data-type*="select-multiple"] .choices__inner, .choices[data-type*="text"] .choices__inner {
		  cursor: text;
		}

		.choices[data-type*="select-multiple"] .choices__button, .choices[data-type*="text"] .choices__button {
		  position: relative;
		  display: inline-block;
		  margin-top: 0;
		  margin-right: -4px;
		  margin-bottom: 0;
		  margin-left: 8px;
		  padding-left: 16px;
		  border-left: 1px solid #008fa1;
		  background-image: url("../../icons/cross.svg");
		  background-size: 8px;
		  width: 8px;
		  line-height: 1;
		  opacity: .75;
		}

		.choices[data-type*="select-multiple"] .choices__button:hover, .choices[data-type*="select-multiple"] .choices__button:focus, .choices[data-type*="text"] .choices__button:hover, .choices[data-type*="text"] .choices__button:focus {
		  opacity: 1;
		}

		.choices__inner {
		  display: inline-block;
		  vertical-align: top;
		  width: 100%;
		  background-color: #f9f9f9;
		  padding: 7.5px 7.5px 3.75px;
		  border: 1px solid #DDDDDD;
		  border-radius: 2.5px;
		  font-size: 14px;
		  min-height: 44px;
		  overflow: hidden;
		}

		.is-focused .choices__inner, .is-open .choices__inner {
		  border-color: #b7b7b7;
		}

		.is-open .choices__inner {
		  border-radius: 2.5px 2.5px 0 0;
		}

		.is-flipped.is-open .choices__inner {
		  border-radius: 0 0 2.5px 2.5px;
		}

		.choices__list {
		  margin: 0;
		  padding-left: 0;
		  list-style: none;
		}

		.choices__list--single {
		  display: inline-block;
		  padding: 4px 16px 4px 4px;
		  width: 100%;
		}

		[dir="rtl"] .choices__list--single {
		  padding-right: 4px;
		  padding-left: 16px;
		}

		.choices__list--single .choices__item {
		  width: 100%;
		}

		.choices__list--multiple {
		  display: inline;
		}

		.choices__list--multiple .choices__item {
		  display: inline-block;
		  vertical-align: middle;
		  border-radius: 20px;
		  padding: 4px 10px;
		  font-size: 12px;
		  font-weight: 500;
		  margin-right: 3.75px;
		  margin-bottom: 3.75px;
		  background-color: #00BCD4;
		  border: 1px solid #00a5bb;
		  color: #FFFFFF;
		  word-break: break-all;
		}

		.choices__list--multiple .choices__item[data-deletable] {
		  padding-right: 5px;
		}

		[dir="rtl"] .choices__list--multiple .choices__item {
		  margin-right: 0;
		  margin-left: 3.75px;
		}

		.choices__list--multiple .choices__item.is-highlighted {
		  background-color: #00a5bb;
		  border: 1px solid #008fa1;
		}

		.is-disabled .choices__list--multiple .choices__item {
		  background-color: #aaaaaa;
		  border: 1px solid #919191;
		}

		.choices__list--dropdown {
		  display: none;
		  z-index: 1;
		  position: absolute;
		  width: 100%;
		  background-color: #FFFFFF;
		  border: 1px solid #DDDDDD;
		  top: 100%;
		  margin-top: -1px;
		  border-bottom-left-radius: 2.5px;
		  border-bottom-right-radius: 2.5px;
		  overflow: hidden;
		  word-break: break-all;
		}

		.choices__list--dropdown.is-active {
		  display: block;
		}

		.is-open .choices__list--dropdown {
		  border-color: #b7b7b7;
		}

		.is-flipped .choices__list--dropdown {
		  top: auto;
		  bottom: 100%;
		  margin-top: 0;
		  margin-bottom: -1px;
		  border-radius: .25rem .25rem 0 0;
		}

		.choices__list--dropdown .choices__list {
		  position: relative;
		  max-height: 300px;
		  overflow: auto;
		  -webkit-overflow-scrolling: touch;
		  will-change: scroll-position;
		}

		.choices__list--dropdown .choices__item {
		  position: relative;
		  padding: 10px;
		  font-size: 14px;
		}

		[dir="rtl"] .choices__list--dropdown .choices__item {
		  text-align: right;
		}

		@media (min-width: 640px) {
		  .choices__list--dropdown .choices__item--selectable {
			padding-right: 100px;
		  }
		  .choices__list--dropdown .choices__item--selectable:after {
			content: attr(data-select-text);
			font-size: 12px;
			opacity: 0;
			position: absolute;
			right: 10px;
			top: 50%;
			transform: translateY(-50%);
		  }
		  [dir="rtl"] .choices__list--dropdown .choices__item--selectable {
			text-align: right;
			padding-left: 100px;
			padding-right: 10px;
		  }
		  [dir="rtl"] .choices__list--dropdown .choices__item--selectable:after {
			right: auto;
			left: 10px;
		  }
		}

		.choices__list--dropdown .choices__item--selectable.is-highlighted {
		  background-color: #f2f2f2;
		}

		.choices__list--dropdown .choices__item--selectable.is-highlighted:after {
		  opacity: .5;
		}

		.choices__item {
		  cursor: default;
		}

		.choices__item--selectable {
		  cursor: pointer;
		}

		.choices__item--disabled {
		  cursor: not-allowed;
		  -webkit-user-select: none;
			 -moz-user-select: none;
			  -ms-user-select: none;
				  user-select: none;
		  opacity: .5;
		}

		.choices__heading {
		  font-weight: 600;
		  font-size: 12px;
		  padding: 10px;
		  border-bottom: 1px solid #f7f7f7;
		  color: gray;
		}

		.choices__button {
		  text-indent: -9999px;
		  -webkit-appearance: none;
		  -moz-appearance: none;
			   appearance: none;
		  border: 0;
		  background-color: transparent;
		  background-repeat: no-repeat;
		  background-position: center;
		  cursor: pointer;
		}

		.choices__button:focus {
		  outline: none;
		}

		.choices__input {
		  display: inline-block;
		  vertical-align: baseline;
		  background-color: #f9f9f9;
		  font-size: 14px;
		  margin-bottom: 5px;
		  border: 0;
		  border-radius: 0;
		  max-width: 100%;
		  padding: 4px 0 4px 2px;
		}

		.choices__input:focus {
		  outline: 0;
		}

		[dir="rtl"] .choices__input {
		  padding-right: 2px;
		  padding-left: 0;
		}

		.choices__placeholder {
		  opacity: .5;
		}

		/*=====  End of Choices  ======*/
		* {
		  box-sizing: border-box;
		}

		[type="checkbox"]:checked,
		[type="checkbox"]:not(:checked) {
		  position: absolute;
		  left: -9999px;
		  visibility: hidden;
		  transform: scale(0);
		  opacity: 0;
		}

		[type="checkbox"]:checked + label,
		[type="checkbox"]:not(:checked) + label {
		  position: relative;
		  padding-left: 33px;
		  cursor: pointer;
		}

		[type="checkbox"]:checked + label:before,
		[type="checkbox"]:not(:checked) + label:before {
		  content: '';
		  position: absolute;
		  left: 0;
		  top: 0;
		  width: 20px;
		  height: 20px;
		  border-radius: 3px;
		  background: #fff;
		}

		[type="checkbox"]:checked + label:after,
		[type="checkbox"]:not(:checked) + label:after {
		  content: '';
		  width: 12px;
		  height: 12px;
		  background-image: url("data:image/svg+xml;charset=UTF-8,%3csvg fill='%2300ad5f' aria-hidden='true' data-prefix='fas' data-icon='check' class='svg-inline--fa fa-check fa-w-16' role='img' xmlns='http://www.w3.org/2000/svg' viewBox='0 0 512 512'%3e%3cpath fill='%2300ad5f' d='M173.898 439.404l-166.4-166.4c-9.997-9.997-9.997-26.206 0-36.204l36.203-36.204c9.997-9.998 26.207-9.998 36.204 0L192 312.69 432.095 72.596c9.997-9.997 26.207-9.997 36.204 0l36.203 36.204c9.997 9.997 9.997 26.206 0 36.204l-294.4 294.401c-9.998 9.997-26.207 9.997-36.204-.001z'%3e%3c/path%3e%3c/svg%3e");
		  position: absolute;
		  top: 4px;
		  left: 4px;
		  border-radius: 100%;
		  transition: all 0.2s ease;
		}

		[type="checkbox"]:not(:checked) + label:after {
		  opacity: 0;
		  transform: scale(0);
		}

		[type="checkbox"]:checked + label:after {
		  opacity: 1;
		  transform: scale(1);
		}

		.s013 {
		  min-height: 100vh;
		  display: -ms-flexbox;
		  display: flex;
                  flex-direction: column;
                  align-items: center;
                  flex-wrap: wrap;
                  width: 100%;
		  -ms-flex-pack: center;
			  justify-content: center;
		  -ms-flex-align: center;
			  align-items: center;
		  background-size: cover;
		  background-position: center center;
		  padding: 15px;
		  font-family: 'Poppins', sans-serif;
		}

		.s013 form {
		  width: 100%;
		  max-width: 914px;
		  margin: 0;
		}

		.s013 form fieldset {
		  margin-bottom: 50px;
                  text-align: center;
		}

		.s013 form fieldset legend {
		  font-size: 36px;
		  font-weight: bold;
		  color: #fff;
		  font-family: 'Poppins', sans-serif;
		  text-align: center;
		}

		.s013 form .inner-form {
		  display: -ms-flexbox;
		  display: flex;
		  -ms-flex-pack: justify;
			  justify-content: space-between;
		}

		.s013 form .inner-form .left {
		  -ms-flex-positive: 1;
			  flex-grow: 1;
		  display: -ms-flexbox;
		  display: flex;
		}

		.s013 form .inner-form .input-wrap {
		  background: #fff;
		  height: 80px;
		  position: relative;
		  padding: 20px 25px 20px 25px;
		}

		.s013 form .inner-form .input-wrap .input-field label {
		  font-size: 11px;
		  font-weight: 500;
		  display: block;
		  color: #555;
		}

		.s013 form .inner-form .input-wrap .input-field input {
		  font-size: 16px;
		  color: #333;
		  background: transparent;
		  width: 100%;
		  border: 0;
		  font-family: 'Lato', sans-serif;
		  padding: 8px 0;
		}

		.s013 form .inner-form .input-wrap .input-field input.placeholder {
		  color: #808080;
		}

		.s013 form .inner-form .input-wrap .input-field input:-moz-placeholder {
		  color: #808080;
		}

		.s013 form .inner-form .input-wrap .input-field input::-webkit-input-placeholder {
		  color: #808080;
		}

		.s013 form .inner-form .input-wrap .input-field input.hover, .s013 form .inner-form .input-wrap .input-field input:focus {
		  box-shadow: none;
		  outline: 0;
		}

		.s013 form .inner-form .input-wrap.first {
		  -ms-flex-positive: 1;
			  flex-grow: 1;
		  border-radius: 3px 0 0 3px;
		}

		.s013 form .inner-form .input-wrap.second {
		  min-width: 262px;
		  border-radius: 0 3px 3px 0;
		  border-left: 1px solid #e5e5e5;
		}

		.s013 form .input-select {
		  height: 34px;
		  padding: 10px 0 6px 0;
		}

		.s013 form .choices__inner {
		  background: transparent;
		  border-radius: 0;
		  border: 0;
		  height: 100%;
		  color: #333;
		  display: -ms-flexbox;
		  display: flex;
		  -ms-flex-align: center;
			  align-items: center;
		  padding: 0;
		  padding-right: 30px;
		  font-size: 16px;
		  min-height: auto;
		  font-family: 'Lato', sans-serif;
		}

		.s013 form .choices__inner .choices__list.choices__list--single {
		  display: -ms-flexbox;
		  display: flex;
		  padding: 0;
		  -ms-flex-align: center;
			  align-items: center;
		  height: 100%;
		}

		.s013 form .choices__inner .choices__item.choices__item--selectable.choices__placeholder {
		  display: -ms-flexbox;
		  display: flex;
		  -ms-flex-align: center;
			  align-items: center;
		  height: 100%;
		  opacity: 1;
		  color: #808080;
		  font-weight: 400;
		}

		.s013 form .choices__inner .choices__list--single .choices__item {
		  display: -ms-flexbox;
		  display: flex;
		  -ms-flex-align: center;
			  align-items: center;
		  height: 100%;
		}

		.s013 form .choices__list.choices__list--dropdown {
		  border: 0;
		  background: #fff;
		  padding: 10px 15px;
		  margin-top: 10px;
		  border-radius: 3px;
		  box-shadow: 0px 8px 20px 0px rgba(0, 0, 0, 0.15);
		}

		.s013 form .choices__list.choices__list--dropdown .choices__item--selectable {
		  padding-right: 0;
		}

		.s013 form .choices__list--dropdown .choices__item--selectable.is-highlighted {
		  background: transparent;
		  color: #333;
		}

		.s013 form .choices__list--dropdown .choices__item {
		  color: #555;
		  min-height: 24px;
		}

		.s013 form .choices[data-type*="select-one"] .choices__inner {
		  padding-bottom: 0;
		}

		.s013 form .choices[data-type*="select-one"]:after {
		  border: 0;
		  width: 18px;
		  height: 18px;
		  margin: 0;
		  transform: none;
		  opacity: 1;
		  right: 0;
		  top: 0;
		  background-size: 18px 18px;
		  background-position: right center;
		  background-image: url("data:image/svg+xml;charset=UTF-8,%3csvg fill='%23999' xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24'%3e%3cpath d='M16.59 8.59L12 13.17 7.41 8.59 6 10l6 6 6-6z'/%3e%3c/svg%3e");
		  background-repeat: no-repeat;
		}

		.s013 form .choices[data-type*="select-one"].is-open:after {
		  background-image: url("data:image/svg+xml;charset=UTF-8,%3csvg fill='%23999' xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24'%3e%3cpath d='M12 8l-6 6 1.41 1.41L12 10.83l4.59 4.58L18 14z'/%3e%3c/svg%3e");
		}

		.s013 form .btn-search {
		  min-width: 110px;
		  height: 80px;
		  padding: 0 15px;
		  background: #fa4251;
		  white-space: nowrap;
		  border-radius: 3px;
		  font-size: 16px;
		  color: #fff;
		  transition: all .2s ease-out, color .2s ease-out;
		  border: 0;
		  cursor: pointer;
		  font-weight: 400;
		  font-family: 'Poppins', sans-serif;
		  margin-left: 10px;
		}

		.s013 form .btn-search:hover {
		  background: #f9293a;
		}

                .s013 form select {
                  border-color: white !important;
                  color: #333;
                  font-family: 'Lato', sans-serif;
                  padding: 5px;
                  width: 100%;
                }

                .table th, .table td {
                  vertical-align: middle!important;
                  font-size: 0.9em!important;
                  text-overflow: ellipsis;
                  white-space: nowrap;
                  overflow: hidden;
                }

		@media screen and (max-width: 767px) {
		  .s013 form .inner-form {
			display: block;
		  }
		  .s013 form .inner-form .left {
			display: block;
		  }
		  .s013 form .inner-form .left .input-wrap {
			margin-bottom: 15px;
		  }
		  .s013 form .btn-search {
			margin: 0;
			width: 100%;
		  }
		}
            
          `}
       </style>
     </div>
    </div>
   </>
};


Welcome.getInitialProps = async (router) => {
  const gamesCollection = await fetch("/games");
  const brandsCollection = await fetch("/brands");
  const gamesBlockedByCountryCollection = await fetch(`/countries/${router.locale.toUpperCase()}/blocked_games?itemsPerPage=2000`);
  return { gamesCollection, brandsCollection, gamesBlockedByCountryCollection};
};

export default withRouter(Welcome);

const Admin = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={100}
    height={100}
    viewBox="0 0 646 646"
  >
    <style jsx>
      {`
                .adminst0 {
                    fill: #273942;
                }
                .adminst1 {
                    fill: #b7cdd8;
                }
                .adminst2 {
                    fill: #e2e2f7;
                }
                .adminst3 {
                    fill: #52677a;
                }
                .adminst4 {
                    fill: #354f5c;
                }
                .adminst5 {
                    fill: #ce521f;
                }
                .adminst6 {
                    fill: #ebebeb;
                }
                .adminst7 {
                    fill: #8e96a3;
                }
                .adminst8 {
                    fill: #3d4d5c;
                }
                .adminst9 {
                    fill: #3e9697;
                }
                .adminst10 {
                    fill: #68b7ce;
                }
                .adminst11 {
                    fill: #e8e8e8;
                }
                .adminst12 {
                    fill: #ffffff;
                }
                .adminst13 {
                    fill: #828282;
                }
                .adminst14 {
                    fill: #cccccc;
                }
                .adminst15 {
                    fill: #606060;
                }
                .adminst16 {
                    fill: #c6c6c6;
                }
                .adminst17 {
                    opacity: 0.15;
                }
                .adminst18 {
                    fill: #1d1e1c;
                }
                .adminst19 {
                    fill: #ffd700;
                }
                .adminst20 {
                    fill: #ff9700;
                }
                .adminst21 {
                    fill: #ffffe8;
                }
                .adminst22 {
                    fill: #f2dab8;
                }
                .adminst23 {
                    fill: #d44d41;
                }
                .adminst24 {
                    opacity: 0.3;
                }
                .adminst25 {
                    opacity: 0.3;
                    fill: #ffffff;
                }
                .adminst26 {
                    fill: #f01c01;
                }
                .adminst27 {
                    fill: #dbdad9;
                }
                .adminst28 {
                    opacity: 0.4;
                    fill: #ffffff;
                }
                .adminst29 {
                    opacity: 0.2;
                }
                .adminst30 {
                    opacity: 0.2;
                    fill: #020202;
                }
                .adminst31 {
                    fill: #f3554b;
                }
                .adminst32 {
                    fill: #bf2c28;
                }
                .adminst33 {
                    fill: #1f6a7b;
                }
                .adminst34 {
                    fill: #0594af;
                }
                .adminst35 {
                    fill: #38a9b4;
                }
                .adminst36 {
                    opacity: 0.2;
                    fill: #1d1e1c;
                }
                .adminst37 {
                    opacity: 0.64;
                    fill: #a6d9ed;
                }
                .adminst38 {
                    fill-rule: evenodd;
                    clip-rule: evenodd;
                    fill: #f0f0f0;
                }
                .adminst39 {
                    fill-rule: evenodd;
                    clip-rule: evenodd;
                    fill: #e1dddd;
                }
                .adminst40 {
                    fill-rule: evenodd;
                    clip-rule: evenodd;
                    fill: #ffffff;
                }
                .adminst41 {
                    fill-rule: evenodd;
                    clip-rule: evenodd;
                    fill: #af3737;
                }
                .adminst42 {
                    fill-rule: evenodd;
                    clip-rule: evenodd;
                    fill: #990000;
                }
                .adminst43 {
                    fill: #990000;
                }
                .adminst44 {
                    fill: #510000;
                }
                .adminst45 {
                    opacity: 0.5;
                    fill-rule: evenodd;
                    clip-rule: evenodd;
                    fill: #8e2525;
                }
                .adminst46 {
                    fill: #2ba2b2;
                }
                .adminst47 {
                    fill: #34aac0;
                }
                .adminst48 {
                    fill: #f69f00;
                }
                .adminst49 {
                    fill: #f59e00;
                }
                .adminst50 {
                    opacity: 0.1;
                }
                .adminst51 {
                    fill: #ed9406;
                }
                .adminst52 {
                    fill: #c6006d;
                }
                .adminst53 {
                    fill: #a50263;
                }
                .adminst54 {
                    fill: #6ac700;
                }
                .adminst55 {
                    fill: #5b9904;
                }
                .adminst56 {
                    fill: #070707;
                }
            `}
    </style>
    <path
      className="adminst0"
      d="M77.9 459.8c0 0-1.2 11.5 33.3 11.5 34.5 0 438.5 0.7 438.5 0.7s23.1 0.7 29.3-11.3L77.9 459.8z"
    />
    <path
      className="adminst1"
      d="M579 457.5c-2 4.3-7.8 6.5-13.8 6.5l-473.7-0.7c-6 0-12.1-3-13.7-6.7l33.2-66.2c3.8-5.8 3.3-8.5 10.2-8.5h416.2c3.3 0 7.6 2.4 10.5 8.5L579 457.5z"
    />
    <path
      className="adminst2"
      d="M335.3 140.7c0 1.6-1.3 2.9-2.8 2.9h-5.7c-1.6 0-2.8-1.3-2.8-2.9l0 0c0-1.6 1.3-2.9 2.8-2.9h5.7C334.1 137.8 335.3 139.1 335.3 140.7L335.3 140.7z"
    />
    <polygon
      className="adminst3"
      points="255.9 435.6 259.2 424.8 232.5 424.8 227.9 435.6 "
    />
    <polygon
      className="adminst3"
      points="262 421.1 265 411.8 239.2 411.8 235.1 421.1 "
    />
    <polygon
      className="adminst3"
      points="265.8 408.6 268.8 399.2 243.9 399.2 239.9 408.6 "
    />
    <polygon
      className="adminst3"
      points="228.4 408.6 232.2 399.2 209.1 399.2 204.3 408.6 "
    />
    <polygon
      className="adminst3"
      points="216.1 435.6 220.5 424.8 195.7 424.8 190.1 435.6 "
    />
    <polygon
      className="adminst3"
      points="223 421.1 226.9 411.8 202.9 411.8 198.1 421.1 "
    />
    <polygon
      className="adminst3"
      points="298.8 408.6 301 399.2 279.9 399.2 276.8 408.6 "
    />
    <polygon
      className="adminst3"
      points="193.2 408.6 197.9 399.2 173.1 399.2 167.5 408.6 "
    />
    <polygon
      className="adminst3"
      points="184.5 424.8 158.8 424.8 151.4 435.6 179.2 435.6 "
    />
    <polygon
      className="adminst3"
      points="186.3 421.3 191.6 412 166.5 412 160.7 421.3 "
    />
    <polygon
      className="adminst3"
      points="297 421.1 299 411.8 274.9 411.8 272.7 421.1 "
    />
    <polygon
      className="adminst3"
      points="155.3 412 132.9 412 124.6 420.6 149.4 420.6 "
    />
    <polygon
      className="adminst3"
      points="146 424.5 122.7 424.5 113.4 434.9 139 434.9 "
    />
    <polygon
      className="adminst3"
      points="157.9 408 163.2 399.2 141.7 399.2 135.4 408 "
    />
    <polygon
      className="adminst3"
      points="474.1 435.6 501.9 435.6 494.7 424.8 468.1 424.8 "
    />
    <polygon
      className="adminst3"
      points="460.7 411.8 465.9 421.1 492.7 421.1 486.3 411.8 "
    />
    <polygon
      className="adminst3"
      points="485.6 408.6 479.4 399.2 454.7 399.2 459.9 408.6 "
    />
    <polygon
      className="adminst3"
      points="413.1 421.1 408.5 411.8 385.7 411.8 389.4 421.1 "
    />
    <polygon
      className="adminst3"
      points="419.9 435.6 413.9 424.8 390.4 424.8 394.6 435.6 "
    />
    <polygon
      className="adminst3"
      points="445.7 408.6 441.7 399.2 417.6 399.2 422.8 408.6 "
    />
    <polygon
      className="adminst3"
      points="453.7 421.1 448.2 411.8 423.9 411.8 428.4 421.1 "
    />
    <polygon
      className="adminst3"
      points="434.3 435.6 460.6 435.6 454.3 424.8 429.2 424.8 "
    />
    <polygon
      className="adminst3"
      points="408.1 408.6 402.2 399.2 378.8 399.2 383.7 408.6 "
    />
    <polygon
      className="adminst3"
      points="509.3 424.8 516.2 435.6 545.5 435.6 537.3 424.8 "
    />
    <polygon
      className="adminst3"
      points="526.7 408.6 519.5 399.2 493.5 399.2 499.5 408.6 "
    />
    <polygon
      className="adminst3"
      points="507.2 421.1 535.3 421.1 528.1 411.8 501.1 411.8 "
    />
    <polygon
      className="adminst3"
      points="372.5 408.6 368.6 399.2 343.9 399.2 346.7 408.6 "
    />
    <polygon
      className="adminst3"
      points="376.1 421.1 372.2 411.8 346.5 411.8 349.4 421.1 "
    />
    <polygon
      className="adminst3"
      points="334.9 408.6 333.9 399.2 311 399.2 310.1 408.6 "
    />
    <polygon
      className="adminst3"
      points="336 421.1 334.4 411.8 310.1 411.8 308.9 421.1 "
    />
    <polygon
      className="adminst3"
      points="376.9 424.8 349.2 424.8 324.2 424.8 324 424.8 298.2 424.8 297.8 424.8 270.6 424.8 268.1 435.6 297 435.6 297.4 435.6 324.5 435.6 324.6 435.6 350.8 435.6 380.4 435.6 "
    />
    <path
      className="adminst0"
      d="M269.9 453.7l-1.4 0.7c-4.2 3.9-0.5 5 10.4 5h86.6c10.9 0 14.9-1.5 10.2-5l-1.4-0.7H269.9z"
    />
    <path
      className="adminst4"
      d="M364.5 446.7c-2.9-1.7-4.9-2.6-11.1-2.6l-63-0.1c-6.2 0-7.8 1-10.7 2.6l-9.8 6.9h104.3L364.5 446.7z"
    />
    <path
      className="adminst5"
      d="M122.9 274.2L122.9 274.2c-0.8-0.3-1.2-1.2-0.9-2l1.3-3.4 2.9 1.1 -1.3 3.4C124.6 274 123.7 274.5 122.9 274.2z"
    />
    <path
      className="adminst5"
      d="M139.2 280.2L139.2 280.2c-0.8-0.3-1.2-1.2-0.9-2 0 0 1.2-3.2 1.3-3.4 0.1-0.2 2.9 1.1 2.9 1.1l-1.3 3.4C140.9 280 140 280.5 139.2 280.2z"
    />
    <path
      className="adminst6"
      d="M122.6 273.5L122.6 273.5c-0.8-0.3-1.2-1.2-0.9-2l1.4-3.8c0.3-0.8 1.2-1.2 2-0.9l0 0c0.8 0.3 1.2 1.2 0.9 2l-1.4 3.8C124.3 273.4 123.4 273.8 122.6 273.5z"
    />
    <path
      className="adminst6"
      d="M138.8 279.5L138.8 279.5c-0.8-0.3-1.2-1.2-0.9-2l1.4-3.8c0.3-0.8 1.2-1.2 2-0.9v0c0.8 0.3 1.2 1.2 0.9 2l-1.4 3.8C140.5 279.3 139.6 279.8 138.8 279.5z"
    />
    <rect
      x="117.2"
      y={311}
      transform="matrix(0.9384 0.3456 -0.3456 0.9384 116.1504 -22.8967)"
      className="adminst7"
      width="10.2"
      height="6.6"
    />
    <rect
      x="121.6"
      y={300}
      transform="matrix(0.9384 0.3456 -0.3456 0.9384 112.6343 -25.0805)"
      className="adminst7"
      width="10.2"
      height="6.6"
    />
    <rect
      x="114.2"
      y="102.3"
      className="adminst8"
      width="424.9"
      height="268.5"
    />
    <rect
      x="130.5"
      y={117}
      className="adminst9"
      width="392.1"
      height="232.6"
    />
    <rect
      x="142.9"
      y="370.9"
      className="adminst3"
      width="63.1"
      height="11.1"
    />
    <rect
      x="446.5"
      y="370.7"
      className="adminst3"
      width="63.1"
      height="11.3"
    />
    <rect
      x="128.3"
      y="116.9"
      className="adminst10"
      width="394.2"
      height="25.3"
    />
    <rect
      x="128.3"
      y="142.2"
      className="adminst11"
      width="394.2"
      height="210.4"
    />
    <rect
      x="138.7"
      y="124.9"
      className="adminst12"
      width="94.1"
      height="9.6"
    />
    <rect
      x="128.3"
      y="142.2"
      className="adminst12"
      width="86.5"
      height="210.4"
    />
    <rect
      x="132.3"
      y="152.8"
      className="adminst13"
      width="12.6"
      height={7}
    />
    <rect
      x="149.5"
      y="152.8"
      className="adminst13"
      width="57.2"
      height={7}
    />
    <rect
      x="132.3"
      y="169.7"
      className="adminst13"
      width="12.6"
      height={7}
    />
    <rect
      x="149.5"
      y="169.7"
      className="adminst13"
      width="50.6"
      height={7}
    />
    <rect
      x="132.3"
      y="187.6"
      className="adminst13"
      width="12.6"
      height={7}
    />
    <rect
      x="149.5"
      y="187.6"
      className="adminst13"
      width="53.2"
      height={7}
    />
    <rect
      x="132.3"
      y="205.5"
      className="adminst13"
      width="12.6"
      height={7}
    />
    <rect
      x="149.5"
      y="205.5"
      className="adminst13"
      width="50.6"
      height={7}
    />
    <rect
      x="132.3"
      y="222.6"
      className="adminst13"
      width="12.6"
      height={7}
    />
    <rect
      x="149.5"
      y="222.6"
      className="adminst13"
      width="38.7"
      height={7}
    />
    <rect
      x="132.3"
      y="239.5"
      className="adminst13"
      width="12.6"
      height={7}
    />
    <rect
      x="149.5"
      y="239.5"
      className="adminst13"
      width="53.2"
      height={7}
    />
    <rect
      x="224.5"
      y="153.4"
      className="adminst12"
      width="288.9"
      height="165.9"
    />
    <path
      className="adminst14"
      d="M513.7 319.5H224.2V153.2h289.4V319.5zM224.7 319.1h288.4V153.5H224.7V319.1z"
    />
    <rect
      x="224.7"
      y="319.7"
      className="adminst11"
      width="288.9"
      height="25.1"
    />
    <path
      className="adminst14"
      d="M513.9 345H224.5v-25.5h289.4V345zM225 344.6h288.4v-24.7H225V344.6z"
    />
    <rect
      x="235.5"
      y="161.1"
      className="adminst15"
      width="75.5"
      height="8.6"
    />
    <rect
      x="469.4"
      y={162}
      className="adminst10"
      width="35.4"
      height="8.6"
    />
    <rect
      x="426.5"
      y="161.8"
      className="adminst10"
      width="35.4"
      height="8.6"
    />
    <rect
      x={385}
      y="161.8"
      className="adminst10"
      width="35.4"
      height="8.6"
    />
    <rect
      x="224.5"
      y="319.2"
      className="adminst16"
      width="288.9"
      height="0.2"
    />
    <rect
      x="224.5"
      y="301.7"
      className="adminst16"
      width="288.9"
      height="0.2"
    />
    <rect
      x="224.5"
      y="283.7"
      className="adminst16"
      width="288.9"
      height="0.2"
    />
    <rect
      x="224.5"
      y="266.2"
      className="adminst16"
      width="288.9"
      height="0.2"
    />
    <rect
      x="224.5"
      y="249.6"
      className="adminst16"
      width="288.9"
      height="0.2"
    />
    <rect
      x="224.5"
      y="232.1"
      className="adminst16"
      width="288.9"
      height="0.2"
    />
    <rect
      x="224.5"
      y="216.5"
      className="adminst16"
      width="288.9"
      height="0.2"
    />
    <rect
      x="224.5"
      y={199}
      className="adminst16"
      width="288.9"
      height="0.2"
    />
    <rect
      x="229.6"
      y="205.2"
      className="adminst13"
      width="61.4"
      height="6.1"
    />
    <rect
      x="331.3"
      y="205.2"
      className="adminst13"
      width="36.9"
      height="6.1"
    />
    <rect
      x="426.6"
      y="205.2"
      className="adminst13"
      width={10}
      height="6.1"
    />
    <rect
      x="229.6"
      y={222}
      className="adminst13"
      width="74.4"
      height="6.1"
    />
    <rect
      x="331.3"
      y={222}
      className="adminst13"
      width="36.9"
      height="6.1"
    />
    <rect x="426.6" y={222} className="adminst13" width={10} height="6.1"/>
    <rect
      x="229.6"
      y="237.9"
      className="adminst13"
      width="52.8"
      height="6.1"
    />
    <rect
      x="331.3"
      y="237.9"
      className="adminst13"
      width="36.9"
      height="6.1"
    />
    <rect
      x="426.6"
      y="237.9"
      className="adminst13"
      width={10}
      height="6.1"
    />
    <rect
      x="229.6"
      y="255.1"
      className="adminst13"
      width="74.4"
      height="6.1"
    />
    <rect
      x="331.3"
      y="255.1"
      className="adminst13"
      width="36.9"
      height="6.1"
    />
    <rect
      x="426.6"
      y="255.1"
      className="adminst13"
      width={10}
      height="6.1"
    />
    <rect
      x="229.6"
      y="271.8"
      className="adminst13"
      width="61.4"
      height="6.1"
    />
    <rect
      x="331.3"
      y="271.8"
      className="adminst13"
      width="36.9"
      height="6.1"
    />
    <rect
      x="426.6"
      y="271.8"
      className="adminst13"
      width={10}
      height="6.1"
    />
    <rect
      x="229.6"
      y="289.6"
      className="adminst13"
      width="69.7"
      height="6.1"
    />
    <rect
      x="331.3"
      y="289.6"
      className="adminst13"
      width="36.9"
      height="6.1"
    />
    <rect
      x="426.6"
      y="289.6"
      className="adminst13"
      width={10}
      height="6.1"
    />
    <rect
      x="229.6"
      y="307.7"
      className="adminst13"
      width="74.4"
      height="6.1"
    />
    <rect
      x="331.3"
      y="307.7"
      className="adminst13"
      width="36.9"
      height="6.1"
    />
    <rect
      x="426.6"
      y="307.7"
      className="adminst13"
      width={10}
      height="6.1"
    />
    <rect
      x="403.1"
      y="205.2"
      className="adminst13"
      width={10}
      height="6.1"
    />
    <rect x="403.1" y={222} className="adminst13" width={10} height="6.1"/>
    <rect
      x="403.1"
      y="237.9"
      className="adminst13"
      width={10}
      height="6.1"
    />
    <rect
      x="403.1"
      y="255.1"
      className="adminst13"
      width={10}
      height="6.1"
    />
    <rect
      x="403.1"
      y="271.8"
      className="adminst13"
      width={10}
      height="6.1"
    />
    <rect
      x="403.1"
      y="289.6"
      className="adminst13"
      width={10}
      height="6.1"
    />
    <rect
      x="403.1"
      y="307.7"
      className="adminst13"
      width={10}
      height="6.1"
    />
    <rect
      x="490.9"
      y="205.2"
      className="adminst10"
      width="13.5"
      height="6.1"
    />
    <rect
      x="467.1"
      y="205.2"
      className="adminst10"
      width="13.5"
      height="6.1"
    />
    <rect
      x="490.9"
      y={222}
      className="adminst10"
      width="13.5"
      height="6.1"
    />
    <rect
      x="467.1"
      y={222}
      className="adminst10"
      width="13.5"
      height="6.1"
    />
    <rect
      x="490.9"
      y="237.9"
      className="adminst10"
      width="13.5"
      height="6.1"
    />
    <rect
      x="467.1"
      y="237.9"
      className="adminst10"
      width="13.5"
      height="6.1"
    />
    <rect
      x="490.9"
      y="255.1"
      className="adminst10"
      width="13.5"
      height="6.1"
    />
    <rect
      x="467.1"
      y="255.1"
      className="adminst10"
      width="13.5"
      height="6.1"
    />
    <rect
      x="490.9"
      y="271.8"
      className="adminst10"
      width="13.5"
      height="6.1"
    />
    <rect
      x="467.1"
      y="271.8"
      className="adminst10"
      width="13.5"
      height="6.1"
    />
    <rect
      x="490.9"
      y="289.6"
      className="adminst10"
      width="13.5"
      height="6.1"
    />
    <rect
      x="467.1"
      y="289.6"
      className="adminst10"
      width="13.5"
      height="6.1"
    />
    <rect
      x="490.9"
      y="307.7"
      className="adminst10"
      width="13.5"
      height="6.1"
    />
    <rect
      x="467.1"
      y="307.7"
      className="adminst10"
      width="13.5"
      height="6.1"
    />
    <circle className="adminst10" cx="349.7" cy="332.5" r={6}/>
    <circle className="adminst12" cx="365.5" cy="332.5" r={6}/>
    <path
      className="adminst14"
      d="M365.5 338.8c-3.5 0-6.3-2.8-6.3-6.3 0-3.5 2.8-6.3 6.3-6.3 3.5 0 6.3 2.8 6.3 6.3C371.8 336 369 338.8 365.5 338.8zM365.5 326.7c-3.2 0-5.8 2.6-5.8 5.8s2.6 5.8 5.8 5.8 5.8-2.6 5.8-5.8S368.7 326.7 365.5 326.7z"
    />
    <circle className="adminst12" cx="380.7" cy="332.5" r={6}/>
    <path
      className="adminst14"
      d="M380.7 338.8c-3.5 0-6.3-2.8-6.3-6.3 0-3.5 2.8-6.3 6.3-6.3 3.5 0 6.3 2.8 6.3 6.3C387 336 384.2 338.8 380.7 338.8zM380.7 326.7c-3.2 0-5.8 2.6-5.8 5.8s2.6 5.8 5.8 5.8 5.8-2.6 5.8-5.8S383.9 326.7 380.7 326.7z"
    />
    <circle className="adminst12" cx="395.6" cy="332.8" r={6}/>
    <path
      className="adminst14"
      d="M395.6 339c-3.5 0-6.3-2.8-6.3-6.3 0-3.5 2.8-6.3 6.3-6.3 3.5 0 6.3 2.8 6.3 6.3C401.9 336.2 399.1 339 395.6 339zM395.6 327c-3.2 0-5.8 2.6-5.8 5.8s2.6 5.8 5.8 5.8 5.8-2.6 5.8-5.8S398.8 327 395.6 327z"
    />
    <path
      className="adminst12"
      d="M363.4 359.2c-0.7 24.6-17.4 43.9-38.4 43.6 -21-0.3-37.4-20.5-36.7-45.1 0.7-24.6 14.1-37.7 35.1-37.4S364.1 334.6 363.4 359.2z"
    />
    <path
      d="M322.3 318c-10.9-0.2-21.3 4.7-29.2 13.5 -7.9 8.8-8.2 14-8.5 26.6 -0.4 12.6 3.5 24.5 10.9 33.5 7.4 9.1 17.5 14.2 28.4 14.4 4.7 0.1 9.1-0.8 13.3-2.4 15.8-6.1 27.2-23.1 27.8-43.9C365.7 333.4 344.2 318.3 322.3 318zM324 400.6c-19.5-0.3-34.8-19.3-34.2-42.4 0.3-11.2 0.1-15.1 7.1-22.9 4-4.5 8.7-7.8 13.8-9.8 3.7-1.4 7.5-2.1 11.4-2.1 9.3 0.1 17.9 4.7 24.1 12.7 6.3 8.1 13.8 12.1 13.4 23.4C359 382.8 343.3 400.8 324 400.6z"/>
    <path
      className="adminst18"
      d="M323.3 371.7c4.1 10.6 1.7 20.3-5.4 21.6 -7.1 1.3-16.1-6.2-20.2-16.8 -4.1-10.6-1.7-20.3 5.4-21.6C310.2 353.6 319.2 361.1 323.3 371.7z"
    />
    <path
      className="adminst12"
      d="M318.4 378.7c1.2 2.9-0.3 5.8-3.4 6.4 -3.1 0.6-6.6-1.2-7.8-4.1 -1.2-2.9 0.3-5.8 3.4-6.4C313.7 374 317.2 375.8 318.4 378.7z"
    />
    <path
      className="adminst12"
      d="M397.1 364c-0.6 20.7-15.8 37.2-33.9 37 -18.1-0.3-32.3-17.2-31.7-37.9 0.6-20.7 13.1-33.1 31.2-32.9C380.8 330.5 397.7 343.3 397.1 364z"
    />
    <path
      d="M361.7 327.8c-9.5-0.1-18.6 4-25.5 11.6 -6.9 7.5-8.2 13.4-8.5 24.1 -0.3 10.7 3.1 20.9 9.5 28.6 6.5 7.8 15.3 12.1 24.8 12.3 4.1 0.1 8.1-0.7 11.9-2.1 13.9-5.4 24.3-20.2 24.8-37.7C399.3 342.2 381.2 328 361.7 327.8zM393.2 364.4c-0.4 15.1-9.2 27.8-21.1 32.4 -3.1 1.2-6.5 1.8-10 1.8 -8-0.1-15.4-3.8-20.9-10.4 -5.6-6.6-8.5-15.4-8.2-24.6 0.4-15.1 6.6-23.7 18.4-28.2 3.1-1.2 6.5-1.8 10-1.8 8 0.1 17.1 3.3 22.6 9.9C389.6 350 393.5 355.1 393.2 364.4z"/>
    <path
      className="adminst18"
      d="M363 375.5c4 8.7 2.1 16.9-4.2 18.4 -6.3 1.4-14.8-4.5-18.8-13.2 -4-8.7-2.1-16.9 4.2-18.4C350.6 360.9 359 366.8 363 375.5z"
    />
    <path
      className="adminst12"
      d="M357.9 380.7c1.1 2.5-0.2 5-2.9 5.6s-5.7-1-6.8-3.6c-1.1-2.5 0.2-5 2.9-5.6C353.8 376.6 356.8 378.2 357.9 380.7z"
    />
    <polygon
      className="adminst18"
      points="266.2 510.1 261.1 510.2 224.6 395.1 269.4 412.3 266.1 415.7 230.8 403.9 "
    />
    <polygon
      className="adminst18"
      points="249.6 546.7 247.5 555 197.6 396.7 273.6 426.7 269.2 430.4 204.6 404.4 "
    />
    <polygon
      className="adminst18"
      points="305.3 568.7 226.5 447 292.8 452.3 294.8 457.1 237.3 452.8 312.2 568.5 "
    />
    <polyline
      className="adminst18"
      points="319.1 413.8 321.8 489.2 316.1 488.5 311.9 409 "
    />
    <path
      className="adminst18"
      d="M315.8 487.8c0 0-6.6-11.3-13.5-3.9 -6.9 7.4-2.6 17.3-2.6 17.3s2.3 3.1 10.1 3.3c7.8 0.2 9.6-0.2 11-2.6 1.4-2.4 1-13.3 1-13.3L315.8 487.8z"
    />
    <path
      className="adminst18"
      d="M247.6 554c2 3-13.8-15.7-23-7.2 -11.2 10.3-4.3 24.1-4.3 24.1s3.8 3.3 16.4 3.1c16.5-0.3 15.2-4.6 16.2-8.8 1.8-7.1-4.5-21.9-4.5-21.9L247.6 554z"
    />
    <path
      className="adminst18"
      d="M261.1 507.8c0 0-3.2-10.5-10.6-3.7 -4.4 4.1-4.6 9-4 12.3 0.5 2.6 2.5 4.7 5.1 5.3 1.6 0.3 3.9 0.7 6.9 0.5 10.9-0.7 9.3-4.1 9.3-5.7 0-9.2-3.5-14.8-3.5-14.8L261.1 507.8z"
    />
    <path
      className="adminst18"
      d="M305.2 567.9c0 0-9.9-16.4-21.3-6.1 -11.4 10.3-2.7 23.2-2.7 23.2s3.9 4 16.8 3.8c16.9-0.3 18.2-8.9 16.9-13.2 -4.5-14.8-7.1-8-7-8.3L305.2 567.9z"
    />
    <polygon
      className="adminst18"
      points="415 507.4 421 507.3 438 402.1 369 440.3 370.6 449.1 430.4 412.9 "
    />
    <polygon
      className="adminst18"
      points="413.8 541.9 419 547.3 447.3 469.9 366.9 450.3 361.6 457.7 437.8 474.4 "
    />
    <polygon
      className="adminst18"
      points="344.6 569.8 355.3 483.5 321.2 458.1 319.4 464.8 348.4 488.8 338.6 569.8 "
    />
    <polyline
      className="adminst18"
      points="358.5 418.8 358.6 491.3 364.3 493.4 365.6 413.7 "
    />
    <path
      className="adminst18"
      d="M364.6 492.6c0 0 5.3-11.5 12.4-4.4s3.3 17.2 3.3 17.2 -2.2 3.2-10 3.6 -9.6 0.2-11.1-2.2c-1.5-2.4-0.2-20.2-0.2-20.2L364.6 492.6z"
    />
    <path
      className="adminst18"
      d="M419.7 546.3c0 0 9.3-18.8 20.9-8.9 6.5 5.6 7.3 12.5 6.8 17.5 -0.5 4.5-3.8 8.2-8.2 9.2 -2.4 0.5-5.6 1-9.7 1 -16.5 0.3-16.2-5.8-17.5-10 -2.1-7.1 2.2-14.2 2.2-14.2L419.7 546.3z"
    />
    <path
      className="adminst18"
      d="M420.9 505.8c0 0 5.4-13.4 13.1-6.8 4.3 3.7 4.9 8.3 4.5 11.6 -0.3 3-2.5 5.4-5.4 6.1 -1.6 0.4-3.7 0.6-6.4 0.7 -10.9 0.2-11.4-2.5-12.3-5.3 -1.4-4.7 3-16.7 3-16.7L420.9 505.8z"
    />
    <path
      className="adminst18"
      d="M345.5 564.5c0 0 8.4-15.9 20.2-6 11.8 9.9 5.3 23.9 5.3 23.9s-3.7 4.2-16.7 4.4c-16.9 0.3-17.9-8.1-17.4-12.5 2.4-18.5 5.6-14 5.6-14L345.5 564.5z"
    />
    <path
      className="adminst35"
      d="M366.6 345.4c41.6 30.2 40 53.4 13 90.6 -21.3 29.3-55.4 38.7-89.1 14.2s-29.3-55.3-8-84.7C303.9 336.2 332.9 320.9 366.6 345.4z"
    />
    <path
      className="adminst18"
      d="M381.9 438.8c-11.3 15.5-25.7 25.3-41.7 28.4 -17.1 3.3-35.1-1.5-52-13.8 -31.6-22.9-34.7-53.7-9-89.2 26-35.9 57.5-43.2 88.6-20.6 16.8 12.2 31.8 27.3 33.7 45.2C403.3 405.1 393.1 423.4 381.9 438.8zM284.9 368.3c-23.7 32.6-21.4 59.6 7 80.2 30.1 21.9 62.5 16.6 84.5-13.8 28-38.6 25.4-58.9-12-86.1C329 323 301.6 345.2 284.9 368.3z"
    />
    <rect
      x="314.7"
      y="426.8"
      transform="matrix(-0.5582 0.8297 -0.8297 -0.5582 854.7977 417.378)"
      className="adminst56"
      width="3.2"
      height={19}
    />
    <rect
      x="314.7"
      y="426.8"
      transform="matrix(0.3593 0.9332 -0.9332 0.3593 609.7914 -15.6263)"
      className="adminst56"
      width="3.2"
      height={19}
    />
  </svg>
);


const Logo = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="198.000000pt" 
    height="120.000000pt" 
    viewBox="0 0 198.000000 120.000000"
    preserveAspectRatio="xMidYMid meet"
  >
	<g transform="translate(0.000000,120.000000) scale(0.100000,-0.100000)"
	fill="#000000" stroke="none">
		<path d="M1289 849 c-71 -56 -493 -66 -611 -14 -16 6 -18 1 -18 -48 0 -81 2
		-82 204 -82 292 0 466 51 466 137 0 33 -6 34 -41 7z"/>
		<path d="M161 438 c-5 -13 -17 -49 -27 -80 -10 -32 -20 -58 -23 -58 -3 0 -16
		34 -29 75 -21 71 -24 75 -52 75 l-29 0 42 -122 c38 -112 44 -123 66 -123 21 0
		28 10 51 80 17 47 30 74 34 65 3 -8 16 -44 28 -80 20 -56 27 -65 47 -65 22 0
		28 11 63 115 21 63 38 118 38 123 0 5 -12 7 -26 5 -23 -3 -29 -11 -44 -60 -31
		-100 -30 -100 -59 -13 -22 64 -32 81 -49 83 -15 2 -25 -4 -31 -20z"/>
		<path d="M420 325 l0 -125 24 0 c23 0 25 4 28 53 l3 52 47 3 47 3 3 -53 c3
		-49 5 -53 28 -53 l25 0 3 123 3 122 -31 0 c-29 0 -30 -2 -30 -45 l0 -45 -50 0
		-50 0 0 45 c0 41 -2 45 -25 45 l-25 0 0 -125z"/>
		<path d="M692 328 l3 -123 25 0 25 0 3 123 3 122 -31 0 -31 0 3 -122z"/>
		<path d="M790 425 c0 -22 4 -25 40 -25 l40 0 0 -100 0 -100 25 0 c25 0 25 0
		25 99 l0 100 38 3 c30 2 38 7 40 26 3 22 2 22 -102 22 l-106 0 0 -25z"/>
		<path d="M1040 325 l0 -126 93 3 c86 3 92 4 95 25 3 21 -1 22 -65 25 -65 3
		-68 4 -68 28 0 23 4 25 58 28 53 3 57 5 57 27 0 24 -3 25 -61 25 -57 0 -60 1
		-57 23 3 20 9 22 71 25 59 3 67 5 67 22 0 18 -7 20 -95 20 l-95 0 0 -125z"/>
		<path d="M1280 330 c0 -100 3 -120 15 -120 12 0 15 13 15 55 l0 55 75 0 75 0
		0 -55 c0 -30 5 -55 10 -55 6 0 10 47 10 120 0 69 -4 120 -9 120 -6 0 -11 -24
		-13 -52 l-3 -53 -72 -3 -73 -3 0 56 c0 42 -3 55 -15 55 -12 0 -15 -20 -15
		-120z"/>
		<path d="M1595 343 c-61 -140 -59 -133 -46 -133 6 0 17 14 26 30 15 29 18 30
		84 30 67 0 69 -1 81 -30 7 -17 18 -30 26 -30 10 0 10 7 -2 36 -49 118 -94 204
		-107 204 -8 0 -33 -44 -62 -107z m91 22 c13 -31 24 -60 24 -65 0 -10 -93 -14
		-102 -4 -6 5 41 124 49 124 2 0 15 -25 29 -55z"/>
		<path d="M1790 440 c0 -5 18 -10 40 -10 l40 0 0 -110 c0 -67 4 -110 10 -110 6
		0 10 43 10 110 l0 110 45 0 c25 0 45 5 45 10 0 6 -38 10 -95 10 -57 0 -95 -4
		-95 -10z"/>
		<path d="M620 120 c-26 -26 -26 -74 0 -100 36 -36 100 -19 100 25 0 22 -4 25
		-32 24 -24 -1 -27 -3 -10 -6 28 -5 30 -39 2 -48 -47 -15 -83 38 -55 81 14 21
		23 25 51 22 35 -4 46 5 18 16 -29 11 -54 6 -74 -14z"/>
		<path d="M797 127 c-3 -6 -17 -38 -31 -70 -14 -31 -22 -57 -17 -57 6 0 13 9
		16 20 9 30 70 28 86 -2 24 -45 19 0 -6 55 -28 61 -40 74 -48 54z m28 -47 l16
		-30 -31 0 c-16 0 -30 2 -30 5 0 7 23 55 26 55 2 0 10 -13 19 -30z"/>
		<path d="M907 133 c-11 -10 -8 -133 3 -133 6 0 10 24 10 53 l0 52 19 -28 c10
		-16 22 -29 26 -29 4 0 16 13 26 29 l19 28 0 -47 c0 -26 5 -50 10 -53 6 -4 10
		21 10 67 l-1 73 -33 -39 -33 -39 -25 37 c-14 20 -28 33 -31 29z"/>
		<path d="M1073 70 c0 -41 2 -58 4 -38 2 21 2 55 0 76 -2 20 -4 3 -4 -38z"/>
		<path d="M1221 90 l-2 -55 -40 48 c-23 26 -45 47 -50 47 -5 0 -9 -29 -9 -65 0
		-77 18 -88 22 -13 l3 53 40 -55 40 -55 3 38 c2 20 1 54 -1 75 -3 29 -4 26 -6
		-18z"/>
		<path d="M1289 119 c-30 -30 -23 -88 13 -108 38 -22 82 -5 86 32 3 25 1 27
		-30 26 -23 -1 -26 -3 -10 -6 28 -5 30 -39 2 -48 -45 -14 -84 40 -60 85 10 19
		18 22 51 17 39 -5 53 5 23 17 -29 11 -54 6 -75 -15z"/>
	</g>
  </svg>
);

const Sto = () => (
  <svg
    width={25}
    height={25}
    viewBox="0 0 120 120"
  >
    <style jsx>
      {`
                .stost0 {
                    fill: #bcbbbb;
                }
                .stost1 {
                    fill: #f48023;
                }
            `}
    </style>
    <polygon
      className="stost0"
      points="84.4,93.8 84.4,70.6 92.1,70.6 92.1,101.5 22.6,101.5 22.6,70.6 30.3,70.6 30.3,93.8 "
    />
    <path
      className="stost1"
      d="M38.8,68.4l37.8,7.9l1.6-7.6l-37.8-7.9L38.8,68.4z M43.8,50.4l35,16.3l3.2-7l-35-16.4L43.8,50.4z M53.5,33.2 l29.7,24.7l4.9-5.9L58.4,27.3L53.5,33.2z M72.7,14.9l-6.2,4.6l23,31l6.2-4.6L72.7,14.9z M38,86h38.6v-7.7H38V86z"
    />
  </svg>
);

