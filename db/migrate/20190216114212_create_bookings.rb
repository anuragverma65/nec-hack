class CreateBookings < ActiveRecord::Migration[5.1]
  def change
    create_table :bookings do |t|
      t.integer :rider_id
      t.integer :driver_id
      t.integer :vehicle_id
      t.float :fare
      t.string :origin
      t.string :destination

      t.timestamps
    end
  end
end
