module Api
  class UserResource < JSONAPI::Resource
    attributes :first_name, :last_name
  end
end
