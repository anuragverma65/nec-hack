class ApplicationController < ActionController::Base
  protect_from_forgery with: :exception

  def test
  	# byebug
  	@latitude = 19.1209441
  	@longitude = 72.8436173
  end

  def test2
  end

  def booking
  end

  def create_booking
    @b = Booking.new
    rider_id = params[:rider_id]
    driver_id = params[:driver_id]
    @vehicle_id = params[:vehicle_id]
    fare = params[:fare]
    origin = params[:origin]
    destination = params[:destination]
    @b.rider_id = rider_id
    @b.driver_id = driver_id
    @b.vehicle_id = @vehicle_id
    @b.fare = fare
    @b.origin = origin
    @b.destination = destination
    @b.booking_type = params[:booking_type]
    # @b.update_attributes rider_id: rider_id, driver_id: driver_id, vehicle_id: vehicle_id, fare: fare
    @b.save
    @driver_phone = '9621404014'
    @origin = params[:origin]
    @destination = params[:destination]
    @fare = params[:fare]
  end


  def find_outer
  	address_hash = {}
  	source = params[:source]
  	destination = params[:destination]
  	source = source.gsub(',', '').split.join('+')
  	destination = destination.gsub(',', '').split.join('+')
  	maps_post_url = "https://maps.googleapis.com/maps/api/geocode/json?address=#{source}&key=AIzaSyCAL4sWyluBv6G1UEh60L6E7Pau5A6Ogqo"
  	uri = URI.parse(maps_post_url)
    http = Net::HTTP.new(uri.host, uri.port)
    http.use_ssl = true
    http.verify_mode = OpenSSL::SSL::VERIFY_NONE

    request = Net::HTTP::Get.new(uri.request_uri)
    response = http.request(request)
    parsed = JSON.parse(response.body)
    
    @slat = parsed['results'][0]['geometry']['location']['lat']
    @slng = parsed['results'][0]['geometry']['location']['lng']
  	maps_post_url = "https://maps.googleapis.com/maps/api/geocode/json?address=#{destination}&key=AIzaSyCAL4sWyluBv6G1UEh60L6E7Pau5A6Ogqo"
  	uri = URI.parse(maps_post_url)
    http = Net::HTTP.new(uri.host, uri.port)
    http.use_ssl = true
    http.verify_mode = OpenSSL::SSL::VERIFY_NONE

    request = Net::HTTP::Get.new(uri.request_uri)
    response = http.request(request)
    parsed = JSON.parse(response.body)
    
    @dlat = parsed['results'][0]['geometry']['location']['lat']
    @dlng = parsed['results'][0]['geometry']['location']['lng']
    @fare = get_estimated_fare([@slat, @slng], [@dlat, @dlng]).round(1)
  end

  def find_autos
  	booking = Booking.where(driver_id: 1)
  	if !booking.empty?
  		# pool rider
  		if (params[:destination].downcase.include? "bandra") || (params[:destination].downcase.include? "kurla")
  			@pool_ready = true
  		else
  			@pool_ready = false
  			render action: :test2
  		end

  	end
  	address_hash = {}
  	source = params[:source]
  	destination = params[:destination]
  	source = source.gsub(',', '').split.join('+')
  	destination = destination.gsub(',', '').split.join('+')
  	maps_post_url = "https://maps.googleapis.com/maps/api/geocode/json?address=#{source}&key=AIzaSyCAL4sWyluBv6G1UEh60L6E7Pau5A6Ogqo"
  	uri = URI.parse(maps_post_url)
    http = Net::HTTP.new(uri.host, uri.port)
    http.use_ssl = true
    http.verify_mode = OpenSSL::SSL::VERIFY_NONE

    request = Net::HTTP::Get.new(uri.request_uri)
    response = http.request(request)
    parsed = JSON.parse(response.body)
    
    @slat = parsed['results'][0]['geometry']['location']['lat']
    @slng = parsed['results'][0]['geometry']['location']['lng']
  	maps_post_url = "https://maps.googleapis.com/maps/api/geocode/json?address=#{destination}&key=AIzaSyCAL4sWyluBv6G1UEh60L6E7Pau5A6Ogqo"
  	uri = URI.parse(maps_post_url)
    http = Net::HTTP.new(uri.host, uri.port)
    http.use_ssl = true
    http.verify_mode = OpenSSL::SSL::VERIFY_NONE

    request = Net::HTTP::Get.new(uri.request_uri)
    response = http.request(request)
    parsed = JSON.parse(response.body)
    
    @dlat = parsed['results'][0]['geometry']['location']['lat']
    @dlng = parsed['results'][0]['geometry']['location']['lng']
    @fare = get_estimated_fare([@slat, @slng], [@dlat, @dlng]).round(1)
  end

  def get_estimated_fare(location1, location2, surge = 0)
    @distance = calculate_kms(location1, location2)
    fare = ((@distance - 1) * 11) + 18
    total_fare = fare + fare * surge
  end

  def calculate_kms(oc, dc)
    maps_post_url = "https://maps.googleapis.com/maps/api/distancematrix/json?units=metric&origins=#{oc[0]},#{oc[1]}&destinations=#{dc[0]}%2C#{dc[1]}&key=AIzaSyCAL4sWyluBv6G1UEh60L6E7Pau5A6Ogqo"
    uri = URI.parse(maps_post_url)
    http = Net::HTTP.new(uri.host, uri.port)
    http.use_ssl = true
    http.verify_mode = OpenSSL::SSL::VERIFY_NONE

    request = Net::HTTP::Get.new(uri.request_uri)
    response = http.request(request)
    parsed = JSON.parse(response.body)
    parsed['rows'][0]['elements'][0]['distance']['value']/1000.0 rescue nil
  end
end
