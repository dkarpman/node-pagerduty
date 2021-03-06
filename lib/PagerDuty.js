(function() {
  var PagerDuty, request;
  var __hasProp = Object.prototype.hasOwnProperty, __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor; child.__super__ = parent.prototype; return child; };

  request = require('request');

  PagerDuty = (function() {

    module.exports = PagerDuty;

    function PagerDuty(_arg) {
      this.serviceKey = _arg.serviceKey;
      if (this.serviceKey == null) {
        throw new Error('PagerDuty.constructor: Need serviceKey!');
      }
    }

    PagerDuty.prototype.create = function(_arg) {
      var callback, description, details, incidentKey;
      description = _arg.description, incidentKey = _arg.incidentKey, details = _arg.details, callback = _arg.callback;
      if (description == null) {
        throw new Error('PagerDuty.create: Need description!');
      }
      return this._request(__extends(arguments[0], {
        eventType: 'trigger'
      }));
    };

    PagerDuty.prototype.acknowledge = function(_arg) {
      var callback, description, details, incidentKey;
      incidentKey = _arg.incidentKey, details = _arg.details, description = _arg.description, callback = _arg.callback;
      if (incidentKey == null) {
        throw new Error('PagerDuty.acknowledge: Need incidentKey!');
      }
      return this._request(__extends(arguments[0], {
        eventType: 'acknowledge'
      }));
    };

    PagerDuty.prototype.resolve = function(_arg) {
      var callback, description, details, incidentKey;
      incidentKey = _arg.incidentKey, details = _arg.details, description = _arg.description, callback = _arg.callback;
      if (incidentKey == null) {
        throw new Eror('PagerDuty.resolve: Need incidentKey!');
      }
      return this._request(__extends(arguments[0], {
        eventType: 'resolve'
      }));
    };

    PagerDuty.prototype._request = function(_arg) {
      var callback, description, details, eventType, incidentKey, json;
      description = _arg.description, incidentKey = _arg.incidentKey, eventType = _arg.eventType, details = _arg.details, callback = _arg.callback;
      if (eventType == null) throw new Eror('PagerDuty._request: Need eventType!');
      incidentKey || (incidentKey = null);
      details || (details = {});
      callback || (callback = function() {});
      json = {
        service_key: this.serviceKey,
        event_type: eventType,
        description: description,
        details: details
      };
      if (incidentKey != null) json.incident_key = incidentKey;
      return request({
        method: 'POST',
        uri: 'https://events.pagerduty.com/generic/2010-04-15/create_event.json',
        json: json
      }, function(err, response, body) {
        if(err) return callback(err);
        if(response.statusCode !== 200) {
          if(body.hasOwnProperty('errors')) {
            return callback(new Error(body.errors[0]));
          }
          return callback(new Error("Status code " + response.statusCode + " from request to PagerDuty API. Body: " + JSON.stringify(body)));
        }
        return callback(null, body);
      });
    };

    return PagerDuty;

  })();

}).call(this);
