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
    //reassing the value of comparator to field 
    this.comparator = field;
    //invoke this.sort to sort the collection 
    this.sort();
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
    // on change , render the view using the template 
    // use this as context 
    this.model.on('change', this.render, this);
  },

  events: {
    'click button': 'handleClick'
  },

  handleClick: function () {
    // on click togle like 
    // use this.model to access the function. 
    this.model.toggleLike();
  },

  render: function () {
    this.$el.html(this.template(this.model.attributes));
    return this.$el;
  }

});

var MoviesView = Backbone.View.extend({

  initialize: function () {
    // sort the collection 
    // render the sorted collection 
    // context of movie view 
    this.collection.on('sort', this.render, this);
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
