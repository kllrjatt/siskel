var Movie = Backbone.Model.extend({

  defaults: {
    like: true
  },

  toggleLike: function () {
    // use this.set to set the new value 
    // toggle changes the current value of like to the opposite 
    // use this.get to get the value of like 
    // use ! to reverse the value 
    this.set('like', !this.get('like'));
  }

});

var Movies = Backbone.Collection.extend({

  model: Movie,

  initialize: function () {
    // list to event change 
    // when there is a change on like 
    // use collection sort from backbone 
    // pass in context to what you want to change 
    this.on('change:like', this.sort, this);
  },

  comparator: 'title',

  sortByField: function (field) {
    // your code here
  }

});

var AppView = Backbone.View.extend({

  events: {
    'click form input': 'handleClick'
  },

  handleClick: function (e) {
    var field = $(e.target).val();
    this.collection.sortByField(field);
  },

  render: function () {
    new MoviesView({
      el: this.$('#movies'),
      collection: this.collection
    }).render();
  }

});

var MovieView = Backbone.View.extend({

  template: _.template('<div class="movie"> \
                          <div class="like"> \
                            <button><img src="images/<%- like ? \'up\' : \'down\' %>.jpg"></button> \
                          </div> \
                          <span class="title"><%- title %></span> \
                          <span class="year">(<%- year %>)</span> \
                          <div class="rating">Fan rating: <%- rating %> of 10</div> \
                        </div>'),

  initialize: function () {
    // your code here
  },

  events: {
    'click button': 'handleClick'
  },

  handleClick: function () {
    // your code here
  },

  render: function () {
    this.$el.html(this.template(this.model.attributes));
    return this.$el;
  }

});

var MoviesView = Backbone.View.extend({

  initialize: function () {
    // your code here
  },

  render: function () {
    this.$el.empty();
    this.collection.forEach(this.renderMovie, this);
  },

  renderMovie: function (movie) {
    var movieView = new MovieView({ model: movie });
    this.$el.append(movieView.render());
  }

});
