class Booking < ApplicationRecord
	# has_one :rider, class_name: 'User', foreign_key: 'rider_id'
	# has_one :driver, class_name: 'User', foreign_key: 'driver_id'
	belongs_to :vehicle, class_name: 'Vehicle', foreign_key: 'vehicle_id'
end
