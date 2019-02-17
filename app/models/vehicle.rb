class Vehicle < ApplicationRecord
	has_many :riders, class_name: 'User', foreign_key: 'rider_id'
	has_one :driver, class_name: 'User', foreign_key: 'driver_id'
	has_one :vehicle, class_name: 'vehicle', foreign_key: 'vehicle_id'
end
