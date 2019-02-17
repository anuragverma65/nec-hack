class BookingsController < ActionController::Base

  def create
    # raise
    b = Booking.new
    rider_id = params[:rider_id]
    driver_id = params[:driver_id]
    @vehicle_id = params[:vehicle_id]
    fare = params[:fare]
    origin = params[:origin]
    destination = params[:destination]
    b.rider_id = rider_id
    b.driver_id = driver_id
    b.vehicle_id = @vehicle_id
    b.fare = fare
    b.origin = origin
    b.destination = destination
    # b.update_attributes rider_id: rider_id, driver_id: driver_id, vehicle_id: vehicle_id, fare: fare
    b.save
    @driver_phone = '9621404014'
    @origin = params[:origin]
    @destination = params[:destination]
    @fare = params[:fare]

    render 'application/booking'
    # b.vehicle.update_attributes seats: (b.vehicle.seats - 1)
    # render json: {  driver_phone: '9621404014', origin: origin, destination: destination, fare: fare }, status: :success
  end

  def show
  end
end