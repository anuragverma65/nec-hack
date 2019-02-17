class CreateUsers < ActiveRecord::Migration[5.1]
  def change
    create_table :users do |t|
      t.string :name
      t.float :rating
      t.string :username
      t.string :utype

      t.timestamps
    end
  end
end
