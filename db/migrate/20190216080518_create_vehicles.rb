class CreateVehicles < ActiveRecord::Migration[5.1]
  def change
    create_table :vehicles do |t|
      t.string :reg_no
      t.integer :driver_id
      t.integer :rider_id
      t.integer :seats
      t.string :location

      t.timestamps
    end
  end
end
