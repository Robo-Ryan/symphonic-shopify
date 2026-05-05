/**
 * ~~~ ANIMATE LETTERS JS ~~~
 *
 * Script for wrap letters of a text with a <span> tag
 * and add or remove CSS classes from thoses spans tags.
 *
 * Copyright: Raphaël Castello, 2023
 * Web/contact: www.sns.pm
 * License: GNU AGPL (open source)
 * Script: animate_letters.js
 * Version: 0.1.0
 *
 */


/**
 *
 * 1 - Define options :
 *
 * var LTR_options = {
 *
 *			 // add class(es) list 'class_1 class_2' or ''
 *			 prepare : 'letters_in_top',
 *			 // classes to add by phases
 *			 // set : []  |  ['class_a']  |  ['class_a','class_b']
 *			 add : [
 *				 // phase 1
 *				 [],
 *				 // phase 2
 *				 ['rotate_letters', 'space_letters'],
 *				 // phase 3 ...
 *				 []
 *			 ],
 *			 // classes to remove by phases arrays of classes
 *			 // set : []  |  ['class_a']  |  ['class_a','class_b']
 *			 remove : [
 *				 // phase 1
 *				 ['letters_in_top'],
 *				 // phase 2
 *				 [],
 *				 // phase 3 ...
 *				 ['space_letters']
 *			 ],
 *			 // timers by phases -> array of objects
 *			 // set : { increment_delay : [integer in milliseconds] }
 *			 timers : [
 *				 { increment_delay : 100 },
 *				 { increment_delay : 80 },
 *				 { increment_delay : 50 }
 *			 ],
 *			 // remove spans who wrapped letters at the end of last phase
 *			 // set : true / false
 *			 clean_after : true,
 *			 // function to launch at the end of the last phase
 *			 // set : your_function() or null
 *			 end_callBack : function(){
 *
 *					 document.querySelector('.title_to_animate')
 *					 .classList.add('callback_anim');
 *			 }
 *
 *	 };
 *
 *
 * 2 - Use :
 *
 *  // initialize animate_letters
 *  var letters = animate_letters( 'h1#my_title', LTR_options );
 *  // run animate_letters
 *  letters.run();
 *
 */

function multiline_animate_letters(selector) {

  var element = document.querySelector(selector);
  // Get plain text from the element
  var text = element.innerHTML
    // Replace all whitespace (newlines, tabs and space) with a single space
	.replace(/(<br>)/gm, 'ø')
    .replace(/\s+/gm, " ")
    // Remove leading and trailing whitespace
    .trim();

	text = text.replace(" ø ø ", 'øø ');

	//console.log('text', text);

  // Split text into words
  var words = text.split(" ");

  // Wrap all words in spans
  var spans = words.map((word) => {
    // Adding inline-block to make sure single word doesn't break into multiple lines
    // For example: short-term, full-scale
		return `<span style="display: inline-block;">${word}</span>`;
	
  });

  //console.log('spans', spans);

  // Replace initial element content with our spans.
  // It is a simple way to preserve the original styling,
  // without creating a new element.
  element.innerHTML = spans.join(" ");

  var lines = [];
  // Curren't line top offset.
  // We still haven't started, so it is null for now.
  var previousTop = null;
  // Array of words
  var currentLine = [];

  // Loop through newly created spans
  element.querySelectorAll("span").forEach((wordSpan, index) => {
    // Get position of each span
    var wordRect = wordSpan.getBoundingClientRect();

	//console.log( wordSpan);

    // It span's top is different than previous top,
    // it means the current word fell in the next line.
    // Skip this check for the first line, as previousTop's
    // initial value is null.
    if ((previousTop !== wordRect.top && index > 0) || wordSpan.innerText.indexOf('øø') !== -1) {
      // Finish the current line
      lines.push(currentLine);
      // And start a new one
      currentLine = [words[index]];
    } else {
      // We are still in the current line, add a word to it
      currentLine.push(words[index]);
    }

    // Update previousTop value
    previousTop = wordRect.top;
  });

  // Push whatever words are left as the last line
  lines.push(currentLine);

  var markup = '';
  lines.forEach(function(value) {
	//console.log(value);

	value.forEach(function(v) {
		markup += v + ' ';
	});
	markup += 'ø';
  });

  element.innerHTML = markup;
  element.classList.add('text_to_animate');

  element.classList.add('animate');

  //console.log('markup', markup);


  // set animate_letters() options
var Animate_letters_options = {

  // add class(es) list 'class_1 class_2' or ''
  prepare : 'letters_in_top',
  // classes to add by phases
  // set : []  |  ['class_a']  |  ['class_a','class_b']
  add : [
	// phase 1
	[],
	// phase 2
	[],
	// phase 3
	[],
	// phase 4
	[]
  ],
  // classes to remove by phases arrays of classes
  // set : []  |  ['class_a']  |  ['class_a','class_b']
  remove : [
	// phase 1
	['letters_in_top'],
	// phase 2
	[],
	// phase 3
	[],
	// phase 4
	[]
  ],
  // timers by phases -> array of objects
  // set : { delay : [integer in milliseconds],
  //  			 increment_delay : [integer in milliseconds]  }
  timers : [
	{ delay : 0, increment_delay : 10 },  // phase 1
	{ delay : 100, increment_delay : 40 },  // phase 2
	{ delay : 80, increment_delay : 30 },  // phase 3
	{ delay : 0, increment_delay : 20 }   // phase 4
  ],
  // remove spans who wrapped letters at the end of last phase
  // set : true / false
  clean_after : true,
  // function to launch at the end of the last phase
  // set : your_function() or null
  end_callBack : function(){

	// sibling text container
	var container_text = document.querySelector('.text_to_animate');

	// add a class
	container_text.classList.add('callback_anim');

	// remove after n seconds
	var Timer = setTimeout(()=>{

		container_text.classList.remove('callback_anim');

		clearTimeout( Timer );

	}, 800 );
  }

};
// end animate_letters() options

  var letters = animate_letters(selector, Animate_letters_options);

  letters.run();

  //return lines;
}
	/**
	 * animate_letters( element, options )
	 * @param  {string}		element		html element
	 * @param  {array}		options 	Object -> array of classes
	 * @return {instance}
	 */
	var animate_letters = ( element, options ) => {

			// errors - stop on error
			this.error = false;

			// error - element not found
			if( !document.body.contains(document.querySelector(element)) ){

					console.error( `Animate letters : Element `+element+` is not defined, check please ...`);

					// set error to true
					this.error = true;
			}

			// error - no options found
			if( !options
			|| options.add === undefined
			|| options.remove === undefined ){

					console.error( `Animate letters : Please, provide an object of options`);

					// set error to true
					this.error = true;
			}

			// error - no same phases numbers
			if( options.add.length != options.remove.length ){

					console.error( `Animate letters : Please, provide the same number of arrays for adding and removing phases`);

					// set error to true
					this.error = true;
			}
			// end errors



			/**
			 * this.prepare();
			 * @return {html}	wrap text element with spans
			 */
			this.prepare = () => {


					// get the text
					var text =
						document.querySelector(element).innerHTML;
					var regx_1 = /(<br>)/gm;
					var regx_2 = /(&amp;)/gm;
					text = text.replaceAll('øø', '~');
					//text = text.replaceAll('ø ø', '~');
					text = text.replaceAll(regx_1, 'ø');
					text = text.replaceAll(regx_2, '& ');
					// console.log( text );

					// make an array from text
					var Text = text.trim().split('');

					// new html with spans to insert
					var new_html = '<div>';

					// loop Text array for set good html wanted
					Text.forEach((item, i) => {

							if( item == 'ø' ){

									// re-insert <br> tags -> no wrap
									//new_html += '<br>';
									new_html += '</div><div>'
							}
							else if( item == '~' ){

								// just add space -> no wrap
								new_html += '</div><div style="padding-bottom: 1em;"></div><div>';
							}
							else if( item == ' ' ){

									// just add space -> no wrap
									new_html += item;
							}
							else{

								// if need to add classes
								if( options.prepare.length != 0 ){

										// wrap with spans and classes
										new_html+= `<span class="`+options.prepare+`">`+item+`</span>`;
								}
								else{

										// just wrap with spans
										new_html+= `<span>`+item+`</span>`;
								}

							}
							// end else -> to wrap

					});
					new_html += '</div>';
					// END loop Text


					// insert new html with spans
					document.querySelector(element).innerHTML = new_html;

			}
			/**
			 * end prepare()
			 * @return {html}	wrap text element with spans
			 */


			// array of letters wrapped with spans
			this.Letters = [];

			// index for sibling phases
			this.Indx = 0;


			/**
			 * this.run();
			 * @return {void}	add or remove classes from spans
			 */
			this.run = () => {

				//console.log('run');
					// on error - return
					if( this.error ){
						return;
					}


					// base delay - fire first letter without delay
					this.delay_time = 0;

					// set increment delay for ech phases - default : 100
					// manage increment_delay not setted
					if( options.timers[this.Indx] === undefined ){

							// set an increment_delay value by default
							this.increment_delay = 100;

							// throw a message
							console.info(`Animate letters : No value found for the timer of this phase, the default value was used`);
					}
					else{

							// set increment_delay
							this.increment_delay = options.timers[this.Indx].increment_delay;
					}


					// sibling letters wrapped with spans - array
					this.Letters =
						document.querySelectorAll( ''+element+' span' );


					// array of setTimeout() -> for destroy them later
					var Lambda = [];


					// apply style to each letters with a delay
					this.Letters.forEach((item, i) => {

							// timeout
							Lambda[i] = setTimeout(function(){


									// clear timeout
									clearTimeout( Lambda[i] );


									// add or remove classes
									if( options.add[this.Indx].length != 0 ){

											// add classes
											item.classList.add(...options.add[this.Indx]);

									}
									if( options.remove[this.Indx].length != 0 ){

											// remove classes
											item.classList.remove(...options.remove[this.Indx]);
									}

									// if last index
									if( i == this.Letters.length-1  ){

											// increment phase index
											this.Indx++;

											// finish - chain | callback_function() | end
											this.end();
									}
									// end last index

							}, this.delay_time );
							// end timeout

							// add delay to timer
							this.delay_time += this.increment_delay;

					});
					// end loop Letters

			}
			/**
			 * end this.run();
			 */



			/**
			 * this.end();
			 * @return {void}	listen for transitionend
			 * and animationend events -> clean at the end of events
			 * -> if it's asked ( options.clean_after = true )
			 * else : keep text of the element wrapped by <span> tags
			 * Note : this.Letters = all <span> tags of the element
			 */
			this.end = () => {


					// chain
					if( this.Indx <= options.add.length-1 ){

							// re-run function
							this.run();

							return;
					}

					// watch for the end of the animation
					// or transition of the last letter
					var last_index = this.Letters.length-1;

					// put an event on transition end
					this.Letters[last_index].ontransitionend = () => {

							// console.log('End of last transition');

							// callback
							if( typeof options.end_callBack === 'function' ){

									// launch callback function
									options.end_callBack();
							}

							// remove spans after last transition end
							this.remove_spans();

					}
					// end make something on transition end


					// event listener animationend
					this.Letters[last_index].onanimationend = () => {

							// console.log('End of last animation');

							// callback
							if( typeof options.end_callBack === 'function' ){

									// launch callback function
									options.end_callBack();
							}

							// remove spans after last animation end
							this.remove_spans();

					}
					// end event listener animationend

			}
			/**
			 * end this.end()
			 */



			/**
			 * this.remove_spans();
			 * un-wrap letters if options.clean_after = true
			 */
			this.remove_spans = () => {


					// no clean spans if clean after = false
					if( options.clean_after == false ){
							return;
					}

					this.Letters.forEach((item, i) => {

							// un-wrap spans
							item.replaceWith( ...item.innerText );
					});

			}
			/**
			 * this.remove_spans();
			 */



			// prepare letters - wrap all letters by a span tag
			// + add a first class if it's needed
			this.prepare();


			// return instance
			return this;


	}
	/**
	 * END animate_letters( element, options )
	 * @param  {string}		element		html element
	 * @param  {array}		options 	Object -> array of classes
	 * @return {instance}
	 */
