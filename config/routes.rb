Rails.application.routes.draw do
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html

  get '/' => 'application#test', as: 'test'
  get '/find_autos' => 'application#find_autos', as: 'find_autos'
  get 'xpool/v1/vehicles/fetch_nearby_autos' => 'vehicles#fetch_nearby_autos', as: 'fetch_nearby_autos'
  get '/booking' => 'bookings#create'
  get '/create_booking' => 'application#create_booking'
  get '/find_outer' => 'application#find_outer'

  resources :bookings, controller: 'bookings', as: 'bookings' do
  end

end
