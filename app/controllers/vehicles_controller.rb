class VehiclesController < ActionController::Base

  # def fetch_nearby_autos(location = nil, seats = 1)
  #   begin
  #     vehicles = Vehicle.where('seats >= 1 ').where(location: location)
  #     locations =  if seats == 1 
  #                    vehicles.pluck(:id, :location)
  #                  else
  #                    vehicles.where('seats >= ?', seats).pluck(:location)
  #                  end
  #     if location.nil?
  #       render json: { message: 'location not found. please allow location access to the application.' }, status: :unprocessable_entity
  #     elsif location.nil?
  #       render json: { locations: locations }, status: :success
  #     end
  #   rescue
  #     render json: { message: 'Something went wrong' }, status: :internal_server_error
  #   end
  # end

  def calculate_surge(location)
    #todo
  end

  def mark_location_for_surge(location)
    #todo
  end

  def get_estimated_fare(location1, location2, surge = 0)
    distance = calculate_kms(oc, dc)
    fare = ((distance - 1) * 11) + 18
    total_fare = fare + fare * surge
    render json: { amount: total_fare }, status: :success
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





