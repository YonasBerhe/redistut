var redis = require('redis');
var client = redis.createClient(); //creates a new client

// Redis will by default only use 127.0.0.1 as
//the hosting provider and 6379 as host

// line below will modify default port and host
// var client = redis.createClient(127.0.0.1, 4812);

client.on('connect', function() {
  console.log('we have connected!!');
});

client.set('framework', 'Angular', function (err, reply) {
  console.log(reply);
});

/*
client.get('framework'); will allow us to refer to the keys
value (angular) and log if we have a trouble time getting its
value.
*/


client.get('framework', function (err, reply) {
  console.log(reply);
});

/*
nested option of hmset

client.hmset ('frameworks', {
'javascript' : 'AngularJS',
'CSS' : 'bootstrap'
});
*/

/*
client.hmset === client.HMSET;
*/

client.hmset('frameworks', 'javascript', 'AngularJS', 'css', 'Bootstrap','node','Express', 'lang', 'PHP');
// client.hgetall('framework', function(err, object) {
//   console.log(object);
// });

client.hgetall('frameworks', function(err, object) {
    console.log(object);
});

client.rpush(['frameworks', 'angularjs', 'backbone'], function(err, reply) {
    console.log(reply); //prints 2
});
client.lrange('frameworks', 0, -1, function(err, reply) {
    console.log(reply); // ['angularjs', 'backbone']
});
client.sadd(['tags', 'angularjs', 'backbonejs', 'emberjs'], function(err, reply) {
    console.log(reply); // 3
});
// list items of tags tags
client.smembers('tags', function(err, reply){
  console.log(reply);
});
// Check if a key exsists
client.exists('tags', function(err, reply) {
    if (reply === 1) {
        console.log('exists');
    } else {
        console.log('doesn\'t exist');
    }
});

client.del('frameworks', function(err,reply) {
  console.log(reply)
});

/*

The incr() function increments a key value by 1. If you need to increment by a different amount, you can use incrby() function. Similarly, to decrement a key you can use the functions like decr() and decrby().
*/

client.set('key1', 10, function () {
  client.incr('key1', function(err, reply) {
    console.log(reply);
  });
});
