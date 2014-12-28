var Db = require('mongodb').Db;
var Connection = require('mongodb').Connection;
var Server = require('mongodb').Server;
var BSON = require('mongodb').BSON;
var ObjectID = require('mongodb').ObjectID;

SubscriberProvider = function() {
  var _parent = this;
  this.db = new Db(
      process.env.MONGOHQ_DB,
      new Server(
          process.env.MONGOHQ_HOST,
          process.env.MONGOHQ_PORT,
          {auto_reconnect: true},
          {}), {safe: false});

  //open the db connection and then authenticate
  if (process.env.MONGOHQ_USER == '') {
    this.db.open(function() {});
  } else {
    this.db.open(function(err) {
        _parent.db.authenticate(
          process.env.MONGOHQ_USER,
          process.env.MONGOHQ_PASSWORD,
          function(err) {
                if (err) {
                   console.log(err);
                }
            }
        );
    });
  }
};


SubscriberProvider.prototype.getCollection= function(callback) {
  this.db.collection('subscribers', function(error, subscriber_collection) {
    if( error ) callback(error);
    else callback(null, subscriber_collection);
  });
};

SubscriberProvider.prototype.getRecordingCollection= function(callback) {
  this.db.collection('recordings', function(error, recording_collection) {
    if( error ) callback(error);
    else callback(null, recording_collection);
  });
};

//find all subscribers
SubscriberProvider.prototype.findAll = function(callback) {
    this.getCollection(function(error, subscriber_collection) {
      if( error ) callback(error)
      else {
        subscriber_collection.find().toArray(function(error, results) {
          if( error ) callback(error)
          else callback(null, results)
        });
      }
    });
};

//find an subscriber by ID
SubscriberProvider.prototype.findById = function(id, callback) {
    this.getCollection(function(error, subscriber_collection) {
      if( error ) callback(error)
      else {
        subscriber_collection.findOne({_id: subscriber_collection.db.bson_serializer.ObjectID.createFromHexString(id)}, function(error, result) {
          if( error ) callback(error)
          else callback(null, result)
        });
      }
    });
};


//save new subscriber
SubscriberProvider.prototype.saveRecording = function(recordings, callback) {
    this.getRecordingCollection(function(error, recording_collection) {
      if( error ) callback(error)
      else {
        if( typeof(recordings.length)=="undefined")
          recordings = [recordings];

        for( var i =0;i< recordings.length;i++ ) {
          recording = recordings[i];
          recording.created_at = new Date();
        }

        recording_collection.insert(recordings, function() {
          callback(null, recordings);
        });
      }
    });
};

//save new subscriber
SubscriberProvider.prototype.save = function(subscribers, callback) {
    this.getCollection(function(error, subscriber_collection) {
      if( error ) callback(error)
      else {
        if( typeof(subscribers.length)=="undefined")
          subscribers = [subscribers];

        for( var i =0;i< subscribers.length;i++ ) {
          subscriber = subscribers[i];
          subscriber.created_at = new Date();
        }

        subscriber_collection.insert(subscribers, function() {
          callback(null, subscribers);
        });
      }
    });
};

// update an subscriber
SubscriberProvider.prototype.update = function(subscriberId, subscribers, callback) {
    this.getCollection(function(error, subscriber_collection) {
      if( error ) callback(error);
      else {
        subscriber_collection.update(
					{_id: subscriber_collection.db.bson_serializer.ObjectID.createFromHexString(subscriberId)},
					subscribers,
					function(error, subscribers) {
						if(error) callback(error);
						else callback(null, subscribers)
					});
      }
    });
};

//delete subscriber
SubscriberProvider.prototype.delete = function(subscriberId, callback) {
	this.getCollection(function(error, subscriber_collection) {
		if(error) callback(error);
		else {
			subscriber_collection.remove(
				{_id: subscriber_collection.db.bson_serializer.ObjectID.createFromHexString(subscriberId)},
				function(error, subscriber){
					if(error) callback(error);
					else callback(null, subscriber)
				});
			}
	});
};

exports.SubscriberProvider = SubscriberProvider;
