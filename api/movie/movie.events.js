/**
 * Movie model events
 */

'use strict';

import {EventEmitter} from 'events';
import Movie from './movie.model';
var MovieEvents = new EventEmitter();

// Set max event listeners (0 == unlimited)
MovieEvents.setMaxListeners(0);

// Model events
var events = {
  save: 'save',
  remove: 'remove'
};

// Register the event emitter to the model events
for(var e in events) {
  let event = events[e];
  Movie.schema.post(e, emitEvent(event));
}

function emitEvent(event) {
  return function(doc) {
    MovieEvents.emit(event + ':' + doc._id, doc);
    MovieEvents.emit(event, doc);
  };
}

export default MovieEvents;
