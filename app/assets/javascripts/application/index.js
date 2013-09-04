$(function(){
  var dave_the_oven = new Oven("Dave", 3)

  $('#new_batch').on('submit', function(event){
    event.preventDefault()
    prep_batch(dave_the_oven)
    $(this).find("input[type=text], input[type=number]").val("");
  })

  $('#bake').click(function(){
    dave_the_oven.bake()
  })

  $('td').click(function(){
    console.log("Anything")
    var rack_id = ("#" + this.id)
    $.each(dave_the_oven.racks, function(i, rack){
      if(rack.getter === rack_id){
        to_displaycase(rack.batch)
        rack.set_batch(null)
      }
      update_screen(dave_the_oven.racks)
    })
  })
})

function prep_batch(oven) {
  var batch = new Batch($('input[name=batch_type]').val(),
                        $('input[name=bake_time]').val())

  var li = $('<li>' + batch.cookie_type + '</li>')

  var button = $('<button>Add To Oven</button>')
    .click(function(){
      alert(oven.insert_batch(batch))
      $(this).parent('li').remove()
    })

  li.append(button)

  $('#prep_batches').append(li)
}

function to_displaycase(batch){
  li = $('<li class=' + batch.cookie_status + '>' + batch.cookie_type + '</li>')
    .click(function(){
      $(this).remove();
      
    })
  $('#displaycase').append(li)
}

function Rack(num){
  this.getter = '#rack_' + num
  this.batch = null;
}

Rack.prototype.set_batch = function(batch){
  this.batch = batch
}

function Oven(name, num_racks){
  this.name = name
  this.racks = []
  for(var i = 0; i < num_racks; i++){
    this.racks.push(new Rack(i))
  }
}

Oven.prototype.insert_batch = function(batch){
  var batch_added = false
  var message = 'Oven Full'
  $.each(this.racks, function(i, rack){
    if(!rack.batch && !batch_added){
      rack.set_batch(batch)
      batch_added = true
      message = 'Cookies in the oven!'
    }
  })
  update_screen(this.racks)
  return message
}

Oven.prototype.bake = function(){
  $.each(this.racks, function(i, rack){
    if(rack.batch){
      rack.batch.change_status()
    }
  })
  update_screen(this.racks)
}

function Batch(type, bake_time){
  this.cookie_type = type
  this.bake_time = bake_time
  this.time_baked = 0
  this.cookie_status = 'raw'
}

Batch.prototype.change_status = function(){
  this.time_baked += 1
  console.log(this.time_baked)
  if (this.time_baked < this.bake_time) {
    this.cookie_status = 'still_gooey'
  } else if (this.time_baked == this.bake_time) {
    this.cookie_status = 'just_right'
  } else {
    this.cookie_status = 'crispy'
  }
}

function update_screen(racks){
  $.each(racks, function(i, rack){
    if (!rack.batch){
      $(rack.getter)
        .html('[empty]')
        .removeClass()
    } else {
      $(rack.getter)
        .html(rack.batch.cookie_type + " [" + rack.batch.cookie_status + "]")
        .addClass(rack.batch.cookie_status)
    }
  })
}
