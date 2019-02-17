class User < ApplicationRecord
	scope(:riders, -> { where(utype: 'rider') })
	scope(:drivers, -> { where(utype: 'driver') })
end
